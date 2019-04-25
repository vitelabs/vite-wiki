# Websocket

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
  * `url : string` Connection url  Default: 'ws://localhost:31420'
  * `timeout : number` Timeout（ms） Default: 60000
  * `Object` 
	- `headers : object` : Request Header Information
    - `protocol` : Protocol
    - `clientConfig : object`: [require('websocket').w3cwebsocket ==> clientConfig](https://github.com/theturtle32/WebSocket-Node/blob/58f301a6e245ee25c4ca50dbd6e3d30c69c9d3d1/docs/WebSocketClient.md)
    - `retryTimes : number`: Reconnection times default: 10
    - `retryInterval : number`: Reconnection interval default: 10000

- **Example**:
```javascript
import WS_RPC from "@vite/vitejs-ws";
const wsProvider = new WS_RPC("ws://localhost:8080");
```

## Properties
Except for the public methods and properties

|  Name  | Type | Description |
|:------------:|:-----:|:-----:|
| url | string | Network connection path |
| protocol | string | Protocol |
| headers | object | Request header information |
| clientConfig | object | [Same as Above](https://github.com/theturtle32/WebSocket-Node/blob/58f301a6e245ee25c4ca50dbd6e3d30c69c9d3d1/docs/WebSocketClient.md)|

## Methods
Except for the public methods and properties

### Reconnect
Network reconnection

### disconnect
Disconnection

### subscribe
Subscribe push events from server side

- **Parameters**: 
  * `callback : Function` The result will return to this event when server side has any push event

### unSubscribe
Unsubscribe
