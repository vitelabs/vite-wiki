# websocket

## Constructor

- **constructor params**: 

  * `url : string` 连接url  default: 'ws://localhost:31420'
  * `timeout : number` 超时时间（ms） default: 60000
  * `Object` 
	- `headers : object` : 请求头信息
    - `protocol` : 协议
    - `clientConfig : object`: [require('websocket').w3cwebsocket ==> clientConfig](https://github.com/theturtle32/WebSocket-Node/blob/58f301a6e245ee25c4ca50dbd6e3d30c69c9d3d1/docs/WebSocketClient.md)
    - `retryTimes : number`: 重连超时时间
    - `retryInterval : number`: 重连间隔时长

- **Example**:

```javascript

import wsProvider from "@vite/vitejs-ws";
const myWs = new wsProvider("ws://localhost:8080");

```

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

#### subscribe
订阅服务端推送事件

- **params**: 

  * `callback : Function` 当有服务端推送事件时, 则返回数据到此事件中

#### unSubscribe
取消订阅
