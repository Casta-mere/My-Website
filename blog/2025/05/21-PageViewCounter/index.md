---
slug: PageViewCounter
title: 在 Docusaurus 博客中显示文章阅读次数
authors: [Castamere]
tags: [Docusaurus, Umami]
---

# Page View Counter

在 [Docusaurus Umami] 一章中，笔者讲解了如何在 Docusaurus 中集成 Umami 进行文章阅读量统计。但他仅仅是有一个额外的数据统计页面，在本篇，笔者将介绍如何在文章中显示阅读次数

在上方应该可以看到成品的效果

<!--truncate-->

## 缘起

在很久之前就想给文章加一个阅读量显示的功能，但一直没有碰到合适的方案。直到最近看到 Umami 中的数据，可以筛选出每篇文章的阅读量。如果能用 api 获取到这个数据，也不失为一个"现成"的解决方案

![Umami Data](./image/umami.png)

:::tip
如果还没安装 Umami，可以参考 [Docusaurus Umami]
:::

## Umami 获取数据

:::tip
如果你使用的不是 Docusaurus，也可以参考我下面的方法来获取数据。逻辑上都是通的
:::

首先打开 F12，找到 Network。在 web 页面中选择某篇文章，选择`所有时间段`，翻翻就找到了这个以 `stats` 开头的请求

![Umami API](./image/umami_api.png)

先听笔者来分析一下，再来教你怎么找你的 api。先摘出来看一下 

```
https://umami.castamerego.com/api/websites/e993a914-0864-4b88-a53c-75e46dc174d7/stats?startAt=1727427048000&endAt=1747796846000&unit=month&timezone=Asia%2FShanghai&url=%2Fdocs%2FLatex%2FReference
```

前面是基础的 url `https://umami.castamerego.com/api/websites/e993a914-0864-4b88-a53c-75e46dc174d7/stats`，这个 `e993a914-0864-4b88-a53c-75e46dc174d7` 是 umami 中，该网站的 id。你可以直接 F12 找，也可以像下面这样去管理页面获取

![Umami website id](./image/umami_website_id.png)

再看后面的参数有五条内容，开始时间、结束时间、单位，时区和 url。其中开始时间、单位、时区都只要获取一次，写死在代码里即可；结束时间和 url 就要动态提供了

```
startAt=1727427048000&
endAt=1747796846000&
unit=month&
timezone=Asia%2FShanghai&
url=%2Fdocs%2FLatex%2FReference
```

### 测试

跟着上面的内容，找出所需的数据，填到下面的 python 脚本里自己试试(或者 postman 这类的也 ok)。就把下面有注释的行都换成你的数据即可

```python title="api 获取数据"
import requests
import time

baseurl = "https://umami.castamerego.com" # umami 网页 url
website_id = "e993a914-0864-4b88-a53c-75e46dc174d7" # 网站 id
starttime = "1727427048000" # 开始时间
endttime = int(time.time() * 1000)
unit = "month"
timezone = "Asia%2FShanghai"

artcle = "/docs/Server/Docusaurus-Umami" # 你的某一篇文章 url
artcle = artcle.replace("/", "%2F")
url = f"{baseurl}/api/websites/{website_id}/stats?startAt={starttime}&endAt={endttime}&unit={unit}&timezone={timezone}&url={artcle}"
response = requests.get(url)
if response.status_code == 200:
    data = response.json()
    print(data)
else:
    print(f"请求失败 {response.status_code}")
```

正常来说，如果你的url没有问题，会报 403 unauthorized。笔者当时猜测是需要 header 里的一些内容，再回去仔细一看果然有个 auth，把这个复制下来

![Umami auth](./image/umami_api_auth.png)

把 auth 也贴到下面的代码里，再试试能不能获取到数据

```python title="api 获取数据"
import requests
import time

# 把 auth 贴到这个里面
headers = {
    "Authorization": "Bearer UktYSkoOuDBHl4srL/k0/MVxuWDLt9NZIzy9kQKYAAXl6j2Jbe47OKrp1H8j3YNCXolksMtOO9l8zwb1zbyH3kAcdOaWexJF1FuHeCv18HjJ8/fikSqf62izxuQYEGFEtdx2p6ukF8OQ0S3Lap5ACdr8VGguo0qbAexF6mnURaQp7LLOK8nebcofH5oADUyrIr0JJ6MncaMgvfZBqF0FMYHMMytpxarbsMgCubeHbJWpm+kGBCvkiNoorliF5Cqbv2xrmy8gQEohNLp5lVLtXO71+mDQMWTSRWz4XVg1vkVbg5rngITVBwPDLv3jyO8qY3DXZLeJGknxNW+OdoUhaqFgH46lMEGGhg=="
}

baseurl = "https://umami.castamerego.com" # umami 网页 url
website_id = "e993a914-0864-4b88-a53c-75e46dc174d7" # 网站 id
starttime = "1727427048000" # 开始时间
endttime = int(time.time() * 1000)
unit = "month"
timezone = "Asia%2FShanghai"

artcle = "/docs/Server/Docusaurus-Umami" # 你的某一篇文章 url
artcle = artcle.replace("/", "%2F")
url = f"{baseurl}/api/websites/{website_id}/stats?startAt={starttime}&endAt={endttime}&unit={unit}&timezone={timezone}&url={artcle}"
response = requests.get(url, headers=headers)
if response.status_code == 200:
    data = response.json()
    print(data)
else:
    print(f"请求失败 {response.status_code}")
```

