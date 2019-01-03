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

## contructor

- **constructor params**
    - `provider : Provider 实例`
    - `firstConnectCb : function` : 首次连接后的回调函数

- **example**

```javascript

import provider from '@vite/vitejs/dist/es5/provider/WS';
import { client } from '@vite/vitejs';

const WS_RPC = new provider("https://example.com");
const myClient = new Client(WS_RPC, function(_myclient) {
    const block = _myclient.buildinTxBlock.getAccountBlock.sync(
        //...
    );
    _myclient.onroad.getOnroadBlocksByAddress.then((data) => {
        console.log(data);
    });
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
