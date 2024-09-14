---
sidebar_label: "Rules"
last_update:
  date: 14 SEP 2024 GMT
  author: Casta-mere
---

# 规范文档

## 命名规范

### Git 库命名规范

所有单词均首字母大写，用连字符连接前两个单词。或者全部用连字符连接，如:

- LaTeX-GraduationTemplate
- My-Website

部分合成词可以不使用连字符，如:

- Safehome

### 项目命名规范

所有图片文件夹均命名为`image`

项目根目录下包含

- `CODE` 文件夹，放全部代码文件
- `record` 记录版本信息，数据库表设计，过程中遇到的问题等

## My-Website 规范

### blog

每篇均按照`年/月/日-题目/index.md`的格式，注意为`xx/xx/xx-title`格式，如`09`的`0`不可省略

若包含图片，则在该目录下添加`image`文件夹存放图片

注意所有的`slug`均使用大驼峰命名

```
---
slug: ThisIsUpperCamelCase
title: precise
authors: [Castamere]
tags: [,]
---
```

### Docs

每个`.md`, `.mdx`文件命名尽量只用一个单词如`Title.md`，有序的文件夹下使用`01-Title.md`格式，注意首字母大写。单词过多则按照大驼峰命名，仅可在文件夹名字中添加连字符。该命名只会被用到页面的`slug`中

```
---
sidebar_label: ''
sidebar_position:
last_update:
  date: 01 Jan 2024 GMT
  author: Casta-mere
---
```

### Git 信息规范

```
docs-manage: manage content
docs-modify: filepath/filename modify content
docs-add: filepath/filename
blog-manage: manage content
blog-modify: filepath/filename modify content
blog-add: filepath/filename
system-modify: modify content
i18n: docId
```

`modify content`和`manage content` 应为一句话或者版本，首字母大写。下面是一些例子

i18n 分为两种情况：

- 首次添加翻译应为 `i18n: docId`
- 修改翻译应与 `docs-modify` 同步，合并到提交中，如 `docs-modify: 生命的意义 V1.0 (with i18n)`

```
docs-modify: Latex/01-reference V1.1
docs-modify: Plans/2024 Modify feburary
docs-modify: Plans/2024 Add feburary
docs-add: Plans/2024
blog-modify: 生命的意义 V1.0
blog-add: 生命的意义
i18n: 生命的意义
system-modify: Add Katex
system-modify: Add Link to Latex
```
