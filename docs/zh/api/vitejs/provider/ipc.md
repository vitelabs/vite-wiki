# ipc 

:::tip abstract
@vitejs/vitejs-ipc
:::

## Constructor

- **Constructor params**: 

  * `path : string` Connecting path  default: ''
  * `timeout : number` Timeout（ms） default: 60000
  * `Object` 
	- `delimiter : string` : Delimiter default: `\n`
    - `retryTimes : number`: Reconnecting Timeout
    - `retryInterval : number`: Reconnecting Interval

- **Example**:

```javascript

import ipcProvider from "@vite/vitejs-ipc";
const myIpc = new ipcProvider("~/.gvite/testdata/gvite.ipc");

```

## ipc Provider

### Instance Properties

|  Name  | Type | Description |
|:------------:|:-----:|:-----:|
| path | string | Connection path |
| delimiter | string | Delimiter |

### Instance Methods
In addition to common methods of provider instance

#### reconnect
Reconnect

#### disconnect
Disconnect

#### subscribe
Subscribing server side push notifications

- **params**: 

  * `callback : Function` Output data will be returned to this event when there are notifications on server side

#### unSubscribe
Unsubscribe
