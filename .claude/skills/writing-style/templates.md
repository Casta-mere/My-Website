# Post-shape templates

Skeletons for the five shapes detected by `SKILL.md`. Each template shows the **body structure** only — frontmatter is the `new-blog` / `new-doc` skill's job.

Voice cues appear as `<!-- cue: ... -->` comments. Remove them from the final output.

---

## 1. Fix / troubleshoot (blog)

Trigger: title ends with `问题`, or the post is about resolving a specific error.

Reference post: `blog/2026/01/06-GithubSAMLSSO/index.md`.

```markdown
# <Title — usually ends with 问题>

<one-sentence description of what's being solved>

:::danger Error
<paste the actual error output the reader would see>
:::

<!--truncate-->

## 缘起

<!-- cue: situation → symptom → "记录一下". 2–4 sentences. -->
<context: when/where the author hit this> 。<what broke> 。<记录一下 / 踩了个坑 / 花了点时间 framing>

## 解决方案

<!-- cue: narrate the fix as a sequence of attempts, not a polished recipe. Show the dead-ends briefly. -->
<first attempt, what it taught us>

:::danger Error
<secondary error output if the first fix surfaced a more useful one>
:::

<explanation of what the error is actually telling us>

<numbered list of the final working steps>

1. <step>
2. <step>
   ![screenshot-alt](image/foo.png)
3. <step>

## 后记

<!-- cue: optional — tip, related config, or gotcha the reader should know next. One short block. -->
<related command / config>

\`\`\`bash
<supporting command>
\`\`\`
```

---

## 2. Concept / deep-dive (blog)

Trigger: explanatory topic, usually with `references:` in frontmatter, comparison tables, longer outline.

Reference posts: `blog/2026/01/12-RPC/index.md`.

```markdown
# <Title>

<one-sentence definition or reframing — "X，可以理解为 …">

<!--truncate-->

## 缘起

<!-- cue: why the author cares. Often a "笔者的第一反应是 …" beat. -->
<triggering question or observation> 。笔者的第一反应是：<naive take> 。<why that's incomplete>

## <Concept> 是什么

<!-- cue: definition + 2–3 sentences of reframing. Include the English term in parens on first mention: 资源 (Resource). -->

## 与 <adjacent concept> 的区别

<!-- cue: comparison table is a signature move for this shape. -->

| 维度 | <A> | <B> |
|---|---|---|
| <axis> | … | … |

<2–3 sentences of takeaway from the table — what should the reader walk away with>

## 实践

<!-- cue: minimal runnable example. "这里给出一个 python 的例子" is the typical lead-in. -->

这里给出一个 python 的例子：

\`\`\`python title="example.py"
<code>
\`\`\`

运行结果如下：

\`\`\`
<output>
\`\`\`

## 后记

<!-- cue: pointer forward. "接下来研究 <next topic>" if there's a follow-up post planned. -->
接下来研究 <next topic>，<one sentence on what that will cover>
```

---

## 3. Tool roundup (blog)

Trigger: multiple `<GitHubRepo>` elements, or ≥3 H2s that each name a tool.

Reference post: `blog/2026/03/18-cmdToys/index.md`.

```markdown
import TabItem from "@theme/TabItem";
import Tabs from "@theme/Tabs";

<!--truncate-->

## 缘起

<!-- cue: occasion that prompted the roundup — new machine, new job, new mood. 1–2 sentences. -->
<trigger> 。<what this post covers and what's new vs. prior posts on the topic>

## <ToolName>

[<ToolName>](<github-url>) <one-sentence description of what it replaces or adds>

![<tool> demo](image/<tool>-demo.png)

<Tabs groupId="operating-systems">
  <TabItem value="MacOS" label="MacOS">

\`\`\`bash
brew install <tool>
\`\`\`

  </TabItem>
  <TabItem value="Linux" label="Linux">

\`\`\`bash
sudo apt install <tool>
\`\`\`

  </TabItem>
</Tabs>

### 参数

<!-- cue: optional — only include if the author actually uses specific flags worth calling out. -->

这里笔者列出一些比较实用的参数：

- `-flag`：<what it does>

![flag](image/<tool>-flag.png)

### 个人预设

<!-- cue: optional — the author's aliases / config for this tool. Signature section. -->

笔者添加了以下预设

\`\`\`bash title="~/.zshrc"
alias <shortname>='<tool> <preferred-flags>'
\`\`\`

效果如下：

![<tool> preset demo](image/<tool>-preset.png)

## <NextToolName>

<!-- cue: repeat the structure. Not every tool needs 参数 + 个人预设 — include only what applies. -->
...
```

---

## 4. Tutorial doc

Trigger: `docs/<Topic>/<PageName>.md` that is not a Snippet. Reference style, not narrative.

Reference pages: `docs/Docker/Basic.md`, `docs/Python/Basic.md`, `docs/Server/NginxReverseProxy.md`.

```markdown
# <Title>

<1–2 sentence intro — what this page covers and who it's for. No 缘起. No 笔者 unless there's a ### 个人预设 section.>

## 安装

<!-- cue: platform tabs if relevant. Otherwise a single code block. -->

\`\`\`bash
<install command>
\`\`\`

:::tip
<related tip —换源, prerequisite, common gotcha>
:::

## 基础用法

<!-- cue: minimal example that proves the install worked. -->

\`\`\`bash
<command> <args>
\`\`\`

:::info
<contextual info that helps the reader understand what they just ran>
:::

## 进阶

<!-- cue: 2–4 subsections on the next-most-useful features. Use H3 for each. -->

### <feature>

<explanation + code block>

### <feature>

<explanation + code block>

## 参考

<!-- cue: optional — link list to official docs or further reading. -->

- [<resource>](<url>)
```

---

## 5. Snippet doc

Trigger: path under `docs/Snippets/**` or frontmatter tag includes `Snippet`.

Reference pages: `docs/Snippets/Python/Timer.md`, `docs/Snippets/Components/TypeWriter.md`.

```markdown
# <Title>

<one-sentence description of what the snippet does and when to reach for it>

\`\`\`<lang> title="<PageName>.<ext>" showLineNumbers
<the snippet>
\`\`\`

<!-- cue: optional — one follow-up paragraph if there's a non-obvious usage note or caveat. Often there isn't. -->
```
