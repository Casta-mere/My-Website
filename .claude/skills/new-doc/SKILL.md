---
name: new-doc
description: Scaffold a new docs page under docs/<Topic>/<PageName>.md with proper frontmatter, add the doc ID to the correct category in sidebars.js, and add any new tags to docs/tags.yml.
disable-model-invocation: true
allowed-tools: Bash Read Write Edit Grep Glob
argument-hint: "<topic/page description and optional tag/ref hints>"
---

Scaffold a new docs page. The user provides a topic/category and a description (and optionally references, preferred file name, or tag hints). Produce a ready-to-write page that matches this repo's conventions and is wired into the sidebar.

**Canonical style reference**: [conventions.md](conventions.md). Read it before generating path/frontmatter.

## Workflow

1. **Parse the user's input.**
   - Extract the topic (existing category like `Docker`, `Python`, `Snippets/Components`) and the page concept.
   - Look for an explicit path, page name, tags, or reference URLs. Use whatever the user gave verbatim.
   - Look for modifier keywords: `mdx` → use `.mdx` extension; `with i18n` → also create an English mirror under `i18n/en/docusaurus-plugin-content-docs/`.

2. **Determine the target path.**
   - Read `sidebars.js` and list existing topic directories to pick the right parent.
   - If the user's topic doesn't match an existing directory, ask before creating a new top-level topic (it would also need a new category block in `sidebars.js` with a `README.md`).
   - Generate a PascalCase `<PageName>` that is short, content-oriented, and descriptive (e.g., `Timer`, `Docusaurus-Umami`, `NginxReverseProxy`, `Cases`).
   - Target: `docs/<Topic>/<PageName>.md` — use `.mdx` only if the user said `mdx` or the page will clearly need imports.
   - If the target file already exists, stop and ask.

3. **Suggest tags.**
   - Read `docs/tags.yml`. Prefer existing tags.
   - Follow the "topic → tag" mapping in conventions.md. Snippets always include the `Snippet` tag.
   - Flag any new tag that is not yet in `docs/tags.yml`.

4. **Build frontmatter.**
   - Content pages use: `tags`, `title`, `keywords` (YAML list), optional `references`, optional `recommended`, optional `description`.
   - `title` matches the topic naturally (Chinese or English — mirror the style of sibling pages in the same directory).
   - `keywords` includes the tag plus 1–3 related terms.

5. **Format references (if user provided URLs).**
   - Same as the `new-blog` skill. Fetch/infer `author`, `title`, `time` from the user's message; use a placeholder title if the user only gave a URL, and flag it.

6. **Determine sidebar insertion point.**
   - Read `sidebars.js` and find the category whose `id` matches `<Topic>/README` (or nested path).
   - The new doc ID is `<Topic>/<PageName>`.
   - Append to the end of that category's `items:` array. If the topic uses a `sidebar_position`-style ordering, respect it.
   - Note whether the target is in `tutorialSidebar` or `snippetsSidebar`. `Snippets/*` goes in `snippetsSidebar`; everything else in `tutorialSidebar`.

7. **Confirm with the user** unless the user's input is fully explicit (path + title + tags). Show:
   - Target file path
   - Frontmatter preview
   - New tags to be added to `docs/tags.yml` (if any)
   - Sidebar insertion (sidebar name + category label + position)
   Ask: "Proceed?"

8. **Create the doc file.**
   ```markdown
   ---
   tags: [<Tag>]
   title: <Title>
   keywords:
     - <Keyword1>
     - <Keyword2>
   <optional: references block>
   ---

   # <Title>

   <1-sentence placeholder intro>

   ## 
   ```
   - Skip the trailing empty `##` if the user provided substantive content hints.
   - For `.mdx`, add any needed imports above the H1.

9. **Insert into `sidebars.js`.**
   - Use `Edit` to add `"<Topic>/<PageName>",` into the correct `items:` array.
   - Preserve existing formatting (2-space indent, trailing comma style).
   - If the array uses single-line format (e.g., `items: ["Docker/Basic", "Docker/Command"]`), add to the end inline. If multi-line, add on a new line.

10. **Update `docs/tags.yml`** for any new tags.
    - Alphabetical, blank-line-separated, same format as blog tags:
      ```yaml
      <TagName>:
        description: <TagName>
        label: <TagName>
        permalink: /<TagName-with-hyphens>
      ```

11. **i18n (only if user asked).**
    - Create `i18n/en/docusaurus-plugin-content-docs/current/<Topic>/<PageName>.md` (check existing i18n dir structure first — the path shape is mirrored under `i18n/en/docusaurus-plugin-content-docs/`).
    - Use the same frontmatter with a translated `title` and placeholder English body.

12. **Report.**
    - Print the created/modified file paths.
    - Show the exact sidebar line inserted.
    - Flag placeholders (reference titles, intro) for the user to fill in.
    - Suggest `/writing-style <path>` as the next step if the user wants help drafting the body in the repo's voice.
    - Do not stage or commit.

## Guardrails

- Never overwrite an existing doc file. If the target exists, stop and ask.
- Never add a doc ID to `sidebars.js` that's already there.
- Never create a new top-level topic without asking — that also requires a `README.md` and a new category block.
- Never invent reference titles/authors. Use a placeholder and flag it.
- Never create i18n unless the user asked.
- `Snippet` tag is mandatory for snippet pages; don't drop it.
