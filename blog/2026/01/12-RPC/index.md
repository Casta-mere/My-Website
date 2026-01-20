---
slug: RPC
title:  Remote Procedure Call
authors: [Castamere]
tags: [Computer Networks, Distributed Systems, Middleware]
references:
  - author: 科控物联
    title: RPC框架：从原理到选型，一文带你搞懂RPC
    time: 2022
    url: https://cloud.tencent.com/developer/article/2021745
  - author: wikipedia
    title: 远程过程调用
    time: 2025
    url: https://zh.wikipedia.org/zh-cn/远程过程调用
---

import TabItem from "@theme/TabItem";
import Tabs from "@theme/Tabs";
import Terminal from "./components/Terminal";

# Remote Procedure Call

远程过程调用, 可以理解为让调用远端服务"像调用本地函数一样"

本篇介绍以下内容：

<!-- truncate -->

## 简介

> 分布式计算中，远程过程调用(Remote Procedure Call，RPC)是一个计算机通信协议。该协议允许运行于一台计算机的程序调用另一个地址空间(通常为一个开放网络的一台计算机)的子程序，而程序员就像调用本地程序一样，无需额外地为这个交互作用编程(无需关注细节)

这里给出一个 python 的例子

<Tabs>

<TabItem value="client" label="client">

```python title="client.py" showLineNumbers
import zmq
from tinyrpc.protocols.jsonrpc import JSONRPCProtocol
from tinyrpc.transports.zmq import ZmqClientTransport
from tinyrpc.client import RPCClient

ctx = zmq.Context()
socket = ctx.socket(zmq.REQ)
socket.connect('tcp://127.0.0.1:5001')

transport = ZmqClientTransport(socket)
rpc_client = RPCClient(
    JSONRPCProtocol(),
    transport
)

remote_server = rpc_client.get_proxy()

data = [5, 2, 9, 1, 5, 6]
print(f"Original list: {data}")
result = remote_server.sort_list(data)
print(f"Sorted list: {result}")
```

</TabItem>

<TabItem value="server" label="server">

```python title="server.py" showLineNumbers
import zmq
from tinyrpc.protocols.jsonrpc import JSONRPCProtocol
from tinyrpc.transports.zmq import ZmqServerTransport
from tinyrpc.server import RPCServer
from tinyrpc.dispatch import RPCDispatcher

dispatcher = RPCDispatcher()

@dispatcher.public
def sort_list(l):
    return sorted(l)

ctx = zmq.Context()
socket = ctx.socket(zmq.REP)
socket.bind('tcp://127.0.0.1:5001')

transport = ZmqServerTransport(socket)
rpc_server = RPCServer(
    transport,
    JSONRPCProtocol(),
    dispatcher
)

print("Server is listening on tcp://127.0.0.1:5001...")
rpc_server.serve_forever()
```

</TabItem>

</Tabs>

运行结果如下：

<Terminal />

可以看到，在 client 端，调用远程函数时，无需任何的声明，也无需关注网络通信的细节，就像调用本地函数一样。样例中都是在本地运行的，但实际上 server 可以部署在任何地方，只要 client 能够访问到即可

## RPC vs REST

看完上面的样例，笔者的第一反应是：这个似乎用 REST API 也能实现

REST API (通常基于 HTTP + JSON) 完全可以实现相同的功能。实际上，现代很多 RPC 框架底层也是基于 HTTP 的(例如 gRPC 基于 HTTP/2)。但它们在设计理念和使用场景上有显著区别

### 核心区别

#### REST *(REpresentational State Transfer)*

**REST** 是**面向资源**的。它将网络上的所有内容视为"资源"(Resource)，通过 URI 标识，使用 HTTP 动词(GET, POST, PUT, DELETE)来操作资源

- 例如：`POST /users` (创建用户), `GET /users/123` (获取用户)
- 关注点：**"What"** (要操作什么资源)

#### RPC *(Remote Procedure Call)*

**RPC** 是**面向动作**的。它关注的是"过程"，直接对应服务端的函数或方法

- 例如：`createUser(User)`, `getUser(id)`
- 关注点：**"How"** (要执行什么操作)

### 详细对比

|                | RPC                                              | REST                                     |
| :------------- | :----------------------------------------------- | :--------------------------------------- |
| **核心思想**   | 远程函数调用 (Action)                            | 资源状态转移 (Resource)                  |
| **传输协议**   | TCP, UDP, HTTP/2, QUIC 等                        | 主要是 HTTP/1.1 或 HTTP/2                |
| **数据格式**   | 二进制 (Protobuf, Thrift)，更小更紧凑            | 文本 (JSON, XML)，可读性好但体积大       |
| **耦合性**     | 强耦合 (通常依赖 IDL 生成桩代码)                 | 松散耦合 (依赖约定/文档)                 |
| **性能**       | 高 (序列化快，包体小，头部压缩)                  | 一般。HTTP 报头臃肿，JSON 解析慢         |
| **接口定义**   | 强类型，需要 IDL (接口定义语言) 文件 (如 .proto) | 弱类型，通过文档 (Swagger/OpenAPI) 描述  |
| **浏览器支持** | 较弱                                             | 极佳                                     |
| **开发体验**   | 像调本地函数，有代码提示和类型检查               | 像发请求，需手动处理路径、参数和响应解析 |
| **调试难度**   | 较难。二进制数据不可读，需要特定工具             | 容易。可以直接在浏览器或 Postman 中查看  |

### 适用场景

#### RPC

- **内部微服务通信**：对性能要求高，调用频繁，需要强类型约束和高效传输
- **多语言后端交互**：通过 IDL 自动生成不同语言的代码，抹平语言差异
- **长连接/流式传输**：如 gRPC 的双向流

#### REST

- **对外 API (Public API)**：面向第三方开发者或浏览器前端，REST 的通用性和生态支持更好
- **资源密集型服务**：简单的 CRUD 操作，REST 的语义非常直观
- **需要极高灵活性**：服务端修改不希望强制客户端更新 SDK

## 应用

## 后记