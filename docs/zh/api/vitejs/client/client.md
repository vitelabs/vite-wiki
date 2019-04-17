# 客户端

:::tip abstract
@vitejs/vitejs-client

包括一些内置的快捷调用方式

不同连接方式可以调用不同级别的接口（gvite wallet下的全部接口仅针对ipc连接开放)。
:::

```javascript 引入
import { client } from '@vite/vitejs';

// Or
import client from '@vite/vitejs-client';
```

## 注意 
1. 以下buildinTxBlock中的方法，当requestType为async时，非必填参数皆可不填
2. 关于 RPC 接口的调用，[详见constant模块](/api/vitejs/constant/constant.html)
    - 如果methods常量中定义了此方法，可以直接使用`client.namespace.funcName`的方式调用
    - 如果methods常量中未定义此方法，可以直接通过`client.request(methodName, ...args)`的方式调用
    - RPC接口只是对于调用方式进行封装，返回数据会直接暴露RPC接口的原始数据

## Constructor extends netProcessor
继承netProcessor的所有方法 (setProvider / request / notification / batch / subscribe / unSubscribe / clearSubscriptions)

- **constructor params**
    - `provider : Provider 实例`
    - `firstConnectCb : function` : 首次连接后的回调函数

- **Example**

```javascript

import provider from '@vite/vitejs-WS';
import { client, constant } from '@vite/vitejs';

const { methods } = constant;
const WS_RPC = new provider("wss://example.com");

const myClient = new Client(WS_RPC, function(_myclient) {
    console.log("Connected.");
});

const block = myclient.buildinTxBlock.getAccountBlock.sync(
    //...
);

myclient.onroad.getOnroadBlocksByAddress.then((data) => {
    console.log(data);
});

myClient.request(methods.ledger.getLatestSnapshotChainHash).then(()=>{
    // ......
})

myClient.subscribeFunc.newAccountBlocks().then(()=>{
    // ......
});

myClient.request(methods.subscribe.newAccountBlocks).then(()=>{
    // ......
})

```

## getBalance
获取余额

- **Parameters** 
    * `addr: Address`
- **Return**:
    * Promise<`{ balance, onroad }`>

```javascript ::Demo

myclient.getBalance.then(({balance, onroad}) => {
    console.log(balance, onroad);
}).catch(err => {
    console.warn(err);
});

```

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
