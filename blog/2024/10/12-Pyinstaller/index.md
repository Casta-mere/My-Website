---
slug: Pyinstaller
title: Python 脚本打包为 exe
authors: [Castamere]
tags: [Python]
references:
  - title: Python脚本打包成exe，看这一篇就够了！
    author: 利白
    time: 2024
    url: https://libaineu2004.blog.csdn.net/article/details/112612421
---

经典问题之 Python 脚本打包为 exe/bin

<!-- truncate -->

## 缘起

最近来的一个任务，要写一个脚本获取某个 API 下所有的设备数据，且最后的脚本是要给一线使用。需要打包成 exe 文件(本来一行命令能解决的事)

之前也使用 Pyinstaller 打包过，现在还是系统性写一下

## 虚拟环境

建议大家在打包前，单独为其创建一个虚拟环境，这样打包出来的文件就不会有依赖问题，也不会打包过多无用库，造成打包文件过大

如果没有安装过 conda，可以参考 [miniconda 的安装与使用](/blog/MiniConda) 这篇

## 安装 & 使用

```bash
conda install pyinstaller
```

```bash
pyinstaller -F -w -i "icon.ico" main.py
```

- `-F` 表示打包成单个文件
- `-w` 表示不显示控制台窗口
- `-i` 表示指定图标

:::info
在 `windows` 下会自动打包为 `exe` 文件，在 `linux` 下会打包为 `bin` 文件，都会储存在 `dist` 文件夹下
:::
