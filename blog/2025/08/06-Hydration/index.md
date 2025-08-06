---
slug: Hydration
title: React SSR 水合问题
authors: [Castamere]
tags: [React, SSR]
references:
  - author: 瑕疵​
    title: 前端服务端渲染（SSR）中的水合性能优化：从初始加载到交互响应的深度实践与常见问题解决方案
    time: 2025
    url: https://blog.csdn.net/qq_36287830/article/details/149490222
---

# React SSR 水合问题

<!--truncate-->

## 缘起

![error](./image/error.png)

## 分析

:::danger 报错
Hydration failed because the server rendered HTML didn't match the client. As a result this tree will be regenerated on the client. This can happen if a SSR-ed Client Component used:

- A server/client branch `if (typeof window !== 'undefined')`.
- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.
- Date formatting in a user's locale which doesn't match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.

It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.
:::