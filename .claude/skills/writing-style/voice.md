# Voice reference (analyzed 2026-04-20)

Canonical voice / tone / word-choice reference for the `writing-style` skill. Distilled from the full blog + docs corpus. Companion to `templates.md`.

Frontmatter, slug, path, tag, and sidebar rules live in `new-blog/conventions.md` and `new-doc/conventions.md`. This file is about **prose** only.

## Persona

- **Primary author voice: 笔者.** Used for any statement of personal action, preference, or experience. Examples from real posts:
  - "笔者的 Buddy 是一只六角龙，这是仅存的一张照片了" (`blog/2026/04/10-claudeBuddy`)
  - "这里笔者列出一些比较实用的参数" (`blog/2026/03/18-cmdToys`)
  - "笔者添加了以下预设" (`blog/2026/03/18-cmdToys`)
  - "笔者的第一反应是：这个似乎用 REST API 也能实现" (`blog/2026/01/12-RPC`)
- **我** is rare and reserved for casual/personal-life posts (e.g. `BrandNewStart`). Default to 笔者.
- **No "we", "let's", "let me", "let us"** — these are LLM tells. The author writes as an individual peer, not as a tutorial narrator.

## Tone

A peer sharing hard-won knowledge. Warm but competent. Subtle self-deprecation about pitfalls ("笔者也是踩了很多坑"), no boasting, no apology.

- **Direct, not throat-clearing.** Do not open with "本文将介绍…" or "在这篇文章中，我们将讨论…". Open with a problem, a definition, or a personal beat. See "Signature openings" below.
- **Pragmatic over comprehensive.** It is fine to list only the 5 flags the author actually uses, not all 47 that exist. The author openly says "笔者列出一些比较实用的参数".
- **Understated humor is welcome.** "其实也不是什么大功能，大概就是做一个宝可梦出来" (claudeBuddy). Do not reach for jokes; let them land when they do.

## Signature openings

Pick one based on post type. All examples are the first substantive sentence after frontmatter (sometimes before `<!--truncate-->`, sometimes inside `## 缘起`).

| Shape | Opening style | Example |
|---|---|---|
| fix | Problem statement, one sentence | "解决 Github SAML SSO 导致无法 clone 代码的问题" (`GithubSAMLSSO`) |
| fix (alt) | Situation + resolution promise | "新公司用 github，拉进 organization 之后，发现本地无法 clone 代码。报错说要重新授权，记录一下" (`GithubSAMLSSO`) |
| concept | Definition + reframing | "Remote Procedure Call 远程过程调用, 可以理解为让调用远端服务'像调用本地函数一样'" (`RPC`) |
| concept (alt) | Personal reaction | "笔者的第一反应是：这个似乎用 REST API 也能实现" (`RPC`) |
| roundup | Occasion / trigger | "拿到新 Mac 后，配置新终端参考了之前的一些文章，也发现了一些新的小工具" (`cmdToys`) |
| news | Timestamped hook | "在 Claude Code 愚人节更新中，Anthropic 发布了 Claude buddy 功能" (`claudeBuddy`) |
| personal | Date anchor | "1 月 5 日，入职了新公司" (`BrandNewStart`) |

## Signature phrases & connectors

Use these as first-choice vocabulary. They are not required in every post, but they should surface naturally when the situation calls for them.

| Phrase | Meaning / use | Example in the wild |
|---|---|---|
| `缘起` | First H2 section of almost every blog post. Explains what triggered the post. | Used in 16+ posts |
| `后记` | Closing H2 section with a tip, next step, or loose end. | `GithubSAMLSSO`, `RPC` |
| `接上篇` | Open a follow-up post. | `gRPC`: "接上篇，本篇详细介绍 gRPC" |
| `笔者` | Author self-reference (see Persona). | everywhere |
| `踩坑` | Casual idiom for "hit a problem / bug". | `openclaw`: "笔者也是踩了很多坑" |
| `实际上` | Introduces a nuance, correction, or reality-check. | `RPC` |
| `显然` | Draws a conclusion the reader should already see. | `RPC` |
| `可见` | Evidentiary conclusion ("as we can see"). | `RPC` |
| `接下来` | Forward reference / bridge to next section or post. | `RPC`: "接下来研究 gRPC" |
| `记录一下` | Low-key framing for a small how-to / note. | `GithubSAMLSSO` |
| `如下` / `这里` / `此处` | Pointers into adjacent example/code. | `cmdToys`: "这里给出一个 python 的例子" |

## Code-switching (Chinese ↔ English)

Free mixing is not only allowed, it's a feature of the voice.

