# Umami v3 deployment

Compose project for the self-hosted Umami v3 (PostgreSQL) behind the nginx reverse proxy on the ECS box, installed on the server at `/root/umami-v3/`. `compose.yml` defines the `db` (postgres:16-alpine, named volume `umami-db-data`) and `umami` (ghcr.io/umami-software/umami:3.4.0, published on `127.0.0.1:${UMAMI_PORT}`, default 3030) services; `.env.example` lists the variables it reads, and the real `.env` (mode 600, never committed) lives only on the server next to `compose.yml` with generated secrets; `backup.sh` is the daily `pg_dump` script (gzipped to `/root/backup/umami/`, 14-day retention) that cron runs from `/root/umami-v3/backup.sh`.

## Migration from v2 (MySQL)

`migrate.sh` moves Umami v2.13 data from MySQL into this project's PostgreSQL along the official v2.19 path. It is driven only by environment variables, never pulls images, and its last line is `MIGRATION OK` or `MIGRATION FAILED at step N`. Steps:

1. preflight: variables set, `PG_NET` is `${PG_PROJECT}_default`, every key in `PG_ENV_FILE` equals any exported variable of the same name, all images local, no `${PG_PROJECT}_umami-db-data` volume yet, nothing listening on `127.0.0.1:$UMAMI_PORT`, MySQL at 6 or 13 finished migrations, at least 1 GB free in `DUMP_DIR`.
2. postgres schema v2.19 (`db` up, v2.19 migrations, 13 rows).
3. truncate the seeded `"user"` (after checking every other table is empty).
4. mysql schema -> v2.19: the point of no return, after which v2.13 cannot start against MySQL. Steps 2 and 4 download Prisma engines from `binaries.prisma.sh`; nothing after step 4 needs the internet.
5. dump + import: `data.sql` in `DUMP_DIR/migrate-<YYYYmmdd-HHMMSS>/` (mode 700), streamed into `psql` in one transaction, then gzipped.
6. verify: row counts, min/max and newest `created_at`, the admin row, a quoted `page_title`, whole-row fingerprints.
7. start v3 (it runs its own migrations, 26 rows) and wait for the heartbeat (`HEARTBEAT_TIMEOUT`, default 300 s).
8. api check: all-time pageviews from the share-token stats API equal MySQL's `event_type=1` count.

Server values: `MYSQL_HOST=127.0.0.1 MYSQL_NET=host MYSQL_DB=my-website-umami PG_PROJECT=umami-v3 PG_PROJECT_DIR=/root/umami-v3 PG_COMPOSE_FILE=compose.yml PG_ENV_FILE=/root/umami-v3/.env PG_NET=umami-v3_default UMAMI_PORT=3030`, plus `DUMP_DIR` and two exported secrets: `MYSQL_PASSWORD`, the raw (not URL-encoded) password, e.g. `$(sed -n 's/^password=//p' /root/.my.cnf)`, and `POSTGRES_PASSWORD`, e.g. `$(sed -n 's/^POSTGRES_PASSWORD=//p' /root/umami-v3/.env)`. To retry after a failure, `docker compose -p umami-v3 down -v` in `/root/umami-v3` (PostgreSQL only); MySQL at 13 migrations is accepted as is. Use `down -v` only for a failed run before acceptance: after the cutover it deletes the live analytics database. If step 7 times out but v3 comes up later, finish by hand: wait for `curl -fsS http://127.0.0.1:3030/api/heartbeat`, check that `_prisma_migrations` has 26 rows, and repeat step 8's two `curl` calls with the `endAt` the script printed at step 7. After acceptance, delete the `migrate-*` directory: it holds visitor data and the admin password hash.

Rehearsal on a workstation (`rehearsal/compose.rehearsal.yml` adds a `mysql` service seeded from a dump): put `mysqldump --databases my-website-umami | gzip` at `/tmp/umami-rehearsal/all.sql.gz`, write `/tmp/umami-rehearsal/.env` with `MYSQL_PASSWORD=rehearsal`, `POSTGRES_PASSWORD=rehearsal`, `APP_SECRET`, `TWO_FACTOR_ENCRYPTION_KEY` (`openssl rand -hex 32`) and `UMAMI_PORT=3031`, then from the repo root:

```bash
docker compose -p umami-rehearsal -f scripts/umami-v3/rehearsal/compose.rehearsal.yml --env-file /tmp/umami-rehearsal/.env up -d --wait mysql
MYSQL_HOST=mysql MYSQL_PASSWORD=rehearsal MYSQL_DB=my-website-umami MYSQL_NET=umami-rehearsal_default PG_PROJECT=umami-rehearsal PG_PROJECT_DIR=scripts/umami-v3/rehearsal PG_COMPOSE_FILE=compose.rehearsal.yml PG_ENV_FILE=/tmp/umami-rehearsal/.env PG_NET=umami-rehearsal_default UMAMI_PORT=3031 DUMP_DIR=/tmp/umami-rehearsal POSTGRES_PASSWORD=rehearsal bash scripts/umami-v3/migrate.sh
docker compose -p umami-rehearsal -f scripts/umami-v3/rehearsal/compose.rehearsal.yml down -v && rm -rf /tmp/umami-rehearsal
```

Deviations from the plan's mechanics, each found in the rehearsal:

- `pnpm update-db` (`prisma migrate deploy`) instead of `pnpm check-db`: `check-db.js` cannot start in the v2.19 images (`chalk` and `semver` are not installed). Prisma 6.7 in those images downloads its engines from `binaries.prisma.sh` on every run (about 16 MB), so the server needs that host reachable.
- PostgreSQL schema work (steps 2-3) runs before the MySQL schema bump (step 4), so a PostgreSQL-side or download failure leaves MySQL where v2.13 can still start.
- `mysqldump --skip-tz-utc`: the server's MySQL runs `time_zone=SYSTEM` (Asia/Shanghai), and Umami v2 wrote the `TIMESTAMP` columns through such sessions. The default `--tz-utc` dumps them 8 hours early. The rehearsal `mysql` service sets `TZ=Asia/Shanghai` so it can catch this, and it did.
- `--no-tablespaces` (the ANSI sql_mode breaks mysqldump's tablespace query, which prints a harmless `Error:`), `--set-gtid-purged=OFF`, and `SET client_encoding = 'UTF8'` in the import preamble.
- `team_website` is not in the verified table list: v2 migration 04 dropped it.
- The stats API check uses `endAt` = the moment v3 was started, not "now", so live traffic reaching v3 after the switch cannot skew the comparison. Its MySQL side counts only the shared website's rows.
- Passwords reach containers by variable name (`-e MYSQL_PWD`, `-e DATABASE_URL`), never on a command line. Besides the plan's checks, step 6 compares whole-row fingerprints of `user`, `website`, `session` and `website_event`, and checks that the newest event is not in the future. The plan's `import.sql` is not written: the preamble and dump are streamed into `psql`.
