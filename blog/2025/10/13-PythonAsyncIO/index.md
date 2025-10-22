---
slug: PythonAsyncIO
title: Python's AsyncIO 实践指南
authors: [Castamere]
tags: [Translated, Python, AsyncIO, Concurrency, Asynchronous Programming, Coroutines]
references:
  - author: Leodanis Pozo Ramos
    title: Python's asyncio：A Hands-On Walkthrough
    time: 2025
    url: https://realpython.com/async-io-python
---

import Terminal from "./components/Terminal";
import Terminal1 from "./components/Terminal1";
import Terminal2 from "./components/Terminal2";
import Terminal3 from "./components/Terminal3";

Python 的 `asyncio` 库允许使用 `async` 和 `await` 关键字来编写并发代码。其核心构件是可等待对象 (awaitable objects)，通常为**协程 (coroutines)**。这些可等待对象由事件循环 (event loop) 调度并以异步方式执行。这种编程模型能够在单线程环境下，高效地管理大量 I/O 密集型任务

本教程将介绍 Python `asyncio` 的工作原理、如何定义并运行协程、 以及在处理 I/O 密集型任务的应用中何时使用异步编程以获得更好的性能

**读完本文，你将了解**：

- Python `asyncio` 提供了一个使用**协程**、**事件循环**和**非阻塞 I/O 操作**来编写单线程并发代码的框架
- 对于 I/O 密集型任务，异步 I/O **通常比多线程 (multithreading) 更高效**，尤其是在管理大量并发任务时，因为它避免了线程调度与同步带来的开销
- 当应用程序在等待 **I/O 操作**(如网络请求或文件访问)上花费大量时间，且希望在不额外创建线程(threads)或进程(processes)的情况下**并发执行大量相似任务**时，应当使用 `asyncio`

