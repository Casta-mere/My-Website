---
name: new-blog
description: Scaffold a new blog post under blog/YYYY/MM/DD-slug/index.md with today's date, a slug and title in the repo's style, frontmatter, and any new tags added to blog/tags.yml.
disable-model-invocation: true
allowed-tools: Bash Read Write Edit Grep Glob
argument-hint: "<topic description and optional refs/tags/slug/title hints>"
---

Scaffold a new blog post. The user provides a topic (and optionally references, a preferred slug/title, or tag hints). Produce a ready-to-write `index.md` that matches this repo's conventions.

**Canonical style reference**: [conventions.md](conventions.md). Read it before generating slug/title/frontmatter.

## Workflow

1. **Get today's date.**
   - Run `date +%Y-%m-%d` to get `YYYY-MM-DD`. Zero-pad month and day.

2. **Parse the user's input.**
   - Extract the core topic.
   - Look for an explicit slug ("slug: foo", "as `foo`"), title, tag list, or reference URLs. Use whatever the user gave verbatim — do not overwrite.
   - Look for modifier keywords: `with i18n` / `add i18n` → also create an English mirror; `draft` → add `draft: true`; `recommended` → add `recommended: true`; `mdx` → use `.mdx` extension (rare for blog, but allowed).

3. **Generate slug (if not provided).**
   - Follow the slug rules in conventions.md: camelCase, English, content-oriented, concise.
   - Check uniqueness: `git ls-files blog/ | grep -i <candidate-slug>`. If the slug already exists, modify with a qualifier (e.g., `fzf` → `fzfAdvanced`).

4. **Generate title (if not provided).**
   - Default to a concise Chinese phrase. Use English only when the topic is a product/acronym name.
   - Follow the title conventions (suffix `问题` for troubleshooting posts, include version numbers for version-specific posts, etc.).

5. **Suggest tags.**
   - Read `blog/tags.yml`. Prefer tags that already exist.
   - Suggest 1–5 tags based on the topic. Prefer the canonical names listed in conventions.md ("Common tags").
   - Flag any suggested tag that is NOT yet in `blog/tags.yml` — those will need to be added.

6. **Format references (if user provided URLs).**
   - Fetch or infer `title`, `author`, `time` for each URL from the user's message. If the user only gave a URL, use a placeholder title and mark it for the user to fill in.
   - Structure as YAML list under `references:`.

7. **Confirm with the user** before writing, unless the user's input is fully explicit (slug + title + tags + no missing pieces). Show the proposed:
   - Directory path (`blog/YYYY/MM/DD-slug/`)
   - Frontmatter preview
   - List of new tags that will be added to `blog/tags.yml`
   - Whether an i18n file will be created
   Then ask: "Proceed?"

8. **Create files.**
   - `blog/YYYY/MM/DD-<slug>/index.md` with:
     ```markdown
     ---
     slug: <slug>
     title: <title>
     authors: [Castamere]
     tags: [<tag1>, <tag2>]
     <optional: references block>
     <optional: recommended: true>
     <optional: draft: true>
     ---

     # <title>

     <1-sentence placeholder describing the post>

     <!--truncate-->

     ## 缘起

     ```
   - Use `# <title>` on an H1 line unless the topic is very short (fzf-style).
   - If the user mentioned a GitHub repo, add the import + `<GitHubRepo owner="…" repo="…" />` before `<!--truncate-->`.
   - Do **not** create an empty `image/` directory.

9. **Update `blog/tags.yml`** for any new tags.
   - Insert each new entry in its correct alphabetical position (the file is alphabetically sorted, with blank lines between entries).
   - Entry format:
     ```yaml
     <TagName>:
       description: <TagName>
       label: <TagName>
       permalink: /<TagName-with-hyphens>
     ```

10. **i18n (only if user asked).**
    - Create `i18n/en/docusaurus-plugin-content-blog/YYYY/MM/DD-<slug>/index.md` with matching frontmatter (English title) and a placeholder English body. Reuse the same slug.

11. **Report.**
    - Print the created file paths.
    - Call out anything that needs the user's attention (placeholder reference titles, suggested tags that may be off, etc.).
    - Suggest `/writing-style <path>` as the next step if the user wants help drafting the body in the repo's voice.
    - Do not stage or commit anything.

## Guardrails

- Never overwrite an existing `index.md`. If the target directory exists, stop and ask.
- Never invent reference titles or authors when the user didn't provide them. Use a placeholder and flag it.
- Never add a tag to `tags.yml` that's already there.
- Never create i18n unless the user asked.
- Never add `recommended: true` by default — it's reserved for flagship posts.
