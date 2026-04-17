---
name: update-release
description: Analyze git changes since the last release-page update and propose new entries for both src/pages/release/index.mdx (zh) and i18n/en/docusaurus-plugin-content-pages/release/index.mdx (en), including draft handling.
disable-model-invocation: true
allowed-tools: Bash Read Write Edit Grep Glob
argument-hint: "[optional: date range or scope hints]"
---

Scan git history for changes since the last edit of the release page, categorize them, and update **both** the zh and en release pages in lockstep. Posts marked `draft: true` are added as MDX comments and auto-promoted once the draft flag is removed.

**Paths:**
- zh (source of truth): `src/pages/release/index.mdx`
- en: `i18n/en/docusaurus-plugin-content-pages/release/index.mdx`

## Workflow

### 1. Determine the baseline

Find the last commit that touched the zh release page:

```bash
git log -1 --format='%H %ct' -- src/pages/release/index.mdx
```

Gather changes since then:

```bash
# committed
git log --reverse --pretty='format:%H|%ct|%s' <last>..HEAD
git log --name-status --pretty='format:COMMIT %H' <last>..HEAD
# uncommitted
git status --porcelain
```

For committed files, the month bucket is the commit date (`%ct`, epoch). For uncommitted files, use **today** (`date +%Y-%m`). For blog posts specifically, always use the date encoded in the path (`blog/YYYY/MM/DD-slug/`) — that's what the existing log does.

### 2. Classify changes

Walk every changed path and bucket it:

| Pattern | Category | Entry style |
|---|---|---|
| `blog/YYYY/MM/DD-<slug>/index.md` (A — added) | blog | `添加博客 / Add blog` |
| `docs/<Topic>/**` where `<Topic>/` is newly created | series | `添加系列文章 / Add series articles` |
| `src/data/friends/friends.ts` modified | friend | diff file to find new `{ title, url, … }` entries; one entry per new friend (`添加友链 / Add friends`) |
| commit subject `system-add:` or `system-modify:` user-visible feature/component | feature/component | **propose only, ask user** |
| commit subject `page-add:` | page | **propose only, ask user** |
| `docs/tags.yml`, `blog/tags.yml`, config, build scripts, theme-only CSS, translation-only commits | — | skip |

Skip any path that doesn't clearly map to a user-visible change. When unsure, list it in the proposal summary as "unclassified — ignore?".

### 3. Read frontmatter for blog/doc entries

For each new blog:
- Read `blog/YYYY/MM/DD-<slug>/index.md` → `slug`, `title`, `draft`
- `zh title` = that file's `title`
- `en title` = title from `i18n/en/docusaurus-plugin-content-blog/YYYY/MM/DD-<slug>/index.md` if it exists, else fall back to the zh title
- `draft` = `true` iff the zh file has `draft: true`

For each new doc series:
- Use the folder name as the slug (e.g. `docs/Docker/` → `Docker`)
- Read any `_category_.json` or `intro.md` in the folder to get the human label; fall back to the folder name
- Link target: `/docs/<Topic>` (matches existing entries)

### 4. Deduplicate against the release pages

Before proposing any entry, grep both release files for the link target (e.g. `/blog/<slug>` or the friend URL). If already present (uncommented **or** commented), skip it — unless it's the draft-promotion case in step 5.

### 5. Promote finished drafts

Scan both release files for MDX comments of the form:
```
{/* - 添加博客: [Title](/blog/slug) */}
{/* - Add blog: [Title](/blog/slug) */}
```

For each, resolve the slug back to `blog/**/<slug>/index.md`. If that file:
- no longer has `draft: true` → **uncomment** the line in both locales (strip `{/* ` and ` */}`)
- has been deleted → leave the comment, flag it for the user
- still has `draft: true` → leave as-is

Do the same for `/docs/` entries if any commented doc entries exist.

### 6. Assemble proposed diff

Group new entries by `(year, month)`. For each group:

