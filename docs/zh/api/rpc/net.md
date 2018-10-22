# Net
## jerry

## 说明

**支持调用方式：**

| JSON-RPC 2.0 | HTTP | IPC | Publish–subscribe | Websocket |
|:------------:|:-----------:|:-----:|:-----:|:-----:|
| &#x2713; | `false` | &#x2713; | waiting |`false`|

## API

### net_syncInfo
现在节点网络是否可用

- **Parameters**: `none`

- **Returns**: `SyncInfo`

| 名称 | json类型 | 实际类型 | 说明 |
|:------------:|:-----------:|:-----:|:-----:|
| from |  string | uint64 | 同步的起始高度 |
| to | string | uint64| 同步的目标高度 |
| received | string | uint64 | 接收的快照块数量 |
| current | string | uint64 | 当前快照链的高度 |
| state | uint | uint | 同步状态：0 未开始同步，1 同步中，2 同步完成，3 同步出错，4 同步取消，5 同步数据已全部下载 |
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

### net_peers
当前节点连接的外部节点数量

- **Parameters**: `none`

- **Returns**: `uint` 当前连接的节点数量

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
	"id": 3,
	"result": 10
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
