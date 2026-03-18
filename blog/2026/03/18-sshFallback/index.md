---
slug: SSHFallback
title: SSH 自动匹配多个 IP
authors: [Castamere]
tags: [SSH]
---

# SSH 自动匹配多个 IP

同一台机器同时有局域网 IP 和 Tailscale IP 时，可以让 SSH 先试本地地址，失败后自动回退到 Tailscale

<!--truncate-->

## 缘起

家里 NAS 同时有两个地址：

- 局域网 IP：`192.168.50.71`
- Tailscale IP：`100.92.232.30`

需求很简单：在家时优先走局域网，不在家时自动走 Tailscale，不想每次手动改 `~/.ssh/config`

## 配置

可以用 SSH 的 `Match exec` 做一次预检查：如果本地 IP 能连通，就临时把 `HostName` 改成局域网地址；否则继续使用后面的 Tailscale 地址

```config title="~/.ssh/config"
Match host nas exec "nc -z -w 1 192.168.50.71 22 2>/dev/null"
    HostName 192.168.50.71

Host nas
    HostName 100.92.232.30
    User root
    IdentityFile ~/.ssh/id_rsa_nas
```

## 原理

执行 `ssh nas` 时，会先用 `nc` 检查 `192.168.50.71:22` 是否可达：

- 能连通：使用本地 IP
- 不能连通：回退到 Tailscale IP `100.92.232.30`

`Match` 块要放在 `Host nas` 前面，否则前面的匹配优先级不会生效。