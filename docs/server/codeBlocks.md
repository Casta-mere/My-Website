---
sidebar_position: 2
last_update:
    date: 8 NOV 2023 GMT
    author: Casta-mere
---

# 美化 Code Blocks

## 如何设置

路径

```bash showLineNumbers
node_modules/prism-react-render/dist/index.js
```

## Latex 样式

This is 

```latex
\education
{2020-09\quad 至今}
{浙江理工大学}
{计算机科学与技术\enspace (全英文)\enspace |\enspace 本科}
{GPA\enspace 3.76/5.00\enspace (前15 \%)}
{相关课程}
{
    \begingroup
    \begin{multicols}{2}
        \setlength{\columnseprule}{0pt}
        \begin{itemize}
            \item C程序设计 { \hfill (96) \qquad }

            \item 计算机网络 { \hfill (95) \qquad }

            \item 数据结构与算法 { \hfill (96) \qquad }

            \item 面向对象程序设计 { \hfill (93) \qquad }

        \end{itemize}
    \end{multicols}
    \endgroup
}
```

## 个人预设

```js showLineNumbers
var theme13 = {
  plain: {
    color: "#FFFFFF",
    backgroundColor: "#1E1E1E"
  },
  styles: [
    {
      types: ["prolog"],
      style: {
        color: "rgb(0, 0, 128)"
      }
    },
    {
      types: ["comment"],
      style: {
        color: "rgb(106, 153, 85)"
      }
    },
    {
      types: ["builtin", "changed", "keyword", "interpolation-punctuation"],
      style: {
        color: "rgb(86, 156, 214)"
      }
    },
    {
      types: ["number", "inserted"],
      style: {
        color: "rgb(181, 206, 168)"
      }
    },
    {
      types: ["constant"],
      style: {
        color: "rgb(100, 102, 149)"
      }
    },
    {
      types: ["attr-name", "variable"],
      style: {
        color: "rgb(156, 220, 254)"
      }
    },
    {
      types: ["property-access"],
      style: {
        color: "rgb(255, 255, 255)"
      }
    },
    {
      types: ["deleted", "string", "attr-value", "template-punctuation"],
      style: {
        color: "rgb(206, 145, 120)"
      }
    },
    {
      types: ["selector"],
      style: {
        color: "rgb(215, 186, 125)"
      }
    },
    {
      // Fix tag color
      types: ["tag"],
      style: {
        color: "rgb(86, 156, 214)"
      }
    },
    {
      // Fix tag color for HTML
      types: ["tag"],
      languages: ["markup"],
      style: {
        color: "rgb(86, 156, 214)"
      }
    },
    {
      types: ["punctuation", "operator"],
      style: {
        color: "rgb(212, 212, 212)"
      }
    },
    {
      // Fix punctuation color for HTML
      types: ["punctuation"],
      languages: ["markup"],
      style: {
        color: "#808080"
      }
    },
    {
      types: ["function"],
      style: {
        color: "rgb(255, 255, 255)"
      }
    },
    {
      types: ["function"],
      languages: ["bash"],
      style: {
        color: "rgb(206, 145, 120)"
      }
    },
    {
      types: ["class-name"],
      style: {
        color: "rgb(86, 156, 214)"
      }
    },
    {
      types: ["char"],
      style: {
        color: "rgb(209, 105, 105)"
      }
    }
  ]
};
var vsDark_default = theme13;
```