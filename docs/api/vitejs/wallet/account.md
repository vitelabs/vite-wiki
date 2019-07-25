# Account

`Account extends AddrAccount` 

Use the private key to generate an Account instance. In addition to all the functions of AddrAccount, you can also quickly send transactions, as well as a variety of signature-related operations.

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
        - `address?: Address` Address
        - `client : Client` Client Instance
    * `__namedParameters? : object` Default { autoPow: false, usePledgeQuota: true }
        - `autoPow?: boolean` Whether to run PoW by default when sending a transaction without quota. Default false
        - `usePledgeQuota? : boolean` Whether the quota is used preferentially, when checking if you need to run pow. Default true

| privateKey | address | All methods can be called | Automatic generation of private keys | Automatic generation of address | Description |
|:-----------:|:-----:|:-----:|:-----:|:-----:|:-----:|
| -- | -- | &#x2713; | &#x2713; | &#x2713; | |
| &#x2713; | -- | &#x2713; | -- | &#x2713; | |
| -- | &#x2713; | -- | -- | -- | Can only call methods that do not use a private key, otherwise throw an error |
| &#x2713; | &#x2713; | &#x2713; | -- | -- | If the private key and address do not match, throw an error |

## Example

```javascript
const { WS_RPC } = require('@vite/vitejs-ws');
const { client, account, utils, constant } = require('@vite/vitejs');

let { Vite_TokenId } = constant;

let provider = new WS_RPC("ws://example.com");
let myClient = new client(provider);

let myAccount = new account({
    client: myClient,
    privateKey: 'your privateKey'   // Notice: PrivateKey is not mnemonic. A privateKey generates an address.
});

myAccount.getBalance().then((result) => {
    console.log(result);
}).catch((err) => {
    console.warn(err);
});

// Please ensure that you have balance. Quotas are required for sending transactions, so that you can get quotas first.
myAccount.getQuota({
    toAddress: myAccount.address,
    tokenId: Vite_TokenId,
    amount: '134000000000000000000' // 至少 134 Vite
}).then((accountBlock) => {
    console.log(accountBlock);
});

myAccount.getTxList({
    index: 0,
    pageCount: 50
}).then((data) => {
    let txList = data.list || [];
    console.log(txList);
});

myAccount.sendTx({
    toAddress: 'Your toAddress',
    amount: '10000000000000000000',    // 10Vite + 18个0
    tokenId: Vite_TokenId
}).then((accountBlock) => {
    console.log(accountBlock);
}).catch((err) => {
    console.log(err);
});

myAccount.getOnroadBlocks({
    index: 0,
    pageCount: 10
}).then((data) => {
    if (!data || !data.length) {
        console.log('No onroad');
        return;
    }

    // When found onroad-blocks, you can start receiving.
    myAccount.receiveTx({
        fromBlockHash: data[0].hash
    }).then((accountBlock) => {
        console.log(accountBlock);
    });
});
```

## Properties

|  Name  | Type | Description |
|:------------:|:-----:|:-----:|
| privateKey | string | Private Key |
| publicKey | string | Public Key |
| address | Address | Address |
| balance | object | Account Balance |
| autoPow | boolean | Whether to automatically run PoW when the quota is insufficient |
| usePledgeQuota | boolean | Whether the quota is used preferentially, when checking if you need to run pow |

## Methods

### getBlock
[Refer to addrAccount.getblock](./addrAccount)

### clearPrivateKey
Freeze account and clear privateKey

### setPrivateKey

- **Parameters** 
    * `privateKey : string`

### getPublicKey

- **Return**:
    * `publicKey : Uint8Array with 32-byte public key` 

### sign

- **Parameters** 
    * `hexStr : string` Hex-String needs to be signed

- **Return**:
    * `signature : string` Results after signing

### signAccountBlock

- **Parameters** 
    * `accountBlock : AccountBlock`

- **Return**:
    * `accountBlock : AccountBlock` Signed accountBlock

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
Send Original Transactions ([client.sendTx](../client/client.md))

- **Parameters** 
    * `accountBlock` Formatted accountBlock (Can have no accountAddress field)

- **Return**
    * Promise<`AccountBlock`>

