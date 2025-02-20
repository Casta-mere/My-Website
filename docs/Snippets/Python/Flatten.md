---
tags: [Python]
title: 展开嵌套列表
keywords:
  - Python
  - Snippet
---

# 展开嵌套列表

展开多层嵌套的列表

形如 `["123", 4, 5, [6, 7, [8, "90"], 1], 2]` 的列表进行展开

```python showLineNumbers title="flatten"
from collections import Iterable
from collections.abc import Iterable # Python 3.3+
from typing import Any, Generator

def flatten(items: Iterable[Any], ignore_types = (str, bytes)) -> Generator[Any, None, None]:
    """
    Flatten the nested List, ignoring certain types.
    """
    for item in items:
        if (isinstance(item, ignore_types)):
            yield item
        elif isinstance(item, str):
            yield from item
        elif isinstance(item, Iterable):
            yield from flatten(item, ignore_types)
        else:
            yield item
```

## 样例

```python showLineNumbers title="e.g."
test = ["123", 4, 5, [6, 7, [8, "90"], 1], 2]

print([i for i in flatten(test)])
# ['123', 1, 2, 3, 4, 5, '69', 7, 8]
print([i for i in flatten(test, bytes)])
# ['1', '2', '3', 1, 2, 3, 4, 5, '6', '9', 7, 8]
```
