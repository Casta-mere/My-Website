---
tags: [React, Next.js, TypeScript, Zod]
title: 构造 API
keywords:
  - React
  - Next.js
  - zod
last_update:
  date: 22 AUG 2024 GMT
  author: Casta-mere
---

# 构造 API

本篇包括以下内容:

- Getting objects
- Creating objects
- Updating objects
- Deleting objects
- Validating requests with Zod

## 获取对象

[本章代码链接](https://github.com/Casta-mere/Dash-Board/tree/c171888895b2fdd671696e1b66efa83a6ef9f641)

我们可以创建 `route.tsx` 来创建一个 GET API，注意与 `page.tsx` 不能同时存在于一个文件夹内，一般约定俗成在 app\api 文件夹下创建各种 API 接口。其需要一个 NextRequest 类型的参数，下面是一个示例

```tsx showLineNumbers title="api/users/route.tsx"
import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  return NextResponse.json([
    { id: 1, name: "Castamere" },
    { id: 2, name: "Today_Red" },
  ]);
}
```

除此之外，我们也可以应用之前的[动态路由]，来根据 id 等数据查询数据并获取。可以在该文件夹下创建 `[id]` 文件夹，添加 route.tsx 来获取参数

```tsx showLineNumbers title="api/users/[id]/route.tsx"
import { NextRequest, NextResponse } from "next/server";

export function GET(
  request: NextRequest,
  //   直接使用params 结构，因为api中一般不会有过多参数，如有，可以额外定义interface
  //   highlight-next-line
  { params: { id } }: { params: { id: number } }
) {
  if (id > 10)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  return NextResponse.json({ id, name: "Castamere" });
}
```

## 创建对象

[本章代码链接](https://github.com/Casta-mere/Dash-Board/tree/69537f93966d47a77ad79f309a7e950f28f2cd22)

创建对象时我们可以使用 POST API，输入仍为一个 NextRequest 类型的参数。注意 POST 一般需要获取收到的数据，要设为 `async` 函数，其中的 `request.json()` 在获取时要使用 `await` 关键字

```tsx showLineNumbers title="api/users/route.tsx"
export async function POST(request: NextRequest) {
  const body = await request.json();
  if (!body.name)
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  return NextResponse.json({ id: 1, name: body.name }, { status: 201 });
}
```

在测试 API 时，我们可以使用[Postman]

## 更新对象

[本章代码链接](https://github.com/Casta-mere/Dash-Board/tree/7225a6b9d189ba9463dd5df72c517a7881f94489)

更新对象时，可以使用 PUT 或者 PATCH。他们的区别是，PUT 一般用于直接替换某个对象，而 PATCH 用于更新某些属性。同样的，要用到 request body 的情况下都要将函数设为 `async`

```tsx showLineNumbers title="api/users/[id]/route.tsx"
// Use put for replacing
// Use patch for updating some properties
export async function PUT(
  request: NextRequest,
  { params: { id } }: { params: { id: number } }
) {
  // Validate the request body
  const body = await request.json();
  // If invalid, return 400
  if (!body.name)
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  // Fetch the user
  // If does not exist, return 404
  if (id > 10)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  // Update the user
  // Return the updated user
  return NextResponse.json({ id, name: body.name });
}
```

## 删除对象

[本章代码链接](https://github.com/Casta-mere/Dash-Board/tree/636160203b70da2758e8486de5b7ddff169b791e)

删除对象时，使用 DELETE。

```tsx showLineNumbers title="api/users/[id]/route.tsx"
export function DELETE(
  request: NextRequest,
  { params: { id } }: { params: { id: number } }
) {
  // Fetch user from db
  // If does not exist, return 404
  if (id > 10)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  // Delete the user
  // Return 200
  return NextResponse.json({});
}
```

## 使用 Zod 验证表单

[本章代码链接](https://github.com/Casta-mere/Dash-Board/tree/5de7e7554efe62f75effc53be592939a3071a33c)

[Zod]可以直接使用 `npm i zod` 安装。安装好后，创建 `schema.ts` 来创建一个表单的格式 interface

```ts showLineNumbers showLineNumbers
import { z } from "zod";

const schema = z.object({
  name: z.string().min(3),
});

export default schema;
```

然后在 tsx 文件中导入，使用 `schema.safeParse()` 即可进行表单格式的验证

```tsx showLineNumbers title="api/users/route.tsx"
import schema from "./schema";

export async function POST(request: NextRequest) {
  const body = await request.json();
  //   使用 zod 来验证
  // highlight-start
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  // highlight-end
  return NextResponse.json({ id: 1, name: body.name }, { status: 201 });
}
```

[动态路由]: /docs/React/Next/Routing#动态路由
[Postman]: https://www.postman.com/
[Zod]: https://zod.dev/