:::important 重要
本篇是笔者翻译的 [Python's asyncio: A Hands-On Walkthrough](https://realpython.com/async-io-python/#other-async-io-features-in-python)，**仅作中文翻译及学习交流使用**，如有侵权请联系删除
:::

<!-- truncate -->

# Python's AsyncIO 实践指南

:::tip
[点击这里](./demo/materials-python-asyncio.zip)下载本篇中用到的代码
:::

## 写在前面

笔者会在术语第一次出现时标注英文，以减少歧义

[文末](/blog/PythonAsyncIO#术语表)会提供一个简短的术语表，供读者参考

## 初见 Async I/O

:::warning 译者注 
原文中 `Async I/O` 和 `asyncio` 有多处混用，笔者会根据自己的理解进行区分

- **`Async I/O`** 指异步 I/O 这种并发模型
- **`asyncio`** 指 Python 标准库中的 `asyncio` 包
:::

在深入探讨 `asyncio` 之前，不妨花点时间将异步 I/O 与其他并发模型进行比较，看看它如何融入 Python 宏大(~~眼花缭乱~~)的生态体系。以下是几个关键概念：

- **并行 (Parallelism)**: 同时执行多个操作
- **多进程 (Multiprocessing)**: 实现并行的一种方式，可将任务分配到多个 CPU 核心上。多进程适合 CPU 密集型任务，例如计算密集的[循环](https://realpython.com/python-for-loop/)，数学计算等
- **并发 (Concurrency)**: 比并行更宽泛，它表示多个任务可以以重叠方式推进；**并发不一定意味着并行**
- **线程 (Threading)**: 一种并发执行模型，多个线程轮流执行任务。一个进程可以包含多个线程。由于[全局解释器锁 (GIL)](https://realpython.com/python-gil/)，Python 与线程的关系较为复杂，本文不做展开

多线程对于 [I/O 密集型任务](https://realpython.com/ref/glossary/io-bound-task/)表现更佳。I/O 密集型任务的特点是大量等待[输入/输出 (I/O)](https://realpython.com/ref/glossary/input-output/) 操作完成，而 [CPU 密集型任务](https://realpython.com/ref/glossary/cpu-bound-task/)通常从开始到结束都会持续占用 CPU 核心

Python [标准库](https://realpython.com/ref/glossary/standard-library/)通过 `multiprocessing`、`concurrent.futures` 和 `threading` 包为这些并发模型[提供了长期支持](https://docs.python.org/3/library/concurrency.html)

近年来，另一种模型已更全面地融入 [CPython](https://realpython.com/cpython-source-code-guide/)：**异步 I/O (async I/O)**。该模型由标准库的 [`asyncio`](https://realpython.com/ref/stdlib/asyncio/) 包以及 [`async`](https://realpython.com/python-keywords/#the-async-keyword) 和 [`await`](https://realpython.com/python-keywords/#the-await-keyword) 关键字提供

:::note
异步 I/O 并不是一个新概念。它已经存在于其他语言中，或者正在被引入其他语言，例如 [Go](https://gobyexample.com/goroutines)、[C#](https://docs.microsoft.com/en-us/dotnet/csharp/async) 和 [Rust](https://doc.rust-lang.org/book/ch17-00-async-await.html) 
:::

Python 官方文档将 `asyncio` 描述为[用于编写并发代码的库](https://docs.python.org/3/library/asyncio.html)。但异步 I/O 并非建立在多线程或多进程之上

异步 I/O 是一种单线程、单进程并基于[协作式多任务 (Cooperative Multitasking)](https://en.wikipedia.org/wiki/Cooperative_multitasking) 的技术。即便只在单进程的单线程中运行，仍可呈现并发效果。 [协程 (coroutines)](https://realpython.com/ref/glossary/coroutine/) 是异步 I/O 的核心抽象：**可被并发调度，但它们本身并不具备并发性**

再重申一下，异步 I/O 是并发编程模型，但它并不能并行。相比于多进程，异步 I/O 更接近于多线程，但它与两者都有所不同，是并发生态系统中的独立成员

接下来，还有一个术语需要解释。说了半天，到底什么是 **异步 (asynchronous)**? 这里为了本教程更易懂，给出一个非严格的定义，仅考虑两个关键点：

1. **异步例程 (asynchronous routines)** 在等待结果时，可以暂停它的执行，并允许其他代码在此期间运行
2. **异步代码 (asynchronous code)** 通过协调异步例程，促进任务的并发执行

这里给出一张图，帮助理解。白色的术语代表概念，绿色的术语代表 Python 中的实现方式：

![compare](image/compare.SVG)

本篇只关注异步 I/O，如果想深入了解多线程，多进程和异步 I/O 之间的区别，可以暂停一下，阅读这篇 [Speed Up Your Python Program With Concurrency](https://realpython.com/python-concurrency/)

### Async I/O 原理

初见 Async I/O 可能会觉得有些反直觉，甚至自相矛盾。它是如何在单线程、单 CPU 核心中实现并发代码的呢？Miguel Grinberg 在 [PyCon](https://realpython.com/pycon-guide/) 的演讲对此给出了精彩阐释

> 国际象棋大师 Judit Polgár 主持了一场国际象棋展览赛，期间她与多名业余选手对弈。她有两种方式来进行这场展览赛：同步和异步
>
> 假设:
> - 24 名对手
> - Judit 每次走棋耗时 5 秒
> - 对手每次走棋耗时 55 秒
> - 平均每局棋 30 个回合 (共 60 步)
>
> **同步版本**: Judit 一次只进行一局比赛，绝不同时进行两局，直到比赛结束。每局比赛耗时 (55 + 5) * 30 == 1800 秒，即 30 分钟。整场展览赛耗时 24 * 30 == 720 分钟，即 **12 小时**
>
> **异步版本**: Judit 在各个棋桌间穿梭，每次在每张桌子上走一步棋。她离开棋桌，让对手在等待期间走下一步棋。所有 24 局比赛各走一步棋耗时 Judit 24 * 5 == 120 秒，即 2 分钟。整场展览赛耗时 120 * 30 == 3600 秒，即仅 **1 小时** ([来源](https://youtu.be/iG6fr81xHKA?t=4m29s))

只有一个 Judit Polgár，每次只能走一步棋。异步下棋可以把展览赛的时间从 12 小时缩短到 1 小时。这就是异步 I/O 的原理。在异步 I/O 中，程序的事件循环(后面会详细介绍)会运行多个任务，使每个任务都能在最佳时机轮流执行

异步 I/O 会处理那些耗时较长的[函数](https://realpython.com/defining-your-own-python-function/)，例如上面提到的完整国际象棋比赛，这些函数会阻塞程序的执行(就像 Judit Polgár 的时间)。它通过特殊机制管理这些操作，使其他函数能在等待期间继续运行。在国际象棋的例子中，Judit Polgár 会在前一个对手走棋时与另一个对手下棋

### Async I/O 并不简单

要写出经得起折腾的多线程代码并不容易，还很容易埋下 bug。异步 I/O 可以规避多线程设计中的不少坑，但这并不意味着在 Python 中进行[异步编程](https://realpython.com/ref/glossary/asynchronous-programming/)就是件轻松的事

深入一些就会发现，Python 的异步编程很棘手。Python 的异步模型是围绕一组概念构建的：回调(callbacks)、协程(coroutines)、事件(events)、传输(transports)、协议(protocols) 以及 [Future 对象](https://docs.python.org/3/library/asyncio-future.html#asyncio.Future)，光是这些术语听起来就足够让人犯怵

话虽如此，如今 Python 的异步编程生态系统已经成熟了许多。`asyncio` 包日趋稳定，并提供了可靠的 [API](https://realpython.com/ref/glossary/api/)。文档也经过大幅度的修订，同时社区里也涌现出了不少高质量的资源

## Python 的 Async I/O: `asyncio`

了解了异步 I/O 的并发模型之后，我们来看看 Python 的实现。 Python 的 `asyncio` 包与两个关键字 [`async`](https://realpython.com/python-keywords/#the-async-keyword) 和 [`await`](https://realpython.com/python-keywords/#the-await-keyword) 各司其职，把它们组合起来，就可以声明、构建、执行以及管理异步代码

### 协程与协程函数

上文提到，异步 I/O 的核心是[**协程**](https://realpython.com/ref/glossary/coroutine/)的概念。它是一种可以暂停并在稍后恢复执行的对象。在此期间，它可以把控制权交还给事件循环，由后者去执行其他协程。协程对象来自于调用[**协程函数**](https://realpython.com/ref/glossary/coroutine-function/)，也称为**异步函数**，使用 `async def` 定义

在开始写异步代码前，先来看一个同步运行的示例:

```python title="synchronous.py" showLineNumbers
import time

def count():
    print("One")
    time.sleep(1)
    print("Two")
    time.sleep(1)

def main():
    for _ in range(3):
        count()

if __name__ == "__main__":
    start = time.perf_counter()
    main()
    elapsed = time.perf_counter() - start
    print(f"{__file__} executed in {elapsed:0.2f} seconds.")
```

这段代码很简单，`count()` 会[打印](https://realpython.com/python-print/) `One`, 休眠 1 秒, 再打印 `Two`, 然后再休眠 1 秒。主函数调用 `count()` 三次，并计时

[运行](https://realpython.com/run-python-scripts/)这段代码，会有如下输出：

<Terminal />

代码会交替打印 `One` 和 `Two`，每次之间间隔一秒，总耗时略多于 6 秒

下面用 Python 的异步 I/O 模型重写这段代码：

```python title="countasync.py" showLineNumbers
import asyncio

async def count():
    print("One")
    await asyncio.sleep(1)
    print("Two")
    await asyncio.sleep(1)

async def main():
    await asyncio.gather(count(), count(), count())

if __name__ == "__main__":
    import time

    start = time.perf_counter()
    asyncio.run(main())
    elapsed = time.perf_counter() - start
    print(f"{__file__} executed in {elapsed:0.2f} seconds.")
```

使用 `async` 把 `count()`  定义为协程函数。在 `count()` 中用 `await` 关键字等待 `asyncio.sleep()` 执行时，会把控制权交还给事件循环，并表示：*我将休眠 1 秒。期间请继续执行其他任务*

`main()` 也是一个协程函数，它使用 [`asyncio.gather()`](https://realpython.com/async-io-python/#other-asyncio-tools) 并发运行三个 `count()` 实例。然后用 `asyncio.run()` 启动[`事件循环`](https://realpython.com/async-io-python/#the-async-io-event-loop)来执行 `main()`

执行效果如下:

<Terminal1 />

得益于异步 I/O，总耗时从 6 秒降低到了 2 秒。体现了 `asyncio` 在 I/O 密集型任务中的效率优势

用 `time.sleep()` 和 `asyncio.sleep()` 演示看似简单，但能代表包含等待时间的耗时过程。其中 `time.sleep()` 模拟阻塞型调用，而 `asyncio.sleep()` 模拟非阻塞型调用

下一节会讲到，像 `asyncio.sleep()` 这样的非阻塞等待的优势在于：可以暂时将控制权让出给其他可立即执行的函数。相反，`time.sleep()` 这种阻塞型调用会阻塞整个事件循环，使其他协程在睡眠期间无法前进，因此与异步 Python 代码并不兼容

### `async` 和 `await` 

接下来有必要对 `async`, `await` 及其创建的协程函数进行更正式的定义：

- `async def` 语法可以用来定义 `协程函数` 或者 [**异步生成器**](https://realpython.com/ref/glossary/asynchronous-generator/)
- `async with` 和 `async for` 语法分别用来构造 `异步上下文管理器` 和 `异步 for` **循环**
- `await` 关键字会暂停所在协程的执行，并将控制权交还给事件循环

这里再用一个例子解释一下最后一条：当 Python 在执行 `g()` 协程时遇到 `await f()`, `await` 就会告诉事件循环: *暂停 g() 的执行直至 f() 返回结果，期间允许其他任务运行*

体现到代码里大概是这样:

```python
async def g():
    result = await f()  # 暂停执行 g(), 等 f() 执行完再回来
    return result
```

`async` 和 `await` 有一套严格的使用规则：

- 使用 `async def` 可以构造协程函数，在协程函数中可以选择性地使用 `await`, `return` 和 `yield`
  - `await` 和 `return` 都可以用在普通的协程函数中。调用时必须要用 `await` 获取结果，或者直接在事件循环中运行
  - 在 `async def` 的函数中用 `yield` 替换 `return`, 就构造出了异步生成器。可通过 [`async for` 循环或列表推导式](https://realpython.com/async-io-python/#async-iterators-loops-and-comprehensions) 迭代该生成器
  - 和普通的生成器不同，在异步生成器中不能使用 `yield from`, 否则直接报 [`SyntaxError`](https://realpython.com/invalid-syntax-python/)
- 仅能在协程中使用 `await` 关键字，在外部使用同样会报 [`SyntaxError`](https://realpython.com/invalid-syntax-python/)

以下是一些简单的示例，概括了这些规则：

```python title="summary" showLineNumbers
async def f(x):
    y = await z(x)  # ✔️ - `await` and `return` allowed in coroutines
    return y

async def g(x):
    yield x  # ✔️ - this is an async generator

async def m(x):
    yield from gen(x)  # ❌ - SyntaxError

def n(x):
    y = await z(x)  # ❌ - SyntaxError (no `async def` here)
    return y
```

最后，当我们使用 `await f()` 时，需要 `f()` 是一个[**可等待对象**](https://realpython.com/ref/glossary/awaitable/)。也就是两种情况：要么是一个协程，要么是实现了 `.__await__()` [特殊方法](https://realpython.com/python-magic-methods/)的对象。虽然但是，大多数情况考虑协程就好了

下面这个样例更直观地展示异步 I/O 如何缩短等待时间。定义一个协程函数 `makerandom()`，该函数持续生成[0, 10]范围内的随机整数，并在其中一个数值超过阈值时返回。在下面的示例中，将并发调用该函数三次。为区分每次调用，用不同颜色标记：

```python title="rand.py" showLineNumbers
import asyncio
import random

COLORS = (
    "\033[0m",  # End of color
    "\033[36m",  # Cyan
    "\033[91m",  # Red
    "\033[35m",  # Magenta
)

async def main():
    return await asyncio.gather(
        makerandom(1, 9),
        makerandom(2, 8),
        makerandom(3, 8),
    )

async def makerandom(delay, threshold=6):
    color = COLORS[delay]
    print(f"{color}Initiated makerandom({delay}).")
    while (number := random.randint(0, 10)) <= threshold:
        print(f"{color}makerandom({delay}) == {number} too low; retrying.")
        await asyncio.sleep(delay)
    print(f"{color}---> Finished: makerandom({delay}) == {number}" + COLORS[0])
    return number

if __name__ == "__main__":
    random.seed(444)
    r1, r2, r3 = asyncio.run(main())
    print()
    print(f"r1: {r1}, r2: {r2}, r3: {r3}")
```

执行结果如下:

![random output](image/rand.gif)

代码中定义了 `makerandom()` 协程，并且用三组不同输入异步运行。大多数异步代码都是像这样，首先有一个小型的模块化协程，以及一个用来[链接](https://realpython.com/async-io-python/#coroutine-chaining)协程的包装函数。然后在 `main()` 函数中统一调度它们。这三个 `makerandom()` 就构成了**任务池**

虽然生成随机数是 CPU 密集型的操作，但这里的影响可以忽略不计。这里 `asyncio.sleep()` 模拟 I/O 密集型任务，强调只有 I/O 密集型或其他非阻塞型任务，才更适合异步 I/O

### Async I/O 事件循环

在异步编程中，事件循环 (event loop) 是一个[持续运行的循环](https://realpython.com/python-while-loop/#intentional-infinite-loops)，用于跟踪协程的等待状态，并在空闲时调度其他可运行任务。当某个协程的等待条件被满足时，就可以将其唤醒

在现代 Python 中，启动事件循环的推荐方式是使用 [`asyncio.run()`](https://docs.python.org/3/library/asyncio-runner.html#asyncio.run)。该函数负责获取事件循环，运行任务直至完成，最后关闭循环。当同一代码中存在其他正在运行的异步事件循环时，不可调用此函数

也可以通过 `get_running_loop()` 函数获取当前运行中的事件循环实例：

```python
loop = asyncio.get_running_loop()
```

上述 `loop` 对象是程序内与事件循环交互的主要接口。可以使用 `.is_running()` 和 `.is_closed()` 来检查 `loop` 对象的状态。例如需要[调度一个回调](https://docs.python.org/3/library/asyncio-eventloop.html#asyncio-example-lowlevel-helloworld)时，可以把 `loop` 对象作为参数传入。注意：若当前没有正在运行的事件循环，调用 `get_running_loop()` 会抛 [`RuntimeError`](https://realpython.com/ref/builtin-exceptions/runtimeerror/)

除此之外，更重要的是要理解事件循环的底层运转机制：

- 协程在被绑定到事件循环前本身作用有限
- Python 的异步事件循环是在单 CPU 核心的单线程上运行的。在大多数 `asyncio` 应用中通常仅有一个事件循环，且一般运行在主线程。虽然技术上可以在不同线程中运行多个事件循环，但一般用不上，也不推荐这样做
- 事件循环是可插拔 (pluggable) 的，可以自己实现一个事件循环，然后用它来调度任务(而不用 `asyncio` 自带的)

对于上面的第一点，下面的代码很好地解释了：若协程需等待其他协程完成，则单独调用该协程几乎毫无意义

```python
>>> import asyncio

>>> async def main():
...     print("Hello...")
...     await asyncio.sleep(1)
...     print("World!")
...

>>> routine = main()
>>> routine
<coroutine object main at 0x1027a6150>
```

在这个例子中，直接调用 `main()` 函数会返回一个协程对象，该对象不能单独使用。需要用 `asyncio.run()` 将 `main()` 协程调度到事件循环中执行：

```python
>>> asyncio.run(routine)
Hello...
World!
```

换句话说，本质上就是用一层 `asyncio.run()` 包装 `main()` 协程。当然，在协程中用 `await` 调用别的协程不需要考虑这个问题

最后，事件循环的*可插拔性*意味着可以替换为任意兼容的实现，并且与协程完全解耦。事实上，仅 `asyncio` 包内就有两种[事件循环实现](https://docs.python.org/3/library/asyncio-eventloop.html#event-loop-implementations)

默认事件循环实现取决于平台和 Python 版本。在 Unix 系统中，默认通常采用 [SelectorEventLoop](https://docs.python.org/3/library/asyncio-eventloop.html#asyncio.SelectorEventLoop)，而 Windows 则采用 [ProactorEventLoop](https://docs.python.org/3/library/asyncio-eventloop.html#asyncio.ProactorEventLoop) 以获得更优的子进程和 I/O 支持

此外还可使用第三方的事件循环，比如 [uvloop](https://github.com/MagicStack/uvloop) 库也有自己的事件循环，而且号称比 `asyncio` 更快

### `asyncio` REPL

从 [Python 3.8](https://realpython.com/python38-new-features/) 开始，`asyncio` 模块包含一个名为 [asyncio REPL](https://docs.python.org/3/library/asyncio.html#asyncio-cli) 的专用交互环境。在这个环境中，可以直接用 `await` 关键字，不需要包装在 `asyncio.run()` 中。该环境一般用于测试、调试和学习 `asyncio`

可以用如下命令进入 [`asyncio` REPL](https://realpython.com/ref/glossary/repl/)

```python
$ python -m asyncio
asyncio REPL 3.13.3 (main, Jun 25 2025, 17:27:59) ... on darwin
Use "await" directly instead of "asyncio.run()".
Type "help", "copyright", "credits" or "license" for more information.
>>> import asyncio
>>>
```

当出现 >>> 提示符后，即可在此处开始运行异步代码。参考下面的示例：

```python title="asyncio repl"
>>> import asyncio

>>> async def main():
...     print("Hello...")
...     await asyncio.sleep(1)
...     print("World!")
...

>>> await main()
Hello...
World!
```

此示例与上一节中的示例功能相同。但区别在于，它不使用 `asyncio.run()` 来运行 `main()` 函数，而是直接使用 `await` 

## 常见 Async I/O 编程模式

异步 I/O 有独特的编程模式，可以帮助写更好的异步代码。实践中，可以*串联协程*或者用协程 [队列](https://realpython.com/ref/glossary/queue/)。本章会分别介绍这两种模式

### 协程串联

协程的一个特点是它可以被串联起来。正如上文所说，协程都应当是可等待的，因此我们可以在一个协程中使用 `await` 等待另一个协程。从而将程序拆解为更小、更易管理且可复用的协程

下面的样例模拟了一个简单的流程：先获取用户信息，再获取其已发布的帖子：

```python title="chain.py" showLineNumbers
import asyncio
import random
import time

async def main():
    user_ids = [1, 2, 3]
    start = time.perf_counter()
    await asyncio.gather(
        *(get_user_with_posts(user_id) for user_id in user_ids)
    )
    end = time.perf_counter()
    print(f"\n==> Total time: {end - start:.2f} seconds")

async def get_user_with_posts(user_id):
    user = await fetch_user(user_id)
    await fetch_posts(user)

async def fetch_user(user_id):
    delay = random.uniform(0.5, 2.0)
    print(f"User coro: fetching user by {user_id=}...")
    await asyncio.sleep(delay)
    user = {"id": user_id, "name": f"User{user_id}"}
    print(f"User coro: fetched user with {user_id=} (done in {delay:.1f}s).")
    return user

async def fetch_posts(user):
    delay = random.uniform(0.5, 2.0)
    print(f"Post coro: retrieving posts for {user['name']}...")
    await asyncio.sleep(delay)
    posts = [f"Post {i} by {user['name']}" for i in range(1, 3)]
    print(
        f"Post coro: got {len(posts)} posts by {user['name']}"
        f" (done in {delay:.1f}s):"
    )
    for post in posts:
        print(f" - {post}")

if __name__ == "__main__":
    random.seed(444)
    asyncio.run(main())
```

在这个样例中，有两个主要的协程 `fetch_user()` 和 `fetch_posts()`。两者都通过一个随机时长的 `asyncio.sleep()` 来模拟网络请求

在 `fetch_user()` 协程中，会返回一个用户[字典](https://realpython.com/python-dicts/)。在 `fetch_posts()` 中基于该字典获取该用户的帖子列表。两者都通过随机时长的 `asyncio.sleep()` 模拟网络调用，其中的随机延迟用来模拟真实环境中的异步特性(如网络时延)

在 `get_user_with_posts()` 中就使用了协程的串联。该协程先等待 `fetch_user()` 完成，并将结果存入一个用户[变量](https://realpython.com/python-variables/)中。获取到用户信息后，再将其传递给 `fetch_posts()` 以异步方式获取帖子

在 `main()` 中，使用 `asyncio.gather()` 并发执行已串联的协程：按用户 ID 数量分别调用 `get_user_with_posts()`

执行结果如下：

<Terminal2 />

若将所有操作的时间相加，采用同步实现将耗时约 7.6 秒。但采用异步实现仅需 2.68 秒

协程串联的模式通过等待一个协程并将其结果传递给下一个协程，形成了一条**协程链 (coroutine chain)**，其中每个步骤都依赖于前一个步骤。此示例模拟了常见的异步工作流：获取一段信息后，利用该信息获取相关数据

### 协程与队列集成

`asyncio` 包提供了一些[队列类](https://realpython.com/queue-in-python/#using-asynchronous-queues)，其设计理念和[队列](https://docs.python.org/3/library/queue.html#module-queue)模块的[类](https://realpython.com/python-classes/)相似。前面的样例中，并不需要队列结构：在 `chain.py` 中，每个任务都由协程执行，而数据的传递通过链式调用实现

另一种实现方式则是生产者/消费者模型：**生产者**会向[队列](https://realpython.com/ref/glossary/queue/)中添加项。每个生产者可在错开、随机且无预告的时间点向队列添加多项内容。而**消费者**会贪心地从队列中提取新添加的项，无需等待任何信号

在这种设计中，生产者和消费者之间没有链式依赖，双方也不需要知道对方的数量

单个生产者或消费者向队列添加或移除项所需的时间是可变的。队列作为缓冲与通信通道，可在生产者与消费者之间传递数据，而无需它们直接交互

下面是一个基于队列的 `chained.py`:

```python title="chained.py" showLineNumbers
import asyncio
import random
import time

async def main():
    queue = asyncio.Queue()
    user_ids = [1, 2, 3]

    start = time.perf_counter()
    await asyncio.gather(
        producer(queue, user_ids),
        *(consumer(queue) for _ in user_ids),
    )
    end = time.perf_counter()
    print(f"\n==> Total time: {end - start:.2f} seconds")

async def producer(queue, user_ids):
    async def fetch_user(user_id):
        delay = random.uniform(0.5, 2.0)
        print(f"Producer: fetching user by {user_id=}...")
        await asyncio.sleep(delay)
        user = {"id": user_id, "name": f"User{user_id}"}
        print(f"Producer: fetched user with {user_id=} (done in {delay:.1f}s)")
        await queue.put(user)

    await asyncio.gather(*(fetch_user(uid) for uid in user_ids))
    for _ in range(len(user_ids)):
        await queue.put(None)  # Sentinels for consumers to terminate

async def consumer(queue):
    while True:
        user = await queue.get()
        if user is None:
            break
        delay = random.uniform(0.5, 2.0)
        print(f"Consumer: retrieving posts for {user['name']}...")
        await asyncio.sleep(delay)
        posts = [f"Post {i} by {user['name']}" for i in range(1, 3)]
        print(
            f"Consumer: got {len(posts)} posts by {user['name']}"
            f" (done in {delay:.1f}s):"
        )
        for post in posts:
            print(f"  - {post}")

if __name__ == "__main__":
    random.seed(444)
    asyncio.run(main())
```

在这个例子中，`producer()` 会异步地获取用户数据，获取到的数据会添加到 `asyncio.Queue` 中，该队列将数据共享给消费者。在生产完所有用户对象后，生产者会插入一个[哨兵值  (sentinel value)](https://en.wikipedia.org/wiki/Sentinel_value)，用于向每个消费者发出数据发送终止信号，使消费者能够安全关闭

`consumer()` 会持续地从队列中读数据，如果获取到了一个用户对象，就会去获取该用户的帖子，并将结果打印输出。如果获取到了上面的哨兵值，就终止循环并退出

这种解耦使得多个消费者可以并发的处理用户—即使生产者仍在获取其他用户，而队列确保了生产者与消费者之间安全有序的通信

队列作为生产者与消费者之间的通信枢纽，使系统具备可扩展性和响应能力

运行结果如下：

<Terminal3 />

代码再次仅用 2.68 秒就运行完毕，效率高于同步解决方案。其结果与上一节中使用协程链时几乎相同

## Python Async I/O 的其他功能

Python 的异步 I/O 不仅仅包含 `async def` 和 `await` 结构，还有一些其他的工具。这些工具可以使异步编程更 Pythonic

接下来会介绍几个异步功能，包括异步循环、列表推导式、`async with` 上下文管理器、异常组。这些功能可以帮助我们编写更简洁、更易读的异步代码


### 异步迭代器、循环、列表推导式

除了使用 `async` 和 `await` 创建协程外，Python 还提供了 `async for` 结构来遍历[异步迭代器](https://realpython.com/ref/glossary/asynchronous-iterator/)。异步迭代器允许遍历异步生成的数据。在循环运行期间，它会将控制权交还给事件循环，以便其他异步任务得以执行

:::note
想了解更多关于异步迭代器，可参考这篇：[Python 中的异步迭代器](https://realpython.com/python-async-iterators/)
:::

有异步迭代器，自然有[**异步生成器**](https://realpython.com/ref/glossary/asynchronous-generator/)。可以参考下面这个示例：异步生成 2 的幂

```python title="asynchronous generator" showLineNumbers
>>> import asyncio

>>> async def powers_of_two(stop=10):
...     exponent = 0
...     while exponent < stop:
...         yield 2**exponent
...         exponent += 1
...         await asyncio.sleep(0.2)  # Simulate some asynchronous work
...

>>> async def main():
...     g = []
...     async for i in powers_of_two(5):
...         g.append(i)
...     print(g)
...     f = [j async for j in powers_of_two(5) if not (j // 3 % 5)]
...     print(f)
...

>>> asyncio.run(main())
[1, 2, 4, 8, 16]
[1, 2, 16]
```

同步与异步的生成器、循环和列表推导式有本质区别：异步版本并不会让迭代天然并发。相反，只有在显式 `await` 让出控制权时，事件循环才会在两次迭代之间运行其他任务。**迭代本身仍然是顺序的**，除非使用 asyncio.gather() 等方式引入并发

我们仅在处理异步迭代器或上下文管理器时才需要使用 `async for` 和 `async with`，因为此时常规的 `for` 或 `with` 会引发错误

### 异步 `with` 语句

[`with` 语句](https://realpython.com/python-with-statement/)也有[异步](https://realpython.com/ref/glossary/asynchronous-programming/)版本：`async with`。这种结构在异步代码中还算常见，因为很多 [I/O 密集型](https://realpython.com/ref/glossary/io-bound-task/)任务都需要上下文管理(文件，数据库连接等)

例如，假设需要编写协程来检测网站是否在线

:::tip
这里使用第三方库 [aiohttp](https://docs.aiohttp.org/en/stable/index.html)，可以通过 `pip install aiohttp` 安装
:::

样例如下：

```python title="async with" showLineNumbers
>>> import asyncio
>>> import aiohttp

>>> async def check(url):
...     async with aiohttp.ClientSession() as session:
...         async with session.get(url) as response:
...             print(f"{url}: status -> {response.status}")
...

>>> async def main():
...     websites = [
...         "https://realpython.com",
...         "https://pycoders.com",
...         "https://www.python.org",
...     ]
...     await asyncio.gather(*(check(url) for url in websites))
...

>>> asyncio.run(main())
https://www.python.org: status -> 200
https://pycoders.com: status -> 200
https://realpython.com: status -> 200
```

我们用 `asyncio` 和 `aiohttp` 来并发地对一系列网站进行 [GET](https://realpython.com/api-integration-in-python/#get) 请求。`check()` 协程会获取并打印网站的状态。`async with` 语句会在不阻塞事件循环的情况下打开和关闭连接，以确保 `ClientSession` 和每个 HTTP 响应能被正确、异步地管理

在这个示例中，`async with` 确保底层网络资源(包括连接和套接字)即使发生错误也能正确释放

最后，`main()` 函数并发执行多个 `check()` 协程，实现并发抓取 URL，无需等待前一个请求完成即可启动下一个

### 其他 `asyncio` 工具

除了 `asyncio.run()` 之外，上文已经用到了一些其他的 `asyncio` 包函数，比如 `asyncio.gather()` 和 `asyncio.get_event_loop()`。除此之外还可以使用 [`asyncio.create_task()`](https://docs.python.org/3/library/asyncio-task.html#asyncio.create_task) 来安排协程对象的执行，随后再调用常规的 `asyncio.run()` 函数：

```python title="asyncio" showLineNumbers
>>> import asyncio

>>> async def coro(numbers):
...     await asyncio.sleep(min(numbers))
...     return list(reversed(numbers))
...

>>> async def main():
...     task = asyncio.create_task(coro([3, 2, 1]))
...     print(f"{type(task) = }")
...     print(f"{task.done() = }")
...     return await task
...

>>> result = asyncio.run(main())
type(task) = <class '_asyncio.Task'>
task.done() = False
>>> print(f"result: {result}")
result: [1, 2, 3]
```

使用 `asyncio.create_task()` 有一个小细节需要注意：如果创建了之后，不去等待它们，或者没有包装在 `gather()` 里面，那么当主协程  `main()` 结束时，事件循环随之收尾时，这些“无人等待”的任务会被统一取消。也就是说，想让它们真正跑完，一定要 `await` 它们(或用 gather/TaskGroup 管起来)

`asyncio.create_task()` 会把一个可等待对象包装为一个更高层次的 [`Task`](https://docs.python.org/3/library/asyncio-task.html#asyncio.Task) 对象，将其调度到事件循环中后台并发运行。相反地，直接对协程进行 `await` 会立即运行该协程，并暂停当前的调用者，直到被等待的协程完成

`asyncio.gather()` 则是用来把一组协程整齐地汇聚为一个单一的 **Future 对象**。这个对象只是一个结果占位符，其初始值未知，但将在某个时刻可用，通常作为异步计算的结果

若调用 `asyncio.gather()` 并指定多个任务或协程，事件循环将等待所有任务完成。此时 `asyncio.gather()` 的返回值将是所有输入结果的集合：

```python title="gather" showLineNumbers
>>> import time

>>> async def main():
...     task1 = asyncio.create_task(coro([10, 5, 2]))
...     task2 = asyncio.create_task(coro([3, 2, 1]))
...     print("Start:", time.strftime("%X"))
...     result = await asyncio.gather(task1, task2)
...     print("End:", time.strftime("%X"))
...     print(f"Both tasks done: {all((task1.done(), task2.done()))}")
...     return result
...

>>> result = asyncio.run(main())
Start: 14:38:49
End: 14:38:51
Both tasks done: True

>>> print(f"result: {result}")
result: [[2, 5, 10], [1, 2, 3]]
```

`asyncio.gather()` 会等待传入的整组协程**全部完成**后再返回。且结果顺序与传入顺序严格一致

另外，可以通过遍历 `asyncio.as_completed()`，以按"完成先后"获取任务。该函数返回一个同步迭代器，会在各个任务完成时依次产出结果。下面这个例子中，`coro([3, 2, 1])` 的结果会先于 `coro([10, 5, 2])` 可用；而用 `asyncio.gather()` 时不是这样(`asyncio.gather` 按传入顺序给结果，并要等全部完成)

```python title="asyncio.as_completed()" showLineNumbers
>>> async def main():
...     task1 = asyncio.create_task(coro([10, 5, 2]))
...     task2 = asyncio.create_task(coro([3, 2, 1]))
...     print("Start:", time.strftime("%X"))
...     for task in asyncio.as_completed([task1, task2]):
...         result = await task
...         print(f'result: {result} completed at {time.strftime("%X")}')
...     print("End:", time.strftime("%X"))
...     print(f"Both tasks done: {all((task1.done(), task2.done()))}")
...

>>> asyncio.run(main())
Start: 14:36:36
result: [1, 2, 3] completed at 14:36:37
result: [2, 5, 10] completed at 14:36:38
End: 14:36:38
Both tasks done: True
```

在这个示例中，`main()` 使用了 `asyncio.as_completed()`，它按任务完成的先后顺序产出任务，而不是按启动顺序。程序在事件循环中等待这些任务时，**每个任务一完成就能立刻被获取**

因此，更快的任务 (`task2`) 会先完成并更早打印结果，而耗时更长的任务 (`task1`) 随后才完成并打印。`asyncio.as_completed()` 适用于需要对每个任务及时响应的场景，它能显著提升并发工作流的响应能力

### 异步异常处理

从 [Python 3.11](https://realpython.com/python311-new-features/) 开始，可以用 [ExceptionGroup](https://realpython.com/python311-exception-groups/) 类来处理可能同时发生的多个无关异常。当运行多个可能引发不同异常的协程时，此功能尤为有用。除此之外，新增的 `except*` 语法可以优雅的处理多异常：


```python title=" Python 3.11+" showLineNumbers
>>> import asyncio

>>> async def coro_a():
...     await asyncio.sleep(1)
...     raise ValueError("Error in coro A")
...

>>> async def coro_b():
...     await asyncio.sleep(2)
...     raise TypeError("Error in coro B")
...

>>> async def coro_c():
...     await asyncio.sleep(0.5)
...     raise IndexError("Error in coro C")
...

>>> async def main():
...     results = await asyncio.gather(
...         coro_a(),
...         coro_b(),
...         coro_c(),
...         return_exceptions=True
...     )
...     exceptions = [e for e in results if isinstance(e, Exception)]
...     if exceptions:
...         raise ExceptionGroup("Errors", exceptions)
...
```

在上面的示例中，三个协程分别抛出了三种不同的[异常](https://realpython.com/python-built-in-exceptions/)(这要是真同时出现也太抽象了)。在主协程 `main()` 中用 `asyncio.gather()` 来等待这三个协程。同时需要将 `return_exceptions` 参数设置为`True`，才能捕获异常(而不是直接寄掉)

接下来用列表推导式来把这些异常存起来，若该列表至少包含一个异常，则创建一个 `ExceptionGroup`

然后像下面这样处理异常:

```python title="python 3.11+" showLineNumbers
>>> try:
...     asyncio.run(main())
... except* ValueError as ve_group:
...     print(f"[ValueError handled] {ve_group.exceptions}")
... except* TypeError as te_group:
...     print(f"[TypeError handled] {te_group.exceptions}")
... except* IndexError as ie_group:
...     print(f"[IndexError handled] {ie_group.exceptions}")
...
[ValueError handled] (ValueError('Error in coro A'),)
[TypeError handled] (TypeError('Error in coro B'),)
[IndexError handled] (IndexError('Error in coro C'),)
```

上面的代码中把 `asyncio.run()` 的调用包裹在 [`try`](https://realpython.com/ref/keywords/try/) 代码块中。然后用之前提到的 `except*` 语法分别捕获预期的异常

## Async I/O 的定位与边界

上文已经介绍了不少异步的代码，现在我们回头想一想：什么时候用异步 I/O 是最理想的，以及如何评估它是否真正适用，或者是否存在更合适的并发模型

### 什么时候用 Async I/O

如果在  `async def` 中执行阻塞操作，它仍会阻塞事件循环，抵消异步 I/O 的优势，降低程序的效率。相比之下，异步 I/O 还是更适合[非阻塞操作](https://realpython.com/ref/glossary/non-blocking-operation/)

异步 I/O 和**多进程**并不是非此即彼，需要时可以把这两种模型[配合使用](https://youtu.be/0kXaLh8Fz3k?t=10m30s)。实际应用中，多进程更适合 CPU 密集型的任务

异步 I/O 和**多线程**之间的取舍则更为直接。线程并不简单，即使在看起来容易实现的场景中，也可能因为[竞态条件](https://realpython.com/python-thread-lock/#race-conditions)、内存使用等原因导致难以追踪的错误

线程的扩展性往往不如异步 I/O。因为线程属于受限的系统资源，创建成千上万个线程在许多机器上会出问题，或显著拖慢代码。相反，创建成千上万的异步 I/O 任务则完全可行

当有多个 I/O 密集型任务，而这些任务的时间主要消耗在阻塞等待上时，异步 I/O 尤其适用，例如：

- **网络 I/O**: 服务端和客户端
- **无服务器架构 (Serverless)**: 类似群聊的 p2p 用户网络
- **读/写操作**: 采用[即发即忘 (fire-and-forget)](https://en.wikipedia.org/wiki/Fire-and-forget)的方式，而不必担心占用资源锁

使用异步 I/O 的阻力在于，`await` 只支持实现特定方法集合的对象。比如，如果你想对某个[数据库管理系统 (DBMS)](https://en.wikipedia.org/wiki/Database#Database_management_system) 执行异步读操作，就需要找到一个支持 `async/await` 语法的该 DBMS 的 Python 封装

### 支持 Async I/O 的库

Python 有很多高质量的第三方库支持 `asyncio`，或者就是完全基于 `asyncio` 的。覆盖 Web 服务器、数据库、网络、测试等领域。这里列出一些常用的

- Web 服务器
  - [FastAPI](https://fastapi.tiangolo.com/): 构建 [web APIs](https://realpython.com/python-api/) 的现代异步网络框架
  - [Starlette](https://www.starlette.io/): 轻量级[异步服务器网关接口 (ASGI)](https://en.wikipedia.org/wiki/Asynchronous_Server_Gateway_Interface) 框架，用来构建 高性能的异步 Web 应用
  - [Sanic](https://sanic.dev/): 基于 `asyncio` 构建的高速异步 Web 框架
  - [Quart](https://github.com/pallets/quart): 和 [Flask](https://realpython.com/flask-project/) 有相同 API 的异步 Web 微框架
  - [Tornado](https://github.com/tornadoweb/tornado): 高性能 Web 框架及异步网络库
- ASGI 服务器
  - [uvicorn](https://www.uvicorn.org/): 高速 ASGI Web 服务器
  - [Hypercorn](https://pypi.org/project/Hypercorn/): 支持多种协议和配置选项的 ASGI 服务器
- 网络工具
  - [aiohttp](https://docs.aiohttp.org/): 基于 `asyncio` 的 HTTP 客户端和服务器实现
  - [HTTPX](https://www.python-httpx.org/): 完全支持异步和同步的 HTTP 客户端
  - [websockets](https://websockets.readthedocs.io/): 用 `asyncio` 构建 WebSocket 服务器和客户端
  - [aiosmtplib](https://aiosmtplib.readthedocs.io/): 用于[发送电子邮件](https://realpython.com/python-send-email/)的异步 SMTP 客户端
- 数据库工具
  - [Databases](https://www.encode.io/databases/): 支持异步操作的数据库框架，兼容 [SQLAlchemy](https://realpython.com/python-sqlite-sqlalchemy/) core
  - [Tortoise ORM](https://tortoise.github.io/): 轻量级异步对象关系映射器 (ORM)
  - [Gino](https://python-gino.org/): 基于 SQLAlchemy core 的异步 ORM，适用于 [PostgreSQL](https://realpython.com/python-sql-libraries/#postgresql)
  - [Motor](https://motor.readthedocs.io/): 基于 `asyncio` 构建的异步 [MongoDB](https://realpython.com/introduction-to-mongodb-and-python/) 驱动
- 其他库
  - [aiofiles](https://aiofiles.readthedocs.io/): 将 Python 的文件 API 封装为可与 `async` 和 `await` 一起使用的异步版本
  - [aiocache](https://aiocache.readthedocs.io/): 支持 [Redis](https://realpython.com/python-redis/) 和 Memcached 的异步缓存库
  - [APScheduler](https://apscheduler.readthedocs.io/): 支持异步任务的任务调度器
  - [pytest-asyncio](https://pytest-asyncio.readthedocs.io/): 为 [pytest](https://realpython.com/pytest-python-testing/) 添加对异步函数测试的支持

以上库和框架有助于构建高性能的 Python 异步应用。无论是搭建 Web 服务器、通过网络获取数据，还是访问数据库，此类基于 `asyncio` 的工具都能以极低的额外开销并发处理大量任务

## 结论

本篇介绍了 Python 的 `asyncio` 库，`async`, `await` 语法，以及如何使用异步编程在单个线程中提高多个 I/O 密集型任务的效率

在这个过程中，介绍了并发、并行、多线程、多进程、异步 I/O 以及他们的区别与联系。还介绍了使用协程、事件循环、链式与队列式并发的示例。在此基础上，还学习了 `asyncio` 的高级技巧，例如：异步上下文管理器、异步迭代器、列表推导式，以及一些第三方库的用法

掌握 `asyncio` 对于搭建可拓展的网络服务、以及需要并发处理大量 I/O 密集型任务的程序都至关重要

**在本教程中，介绍了**

- **区别**多种并发模型，并判断何时使用 `asyncio` 处理 I/O 密集型任务
- 使用 `async def` 和 `await` **编写**、**运行**和**串联协程**
- **管理事件循环**，通过 `asyncio.run()`, `gather()` 和 `create_task()` 调度多任务
- 实现异步模式：运用**串联协程**和**异步队列**构建生产者-消费者工作流
- **运用高级异步特性**(如 `async for`, `async with`)，并集成**第三方异步库**

具备这些技能后，即可构建能够异步处理大量操作的高性能现代 Python 应用

:::tip
[点击这里](./demo/materials-python-asyncio.zip)下载本篇中用到的代码
:::

## FAQ

下面这些常见问题涵盖了本教程中最重要的概念，读者可以通过这些 QA 来巩固一下上面学到的内容

<details>
<summary>Python `asyncio` 是什么，以及为什么要用它?</summary>

使用 `asyncio` 的 async/await 关键字构建出来的并发程序可以在单线程中高效并发地管理多个 I/O 密集型任务，而不阻塞程序
</details>

<details>
<summary>对于 I/O 密集型任务，`asyncio` 一定比多进程更优吗?</summary>

对于 I/O 密集型任务，`asyncio` 通常能提供更优的性能。它规避了线程带来的开销和复杂性，使得数千个任务能够并行运行，不受 Python 全局解释器锁 (GIL)的限制
</details>

<details>
<summary>在 Python 程序中，什么情况下应该使用 `asyncio`?</summary>

当你的程序花费大量时间等待 I/O 密集型操作(比如网络请求，或者文件访问)时，并且希望高效且并发执行大量此类任务时，比较适合用 `asyncio`
</details>

<details>
<summary>如何用 `asyncio` 定义和运行协程?</summary>

可以使用 `async def` 语法定义协程。可以把协程传给 `asyncio.run()` 来运行它，或者通过 `asyncio.create_task()` 将其作为一个任务来调度
</details>

<details>
<summary>`asyncio` 中的事件循环有什么作用?</summary>

程序依赖事件循环来管理协程的调度与执行。每当协程执行到 `await` 或其 I/O 操作完成时，事件循环都会为相应协程安排运行机会
</details>

## 附录

### 术语表

| 术语            | 英文                   | 术语         | 英文                          |
| --------------- | ---------------------- | ------------ | ----------------------------- |
| 并发            | Concurrency/Concurrent | 并行         | Parallelism                   |
| 协程            | Coroutine              | 事件循环     | Event Loop                    |
| 线程            | Thread                 | 进程         | Process                       |
| 多线程          | Multithreading         | 多进程       | Multiprocessing               |
| 同步            | Synchronous            | 异步         | Asynchronous(async)           |
| I/O 密集型      | I/O-bound              | CPU 密集型   | CPU-bound                     |
| 协程链/串联协程 | Coroutine Chain        | 全局解释器锁 | Global Interpreter Lock (GIL) |

REPL: Read-Eval-Print-Loop 可译为`交互式解释器`