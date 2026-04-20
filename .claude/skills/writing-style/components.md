# Components & Docusaurus features (analyzed 2026-04-20)

Catalog of components, admonitions, code-block features, and MDX features available in this repo. Companion to `voice.md` and `templates.md`. The `writing-style` skill reads this on every run to know **what** to reach for and **when**.

Source of truth for the inventory: `src/components/`, `docusaurus.config.js` (`prism.magicComments`, `themes`, `markdown`), and grep across `blog/` + `docs/` for actual usage patterns.

---

## When to reach for what (trigger map)

The most important table in this file. Use it during **draft** to insert components naturally, and during **revise/lint** to spot missed opportunities.

| Cue in the prose / draft | Reach for |
|---|---|
| Literal error output the reader will see | `:::danger Error` admonition (also `ERROR` / `报错` / `重要` work — match the post's existing label) |
| OS-divergent install or config (Mac vs Linux vs Windows) | `<Tabs groupId="operating-systems">` with `<TabItem value="MacOS" / "Linux">` |
| GitHub repo being introduced (own or third-party, once per repo) | `<GitHubRepo owner="…" repo="…" />` in the hook area, before `<!--truncate-->` |
| Long narrated terminal session with shown output | per-post `Terminal*.tsx` built on `CommandLine` primitives — heavy, only when worth it |
| Diff / before–after of code | `git-add-*` / `git-remove-*` magic comments inside one code block (not two consecutive blocks) |
| Highlighting a single line for emphasis | `// highlight-next-line` above the line (use `#` for shell/python) |
| "可参考 X 文章" cross-reference inside its own block | `:::info` admonition wrapping the link |
| Must-know prerequisite or warning | `:::important` |
| Side note, alternative path, "顺便提一下" | `:::tip` (or `:::tip title="P.S."` for a P.S. label) |
| Math expression / formula | `$inline$` / `$$block$$` — KaTeX is configured globally |
| Flowchart, sequence, or state diagram | ` ```mermaid ` block — prefer over screenshots for anything text-only |
| Citations / references at the end of the post | `references:` in frontmatter — auto-rendered, do **not** import `<Reference>` manually |
| Paragraph needs inline JSX (`<div className="tailwind">…`, `{condition && …}`) | rename file to `.mdx` (imports alone do not require `.mdx`) |

---

## Custom components

### `<GitHubRepo>` — repo card

```mdx
import GitHubRepo from "@site/src/components/GitHubRepo";

<GitHubRepo owner="Casta-mere" repo="zsh-alias-preview" />
```

- Place: in the hook area, **before** `<!--truncate-->`. Once per repo.
- After adding a new repo card, the build-time script `scripts/generate-github-repos.cjs` needs the snapshot refreshed: `npm run github:repos`. The skill should remind the user.
- The card icon characters (★, fork, etc.) are rendered by the component — they are fine; the no-emoji rule does not apply to component output.

### `<Tabs>` + `<TabItem>` — OS / variant switcher

```mdx
import TabItem from "@theme/TabItem";
import Tabs from "@theme/Tabs";

<Tabs groupId="operating-systems">
  <TabItem value="MacOS" label="MacOS">

```bash
brew install <pkg>
```

  </TabItem>
  <TabItem value="Linux" label="Linux">

```bash
sudo apt install <pkg>
```

  </TabItem>
</Tabs>
```

- **Standard `groupId` for OS tabs is `operating-systems`** with `value="MacOS"` / `value="Linux"`. This matches `cmdToys`, `sshFallback`, `RPC`, `talk-003`, `MiniConda`, etc., so the user's selection syncs across posts.
- For non-OS tabs (e.g. comparing tools, dialects), pick a stable `groupId` and reuse it across the post.
- Indent the inner content with a blank line before/after the inner code block — Docusaurus needs the whitespace to parse markdown inside `<TabItem>`.

### `Terminal*.tsx` (per-post, built on `CommandLine`)

For long, narrated terminal demos (animated/styled). Heavy lift — each Terminal component is a 30–60 line `.tsx` file in the post's `components/` folder.

```mdx
// blog/YYYY/MM/DD-slug/components/Terminal1.tsx
import {
  Cmd, Comment, Line, REPLLine,
  TerminalLine, TerminalResponse, TerminalRoot,
} from "@site/src/components/CommandLine";

export default function Terminal1() {
  return (
    <TerminalRoot title={"安装"}>
      <TerminalLine dir=""><Cmd text="conda -V" /></TerminalLine>
      <TerminalResponse dir="" response_style="NEWLINE">
        <Line text="zsh: command not found: conda" />
      </TerminalResponse>
    </TerminalRoot>
  );
}
```

- Reference posts: `blog/2024/08/28-MiniConda/components/Terminal*.tsx` (shell), `blog/2025/10/13-PythonAsyncIO/components/Terminal*.tsx` (REPL via `REPLLine`).
- Modes: `response_style="PLAIN"` (aligned) vs `"NEWLINE"` (left-aligned). `LINE_BREAK="AUTO"`.
- **Don't** reach for this for a 2-line shell snippet — use a plain ` ```bash ` block. Use Terminal only when the rhythm of typed input + response actually carries the post.
- Doc snippet: `docs/Snippets/Components/cmdTerminal.mdx`. Blog explainer: `/blog/cmdTerminal`.

### Components that exist but are *not* for body content

Don't reach for these unless the post is specifically about them.

| Component | Purpose | Where it lives |
|---|---|---|
| `<Reference>` | Citation block at post bottom | Auto-rendered from `references:` frontmatter — never imported by hand |
| `<Link>` / `<DocusaurusMDXLinkEnhance>` | Fancy hyperlink with hover card | Mostly used in the Link snippet/blog itself; plain markdown `[text](url)` is the default |
| `<TypeWriter>` | Text typing animation | Only in the TypeWriter snippet/blog |
| `<Comment>`, `<Changelog>`, `<DaysCounter>`, `<UmamiPageViewCounter>`, `<Friends>`, `<RecentGames>` (Steam), `<Donate>`, `<Icon>`, `<License>`, `<ProgressBar>`, `<Homepage>` | Page chrome — homepage / about / release pages | `src/pages/**` only |
| `<BrowserWindow>` (`@site/src/components/BrowserWindow`) | Frame UI screenshots in a browser-window mock | One known use: `docs/Server/Docusaurus-FAQ.md`. Niche. |

### Theme components worth knowing

| Component | When to use |
|---|---|
| `<DocCardList>` (`@theme/DocCardList`) | Inside a `docs/<Topic>/README.md` to render the category index automatically. Not for blog. |
| `<BrowserWindow>` (`@theme/BrowserWindow`, if needed) | Same as above. The custom one in `src/components/` is preferred when present. |

---

## Admonitions

| Form | Author's typical use | Frequency in blog |
|---|---|---|
| `:::danger Error` / `:::danger ERROR` / `:::danger 报错` / `:::danger 重要` | Wrap literal error output. Signature move for **fix-shape** posts. | High in fix posts |
| `:::tip` (or `:::tip title="P.S."`) | Side note, alternative approach, "顺便一提" | Common |
| `:::info` | Cross-reference to another post ("可参考 X 文章") or supplementary context | Common |
| `:::important` | Must-know prerequisite or guardrail | Moderate |
| `:::note` | Brief clarification | Rare |
| `:::warning` | Caution about behavior | Rare |
| `:::caution` | (defined by Docusaurus, but not used in this repo) | Never |

Syntax:

```markdown
:::tip
内容是普通 markdown — 链接、代码块、列表都可以
:::
```

Or with a custom title:

```markdown
:::tip title="P.S."
…
:::
```

Body of an admonition is plain markdown. End with `:::` on its own line. Don't nest admonitions.

**Blog vs doc usage**:
- Blog: sparingly. Most paragraphs should be plain prose. Fix posts lean heavily on `:::danger Error`. Concept and roundup posts often use zero admonitions.
- Doc: liberally. Tutorial pages routinely intersperse `:::tip` / `:::info` / `:::important` between sections.

---

## Code block features

### Language hint

````
```bash
…
```
````

Languages with first-class support (configured in `docusaurus.config.js` `prism.additionalLanguages`): `bash`, `latex`, `json`, `markdown`, `python`. Plus everything in Prism's default set (`js`, `ts`, `tsx`, `jsx`, `go`, `rust`, `java`, `c`, `cpp`, `css`, `html`, `yaml`, `sql`, `diff`, `dockerfile`, …).

### Title

````
```bash title="~/.zshrc"
alias ll='eza -la'
```
````

Title appears as a small label at the top-left of the block. Use for config files, source paths, or anything where the file name carries meaning.

### Line numbers

````
```python title="example.py" showLineNumbers
def foo(): ...
```
````

Use when you'll reference specific lines in prose ("第 3 行的 …").

### Magic comments (configured in `docusaurus.config.js`)

| Marker | Meaning |
|---|---|
| `// highlight-next-line` | Highlight next line (yellow) |
| `// highlight-start` … `// highlight-end` | Highlight a block |
| `// This will error` | Mark next line as error (red) |
| `// error-start` … `// error-end` | Mark a block as error |
| `// git-remove-next-line` | Style next line as deleted (red) |
| `// git-delete-start` … `// git-delete-end` | Delete-style block |
| `// git-add-next-line` | Style next line as added (green) |
| `// git-add-start` … `// git-add-end` | Add-style block |

Use `#` instead of `//` for `bash` / `python` / `yaml` / etc. — Prism strips the comment marker but needs valid syntax for the block's language.

**Strongly prefer these over screenshots** when showing a diff: faster to read, copyable, searchable. Reference posts: `blog/2025/08/06-Hydration` (git-add/remove), `blog/2025/05/21-PageViewCounter` (highlight).

### Live code blocks

`@docusaurus/theme-live-codeblock` is enabled. Marking a block with the `live` meta turns it into a live editable React playground:

````
```jsx live
function Hello() { return <div>hi</div>; }
```
````

Rare in practice — only useful when the post is teaching React.

---

## MDX features

### File extension: `.md` vs `.mdx`

- **Default to `.md`.** Imports work in `.md` files in this Docusaurus setup (most blog posts with imports use `.md`: `cmdToys`, `claudeBuddy`, `RPC`, `sshFallback`).
- **Use `.mdx` when** the body needs inline JSX expressions (`<div className="tailwind">…`, conditional render, `{someValue}` interpolation, complex JSX trees inline). Examples: `Awk`, `Link`, `TypeWriter`, `cmdTerminal`, `MySQL数据库迁移`.
- Renaming `.md` → `.mdx` is cheap; renaming back is fine too.

### Math (KaTeX)

Configured globally via `remark-math` + `rehype-katex`.

- Inline: `$E = mc^2$`
- Block: `$$ \int_0^1 x \,dx = \tfrac{1}{2} $$`

Reference: posts tagged `Latex` or `Python` (PythonPi) use this.

### Mermaid

```mermaid
graph LR
  A --> B
```

- `markdown.mermaid: true` is enabled, plus `@docusaurus/theme-mermaid` is registered.
- Reference posts: `blog/2025/06/20-fzf` and `blog/2024/09/23-Link` both use mermaid for flowcharts.
- **Prefer mermaid over screenshots** for any text-only diagram (architecture sketch, decision tree, sequence). Faster to maintain when the underlying logic changes.

### Image handling

- Path: `image/foo.png` next to `index.md` (`![alt](image/foo.png)`).
- For filenames with spaces: `![alt](<image/my screenshot.png>)`.
- Image zoom on click is automatic via `docusaurus-plugin-image-zoom` (configured globally) — no syntax needed in the post.
- Alt text is **required** by the writing-style lint. Empty `![]()` will be flagged.

### Frontmatter-driven rendering

| Frontmatter | Effect |
|---|---|
| `references: [{author, title, time, url}, …]` | Auto-renders a `<Reference>` block at the bottom of the post |
| `recommended: true` | Surfaces on homepage (sparingly — see new-blog/conventions.md) |
| `draft: true` | Hides from listing; auto-promoted by `update-release` skill once removed |

---

## Anti-patterns (hard rules — flag in lint, fix in revise, avoid in draft)

- **Don't import `<Reference>` manually.** It is rendered from frontmatter `references:`.
- **Don't drop a `Terminal*.tsx` for a 2-line shell snippet.** Use a `bash` code block. Terminal is for long narrated sessions only.
- **Don't open a post with stacked admonitions.** First impression should be prose; admonitions punctuate, they don't lead.
- **Don't pick non-standard `groupId` for OS tabs.** Always `operating-systems` so the reader's tab choice persists across posts.
- **Don't switch to `.mdx` "just in case".** Only when actual JSX is needed.
- **Don't use two consecutive code blocks for before/after** — use `git-add-*` / `git-remove-*` magic comments in one block.
- **Don't write parallel "MacOS:" / "Linux:" subheadings** — use `<Tabs>`.
- **Don't insert a screenshot for a text-only diagram** — use mermaid.
- **Don't use `:::caution`** — the repo never has; use `:::warning` or `:::important` instead.
