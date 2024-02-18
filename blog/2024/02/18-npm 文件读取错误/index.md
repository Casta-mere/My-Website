---
slug: NpmFileReadError
title: npm 文件夹/文件读取错误
authors: [Castamere]
tags: [OS]
---

在使用`npm run start`指令时，报如下错误。其本质为一个文件被异常识别为了文件夹导致的问题

:::danger ERROR
[Error: EISDIR: illegal operation on a directory, read] \{
  errno: -21,
  code: 'EISDIR',
  syscall: 'read'
\}
:::

并在删除文件时报如下错误(Win 10)

:::danger ERROR
**0x80070570** 文件或目录损坏且无法读取
:::

本文就此问题给出解决方法

<!--truncate-->

## 缘起

笔者使用的是 Windows 10 / Linux 双系统。在 Windows 下使用 VS Code 打开某个文件的情况下，直接"休眠"电脑，再使用 Ubuntu 启动时，导致项目中一个文件被异常识别为了文件夹。在使用`npm run start`指令时，报了如下错误

```plain title="npm run start"
[INFO] Starting the development server...
[ERROR] Loading of version failed for version current

[Error: EISDIR: illegal operation on a directory, read] {
  errno: -21,
  code: 'EISDIR',
  syscall: 'read'
}

[INFO] Docusaurus version: 3.0.0
Node version: v18.18.2
```

## 分析

笔者尝试了多种方法都无法删除该文件，包括使用 VS Code、使用文件管理器、甚至`sudo rm -rf`都无法处理

看到网上的一种解决办法是使用`chkdsk e: /f`指令来修复，只需要把参数换为损坏的文件所在的盘即可，但笔者使用时报错，为了避免磁盘被格式化，没有继续

## 解决

最终解决办法如下:

首先打开我的电脑找到文件所在盘

右击对应盘，点击"属性"

点击"工具"

点击"扫描"

等待扫描完成后即可进行修复

## 后记

遇到