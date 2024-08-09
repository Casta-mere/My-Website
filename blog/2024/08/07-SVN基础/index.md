---
slug: SVNBasic
title: SVN 基础
authors: [Castamere]
tag: [SVN, Version Control]
---

**Apache Subversion** 通常被缩写成 SVN，是一个开放源代码的**集中式版本控制系统**(Centralized Version Control System (CVCS))，本篇主要介绍 SVN 的基础功能与指令

<!--truncate-->

## SVN

> _Subversion(SVN)_ 是一个开源的版本控制系統, 也就是说 Subversion 管理着随时间改变的数据。 这些数据放置在一个中央资料档案库(repository) 中。 这个档案库很像一个普通的文件服务器, 不过它会记住每一次文件的变动。 这样你就可以把档案恢复到旧的版本, 或是浏览文件的变动历史。

### SVN vs GIT

可以对 SVN 和 GIT 的部分命令进行一个类比：

|                 | SVN                | GIT                |
| --------------- | ------------------ | ------------------ |
|                 | 集中式版本控制系统 | 分布式版本控制系统 |
| 创建 repository | create             | init               |
| 拉取库到本地    | checkout           | clone              |
| 提交更改        | commit             | commit & push      |
| 同步代码库      | update             | pull               |
| 删除文件        | delete             | rm                 |
| 创建分支        | copy               | branch             |
| 切换分支        | switch             | checkout           |
| 回滚代码        | revert             | reset              |

## SVN 生命周期

1. 创建 repository (create)
2. 拉取代码到本地 (checkout)
3. 更新/还原库 (update)
4. 执行变更 (add, delete, mkdir)
5. 复查变化 (status)
6. 修复错误 (revert)
7. 解决冲突 (diff)
8. 提交更改 (commit)

### 创建 repository (create)

对每个库来说，大多数情况下这个操作只会执行一次

```bash
svnadmin create /path/to/repository
```

### 拉取代码到本地 (checkout)

对程序员来说，当开始接触该项目时，先要从服务器上把现有代码拉取下来，其命令格式如下：

```bash
svn checkout URL [PATH] # 可简写为 svn co
# URL: 版本库的路径
# PATH: 本地副本存放的路径(可选)，不指定则拉取到当前目录

eg:
svn checkout http://svn.example.com/repo /path/to/local/repository
```

### 更新/还原库 (update)

当你有一段时间没有动过这个库，要重新开始修改时，最好先把本机的代码和服务器的同步一下，使用 `svn update` 即可将本地代码更新到最新版本 (**前提是本地没有之前未提交的代码**)。除此之外，如果需要回退版本，也可以使用该命令，具体各格式如下：

```bash
svn update # 更新到最新版本，可简写为 svn up
svn update -r [版本号] # 更新到指定版本
svn update [PATH] # 更新指定路径的文件

eg:
svn update # 将当前目录及其子目录更新到最新版本
svn update -r 10 # 将当前目录及其子目录更新或还原到版本10
svn update -r 10 readme.md # 将 readme.md 更新或还原到版本10
```

### 执行变更 (add, delete, mkdir)

万事俱备之后，可以开始自己的修改，包括增删改等操作。和 git 一样，在添加新文件(_`touch`_)/文件夹(_`mkdir`_)之后，都要执行 `svn add` 将文件以及目录的名称添加给版本控制系统。删除文件时应该使用 `svn delete` 命令，而不是直接使用 `rm` 进行删除

```bash
svn add file
svn delete file # 可简写为 svn del
svn mkdir dir # 相当于 mkdir dir && svn add dir
```

### 复查变化 (status)

当你对工作副本进行一些修改之后，你的工作副本会比版本库要新。在 commit 操作之前复查下你的修改是一个很好的习惯。Status 操作列出了工作副本中所进行的变动。正如我们之前提到的，你对工作副本的任何改动都会成为待变更列表的一部分。Status 操作就是用来查看这个待变更列表。其命令格式如下：

```bash
svn status [PATH] # 可简写为 svn sts

svn st | grep ^状态 # 获得某状态文件列表
svn st | grep -v ^状态 # 也作 svn st | grep ^[^状态], 过滤掉某状态得到其他状态文件列表

eg：
svn st | grep ^M    # 获取 "M" 状态文件列表
svn st | grep -v ^? # 过滤掉 "?" 状态的文件列表
```

常见状态如下:

| 状态 | 含义                                    |
| ---- | --------------------------------------- |
| A    | 预定加入到版本库                        |
| M    | 已修改                                  |
| C    | 冲突                                    |
| D    | 已删除                                  |
| ?    | 未纳入版本控制                          |
| !    | 该项目已遗失(被非 svn 命令删除)或不完整 |
| ~    | 版本控制下的项目与其它类型的项目重名    |

