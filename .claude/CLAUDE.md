# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run start         # Dev server at localhost:3113 (no browser auto-open)
npm run build         # Production build (runs github:repos script first)
npm run serve         # Serve production build locally
npm run clear         # Clear Docusaurus cache
npm run github:repos  # Regenerate GitHub repo data snapshot (src/data/github/repos.generated.*)
npm run write-translations  # Extract i18n strings
```

The `prebuild` hook runs `github:repos` automatically before `build`. When adding a new `<GitHubRepo>` component to content, run `npm run github:repos` manually in dev to refresh the snapshot.

## Architecture

This is a **Docusaurus 3** personal website (`castamerego.com`) with two locales: `zh-Hans` (default) and `en`. Build uses the experimental faster pipeline (SWC + Rspack + Lightning CSS, configured in `docusaurus.config.js` under `future.experimental_faster`).

**Strict mode**: `onBrokenLinks: 'throw'`, `onBrokenMarkdownLinks: 'throw'`, `onInlineTags: 'throw'`. Broken links, missing markdown targets, or undeclared tags fail the build — don't work around these, fix the source.

### Content layout
- `blog/YYYY/MM/DD-slug/index.md` — blog posts, organized by date. Images go in an `image/` subdirectory next to `index.md`. Typical frontmatter: `slug`, `title`, `authors`, `tags`; optional `recommended: true` (surfaces on homepage) and `references: [{author, title, time, url}]` (rendered by the `Reference` component).
- `docs/` — documentation, organized by topic (Docker, Golang, React, Snippets, etc.). Two sidebars are assembled in `sidebars.js`: `tutorialSidebar` (系列文章) and `snippetsSidebar` (代码片段).
- `i18n/en/` — English translations mirror the same file structure (`docusaurus-plugin-content-blog/`, `docusaurus-plugin-content-docs/`, `docusaurus-theme-classic/`, etc.)

### Custom plugins (`src/plugins/`)
- `plugin-blog-enhance.js` — wraps the official blog plugin to expose `recommended` posts and the 5 `latest` posts as global data (used by homepage components)
- `plugin-docs-enhance.js` — similar wrapper for docs
- `plugin-tailwind.js` — PostCSS/Tailwind integration
- `plugin-umami.js` — Umami analytics injection

### Theme overrides (`src/theme/`)
Swizzled Docusaurus components live here (e.g. `BlogPostItem`, `BlogPostPage`, `CodeBlock`, `TOC`). These shadow the originals from `@docusaurus/theme-classic`.

### Components (`src/components/`)
Reusable React components. Notable ones:
- `GitHubRepo/` — renders a GitHub repo card; requires the pre-generated snapshot at `src/data/github/repos.generated.*`. The build-time script `scripts/generate-github-repos.cjs` scans all content files for `<GitHubRepo>` usage, calls the GitHub API, and writes the snapshot.
- `Homepage/` — landing page sections, pulls `recommended` / `latest` from global blog data
- `Reference/` — citation/reference block used in blog posts

### Data (`src/data/`)
- `github/repos.generated.json` and `repos.generated.ts` — auto-generated, do not edit manually
- `friends/`, `projects/` — static data files for the Friends and Projects pages

### i18n
Two locales: `zh-Hans` (default, source of truth) and `en`. Translation files live in `i18n/en/`. Run `npm run write-translations` after adding new UI strings to extract them.

### Tags
- Blog tags: `blog/tags.yml` — all tags must be declared here (`onInlineTags: 'throw'` enforces this)
- Docs tags: `docs/tags.yml`

### Code block magic comments
Custom Prism magic comments are defined in `docusaurus.config.js` (in addition to the default `highlight-next-line`):
- `This will error` / `error-start`…`error-end` → red error-line styling
- `git-remove-next-line` / `git-delete-start`…`git-delete-end` → removed-line styling
- `git-add-next-line` / `git-add-start`…`git-add-end` → added-line styling

## Git commit subject convention

- Format: `<scope>-<action>: <subject>`
- Scopes: `blog`, `docs`, `page`, `system`, `i18n`
- Actions: `add` (new content/features), `modify` (updates/fixes), `manage` (rename/reorg)
- Use article title or feature name as subject, not a vague summary
- Append `(with i18n)` when the change includes matching English translations
- Versioned content: include marker like `V0.2`, `V1.0` when prior commits used one

Scope hints: `blog/*` → `blog-*`, `docs/*` → `docs-*`, `src/pages/*` → `page-*`, config/components/build → `system-*`, translation-only → `i18n`
