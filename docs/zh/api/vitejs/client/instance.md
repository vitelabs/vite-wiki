# Client 实例
`Client extends netProcessor`

## Constructor

- **Constructor Parameters**
    * `provider : Provider 实例`
    * `firstConnectCb : function` : 首次连接后的回调函数

- **Example**
```javascript
import WS_RPC from '@vite/vitejs-WS';
import { client, constant } from '@vite/vitejs';

const { methods } = constant;
const wsProvider = new WS_RPC("ws://example.com");

const myClient = new Client(wsProvider, function(_myclient) {
    console.log("Connected.");
});

myClient.ledger.getSnapshotChainHeight().then((height) => {
    console.log(height);
});

const block = myclient.builtinTxBlock.getAccountBlock(
    //...
);

myclient.onroad.getOnroadBlocksByAddress.then((data) => {
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

myclient.getBalance.then(({balance, onroad}) => {
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

### callOffChainContract
查询合约状态。 *Gvite-RPC [contract_callOffChainMethod](../../rpc/contract.md)*

- **Parameters** 
    * `__namedParameters: object`
        - `addr : HexAddr` 合约账户地址
        - `abi`
        - `offChainCode : Hex` 合约代码

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
