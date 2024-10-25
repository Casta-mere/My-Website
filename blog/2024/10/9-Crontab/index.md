---
slug: Crontab
title: Linux 定时任务 (Crontab)
authors: [Castamere]
tags: [Linux, Crontab]
references:
  - author: StandByMe.
    title: Linux中Crontab（定时任务）命令详解及使用教程
    time: 2022
    url: https://blog.csdn.net/qq_51514930/article/details/124269555
---

<!-- truncate -->

## 缘起

最近一个任务是，设备上会记录日志到 `server.log`，日积月累这文件大的一，现在给他每晚 0 点，重命名为一个新的文件，也就是把每天的日志放到一个单独的文件里

## Crontab

Crontab 是一个定时任务工具，用于在指定的时间执行指定的命令或脚本。Crontab 文件中包含了一系列的定时任务，每个任务由时间、命令或脚本的路径组成。

## Crontab 命令

- `crontab -e` 命令可以编辑当前用户的 Crontab 文件
- `crontab -l` 命令可以查看当前用户的 Crontab 文件
- `crontab -r` 命令可以删除当前用户的 Crontab 文件

## Crontab 语法

```bash
* * * * * command
- - - - -
| | | | |
| | | | +----- 星期 (0 - 7) (Sunday=0 or 7)
| | | +------- 月份 (1 - 12)
| | +--------- 日期 (1 - 31)
| +----------- 小时 (0 - 23)
+------------- 分钟 (0 - 59)
```

command 前的五个值，每个都可以是以下的一种

- 一个具体的值，例如 `0`、`1`、`2` 等
- 一个 `*` 号，表示任意值
- 一个逗号分隔的多个值，例如 `1,2,3`
- 一个连字符分隔的值范围，例如 `1-5`
- 一个斜杠分隔的值和步长，例如 `*/2`

## Crontab Macro

Crontab 提供了一些预定义的时间表达式，可以简化定时任务的编写

```bash
@yearly: 0 0 1 1 *

@monthly: 0 0 1 * *

@weekly: 0 0 * * 0

@daily: 0 0 * * *

@hourly: 0 * * * *

@reboot: 重启时
```

## Crontab 示例

```bash
# 每天凌晨 1 点执行 /home/user/script.sh 脚本
0 1 * * * /home/user/script.sh

# 每小时执行一次 /home/user/backup.sh 脚本
0 * * * * /home/user/backup.sh

# 每五分钟执行一次 /home/user/check.sh 脚本
*/5 * * * * /home/user/check.sh

# 每天午夜执行脚本
@daily /path/to/script.sh

# 每周日执行备份脚本
@weekly /path/to/backup.sh

# 系统重启后执行初始化脚本
@reboot /path/to/init.sh
```

## 每天 0 点重命名日志

```bash title="renamelog.sh"
date | awk '{print "mv /var/log/server.log /var/log/server-"$6"-"$2"-"$3".log"}' | bash
date | awk '{print "mv /var/log/agent.log /var/log/agent-"$6"-"$2"-"$3".log"}' | bash
```

```bash title="crontab"
0 0 * * * ~/renamelog.s
```
