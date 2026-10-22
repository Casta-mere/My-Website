#!/usr/bin/env bash
# Migrate Umami v2.13 (MySQL) to Umami v3.4 (PostgreSQL) along the official v2.19 dump/import path.
# Runs unchanged on the server and in the workstation rehearsal; every input is an environment
# variable (values for both places are in README.md):
#   MYSQL_HOST MYSQL_PASSWORD MYSQL_DB MYSQL_NET
#   PG_PROJECT PG_PROJECT_DIR PG_COMPOSE_FILE PG_ENV_FILE PG_NET POSTGRES_PASSWORD
#   UMAMI_PORT DUMP_DIR [HEARTBEAT_TIMEOUT, seconds, default 300]
# Needs docker (+ compose v2), curl, python3, gzip. Never pulls images: all of them must be local.
# Prints "== step N: <name>" per step; last line is "MIGRATION OK" or "MIGRATION FAILED at step N".
# Order: everything PostgreSQL-side (including the steps that download Prisma engines) runs before
# step 4, the MySQL schema bump after which Umami v2.13 can no longer start.
set -Eeuo pipefail
umask 077

MYSQL_IMAGE=mysql:8.0
UMAMI_MYSQL_V219=ghcr.io/umami-software/umami:mysql-v2.19.0
UMAMI_PG_V219=ghcr.io/umami-software/umami:postgresql-v2.19.0
ADMIN_USER_ID=41e2b680-648e-4b09-bcd7-3e2b10c06264
WEBSITE_ID=e993a914-0864-4b88-a53c-75e46dc174d7
SHARE_SLUG=EplxZVQRe6OkyBt3
# Every data table of the v2.19 schema (team_website was dropped in v2 migration 04).
TABLES="user session website website_event event_data team team_user session_data report segment revenue"
PREAMBLE="SET client_encoding = 'UTF8'; SET standard_conforming_strings = off; SET escape_string_warning = off; SET TIME ZONE 'UTC';"

STEP=0
DONE=0
on_exit() {
  rc=$?
  if [ "$DONE" != 1 ]; then
    [ "$rc" -ne 0 ] || rc=1
    echo "MIGRATION FAILED at step $STEP"
  fi
  exit "$rc"
}
trap on_exit EXIT
trap 'exit 130' INT TERM

step() { STEP=$1; shift; echo "== step $STEP: $*"; }
fail() { echo "ERROR: $*" >&2; exit 1; }
expect() { # expect <label> <want> <got>
  if [ "$2" = "$3" ]; then echo "$1: $3"; else fail "$1: expected '$2', got '$3'"; fi
}

# Passwords travel to containers by variable name only (docker run -e NAME), never on a command line.
urlenc() { V="$1" python3 -I -c 'import os, urllib.parse; print(urllib.parse.quote(os.environ["V"], safe=""))'; }
dc() { docker compose -p "$PG_PROJECT" -f "$PG_PROJECT_DIR/$PG_COMPOSE_FILE" --env-file "$PG_ENV_FILE" "$@"; }
mysql_run() { docker run --rm -i --pull never --network "$MYSQL_NET" -e MYSQL_PWD "$MYSQL_IMAGE" "$@"; }
# SQL on stdin; tab-separated rows, no headers. Session time zone is the server default, the same
# zone Umami v2's Prisma sessions used when they wrote the TIMESTAMP columns.
mysql_q() { mysql_run mysql -h "$MYSQL_HOST" -uroot --default-character-set=utf8mb4 -N -B "$MYSQL_DB"; }
# SQL on stdin; '|'-separated rows, no headers.
pg_q() { dc exec -T db psql -X -q -v ON_ERROR_STOP=1 -U umami -d umami -A -t -F '|'; }
env_file_keys() { awk '/^[A-Za-z_][A-Za-z0-9_]*=/ { sub(/=.*/, ""); print }' "$PG_ENV_FILE"; }
env_file_value() {
  awk -v k="$1" 'index($0, k "=") == 1 { v = substr($0, length(k) + 2); sub(/\r$/, "", v);
    if (v ~ /^".*"$/ || v ~ /^'\''.*'\''$/) v = substr(v, 2, length(v) - 2); print v; exit }' "$PG_ENV_FILE"
}
port_taken() { # exit 0 when anything accepts a TCP connection on 127.0.0.1:$1
  P="$1" python3 -I -c 'import os, socket, sys
s = socket.socket(); s.settimeout(3)
sys.exit(0 if s.connect_ex(("127.0.0.1", int(os.environ["P"]))) == 0 else 1)'
}

