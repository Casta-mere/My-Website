---
slug: talk-003
title: 杂谈 003 · 面试
authors: [Castamere]
tags: [Life, Talk]
draft: true
references:
  - author: runoob
    title: Python2.x 与 3​​.x 版本区别
    time: 2018
    url: https://www.runoob.com/python/python-2x-3x.html
---

import { RoughNotation } from "react-rough-notation";
import TabItem from "@theme/TabItem";
import Tabs from "@theme/Tabs";

# 杂谈 003 · 面试

最近有些压力，改了改简历，面试刷刷手感

结果一天两场，还好只有第一场是技术面，深感自己不足，记录一下问题吧

<!-- truncate -->

## 开始

上来先拷打项目，合情合理

先大致总结一下问了哪些问题

- 分布式系统
- Python2 升 Python3
- GIL
- 高并发
- 异步 async
- 垃圾回收
- Linux 排查 

## Q2 分布式系统

> 有没有了解过分布式系统?

妹搞过，完了研究吧

## Q3 python 2 -> 3

> 从 python2 升到 python3，要注意哪些内容?

> 比如字符串会遇到什么问题?

> 比如会遇到什么编/解码问题吗?

### print

在 python2 中，print 是个 "语句"，而在 python3 中，print 是个 "函数"

:::info
语句(statement) 是解释器能直接执行的一条指令，比如: if, for, while

函数(function) 可复用的代码块(对象)，通过参数化实现逻辑封装，只有在被"调用"时其函数体才会执行
:::

具体到实践中:

<Tabs>

<TabItem value="python2" label="python2" default>

```python
print "Hello, World!"
```

</TabItem>

<TabItem value="python3" label="python3">

```python
print("Hello, World!")
```

</TabItem>

</Tabs>

### 字符串

<!-- 在 python2 中，字符串默认为 ASCII 编码的 bytes 类型，unicode() 是单独的

而在 python3 中，字符串为 unicode 类型。单独有 bytes 类型 -->

python中创建字符串的方式一般有下面这三种:

```python
str1 = "Hello, World!"
str2 = u"Hello, World!"
str3 = b"Hello, World!"

# 其实还有这些，但是比较复杂了
# str4 = r"Hello, \n World!" 
# str5 = f"Hello, {'World'}!" 
```

接下来讲一下这三种方式在 python2 和 python3 中会如何处理

#### 对象类型

| 创建方式         | python2            | python3           |
| ---------------- | ------------------ | ----------------- |
| "Hello, world!"  | `<type 'str'>`     | `<class 'str'>`   |
| u"Hello, world!" | `<type 'unicode'>` | `<class 'str'>`   |
| b"Hello, world!" | `<type 'str'>`     | `<class 'bytes'>` |


## Q4 GIL

> python 里面有个全局锁 GIL，有了解过吗?

## Q5 高并发

> 有处理过高并发的情况吗?

## Q6 异步编程

> 有使用过异步 async 吗?

## Q7 垃圾回收

> Python 的垃圾回收机制?

## Q8 Linux 排查 

> 假如在 linux 上的部署的服务突然很卡，你要怎么排查?

## 其他

> python 用过哪些库?