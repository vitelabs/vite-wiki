# Net

:::tip 维护者
[jerry-vite](https://github.com/jerry-vite)
:::

**支持调用方式：**

| JSON-RPC 2.0 | HTTP | IPC | Publish–subscribe | Websocket |
|:------------:|:-----------:|:-----:|:-----:|:-----:|
| &#x2713; | `false` | &#x2713; | waiting |`false`|

## net_syncInfo
现在节点网络是否可用

- **Parameters**: `none`

- **Returns**: `SyncInfo` 结构如下

| 名称 | json类型 | 实际类型 | 说明 |
|:------------:|:-----------:|:-----:|:-----:|
| from | string | uint64 | 同步的起始高度 |
| to | string | uint64| 同步的目标高度 |
| received | string | uint64 | 接收的快照块数量 |
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
    "received": "1000",
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

## net_peers
当前节点连接的外部节点详情

- **Parameters**: `none`

- **Returns**: `NodeInfo` 结构如下

| 名称 | json类型 | 实际类型 | 说明 |
|:------------:|:-----------:|:-----:|:-----:|
| peers | \[\]*PeerInfo | \[\]*PeerInfo | peers 详情 |
| msgSend | string | uint64 | 本节点已经发送的消息数量 |
| msgReceived | string | uint64 | 本节点已经接收的消息数量 |
| msgHandled | string | uint64 | 本节点已经处理的消息数量（一些信息接收但是还未处理） |
| msgDiscarded | string | uint64 | 本节点来不及处理，丢弃的信息数量 |

`PeerInfo` 结构如下

| 名称 | json类型 | 实际类型 | 说明 |
|:------------:|:-----------:|:-----:|:-----:|
| id | string | string | 节点id |
| addr | string | string | 节点的网络地址<ip:port> |
| head | string | string | 节点快照链最高 snapshot block 的 hash |
| height | string | uint64 | 节点快照链最高 snapshot block 的 高度 |
| msgSend | string | uint64 | 本节点已经发送的消息数量 |
| msgReceived | string | uint64 | 本节点已经接收的消息数量 |
| msgHandled | string | uint64 | 本节点已经处理的消息数量（一些信息接收但是还未处理） |
| msgDiscarded | string | uint64 | 本节点来不及处理，丢弃的信息数量 |
| MsgSendDetail | map\[string\]uint64 | map\[string\]uint64 | 本节点已经发送的消息详情<每个消息类型的数量> |
| msgReceived | map\[string\]uint64 | map\[string\]uint64 | 本节点已经接收的消息详情<每个消息类型的数量> |
| msgHandled | map\[string\]uint64 | map\[string\]uint64 | 本节点已经处理的消息详情<每个消息类型的数量> |
| msgDiscarded | map\[string\]uint64 | map\[string\]uint64 | 本节点丢弃的消息详情 |
| uptime | string | time.Duration | 本节点建立连接到目前的时间 |

- **Example**: 

::: demo
```json tab:Request
{
	"jsonrpc": "2.0",
	"id": 3,
	"method": "net_peers",
	"params": null
}
```

```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 4,
    "result": {
        "peers": [
            {
                "id": "42c2bd3893fc89d8bca6c2d98286d646ee7776d6c37785584a69d3db959dc20c",
                "addr": "150.109.101.112:8483",
                "head": "ef3c6213134c9b672b61a2b4e10767dd563fd47c7557ab9996cbe89c8a766190",
                "height": 473,
                "msgHandled": 2381,
                "msgSend": 2959,
                "msgHandledDetail": {
                    "ExceptionMsg": 1,
                    "NewAccountBlockMsg": 1783,
                    "NewSnapshotBlockMsg": 521,
                    "StatusMsg": 76
                },
                "msgSendDetail": {
                    "GetAccountBlocksMsg": 1,
                    "HandShakeMsg": 1,
                    "NewAccountBlockMsg": 2321,
                    "NewSnapshotBlockMsg": 558,
                    "StatusMsg": 78
                },
                "uptime": 799854899843
            },
            {
                "id": "17c672f17bfca27dc0de1db8a117f91fbe77d345734cdf7c5ca5371c0c7a73a3",
                "addr": "134.175.1.34:36632",
                "head": "ef3c6213134c9b672b61a2b4e10767dd563fd47c7557ab9996cbe89c8a766190",
                "height": 473,
                "msgHandled": 2360,
                "msgSend": 2781,
                "msgHandledDetail": {
                    "AccountBlocksMsg": 2,
                    "NewAccountBlockMsg": 1743,
                    "NewSnapshotBlockMsg": 538,
                    "StatusMsg": 77
                },
                "msgSendDetail": {
                    "GetAccountBlocksMsg": 2,
                    "GetSnapshotBlocksMsg": 1,
                    "HandShakeMsg": 1,
                    "NewAccountBlockMsg": 2160,
                    "NewSnapshotBlockMsg": 540,
                    "StatusMsg": 77
                },
                "uptime": 781248843215
            }
        ],
        "msgSend": 36178,
        "msgReceived": 29948,
        "msgHandled": 29935,
        "msgDiscarded": 2423
    }
}
```

```json test
{
	"jsonrpc": "2.0",
	"id": 3,
	"method": "net_peers",
	"params": null
}
```
:::

## net_peersCount
当前节点连接的外部节点数量

- **Parameters**: `none`

- **Returns**: `uint` 当前连接的节点数量

- **Example**: 

::: demo
```json tab:Request
{
	"jsonrpc": "2.0",
	"id": 3,
	"method": "net_peersCount",
	"params": null
}
```

```json tab:Response
{
	"jsonrpc": "2.0",
	"id": 3,
	"result": 2
}
```
```json test
{
	"jsonrpc": "2.0",
	"id": 3,
	"method": "net_peersCount",
	"params": null
}
```
:::
