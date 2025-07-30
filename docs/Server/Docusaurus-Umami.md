---
tags: [Docusaurus, Umami]
title: Docusaurus Umami
description: 使用 Umami 为 Docusaurus 搭建数据展示功能
keywords:
  - Docusaurus
  - Docusaurus Umami
recommended: true
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Docusaurus Umami

## Umami

[umami] 是一个**开源**、**自托管**的网站分析工具，[这里](https://umami.castamerego.com/share/EplxZVQRe6OkyBt3/castamerego.com)是本站的 umami 数据展示页面。其包括以下功能：

- 网站流量统计
- 网站访问来源、设备、页面、时间、地区、浏览器、操作系统统计
- 自定义操作统计(比如想统计某个 button 的点击次数)
- 各种集成好的数据展示

并且其本质为一个 Next.js 应用，所以可以很方便的集成到现有的 Next.js 项目中。也可以进行二次开发

## 安装

安装前，首先确保有以下环境：

- Node.js 18.17 及以上
- 数据库二选一
  - MySQL v8.0 及以上
  - PostgreSQL v12.14 及以上

:::info
在 Ubuntu 下安装 Node.js 可以参考 [Node.js](/docs/Server/Server101#服务器)
在 Wsl 下安装 Node.js 可以参考 [Node.js - Wsl](/docs/Server/Server101#wsl)
在 Linux 下安装 MySQL 可以参考 [MySQL](/docs/Server/Server101#配置-mysql)
:::

### 安装 umami

#### 安装 yarn

```bash
npm install -g yarn
```

#### 拉取项目

```bash
git clone https://github.com/umami-software/umami.git
cd umami
yarn install
```

### 配置数据库

首先在项目根目录下创建一个 `.env` 文件，并添加如下内容：

<Tabs className="unique-tabs">

<TabItem value="MySQL" label="MySQL" default>

```bash title=".env"
DATABASE_URL=mysql://username:mypassword@localhost:3306/mydb
```

</TabItem>

<TabItem value="PostgreSQL" label="PostgreSQL">

```bash title=".env"
DATABASE_URL=postgresql://username:mypassword@localhost:5432/mydb
```

</TabItem>
</Tabs>

其中：

- `username` 数据库用户名，一般是 root
- `mypassword` 数据库密码
- `localhost` 数据库地址，一般是 localhost
- `3306/5432` 数据库端口
- `mydb` 数据库名称

以上为 prisma 标准 DATABASE_URL，这里给出一个样例：

```bash title=".env"
DATABASE_URL=mysql://root:qwer1234@localhost:3306/my-website-umami
```

配置完成后，使用以下命令初始化 prisma

```bash
npx prisma migrate dev
```

### Build 项目

使用 `yarn build` 命令构建项目

:::tip
如果服务器内存不太够，可以在本地从头再来一遍，之后把 build 好的 `.next` 文件夹 scp 到云端即可
:::

## 配置 nginx

在使用 Umami 的情况下，我们同时在服务器上部署了 Docusaurus 和 Umami，所以需要配置 nginx 进行反向代理，具体可以参考 [Nginx Reverse Proxy](/docs/Server/NginxReverseProxy) 一篇

如果想要直接使用 https，在完成上一步的情况下，参考 [SSL](/docs/Server/SSL) 一篇进行配置

总之，在配置完成后，nginx 配置文件如下：

```bash showLineNumbers title="/etc/nginx/conf.d/server.conf"
...
server {
  listen 80;
  server_name umami.castamerego.com;

  rewrite ^(.*)$ https://$host$1;

  location / {
    proxy_pass http://localhost:3030;
  }
}

server {
  listen 443 ssl;
  server_name umami.castamerego.com;

  ssl_certificate       conf.d/cert/umami.castamerego.com.cer;
  ssl_certificate_key   conf.d/cert/umami.castamerego.com.key;

  ssl_session_cache     shared:SSL:1m;
  ssl_session_timeout   5m;

  ssl_ciphers           HIGH:!aNULL:!MD5;
  ssl_prefer_server_ciphers on;

  location / {
    proxy_pass http://localhost:3030;
  }
}
```

这里是将域名 `umami.castamerego.com` 重定向到 3030 端口，那么我们后面运行项目时也要在 3030 端口运行，修改 package.json 文件如下：

```json title="package.json"
  {
    ...
    "scripts": {
      "build": "npm-run-all check-env build-db check-db build-tracker build-geo build-app",
      // git-remove-next-line
-     "start": "next start",
      // git-add-next-line
+     "start": "next start -p 3030"
    }
    ...
  }
```

## 运行项目

然后使用 `yarn start` 命令运行项目，就可以访问你的域名查看项目了，可以看到登录界面，就说明项目已经成功运行了

![Login](./image/Docusaurus-Umami/login.png)

:::important
如果直接在服务器上部署，可能会遇到一些问题，比如在服务器管理处，是否开放了端口，有时候可能项目已经跑起来了，但没访问到，细心排查即可
:::

## 配置 Umami

### 登录

初次进入登录界面，账号为 admin，密码为 umami。登录后，根据下图指示，修改密码

![Reset PW](./image/Docusaurus-Umami/reset.png)

### 添加网站

然后根据下图指示，添加你的网站

![Add Site](./image/Docusaurus-Umami/addWebsite.png)

### 收集数据

点击刚刚新建好的网站中的`编辑`。在下图所示页面，可以看到一个跟踪代码，将其复制下来备用

![Script](./image/Docusaurus-Umami/script.png)

### 展示数据

根据下图指示，开启共享链接，开启后，其他人可以通过下面这个生成的链接查看你的网站数据

![Share](./image/Docusaurus-Umami/share.png)

## 配置 Docusaurus

接下来需要在 Docusaurus 中进行配置

### 创建插件

首先在 `src` 文件夹下创建 `plugin` 文件夹，然后创建 `plugin-umami.js` 文件，内容如下：

需要修改的有三个地方，一个是 `href`，换为自己的域名即可。`src` 和 `data-website-id` 则都是上一步[收集数据](/docs/Server/Docusaurus-Umami#收集数据)中复制的跟踪代码的内容，放到对应位置即可

```js title="src/plugin/plugin-umami.js" showLineNumbers
async function umamiPlugin() {
  // 判断是否为开发环境
  const isDevelopment = "development" === process.env.NODE_ENV;

  return {
    name: "docusaurus-umami-plugin",

    injectHtmlTags() {
      if (isDevelopment) return;
      return {
        headTags: [
          {
            tagName: "link",
            attributes: {
              rel: "preconnect",
              // 换成你的域名
              // highlight-next-line
              href: "https://xxxx.com/",
            },
          },
          {
            tagName: "script",
            attributes: {
              defer: true,
              // 这里就是上一步复制的跟踪代码中的内容
              // highlight-next-line
              src: "https://xxxx.com/script.js",
              // highlight-next-line
              "data-website-id": "e993a914-0864-4b88-a53c-75e46dc174d7",
            },
          },
        ],
      };
    },
  };
}

module.exports = umamiPlugin;
```

:::important
注意，笔者在这里设置了只有在生产环境下才注入代码，读者在测试时，可以取消 `isDevelopment` 的判断，这样就可以在开发环境下看到数据了
:::

### 注册插件

接下来就是在 docusaurus.config.js 中注册插件

```js title="docusaurus.config.js" showLineNumbers
  ...
  plugins: [
    require.resolve("docusaurus-plugin-image-zoom"),
    function myPlugin(context, options) {
      ...
    },
    // git-add-next-line
+   "./src/plugins/plugin-umami"
  ],
  ...
```

最后重新 build 一遍博客，随便点几个页面，查看你的 umami 网站，应该可以看到数据了

## FAQ

### 获取不到国家(一直是 unknown)

由于我们使用了 nginx 进行反代理，所以 umami 获取的数据，都是被 nginx 重新包装过的。我们需要进行设置，才能获取访客真实的信息，看了网上很多内容，最终结果如下，在之前的基础上，umami 的 location 中添加如下内容即可

```bash showLineNumbers title="/etc/nginx/conf.d/server.conf"
  server {
    listen 443 ssl;
    server_name umami.castamerego.com;

    ssl_certificate       conf.d/cert/umami.castamerego.com.cer;
    ssl_certificate_key   conf.d/cert/umami.castamerego.com.key;

    ssl_session_cache     shared:SSL:1m;
    ssl_session_timeout   5m;

    ssl_ciphers           HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    location / {
      proxy_pass http://localhost:3030;
      # git-add-start
+     proxy_buffering on;
+     proxy_http_version 1.1;
+     proxy_ssl_session_reuse off;
+     proxy_ssl_server_name on;
+     proxy_set_header X-Forwarded-Proto https;
+     proxy_set_header X-Real-IP $remote_addr;
+     proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
+     proxy_set_header X-Forwarded-Host  $host;
      # git-add-end
    }
  }
```

[umami]: https://umami.is/
