---
slug: UpgradeDocusaurus39
title:  更新 Docusaurus V3.9.0
authors: [Castamere]
tags: [Docusaurus]
---

# 更新 Docusaurus V3.9.0

等了很久的 V3.9 突然更新了

时隔十个月，再次更新版本，看有没有什么新花样

<!-- truncate -->

## CodeBlock

之前的 CodeBlock 使用 `metastring` 获取行内的信息，例如 

```md
jsx title="Example.js" highlight="1,3-5" live
bash title="IconifyIcon" icon="npm"
```

之前的 icon 就是这样添加的

```tsx title="src/theme/CodeBlock/Content/String.tsx"
...
const title = parseCodeBlockTitle(metastring) || titleProp;
// highlight-next-line
const icon = parseIcon(metastring);
...
return (
<Container >
    {title && (
    <div className="tailwind">
        <div className={styles.codeBlockTitle}>
        <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center p-3">
            {/* 一个自定义的 Icon */}
            {/* highlight-next-line */}
            {icon}
            {title}
            </div>
            {/* 以及一个 language 的 Icon */}
            {/* highlight-start */}
            {language && (
            <div className="mr-3">
                <Icon icon={language} />
            </div>
            )}
            {/* highlight-end */}
        </div>
        </div>
    </div>
    )}
    </Container>
)
``` 

但是更新到 V3.9.0 之后，`metastring` 被移除了，取而代之的是直接给了个 Hook `useCodeBlockContext()`，仅能提供以下信息

```tsx title="CodeBlockMetadata"
export interface CodeBlockMetadata {
  codeInput: string; // Including magic comments
  code: string; // Rendered code, excluding magic comments
  className: string; // There's always a "language-<lang>" className
  language: string;
  title: ReactNode;
  lineNumbersStart: number | undefined;
  lineClassNames: CodeLineClassNames;
}
```

而且 CodeBlock 的组件结构也大改，基本推翻重做了(这不应该是4.0再做的事吗，说好的 Semantic Versioning, no breaking change 呢)，所以只能重新 swizzle 了

旧（v3.6.x）

```
CodeBlock
├─ Container
├─ Content
│  ├─ Element
│  └─ String
├─ CopyButton
├─ Line
└─ WordWrapButton
```

新（v3.9.x）

```
CodeBlock
├─ Buttons
│  ├─ Button
│  ├─ CopyButton   ← from: CopyButton
│  └─ WordWrapButton   ← from: WordWrapButton
├─ Container
├─ Content
│  ├─ Element
│  └─ String
├─ Layout
├─ Line
│  └─ Token
└─ Title
```

CopyButton 与 WordWrapButton 迁入 Buttons 分组；新增 Buttons、Layout、Line/Token、Title，其余保持不变

把 CodeBlock 能 swizzle 的组件都 swizzle 了一遍之后，最后用 `npm run swizzle @docusaurus/theme-classic CodeBlock/Layout` ，也就是改 `/theme/CodeBlock/Layout/index.tsx` 来适配

```tsx title="src/theme/CodeBlock/Layout/index.tsx"
  import { Icon } from "@site/src/components/Icon";
  
  export default function CodeBlockLayout({ className }: Props): ReactNode {
    const { metadata } = useCodeBlockContext();
  
    return (
      <Container as="div" className={clsx(className, metadata.className)}>
        {metadata.title && (
          <div className="tailwind">
            <div className={styles.codeBlockTitle}>
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  {/* {icon} */}
                  <Title>{metadata.title}</Title>
                </div>
                {/* language 还是能是正常获取到 */}
                {/* git-add-start */}
+               {metadata.language && (
+                 <div className="mr-3">
+                   <Icon icon={metadata.language} />
+                 </div>
+               )}
                {/* git-add-end */}
              </div>
            </div>
          </div>
        )}
        ...
      </Container>
    );
  }
```

显示语言的图标，因为 `metadata` 中能获取到，可以直接添加。但自定义图标加不上去了

也不是加不上去，得去很底层的地方改，前面提到的 `CodeBlockMetadata` 以及获取的方法，都定义到了 `/node_modules/@docusaurus/theme-common/src/utils/codeBlockUtils.tsx`。从这个地方改实在是有点笨，不好适应版本更新，慢慢研究吧


## Mermaid

更新之后 Mermaid 更新了  Eclipse Layout Kernel，需要重新升级一下，具体是什么还没研究


```bash
npm install @mermaid-js/layout-elk
```

## 其他

### onBrokenMarkdownLinks

这个现在移动到了 markdown.hooks 下面了

```ts title="docusaurus.config.ts"
markdown: {
    mermaid: true,
    hooks:{
      onBrokenMarkdownLinks: "throw",
    }
  },
```
## 后记

等到 4.0 ，可能需要把很多东西推倒重做，到时候又是一项大工程