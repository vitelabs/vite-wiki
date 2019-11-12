# The Client Instance
`Client extends netProcessor`

## Constructor 

- **Constructor params**
    * `provider : Provider Instance`
    * `firstConnectCb : function` : Callback function upon initial connection setup
    * `config: object`
        - `isDecodeTx? : boolean` : Whether the transaction should be decoded by built-in contracts' ABI when calling `client.getTxList`. Default is false. 

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
Get balance. This method will return information of both the account and un-received transactions. See [ledger_getAccountByAccAddr](../../rpcv1/ledger.md) and [onroad_getOnroadInfoByAddress](../../rpcv1/ledger.md) for more information

- **Parameters** 
    * `addr: Address`

- **Return**
    * `Promise<{ balance, onroad }>`

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
Get transaction list. See [ledger_getBlocksByAccAddr](../../rpcv1/ledger.md) and [ledger_getAccountByAccAddr](../../rpcv1/ledger.md) for more information

- **Parameters** 
    * `__namedParameters: object`
        - `addr: Address` Account address
        - `index: number` Page index
        - `pageCount?: number` Page size. Default is 50 
        - `totalNum?: number` Total transaction number returned. If `totalNum === 0`, Object`{ totalNum: 0, list: []  }` will be returned. If `!totalNum` is true, all transactions in `ledger_getAccountByAccAddr` will be returned

- **Return**:
    * `Promise<{ list, totalNum }>`

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
Query contract status off chain. See [contract_callOffChainMethod](../../rpcv1/contract.md) for more information

- **Parameters** 
    * `__namedParameters: object`
        - `addr : HexAddr` Contract address
        - `abi` Contract's ABI
        - `offChainCode : Hex` Contract's hex code
        - `params: Array`

- **Return**:
    * `Promise<result>`

### sendTx
Send transaction

- **Parameters** 
    * `accountBlock: AccountBlock` An `accountBlock` instance which stands for the transaction to be sent (un-signed)
    * `privateKey` Private Key

- **Return**:
    * `Promise<AccountBlock>`

### sendAutoPowTx
Send transaction. This method will automatically run PoW when the account's quota is insufficient

- **Parameters** 
    * `__namedParameters: object`
        - `accountBlock : AccountBlock` An `accountBlock` instance which stands for the transaction to be sent (un-signed)
        - `privateKey` Private Key
        - `usePledgeQuota : Boolean` Whether account's quota is used in preference (when sufficient)

- **Return**:
    * `Promise<AccountBlock>`

### sendRawTx
Send transaction. See [tx_sendRawTx](../../rpcv1/tx.md) for more information

- **Parameters** 
    * `__namedParameters: object`
        - `accountBlock : AccountBlock` An `accountblock` instance which stands for the transaction to be sent (signed)

- **Return**:
    * `Promise<AccountBlock>`

### addTxType
Add a new type for parsing transaction. Transactions will be parsed according to the transaction type and populated into `tx.txType` field when `client.getTxList` is called

:::tip Note
`addTxType` can be called multiple times. In this case, transaction type will accumulate
:::

- **Parameters** 
    * `__namedParameters: Object` Object.key is transaction type
        - `contractAddr : Address` Contract address
        - `abi : jsonInterface` Contract's ABI

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
