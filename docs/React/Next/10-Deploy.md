---
tags: [React, Next.js, TypeScript]
title: 部署
keywords:
  - React
  - Next.js
  - npm run build
  - 服务器部署
last_update:
  date: 22 AUG 2024 GMT
  author: Casta-mere
---

# 部署

如何部署你的项目

:::important
在部署前，在本地使用 `npm run build` 来测试是否有 Error
:::

## 服务器部署

笔者主要是将项目部署到自己的服务器，本章讲一下过程中需要注意的点

### 配置环境

首先，在本地测试好 build 不会出错之后，将项目 push 到 Github 中。在服务器安好 `node`, `npm`, `n`

```bash
sudo apt install nodejs npm
npm install n
```

接着使用 n 来安装对应版本的 Node

```bash
n install 18
```

### 配置项目

都安装好后，将 Git 库 pull 下来，若遇到超时问题可参考这篇[Github Pull Problem](/blog/GithubPullProblem)

进入项目文件夹创建 .env 文件，并修改其中的内容，根据本地的 .env 对应修改即可。比如 mysql 密码之类的

如下，使用 `npm i` 安装所需的包，使用 `npx prisma migrate dev` 创建数据库，使用 `npm run build` 编译项目。

```bash
npm i
npx prisma migrate dev
npm run build
```

最后使用 `npm run serve` 即可，如果想要修改对应的部署端口，可以在 `package.json` 中的 `script` 字段修改

```json
"scripts": {
  "dev": "next dev -- -p 5050",
  "build": "next build",
  "start": "next start -- -p 5050",
  "lint": "next lint",
  "preview-email": "email dev -p 5051"
},
```

:::important
读者需要在单个服务器上部署多个项目时，可以参考这篇[Nginx 反代理](/docs/Server/NginxReverseProxy)
:::
