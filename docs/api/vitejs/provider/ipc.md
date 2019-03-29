# IPC 

:::tip abstract
@vitejs/vitejs-ipc
:::

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

import ipcProvider from "@vite/vitejs-ipc";
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
Subscribe push events from server side

- **params**: 

  * `callback : Function` The result will return to this event when server side has any push event

#### unSubscribe
Unsubscribe
