---
slug: Pycurl 
title: pycurl libcurl 链接与编译 ssl 后端不同
authors: [Castamere]
tags: [Python]
draft: true
references:
  - author: 彭世瑜
    title: ImportError：pycurl：libcurl link-time ssl backend
    time: 2019
    url: https://blog.csdn.net/mouday/article/details/96379223
---

# pycurl libcurl 链接与编译 ssl 后端不同

解决报错

:::danger ERROR
ImportError: pycurl: libcurl link-time ssl backend (openssl/nss)

is different from compile-time ssl backend (none/other)
:::

<!-- truncate -->

## 缘起

在一个离线环境中安装 pycurl 时出现问题，报错如篇首所示。其实就是编译时的 ssl 后端，和实际安装的 ssl 后端不一样

## 解决方式

在爆错中会显示 link-time 的 ssl 后端是什么，比如 openssl。记住这个，然后用如下命令重新安装即可

```bash 
pip uninstall pycurl
# 根据你的报错第一行来改，比如 
# ImportError: pycurl: libcurl link-time ssl backend (openssl) 
# 就设置为 openssl
export PYCURL_SSL_LIBRARY=openssl 
pip install pycurl
```

不使用 pip，用 `python setup.py install` 也同理