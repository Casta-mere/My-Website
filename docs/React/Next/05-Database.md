---
last_update:
  date: 24 Feb 2024 GMT
  author: Casta-mere
---

# 数据库

本篇包括以下内容:

- Setting up Prisma
- Defining data models
- Creating migrations
- Performing CRUD operations

## Prisma

[本章代码链接](https://github.com/Casta-mere/Dash-Board/tree/3e860c57aee0c5c4512cab1e4ed286c910d4e653)

Prisma 是一款 ORM(_Object–relational mapping_) 软件。使用 `npm i prisma` 命令安装 Prisma

安装好后，使用 `npx prisma init` 初始化 Prisma。init 好之后，会有 `/prisma/schema.prisma` 和 `.env` 两个文件

可以根据自己使用的数据库来修改一下，在[Prisma Connection String]查看设置文档。笔者使用的是 MySQL，修改如下所示。

```txt title=".env"
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
```

```txt title="/prisma/schema.prisma"
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

修改完成后建议把 `.env` 加入到 `.gitignore` 中，避免自己账号密码流出

## 定义 model

[本章代码链接](https://github.com/Casta-mere/Dash-Board/tree/a54ed7dadc9ffe656f91615ea677d563b967be54)

在 `/prisma/schema.prisma` 可以添加 model ，相当于数据库表，其格式如下，具体内容可以参考[Prisma Model]

```txt title="/prisma/schema.prisma" showLineNumbers
model User {
  id        Int     @id @default(autoincrement())
  email     String  @unique
  name      String
  followers Int     @default(0)
  isActive  Boolean @default(true)
}
```

在写好之后可以使用 `npx prisma format` 来格式化，会自动进行对齐等操作

## 同步到数据库

[本章代码链接](https://github.com/Casta-mere/Dash-Board/tree/68d3ee62df45c773ab22e28a9b79fa34c8d17711)

在创建好 model 之后，可以通过下面的命令来同步到数据库

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

<Tabs className="unique-tabs">
  <TabItem value="关系型数据库" label="关系型数据库" default>
    ```bash
    <!-- 关系型数据库 -->
    npx prisma migrate dev
    ```
  </TabItem>
  <TabItem value="非关系型数据库" label="非关系型数据库">
    ```bash 
    <!-- 非关系型数据库 -->
    npx prisma db push
    ```
  </TabItem>
</Tabs>

使用该命令后，会在`prisma/migrations/20240224061001_initial` 中自动生成 `.sql` 文件，并会自动创建对应 Database。相应的，每次修改 `/prisma/schema.prisma` 中的 model 之后，运行该指令，都会生成对应的修改 sql 文件

## 创建 Prisma Client

[本章代码链接](https://github.com/Casta-mere/Dash-Board/tree/1a38d18fda0096445520caf099e5075d154a5818)

在[Prisma Creating Client]这一节，给出了如何创建一个全局的 PrismaClient 供我们使用，其具体代码如下，我们只需要 CV 一次，后面直接使用即可。注意需要放到 `prisma/client.ts` 中

![Prisma Client](image/05-Database/prismaClient.png)

```ts title="prisma/client.ts" showLineNumbers
import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
```

## 获取数据

[本章代码链接](https://github.com/Casta-mere/Dash-Board/tree/3d2b627b333f41bebe3ff18fef4f0b3d32178a1a)

需要获取数据时，导入全局的 prismaClient 对象，用 `.findUnique` 或 `.findMany` 方法来获取数据。

```tsx title="api/users/route.tsx" showLineNumbers
  // findMany 方法
  import schema from "./schema";
  // 导入 prisma
// git-add-next-line
+ import prisma from "@/prisma/client";

// git-delete-start
- export function GET(request: NextRequest) {
-   return NextResponse.json([
-     { id: 1, name: "Castamere" },
-     { id: 2, name: "Today_Red" },
-   ]);
// git-delete-end

// git-add-start
+ export async function GET(request: NextRequest) {
+   const users = await prisma.user.findMany();
+   return NextResponse.json(users);
// git-add-end
  }
```

同样我们可以将之前动态路由中的参数([id])作为筛选项来获取数据，只需要调用 `findUnique` 方法即可(**在 GET 方法中**)。在[Prisma Filtering and Sorting]可以找到 prisma 相关的筛选与排序语法

```tsx title="api/users/[id]/route.tsx" showLineNumbers
  // findUnique 方法
  import { NextRequest, NextResponse } from "next/server";
  import schema from "../schema";
  // 导入 prisma
// git-add-next-line
+ import prisma from "@/prisma/client";

  export async function GET(
    request: NextRequest,
  // 这里提到前文一个错误，slug中的id，比如 user/1，这个1被读取时是String而非number，使用时需要手动 parseInt
// git-remove-next-line
-   { params: { id } }: { params: { id: number } }
// git-add-next-line
+   { params: { id } }: { params: { id: string } }
  ) {
// git-add-next-line
+   const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    return NextResponse.json({ user });
  }
```

## 上传数据

[本章代码链接](https://github.com/Casta-mere/Dash-Board/tree/0178bfc242fb62728f96cce15c258165a852fd8e)

上传数据直接调用 prisma.user.create() 方法即可，**用在 POST 方法中**

```tsx title="api/users/route.tsx" showLineNumbers
export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  // 检查是否已有重复
  // highlight-start
  const check = await prisma.user.findUnique({
    where: { email: body.email },
  });
  // highlight-end
  if (check)
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  // 上传数据
  // highlight-start
  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
    },
  });
  // highlight-end
  return NextResponse.json(user, { status: 201 });
}
```

## 修改数据

[本章代码链接](https://github.com/Casta-mere/Dash-Board/tree/409d6f5a304edf5c9f5350c9bb994a66b955fbca)

修改数据则调用 prisma.user.update()，**注意用在 PUT 方法中**

```tsx title="api/users/[id]/route.tsx" showLineNumbers
  // 直接补全之前函数中空的部分
  export async function PUT(
    request: NextRequest,
    { params: { id } }: { params: { id: string } }
  ) {
    // Validate the request body
    const body = await request.json();
    const validation = schema.safeParse(body);
    // If invalid, return 400
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });
    // Fetch the user
