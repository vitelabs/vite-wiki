# P2P

## 说明

**支持调用方式：**

|  JSON-RPC 2.0  | HTTP | IPC |Publish–subscribe |Websocket |
|:------------:|:-----------:|:-----:|:-----:|:-----:|
| &#x2713;|  `false` |  &#x2713; |waiting|`false`|

## API

### p2p_networkAvailable
现在节点网络是否可用

- **Parameters**: `none`

- **Returns**: `bool`  

- **Example**:

::: demo

```json tab:Request
{
	"jsonrpc": "2.0",
	"id": 2,
	"method": "p2p_networkAvailable",
	"params": null
}
```

```json tab:Response
{
	"jsonrpc": "2.0",
	"id": 2,
	"result": true
}
```
```json test
{
	"jsonrpc": "2.0",
	"id": 2,
	"method": "p2p_networkAvailable",
	"params": null
}
```
:::

### p2p_peersCount
当前节点连接的外部节点数量

- **Parameters**: `none`

- **Returns**: `int` 

- **Example**: 

::: demo
```json tab:Request
{
	"jsonrpc": "2.0",
	"id": 3,
	"method": "p2p_peersCount",
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
	"method": "p2p_peersCount",
	"params": null
}
```
:::