### sendAutoPowRawTx
When the quota is insufficient, automatically run PoW to send original transaction. *[client.sendAutoPowTx](../client/client.md)*

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
    1. *beforeCheckPow ? beforeCheckPow() : go to **2***
    2. Check PoW. [tx_calcPoWDifficulty](/api/rpc/tx.md)
* **checkPowDone**
    1. The check results, if need PoW go to **2**; else go to **powDone 1**.
    2. *beforePow ? beforePow() : go to **3***
    3. `next(isReject = false)` If need PoW go to **4**; else break.
    4. Run PoW. 
* **powDone** 
    1. *beforeSignTx ? beforeSignTx() : go to **2***
    2. `next(isReject = false)` If need sign Tx go to **3**; else break.
    3. Sign TX. 
* **signDone**
    1. *beforeSendTx ? beforeSendTx() : go to **2***
    2. `next(isReject = false)` If need send Tx go to 3; else break.
    3. Send TX. 
* **finish**
:::

- **Parameters** 
    * `__namedParameters : object`
        - `methodName : string` Method name in `this.getBlock`
        - `params : Array` Parameters in `this.getBlock[methodName]`
        - `beforeCheckPow? : Function`
        - `beforePow? : Function`
        - `beforeSignTx? : Function`
        - `beforeSendTx? : Function`
    
- **Return**
    * Promise<`{ lifeCycle, accountBlock, checkPowResult }`>

- **BeforeCheckPow**
    * **Parameters**
        - `accountBlock: AccountBlock` Different types of accountBlock (no PoW, no signature)
        - `next : Function`

    * **Return**
        - `next(<usePledgeQuota: boolean>)` Whether the quota is used preferentially, when checking if you need to run pow.  Default true

- **BeforePow**
    * **Parameters**
        - `accountBlock: AccountBlock` Different types of accountBlock (no PoW, no signature)
        - `checkPowResult: <difficulty, quota>`
        - `next : Function`

    * **Return**
        - `next(<isReject: boolean>)` Whether to interrupt the transaction process. Default false

- **beforeSignTx**
    * **Parameters**
        - `accountBlock: AccountBlock` AccountBlock (no signature) after checking PoW (and possibly PoW)
        - `checkPowResult: <difficulty, quota>`
        - `next : Function`

    * **Return**
        - `next(<isReject: boolean>)` Whether to interrupt the transaction process. Default false

- **BeforeSendTx**
    * **Parameters**
        - `accountBlock: AccountBlock` Signed accountblock
        - `checkPowResult: <difficulty, quota>`
        - `next : Function`

    * **Return**
        - `next(<isReject: boolean>)` Whether to interrupt the transaction process. Default false

:::tip next
Use `next(true)` to interrupt the process, will return `Promise.resolve({ lifeCycle, accountBlock, checkPowResult });`

If you want to customize the behavior, you can `return Promise.reject() || new Promise((res, rej) => {})`
:::

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
    beforeSignTx: (accountBlock, checkPowResult, next) => {
        console.log('[beforeSignTx]', accountBlock, checkPowResult);
        return next(false);
    },
    beforeSendTx: (accountBlock, checkPowResult, next) => {
        console.log('[beforeSendTx]', accountBlock, checkPowResult);
        return next();
    }
});

console.log('[LOG] SendTx', result, '\n');
return result;
```

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
        // Break
        return next(true);
    }
});

console.log('[LOG] SendTx', result, '\n');
return result;
```

```javascript
// ...

const result = await myAccount.sendPowTx({
    methodName: 'asyncSendTx',
    params: [{
        toAddress: myAccount.address,
        tokenId: Vite_TokenId,
        amount: '100'
    }],
    beforePow: (accountBlock, checkPowResult, next) => {
        console.log('[beforePow]', accountBlock, checkPowResult);
        if (checkPowResult.diffculty) {
            // Break
            return Promise.reject();
        }
        return next();
    },
});

console.log('[LOG] SendTx', result, '\n');
return result;
```

## How to send tx quickly

Account will automatically wrap the method in [client.builtinTxBlock](../client/builtinTxBlock.md).

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
