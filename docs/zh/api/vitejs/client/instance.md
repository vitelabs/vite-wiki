# Client 实例
`Client extends netProcessor`

## Constructor

- **Constructor Parameters**
    * `provider : Provider 实例`
    * `firstConnectCb : function` : 首次连接后的回调函数
    * `config: object`
        - `isDecodeTx? : boolean` : Default false 调用`client.getTxList`时，是否尝试用内置合约decode交易。

- **Example**
```javascript
import WS_RPC from '@vite/vitejs-ws';
import { client, constant } from '@vite/vitejs';

const { methods } = constant;
const wsProvider = new WS_RPC("ws://example.com");

const myClient = new client(wsProvider, function(_myclient) {
    console.log("Connected.");
});

myClient.ledger.getSnapshotChainHeight().then((height) => {
    console.log(height);
});

const block = myClient.builtinTxBlock.getAccountBlock(
    //...
);

myClient.onroad.getOnroadBlocksByAddress.then((data) => {
    console.log(data);
});

myClient.request(methods.ledger.getLatestSnapshotChainHash).then(()=>{
    // ......
})

myClient.subscribeFunc.newAccountBlocksFilter().then(()=>{
    // ......
});

myClient.request(methods.subscribe.newAccountBlocksFilter).then(()=>{
    // ......
});
```

## Methods

### getBalance
获取余额。 *Gvite-RPC [ledger_getAccountByAccAddr](../../rpc/ledger.md) + [onroad_getOnroadInfoByAddress](../../rpc/ledger.md)*
- **Parameters** 
    * `addr: Address`

- **Return**
    * Promise<`{ balance, onroad }`>

- **Example**
```javascript
// ...

myClient.getBalance.then(({balance, onroad}) => {
    console.log(balance, onroad);
}).catch(err => {
    console.warn(err);
});
```

### getTxList
获取交易列表。 *Gvite-RPC [ledger_getBlocksByAccAddr](../../rpc/ledger.md) + [ledger_getAccountByAccAddr](../../rpc/ledger.md)*

- **Parameters** 
    * `__namedParameters: object`
        - `addr: Address`
        - `index: number` 
        - `pageCount?: number` Default 50
        - `totalNum?: number` 总交易量. 如果 `totalNum === 0`, 返回 Object`{ totalNum: 0, list: []  }`; 如果 `!totalNum`, 自动请求 Gvite-RPC 接口 `ledger_getAccountByAccAddr` 获取totalNum.

- **Return**:
    * Promise<`{ list, totalNum }`>

- **Example**

:::demo
```javascript tab:request
myClient.getTxList({
    addr: 'your address',
    index: 0,
    pageCount: 50
});
```

```json tab:responce
{
    "list": [{
        "accountAddress": "vite_553462bca137bac29f440e9af4ab2e2c1bb82493e41d2bc8b2",
        "amount": "100000000",
        "blockType": 2,
        "data": "y/Dk+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAjhvJvwQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAI4byb8EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAtjc3Rlc3R0b2tlbgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEQ1NUVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=",
        "toAddress": "vite_000000000000000000000000000000000000000595292d996d",
        "txType": "Mintage",
        "contract": {
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
    }],
    "totalNum": "1"
}
```
:::

### callOffChainContract
查询合约状态。 *Gvite-RPC [contract_callOffChainMethod](../../rpc/contract.md)*

- **Parameters** 
    * `__namedParameters: object`
        - `addr : HexAddr` 合约账户地址
        - `abi`
        - `offChainCode : Hex` 合约代码
        - `params: Array`

- **Return**:
    * Promise<`result`>

### sendTx
发送交易

- **Parameters** 
    * `accountBlock: AccountBlock` 规范化后的accountBlock (无需签名)
    * `privateKey` 私钥

- **Return**:
    * Promise<`AccountBlock`>

### sendAutoPowTx
当没有配额时，自动运行PoW发送交易

- **Parameters** 
    * `__namedParameters: object`
        - `accountBlock : AccountBlock` 规范化后的accountBlock (无需签名)
        - `privateKey` 私钥
        - `usePledgeQuota : Boolean` 是否优先使用配额

- **Return**:
    * Promise<`AccountBlock`>

### sendRawTx
增加返回值accountBlock。 *Gvite-RPC [tx_sendRawTx](../../rpc/tx.md)*

- **Parameters** 
    * `__namedParameters: object`
        - `accountBlock : AccountBlock` 签名后的accountBlock

- **Return**:
    * Promise<`AccountBlock`>

### addTxType
增加自定义交易类型，通过`client.getTxList`获取交易列表时，会根据新增交易类型进行解析，并填充至`tx.txType`字段中

:::tip
`addTxType`可多次调用，累加交易类型
:::

- **Parameters** 
    * `__namedParameters: Object` Object.key 是交易类型
        - `contractAddr : Address` 合约地址
        - `abi : jsonInterface`

- **Example**
```js ::Demo
import WS_RPC from '@vite/vitejs-ws';
import { client } from '@vite/vitejs';

const wsProvider = new WS_RPC("ws://example.com");

const myClient = new client(wsProvider, function(_myclient) {
    console.log("Connected.");
});

myClient.addTxType({ 
    helloWorld: { 
        contractAddr: 'your contract address', 
        abi: 'your abi' // For example: { methodName: 'hello', inputs: [], type: 'function' }
    }
});
```
