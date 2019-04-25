# IPC 

## Installation

:::demo
```bash tab:npm
npm install @vite/vitejs-ipc --save
```

```bash tab:yarn
yarn add @vite/vitejs-ipc
```
:::

## Import

:::demo
```javascript tab:ES6
import IPC_RPC from "@vite/vitejs-ipc";
```

```javascript tab:require
const { IPC_RPC } = require('@vite/vitejs-ipc');
```
:::

## Constructor

- **Constructor Parameters**: 
  * `path : string` Connection path  default: ''
  * `timeout : number` Timeout（ms） default: 60000
  * `Object` 
	- `delimiter : string` : Delimiter default: `\n`
    - `retryTimes : number`: Reconnection Times
    - `retryInterval : number`: Reconnection Interval

- **Example**:
```javascript
import IPC_RPC from "@vite/vitejs-ipc";

const ipcProvider = new IPC_RPC("~/.gvite/testdata/gvite.ipc");
```

## Properties

|  Name  | Type | Description |
|:------------:|:-----:|:-----:|
| path | string | Connection path |
| delimiter | string | Delimiter |

## Methods
Except for the public methods and properties

### reconnect
Reconnection

### disconnect
Disconnection

### subscribe
Subscribe push events from server side

- **Parameters**: 
  * `callback : Function` The result will return to this event when server side has any push event

### unSubscribe
Unsubscribe
