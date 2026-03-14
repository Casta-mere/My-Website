---
slug: nix
title:  nix
authors: [Castamere]
tags: [Nix]
---

# Nix


## 安装

使用 determinate 安装

```bash
curl --proto '=https' --tlsv1.2 -sSf -L https://install.determinate.systems/nix | sh -s -- install
```

## 配置镜像

```conf title="/etc/nix/nix.custom.conf"
substituters = https://mirrors.cernet.edu.cn/nix-channels/store https://cache.nixos.org/
```

## 使用

```bash
cd .nix
nix develop
```