# ---------------------------------------------------------------------------------------------
step 1 "preflight"
for v in MYSQL_HOST MYSQL_PASSWORD MYSQL_DB MYSQL_NET PG_PROJECT PG_PROJECT_DIR PG_COMPOSE_FILE \
         PG_ENV_FILE PG_NET POSTGRES_PASSWORD UMAMI_PORT DUMP_DIR; do
  [ -n "${!v:-}" ] || fail "environment variable $v is not set"
done
HEARTBEAT_TIMEOUT=${HEARTBEAT_TIMEOUT:-300}
case $HEARTBEAT_TIMEOUT in ''|*[!0-9]*) fail "HEARTBEAT_TIMEOUT must be a number of seconds" ;; esac
for c in docker curl python3 gzip; do command -v "$c" >/dev/null || fail "$c not found"; done
echo "docker server $(docker version --format '{{.Server.Version}}')"
docker compose version
[ "$PG_NET" = "${PG_PROJECT}_default" ] || fail "PG_NET must be ${PG_PROJECT}_default"
[ -f "$PG_PROJECT_DIR/$PG_COMPOSE_FILE" ] || fail "$PG_PROJECT_DIR/$PG_COMPOSE_FILE not found"
[ -f "$PG_ENV_FILE" ] || fail "$PG_ENV_FILE not found"
# Compose lets exported variables override the env file. Every key must agree, or the containers
# would be created with values the next plain "docker compose up" does not know.
for k in POSTGRES_PASSWORD UMAMI_PORT; do
  [ -n "$(env_file_value "$k")" ] || fail "$k is missing from $PG_ENV_FILE"
done
env_keys=$(env_file_keys)
for k in $env_keys; do
  if val=$(printenv "$k"); then
    [ "$val" = "$(env_file_value "$k")" ] || fail "exported $k differs from $PG_ENV_FILE"
  fi
done
echo "environment agrees with $PG_ENV_FILE ($(echo "$env_keys" | wc -w | tr -d ' ') keys)"
compose_images=$(dc config --images)
[ -n "$compose_images" ] || fail "docker compose config --images printed nothing"
for img in $MYSQL_IMAGE $UMAMI_MYSQL_V219 $UMAMI_PG_V219 $compose_images; do
  docker image inspect "$img" >/dev/null 2>&1 || fail "image $img is not present locally (this script never pulls)"
  echo "image ok: $img"
done
if docker volume inspect "${PG_PROJECT}_umami-db-data" >/dev/null 2>&1; then
  fail "volume ${PG_PROJECT}_umami-db-data already exists; remove it (docker compose down -v, only for a failed run before acceptance: after the cutover it deletes the live analytics database) for a fresh import"
fi
echo "no ${PG_PROJECT}_umami-db-data volume yet"
if port_taken "$UMAMI_PORT"; then
  fail "something listens on 127.0.0.1:${UMAMI_PORT} (Umami v2, or v3 from an earlier run); stop it first"
fi
echo "port ${UMAMI_PORT} is free"
export MYSQL_PWD="$MYSQL_PASSWORD"
expect "mysql select 1" 1 "$(echo 'select 1' | mysql_q)"
read -r my_mig_total my_mig_done <<< "$(echo 'select count(*), coalesce(sum(finished_at is not null and rolled_back_at is null), 0) from _prisma_migrations' | mysql_q)"
case "$my_mig_total/$my_mig_done" in
  6/6|13/13) echo "mysql _prisma_migrations: $my_mig_total, all finished" ;;
  *) fail "mysql _prisma_migrations: expected 6 or 13 finished rows, got $my_mig_total rows ($my_mig_done finished)" ;;
