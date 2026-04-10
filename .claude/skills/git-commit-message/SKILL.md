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

2. Infer the **scope** from the primary change.
   - `blog/*` -> `blog`
   - `docs/*` -> `docs`
   - `src/pages/**` or page-specific content -> `page`
   - reusable components, config, scripts, package files, theme/layout/site behavior -> `system`
   - translation-only changes -> `i18n`
   - If multiple scopes are staged, choose the dominant user-facing unit. When reusable code/config is the main payload, prefer `system`.

3. Infer the **action**.
   - Use `add` when the main payload is newly introduced
   - Use `modify` when extending, correcting, polishing, or revising an existing unit
   - Use `manage` only for bulk rename/restructure/asset organization changes

4. Build the **subject**.
   - Keep it short, specific, and repo-shaped
   - Prefer article titles, doc paths, page names, or feature names over generic wording
   - Preserve capitalization or phrasing already established in recent history when possible
   - Add `(with i18n)` when the staged set clearly includes matching localization updates

5. Infer the **version** when the primary unit is versioned content.
   - Check path-specific history with `git log --pretty=%s -- <relevant paths>`
   - Reuse the existing naming lineage for that article, doc, or page
   - If recent commits for the same unit use `Vx.y`, continue that sequence
   - Use the repo's common interpretation:
     - draft or incremental pre-release progress often moves through `V0.x`
     - the first "finished" or formal release is often `V1.0`
     - later incremental updates become `V1.1`, `V1.2`, and so on
   - If there is no prior version lineage, do **not** invent a fake version just to fill the pattern

6. Return the answer in this format:
   - First line: the recommended commit subject only
   - Then 2-4 short bullets covering scope, action, and any version evidence
   - If there is real ambiguity, add up to 2 alternatives after the rationale, but keep one clear recommendation first

## Additional resources

- For concrete repo-style examples, see [examples.md](examples.md).
