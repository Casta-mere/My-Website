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
import time

def timer(func):
    '''
    Decorator that reports the execution time.
    '''

    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"FUNCTION: {func.__name__}\ncost time: {end-start:.4f} seconds")
        return result

    return wrapper
```
