---
name: git-commit-message
description: Analyze staged changes in this repo and propose a repo-style commit subject with the right scope, action, and version.
disable-model-invocation: true
allowed-tools: Bash Read Grep Glob
argument-hint: "[optional focus]"
---

Generate a single best commit subject for the **currently staged** changes in this repository.

Use the project memory in `../../CLAUDE.md` as the canonical style reference, then follow this workflow:

1. Inspect only the staged set first.
   - Run `git diff --cached --name-status`
   - Run `git diff --cached --stat`
   - Read targeted staged diffs for the most important files
   - Ignore unstaged changes unless they are needed to understand naming or version lineage

2. Check for typos in all changed Markdown content.
   - Identify every changed `*.md` and `*.mdx` file involved in the current changes
   - Read the changed hunks and enough surrounding context to review titles, headings, body copy, and link text
   - Focus on obvious spelling, wording, capitalization, and broken-text mistakes in user-facing prose
   - Do not flag deliberate product names, code identifiers, shell commands, or bilingual wording as typos unless they are clearly wrong
   - If you find real typo issues, call them out before recommending the commit subject

3. Check whether corresponding i18n content exists for the changed user-facing files.
   - For each changed page, doc, blog post, or other user-facing Markdown file, check whether this repo has a corresponding localized counterpart, especially under `i18n/en/`
   - If a corresponding i18n file exists and is not updated in the current changes, remind the user that the translation may also need an update
   - If no corresponding i18n file exists for the changed content, do not mention i18n
   - Do not require i18n reminders for pure infrastructure, config, scripts, or internal-only code changes unless the diff clearly changes user-facing translated strings

4. Infer the **scope** from the primary change.
   - `blog/*` -> `blog`
   - `docs/*` -> `docs`
   - `src/pages/**` or page-specific content -> `page`
   - reusable components, config, scripts, package files, theme/layout/site behavior -> `system`
   - translation-only changes -> `i18n`
   - If multiple scopes are staged, choose the dominant user-facing unit. When reusable code/config is the main payload, prefer `system`.

5. Infer the **action**.
   - Use `add` when the main payload is newly introduced
   - Use `modify` when extending, correcting, polishing, or revising an existing unit
   - Use `manage` only for bulk rename/restructure/asset organization changes

6. Build the **subject**.
   - Keep it short, specific, and repo-shaped
   - Prefer article titles, doc paths, page names, or feature names over generic wording
   - Preserve capitalization or phrasing already established in recent history when possible
   - Add `(with i18n)` when the staged set clearly includes matching localization updates

7. Infer the **version** when the primary unit is versioned content.
   - Check path-specific history with `git log --pretty=%s -- <relevant paths>`
   - Reuse the existing naming lineage for that article, doc, or page
   - If recent commits for the same unit use `Vx.y`, continue that sequence
   - Use the repo's common interpretation:
     - draft or incremental pre-release progress often moves through `V0.x`
     - the first "finished" or formal release is often `V1.0`
     - later incremental updates become `V1.1`, `V1.2`, and so on
   - If there is no prior version lineage, do **not** invent a fake version just to fill the pattern

8. Return the answer in this format:
   - First line: the recommended commit subject only
   - If typos were found in changed `md`/`mdx` files, list them next and say they should be fixed before committing
   - If corresponding i18n files exist and were not updated, add a short reminder after the typo section
   - Then 2-4 short bullets covering scope, action, and any version evidence
   - If there is real ambiguity, add up to 2 alternatives after the rationale, but keep one clear recommendation first

## Additional resources

- For concrete repo-style examples, see [examples.md](examples.md).
