# Net

:::tip Maintainer
[jerry-vite](https://github.com/jerry-vite)
:::

**Supported protocols:**

| JSON-RPC 2.0 | HTTP | IPC | Publish–subscribe | Websocket |
|:------------:|:-----------:|:-----:|:-----:|:-----:|
| &#x2713; | `false` | &#x2713; | future version |`false`|

## net_syncInfo
Return the sync status of the node

- **Parameters**: `none`

- **Returns**: `SyncInfo`

| Name | JSON type | Actual type | Desc |
|:------------:|:-----------:|:-----:|:-----:|
| from | string | uint64 | The starting sync height |
| to | string | uint64| The target sync height |
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
Return the dailed information of sync status.

- **Parameters**: `none`

- **Returns**: `SyncDetail`

| Name | JSON type | Actual type | Desc |
|:------------:|:-----------:|:-----:|:-----:|
| from | string | uint64 | The starting sync height |
| to | string | uint64| The target sync height |
| current | string | uint64 | The current height of snapshot chain |
| status | string | string | The description of sync status |
| tasks | array | []string | download tasks |
| Connections | array | []SyncConnectionStatus | download connections |
| Chunks | array | []Chunk | the parsed chunks, wait to inserted to local chain |
| Caches | array | []Cache | the downloaded caches, will be parsed, and delete later |

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
Return the detailed information of current Node, like peers.

- **Parameters**: `none`

- **Returns**: `NodeInfo`

| Name | JSON type | Actual type | Desc |
|:------------:|:-----------:|:-----:|:-----:|
| id | string | string | current NodeID |
| name | string | string | current Node name, configured by field `Identity` in `node_config.json` |
| netId | int | int | current Node network ID |
| version | int | int | current Node version, not release version |
| address | string | string | network interface the current Node listen on |
| peerCount | int | int | peers count |
| peers | \[\]*PeerInfo | \[\]*PeerInfo | The information of connected peers |

`PeerInfo`

| Name | JSON type | Actual type | Desc |
|:------------:|:-----------:|:-----:|:-----:|
| id | string | string | The node ID |
| name | string | string | Node name |
| version | int | int | Node version |
| height | int | int | current Snapshot Chain height |
| level | int | int | the connection flag |
| address | string | string | The node's IP address <ip:port> |
| createAt | string | string | The time peer is created |

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
