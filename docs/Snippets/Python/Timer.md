---
tags: [Python]
title: 计时器
keywords:
  - Python
  - Snippet
---

# 计时器

```python showLineNumbers
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
        print(func.__name__, "time:", end-start)
        return result

    return wrapper
```
