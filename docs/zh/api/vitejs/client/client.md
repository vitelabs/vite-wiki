# 客户端

:::tip abstract
@vitejs/vitejs-client

包括一些内置的快捷调用方式

不同连接方式可以调用不同级别的接口（gvite wallet下的全部接口仅针对ipc连接开放)。
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

## getBalance
获取余额

- **Parameters** 
    * `addr: Address`
- **Return**:
    * Promise<`{ balance, onroad }`>

## getTxList
获取交易列表

- **Parameters** 
    __namedParameters: object
    * `addr: Address`
    * `index: number` 
    * `pageCount?: number` default 50
- **Return**:
    * Promise<`{ list, totalNum }`>

## sendRawTx
发送交易

- **Parameters** 
    * `accountBlock: AccountBlock` 规范化后的accountBlock (无需签名)
    * `privateKey` 私钥
- **Return**:
    * Promise<`AccountBlock`>

## buildinTxBlock
见 buildinTxBlock
