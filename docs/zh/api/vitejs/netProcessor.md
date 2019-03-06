---
sidebarDepth: 1
---
# 开始

## event (subscribe返回的事件实例)

### on
监听

- **Parameters**
    * `callback : Function` 有事件发生时，传入结果到callback函数

### off
取消监听

## Constructor

- **constructor params**
    - `provider : Provider 实例`
    - `firstConnectCb : function` : 首次连接后的回调函数

- **Example**

```javascript

import provider from '@vite/vitejs/dist/es5/provider/WS';
import { netProcessor, constant } from '@vite/vitejs';

const { method } = constant;
const WS_RPC = new provider("https://example.com");

const myNetProcessor = new netProcessor(WS_RPC, function(_myclient) {
    console.log("Connected.");
});

myNetProcessor.request(method.ledger.getLatestSnapshotChainHash).then(() => {
    // ...
});
```

## setProvider (provider, abort)
设置provider

- **Parameters**
    * `provider : Provider实例`
    * `abort : boolean` 是否打断原有provider的残余请求

## request (Methods, ...args)
为this.provider.request的快捷引用

## notification (Methods, ...args)
为this.provider.notification的快捷引用

## batch (RPCrequest[])
为this.provider.batch的快捷引用

## subscribe (Methods, ...args)
订阅事件: 传参方式与request一致

- **Returns**:
    - Promise<`event`>

- **Example**

```javascript

import provider from '@vite/vitejs/dist/es5/provider/WS';
import { client } from '@vite/vitejs';

const WS_RPC = new provider("https://example.com");

const myClient = new Client(WS_RPC, function(_myclient) {
    console.log("Connected.");
});

myClient.subscribe('newAccountBlocks').then((event) => {
    event.on((result) => {
        console.log(result);
    });
    // event.off();
}).catch(err => {
    console.warn(err);
});

```

## unSubscribe
取消订阅

- **params**: 
  * `event`: subscribe返回的event

## clearSubscriptions
清空全部订阅
