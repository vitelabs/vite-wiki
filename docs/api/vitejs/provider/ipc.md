# ipc 

## contructor

- **constructor params**: 

  * `path : string` Connection path  default: ''
  * `timeout : number` Timeout（ms） default: 60000
  * `Object` 
	- `delimiter : string` : Delimiter default: `\n`
    - `retryTimes : number`: Reconnection timeout
    - `retryInterval : number`: Reconnection interval

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
