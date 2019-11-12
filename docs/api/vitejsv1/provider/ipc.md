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
    * `path : string` Connection path. Default is empty string
    * `timeout : number` Timeout(ms) Default is 60000
    * `__namedParameters? : object` 
        - `delimiter? : string` : Delimiter. Default is `\n`
        - `retryTimes? : number`: Reconnect times. Default is 10
        - `retryInterval? : number`: Reconnect interval(ms). Default is 10000

- **Example**:
```javascript
import IPC_RPC from "@vite/vitejs-ipc";

const ipcProvider = new IPC_RPC("~/.gvite/testdata/gvite.ipc");
```

## Properties

The following properties are specifically supported in IPC.

|  Name  | Type | Description |
|:------------:|:-----:|:-----:|
| path | string | Connection path |
| delimiter | string | Delimiter |

## Methods

The following methods are specifically supported in IPC.

### reconnect
Reconnect

### disconnect
Disconnect

### subscribe
Subscribe to events

- **Parameters**: 
  * `callback : Function` Callback function will be invoked when subscribed event is triggered and pushed back

### unSubscribe
Unsubscribe
