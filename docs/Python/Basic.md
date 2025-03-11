---
tags: [Python]
title: Python 基础
keywords:
  - Python
  - pip
---

# Python 基础


## python 库安装

当需要某个库的时候，最简单的方法是 `pip install` 就好。但在服务器无法连接外网、从头配置环境等情况下，则需要别的办法

这里笔者介绍几种方法：

- [PyPI 找库](/docs/Python/Basic#pypi)
- [根据 requirements.txt 安装](/docs/Python/Basic#requirementstxt)
- [源码安装](/docs/Python/Basic#源码安装)

### PyPI

首先去 [PyPI] 找到需要的库，下载。一般会有两种形式: .tar.gz 以及 .whl

#### .tar.gz

:::important
该方式仅限于从 PyPI 下载下来的库，而非从 github 下载下来的**源码**。源码安装方式参考[这里](/docs/Python/Basic/#源码安装)
:::

该种格式下的库，传到服务器后先使用 `tar -xzvf xxx.tar.gz` 进行解压，然后进入解压的文件夹。使用如下命令安装即可(**该方式不需要 pip**)

```python title="安装 package"
python setup.py install
```

#### .whl

### requirements.txt

更常见的一种情况是，你需要安装一系列库，而这些库已经写好在 `requirements.txt` 中，这时候只需要执行如下命令即可

```bash
pip install -r requirements.txt
```

### 源码安装

源码安装更适用于你要的版本过于老，导致 PyPI 上没有现成的库，这个时候就去找源 Github 库，下载对应版本的压缩包。同时，当你在使用其他方式安装时出现如下报错时，也可以尝试该方法

:::danger ERROR
error in setup command: Error parsing .../xxx/setup.cfg: Exception: Versioning for this project requires either an sdist tarball, or access to an upstream git repository. It's also possible that there is a mismatch between the package name in setup.cfg and the argument given to pbr.version.VersionInfo. Project name xxx was given, but was not able to be found.
:::

首先在解压好的目录下使用 `python setup.py sdist`，这样会生成一个 `/dist` 文件夹，其中会有一个压缩包。这个压缩包就和前面 PyPI 下载下来的基本一样了: 解压、进入目录、`python setup.py install` 即可

## pip

### pip 换源

首先根据不同的系统创建配置文件，在配置中添加如下内容即可

```conf title="pip.ini/pip.conf"
[global]
index-url = https://pypi.tuna.tsinghua.edu.cn/simple
trusted-host = pypi.tuna.tsinghua.edu.cn
```

使用 `pip config list` 来查看修改是否成功

#### Linux

```bash title="Linux"
mkdir -p ~/.pip
nano ~/.pip/pip.conf
```

#### Windows

```bash title="Windows"
mkdir %USERPROFILE%\pip
notepad %USERPROFILE%\pip\pip.ini
```

[PyPI]: https://pypi.org/