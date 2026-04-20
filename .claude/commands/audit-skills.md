---
description: Audit writing-style / new-blog / new-doc / git-commit-message / update-release skills for staleness
allowed-tools: Bash, Read, Grep, Glob
---

You are auditing the user's `.claude/skills/` collection in this repo for staleness. **Read-only.** Do not edit any skill files. Do not auto-fix anything. Just print a concise report so the user knows which reference files to refresh.

## Procedure

Today's date comes from the system. For each item below, parse the `(analyzed YYYY-MM-DD)` marker from the file's first heading where applicable, compute days stale, run a scoped `git log` since that date, and print one block per file.

### Repo paths

```
SKILLS_DIR = .claude/skills
```

### Items to audit

1. **new-blog / conventions.md** → `.claude/skills/new-blog/conventions.md`
   - Paths: `blog/ blog/tags.yml`
   - Globs: `blog/**/*.md blog/**/*.mdx blog/tags.yml`

2. **new-doc / conventions.md** → `.claude/skills/new-doc/conventions.md`
   - Paths: `docs/ docs/tags.yml sidebars.js`
   - Globs: `docs/**/*.md docs/**/*.mdx docs/tags.yml sidebars.js`

3. **writing-style / voice.md** → `.claude/skills/writing-style/voice.md`
   - Paths: `blog/ docs/`
   - Note: prose drift is slow; bias verdict toward OK unless very stale.

4. **writing-style / templates.md** → `.claude/skills/writing-style/templates.md`
   - No `analyzed` header. Fall back to: `git log -1 --format=%cs -- .claude/skills/writing-style/templates.md`
   - Paths: `blog/`

5. **writing-style / components.md** → `.claude/skills/writing-style/components.md`
   - Paths: `src/components/ src/theme/ docusaurus.config.js`
   - Plus: detect new component imports — see "Extra: components.md import diff" below.

6. **git-commit-message / examples.md** → `.claude/skills/git-commit-message/examples.md`
   - No `analyzed` header. See "Extra: commit prefix coverage" below.

7. **update-release / SKILL.md** → `.claude/skills/update-release/SKILL.md`
   - Report `git log -1 --format=%cs -- src/pages/release/index.mdx`. If touched in the last 30 days, print "manual review recommended". Skip deep parsing.

## Commands to run

For each dated item, run:

```bash
# Parse analyzed date
ANALYZED=$(head -1 <file> | grep -oE '[0-9]{4}-[0-9]{2}-[0-9]{2}')

# Days stale (BSD date on macOS)
DAYS=$(( ( $(date +%s) - $(date -j -f %Y-%m-%d "$ANALYZED" +%s) ) / 86400 ))

# Upstream commits & files since then, scoped to dependency paths
COMMITS=$(git log --since="$ANALYZED" --oneline -- <paths> | wc -l | tr -d ' ')
FILES=$(git log --since="$ANALYZED" --name-only --pretty=format: -- <paths> | sed '/^$/d' | sort -u | wc -l | tr -d ' ')
```

### Extra: components.md import diff

```bash
# Components catalog'd in components.md (look for `from "@site/src/components/<Name>"` lines or `<Name>` headers)
# Components actually used in content:
grep -rhoE 'from "@site/src/components/[A-Za-z0-9_/-]+"' blog/ docs/ 2>/dev/null | sort -u
```

For each `from "@site/src/components/<Name>"` found in content, check whether the component name appears anywhere in `components.md`. List any that do NOT appear — these are uncatalogued.

### Extra: commit prefix coverage

```bash
# Recent prefixes in master
git log --pretty=%s -100 | grep -oE '^[a-z]+-[a-z]+:' | sort -u
```

For each prefix, check if it appears in `examples.md`. List any that do not.

## Verdict rule

- `OK`     — `DAYS < 30` OR `COMMITS < 5`
- `REVIEW` — `DAYS >= 30` AND `COMMITS >= 5`
- `STALE`  — `DAYS >= 90` OR `COMMITS >= 20`

(STALE wins over REVIEW.)

## Output format

Print a single report. One block per item. Keep it scannable — no preamble, no closing summary unless something is STALE.

```
audit-skills — <today's date>

[1] new-blog/conventions.md
    Analyzed: 2026-04-17  (3 days ago)
    Upstream: 7 commits, 12 files in blog/, blog/tags.yml
    Verdict: OK

[2] new-doc/conventions.md
    ...

[5] writing-style/components.md
    Analyzed: 2026-04-20  (0 days ago)
    Upstream: 0 commits in src/components/, src/theme/, docusaurus.config.js
    Uncatalogued imports: GitHubRepo, Reference   (or: none)
    Verdict: OK

[6] git-commit-message/examples.md
    Recent prefixes (last 100 commits): blog-add, blog-modify, system-modify, page-add, ...
    Not in examples.md: page-add, system-modify   (or: none)

[7] update-release/SKILL.md
    src/pages/release/index.mdx last touched: 2026-04-15  (5 days ago)
    Manual review recommended.   (or omit if > 30 days)
```

After all items, if any verdict is `STALE`, end with one line: `Action: refresh STALE entries.` Otherwise no closing line.

Begin.
