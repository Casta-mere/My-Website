---
slug: UnicodeEncodeError
title: 解决 Python 2.x 下 UnicodeEncodeError
authors: [Castamere]
tags: [Python, BugFix]
---

:::danger 报错
UnicodeEncodeError: 'ascii' codec can't encode characters in position 0-1: ordinal not in range
:::

<!-- truncate -->

在 py 文件最上面添加：

```python
import sys
reload(sys)
sys.setdefaultencoding('utf8')
```
