---
slug: CentOS
title: CentOS 常见问题汇总
authors: [Castamere]
tags: [CentOS, Linux]
---

遇到的一些 CentOS 问题，目前有

- [配置 IPv4 地址](/blog/CentOS#如何配置-ipv4-地址)
- [查看所有服务](/blog/CentOS#如何查看所有的服务)
- [yum](/blog/CentOS#yum)
- [同步时间](/blog/CentOS#同步时间)

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

## 如何查看所有的服务

```bash
systemctl list-unit-files --type=service
```

## yum

### yum 安装本地 rpm 文件

```bash
yum install xxx.rpm --disablerepo=*
```

## 同步时间

```bash title="使用 ntpdate 同步时间"
sudo ntpdate time.nist.gov
```
