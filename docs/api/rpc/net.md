# Net

:::tip Maintainer
[jerry-vite](https://github.com/jerry-vite)
:::

## net_syncInfo
Return sync status of the node

- **Parameters**: `none`

- **Returns**: 

`SyncInfo`
  -  `from` : `string` Sync start height 
  -  `to` : `string` Sync target height
  -  `current` : `string` Current snapshot chain height
  -  `state` : `uint` Sync state: 0 - not start, 1 - syncing, 2 - complete, 3 - error, 4 - cancelled
  -  `status` : `string` Sync state description

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


## net_nodeInfo
Return the detailed information of current Node, like peers.

- **Parameters**: `none`

- **Returns**: 

`NodeInfo`
  -  `id` : `string` Node ID
  -  `name` : `string` Node name, configured in `Identity` field of `node_config.json`
  -  `netId` : `int`  The ID of Vite network connected
  -  `peerCount` : `int` Number of peers connected
  -  `peers` : `[]*PeerInfo` Information of peers connected

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
 -  `name` : `string` Peer's name
 -  `height` : `int` Current snapshot chain height
 -  `address` : `string` Peer's ip address
 -  `createAt` : `string` The time when this peer connected


## net_peers

the same with method `net_nodeInfo`
