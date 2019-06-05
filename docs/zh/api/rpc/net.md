# Net

:::tip 维护者
[jerry-vite](https://github.com/jerry-vite)
:::

**支持调用方式：**

| JSON-RPC 2.0 | HTTP | IPC | Publish–subscribe | Websocket |
|:------------:|:-----------:|:-----:|:-----:|:-----:|
| &#x2713; | `false` | &#x2713; | waiting |`false`|

## net_syncInfo
查看节点同步状态

- **Parameters**: `none`

- **Returns**: `SyncInfo` 结构如下

| 名称 | json类型 | 实际类型 | 说明 |
|:------------:|:-----------:|:-----:|:-----:|
| from | string | uint64 | 同步的起始高度 |
| to | string | uint64| 同步的目标高度 |
| current | string | uint64 | 当前快照链的高度 |
| state | uint | uint | 同步状态：0 未开始同步，1 同步中，2 同步完成 <br> 3 同步出错，4 同步取消，5 同步数据已全部下载 |
| status | string | string | 同步状态的描述 |

- **Example**:

::: demo

```json tab:Request
{
	"jsonrpc": "2.0",
	"id": 2,
	"method": "net_syncInfo",
	"params": null
}
```

```json tab:Response
{
	"jsonrpc": "2.0",
	"id": 2,
	"result": {
    "from": "0",
    "to": "30000",
    "current": "0",
    "state": 1,
    "status": "Synchronising"
  }
}
```
```json test
{
	"jsonrpc": "2.0",
	"id": 2,
	"method": "net_syncInfo",
	"params": null
}
```
:::


## net_syncDetail
查看同步详情

- **Parameters**: `none`

- **Returns**: `SyncDetail`

| Name | JSON type | Actual type | Desc |
|:------------:|:-----------:|:-----:|:-----:|
| from | string | uint64 | 同步的起始高度 |
| to | string | uint64| 同步的目标高度 |
| current | string | uint64 | 当前快照链的高度 |
| status | string | string | 同步状态的描述 |
| tasks | array | []string | 同步任务队列 |
| Connections | array | []SyncConnectionStatus | 用于同步账本的连接 |
| Chunks | array | []Chunk | 已经解析的 chunk，包含快照块以及所快照的账户块，会被插入本地账本 |
| Caches | array | []Cache | 已经下载的 chunk，以二进制形式存在本地，会被解析为 chunk，当快照链到达一定高度之后，cache 会被删除 |

- **Example**:

::: demo

```json tab:Request
{
	"jsonrpc": "2.0",
	"id": 2,
	"method": "net_syncDetail",
	"params": null
}
```

```json tab:Response
{
  "jsonrpc": "2.0",
  "id": 4,
  "result": {
    "from": 692001,
    "to": 727000,
    "current": 692084,
    "state": "Synchronising",
    "status": "Synchronising",
      "tasks": [
        "692001-693000 74add6f7f61c33dd741276d97d8ade4456c47485da78752587aef8a209fe7e88-b6af1c6fb3b502268b17928b1d91206e71003f614c134f8865bf6886d88d8e30 done",
        "693001-694000 b6af1c6fb3b502268b17928b1d91206e71003f614c134f8865bf6886d88d8e30-c6cd65717345f017309ee961a6bcda9ba021e0ed5913d8111471ff09fc95590c pending"
      ],
      "connections": [
        {
          "address": "24a160122317e6e4940ef2a91242b07f@118.25.49.80:8484",
          "speed": "0.00 Byte/s",
          "task": "693001-694000 b6af1c6fb3b502268b17928b1d91206e71003f614c134f8865bf6886d88d8e30-c6cd65717345f017309ee961a6bcda9ba021e0ed5913d8111471ff09fc95590c"
        },
        {
          "address": "04508fbe0512c01a48c8a450425547de@118.24.112.185:8484",
          "speed": "0.00 Byte/s",
          "task": "724001-725000 b2a6097b8a619462377cea0412aa26acd75cf14bbe97539447c7773ab733cbb8-bb6bf0775e3d93e8f743be1b43956d6c954e34a8d69d8a28cb34332a9ea64975"
        }
      ],
      "chunks": [
        [
          {
            "height": 692000,
            "hash": "74add6f7f61c33dd741276d97d8ade4456c47485da78752587aef8a209fe7e88"
          },
          {
            "height": 693000,
            "hash": "b6af1c6fb3b502268b17928b1d91206e71003f614c134f8865bf6886d88d8e30"
          }
        ]
      ],
      "caches": [
          {
            "Bound": [
              691001, 693000
            ],
            "Hash": "b6af1c6fb3b502268b17928b1d91206e71003f614c134f8865bf6886d88d8e30",
            "PrevHash": "028e2730c8fad34b53b8d8f5a41881024fa8b87a97a9cfc61f0e0c83984336a0"
          },
          {
            "Bound": [
              694001, 696000
            ],
            "Hash": "e14662c3e9a9751b28822f2640be79cf13bd778c6b3158c8f6ff584fbf89fa24",
            "PrevHash": "c6cd65717345f017309ee961a6bcda9ba021e0ed5913d8111471ff09fc95590c"
          },
          {
            "Bound": [
              698001, 699000
            ],
            "Hash": "4e067e54b9e966b264053c271c7d976065b8a0796d6995b9dda45e11339e0b57",
            "PrevHash": "26a6bdcfd3d9f58951eb76ebd4784160e98098564cc31e236618f045cb90f365"
          }
      ]
    }
}
```
```json test
{
	"jsonrpc": "2.0",
	"id": 2,
	"method": "net_syncDetail",
	"params": null
}
```
:::


## net_nodeInfo
查看当前节点的信息

- **Parameters**: `none`

- **Returns**: `NodeInfo`

| Name | JSON type | Actual type | Desc |
|:------------:|:-----------:|:-----:|:-----:|
| id | string | string | 本节点的 NodeID |
| name | string | string | 本节点的名称，通过 node_config.json 中的 Identity 字段设置 |
| netId | int | int | 本节点的网络 Id |
| version | int | int | 本节点的版本号，并非 release 版本 |
| address | string | string | 本节点监听的地址 |
| peerCount | int | int | 本节点所连接的 peer 数量 |
| peers | \[\]*PeerInfo | \[\]*PeerInfo | 连接的 peers 信息 |

`PeerInfo` 

| Name | JSON type | Actual type | Desc |
|:------------:|:-----------:|:-----:|:-----:|
| id | string | string | 节点 Id |
| name | string | string | 节点名称 |
| version | int | int | 节点版本号 |
| height | int | int | 节点的快照链高度 |
| level | int | int | 节点连接的标识 |
| address | string | string | 节点的地址 |
| createAt | string | string | 节点的接入时间 |

- **Example**: 

::: demo
```json tab:Request
{
	"jsonrpc": "2.0",
	"id": 3,
	"method": "net_nodeInfo",
	"params": null
}
```

```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 4,
    "result": {
        "id": "f8679730ae271e32f0e16cdea4cb2215f12a1783c81094fad5072bb52f4800f7",
        "name": "vite-sbp-0",
        "netId": 1,
        "version": 0,
        "address": "0.0.0.0:8483",
        "peerCount": 2,
        "peers": [
{
                "id": "8842e527f9af5d1c7a690757e10362b99b9d644840599011f627b67ef95ec3d2",
                "name": "vite-sbp-1",
                "version": 0,
                "height": 726575,
                "address": "119.28.221.175:8483",
                "level": 3,
                "createAt": "2019-05-31 03:05:09"
            },
            {
                "id": "ee256e9026a7ea4312f4a5df847468255775b2bb75d0f97c07e4e70a46b4c401",
                "name": "vite-full-node",
                "version": 0,
                "height": 726576,
                "address": "117.50.66.76:8483",
                "level": 3,
                "createAt": "2019-05-31 12:33:44"
            },
        ]
    }
}
```

```json test
{
	"jsonrpc": "2.0",
	"id": 3,
	"method": "net_nodeInfo",
	"params": null
}
```
:::
