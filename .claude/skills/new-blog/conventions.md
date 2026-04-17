# Blog conventions (analyzed 2026-04-17)

Reference for `new-blog` skill. Distilled from all 46 existing posts.

## Path

`blog/YYYY/MM/DD-<slug>/index.md`

- `YYYY`: 4-digit year
- `MM`: zero-padded month (`01`–`12`)
- `DD`: zero-padded day (`01`–`31`) — the older repo has a few unpadded days (`9-Crontab`, `7-若有所思`, `3-openclaw`) but all posts since 2025-06 use zero-padding. **Always zero-pad for new posts.**
- `<slug>`: matches the frontmatter `slug` value, see slug rules below.

Images live next to `index.md` in a sibling `image/` directory:
- `blog/YYYY/MM/DD-slug/image/foo.png` → referenced as `![alt](image/foo.png)` or `![alt](./image/foo.png)`.
- For filenames with spaces: `![alt](<image/my screenshot.png>)`.
- Do **not** pre-create an empty `image/` directory — it won't be tracked by git. Create it on demand when the first image is added.

## Slug

Recent (2025-06 onward) slugs are mostly **camelCase** or **short PascalCase tokens**, content-oriented, English, no spaces:

| Style | Examples |
|---|---|
| camelCase (most common) | `cmdToys`, `zshAliasPreview`, `claudeBuddy`, `sshFallback`, `openclaw` |
| PascalCase | `PageViewCounter`, `DocusaurusSidebar`, `UpgradeDocusaurus39`, `PythonAsyncIO`, `BrandNewStart`, `GithubSAMLSSO` |
| Lowercase single word | `fzf`, `nix`, `Hydration`, `Crontab`, `Nohup`, `Git` |
| Initialism / all-caps | `RPC`, `gRPC`, `SSH`, `SSHFallback`, `SSHPermitionError` |

Rules for generating a slug from a topic:
- Strip spaces and punctuation; preserve acronyms in caps (`RPC`, `SSH`, `SAML`, `SSO`).
- Prefer a concrete keyword over a sentence: "using fzf for fuzzy search" → `fzf`, not `fzfFuzzySearch`.
- For a tech+action topic, concatenate: `zshAliasPreview`, `claudeBuddy`, `PageViewCounter`.
- Keep under ~20 characters when possible. Stay under 30.
- Never use Chinese characters in new slugs (older posts do, but the slug appears in URLs).
- Must be unique across `blog/`. Check with `git ls-files blog/ | grep slug` before creating.

## Title

Titles are usually **Chinese-first descriptive phrases**, occasionally English when the topic is a product/tech name.

Chinese examples:
- `命令行工具 2.0`
- `找回你的 Claude Buddy`
- `SSH 自动匹配多个 IP`
- `Python 基础`
- `Docker 基础`
- `更新 Docusaurus V3.9.0`
- `新开始，再出发`
- `在 Docusaurus 博客中显示文章阅读次数`
- `Docusaurus 侧边栏详解`
- `Python π`
- `Github SAML SSO 问题` (add `问题` when the post is a fix/troubleshoot)
- `SSH 公私钥权限问题`

English examples (used when topic is a brand/technical acronym):
- `Zsh Alias Preview`
- `fzf`
- `nix`
- `gRPC`
- `Remote Procedure Call`

Rules:
- Default to Chinese. Use English when the post is about a specific product/acronym and there's no natural Chinese phrasing.
- Use single space after `title:`, not double (older posts have `title:  xxx` with two spaces — this is a mild inconsistency; new posts use one space).
- Suffix with `问题` if it's a troubleshooting post (`... 问题`).
- Suffix with a version number when the topic is versioned: `更新 Docusaurus V3.9.0`.

## Frontmatter

Field order (all examples follow this):

```yaml
---
slug: <slug>
title: <Title>
authors: [Castamere]
tags: [Tag1, Tag2]
references:          # optional
  - author: <Name>   # optional inside each item
    title: <Title>
    time: <Year>     # optional
    url: <URL>
recommended: true    # optional — surfaces on homepage (only ~10% of posts)
draft: true          # optional — WIP, hidden from listing
---
```

Observations:
- `authors` is always `[Castamere]`.
- `tags` is always present, usually 1–5 tags.
- `references` items always have `title` and `url`; `author` and `time` are optional.
- `recommended: true` is used sparingly, usually for substantive "flagship" posts (tutorials, deep dives, major feature releases). Don't default to true.
- `draft: true` is used for WIP posts. Only add when user says so.

## Body structure

Typical post layout, in order:

1. **Imports** (if needed) — always at the top after frontmatter.
   - `import Tabs from "@theme/Tabs";` + `import TabItem from "@theme/TabItem";` — for OS tabs (MacOS/Linux)
   - `import GitHubRepo from "@site/src/components/GitHubRepo";` — repo cards
   - `import Terminal from "./components/Terminal";` — custom terminal animation
2. **H1 title** (`# <Title>`) — matches frontmatter title. Sometimes omitted when redundant with frontmatter.
3. **Opening paragraph** — 1–3 sentences describing what the post is about. Often mentions the problem or outcome.
4. **Optional hero image** or a bullet list of anchor links (see the `fzf` and `ZshTip` posts).
5. **`<!--truncate-->`** — separator for blog listing. Use this exact form, no spaces inside. (A few older posts have `<!-- truncate -->` — both work but no-space is more common.)
6. **`## 缘起`** — signature first H2 section. Used in 16+ posts. Explains the motivation/backstory. Strong convention — include by default unless the post is a terse reference/snippet.
7. Additional `##` sections with content.

### `## 缘起` template

```markdown
## 缘起

<motivation paragraph — what problem triggered this post, how did you find it, why now>
```

## Common tags (for suggestion)

Most frequent tags from existing posts. When suggesting tags, prefer these names (exact casing) over inventing new ones:

- Languages/runtimes: `Python`, `Golang`, `Zsh`, `Bash`
- Tools: `Docker`, `Docusaurus`, `Git`, `Github`, `SSH`, `FZF`, `Nix`, `Claude`, `Umami`, `Terminal`
- OS: `Linux`, `MacOS`, `CentOS`, `Ubuntu`
- Topics: `Tip`, `BugFix`, `Translated`, `Life`, `Work`, `AI`

All tags must exist in `blog/tags.yml`. New tags need an entry in that file.

## `blog/tags.yml` format

Entries are alphabetically ordered, separated by blank lines:

```yaml
TagName:
  description: TagName
  label: TagName
  permalink: /Tag-Name
```

- `description` and `label` usually match the tag key verbatim.
- `permalink` is the tag key with spaces replaced by hyphens: `Asian Games` → `/Asian-Games`, `AI` → `/AI`.
- Insert new entries in alphabetical position.

## i18n (opt-in)

English mirror path: `i18n/en/docusaurus-plugin-content-blog/YYYY/MM/DD-slug/index.md`.

Default: **do not create**. Only create when the user explicitly says "with i18n" / "add i18n".

The i18n file uses the same frontmatter (with translated `title`) and translated body. Start with an English `# Title` and a placeholder body.
