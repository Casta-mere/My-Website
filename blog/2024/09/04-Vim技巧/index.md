---
slug: VimTip
title: Vim 小技巧
authors: [Castamere]
tags: [Vim, Tip]
---

列举一些好用的 Vim 小技巧(**持续更新**)，目前有：

- [查找替换](/blog/VimTip#查找替换)
- [显示行号](/blog/VimTip#显示行号)
- [跳转](/blog/VimTip#跳转)
- [多行插入 Tab](/blog/VimTip#多行插入-tab)

<!--truncate-->

## 查找替换

```bash
:/old         # 查找 old 字符串，按 n 跳转到下一个匹配项，按 N 跳转到上一个匹配项
:%s/old/new/g # 将全文的 old 字符串换为 new 字符串
```

## 显示行号

```bash
:set number
```

## 跳转

```bash
:0 # 跳转到文件开头
:100 # 跳转到第100行
G # 跳转到文件结尾
```

## 多行插入 Tab

```bash
:1,10 > # 将第1行到第10行的缩进增加一个 Tab
:1,10 < # 将第1行到第10行的缩进减少一个 Tab
```
