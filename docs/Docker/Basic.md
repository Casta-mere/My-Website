---
tags: [Docker]
title: Docker 基础
keywords:
  - Docker
  - pip
references:
  - title: Docker — 从入门到实践
    url: https://docker-practice.github.io/zh-cn
  - author: 民工哥技术之路
    title: Docker 换源加速
    time: 2025
    url: https://blog.csdn.net/mingongge/article/details/146433112
---

# Docker 基础

## Docker 安装

### Docker 换源

```bash
vi /etc/docker/daemon.json
# 添加如下内容
{
    "registry-mirrors": [
     "https://docker.m.daocloud.io",
     "https://docker.imgdb.de",
     "https://docker-0.unsee.tech",
     "https://docker.hlmirror.com",
     "https://docker.1ms.run",
     "https://func.ink",
     "https://lispy.org"
    ]
}
```

重启 docker 服务

```bash
systemctl daemon-reload && systemctl restart docker
```