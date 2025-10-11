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
  - author: python.org
    title: Python 对自由线程的支持
    time: 2025 
    url: https://docs.python.org/zh-cn/dev/howto/free-threading-python.html
  - author: PEP
    title: PEP 703 – Making the Global Interpreter Lock Optional in CPython
    time: 2023
    url: https://peps.python.org/pep-0703/
  - author: Cheuk Ting Ho
    title: Faster Python：Unlocking the Python Global Interpreter Lock
    time: 2025
    url: https://blog.jetbrains.com/pycharm/2025/07/faster-python-unlocking-the-python-global-interpreter-lock/
---

import { RoughNotation } from "react-rough-notation";
import TabItem from "@theme/TabItem";
import Tabs from "@theme/Tabs";

# 杂谈 003 · 面试

最近有些压力，改了改简历，面试刷刷手感

结果一天两场，还好只有第一场是技术面，深感自己不足，记录一下问题吧

- 分布式系统
- Python2 升 Python3
- GIL
- 高并发
- 异步 async
- 垃圾回收
- Linux 排查 

后来想想，3—6 似乎全都和 GIL 有关

<!-- truncate -->

## 开始

上来先拷打项目，合情合理。后面基本上就是问上面那些问题

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

升级之后有以下优点:

- 更好的参数控制
  - end, sep, file, flush 都可以以 `print(..., end='')` 的形式传入
- 更 pythonic
  - print 作为函数，可以更好的传递，储存，包装
  - 可用于表达式环境，如 lambda 函数，回调函数
- 可以解包
  - print(*items) 

<Tabs>

<TabItem value="包装" label="包装">

```python title="用 partial 预配置参数" showLineNumbers
from functools import partial;
my_print = partial(print, sep="\n")
l = [1, 2, 3]
my_print(*l)

'''
1
2
3
'''
```

</TabItem>

<TabItem value="传递" label="传递" default>

```python title="传递给其他函数" showLineNumbers
import datetime
def log(msg, printer=print):
    printer(msg)

time_printer = lambda x: print(f"\033[32m{datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\033[0m: {x}")
log("Hello, World!", time_printer)
```

</TabItem>

<TabItem value="存储" label="存储">

```python showLineNumbers title="把函数放进变量或容器"
from functools import partial
import sys

actions = {
  "greet": lambda name: print(f"Hi, {name}!"),
  "warn": partial(print, "WARNING:", file=sys.stderr),
}

actions["greet"]("Alice")
actions["warn"]("disk almost full")
```

</TabItem>


</Tabs>

### 字符串

在 python2 中，字符串(str)默认为 ASCII 编码的 bytes 类型，unicode 是单独的

而在 python3 中，字符串(str)为 unicode 类型，单独有 bytes 类型

一句话: <RoughNotation type="highlight" show={true} color="rgba(255, 0, 0, 0.7)" strokeWidth={1} iterations={1} multiline={true} >python2 str=bytes, python3 str=unicode</RoughNotation>

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


py2 中如果混用 str(bytes) 和 unicode，解释器会尝试用 ASCII 解码字节，容易抛 UnicodeDecodeError 或产生乱码

py3 中 str(unicode) 和 bytes **不能混用**，必须显式编码/解码

### xrange() 和 range()

其实是列表和生成器的区别

| 函数   | python2    | python3    |
| ------ | ---------- | ---------- |
| range  | 返回列表   | 返回生成器 |
| xrange | 返回生成器 | 不存在     |

python2 中 range() 返回一个列表，xrange() 返回一个生成器

python3 中只有 range()，返回一个生成器

毕竟生成器节省内存

:::info
类似的还有 dict.keys() / dict.items() / dict.values() 都返回迭代器，更 pythonic
:::

### next

再回到迭代器，在 python2 中，迭代器有一个 next() 方法，你可以直接调用

```python title="python2" showLineNumbers
# 迭代器的 next 方法
it = iter([1, 2, 3])
print(it.next())
print(it.next())
print(it.next())
```

而在 python3 中，next 从迭代器对象中移除，变成了一个内置函数

```python title="python3" showLineNumbers
# 内置函数 next(), 传入迭代器对象
it = iter([1, 2, 3])
print(next(it))
print(next(it))
print(next(it))
```

### 除法

python2 中的 `/` 会执行**整数**除法(floor)，如果两个操作数都是整数，则结果也是整数

> 5/2=2，-5/2=-3

但 python3 中的 `/` 总是执行浮点除法，结果总是浮点数

> 5/2=2，-5/2=-2.5

P.S. `//` 在两个版本中表现一致

### 其他

- 异常语法
  - python2: `except Exception, e:`
  - python3: `except Exception as e:`
- 字典顺序
  - python2: 无序
  - python3: 有序，按照**插入顺序**
- 标准库重组
- print 语句变函数

## Q4 GIL

> Python 里面有个全局锁 GIL，有了解过吗?

GIL *Global Interpreter Lock* 即全局解释器锁，它确保任何时候都只有一个 Python 线程执行

GIL 是一个互斥锁，也是因为它的存在，Python 只有**虚假的**多线程。 GIL 导致最大的问题就是 <RoughNotation type="highlight" show={true} color="rgba(255, 115, 0, 0.7)" strokeWidth={1} iterations={1} multiline={true} > Python 的多线程并不能利用多核 CPU 的优势</RoughNotation>，而对于 I/O 密集型的程序，GIL 没什么影响(也就是说 Python 的多线程针对此情景还是好用的)，因为本来就是要等的

### Why GIL

既然 GIL 导致这样那样的问题，为什么一开始设计这么个东西呢

首先，GIL 体现了简洁高效。在其他具有真正多线程处理的编程语言中，有时问题源自多个线程同时修改数据，也就是 "race condition"，会导致很多不可预测的行为。各种语言的内存管理机制也因此变得复杂

而 GIL 以一种很简单的方式**简化内存管理**，也体现 Pythonic 的 *Simple is better than complex*。这也衍生出了一个好用的东西：引用计数。当一个对象的引用计数为零时，我们可以放心的释放它的内存

:::info
CPython 的 C API 约定：只要你持有 GIL，就可以"无锁地"读写 PyObject、操作引用计数、遍历容器等
:::

其次，Python 在 1991 年发布的时候，CPU 基本都是单核的，不要时空警察

### 禁用 GIL

从 Python3.13 开始，提供了一个支持 free threading 的 Python 构建，也就是禁用 GIL 的版本

[PEP 703](https://peps.python.org/pep-0703/) 详细介绍了这个提案

[Faster Python: Unlocking GIL](https://blog.jetbrains.com/pycharm/2025/07/faster-python-unlocking-the-python-global-interpreter-lock/#removing-the-gil) 这篇介绍了禁用 GIL 需要注意的点，这里不想过度深入(截至 Python3.13 似乎还未稳定)

## Q5 高并发

> 有处理过高并发的情况吗?

复盘的时候，越看越觉得这哥们太喜欢问 GIL 相关的问题了，高并发、异步 async、垃圾回收，基本都和它扯点关系

高并发这部分先跳过，看完下面的异步 async 再和 Threading、Multiprocessing 一起说，想看对比的可以直接跳到[这里](/blog/talk-003#高并发)

## Q6 异步编程

> 有使用过异步 async 吗?

### 高并发

## Q7 垃圾回收

> Python 的垃圾回收机制?

## Q8 Linux 排查 

> 假如在 linux 上的部署的服务突然很卡，你要怎么排查?

## 其他

> python 用过哪些库?

## 后记

当然这次面试没什么后话，但确实要开始学东西了