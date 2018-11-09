# Net
## jerry

## Description

**Supported protocols:**

| JSON-RPC 2.0 | HTTP | IPC | Publish–subscribe | Websocket |
|:------------:|:-----------:|:-----:|:-----:|:-----:|
| &#x2713; | `false` | &#x2713; | future version |`false`|

## API

### net_syncInfo
Return the sync status of the node

- **Parameters**: `none`

- **Returns**: `SyncInfo`

| Name | JSON type | Actual type | Desc |
|:------------:|:-----------:|:-----:|:-----:|
| from | string | uint64 | The starting sync height |
| to | string | uint64| The target sync height |
| received | string | uint64 | The number of received snapshot blocks |
| current | string | uint64 | The current height of snapshot chain |
| state | uint | uint | Sync state: 0 Sync not started, 1 Sync in process, 2 Sync complete, 3 Sync error, 4 Sync cancelled, 5 Data download complete |
| status | string | string | The description of sync status |

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

### net_peers
Return the detailed information of connected peers of the node

- **Parameters**: `none`

- **Returns**: `NodeInfo`

| Name | JSON type | Actual type | Desc |
|:------------:|:-----------:|:-----:|:-----:|
| peers | \[\]*PeerInfo | \[\]*PeerInfo | The information of connected peers |
| msgSend | string | uint64 | The number of messages sent by the node |
| msgReceived | string | uint64 | The number of messages received by the node |
| msgHandled | string | uint64 | The number of messages processed by the node |
| msgDiscarded | string | uint64 | The number of messages discarded by the node |

`PeerInfo` 

| Name | JSON type | Actual type | Desc |
|:------------:|:-----------:|:-----:|:-----:|
| id | string | string | The node ID |
| addr | string | string | The node's IP address <ip:port> |
| head | string | string | The hash of the highest snapshot block of the node|
| height | string | uint64 | The height of the highest snapshot block of the node|
| msgSend | string | uint64 | The number of messages sent by the node|
| msgReceived | string | uint64 | The number of messages received by the node|
| msgHandled | string | uint64 | The number of messages processed by the node |
| msgDiscarded | string | uint64 | The number of messages discarded by the node |
| msgSendDetail | map\[string\]uint64 | map\[string\]uint64 | The map of messages sent by the node, having message type as key and message number as value |
| msgReceivedDetail | map\[string\]uint64 | map\[string\]uint64 | The map of messages received by the node, having message type as key and message number as value |
| msgHandledDetail | map\[string\]uint64 | map\[string\]uint64 | The map of messages processed by the node, having message type as key and message number as value |
| msgDiscardedDetail | map\[string\]uint64 | map\[string\]uint64 | The map of messages discarded by the node, having message type as key and message number as value |
| uptime | string | time.Duration | The up time of the node since the connection is established |

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

### net_peersCount
Return the number of connected peers of the node

- **Parameters**: `none`

- **Returns**: `uint` The number of connected peers

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
