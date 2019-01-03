# websocket

## contructor

- **Constructor params**: 

  * `url : string` Connection url  Default: 'ws://localhost:31420'
  * `timeout : number` Timeout（ms） Default: 60000
  * `Object` 
	- `headers : object` : Request Header Information
    - `protocol` : 协议
    - `clientConfig : object`: [require('websocket').w3cwebsocket ==> clientConfig](https://github.com/theturtle32/WebSocket-Node/blob/58f301a6e245ee25c4ca50dbd6e3d30c69c9d3d1/docs/WebSocketClient.md)
    - `retryTimes : number`: Reconnection timeout
    - `retryInterval : number`: Reconnection interval

- **Returns**: 
	- `wsProvider` websocket provider instance

- **Example**:

```javascript

import wsProvider from "@vite/vitejs/dist/es5/provider/WS";
const myWs = new wsProvider("ws://localhost:8080");

```

## ws provider

### Instance Properties

|  Name  | Type | Description |
|:------------:|:-----:|:-----:|
| url | string | Network connection path |
| protocol | string | 协议 |
| headers | object | Request header information |
| clientConfig | object | [同上](https://github.com/theturtle32/WebSocket-Node/blob/58f301a6e245ee25c4ca50dbd6e3d30c69c9d3d1/docs/WebSocketClient.md)|

### Instance Methods
Except for the public methods of provider instance

#### Reconnect
Network reconnection