:::info
"!" 状态说明
出现原因：使用非 svn 命令（rm 等）删除了此条目。
解决方法：使用 `svn update`，将被删除的条目更新出来。
正确操作方法：使用 `svn delete` 删除纳入版本控制的条目
:::

:::info
"~" 状态说明
出现原因：删除了一个版本库的文件，新建了一个在原来的位置，新建文件类型与原有文件不一致，而且整个过程中没有使用 `svn delete` 或是 `svn add`。
解决方法： 将 "~" 文件 `svn revert` 掉，按照正确操作重新修改。
:::

### 修复错误 (revert)

当对工作副本做了许多修改之后，但是现在不想要这些修改了，这时候可以进行 revert 操作。Revert 操作重置了对工作副本的修改。它可以重置一个或多个文件/目录。当然它也可以重置整个工作副本。在这种情况下，revert 操作将会**销毁待变更列表**并将工作副本恢复到原始状态。其命令格式如下:

```bash
svn revert [-R] PATH # -R 向下递归删除

eg:
svn revert readme.md   # 发现误改了某个文件，可执行此命令将改动撤销掉
svn revert -R scripts  # 撤销对 scripts 目录中文件所做的所有改动
```

### 解决冲突 (diff)

在最终提交前，我们如果发现系统库有了新的修改，那我们需要与其先进行同步。先使用 `svn diff` 查看本地有哪些修改，再使用 `svn update` 更新到最版本，如果在过程中有文件冲突，需要手动解决冲突，最后再进行提交。`svn diff` 有以下的三种功能

- 检查本地修改
- 比较工作拷贝与版本库
- 比较版本库与版本库

其命令格式如下：

```bash
svn diff [-r m:n] [PATH] # 可简写为 svn di

eg:
svn diff            # 显示当前目录及其子目录下的所有修改差异
svn diff -r 3       # 对当前修改和版本 3 比较差异
svn diff -r 3:5     # 对版本 3 和版本 5 比较差异
svn diff readme.md  # 查看 readme.md 文件的修改差异
svn diff > bug.diff # diff 内容可以导出到文件
```

:::note
`svn status`、`svn diff` 和 `svn revert` 这三条命令在没有网络的情况下也可以执行的，原因是 `svn` 在本地的 `.svn` 文件中保留了本地版本的原始拷贝
:::

### 提交更改 (commit)

和 git 类似，当本地内容修改到一定量，并且解决好冲突之后，使用 `commit` 进行提交

```bash
svn commit -m "commit message" [PATH] # 可简写为 svn ci
# PATH 可以是文件或目录，不指定 PATH 则默认为当前目录
```

:::important
单个问题应当一次性修改合入，避免一个问题合入多次导致中间版本出现编译或功能问题
:::

## 其他指令

### 创建分支 (copy, merge)

在 svn 中的分支，其实就是把某个文件夹复制了一份出来，在这个新的分支文件夹下进行修改，等修改完成之后(可能会经过多次提交)，再合并回主分支

```bash
# 创建分支
svn copy trunk/ branches/my_branch
cd branches/my_branch

# 进行修改
svn commit -m "commit message"

# 合并回主分支
cd trunk
svn merge ../branches/my_branch/
```

### 标签 (tag)

标签是版本库中某个特定点的一个快照，它常常被用来做发布版本。标签是只读的，不能对它进行修改或删除。可以看出来 tag 本质上就是一个 branch (命令也相同为 `copy` )，只不过人为为它赋予了意义，以及一个只读的属性创建标签的命令如下。

```bash
svn copy trunk/ tags/v1.0
```

### 查看历史信息 (log, cat, info, list)

#### svn log

用来展示 svn 的版本作者、日期、路径等日志信息

```bash
svn log [OPTIONS] [PATH]
# OPTIONS
-r m:n  # 查看版本 m 到版本 n 的日志
-l N    # 显示最近的 N 条日志
-v      # 显示文件目录

eg:
svn log -r 3:4 -l 5 -v readme.md # 查看版本 3 到版本 4 的最后 5 条日志，并显示文件目录
```

#### svn cat

用来查看某文件某版本的内容

```bash
svn cat -r m readme.md # 查看版本 m 的 readme.md 文件内容
```

#### svn info

用来查看某个文件或目录的详细信息，包括路径，最后修改时间，最后修改者，最后修改版本等

```bash
svn info [PATH]
```

#### svn list

`svn list` 可以在不下载文件到本地目录的情况下来查看目录中的文件
