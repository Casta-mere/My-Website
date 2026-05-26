---
name: deploy
description: Reference — how castamerego.com is built, verified, and deployed. Read this before writing any deploy-related scripts or automation so paths, commands, and the serving architecture are correct.
allowed-tools: Bash
---

## Serving Architecture

**castamerego.com** is a fully static Docusaurus 3 site served by **nginx** on a Linux server. There is no Node.js process running in production — only static files.

```
Local machine                    Server (ssh alias: server)
─────────────────                ─────────────────────────────────
npm run build                    /var/www/castamerego/   ← nginx root
    ↓                                ↑
npm run serve  (verify locally)  /root/deploy-mywebsite.sh
    ↓                                ↑
tar build/ → build.tar.gz       tar extract → mv → chown → nginx -s reload
    ↓                                ↑
scp → server:/tmp/build.tar.gz  ───┘
    ↓
ssh server '/root/deploy-mywebsite.sh'
```

- nginx document root: `/var/www/castamerego`, owner `www-data:www-data`
- SSH host alias: `server` (configured in `~/.ssh/config`)
- No SSR, no API backend — `docusaurus serve` is not used in production

## Full Deploy Pipeline

### Step 1 — Build locally
```bash
npm run clear    # clear Docusaurus cache
npm run build    # prebuild hook auto-runs github:repos (needs GitHub API network access)
```

### Step 2 — Verify locally before shipping
```bash
npm run serve    # serves build/ at localhost — confirm the build looks correct before deploying
```

### Step 3 — Package and ship
```bash
tar -zcvf build.tar.gz \
  --mode='a+rX,u+w' \
  --exclude='.DS_Store' \
  --exclude='__MACOSX' \
  build
scp build.tar.gz server:/tmp/build.tar.gz
ssh server '/root/deploy-mywebsite.sh'
```

### Server-side script (`/root/deploy-mywebsite.sh`)
```bash
set -e
tar -zxf /tmp/build.tar.gz -C /tmp
rm -rf /var/www/castamerego
mv /tmp/build /var/www/castamerego
chown -R www-data:www-data /var/www/castamerego
nginx -t && nginx -s reload   # validates config before reload; old site stays up if invalid
echo "✅ deploy done"
```

## Key facts for writing scripts

- `npm run build` triggers `prebuild` which regenerates `src/data/github/repos.generated.*` — requires GitHub API network access
- Always run `npm run serve` after build to catch any runtime issues before shipping
- `nginx -t` validates nginx config before reload — safe rollout, no downtime on config error
- File ownership is fixed server-side by the deploy script; local tar permissions don't matter for nginx
- The SSH alias `server` must exist in `~/.ssh/config` on the local machine
