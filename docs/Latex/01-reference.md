---
last_update:
  date: 19 JAN 2024 GMT
  author: Casta-mere
---

# 引用

在文中以上标的形式显示引用，并有超链接至文末。

:::important
本篇均建立在安装好 TeXworks editor,，使用 VS Code 编写编译，并在 VS Code 中安装 LaTeX Workshop 插件的基础上
:::

## 完整 Demo

[Download Demo](./demo/01-reference.zip)

```latex showLineNumbers
\documentclass{ctexart} % 使用ctex以支持中文字符

\RequirePackage{natbib}
\bibliographystyle{unsrtnat}
\bibpunct{[}{]}{;}{s}{,}{,} % 第一，二个参数为括号样式，可以换成小括号
\usepackage[hidelinks]{hyperref} % 用于超链接

\pagestyle{empty} % 去掉页眉页脚等，与引用无关

\begin{document}

这是一段演示\cite{CastamereAddReference2024} % 使用\cite{}进行文内引用

\bibliography{references/references} % 使用\bibliography{}在此处列出所有参考文献

\end{document}
```

## 如何编译

一篇简单的，纯文字的文章如果需要使用 LaTeX 来排版，在包含中文字符的情况下，只需要使用 XeLaTeX 编译一遍即可。但在编写论文时，需要用到最重要的两个特性：图表编号和引用，参考文献引用，则需要更复杂的编译

:::info
XeLaTeX(XƎTEX) 是一种使用 Unicode 的 TeX 排版引擎

XeLaTeX 原生支持 Unicode，并默认其输入文件为 UTF-8 编码。可以在不进行额外配置的情况下直接使用操作系统中安装的字体包括 OpenType (.otf) 和 TrueType (.ttf) 字体。因此，用户可以很容易地使用不同的字体，包括多字节字符集，如中文、日文、韩文等
:::

为了完成图表编号和引用，以及参考文献引用，笔者使用的编译配置如下`xelatex -> bibtex -> xelatex -> xelatex`。在 [Demo](./demo/01-reference.zip) 中的 .vscode/settings.json 中有详细内容，本节末尾`latex-workshop配置`处也有详细配置内容，不关心原理的同学可以直接拿去用

### 编译原理

第一次 `xelatex` 编译：处理 LaTeX 源文件，并生成一个 `.aux` 辅助文件，其中包含了图表、公式、文献引用的标签等信息。但是在这个阶段，交叉引用的标签还没有解析，所以引用处仅仅标记为问号(?)

`bibtex` 编译：处理 `.aux` 文件，并根据里面的引用(例如 `\cite{...}` 命令)到 `.bib` 文件中查找对应的文献条目，然后生成一个文献引用列表(通常是 `.bbl` 文件)，此列表将在后续的 LaTeX 编译过程中被引入

第二次 `xelatex` 编译：再次处理 LaTeX 源文件，这次它会读取 `.bbl` 文件并且将正确的引用插入到文档中。同时，它会更新 `.aux` 文件中的交叉引用信息

第三次 `xelatex` 编译：最后一次编译是为了确保所有交叉引用(包括那些在引用文献或图表编号后出现的)都能正确解析。由于交叉引用可能依赖文献引用(可能影响引用的编号)，因此还需要一次编译来确保一切都已解析完毕，文档中的所有引用都是正确的

### VS Code 插件 latex-workshop 配置

<details>
  <summary>latex-workshop配置</summary>

```json showLineNumbers
{
"latex-workshop.latex.tools": [
    {
        "name": "xelatex",
        "command": "xelatex",
        "args": [
            "-synctex=1",
            "-interaction=nonstopmode",
            "-shell-escape",
            "-file-line-error",
            "-pdf",
            "%DOCFILE%"
        ]
    },
    {
        "name": "bibtex",
        "command": "bibtex",
        "args": [
            "%DOCFILE%"
        ]
    }
],
"latex-workshop.latex.recipes": [
    {
        "name": "Castamere",
        "tools": [
            "xelatex",
            "bibtex",
            "xelatex",
            "xelatex"
        ]
    },
]
}
```
</details>

## 文章最后的“参考文献”部分

### 修改最后的“参考文献”字样

```latex
% 如显示“参考文献”，居中，四号则如下
\renewcommand{\refname}{\begin{center} \sihao 参考文献 \end{center}}

% 或者想要“Reference”，向左对齐
\renewcommand{\refname}{Reference}
```

### 如何在最后添加参考文献

```latex
% 下面这句用来在目录中添加“参考文献”或“Reference”
\phantomsection\addcontentsline{toc}{section}{Reference}
\phantomsection\addcontentsline{toc}{section}{参考文献}

% 引用放在references/references.bib内
\bibliography{references/references}
```

## bibtex 常见问题

### 转义字符

有时候引用报错可能是文章名出现 LaTeX 需要转义的字符，比如 `_%&` 这些，最常见就是因为下划线导致编译失败，需要在 bibtex 中也进行转义。

| 需转义字符 | Latex 指令 | 需转义字符 | Latex 指令 |
| :--------: | :--------: | :--------: | :--------: |
|     \_     |    \\\_    |     \{     |    \\\{    |
|     %      |    \\%     |     \}     |    \\\}    |
|     &      |    \\&     |     ^      |    \\^     |
|     $      |    \\$     |     \      | \backslash |