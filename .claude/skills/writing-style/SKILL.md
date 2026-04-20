---
name: writing-style
description: Draft, revise, or lint blog/doc body content in Castamere's voice. Auto-detects blog vs doc from the path. Use after new-blog/new-doc has scaffolded the file, or to polish an existing draft.
disable-model-invocation: true
allowed-tools: Read Write Edit Grep Glob Bash
argument-hint: "<path-to-file> [--mode draft|revise|lint] [--shape fix|concept|roundup|tutorial|snippet]"
---

Draft, revise, or lint blog/doc body content so it sounds like Castamere and not like generic LLM output. The sibling skills `new-blog` and `new-doc` produce an empty scaffold — this skill takes over from there.

**Canonical voice reference**: [voice.md](voice.md). Read it fully on every run — it is the single source of truth for tone, signature phrases, and anti-patterns.

**Post-shape skeletons**: [templates.md](templates.md). Read the one that matches the detected shape.

**Components & MDX features**: [components.md](components.md). Read on every run. It is the catalog of custom components, admonitions, code-block magic comments, and MDX features — plus a trigger map for **when** to reach for each one. Voice covers prose; components covers everything that is not prose.

## Workflow

1. **Resolve target file.**
   - Use the path argument if given.
   - Otherwise find the most recently modified file under `blog/` or `docs/` (exclude `i18n/`): `git ls-files -mo --exclude-standard blog/ docs/ | head` then fall back to `find blog docs -name '*.md' -o -name '*.mdx' | xargs ls -t | head -1`.
   - If no candidate is obvious, stop and ask.

2. **Auto-detect kind from the path.**
   - `blog/**` → `blog`
   - `docs/**` → `doc`
   - `i18n/en/**` → stop. English mirrors are out of scope for this skill; tell the user and exit.
   - Anything else → stop and ask.

3. **Detect shape** unless `--shape` overrides. Read the file's frontmatter and body first, then apply in order:
   - path under `docs/Snippets/**` OR tags contain `Snippet` → `snippet`
   - title ends with `问题` → `fix`
   - body already has ≥2 `<GitHubRepo>` imports/elements OR ≥3 H2s that each look like a tool name → `roundup`
   - frontmatter has `references:` AND the topic is explanatory (RPC / AsyncIO / concept tag) → `concept`
   - default for `blog` → `concept`; default for `doc` → `tutorial`

4. **Read `voice.md`, the matched section of `templates.md`, and `components.md`.** All three are mandatory inputs — do not skip.

5. **Read 2–3 recent sibling files** in the same directory (same month for blog, same topic dir for doc) for tonal consistency. Skim, don't deep-read.

