# Project memory

## Git commit subject convention

- Default to the repo's structured subject format: `<scope>-<action>: <subject>`.
- Use one of these scopes first: `blog`, `docs`, `page`, `system`, `i18n`.
- Prefer these actions: `add` for new primary content/features, `modify` for updates, fixes, or extensions, and `manage` only for rename/reorg housekeeping.
- Keep the subject short and content-oriented. Use the article title, doc path, page name, or feature name instead of a vague summary.
- For versioned content updates, keep the existing lineage and include a version marker such as `V0.2`, `V1.0`, or `V1.2` when prior commits for that unit use one.
- Append `(with i18n)` when the staged change set clearly includes matching localization work.
- The older repo history is inconsistent, but current commits should follow the structured prefixed style above.

## Scope hints

- `blog/*` changes usually map to `blog-*`.
- `docs/*` changes usually map to `docs-*`.
- `src/pages/*` and standalone page work usually map to `page-*`.
- Reusable site code, config, scripts, components, and build changes usually map to `system-*`.
- Translation-only changes can use `i18n`.
