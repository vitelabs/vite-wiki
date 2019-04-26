# NetProcessor

## 安装

:::demo
```bash tab:npm
npm install @vite/vitejs-netprocessor --save
```

```bash tab:yarn
yarn add @vite/vitejs-netprocessor
```
:::

## 引入

:::demo
```javascript tab:ES6
import { netProcessor } from '@vite/vitejs';
// Or
import netProcessor from '@vite/vitejs-netprocessor';
```

```javascript tab:require
const { netProcessor } = require('@vite/vitejs-netprocessor');
```
:::

## Constructor

- **Constructor Parameters**
    - `provider : Provider Instance`
    - `firstConnectCb : Function` : Callback function after the first connection

- **Example**
```javascript
import WS_RPC from '@vite/vitejs-ws';
import netProcessor from '@vite/vitejs-netprocessor';
import { method } from '@vite/vitejs-constant';

const wsProvider = new WS_RPC("https://example.com");

const myNetProcessor = new netProcessor(wsProvider, function(_myclient) {
    console.log("Connected.");
});

myNetProcessor.request(method.ledger.getLatestSnapshotChainHash).then(() => {
    // ...
});
```

## Methods

### setProvider
Set provider

- **Parameters**
    * `provider : Provider Instance`
    * `abort : boolean` 是否打断原有provider的残余请求

### request (Methods, ...args)
为this.provider.request的快捷引用

### notification (Methods, ...args)
为this.provider.notification的快捷引用

### batch (RPCrequest[])
为this.provider.batch的快捷引用

### subscribe
订阅事件: 传参方式与request一致

- **Parameters**
    * `methods : string` 方法名称
    * `...args : boolean` 参数

- **Returns**:
    - Promise<`event`>

- **event**: subscribe返回的事件实例
    - on(`callback : Function`): 监听, 有事件发生时, 传入结果到callback函数
    - off: 取消监听

- **Example**
```javascript
import WS_RPC from '@vite/vitejs-ws';
import netProcessor from '@vite/vitejs-netprocessor';
import { client } from '@vite/vitejs';

const wsProvider = new WS_RPC("https://example.com");

const myNetProcessor = new netProcessor(wsProvider, function(_myNetProcessor) {
    console.log("Connected.");
});

myNetProcessor.subscribe('newAccountBlocks').then((event) => {
    event.on((result) => {
        console.log(result);
    });
    // event.off();
}).catch(err => {
    console.warn(err);
});
```

### unSubscribe
取消订阅

- **Parameters**: 
  * `event`: subscribe返回的event

### clearSubscriptions
清空全部订阅