6. **Mode dispatch.** Default mode depends on file state:
   - Body is empty, or only contains the skeleton (e.g. `## 缘起` followed by nothing) → `draft`
   - Body has substantive prose → `revise`
   - User passed `--mode lint` → `lint`

   ### draft mode
   - Expand the scaffold into a full draft, **one section at a time**: opening paragraph + `## 缘起` first, then stop and show the user. Do not write 1500 words in a single pass — it's hard to course-correct.
   - After the user reacts, continue with the next section. Repeat until the post is complete.
   - Mirror the template skeleton; do not invent new top-level structure unless the topic genuinely demands it.
   - **Apply component cues from `components.md` as you write.** When the prose calls for one (literal error output → `:::danger Error`; OS-divergent install → `<Tabs groupId="operating-systems">`; before/after code → `git-add-*` / `git-remove-*` magic comments; text-only diagram → ` ```mermaid `; etc.), insert the component inline rather than writing flat prose that a later revise pass would have to upgrade. Add the import at the top of the file the first time a component is used.
   - Technical claims the user didn't provide (exact commands, version numbers, behavior) must be flagged with a `<!-- TODO: verify -->` comment rather than invented.

   ### revise mode
   - Re-read the full file. Identify phrasing that drifts from `voice.md` (generic LLM filler, missing 笔者, over-formal transitions, etc.).
   - Also scan for **missed component opportunities** per `components.md`: paragraphs quoting a literal error output that should be wrapped in `:::danger Error`; ad-hoc "MacOS 下…/Linux 下…" subheadings that should collapse into `<Tabs>`; two consecutive code blocks doing before/after that should merge with `git-add-*` / `git-remove-*` magic comments; screenshots of text-only diagrams that should become mermaid.
   - Edit in place via `Edit`. Preserve the user's structure, technical claims, and code blocks — only rewrite prose and apply component upgrades.
   - At the end, print a short diff-style summary: "Opening rewritten to lead with problem statement", "Removed `总而言之` wrap-up", "Wrapped error output in `:::danger Error`", "Collapsed MacOS/Linux subsections into `<Tabs>`", etc.

   ### lint mode (read-only)
   - Do not edit. Report anti-patterns with file:line references as a checklist.
   - Output format:
     ```
     ## Lint report — <path>
     - [ ] line 42: generic wrap-up "总而言之" — drop or replace with a `## 后记` section
     - [ ] line 87: missing image alt text
     - [ ] line 12: over-formal tone — "本文将介绍" reads like a textbook; prefer a direct problem statement
     ```

7. **Lints (applied silently in draft and revise; reported explicitly in lint).**

   *Voice:*
   - `<!--truncate-->` present and placed after the hook (blog only; must appear before the first `## ` heading)
   - Heading hierarchy: H1 → H2 → H3. Flag any H4+.
   - No generic wrap-ups: `总而言之`, `综上所述`, `in conclusion`, `thanks for reading`, `希望对你有帮助`
   - No inline emoji in headings or body (emoji inside `<GitHubRepo>` cards is fine — they're rendered, not written)
   - No excessive hedging: `可能也许`, `大概或许`, `I think maybe`
   - All `![...](...)` image refs have non-empty alt text
   - Blog body should use 笔者 at least once if the post has any personal element (缘起 or 个人预设 section present)
   - Tag names from frontmatter should appear as body terms at least once (a post tagged `Docker` that never mentions Docker is suspicious)

   *Components & MDX (rules from `components.md`):*
   - Literal error output sitting in a regular ` ``` ` block (especially in fix-shape posts) — wrap in `:::danger Error`
   - Parallel "MacOS …" / "Linux …" subheadings or paragraphs — collapse into `<Tabs groupId="operating-systems">`
   - Two consecutive code blocks doing before/after — merge into one block with `git-add-*` / `git-remove-*` magic comments
   - Manual `<Reference>` import / call — should be removed; references render automatically from frontmatter
   - `<Tabs>` with a non-standard `groupId` for OS tabs — must be `operating-systems`
   - Stacked admonitions opening the post — first impression should be prose
   - `Terminal*.tsx` used for fewer than ~3 commands — replace with a plain ` ```bash ` block
   - File extension `.mdx` without any inline JSX expression — rename to `.md` (imports alone don't require `.mdx`)
   - `<GitHubRepo>` newly added but `npm run github:repos` not run — remind user (the snapshot at `src/data/github/repos.generated.*` will be stale)

8. **Report.**
   - List sections written/changed.
   - Call out any `<!-- TODO: verify -->` markers so the user knows what to check.
   - Do not stage or commit.

## Guardrails

- Never overwrite a non-empty file in draft mode without first offering to switch to revise mode.
- Never invent technical facts. If you don't know the exact flag, command, or version, use a placeholder and flag it.
- Never produce an English mirror — that's a manual workflow for this author. Redirect if asked.
- Never add emoji, `总而言之`, or "thanks for reading" wrap-ups — these are hard anti-patterns.
- Never restate frontmatter/slug/path rules — those belong to `new-blog/conventions.md` and `new-doc/conventions.md`. This skill only touches body prose.
- When in doubt about voice, re-read `voice.md` rather than guessing.
- When in doubt about a component, admonition, or magic-comment syntax, re-read `components.md` rather than inventing — and never reach for a component that is not listed there. If the post genuinely needs something new, flag it for the user and suggest adding it to `components.md` after the post is done.
