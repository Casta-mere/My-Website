---
slug: CentOS
title: CentOS 常见问题汇总
authors: [Castamere]
tags: [CentOS, Linux]
---

<!--truncate-->

## 如何配置 IPv4 地址

```bash
# 查看当前网卡配置，假设要修改的网卡为ethx
nmcli connection show

# 修改配置文件
nano /etc/sysconfig/network-scripts/ifcfg-ethx

# 应用配置文件
nmcli connection reload

# 重启网络服务
nmcli device reapply ethx
```
