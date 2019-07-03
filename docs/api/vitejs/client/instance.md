# The Client Instance
`Client extends netProcessor`

## Constructor 

- **Constructor params**
    * `provider : Provider Instance`
    * `firstConnectCb : function` : Callback function of first connection
    * `config: object`
        - `isDecodeTx? : boolean` : Default false. Whether to try to use the built-in contract decode transaction when calling `client.getTxList`.

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

### addTxType
Increase custom transaction type, when calling `client.getTxList` to get the transaction list, it will be parsed according to the new transaction type and populated into the `tx.txType` field.

:::tip
`addTxType` can be called multiple times, accumulate transaction type
:::

- **Parameters** 
    * `__namedParameters: Object` Object.key is transaction type
        - `contractAddr : Address` Contract address
        - `abi : jsonInterface`

- **Example**
```js ::Demo
import WS_RPC from '@vite/vitejs-WS';
import { client } from '@vite/vitejs';

const wsProvider = new WS_RPC("ws://example.com");

const myClient = new Client(wsProvider, function(_myclient) {
    console.log("Connected.");
});

const abi = { methodName: 'hello', inputs: [] };
const contractAddr = '';
myHTTPClient.addTxType({ 
    helloWorld: { 
        contractAddr: 'your contract address', 
        abi: 'your abi' // For example: { methodName: 'hello', inputs: [], type: 'function' }
    }
});
```