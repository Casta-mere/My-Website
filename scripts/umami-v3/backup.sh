#!/usr/bin/env bash
set -euo pipefail
umask 077
cd /root/umami-v3
dir=/root/backup/umami
mkdir -p "$dir"
out="$dir/umami-$(date +%F).sql.gz"
tmp="$out.tmp"
# Never leave a partial file behind; the dated file only appears after a verified dump.
trap 'rm -f "$tmp"' EXIT
docker compose exec -T db pg_dump -U umami umami | gzip > "$tmp"
gzip -t "$tmp"
mv "$tmp" "$out"
find "$dir" -name 'umami-*.sql.gz' -mtime +14 -delete