esac
mkdir -p "$DUMP_DIR"
free_kb=$(df -Pk "$DUMP_DIR" | awk 'NR == 2 { print $4 }')
[ "${free_kb:-0}" -ge 1048576 ] || fail "less than 1 GB free in $DUMP_DIR"
RUN_DIR="$DUMP_DIR/migrate-$(date +%Y%m%d-%H%M%S)"
mkdir -m 700 "$RUN_DIR" || fail "cannot create $RUN_DIR"
echo "run dir: $RUN_DIR ($((free_kb / 1024)) MB free)"

# ---------------------------------------------------------------------------------------------
step 2 "postgres schema v2.19"
dc up -d --pull never --wait --wait-timeout 180 db
# "pnpm update-db" is "prisma migrate deploy", the step "pnpm check-db" would run; check-db itself
# cannot start in the v2.19 images (chalk and semver are not installed). Prisma 6.7 downloads its
# engines from binaries.prisma.sh on each run (about 16 MB) and exits before migrating if it cannot.
DATABASE_URL="postgresql://umami:$(urlenc "$POSTGRES_PASSWORD")@db:5432/umami" \
  docker run --rm --pull never --network "$PG_NET" -e DATABASE_URL -e DATABASE_TYPE=postgresql \
  "$UMAMI_PG_V219" pnpm update-db
expect "pg _prisma_migrations" 13 "$(echo 'select count(*) from _prisma_migrations' | pg_q)"

# ---------------------------------------------------------------------------------------------
step 3 "truncate seeded user"
# The import target must be empty apart from the seeded admin; checked before anything is truncated.
for t in $TABLES; do
  [ "$t" = user ] && continue
  expect "pg $t rows before import" 0 "$(echo "select count(*) from \"$t\"" | pg_q)"
done
echo 'TRUNCATE TABLE "user";' | pg_q
expect "pg user rows before import" 0 "$(echo 'select count(*) from "user"' | pg_q)"

# ---------------------------------------------------------------------------------------------
step 4 "mysql schema -> v2.19"
# Point of no return: afterwards Umami v2.13 cannot start against this MySQL (rollback = restore a
# dump). Nothing after this step needs the internet; if this step's engine download fails, Prisma
# exits before applying anything. A database already at 13 migrations is left as it is.
DATABASE_URL="mysql://root:$(urlenc "$MYSQL_PASSWORD")@${MYSQL_HOST}:3306/${MYSQL_DB}" \
  docker run --rm --pull never --network "$MYSQL_NET" -e DATABASE_URL -e DATABASE_TYPE=mysql \
  "$UMAMI_MYSQL_V219" pnpm update-db
expect "mysql _prisma_migrations" 13 "$(echo 'select count(*) from _prisma_migrations' | mysql_q)"
expect "mysql 13_add_revenue finished" 1 "$(echo "select count(*) from _prisma_migrations where migration_name='13_add_revenue' and finished_at is not null" | mysql_q)"

# ---------------------------------------------------------------------------------------------
step 5 "dump + import"
# --skip-tz-utc: dump TIMESTAMPs in the server's default session zone, the zone Umami v2 wrote them in
#   (mysqldump's default would convert to +00:00 and shift every timestamp by the server's UTC offset).
# --no-tablespaces: the ANSI sql_mode breaks mysqldump's tablespace query (harmless but prints "Error:").
# --set-gtid-purged=OFF: never emit GTID statements PostgreSQL cannot parse.
mysql_run mysqldump -h "$MYSQL_HOST" -uroot \
  --compatible=ansi --no-create-info --no-create-db --skip-triggers --skip-add-locks --skip-comments \
  --complete-insert --skip-extended-insert --quick --default-character-set=utf8mb4 \
  --skip-tz-utc --no-tablespaces --set-gtid-purged=OFF \
  --ignore-table="${MYSQL_DB}._prisma_migrations" "$MYSQL_DB" < /dev/null > "$RUN_DIR/data.sql"
inserts=$(grep -c '^INSERT INTO "' "$RUN_DIR/data.sql" || true)
[ "${inserts:-0}" -gt 0 ] || fail "no ANSI-quoted INSERT statements in data.sql"
if grep -q '^INSERT INTO `' "$RUN_DIR/data.sql"; then fail "backtick-quoted INSERT in data.sql (ANSI mode not applied)"; fi
if grep -q "^/\*!40103 SET TIME_ZONE" "$RUN_DIR/data.sql"; then fail "data.sql converts time zones (--skip-tz-utc not applied)"; fi
echo "data.sql: $inserts INSERT statements, $(wc -c < "$RUN_DIR/data.sql" | tr -d ' ') bytes"
{ echo "$PREAMBLE"; cat "$RUN_DIR/data.sql"; } \
  | dc exec -T db psql -X -q -v ON_ERROR_STOP=1 --single-transaction -U umami -d umami
