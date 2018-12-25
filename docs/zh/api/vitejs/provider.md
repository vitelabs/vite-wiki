# 网络连接层

:::tip 作者
[cs](https://github.com/lovelycs)
[hurrytospring](https://github.com/hurrytospring)
:::

:::tip abstract
网络连接层，使用RPC协议，可通过http，websocket或者ipc与gvite连接。
不同连接方式可以调用不同级别的接口（gvite wallet下的全部接口仅针对ipc连接开放)。
:::

## http

- **constructor params**: 
  * `url : string` 连接url  default: 'http://localhost:8415'
  * `timout : number` 超时时间（ms） default: 60000
  * `Object` 
	- `headers : object` : 请求头信息

- **Returns**: 
	- `httpProvider` http provider 实例

- **Example**:

```javascript

import httpProvider from "@vite/vitejs/dist/es5/provider/HTTP";
const http = new httpProvider("http://localhost:8080");

```

## websocket
- **constructor params**: 

  * `url : string` 连接url  default: 'ws://localhost:31420'
  * `timeout : number` 超时时间（ms） default: 60000
  * `Object` 
	- `headers : object` : 请求头信息
    - `protocol` : 协议
    - `clientConfig : object`: [require('websocket').w3cwebsocket ==> clientConfig](https://github.com/theturtle32/WebSocket-Node/blob/58f301a6e245ee25c4ca50dbd6e3d30c69c9d3d1/docs/WebSocketClient.md)
    - `retryTimes : number`: 重连超时时间
    - `retryInterval : number`: 重连间隔时长

- **Returns**: 
	- `wsProvider` websocket provider 实例

- **Example**:

```javascript

import wsProvider from "@vite/vitejs/dist/es5/provider/WS";
const myWs = new wsProvider("ws://localhost:8080");

```

## ipc  
- **constructor params**: 

  * `path : string` 连接path  default: ''
  * `timeout : number` 超时时间（ms） default: 60000
  * `Object` 
	- `delimiter : string` : 分割符 default: `\n`
    - `retryTimes : number`: 重连超时时间
    - `retryInterval : number`: 重连间隔时长

- **Returns**: 
	- `ipcProvider` ipc provider 实例

- **Example**:

```javascript

import ipcProvider from "@vite/vitejs/dist/es5/provider/IPC";
const myIpc = new ipcProvider("~/.gvite/testdata/gvite.ipc");

```

## provider

### 实例属性

|  名称  | 类型 | 说明 |
|:------------:|:-----:|:-----:|
| type |  string | 网络传输协议类型 |
| timeout | number(ms) | 请求超时时间 |

### 实例方法

#### abort
打断当前连接的剩余请求，并将请求列表清空

#### request
发起request请求

- **params**: 

  * `methodName : string` 方法名
  * `params : any` 请求参数

- **Returns**:
    - Promise<`JsonRPC response`>

#### notification

- **params**: 

  * `methodName : string` 方法名
  * `params : any` 请求参数

#### batch

- **params**: 

  * `requests : array<object>` 
	- `type : string<request | notification | batch>` : 请求类型
    - `methodName : string`: 方法名
    - `params : any`: 请求参数

- **Returns**:
    - Promise<`JsonRPC response`>

## ws provider

### 实例属性

|  名称  | 类型 | 说明 |
|:------------:|:-----:|:-----:|
| url | string | 网络连接路径 |
| protocol | string | 协议 |
| headers | object | 请求头信息 |
| clientConfig | object | [同上](https://github.com/theturtle32/WebSocket-Node/blob/58f301a6e245ee25c4ca50dbd6e3d30c69c9d3d1/docs/WebSocketClient.md)|

### 实例方法
除provider实例的共有方法外

#### reconnect
网络重连

## ipc provider

### 实例属性

|  名称  | 类型 | 说明 |
|:------------:|:-----:|:-----:|
| path | string | 连接路径 |
| delimiter | string | 分割符 |

### 实例方法
除provider实例的共有方法外

#### reconnect
重连

#### disconnect
取消连接
