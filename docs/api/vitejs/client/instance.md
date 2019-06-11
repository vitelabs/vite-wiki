# The Client Instance
`Client extends netProcessor`

## Constructor 

- **Constructor params**
    * `provider : Provider Instance`
    * `firstConnectCb : function` : Callback function of first connection

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
Get Balance. *Gvite-RPC [ledger_getAccountByAccAddr](../../rpc/ledger.md) + [onroad_getOnroadInfoByAddress](../../rpc/ledger.md)*

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
Get Transaction List. *Gvite-RPC [ledger_getBlocksByAccAddr](../../rpc/ledger.md) + [ledger_getAccountByAccAddr](../../rpc/ledger.md)*

- **Parameters** 
    * `__namedParameters: object`
        - `addr: Address`
        - `index: number` 
        - `pageCount?: number` Default 50
        - `totalNum?: number` Total transaction amount. If `totalNum === 0`, return Object`{ totalNum: 0, list: []  }`; If `!totalNum`, auto get totalNum with Gvite-RPC api `ledger_getAccountByAccAddr`.

- **Return**:
    * Promise<`{ list, totalNum }`>

### callOffChainContract
Query contract status. *Gvite-RPC [contract_callOffChainMethod](../../rpc/contract.md)*

- **Parameters** 
    * `__namedParameters: object`
        - `addr : HexAddr` Contract account address
        - `abi`
        - `offChainCode : Hex`

- **Return**:
    * Promise<`result`>

### sendTx
Send Transaction

- **Parameters** 
    * `accountBlock: AccountBlock` Formatted accountBlock (Signature not required)
    * `privateKey` Private Key

- **Return**:
    * Promise<`AccountBlock`>

### sendAutoPowTx
Automatically run PoW to send transactions when there is no quota

- **Parameters** 
    * `__namedParameters: object`
        - `accountBlock : AccountBlock` Formatted accountBlock (Signature not required)
        - `privateKey` Private Key
        - `usePledgeQuota : Boolean` Whether to use quotas preferentially

- **Return**:
    * Promise<`AccountBlock`>

### sendRawTx
Increase return value accountBlock. *Gvite-RPC [tx_sendRawTx](../../rpc/tx.md)*

- **Parameters** 
    * `__namedParameters: object`
        - `accountBlock : AccountBlock` Signed accountblock

- **Return**:
    * Promise<`AccountBlock`>
