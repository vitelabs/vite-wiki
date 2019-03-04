---
sidebarDepth: 1
---
# 客户端

:::tip 作者
[cs](https://github.com/lovelycs)
[hurrytospring](https://github.com/hurrytospring)
:::

:::tip abstract
包括一些内置的快捷调用方式
:::

## 注意 
1. 以下buildinTxBlock中的方法，当requestType为async时，非必填参数皆可不填
2. methods中的方法都可以直接使用client.namespace.funcName的方式调用，见constructor/example

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
import { client } from '@vite/vitejs';

const WS_RPC = new provider("https://example.com");

const myClient = new Client(WS_RPC, function(_myclient) {
    console.log("Connected.");
});

const block = _myclient.buildinTxBlock.getAccountBlock.sync(
    //...
);

_myclient.onroad.getOnroadBlocksByAddress.then((data) => {
    console.log(data);
});

```

## setProvider provider, abort)
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

## buildinTxBlock
见 buildinTxBlock

## buildinLedger
见 buildinLedger

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
