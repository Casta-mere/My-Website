---
slug: GithubPullProblem
title: Github Pull 超时
authors: [Castamere]
tags: [git, github]
---

使用 Ubuntu 服务器时，想要把自己代码从 Github Pull 下来，但是一直超时

:::danger
使用 SSH 在 Linux 服务器上 `git pull ` 的时候遇到报错

**fatal: unable to access 'https://github.com/Casta-mere/My-Website.git/': Failed to connect to github.com port 443: Connection timed out**
:::

<!--truncate-->

找了很多解决方法都不太行，下面是最后成功的办法

在 `/etc/hosts` 中的 `IPV4` 部分添加以下内容，再 `git pull ` 就正常了。

```txt showLineNumbers
# GitHub Start
140.82.113.4      github.com
140.82.114.4      github.com
140.82.113.4      gist.github.com
140.82.113.6      api.github.com
185.199.108.153   assets-cdn.github.com
185.199.109.153   assets-cdn.github.com
185.199.110.153   assets-cdn.github.com
185.199.111.153   assets-cdn.github.com
199.232.96.133    raw.githubusercontent.com
199.232.96.133    gist.githubusercontent.com
199.232.96.133    cloud.githubusercontent.com
199.232.96.133    camo.githubusercontent.com
199.232.96.133    avatars.githubusercontent.com
199.232.96.133    avatars0.githubusercontent.com
199.232.96.133    avatars1.githubusercontent.com
199.232.96.133    avatars2.githubusercontent.com
199.232.96.133    avatars3.githubusercontent.com
199.232.96.133    avatars4.githubusercontent.com
199.232.96.133    avatars5.githubusercontent.com
199.232.96.133    avatars6.githubusercontent.com
199.232.96.133    avatars7.githubusercontent.com
199.232.96.133    avatars8.githubusercontent.com
199.232.96.133    user-images.githubusercontent.com
# GitHub End
```