至此已经可以获取到文章的数据了，返回的内容如下。这个 pageviews.value 就是我们要的数据了

```json title="返回数据"
{
    "pageviews": {
        "value": 397,
        "prev": 0
    },
    "visitors": {
        "value": 317,
        "prev": 0
    },
    "visits": {
        "value": 340,
        "prev": 0
    },
    "bounces": {
        "value": 307,
        "prev": 0
    },
    "totaltime": {
        "value": 17199,
        "prev": 0
    }
}
```

## 制作组件

笔者在本博客中实现的 UmamiPageViewCounter 组件，有以下功能

- 显示文章阅读量
- 合并中/英文数据显示
- 支持中/英文显示
- 支持缓存，避免频繁请求
- 支持实时更新，即用户点入文章后，自动更新阅读量
- 添加了一个加载的 skeleton 效果

由于本博客只用了中英文，所以有些地方偷懒了，如果读者想要添加更多语言，可以自己 diy

在[制作历程](/blog/PageViewCounter#制作历程)中，笔者会详细介绍如何实现这个组件，以及其中逻辑

:::tip
如果想直接拿来用，可以跳转到[集成到 Docusaurus](/blog/PageViewCounter#集成到-docusaurus)中
:::

### 制作历程

### 最终版本

<details>
<summary>点击查看代码</summary>

```typescript title="src/components/PageViewCounter/UmamiPageViewCounter.tsx"
import { useBlogPost } from "@docusaurus/plugin-content-blog/client";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import React, { useEffect, useState } from "react";

// 这里要改为你的网站内容
// highlight-next-line
const baseUrl = "https://umami.castamerego.com/api/websites/e993a914-0864-4b88-a53c-75e46dc174d7/stats?startAt=1727427048000";

const headers = {
  Authorization:
// 这里要改为你的网站内容
// highlight-next-line
    "Bearer UktYSkoOuDBHl4srL/k0/MVxuWDLt9NZIzy9kQKYAAXl6j2Jbe47OKrp1H8j3YNCXolksMtOO9l8zwb1zbyH3kAcdOaWexJF1FuHeCv18HjJ8/fikSqf62izxuQYEGFEtdx2p6ukF8OQ0S3Lap5ACdr8VGguo0qbAexF6mnURaQp7LLOK8nebcofH5oADUyrIr0JJ6MncaMgvfZBqF0FMYHMMytpxarbsMgCubeHbJWpm+kGBCvkiNoorliF5Cqbv2xrmy8gQEohNLp5lVLtXO71+mDQMWTSRWz4XVg1vkVbg5rngITVBwPDLv3jyO8qY3DXZLeJGknxNW+OdoUhaqFgH46lMEGGhg==",
};

export default function UmamiPageViewCounter() {
  const { metadata } = useBlogPost();
  const { permalink } = metadata;
  const { i18n } = useDocusaurusContext();
  const { currentLocale } = i18n;
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const cacheKey = `umami_views_${permalink}`;
    const timeKey = `${cacheKey}_time`;
    const cacheTime = 1000 * 60 * 5;
    const now = Date.now();

    const cached = localStorage.getItem(cacheKey);
    const cachedTime = localStorage.getItem(timeKey);
    if (cached && cachedTime && now - parseInt(cachedTime) < cacheTime) {
      setViews(parseInt(cached));
    } else {
      setViews(null);
    }

    const fetchViews = async () => {
      const currentTime = Date.now();
      const paths = permalink.startsWith("/en/")
        ? [permalink, permalink.replace(/^\/en/, "")]
        : [permalink, "/en" + permalink];

      const requests = paths.map((path) => {
        const encodedPath = encodeURIComponent(path);
        const url = `${baseUrl}&endAt=${currentTime}&unit=month&timezone=Asia%2FShanghai&url=${encodedPath}&compare=false`;

        return fetch(url, { headers })
          .then((res) => res.json())
          .then((data) => data?.pageviews?.value ?? 0)
          .catch(() => 0);
      });

      const results = await Promise.all(requests);
      const totalViews = results.reduce((a, b) => a + b, 0);
      setViews(totalViews);
      localStorage.setItem(cacheKey, totalViews.toString());
      localStorage.setItem(timeKey, currentTime.toString());
    };

    fetchViews();
  }, [permalink]);

  if (views == null)
    return (
      <span className="tailwind flex items-center">
        <span className="inline-block w-12 h-3 bg-gray-50 rounded animate-pulse relative top-[1px]" />
      </span>
    );

  return currentLocale === "en" ? <>{views} views</> : <>{views} 次阅读</>;
}
```

</details>

## 集成到 Docusaurus

首先要把组件添加到你的项目中，将上面[最终版本](/blog/PageViewCounter#最终版本)的代码复制到 `src/components/PageViewCounter/UmamiPageViewCounter.tsx` 中。并修改两处为你自己的数据

接下来在命令行使用如下命令(在你运行项目的路径下)，在弹出的提示框选择 `typescript`, `eject`

```bash
npm run swizzle @docusaurus/theme-classic BlogPostItem/Header/Info
```

对于不熟悉 swizzle 的读者，这条命令的作用是将一些系统组件的代码复制到你的项目中，方便你进行修改。具体这条命令会生成 `src/theme/BlogPostItem/Header/Info/index.tsx` 文件

在生成的文件中，我们先将刚刚的组件导入，然后再最下面的 `return` 语句中添加组件的调用，如下

```typescript title="src/theme/BlogPostItem/Header/Info/index.tsx"
...
import { useDateTimeFormat } from "@docusaurus/theme-common/internal";
// highlight-next-line
import UmamiPageViewCounter from "@site/src/components/PageViewCounter/UmamiPageViewCounter";

...

export default function BlogPostItemHeaderInfo({
  className,
}: Props): JSX.Element {
  ....

  return (
    <div className={clsx(styles.container, "margin-vert--md", className)}>
      <DateTime date={date} formattedDate={formatDate(date)} />
      {typeof readingTime !== "undefined" && (
        <>
          <Spacer />
          <ReadingTime readingTime={readingTime} />
          // 添加这两行即可
          // highlight-next-line
          <Spacer />
          // highlight-next-line
          <UmamiPageViewCounter />
        </>
      )}
    </div>
  );
}

```

实在找不到可以把下面的代码直接贴进去

<details>
<summary>完整代码</summary>

```typescript title="src/theme/BlogPostItem/Header/Info/index.tsx"
import { translate } from "@docusaurus/Translate";
import { useBlogPost } from "@docusaurus/plugin-content-blog/client";
import { usePluralForm } from "@docusaurus/theme-common";
import { useDateTimeFormat } from "@docusaurus/theme-common/internal";
import UmamiPageViewCounter from "@site/src/components/PageViewCounter/UmamiPageViewCounter";
import type { Props } from "@theme/BlogPostItem/Header/Info";
import clsx from "clsx";
import React from "react";

import styles from "./styles.module.css";

// Very simple pluralization: probably good enough for now
function useReadingTimePlural() {
  const { selectMessage } = usePluralForm();
  return (readingTimeFloat: number) => {
    const readingTime = Math.ceil(readingTimeFloat);
    return selectMessage(
      readingTime,
      translate(
        {
          id: "theme.blog.post.readingTime.plurals",
          description:
            'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
          message: "One min read|{readingTime} min read",
        },
        { readingTime }
      )
    );
  };
}

function ReadingTime({ readingTime }: { readingTime: number }) {
  const readingTimePlural = useReadingTimePlural();
  return <>{readingTimePlural(readingTime)}</>;
}

function DateTime({
  date,
  formattedDate,
}: {
  date: string;
  formattedDate: string;
}) {
  return <time dateTime={date}>{formattedDate}</time>;
}

function Spacer() {
  return <>{" · "}</>;
}

export default function BlogPostItemHeaderInfo({
  className,
}: Props): JSX.Element {
  const { metadata } = useBlogPost();
  const { date, readingTime } = metadata;

  const dateTimeFormat = useDateTimeFormat({
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  const formatDate = (blogDate: string) =>
    dateTimeFormat.format(new Date(blogDate));

  return (
    <div className={clsx(styles.container, "margin-vert--md", className)}>
      <DateTime date={date} formattedDate={formatDate(date)} />
      {typeof readingTime !== "undefined" && (
        <>
          <Spacer />
          <ReadingTime readingTime={readingTime} />
          <Spacer />
          <UmamiPageViewCounter />
        </>
      )}
    </div>
  );
}
```

</details>

[Docusaurus Umami]: /docs/Server/Docusaurus-Umami