---
tags: [Docusaurus, Plugins]
title: Docusaurus Plugins
keywords:
  - Docusaurus
  - Docusaurus Plugins
  - Image-zoom
  - RoughNotation
  - Mermaid
sidebar_position: 7
last_update:
  date: 10 SEP 2024 GMT
  author: Casta-mere
---

# Docusaurus Plugins

一些好用的 Docusaurus 插件 & 配置

## Image-zoom

给 Docusaurus 的图片添加一个放大功能

### 安装与配置

使用如下命令安装

```bash
npm install docusaurus-plugin-image-zoom --save
```

安装完成后在 `docusaurus.config` 中进行配置，添加 `plugins`，并在 `themeConfig` 中添加 `zoom` 配置：

```js title="docusaurus.config.js"
const config = {
    ...
    plugins: [require.resolve("docusaurus-plugin-image-zoom")],
    ...
    themeConfig:
    {{
        ...
        zoom: {
            selector: '.markdown :not(em) > img',
            config: {
            margin:0,
            background: {
                light: 'rgb(255, 255, 255)',
                dark: 'rgb(50, 50, 50)'
            }
            }
        }
        ...
    }}
}
```

配置完成后，重新启动 Docusaurus 即可生效
