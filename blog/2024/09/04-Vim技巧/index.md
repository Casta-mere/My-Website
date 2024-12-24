---
slug: VimTip
title: Vim 小技巧
authors: [Castamere]
tags: [Vim, Tip]
---

列举一些好用的 Vim 小技巧(**持续更新**)，目前有：

- [查找替换](/blog/VimTip#查找替换)
- [显示行号](/blog/VimTip#显示行号)

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
