# Client Side

:::tip Abstract
@vitejs/vitejs-client

This part contains built-in shortcuts.

The invocation of different levels of API varies from diverse connection ways. (All of the APIs that are underlying gvite wallet will be accessible only by IPC.)
:::

```javascript 引入
import { client } from '@vite/vitejs';

// Or
import client from '@vite/vitejs-client';
```

## Notice 
1. You can leave out those optional parameters in Methods of buildinTxBlock as below when requestType equals to async
2. Every methods in it can be invoked by `client.namespace.funcName`, [详见constant模块](/api/vitejs/constant/constant.html)

## Constructor extends netProcessor
继承netProcessor的所有方法 (setProvider / request / notification / batch / subscribe / unSubscribe / clearSubscriptions)

- **constructor params**
    - `provider : Provider Instance`
    - `firstConnectCb : function` : Callback function of first connection

- **Example**

```javascript

import provider from '@vite/vitejs-WS';
import { client } from '@vite/vitejs';

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

```

## getBalance
Get Balance

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
Get Transaction List

- **Parameters** 
    __namedParameters: object
    * `addr: Address`
    * `index: number` 
    * `pageCount?: number` default 50
- **Return**:
    * Promise<`{ list, totalNum }`>

## sendRawTx
Send Transaction

- **Parameters** 
    * `accountBlock: AccountBlock` Formatted accountBlock (Signature not required)
    * `privateKey` Private Key
- **Return**:
    * Promise<`AccountBlock`>

## buildinTxBlock
Refer to buildinTxBlock
