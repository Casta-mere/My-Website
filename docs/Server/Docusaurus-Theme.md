---
tags: [Docusaurus, Theme]
title: Docusaurus Themes
keywords:
  - Docusaurus
  - Docusaurus Themes
  - Tailwindcss
  - Radix UI
  - react-icons
  - classNames
---

import TailWindDemo from "./components/Theme/TW"
import Icons from "./components/Theme/Icons"
import ClassNames from "./components/Theme/ClassNames"

# Docusaurus Themes

Docusaurus 主题魔改系列

## Tailwindcss

最主要的问题是如何在不影响现有 docusaurus 样式的情况下，在需要的地方使用 tailwindcss 的样式

### Step 1 安装依赖

```bash
npm i tailwindcss postcss autoprefixer postcss-cli postcss-nested postcss-preset-env
```

### Step 2 创建插件

在 docusaurus.ts/js 中添加插件

```ts title="docusaurus.ts" showLineNumbers
  const config = {
    ....
    plugins: [
      require.resolve("docusaurus-plugin-image-zoom"),
      // git-add-start
+     function myPlugin(context, options) {
+       return {
+         name: "postcss-tailwindcss-loader",
+         configurePostCss(postcssOptions) {
+           postcssOptions.plugins.push(
+             require("postcss-import"),
+             require("tailwindcss"),
+             require("postcss-nested"),
+             require("autoprefixer")
+           );
+           return postcssOptions;
+         },
+       };
+     },
    // git-add-end
    ],
    ....
  }
```

### Step 3 配置 tailwindcss

使用 `npx tailwindcss init` 生成 `tailwind.config.js` 文件，并添加以下内容

:::note
当前 Tailwindcss 升级到了 V3.x, 移除了 `purge` 等配置项，具体参考 [tailwindcss-upgrade]
:::

```js title="tailwind.config.js" showLineNumbers
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{md,mdx,js,jsx,ts,tsx}",
    "./docs/**/*.{md,mdx,js,jsx,ts,tsx}",
    "./blog/**/*.{md,mdx,js,jsx,ts,tsx}",
    "./i18n/**/*.{md,mdx,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### Step 4 CSS 中引入 Tailwind

在 `src/css/custom.css` 中引入 Tailwind

```css title="src/css/custom.css" showLineNumbers
.tailwind {
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  @tailwind screens;
}
....
```

### Step 5 使用 Tailwind

在需要的地方，最外层嵌套一个 `tailwind` 类名即可

<TailWindDemo />

```html showLineNumbers
<!-- highlight-next-line -->
<div className="tailwind">
  <div className="flex gap-4">
    <span
      className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
    >
      green
    </span>
    ....
  </div>
</div>
```

## react-icons

`npm i react-icons --save`

<Icons />

## classNames

`npm i classnames`

效果如下，添加一个 hover 的效果

<ClassNames />

```tsx
<span
  className={classNames({
    "inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium  ring-1 ring-inset select-none":
      true,
    "bg-red-50 text-red-700 ring-red-600/10": true,
    "hover:bg-green-50 hover:text-green-700 hover:ring-green-600/20": true,
  })}
>
  badge
</span>
```

## Radix UI

[tailwindcss-upgrade]: https://tailwindcss.com/docs/upgrade-guide
[react-icons]: https://react-icons.github.io/react-icons/
