# Websocket

## 安装

:::demo
```bash tab:npm
npm install @vite/vitejs-ws --save
```

```bash tab:yarn
yarn add @vite/vitejs-ws
```
:::

## 引入

:::demo
```javascript tab:ES6
import WS_RPC from "@vite/vitejs-ws";
```

```javascript tab:require
const { WS_RPC } = require('@vite/vitejs-ws');
```
:::

## Constructor

- **Constructor Parameters**: 
    * `url : string` 连接url Default 'ws://localhost:31420'
    * `timeout? : number` 超时时间(ms) Default: 60000
    * `__namedParameters? : object` 
        - `headers? : object` : 请求头信息
        - `protocol?` : 协议
        - `clientConfig? : object`: [require('websocket').w3cwebsocket ==> clientConfig](https://github.com/theturtle32/WebSocket-Node/blob/58f301a6e245ee25c4ca50dbd6e3d30c69c9d3d1/docs/WebSocketClient.md)
        - `retryTimes? : number`: 重连次数 Default: 10
        - `retryInterval? : number`: 重连间隔时长(ms) Default: 10000

- **Example**:
```javascript
import WS_RPC from "@vite/vitejs-ws";
const wsProvider = new WS_RPC("ws://localhost:8080");
```

## Properties
除却通用实例方法与属性外

|  名称  | 类型 | 说明 |
|:------------:|:-----:|:-----:|
| url | string | 网络连接路径 |
| protocol | string | 协议 |
| headers | object | 请求头信息 |
| clientConfig | object | [同上](https://github.com/theturtle32/WebSocket-Node/blob/58f301a6e245ee25c4ca50dbd6e3d30c69c9d3d1/docs/WebSocketClient.md)|
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

### reconnect
网络重连

### disconnect
断开连接

### subscribe
订阅服务端推送事件

- **Parameters**: 
  * `callback : Function` 当有服务端推送事件时, 则返回数据到此事件中

### unsubscribe
取消订阅