echo "import committed"
gzip "$RUN_DIR/data.sql"
echo "dump kept as $RUN_DIR/data.sql.gz"

# ---------------------------------------------------------------------------------------------
step 6 "verify"
my_sql="select concat_ws(' '"
pg_sql="select concat_ws(' '"
for t in $TABLES; do
  my_sql="$my_sql, (select count(*) from \`$t\`)"
  pg_sql="$pg_sql, (select count(*) from \"$t\")"
done
read -r -a my_counts <<< "$(echo "$my_sql);" | mysql_q)"
read -r -a pg_counts <<< "$(echo "$pg_sql);" | pg_q)"
i=0
bad=0
total=0
for t in $TABLES; do
  echo "$t mysql=${my_counts[$i]:-?} pg=${pg_counts[$i]:-?}"
  [ "${my_counts[$i]:-x}" = "${pg_counts[$i]:-y}" ] || bad=1
  total=$((total + ${my_counts[$i]:-0}))
  i=$((i + 1))
done
[ "$bad" = 0 ] || fail "row counts differ"
expect "insert statements = mysql rows" "$total" "$inserts"
expect "admin user rows" 1 "$(echo "select count(*) from \"user\" where user_id='$ADMIN_USER_ID'" | pg_q)"

my_range=$(echo "select concat(date_format(min(created_at),'%Y-%m-%d %H:%i:%s'), ' .. ', date_format(max(created_at),'%Y-%m-%d %H:%i:%s')) from website_event;" | mysql_q)
pg_range=$(echo "select to_char(min(created_at) at time zone 'UTC','YYYY-MM-DD HH24:MI:SS') || ' .. ' || to_char(max(created_at) at time zone 'UTC','YYYY-MM-DD HH24:MI:SS') from website_event;" | pg_q)
echo "website_event created_at mysql=[$my_range] pg-utc=[$pg_range]"
[ -n "$my_range" ] && [ "$my_range" = "$pg_range" ] || fail "website_event min/max created_at differ"
# Absolute check: a positive zone error would put the newest event in the future.
newest=$(echo "select (max(created_at) <= now())::text || ' ' || justify_interval(date_trunc('second', now() - max(created_at)))::text from website_event;" | pg_q)
case $newest in
  "true "*) echo "newest event is ${newest#true } old (not in the future)" ;;
  *) fail "newest website_event is in the future or missing: [$newest]" ;;
esac

# The oldest page_title containing a single quote (char 39), compared as UTF-8 bytes.
my_spot=$(echo "select concat(event_id, ' ', hex(page_title)) from website_event where page_title like concat('%', char(39 using utf8mb4), '%') order by created_at, event_id limit 1;" | mysql_q)
pg_spot=$(echo "select event_id || ' ' || upper(encode(convert_to(page_title, 'UTF8'), 'hex')) from website_event where page_title like '%' || chr(39) || '%' order by created_at, event_id limit 1;" | pg_q)
[ -n "$my_spot" ] || fail "no page_title containing a quote; spot-check impossible"
[ "$my_spot" = "$pg_spot" ] || fail "page_title spot-check differs: mysql=[$my_spot] pg=[$pg_spot]"
echo "page_title spot-check identical (event ${pg_spot%% *}): $(echo "select page_title from website_event where event_id='${pg_spot%% *}'" | pg_q)"

