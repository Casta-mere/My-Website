---
tags: [Code Highlight]
title: 美化 Code Blocks
keywords:
  - docusaurus Code blocks
---

import { Icon } from "@site/src/components/Icon";

# 美化 Code Blocks

- **自定义代码块高亮颜色**
- **为语言添加图标**
- **添加自定义图标**

## 添加图标

使用 [iconify] 添加图标

```bash title="IconifyIcon" icon="npm"
npm install --save-dev @iconify/react
```

目前预设的一些图标

<div className="tailwind">
  <div className="flex gap-2 items-center">
    <Icon icon="bash" />
    <Icon icon="c" />
    <Icon icon="cpp" />
    <Icon icon="css" />
    <Icon icon="docusaurus" />
    <Icon icon="js" />
    <Icon icon="json" />
    <Icon icon="latex" />
    <Icon icon="markdown" />
    <Icon icon="npm" />
    <Icon icon="prisma" />
    <Icon icon="python" />
    <Icon icon="ts" />
    <Icon icon="tsx" />
    <Icon icon="vscode" />
  </div>
</div>

Icon 组件可以在[这里](https://github.com/Casta-mere/My-Website/blob/master/src/components/Icon/index.tsx)查看

## 如何设置 Prisma 高亮颜色

进入到如下路径，将当前使用的主题替换 or 添加新的主题

```bash showLineNumbers title="文件路径"
node_modules/prism-react-render/dist/index.js
```

```js showLineNumbers title="docusautus.config.js" icon ="docusaurus"
// 在此查看 or 设置主题
prism: {
  // highlight-next-line
  theme: prismThemes.vsDark,
  // highlight-next-line
  darkTheme: prismThemes.vsDark,
  additionalLanguages: ['bash', 'latex', 'json', 'markdown', 'python'],
  magicComments: [
    ...
  ],
},
```

## 常见语言高亮

### JS

```js showLineNumbers title="JavaScript"
// 计算阶乘的函数
function factorial(n) {
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}
const NUMBER = 5; // 常量
let result = factorial(NUMBER);
console.log(`The factorial of ${NUMBER} is ${result}.`);
```

### Json

```json showLineNumbers title="JSON"
{
  "name": "John Doe",
  "age": 30,
  "isEmployee": true,
  "address": {
    "street": "123 Main St",
    "city": "Anytown",
    "zip": "12345"
  },
  "phoneNumbers": [
    { "type": "home", "number": "212 555-1234" },
    { "type": "office", "number": "646 555-4567" }
  ],
  "spouse": null
}
```

### Python

```python showLineNumbers title="Python"
class Calculator:
    """Simple calculator class."""
    def __init__(self):
        pass

    def add(self, a, b):
        return a + b

# 创建 Calculator 的实例并调用加法方法
calc = Calculator()
result = calc.add(3, 4)
print(f"The result is {result}")  # 输出结果
```

### Bash

```bash showLineNumbers title="Bash"
#!/bin/bash
# 输出传入参数
echo "You entered: $1"
# 设置变量
DIR="/usr/local"
# 检查目录是否存在
if [ -d "$DIR" ]; then
    echo "The directory $DIR exists."
else
    echo "The directory $DIR does not exist."
fi
```

### Latex

```latex showLineNumbers title="Latex"
% 在 LaTeX 中定义一个简单的命令
\documentclass{article}
\usepackage{amsmath}
\newcommand{\vect}[1]{\boldsymbol{#1}}
\begin{document}
% 文本部分
Hello, world! This is a simple LaTeX example with an equation.
% 公式部分
\begin{equation}
\vect{v} = \vect{u} + \vect{w}
\end{equation}
\end{document}
```

### Markdown

```markdown showLineNumbers title="Markdown"
# Markdown Example

This is a **Markdown** document.

- Bullet points
- Another point

1. Numbered list
2. Second item

> Blockquote text under here.

`Inline code` with backticks.
```

### C

```c showLineNumbers title="C"
#include <stdio.h>
#define MAX 10 // 预处理器常量

// 主函数
int main() {
    // 输出信息
    printf("Hello, world!\n");
    int array[MAX];
    for (int i = 0; i < MAX; i++) {
        array[i] = i;
    }
    return 0; // 返回值
}
```

### C++

```cpp showLineNumbers title="C++"
#include <iostream>
#include <vector>
using namespace std;

// C++ 类的示例
class Point {
public:
    int x, y;
    Point(int x, int y) : x(x), y(y) {}
    void print() const {
        cout << "Point(" << x << ", " << y << ")" << endl;
    }
};

// 主函数
int main() {
    vector<Point> points = {Point(1, 2), Point(3, 4)};
    for (const auto& point : points) {
        point.print();
    }
    return 0; // 返回值
}
```

## 个人预设

```js showLineNumbers
var CastamereTheme = {
  plain: {
    color: "#FFFFFF",
    backgroundColor: "#292b31",
  },
  styles: [
    {
      types: ["prolog"],
      style: {
        color: "rgb(0, 0, 128)",
      },
    },
    {
      types: ["comment"],
      style: {
        color: "rgb(106, 153, 85)",
      },
    },
    {
      types: ["builtin", "changed", "keyword", "interpolation-punctuation"],
      style: {
        color: "rgb(86, 156, 214)",
      },
    },
    {
      types: ["number", "inserted"],
      style: {
        color: "rgb(181, 206, 168)",
      },
    },
    {
      types: ["constant"],
      style: {
        color: "rgb(100, 102, 149)",
      },
    },
    {
      types: ["attr-name", "variable"],
      style: {
        color: "rgb(156, 220, 254)",
      },
    },
    {
      types: ["property-access"],
      style: {
        color: "rgb(255, 255, 255)",
      },
    },
    {
      types: ["deleted", "string", "attr-value", "template-punctuation"],
      style: {
        color: "rgb(206, 145, 120)",
      },
    },
    {
      types: ["selector"],
      style: {
        color: "rgb(215, 186, 125)",
      },
    },
    {
      // Fix tag color
      types: ["tag"],
      style: {
        color: "rgb(86, 156, 214)",
      },
    },
    {
      // Fix tag color for HTML
      types: ["tag"],
      languages: ["markup"],
      style: {
        color: "rgb(86, 156, 214)",
      },
    },
    {
      types: ["punctuation", "operator"],
      style: {
        color: "rgb(212, 212, 212)",
      },
    },
    {
      // Fix punctuation color for HTML
      types: ["punctuation"],
      languages: ["markup"],
      style: {
        color: "#808080",
      },
    },
    {
      types: ["function"],
      style: {
        color: "rgb(255, 255, 255)",
      },
    },
    {
      types: ["class-name"],
      style: {
        color: "rgb(86, 156, 214)",
      },
    },
    {
      types: ["char"],
      style: {
        color: "rgb(209, 105, 105)",
      },
    },
    // bash
    {
      types: ["function"],
      languages: ["bash"],
      style: {
        color: "rgb(206, 145, 120)",
      },
    },
    {
      types: ["important"],
      languages: ["bash"],
      style: {
        color: "rgb(128, 128, 128)",
      },
    },
    // Json
    {
      types: ["property"],
      languages: ["json"],
      style: {
        color: "rgb(156, 220, 254)",
      },
    },
    {
      types: ["boolean"],
      languages: ["json"],
      style: {
        color: "rgb(86, 156, 214)",
      },
    },
    // Latex
    {
      types: ["selector"],
      language: ["latex"],
      style: {
        color: "rgb(86, 156, 214)",
      },
    },
    // C & CPP
    {
      types: ["directive-hash"],
      language: ["c", "cpp"],
      style: {
        color: "rgb(86, 156, 214)",
      },
    },
  ],
};
var vsDark_default = CastamereTheme;
```

[iconify]: https://icon-sets.iconify.design/
