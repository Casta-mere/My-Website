---
slug: clickhouseAuditLog
title: ClickHouse：Audit Log 的存储革命
authors: [Castamere]
tags: [ClickHouse, Work, Talk, Distributed Systems]
references:
  - title: ClickHouse for Observability
    author: ClickHouse, Inc.
    time: 2025
    url: https://clickhouse.com/docs/use-cases/observability
  - title: KEEPING SUFFICIENT RECORDS (COMPANIES & CO-OPERATIVES)
    time: 2001
    url: https://phl.hasil.gov.my/pdf/pdfam/PR4_2000_Rev.pdf
  - title: Compression in ClickHouse
    author: ClickHouse, Inc.
    time: 2026
    url: https://clickhouse.com/docs/data-compression/compression-in-clickhouse

recommended: true
draft: true
---

import Terminal from "./components/Terminal";
import Compression from "./components/Compression";

# ClickHouse：Audit Log 的存储革命

一次排班的修改、一次权限的开关，当下不过是系统里再普通不过的一条记录；可几个月后，它可能突然成为所有人都在追问的问题——「三个月前这家店的菜单是谁改的？」。审计日志(audit log)里有答案，但要把它留得住、查得动，背后是一次存储与查询的革命

<!--truncate-->

## 缘起

笔者目前在 FeedMe 负责 hrm-service。FeedMe 是餐饮行业的 operating system——从前台点单到后厨出餐，从排班到结算，整套系统每天要承载约 300 万次操作：订单、支付、菜单变更、员工操作、库存变动、报表生成，最终全都沉淀在这里

hrm-service 管的是其中和「人」有关的那部分：员工、角色、权限、passcode、排班(timesheet)。这里的每一个敏感动作，都要先过一道权限校验——后端用 CASL 定义能力，每个接口挂上 `@Action({ operationLabel })` 装饰器，再由 `ActionGuard` 拦下来判断这个人能不能做这件事。而判断的结果，无论 `allowed`、`denied` 还是 `skipped`，连同是谁(`userId`)、对什么(`subject`)、做了什么(`action`)，都会被原样写进一张审计表。换句话说，审计不是某个角落里的附加功能，它缝在了每一个受保护的接口上

这些记录平时是隐形的，淹没在每天数以万计的校验里，没人会多看一眼。直到某一天，它们中的某一条突然成为会议室里最重要的问题：谁在三个月前改了这家店的权限？那次排班调整是谁批的、改之前是什么？这类问题从不提前打招呼，等它出现时，答案要么在，要么不在

### 最大的挑战不是流量，是时间

300 万次操作听上去不少，但拆到每秒、再配合现代数据库的吞吐，这个量级其实并不可怕。真正改变一切的，从来不是峰值流量。**The challenge is not extreme traffic. The challenge is time.**

马来西亚的相关法规通常要求销售及审计相关的数据保留 7 年。留一个月的数据谁都做得到，但要把每一条操作原封不动地留够七年，并且这七年里的任何一天都能被翻出来追查，是另一个完全不同量级的问题

矛盾就摆在这里：

- 数据太贵，留不住——存储成本随时间线性累积，七年足以让任何「先存着再说」的方案破产，最后只能忍痛丢掉历史
- 数据太冷，查不动——就算咬牙全留下来，传统行式存储面对「三年前某家店的全部权限变更」这类查询时，也慢到没人愿意等
 
失去历史，或失去用处，二选一

## ClickHouse & Audit Log

ClickHouse 恰好是为打破这个二选一而生的。把审计日志的特征摊开来看，会发现它和 ClickHouse 的设计几乎严丝合缝

| 审计日志特点               | ClickHouse 优势                              |
| -------------------------- | -------------------------------------------- |
| 字段重复率高               | 列式存储 + 压缩                              |
| 不可变、仅追加写入         | MergeTree 引擎                               |
| 临时查询为主、难以预建索引 | 原生 OLAP 查询能力/可以对原始数据执行SQL操作 |

### 列式存储 & 压缩

最直接的红利来自列式存储。ClickHouse 把同一列的值连续排布在磁盘上，排序之后，相同的值彼此相邻——而审计日志的字段重复率高得惊人：`subject`、`action`、`outcome`、`country` 这些字段，在几百万行里翻来覆去也就那么几十个取值。这种连续的重复模式，正是压缩算法最爱啃的骨头。ClickHouse 官方 docs 里跑过一份 Stack Overflow `posts` 表的基准：低基数列的压缩比能冲到 27 倍(`PostTypeId`)、甚至上千倍(`FavoriteCount` 高达 1853 倍)。审计日志的形状比那还要规整，压缩空间只多不少

<Compression />

在此之上还有两层杠杆。一是 `LowCardinality(String)`：对取值有限的列做字典编码，把字符串变成一张小字典加一串整数，再叠 `ZSTD`，效果立竿见影。二是 `Delta` 编码：时间戳这种单调递增的序列，存相邻差值比存绝对值划算得多，官方的建议很直白——「`ZSTD` all the way」，时间戳再加一层 `Delta`

### MergeTree

写入模式也契合。审计日志本质上是 immutable 的——一条记录一旦落库就**不该**再改，只会不断追加。这正是 `MergeTree` 引擎最擅长的 append-only 场景：高速顺序写入，后台异步合并 part

### OLAP

最后是 OLAP 查询能力：审计里最棘手的就是那些临时调查(ad hoc investigation)，没人能提前预测会被问到什么，自然也无从预建索引。ClickHouse 让这类问题直接用 SQL 在原始数据上跑，而不必为每一种可能的提问预先铺好路
