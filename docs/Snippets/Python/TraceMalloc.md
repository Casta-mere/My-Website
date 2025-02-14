---
tags: [Python]
title: 统计内存占用
keywords:
  - Python
  - Snippet
---

# 统计内存占用

```python showLineNumbers title="memory"
from functools import wraps
import tracemalloc

def memory(func):
    '''
    Decorator that reports the memory usage.
    '''
    size_name = ("B", "KB", "MB", "GB", "TB", "PB")

    def convert(size_bytes):
        i = int(size_bytes.bit_length() / 10)
        return size_bytes / 1024**i, size_name[i]

    @wraps(func)
    def wrapper(*args, **kwargs):
        tracemalloc.start()
        result = func(*args, **kwargs)
        current, peak = tracemalloc.get_traced_memory()
        current, currentUnit, peak, peakUnit = *convert(current), *convert(peak)
        print(f"FUNCTION: {func.__name__}\ncurrent memory: {current:.2f} {currentUnit}\npeak memory {peak:.2f} {peakUnit}")
        tracemalloc.stop()
        return result

    return wrapper
```
