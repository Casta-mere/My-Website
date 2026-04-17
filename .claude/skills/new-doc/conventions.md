# Doc conventions (analyzed 2026-04-17)

Reference for `new-doc` skill. Distilled from existing `docs/` tree.

## Path

`docs/<Topic>/<PageName>.<ext>` where:
- `<Topic>` is a directory (PascalCase or English word): `Docker`, `Python`, `Golang`, `React`, `React/Next`, `React/Issue`, `Server`, `SQL`, `Latex`, `Plans`, `Snippets`, `Snippets/Components`, `Snippets/Python`.
- `<PageName>` is PascalCase, content-oriented: `Basic`, `Command`, `Build`, `Cases`, `Timer`, `TraceMalloc`, `Docusaurus-Umami`, `NginxReverseProxy`, `SSL`, `Screen`, `CodeBlocks`, `NF`.
- `<ext>` is `.md` by default. Use `.mdx` when the page imports components (e.g., `GithubRepo.mdx`, `cmdTerminal.mdx`).

Topic directories contain a `README.md` (or `.mdx`) that acts as the topic landing page.

## Sidebars

Docs appear in one of two sidebars declared in `sidebars.js`:

| Sidebar | Purpose | Topics |
|---|---|---|
| `tutorialSidebar` | 系列文章 (tutorials, longform) | React, Server, Docker, Python, Golang, SQL, Latex, Plans |
| `snippetsSidebar` | 代码片段 (snippets, components) | Snippets/*, Snippets/Components, Snippets/Python |

Every new page must be added to the right sidebar's `items:` array, using the doc ID (`<Topic>/<PageName>` without extension).

Category shape:
```js
{
  type: "category",
  label: "Docker",
  link: { type: "doc", id: "Docker/README" },
  items: ["Docker/Basic", "Docker/Command", "Docker/Build", "Docker/Cases"],
},
```

New pages are appended to the end of `items:` unless the topic has a natural order (e.g., React/Next walks through a tutorial — append at the end but check ordering).

## Frontmatter — content pages

Standard shape:

```yaml
---
tags: [Tag1]
title: <Title>
keywords:
  - <Keyword1>
  - <Keyword2>
references:          # optional
  - author: <Name>   # optional
    title: <Title>
    time: <Year>     # optional
    url: <URL>
recommended: true    # optional
description: <short description>  # optional, rare
---
```

Observations:
- `tags` is usually 1–2 items.
- `title` is in Chinese or English, matching the topic naturally (`Docker 基础`, `Python 基础`, `Docker Build`, `Docker 命令`, `计时器`, `Github Repo 组件`).
- `keywords` is a YAML list (not inline array) and usually includes the tag plus 1–3 related terms. For snippet pages, include `Snippet` as a keyword.
- `references` same format as blog posts.

## Frontmatter — README / topic index

Minimal shape — these are landing pages:

```yaml
---
sidebar_label: <Label>
---
```

Or, with keywords and last-update metadata:

```yaml
---
title: <Topic>
keywords:
  - <Topic>
  - <Related1>
last_update:
  date: 13 SEP 2024 GMT
  author: Casta-mere
---
```

Observations:
- Use `sidebar_label` for short-label overrides (`Python 代码段`, `Python`, `Introduction`).
- Use `title` instead when the label matches the topic name in English.
- `last_update` is optional — only a few READMEs use it.

## Body structure

Content pages:
1. Imports (if `.mdx`)
2. `# <Title>`
3. 1–2 sentence intro paragraph
4. `## Section` content with code blocks, images, etc.

README pages:
1. `# <Topic>`
2. Short intro
3. Bullet checklist of what's covered (common pattern):
   ```markdown
   - [x] 环境配置
     - [x] Conda
     - [x] pip
   - [ ] Unit Test
   ```
4. `import DocCardList from '@theme/DocCardList';` + `<DocCardList />` — shows all child docs.

## Common topics → tag mapping

| Topic dir | Typical tag(s) |
|---|---|
| `Docker/*` | `Docker` |
| `Python/*` | `Python` |
| `Golang/*` | `Golang` |
| `Server/Docusaurus-*` | `Docusaurus` + the specific subsystem (`Algolia`, `Umami`, `Giscus`, etc.) |
| `Server/*` (non-Docusaurus) | `Linux` or specific tool |
| `React/*` | `React` |
| `React/Next/*` | `Next.js`, `React` |
| `Snippets/Components/*` | `Snippet`, `Github` / `Terminal` / etc. |
| `Snippets/Python/*` | `Python`, `Snippet` |
| `Latex/*` | `Latex` |
| `SQL/*` | `SQL` |

## `docs/tags.yml` format

Same alphabetical, blank-line-separated format as `blog/tags.yml`:

```yaml
TagName:
  description: TagName
  label: TagName
  permalink: /TagName
```

Insert new entries in alphabetical position. Common existing tags: `Algolia`, `Bibtex`, `Code Highlight`, `Daisy UI`, `Docker`, `Docusaurus`, `Python`, `Snippet`, `Github`, `Terminal`, `Git`, etc.

## `.md` vs `.mdx`

- Default to `.md`.
- Use `.mdx` when the page needs to import components — `@theme/Tabs`, `@theme/TabItem`, `@site/src/components/*`, or a local `./components/*`.
- Existing `.mdx` examples: `Snippets/Components/GithubRepo.mdx`, `Snippets/Components/Link.mdx`, `Snippets/Components/cmdTerminal.mdx`.