// git-add-start
+   const user = await prisma.user.findUnique({
+     where: { id: parseInt(id) },
+   });
// git-add-end
    // If does not exist, return 404
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    // Update the user
// git-add-start
+   const updatedUser = await prisma.user.update({
+     where: { id: user.id },
+     data: {
+       name: body.name,
+       email: body.email,
+     },
+   });
// git-add-end
    // Return the updated user
    return NextResponse.json(updatedUser);
  }
```

## 删除数据

[本章代码链接](https://github.com/Casta-mere/Dash-Board/tree/c6828d4e7f85ef18a214df9ad652677fa61fd849)

删除数据调用 prisma.user.delete()，**注意用在 DELETE 方法中**

```tsx title="api/users/[id]/route.tsx" showLineNumbers
  // 直接补全之前函数中空的部分
  export async function DELETE(
    request: NextRequest,
    { params: { id } }: { params: { id: string } }
  ) {
    // Fetch user from db
// git-add-start
+   const user = await prisma.user.findUnique({
+     where: { id: parseInt(id) },
+   });
// git-add-end
    // If does not exist, return 404
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    // Delete the user
// git-add-start
+   await prisma.user.delete({
+     where: { id: user.id },
+   });
// git-add-end
    // Return 200
    return NextResponse.json({});
  }
```

[Prisma Connection String]: https://www.prisma.io/docs/orm/reference/connection-urls
[Prisma Model]: https://www.prisma.io/docs/orm/prisma-schema/data-model/models
[Prisma Creating Client]: https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices
[Prisma Filtering and Sorting]: https://www.prisma.io/docs/orm/prisma-client/queries/filtering-and-sorting
