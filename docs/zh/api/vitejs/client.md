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

## Constructor extends netProcessor
继承netProcessor的所有方法 (setProvider / request / notification / batch / subscribe / unSubscribe / clearSubscriptions)

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

## buildinTxBlock
见 buildinTxBlock

## buildinLedger
见 buildinLedger
