# IPC 

## Constructor

- **Constructor Params**: 

  * `path : string` Connection path  default: ''
  * `timeout : number` Timeout（ms） default: 60000
  * `Object` 
	- `delimiter : string` : Delimiter default: `\n`
    - `retryTimes : number`: Reconnection Timeout
    - `retryInterval : number`: Reconnection Interval

- **Example**:

```javascript

import ipcProvider from "@vite/vitejs/dist/es5/provider/IPC";
const myIpc = new ipcProvider("~/.gvite/testdata/gvite.ipc");

```

## IPC provider

### Instance Properties

|  Name  | Type | Description |
|:------------:|:-----:|:-----:|
| path | string | Connection path |
| delimiter | string | Delimiter |

### Instance Methods
Except for the public methods of provider instance

#### reconnect
Reconnection

#### disconnect
Disconnection

#### subscribe
订阅服务端推送事件

- **params**: 

  * `callback : Function` 当有服务端推送事件时, 则返回数据到此事件中

#### unSubscribe
取消订阅