**zh format** — headings use `## 🦄 YYYY 年` and `### MM 月`. Entry bullets use Chinese prefixes:
- `- 添加博客: [<zh-title>](/blog/<slug>)`
- `- 添加系列文章: [<name>](/docs/<Topic>)`
- `- 添加友链: [<title>](<url>)`
- `- 添加功能: <name>` / `- 添加组件: <name>` / `- 添加页面: [<name>](/path)` (from user-confirmed system/page commits)

**en format** — headings use `## 🦄 YYYY` (no `年`) and `### MM MMM` (e.g. `01 Jan`). Entry bullets use English prefixes:
- `- Add blog: [<en-title>](/blog/<slug>)`
- `- Add series articles: [<name>](/docs/<Topic>)`
- `- Add friends: [<title>](<url>)`
- `- Add feature: <name>` / `- Add component: <name>` / `- Add page: [<name>](/path)`

**Drafts** wrap the whole bullet in `{/* ... */}`:
- `{/* - 添加博客: [title](/blog/slug) */}`
- `{/* - Add blog: [title](/blog/slug) */}`

**Missing headings** — if the target month or year doesn't yet exist in a file, create it.
- For months: insert `### MM 月` / `### MM MMM` in the right position (months go newest-first within a year).
- For years: insert `## <emoji> YYYY 年` / `## <emoji> YYYY` above the most recent existing year. The emoji is the Chinese zodiac for that year, but the existing file has used non-strict emojis (2026 uses 🐲, not 🐎). **When a new year needs a heading, ask the user which emoji to use** — don't guess.

Insert new bullets at the **top** of their month section (matches existing feel of newest-first within a month).

### 7. Confirmation gate

Before writing anything, show the user:

1. The proposal, grouped and diff-style, for **both** files side by side.
2. Any entries that require confirmation (system/page commits, unclassified paths).
3. Any draft promotions.
4. Any new year heading that needs an emoji choice.
5. Anything flagged: broken draft refs, missing i18n title, slug collisions.

Ask: "Apply this? (y / edit)". On `edit`, accept user tweaks and re-show. On `y`, apply.

### 8. Apply edits

Use `Edit` with surgical replacements. Never `Write` the whole file — preserve existing HTML comments, blank lines, and the `<Changelog>` / `<Comment />` wrappers exactly.

When inserting under an existing month heading, insert as the first bullet (after the blank line that follows the heading).

When creating a new month heading, insert with a blank line before and after, matching the existing rhythm (`### 08 月\n\n- ...`).

### 9. Report

Print:
- Files changed (should always be the two release pages, nothing else)
- Number of entries added per locale
- Number of drafts promoted
- Any remaining flags for the user

Do **not** stage or commit.

## Guardrails

- Never touch files other than the two release pages. If a fix to source frontmatter is needed (e.g. missing `slug`), tell the user — don't silently edit.
- Never duplicate an entry that already exists in either locale.
- Never invent an English title. If the i18n mirror is missing, use the zh title verbatim and flag it so the user knows to translate.
- Never assume a Chinese-zodiac emoji for a brand-new year heading — ask.
- Never un-comment a draft entry unless the source file exists **and** has no `draft: true`. If the source was deleted, flag it and leave the comment.
- Never include `tags.yml`, config, CI, or pure-theme commits as release entries (they're internal).
- Never pull entries from before the last commit that touched `src/pages/release/index.mdx` — that window is already logged.

## Edge cases

- **Blog renamed/moved**: a git-detected rename (`R`) isn't a new blog. Skip.
- **Blog with matching i18n commit but different wording**: use the locale-specific frontmatter; don't try to translate.
- **Uncommitted new blog**: include it, tagged with today's month, but remind the user it's WIP.
- **Multiple commits adding the same user-visible feature**: collapse to one entry.
- **Friend removed from `friends.ts`**: don't add a "removed friend" entry (existing log never does this).
- **Doc changes that only edit existing files** (no new topic folder): skip — existing series don't re-appear in the log.
