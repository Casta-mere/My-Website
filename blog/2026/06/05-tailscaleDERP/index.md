---
slug: tailscaleDERP
title: 自建 Tailscale DERP 服务器
authors: [Castamere]
tags: [NAS, Docker, Server, VPN, Tailscale]
draft: true
---

# 自建 Tailscale DERP 服务器

家庭宽带套了两层 NAT，Tailscale 打洞永远失败，流量只能绕道东京中转，延迟高达 250ms。本文记录如何在阿里云上搭建私有 DERP 中继节点，将延迟压到 8ms。

<!--truncate-->

## 缘起

家里网络发现 Tailscale 一直走 DERP(tok) 中转，延迟 250ms+，开始排查。
