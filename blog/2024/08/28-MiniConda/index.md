---
slug: MiniConda
title: MiniConda 的安装与使用
authors: [Castamere]
tags: [MiniConda, Conda, Ubuntu, Zsh, Windows]
draft: true
---

<!-- truncate -->

## 缘起

## 安装

### Windows 下安装与配置

点击 [miniconda - windows] 下载即可(链接为 latest, 不必担心过期问题)

下载好后，除了修改一下安装位置，其他一路默认即可

安装完成后，打开 Windows Terminal，输入 `conda`, 大概率是无法识别的，这是因为**没有将其添加到环境变量**当中，but 笔者个人觉得安装 conda 的原因，就是不想污染原有的环境。这里就主要讲一下怎么把 miniconda 配置到 Windows Terminal 下

:::tip
想直接加到环境变量里的话，将 `安装路径\miniconda\condabin` 加到 Path 里即可，记得把安装路径换成 miniconda 的安装路径
:::

接下来将如何在 Windows Terminal 下配置 Conda 环境。如下图，打开 Windows Terminal，进入到设置(直接 `ctrl` + `,` 也可以)

![Windows Step 1](./image/winstep1.png)

在弹出的页面中，在左边滚动到最下面，选择 `添加新配置文件`，再选择 `新建空配置文件`

![Windows Step 2](./image/winstep2.png)

主要修改的是 `命令行` 这一条，正常来说，会有一个默认 `cmd` 的命令，我们在其后**添加** `"/K" 安装路径\miniconda\Scripts\activate.bat `。例如，笔者的安装路径为 `D:\Software\miniconda`，则命令行修改为 `%SystemRoot%\System32\cmd.exe "/K" D:\Software\miniconda\Scripts\activate.bat`

![Windows Step 3](./image/winstep3.png)

还可以修改一下诸如选项卡名称、配置文件名称等内容，修改完成后，记得点击**保存**

![Windows Step 4](./image/winstep4.png)

设置完成后，如下图，点击新建右边的下拉菜单，选择刚刚新建的配置文件，点击即可进入到 Conda 的 base 环境了

![Windows Step 5](./image/winstep5.png)

:::tip
Windows Terminal 自带快捷键，图上也能看到，可以直接使用 `ctrl` + `shift` + `对应编号` 快速新建对应环境命令行，比如 **wsl**, **conda** 等等
:::

可以看到，这里已经进入了 base 环境

![Windows Step 6](./image/winstep6.png)

:::tip
还可以修改进入 conda 之后，直接进入某个环境；并且也可以修改进入时所在的文件夹，默认为父进程的文件夹。读者可以把常用的环境写成一套配置，方便日后使用
:::

### Ubuntu (zsh) 下安装与配置

点击 [miniconda - linux] 下载即可(链接为 latest, 不必担心过期问题)

## 使用

### Conda install VS Pip install

### Conda Python 解释器

### 自动进入 Conda

可以设置进入终端后，自动进入 Conda 环境。如果不想要这个，也可以通过下面的命令来取消

```bash
conda config --set auto_activate_base false
conda config --set auto_activate_base true
```

## 后记

[miniconda - windows]: https://repo.anaconda.com/miniconda/Miniconda3-latest-Windows-x86_64.exe
[miniconda - linux]: https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
