# WebSocket

## Installation

:::demo
```bash tab:npm
npm install @vite/vitejs-ws --save
```

```bash tab:yarn
yarn add @vite/vitejs-ws
```
:::

## Import

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
    * `url : string` Connection url. Default is 'ws://localhost:31420'
    * `timeout? : number` Timeout(ms). Default is 60000
    * `__namedParameters? : object` 
        - `headers? : object` : Request header
        - `protocol?` : Protocol
        - `clientConfig? : object`: [require('websocket').w3cwebsocket ==> clientConfig](https://github.com/theturtle32/WebSocket-Node/blob/58f301a6e245ee25c4ca50dbd6e3d30c69c9d3d1/docs/WebSocketClient.md)
        - `retryTimes? : number`: Reconnect times. Default is 10
        - `retryInterval? : number`: Reconnect interval(ms). Default is 10000

- **Example**:
```javascript
import WS_RPC from "@vite/vitejs-ws";
const wsProvider = new WS_RPC("ws://localhost:8080");
```

## Properties

The following properties are specifically supported in WebSocket.

|  Name  | Type | Description |
|:------------:|:-----:|:-----:|
| url | string | Connection url |
| protocol | string | Protocol |
| headers | object | Request header |
| clientConfig | object | [Client config](https://github.com/theturtle32/WebSocket-Node/blob/58f301a6e245ee25c4ca50dbd6e3d30c69c9d3d1/docs/WebSocketClient.md)|

## Methods
The following methods are specifically supported in WebSocket.

### Reconnect
Reconnect

### disconnect
Disconnect

### subscribe
Subscribe to events

- **Parameters**: 
  * `callback : Function` Callback function will be invoked when subscribed event is triggered and pushed back

### unSubscribe
Unsubscribe
