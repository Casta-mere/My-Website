---
tags: [Python]
title: 展开嵌套列表
keywords:
  - Python
  - Snippet
---

# 展开嵌套列表

```python showLineNumbers title="flatten"
from collections import Iterable
from collections.abc import Iterable # Python 3.3+

def flatten(items, ignore_types=(str, bytes)):
    """
    Flatten the nested List
    """
    for x in items:
        if isinstance(x, Iterable) and not isinstance(x, ignore_types):
            yield from flatten(x)
        else:
            yield x
```
