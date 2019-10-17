# IPC 

## 安装

:::demo
```bash tab:npm
npm install @vite/vitejs-ipc --save
```

```bash tab:yarn
yarn add @vite/vitejs-ipc
```
:::

## 引入

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
    * `path : string` 连接路径
    * `timeout? : number` 超时时间(ms) Default: 60000
    * `__namedParameters? : object` 
        - `delimiter? : string` : 分隔符 Default: `\n`
        - `retryTimes? : number`: 连接断开后，重试连接次数 Default 10
        - `retryInterval? : number`: 连接断开后，重试连接间隔(ms) Default 10000

- **Example**:
```javascript
import IPC_RPC from "@vite/vitejs-ipc";

const ipcProvider = new IPC_RPC("~/.gvite/testdata/gvite.ipc");
```

## Properties

|  Name  | Type | Description |
|:------------:|:-----:|:-----:|
| path | string | 连接路径 |
| delimiter | string | 分隔符 |

## Methods
除却通用实例方法与属性外

### reconnect
重连

### disconnect
断开连接

### subscribe
订阅服务端推送事件

- **Parameters**: 
  * `callback : Function` 当有服务端推送事件时, 则返回数据到此事件中

### unSubscribe
取消订阅
