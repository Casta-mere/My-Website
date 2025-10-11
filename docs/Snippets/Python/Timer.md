---
tags: [Python]
title: 计时器
keywords:
  - Python
  - Snippet
---

# 计时器

用于计算函数运行时间的装饰器

```python showLineNumbers title="timer"
from functools import wraps
from time import perf_counter

def timer(func):
    '''
    Decorator that reports the execution time.
    '''

    @wraps(func)
    def wrapper(*args, **kwargs):
        start = perf_counter()
        result = func(*args, **kwargs)
        end = perf_counter()
        print(f"FUNCTION: {func.__name__}\ncost time: {end-start:.4f} seconds")
        return result

    return wrapper
```
