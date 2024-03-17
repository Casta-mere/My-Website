---
last_update:
  date: 16 Mar 2024 GMT
  author: Casta-mere
---

# 修改 Issue

## 添加修改 Button

[本节代码链接](https://github.com/Casta-mere/Issue-Tracker/tree/ab326d6727f301e3e2f45a6a93356c88975b0754)

安装 Radix UI 的 icon pack

```bash
npm i @radix-ui/react-icons
```

```tsx title="/app/issues/[id]/page.tsx" showLineNumbers
  ...
  const IssueDeatilPage = async ({ params }: Props) => {
    ...

    return (
      // 添加一个 Grid 以分列显示，设置 initial 为 1，在移动设备为每页 1 栏，平板以上则 2 栏
      // git-add-next-line
      <Grid columns={{ initial: "1", md: "2" }} gap="5">
        <Box>
          <Heading as="h2">{issue.title}</Heading>
          ...
        </Box>
        {/*添加一个 Button 用于编辑*/}
        {/* git-add-start */}
+       <Box>
+         <Button>
+           <Pencil2Icon />
+           <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
+         </Button>
+       </Box>
      </Grid>
        {/* git-add-end */}
    );
  };
  export default IssueDeatilPage;
```

## Single Responsbility Principle

[本节代码链接](https://github.com/Casta-mere/Issue-Tracker/tree/2357016e2f6b44d55078bca05632f2ad52ad9347)

> Software entities should have a single responsibility

重构 `/app/issues/[id]/page.tsx` 以应用 SRP

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

<Tabs className="unique-tabs">

  <TabItem value="page.tsx" label="page.tsx" default>
  
    ```tsx title="/app/issues/[id]/page.tsx" showLineNumbers
    import prisma from "@/prisma/client";
    import { Box, Grid } from "@radix-ui/themes";
    import { notFound } from "next/navigation";
    import EditIssueButton from "./EditIssueButton";
    import IssueDetails from "./IssueDetails";

    interface Props {
      params: { id: string };
    }
    const IssueDeatilPage = async ({ params }: Props) => {
      const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) },
      });

      if (!issue) notFound();

      return (
        <Grid columns={{ initial: "1", md: "2" }} gap="5">
          <Box>
            <IssueDetails issue={issue} />
          </Box>
          <Box>
            <EditIssueButton issueId={issue.id} />
          </Box>
        </Grid>
      );
    };
    export default IssueDeatilPage;
    ```

  </TabItem>
  <TabItem value="IssueDetails.tsx" label="IssueDetails.tsx">

    ```tsx title="/app/issues/[id]/IssueDetails.tsx" showLineNumbers
    import { IssueStatusBadge } from "@/app/components";
    import { Issue } from "@prisma/client";
    import { Card, Flex, Heading, Text } from "@radix-ui/themes";
    import ReactMarkdown from "react-markdown";

    const IssueDetails = ({ issue }: { issue: Issue }) => {
      return (
        <>
          <Heading as="h2">{issue.title}</Heading>
          <Flex gap="3" my="5">
            <IssueStatusBadge status={issue.status}></IssueStatusBadge>
            <Text>{issue.createdAt.toDateString()}</Text>
          </Flex>
          <Card className="prose">
            <ReactMarkdown>{issue.description}</ReactMarkdown>
          </Card>
        </>
      );
    };
    export default IssueDetails;
    ```

  </TabItem>
  <TabItem value="EditIssueButton.tsx" label="EditIssueButton.tsx">

    ```tsx title="/app/issues/[id]/EditIssueButton.tsx" showLineNumbers
    import { Pencil2Icon } from "@radix-ui/react-icons";
    import { Button } from "@radix-ui/themes";
    import Link from "next/link";

    const EditIssueButton = ({ issueId }: { issueId: number }) => {
      return (
        <Button>
          <Pencil2Icon />
          <Link href={`/issues/${issueId}/edit`}>Edit Issue</Link>
        </Button>
      );
    };
    export default EditIssueButton;
    ```

  </TabItem>
</Tabs>

## 修改 Issue

### 页面

[本节代码链接](https://github.com/Casta-mere/Issue-Tracker/tree/5e25a9b0600471f5906ff9067131f1d4b5364024)

我们可以像这样构建文件结构，在 `Issue` 目录下创建 `_components` 以放置该目录下需要重复使用的组件，文件夹名前添加下划线就可以把这个文件夹从路由中移除

```
└─issues
    │  IssueActions.tsx
    │  loading.tsx
    │  page.tsx
    │
    ├─new
    │      loading.tsx
    │      page.tsx
    │
    ├─[id]
    │  │  EditIssueButton.tsx
    │  │  IssueDetails.tsx
    │  │  loading.tsx
    │  │  page.tsx
    │  │
    │  └─Edit
    │          page.tsx
    │
    └─_components
            IssueForm.tsx
```

将之前的 new/page.tsx 封装为一个组件，并添加一个可选参数，以初始化

```tsx title="/app/issues/_components/IssueForm.tsx"
  ...
  // git-add-next-line
+ import { Issue } from "@prisma/client";
  ...
  // 添加一个可选参数 issue 类型为之前 prisma 中的 Issue
  // git-remove-next-line
- const IssueForm = () => {
  // git-add-next-line
+ const IssueForm = ({ issue }: { issue?: Issue }) => {
    ...

    return (
      <div className="max-w-xl prose">
        ...
        <TextField.Root>
          <TextField.Input
            // 将该字段初始化为 issue.title (若传入 issue)
            // git-add-next-line
+             defaultValue={issue?.title}
            placeholder="Title"
            {...register("title")}
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          // 将该字段初始化为 issue.description (若传入 issue)
          // git-add-next-line
+           defaultValue={issue?.description}
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        ...
      </div>
    );
  };
  export default IssueForm;
```

### API

[本节代码链接](https://github.com/Casta-mere/Issue-Tracker/tree/682dc449bc514e31302653d7b03e9d5097d03658)

```tsx title="/app/api/issues/[id]/route.tsx" showLineNumbers
import { issueSchema } from "@/app/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = issueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue)
    return NextResponse.json({ error: "Invalid Issue" }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(updatedIssue, { status: 200 });
}
```

### 连接

[本节代码链接](https://github.com/Casta-mere/Issue-Tracker/tree/86b02d408fe354169dc6a80fa6b6603c93fbf6ab)

```tsx title="/app/issues/_components/IssueForm.tsx"
  const IssueForm = ({ issue }: { issue?: Issue }) => {
    ...

    return (
      ...
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            setSubmitting(true);
            // 判断是否传入了 issue，若有传入则是 Update，若无则是 new
            // git-add-next-line
+           if (issue) await axios.patch("/api/issues/" + issue.id, data);
            // git-remove-next-line
-           await axios.post("/api/issues", data);
            // git-add-next-line
+           else await axios.post("/api/issues", data);
            router.push("/issues");
          } ...
        })}
      >
        ...
        <Button disabled={isSubmitting}>
          {/* git-add-next-line */}
+         {issue ? "Update Issue" : "Submit New Issue"}{" "}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
      ...
    );
  };
  export default IssueForm;
```

## Caching

[本节代码链接](https://github.com/Casta-mere/Issue-Tracker/tree/0ed472cc3aa10b31984aff7593cee5bea96c09f1)

[NextJS Route Segment Config]

- Data Cache:
  - When we fetch data using fetch()
  - Stored in the file system
  - Permanent unitl we **redeploy**
  - `fetch(".",{cache: "no-store"})`
  - `fetch(".",{revalidata: 3600})`
- Full Route Cache
  - Used to store the output of statically renderd routes
- Router Cache (Client-side Cache)
  - To store the payload of pages in browser
  - Lasts for a session
  - Gets refreshed when we reload

## 提升 Loading 体验

[本节代码链接](https://github.com/Casta-mere/Issue-Tracker/tree/c70446698a7af7bec0abfee5d55d676ace3b2339)

由于我们要在多个地方用到 IssueForm 的 Skeleton，我们可以将其封装到一个组件里，然后在需要的地方调用。其次，对于静态的页面可以直接使用 loading.tsx，但是对于需要用到 dynamic 函数的页面，应该用另一种方法

<Tabs className="unique-tabs">
  <TabItem value="IssueFormSkeleton.tsx" label="IssueFormSkeleton.tsx" default>

    ```tsx title="/app/issues/_components/IssueFormSkeleton.tsx" showLineNumbers
    import { Skeleton } from "@/app/components";
    import { Box } from "@radix-ui/themes";

    const IssueFormSkeleton = () => {
      return (
        <Box className="max-w-xl">
          <Skeleton height="2rem" />
          <Skeleton height="20rem" />
        </Box>
      );
    };
    export default IssueFormSkeleton;
    ```

  </TabItem>
  <TabItem value="page.tsx" label="page.tsx" default>
   
    ```tsx title="/app/issues/[id]/edit/page.tsx" showLineNumbers
    import prisma from "@/prisma/client";
    import dynamic from "next/dynamic";
    import { notFound } from "next/navigation";
    import IssueFormSkeleton from "./loading";
    
    const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
      ssr: false,
      // highlight-next-line
      loading: () => <IssueFormSkeleton />,
    });
    
    interface Props {
      params: { id: string };
    }
    
    const EditIssuePage = async ({ params }: Props) => {
      const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) },
      });
    
      if (!issue) notFound();
    
      return <IssueForm issue={issue} />;
    };
    export default EditIssuePage;
    ```

  </TabItem>
  <TabItem value="loading.tsx" label="loading.tsx" default>
   
    ```tsx title="/app/issues/[id]/edit/loading.tsx" showLineNumbers
    import IssueFormSkeleton from "@/app/issues/_components/IssueFormSkeleton";
    export default IssueFormSkeleton;
    ```

  </TabItem>
</Tabs>

[NextJS Route Segment Config]: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
