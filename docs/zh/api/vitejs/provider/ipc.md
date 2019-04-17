# IPC 

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

## IPC provider 实例

### Instance Properties

|  Name  | Type | Description |
|:------------:|:-----:|:-----:|
| path | string | 连接路径 |
| delimiter | string | 分隔符 |

### Instance Methods
除却与 provider 实例一致的方法外

#### reconnect
重连

#### disconnect
断开连接

#### subscribe
订阅服务端推送事件

- **params**: 

  * `callback : Function` 当有服务端推送事件时, 则返回数据到此事件中

#### unSubscribe
取消订阅
