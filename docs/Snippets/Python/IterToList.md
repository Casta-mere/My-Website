---
tags: [Python]
title: 多个迭代器生成序列
keywords:
  - Python
  - Snippet
---

# 多个迭代器生成序列

```python showLineNumbers title="Iters to List"
def ItersToList(ItersArray, function = lambda x: x):
    """
    Generate a List from multiple Iterators
    """
    action = lambda x: [function(j) for j in x]
    return [i for i in map(action, zip(*ItersArray))]

# 还有逆天写法
ItersToList = lambda ItersArray, function = lambda x: x: [i for i in map(lambda x: [function(j) for j in x], zip(*ItersArray))]
```

## 样例

```python showLineNumbers title="e.g."
iters = [iter1, iter2, ...]

# 生成序列
ans = [i for i in zip(*iters)]
# ans = [(iter1[0], iter2[0], ...), (iter1[1], iter2[1], ...), ...]

# 对生成的内层进行操作
fun1 = lambda x: fun(x)
ans = [[fun1(j) for j in i] for i in zip(*iters)]

fun2 = lambda x: [fun(j) for j in x]
ans = [i for i in map(fun2, zip(*iters))]
```

## 矩阵转置

```python showLineNumbers title="matrix transpose"
def MatrixTranspose(matrix):
    """
    Matrix Transpose
    """
    return [i for i in zip(*matrix)]

matrix = [[1, 2, 3], ['a', 'b', 'c']]
print(MatrixTranspose(matrix))
# [(1, 'a'), (2, 'b'), (3, 'c')]
```