- **English for**: proper nouns (GitHub, Anthropic, Docker), tech terms (coroutine, event loop, hydration), product names, commands, file paths, error messages.
- **English glosses in parentheses** when first introducing a translated concept: `资源 (Resource)`, `协程 (coroutines)`.
- **Single quotes around inline English terms** that are being talked *about* rather than used: `'xxx'`, `'Resource'`.
- **English connectors mid-Chinese sentence** are a signature move. Use sparingly — 1–2 per post max, and only when the English word does real work: "But 在后续的 V2.1.97 中，这个功能被移除了" (`claudeBuddy`).
- **Never invent a Chinese translation** for a concept the author normally leaves in English. Don't translate "hook" to "钩子" if the author writes "hook".
- **Never translate a Chinese cultural concept into English** for readers. 缘起 is 缘起, not "origin story".

## Punctuation patterns

- **Em-dashes (——)** for emphasis or an abrupt aside, Chinese-style (double em). Use sparingly.
- **Parentheses ()** for English glosses and clarifications.
- **Single quotes '…'** around inline English terms being discussed.
- **Full-width Chinese punctuation** (，。：；？！) in Chinese prose; half-width ASCII (`,.:;?!`) in code, English sentences, and filenames.
- **Colons** before inline examples or lists: "这里笔者列出一些比较实用的参数："
- **No trailing period** on headings. Ever.

## Section & paragraph rhythm

- **Heading depth**: H1 for the title, H2 for major sections, H3 for subsections. No H4+.
- **Paragraph length**: 1–4 sentences typical. Single-sentence paragraphs are fine and common.
- **Lists** for parameters, install steps, sequential actions. **Prose** for motivation and explanation.
- **Code blocks are introduced casually**, not formally: "这里给出一个 python 的例子", "运行结果如下", "安装方式如下". Avoid "下面是代码示例：" — too formal.
- **Images are rarely captioned in prose.** The alt text carries the label; the surrounding sentence sets up what to look at.

## Components & markdown extensions (body-level)

- `<GitHubRepo owner="..." repo="..." />` — repo cards. Place after the hook, before `<!--truncate-->`. Needs `import GitHubRepo from "@site/src/components/GitHubRepo";` at the top.
- `<Tabs groupId="operating-systems">` with `<TabItem value="MacOS" label="MacOS">` / `<TabItem value="Linux" label="Linux">` — OS-specific install/config. Needs the `Tabs` / `TabItem` imports.
- `:::danger Error` — wrap literal error output being diagnosed. Used in `GithubSAMLSSO`.
- `:::tip` / `:::info` / `:::important` — common in docs, rarer in blogs.
- `<!--truncate-->` — exactly this form (no inner spaces), placed after the opening hook and before the first `##` heading. Blog only.

## Closing style

- **Blog**: `## 后记` section with a related tip, next-post pointer, or loose end. Do not write "thanks for reading" or a personal sign-off.
- **Doc tutorial**: no closing section by default; last `##` is the natural end. Optional `## 参考` with a link list.
- **Snippet doc**: ends with the code block. No closer.

## Anti-patterns (hard rules — reject in lint, rewrite in revise, never produce in draft)

- `总而言之` / `综上所述` / `综上` — generic LLM wrap-up. Drop entirely, or replace with `## 后记`.
- "in conclusion" / "to summarize" / "finally" — same problem, in English.
- "thanks for reading" / "hope this helps" / "希望对你有帮助" / "如果你觉得有用请点赞".
- "本文将介绍 …" / "在这篇文章中，我们将讨论 …" — remove, replace with a direct opening.
- "Let's …" / "让我们 …" / "我们来看看 …" — LLM narrator voice. The author is one person, not a tour guide.
- Emoji in headings or body prose. (Icon characters rendered by `<GitHubRepo>` are fine.)
- Excessive hedging: "可能也许大概", "I think maybe probably".
- Over-explaining basics: defining `git` for a reader who is clearly already using it.
- Forced transitions: "首先... 其次... 再次... 最后..." scaffolded onto a post that doesn't need ordinal structure.
- Bullet lists where prose would flow better. Not everything is a list.

## Blog vs doc split

| Aspect | Blog | Doc |
|---|---|---|
| `## 缘起` | Yes — almost always | No — docs are reference, not narrative |
| `## 后记` | Often | Rare; `## 参考` if anything |
| 笔者 voice | Heavy | Light — only in `### 个人预设`-style personal sections |
| Admonitions | Sparingly, mostly `:::danger Error` | Liberally — `:::info`, `:::tip`, `:::important`, `:::note`, `:::danger` |
| Length | 300–2000+ words | 50–400 (snippet) / 500–2500 (tutorial) |
| Personal anecdote | Welcome | Rare; stays in `### 个人预设` or out of the doc entirely |
| `<!--truncate-->` | Required | Not used |

When in doubt: blogs tell a story, docs answer a question. If the prose reads like a story, it belongs in `blog/`; if it reads like a lookup, it belongs in `docs/`.
