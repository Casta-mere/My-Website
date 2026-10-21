#!/usr/bin/env bash
set -euo pipefail
cd /root/umami-v3
mkdir -p /root/backup/umami
docker compose exec -T db pg_dump -U umami umami | gzip > "/root/backup/umami/umami-$(date +%F).sql.gz"
find /root/backup/umami -name 'umami-*.sql.gz' -mtime +14 -delete