# Whole-row fingerprints of the tables holding visitor-supplied text and the login row: every
# column as text (timestamps as UTC on the PostgreSQL side), md5 per row, first 32 bits summed.
fingerprint() { # fingerprint <table> <columns, '@' marks a timestamp>
  local t=$1 my_cols="" pg_cols="" c
  shift
  for c in "$@"; do
    case $c in
      @*) c=${c#@}
          my_cols="$my_cols, coalesce(date_format(\`$c\`,'%Y-%m-%d %H:%i:%s'),'<null>')"
          pg_cols="$pg_cols, coalesce(to_char(\"$c\" at time zone 'UTC','YYYY-MM-DD HH24:MI:SS'),'<null>')" ;;
      *)  my_cols="$my_cols, coalesce(\`$c\`,'<null>')"
          pg_cols="$pg_cols, coalesce(\"$c\"::text,'<null>')" ;;
    esac
  done
  local my_fp pg_fp
  my_fp=$(echo "select concat(count(*), ' ', coalesce(sum(cast(conv(substring(md5(concat_ws('|'$my_cols)),1,8),16,10) as unsigned)),0)) from \`$t\`;" | mysql_q)
  pg_fp=$(echo "select count(*) || ' ' || coalesce(sum(('x' || substr(md5(concat_ws('|'$pg_cols)),1,8))::bit(32)::bigint),0) from \"$t\";" | pg_q)
  echo "$t fingerprint mysql=[$my_fp] pg=[$pg_fp]"
  [ "$my_fp" = "$pg_fp" ] || fail "$t content differs between MySQL and PostgreSQL"
}
fingerprint user user_id username password role @created_at @updated_at @deleted_at display_name logo_url
fingerprint website website_id name domain share_id @reset_at user_id @created_at @updated_at @deleted_at created_by team_id
fingerprint session session_id website_id browser os device screen language country region city @created_at distinct_id
fingerprint website_event event_id website_id session_id visit_id @created_at url_path url_query referrer_path \
  referrer_query referrer_domain page_title event_type event_name tag hostname utm_source utm_medium utm_campaign \
  utm_content utm_term gclid fbclid msclkid ttclid li_fat_id twclid

# ---------------------------------------------------------------------------------------------
step 7 "start v3"
# Upper bound for the API check: on the server nginx sends live traffic to v3 as soon as it
# listens, and those new events must not count against the MySQL total.
v3_started_ms=$(( $(date +%s) * 1000 ))
echo "v3 start time (endAt for step 8): $v3_started_ms"
dc up -d --pull never umami
waited=0
until curl -fs -o /dev/null --max-time 5 "http://127.0.0.1:${UMAMI_PORT}/api/heartbeat"; do
  if [ "$waited" -ge "$HEARTBEAT_TIMEOUT" ]; then
    dc logs --tail 50 umami >&2 || true
    fail "no heartbeat within $HEARTBEAT_TIMEOUT s (v3 may still be migrating; see README to finish steps 7-8 by hand)"
  fi
  sleep 3
  waited=$((waited + 3))
done
echo "heartbeat ok after ${waited} s"
expect "pg _prisma_migrations" 26 "$(echo 'select count(*) from _prisma_migrations where finished_at is not null and rolled_back_at is null' | pg_q)"

# ---------------------------------------------------------------------------------------------
step 8 "api check"
base="http://127.0.0.1:${UMAMI_PORT}"
token=$(curl -fsS --max-time 30 "$base/api/share/$SHARE_SLUG" \
  | python3 -I -c 'import json, sys; print(json.load(sys.stdin)["token"])')
[ -n "$token" ] || fail "share $SHARE_SLUG returned no token"
api_pageviews=$(curl -fsS --max-time 60 -H "x-umami-share-token: $token" -H "x-umami-share-context: 1" \
  "$base/api/websites/$WEBSITE_ID/stats?startAt=0&endAt=$v3_started_ms" \
  | python3 -I -c 'import json, sys; v = json.load(sys.stdin)["pageviews"]; print(int(v["value"] if isinstance(v, dict) else v))')
mysql_pageviews=$(echo "select count(*) from website_event where event_type=1 and website_id='$WEBSITE_ID'" | mysql_q)
echo "all-time pageviews api=$api_pageviews mysql=$mysql_pageviews"
[ "$api_pageviews" = "$mysql_pageviews" ] || fail "v3 stats API disagrees with MySQL"

# ---------------------------------------------------------------------------------------------
step 9 "done"
echo "elapsed ${SECONDS} s; delete $RUN_DIR after acceptance (it holds visitor data and the admin hash)"
DONE=1
echo "MIGRATION OK"
