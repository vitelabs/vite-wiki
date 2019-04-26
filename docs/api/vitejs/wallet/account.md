# Account

## Installation

:::demo
```bash tab:npm
npm install @vite/vitejs-account --save
```

```bash tab:yarn
yarn add @vite/vitejs-account
```
:::

## Import

:::demo
```javascript tab:ES6
import { account } from '@vite/vitejs';
// Or
import account from '@vite/vitejs-account';
```

```javascript tab:require
const { account } = require('@vite/vitejs-account');
```
:::

## Constructor
`Account extends AddrAccount`

- **constructor params**: 
    * `__namedParameters: object`
        - `privateKey? : string` Private Key
        - `client : Client` Client Instance
    * `__namedParameters? : object` Default { autoPow: false, usePledgeQuota: true }
        - `autoPow?: boolean` Whether to run PoW by default when sending a transaction without quota. Default false
        - `usePledgeQuota? : boolean` Whether the quota is used preferentially, when checking if you need to run pow. Default true

- **Example**: 
```javascript
import WS_RPC from '@vite/vitejs-ws';
import { client, account, utils } from '@vite/vitejs';

let provider = new WS_RPC("ws://example.com");
let myClient = new client(provider);

let myAccount = new account({
    client: myClient
});

myAccount.getBalance().then((result) => {
    console.log(result);
}).catch((err) => {
    console.warn(err);
});
```

## Properties

|  Name  | Type | Description |
|:------------:|:-----:|:-----:|
| privateKey | string | Private Key |
| publicKey | string | Public Key |
| balance | object | Account Balance |
| autoPow | boolean | Whether to automatically run PoW when the quota is insufficient |
| usePledgeQuota | boolean | Whether the quota is used preferentially, when checking if you need to run pow |

## Methods

### getPublicKey

- **Return**:
    * `publicKey : Uint8Array with 32-byte public key` 

### sign

- **Parameters** 
    * `hexStr : string` Hex-String needs to be signed

- **Return**:
    * `signature : string` Results after signing


### activate
Activate Account

1. Polling account balance, and auto update `this.balance`.
2. It will initiate an automatic receiving transaction task when this account has onroad info; when the receiving is completed, the task stops.

- **Parameters** 
    * `intervals : number` Polling Intervals. Default 2000ms
    * `autoPow?: boolean` Whether to run PoW by default when sending a transaction without quota. Default this.autoPow
    * `usePledgeQuota? : boolean` Whether the quota is used preferentially, when checking if you need to run pow. Default this.usePledgeQuota

### freeze
Freeze account. Stop activating status.

1. Stop Checking balance.
2. Stop the automatic receiving transaction task.

### autoReceiveTx

- **Parameters** 
    * `intervals : number` Polling Intervals. Default 2000ms
    * `autoPow?: boolean` Whether to automatically run PoW when the quota is insufficient. Default this.autoPow
    * `usePledgeQuota? : boolean` Whether the quota is used preferentially, when checking if you need to run pow. Default this.usePledgeQuota

### stopAutoReceiveTx
Stop auto receiving transaction

### sendRawTx
Send Original Transactions

- **Parameters** 
    * `accountBlock` Formatted accountBlock (Can have no accountAddress field)

- **Return**
    * Promise<`AccountBlock`>

### sendAutoPowRawTx
When the quota is insufficient, automatically run PoW to send original transaction.

- **Parameters** 
    * `accountBlock: AccountBlock` Formatted accountBlock (Can have no accountAddress field)
    * `usePledgeQuota : boolean` Whether the quota is used preferentially, when checking if you need to run pow. Default `this.usePledgeQuota`
    
- **Return**
    * Promise<`AccountBlock`>

### sendPowTx
Send a transaction. Use different function callbacks to perform custom user actions or interrupt the transaction process.

:::tip LifeCycle
* **start**
    1. Get block. `this.getBlock[methodName](...params)`
* **beforeCheckPow** 
    1. *beforeCheckPow ? beforeCheckPow() : go to 2*
    2. Check PoW. `tx_calcPoWDifficulty` 
