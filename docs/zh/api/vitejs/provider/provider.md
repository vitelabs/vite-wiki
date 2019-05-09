# 介绍

网络连接使用 JSON-RPC 2.0 协议，可通过 http，websocket 或者 ipc 与 Gvite 连接。

HTTP / Websocket / IPC 皆集成以下方法及属性。

## Properties

|  名称  | 类型 | 说明 |
|:------------:|:-----:|:-----:|
| type |  string | 网络传输协议类型 |
| timeout | number(ms) | 请求超时时间 |

## Methods

### abort
打断当前连接的剩余请求，并将请求列表清空

### request
发起request请求

- **Parameters**: 
  * `methodName : string` 方法名
  * `params : any` 请求参数

- **Returns**:
    - Promise<`JsonRPC response`>

### notification

- **Parameters**: 
  * `methodName : string` 方法名
  * `params : any` 请求参数

### batch

- **Parameters**: 
  * `requests : array<object>` 
	- `type : string<request | notification | batch>` : 请求类型
    - `methodName : string`: 方法名
    - `params : any`: 请求参数

- **Returns**:
    - Promise<`JsonRPC response`>
