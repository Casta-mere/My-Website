---
slug: CleanUbuntu
title: Ubuntu清理空间
authors: [Castamere]
tags: [Ubuntu]
---

几种给 Ubuntu 清理空间(释放储存空间)的方法

<!--truncate-->

# Ubuntu清理空间

## 缘起

笔者当时在笔记本上搞了 Ubuntu 和 Windows 的双系统，当时不知道怎么想的，两个 SSD 有1.5T，但我只给 Ubuntu 分配了20G。但是用到现在，配置的东西多起来，也不敢直接推倒重装，只能先这样。平时也就轻度 Coding 和写 Blog， 所以也还算够，只是需要经常清理内存，本文就来介绍几个清理空间的方法

:::important

想配置双系统的朋友们，一开始就最好多分配点空间给 Ubuntu ，血的教训

:::

## 清理空间

### 清理 apt 缓存

Ubuntu 下使用 apt 管理软件包的时候，会自动缓存下载好的一些内容，包括安装好的以及卸载掉的包，这部分累积起来也消耗了一定的空间，最好隔一段时间清理一下

使用以下命令查看 apt 缓存的库和软件包占用的内存

```bash
sudo du -sh /var/cache/apt
```

使用以下命令来清理这部分

```bash
sudo apt-get clean
```

### 清理系统日志

使用以下命令查看系统日志占用的内存

```bash
journalctl --disk-usag
```

使用以下命令来清理这部分

```bash
sudo journalctl --vacuum-time=3d
```

### 清理 Snap 缓存

使用以下命令查看 Snap 占用的内存

```bash
du -h /var/lib/snapd/snaps
```

创建一个新的 .sh 文件，写入以下内容，添加执行权限，然后运行一下
```bash showLineNumbers
#!/bin/bash
# Removes old revisions of snaps
# CLOSE ALL SNAPS BEFORE RUNNING THIS
set -eu
snap list --all | awk '/disabled/{print $1, $3}' |
    while read snapname revision; do
        snap remove "$snapname" --revision="$revision"
    done
```

以防有读者不熟悉部分操作：

```bash
# Step 1
# 新建 main.sh ，笔者使用 nano 来创建并写入
# 读者可选择使用 vim 或者 echo "" > main.sh 来创建
nano main.sh

# Step 2
# 将上面部分的代码复制到 main.sh 中

# Step 3
# 添加执行权限
chmod 777 main.sh

# Step 4
# 运行
# 注意要先 cd 到 main.sh 所在的文件夹下 
./main.sh
```

## 后记

这里再贴一个常用的命令

```bash
# 查看空间使用情况
df -H
```

即使空间很大，也建议定期去清理一下，也可以使用定时脚本来清理。程序员就要去多折腾。