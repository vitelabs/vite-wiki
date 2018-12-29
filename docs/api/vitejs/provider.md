# Network Connection Layer

:::tip Created by
[cs](https://github.com/lovelycs)
[hurrytospring](https://github.com/hurrytospring)
:::

:::tip Abstract
Our network connection layer uses RPC protocol.
This part is mainly about how to connect to gvite, you can use http, websocket or IPC to get into connect with gvite.
The invocation of different levels of API varies from diverse connection ways. (All of the APIs that are underlying gvite wallet will be accessible only by IPC.)
:::

## http

- **Constructor params**: 
  * `url : string` Connection url  default: 'http://localhost:8415'
  * `timout : number` Timeout（ms） Default: 60000
  * `Object` 
	- `headers : object` : Request Header Information

- **Returns**: 
	- `httpProvider` http provider instance

- **Example**:

```javascript

import httpProvider from "@vite/vitejs/dist/es5/provider/HTTP";
const http = new httpProvider("http://localhost:8080");

```

## websocket
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

## IPC  
- **constructor params**: 

  * `path : string` Connection path  default: ''
  * `timeout : number` Timeout（ms） default: 60000
  * `Object` 
	- `delimiter : string` : Delimiter default: `\n`
    - `retryTimes : number`: Reconnection timeout
    - `retryInterval : number`: Reconnection interval

- **Returns**: 
	- `ipcProvider` ipc provider instance

- **Example**:

```javascript

import ipcProvider from "@vite/vitejs/dist/es5/provider/IPC";
const myIpc = new ipcProvider("~/.gvite/testdata/gvite.ipc");

```

## provider

### Instance Properties

|  Name  | Type | Description |
|:------------:|:-----:|:-----:|
| type |  string | Type of network transport protocol |
| timeout | number(ms) | Request timeout |

### Instance Methods

#### Abort
Breaks the remaining requests for the current connection and clears the list of requests

#### Request
Initiates a request

- **params**: 

  * `methodName : string` Method name
  * `params : any` Request params

- **Returns**:
    - Promise<`JsonRPC response`>

#### Notification

- **params**: 

  * `methodName : string` Method name
  * `params : any` Request params

#### Batch

- **params**: 

  * `requests : array<object>` 
	- `type : string<request | notification | batch>` : Request type
    - `methodName : string`: Method name
    - `params : any`: Request params

- **Returns**:
    - Promise<`JsonRPC response`>

## ws provider

### Instance Properties

|  Name  | Type | Description |
|:------------:|:-----:|:-----:|
| url | string | Network connection path |
| protocol | string | Protocol |
| headers | object | Request header information |
| clientConfig | object | [Same as above](https://github.com/theturtle32/WebSocket-Node/blob/58f301a6e245ee25c4ca50dbd6e3d30c69c9d3d1/docs/WebSocketClient.md)|

### Instance Methods
Except for the public methods of provider instance

#### Reconnect
Network Reconnection

## IPC provider

### Instance Properties

|  Name  | Type | Description |
|:------------:|:-----:|:-----:|
| path | string | Connection path |
| delimiter | string | Delimiter |

### Instance Methods
Except for the public methods of provider instance

#### Reconnect

#### Disconnect

