# Net

:::tip 维护者
[jerry-vite](https://github.com/jerry-vite)
:::

## net_syncInfo
查看节点同步状态

- **Parameters**: `none`

- **Returns**: 

    `SyncInfo`
     -  `from` : `string` 同步的起始高度
     -  `to` : `string` 同步的目标高度
     -  `current` : `string` 当前快照链的高度
     -  `state` : `uint` 同步状态：0 未开始同步，1 同步中，2 同步完成 <br> 3 同步出错，4 同步取消，5 同步数据已全部下载
     -  `status` : `string` 同步状态的描述

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

- **Returns**: 

    `SyncDetail`
     -  `from` : `string` 同步的起始高度
     -  `to` : `string` 同步的目标高度
     -  `current` : `string` 当前快照链的高度
     -  `status` : `string` 同步状态的描述
     -  `tasks` : `array` 同步任务队列
     -  `Connections` : `array` 用于同步账本的连接
     -  `Chunks` : `array` 已经解析的 chunk，包含快照块以及所快照的账户块，会被插入本地账本
     -  `Caches` : `array` 已经下载的 chunk，以二进制形式存在本地，会被解析为 chunk，当快照链到达一定高度之后，cache 会被删除

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
        "692001-693000 done",
        "693001-694000 pending"
      ],
      "connections": [
        {
          "address": "24a160122317e6e4940ef2a91242b07f@118.25.49.80:8484",
          "speed": "0.00 Byte/s",
        },
        {
          "address": "04508fbe0512c01a48c8a450425547de@118.24.112.185:8484",
          "speed": "0.00 Byte/s",
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

- **Returns**: 

`NodeInfo`
  -  `id` : `string` 本节点的 NodeID
  -  `name` : `string` 本节点的名称，通过 node_config.json 中的 Identity 字段设置
  -  `netId` : `int` 本节点的网络 Id
  -  `peerCount` : `int` 本节点所连接的 peer 数量
  -  `peers` : `[]*PeerInfo` 连接的 peers 信息

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
    "name": "vite-sbp-0",
    "netId": 1,
    "address": "0.0.0.0:8483",
    "peerCount": 2,
    "peers": [
      {
        "name": "vite-sbp-1",
        "height": 726575,
        "address": "119.28.221.175:8483",
        "createAt": "2019-05-31 03:05:09"
      },
      {
        "name": "vite-full-node",
        "height": 726576,
        "address": "117.50.66.76:8483",
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

`PeerInfo`
 -  `name` : `string` 节点名称
 -  `height` : `int` 节点的快照链高度
 -  `address` : `string` 节点的地址
 -  `createAt` : `string` 节点的接入时间

## net_peers
同 net_nodeInfo

