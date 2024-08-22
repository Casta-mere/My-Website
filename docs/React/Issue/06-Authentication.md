---
tags: [React, Next.js, TypeScript, Issue Tracker, Next Auth]
title: 身份验证
keywords:
  - React
  - Next.js
  - TypeScript
  - Next Auth
  - Authenticator Provider
  - Github Provider
  - Authentication sessions
  - 数据库适配器
  - Database adapters
  - 路由保护
  - 保护 API 与 页面
  - MiddleWare
last_update:
  date: 22 AUG 2024 GMT
  author: Casta-mere
---

# 身份验证

## 配置 Next-Auth

[本节代码链接](https://github.com/Casta-mere/Issue-Tracker/tree/9a6b614b685070962c9113cb881781916b76a493)

:::note
具体内容可参考[Authentication](/docs/React/Next/Authentication)
:::

## Refactor NavBar

[本节代码链接](https://github.com/Casta-mere/Issue-Tracker/tree/9c1874d84cdb0be827386d90908766a5c5307ae8)

<details>
  <summary>/app/Navbar.tsx</summary>

```tsx title="/app/Navbar.tsx" showLineNumbers
"use client";
import { Avatar, Box, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import { Skeleton } from "@/app/components";

const NavBar = () => {
  return (
    <nav className="border-b mb-5 px-5 py-5">
      <Flex align="center" justify="between">
        <NavLinks />
        <Avator />
      </Flex>
    </nav>
  );
};

export default NavBar;

const links = [
  { label: <AiFillBug />, href: "/" },
  { label: "DashBoard", href: "/dashboard" },
  { label: "Issues", href: "/issues" },
];

const NavLinks = () => {
  const currentPath = usePathname();

  return (
    <ul className="flex gap-6 items-center">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={classNames({
              "text-zinc-900": link.href === currentPath,
              "text-zinc-500": link.href !== currentPath,
              "hover:text-zinc-800 transaition-colors": true,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const Avator = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <Skeleton width="3rem" />;
  if (status === "unauthenticated")
    return (
      <Link
        className="text-zinc-500 hover:text-zinc-800 transaition-colors"
        href="/api/auth/signin"
      >
        Sign In
      </Link>
    );

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image!}
            fallback="?"
            size="2"
            radius="full"
            className="cursor-pointer"
            referrerPolicy="no-referrer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{session!.user!.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout">Sign Out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};
```

</details>

## Secure the Application

[本节代码链接](https://github.com/Casta-mere/Issue-Tracker/tree/ffcdbd322b9189806286cf63f7b0c4d164c48061)

### AuthOptions

首先，我们应该将 AuthOptions 放到一个单独的文件里备用

```tsx title="/app/api/auth/AuthOptions.tsx" showLineNumbers
import prisma from "@/prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import Github from "next-auth/providers/github";

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
};

export default authOptions;
```

### 保护 API 与 页面

在除 `GET` 外的所有 API 中都应该加上确认是否有 session 的验证

```tsx title="/app/api/issues/[id]/route.tsx" showLineNumbers
  ...
  // git-add-next-line
+ import { getServerSession } from "next-auth";
  // git-add-next-line
+ import authOptions from "@/app/api/auth/AuthOptions";

  export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
  ) {
    // git-add-next-line
+   const session = await getServerSession(authOptions);
    // git-add-next-line
+   if (!session) return NextResponse.json({}, { status: 401 });
    ...
  }

  export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
  ) {
    // git-add-next-line
+   const session = await getServerSession(authOptions);
    // git-add-next-line
+   if (!session) return NextResponse.json({}, { status: 401 })
    ...
  }
```

同样，我们应该在一些页面将**删除**和**修改**的组件隐藏

```tsx title="/app/issues/[id]/page.tsx" showLineNumbers
  // git-add-next-line
+ import { getServerSession } from "next-auth";
  // git-add-next-line
+ import authOptions from "@/app/api/auth/AuthOptions";

  interface Props {
    params: { id: string };
  }
  const IssueDeatilPage = async ({ params }: Props) => {
    // git-add-next-line
+   const session = await getServerSession(authOptions);

    const issue = await prisma.issue.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!issue) notFound();

    return (
      <Grid columns={{ initial: "1", sm: "5" }} gap="5">
        <Box className="md:col-span-4">
          <IssueDetails issue={issue} />
        </Box>
        {/* git-add-next-line */}
+       {session && (
          <Box>
            <Flex direction="column" gap="3">
              <EditIssueButton issueId={issue.id} />
              <DeleteIssueButton issueId={issue.id} />
            </Flex>
          </Box>
        )}
      </Grid>
    );
  };
  export default IssueDeatilPage;
```

### MiddleWare

同样我们可以使用 MiddleWare 来保护路由

```ts "middleware.ts"
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/issues/new", "/issues/edit/:id+"],
};
```
