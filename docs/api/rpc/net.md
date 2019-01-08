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

## net_peers
Return the detailed information of connected peers of the node

- **Parameters**: `none`

- **Returns**: `NodeInfo`

| Name | JSON type | Actual type | Desc |
|:------------:|:-----------:|:-----:|:-----:|
| peers | \[\]*PeerInfo | \[\]*PeerInfo | The information of connected peers |

`PeerInfo` 

| Name | JSON type | Actual type | Desc |
|:------------:|:-----------:|:-----:|:-----:|
| id | string | string | The node ID |
| addr | string | string | The node's IP address <ip:port> |
| head | string | string | The hash of the highest snapshot block of the node|
| height | string | uint64 | The height of the highest snapshot block of the node|
| created | string | string | The time peer is created |

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
                "created": "2019-01-06 02:01:42"
            },
            {
                "id": "17c672f17bfca27dc0de1db8a117f91fbe77d345734cdf7c5ca5371c0c7a73a3",
                "addr": "134.175.1.34:36632",
                "head": "ef3c6213134c9b672b61a2b4e10767dd563fd47c7557ab9996cbe89c8a766190",
                "height": 473,
                "created": "2019-01-06 07:58:22"
            }
        ]
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
