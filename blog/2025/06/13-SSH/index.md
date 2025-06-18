---
slug: SSHPermitionError
title: SSH 公私钥权限问题
authors: [Castamere]
tags: [SSH]
---

# SSH 公私钥权限问题

ssh 的公私密钥有着很严格的权限管理，在某些设备上会很棘手。一般来说，你的 `/root` 下不能有其他用户的任何权限，这就很头疼。本篇提供一种解决方式，单独创建一个 ssh key 文件夹

<!--truncate-->

## 解决办法

1. 使用 root 用户创建 `/ssh`, 并修改权限 700
2. 在 /ssh 下使用 `ssh-keygen` 创建公钥、私钥
3. 在 /ssh 下创建 `authorized_keys`, 并修改权限 600
4. 修改 `/etc/ssh/sshd_config` ，修改如下内容

```
PermitRootLogin without-password
PubkeyAuthentication yes
AuthorizedKeysFile	.ssh/authorized_keys .ssh/authorized_keys2 /ssh/authorized_keys
```