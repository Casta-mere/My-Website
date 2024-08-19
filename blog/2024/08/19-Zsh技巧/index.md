---
slug: ZshTip
title: Zsh 小技巧
authors: [Castamere]
tags: [Zsh, Tip]
---

列举一些好用的 Zsh 小技巧(**持续更新**)，目前有：

<!--truncate-->

## 路径导航

在 zsh 中，不需要使用 `cd` 命令，直接输入一个合法的路径即可跳转。除此之外，可以使用缺省进行快速跳转，比如要跳转到 `/home/casta/My-Website/blog/2024/08/19-Zsh技巧` 路径下，可以直接输入 `/h/c/M/b/2/0/19` 再按下 tab, 会自动进行路径的补全(前提是能匹配到的只有这一个路径，如果有多个能匹配到，多加几个字母区分开即可)

![naivigation](./image/naivigation.gif)

在[配置 Linux 终端 (zsh)](./LinuxTerminal)中还提到过 `z` 插件，可以在历史去过的文件夹进行快速跳转

![z](./image/z.gif)
