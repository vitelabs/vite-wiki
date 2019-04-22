# Client Side

:::tip Abstract
@vitejs/vitejs-client

This part contains built-in shortcuts.

The invocation of different levels of API varies from diverse connection ways. (All of the APIs that are underlying gvite wallet will be accessible only by IPC.)
:::

```javascript import
import { client } from '@vite/vitejs';

// Or
import client from '@vite/vitejs-client';
```

## Notice 
1. You can leave out those optional parameters in Methods of buildinTxBlock as below when requestType equals to async
2. Get to know more about how to call RPC api: [View more in constant module](/api/vitejs/constant/constant.html)
    - If this method is defined in methods constant, you can directly call `client.namespace.funcName`
    - If this method is not defined in methods constant, you can directly call `client.request(methodName, ...args)`
    - RPC api is only encapsulated for call method, the returned data will directly expose RPC api original data

## Constructor extends netProcessor
Inherit all of netProcessor's methods (setProvider / request / notification / batch / subscribe / unSubscribe / clearSubscriptions)

- **constructor params**
    - `provider : Provider Instance`
    - `firstConnectCb : function` : Callback function of first connection

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