* **checkPowDone**
    1. If need PoW go to 2; else go to **powDone**.
    2. *beforePow ? beforePow() : go to **checkPowDone 3***
    3. Run PoW. 
* **powDone** 
    1. *beforeSendTx ? beforeSendTx() : go to **powDone 2***
    2. If need send Tx go to 3; else break.
    3. Send TX. 
* **finish**
:::

- **Parameters** 
    * `__namedParameters : object`
        - `methodName : string` Method name in `this.getBlock`
        - `params : Array` Parameters in `this.getBlock[methodName]`
        - `beforeCheckPow? : Function`
        - `beforePow? : Function`
        - `beforeSendTx? : Function`
    
- **Return**
    * Promise<`{ lifeCycle, accountBlock, checkPowResult }`>

- **BeforeCheckPow**
    * **Parameters**
        - `accountBlock: AccountBlock`
        - `next : Function`

    * **Return**
        - `next(<usePledgeQuota: boolean>)` Whether the quota is used preferentially, when checking if you need to run pow.  Default true

- **BeforePow**
    * **Parameters**
        - `accountBlock: AccountBlock`
        - `checkPowResult: <difficulty, quota>`
        - `next : Function`

    * **Return**
        - `next(<isReject: boolean>)` Whether to interrupt the transaction process. Default false

- **BeforeSendTx**
    * **Parameters**
        - `accountBlock: AccountBlock`
        - `checkPowResult: <difficulty, quota>`
        - `next : Function`

    * **Return**
        - `next(<isReject: boolean>)` Whether to interrupt the transaction process. Default false

- **Example**
```javascript
// ...

const result = await myAccount.sendPowTx({
    methodName: 'asyncSendTx',
    params: [{
        toAddress: myAccount.address,
        tokenId: Vite_TokenId,
        amount: '100'
    }],
    beforeCheckPow: (accountBlock, next) => {
        console.log('[beforeCheckPow]', accountBlock);
        return next();
    },
    beforePow: (accountBlock, checkPowResult, next) => {
        console.log('[beforePow]', accountBlock, checkPowResult);
        return next();
    },
    beforeSendTx: (accountBlock, checkPowResult, next) => {
        console.log('[beforeSendTx]', accountBlock, checkPowResult);
        return next();
    }
});

console.log('[LOG] SendTx', result, '\n');
return result;
```

## How to send tx quickly

Account will automatically wrap the method in `client.builtinTxBlock`.

### How to achieve in account instance
If you want to implement this method yourself, you can refer to this call logic for encapsulation.

1. `accountBlock.accountAddress = this.address`
2. Get the legal block by `this.getBlock[methodName]`
3. Sign and send the AccountBlock

- **Code**
```javascript
for (const key in this._client.builtinTxBlock) {
    if (key === '_client' || key.endsWith('Block')) {
        continue;
    }

    let _key = key;
    if (_key.startsWith('async')) {
        _key = _key.replace('async', '');
        _key = _key[0].toLocaleLowerCase() + _key.slice(1);
    }

    this[_key] = async (params, autoPow?, usePledgeQuota?) => {
        params.accountAddress = this.address;
        const block = await this.getBlock[key](params);
        const _autoPow = autoPow === true || autoPow === false ? autoPow : !!this.autoPow;

        if (!_autoPow) {
            return this.sendRawTx(accountBlock);
        }
        return this.sendAutoPowRawTx(accountBlock, usePledgeQuota);
    };
}
```

### How to invoke

- **Parameters** 
    * `params : Array<accountBlock, requestType>` accountBlock (Can have no accountAddress field)
    * `autoPow？ : boolean` Whether to automatically run pow when there is no quota. Default `this.autoPow`
    * `usePledgeQuota? : boolean` Whether the quota is used preferentially, when checking if you need to run pow. Default `this.usePledgeQuota`

- **Return**
    * Promise<`AccountBlock`>

- **Example**
```javascript
// ....

const result = await myAccount.SBPreg({
    nodeName: 'TEST_NODE',
    toAddress: myAccount.address,
    amount: '100000000000000000000000',
    tokenId: Vite_TokenId
});

console.log('[LOG] SBPreg', result, '\n');
return result;
```
