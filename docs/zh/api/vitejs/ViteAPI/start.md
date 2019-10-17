# 开始

ViteAPI 包含对于Gvite-RPC接口的扩展，以及 VITE网络请求 / 监听等功能

## 引入

:::demo

```javascript tab:ES6
import { ViteAPI } from '@vite/vitejs';
```

```javascript tab:require
const { ViteAPI } = require('@vite/vitejs');
```

:::

## Constructor

- **Constructor Parameters**
    * `provider : Provider 实例`
    * `firstConnectCb : function` : 首次连接后的回调函数

- **Example**
```javascript
import WS_RPC from '@vite/vitejs-ws';
import { ViteAPI } from '@vite/vitejs';

const wsService = new WS_RPC("ws://example.com");

const provider = new ViteAPI(wsService, () => {
    console.log("Connected.");
});

provider.request('ledger_getSnapshotChainHeight').then((height) => {
    console.log(height);
});
```

## Methods

### getBalanceInfo
获取余额信息  *Gvite-RPC [ledger_getAccountByAccAddr](../../rpc/ledger.md) + [ledger_getUnreceivedTransactionSummaryByAddress](../../rpc/ledger.md)*

- **Parameters** 
    * `Address`

- **Return**
    * Promise<`{ balance, unreceived }`>

- **Example**
```javascript
// ...

provider.getBalanceInfo('vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68')
.then(({ balance, unreceived }) => {
    console.log(balance, unreceived);
})
.catch(err => {
    console.warn(err);
});
```

### getTransactionList
获取交易列表  *Gvite-RPC [ledger_getBlocksByAccAddr](../../rpc/ledger.md)*

- **Parameters** 
    * `__namedParameters: object`
        - `address: Address`
        - `pageIndex: number` 
        - `pageCount?: number` Default 50
    * `String[] | 'all'` Default 'all', 需要解析合约参数的合约交易类型，默认解析全部的合约交易

- **Return**:
    * Promise<`Array<Transaction>`>

- **Example**

:::demo
```javascript tab:request
provider.getTransactionList({
    address: 'vite_553462bca137bac29f440e9af4ab2e2c1bb82493e41d2bc8b2',
    pageIndex: 0,
    pageCount: 50
});
```

```json tab:responce
[{
    "accountAddress": "vite_553462bca137bac29f440e9af4ab2e2c1bb82493e41d2bc8b2",
    "amount": "100000000",
    "blockType": 2,
    "data": "y/Dk+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAjhvJvwQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAI4byb8EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAtjc3Rlc3R0b2tlbgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEQ1NUVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=",
    "toAddress": "vite_000000000000000000000000000000000000000595292d996d",
    "transationType": "Mintage",
    "contractParams": {
        "0": "1",
        "1": "cstesttoken",
        "2": "CSTT",
        "3": "10000000000000000",
        "4": "2",
        "5": "10000000000000000",
        "6": "1",
        "decimals": "2",
        "isReIssuable": "1",
        "maxSupply": "10000000000000000",
        "ownerBurnOnly": "1",
        "tokenName": "cstesttoken",
        "tokenSymbol": "CSTT",
        "totalSupply": "10000000000000000"
    }
}]
```
:::

### callOffChainContract
离线调用合约的 getter 方法。 *Gvite-RPC [contract_callOffChainMethod](../../rpc/contract.md)*

- **Parameters** 
    * `__namedParameters: object`
        - `address : Address` 合约账户地址
        - `abi`
        - `code : Base64` 用于离线查询的合约代码。即编译代码时指定 --bin 参数后得到的 OffChain Binary 代码。
        - `params`

- **Return**:
    * Promise<`Base64`>

### addTransactionType
增加自定义交易类型，通过`provider.getTransactionList`获取交易列表时，会根据新增交易类型进行解析，并填充至`transaction.transactionType`字段中

:::tip
`addTransactionType`可多次调用，累加交易类型
:::

- **Parameters** 
    * `__namedParameters: Object` Object.key 是交易类型名称
        - `contractAddress : Address` 合约地址
        - `abi` ABI

- **Example**
```js ::Demo
// ...

provider.addTransactionType({ 
    helloWorld: { 
        contractAddr: 'vite_0000000000000000000000000000000000000003f6af7459b9', 
        abi: { methodName: 'hello', inputs: [], type: 'function' }
    }
});
```

### setProvider
Set provider

- **Parameters**
    * `provider : Provider Instance`
    * `firstConnect : Function` 首次连接成功回调函数
    * `abort : boolean` 是否打断原有provider的残余请求

### request (Methods, ...args)

- **Parameters**
    * `methods : string` 方法名称
    * `...args` 参数

- **Returns**:
    * Promise<`JsonRPC response`>

- **Example**
```javascript
// ......

// {
//     jsonrpc: "2.0",
//     id: 33
//     method: "rpcMethodName"
//     params: [1, 1, 2]
// }
myNetProcessor.request('rpcMethodName', 1, 1, 2).then(() => {
    // ...
});
```

### notification (Methods, ...args)

- **Parameters**
    * `methods : string` 方法名称
    * `...args` 参数

### batch (RPCrequest[])

- **Parameters**
    * `__namedParameters: Object`
        - `type: string<request | notification>`
        - `methodName: string` 方法名称
        - `params: any` 参数

- **Returns**:
    * Promise<`JsonRPC response`>

- **Example**
```javascript
// ......

// [{
//     jsonrpc: "2.0",
//     id: 33
//     method: "rpcMethodName"
//     params: [1, 1, 2]
// }]
myNetProcessor.batch([
    type: 'request',
    methodName: 'rpcMethodName', 
    params: [1, 1, 2]
]).then(() => {
    // ...
});
```

### subscribe
订阅事件

:::tip Tips
如果是采用`http`方式连接`Gvite`，`ViteJS`会自动采用轮询模式。
[具体参考GVite subscribe](/api/rpc/subscribe)
:::

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
// ...

provider.subscribe('newAccountBlocks').then((event) => {
    event.on((result) => {
        console.log(result);
    });
    // event.off();
}).catch(err => {
    console.warn(err);
});
```

### unsubscribe
取消订阅

- **Parameters**: 
  * `event`: subscribe返回的event

- **Example**
```javascript
// ...
provider.unsubscribe(event);
```

### unsubscribeAll
清空全部订阅

- **Example**
```javascript
// ...
provider.unsubscribeAll();
```
