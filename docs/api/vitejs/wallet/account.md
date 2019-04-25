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
        - `autoPow?: boolean` 发送交易是否默认运行PoW，Default false
        - `usePledgeQuota? : boolean` check是否运行PoW时，是否默认使用配额，Default true

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
| autoPow | boolean | 是否自动运行PoW |
| usePledgeQuota | boolean | 检查PoW时，是否默认使用配额 |

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
    * `autoPow?: boolean` 发送交易是否默认运行PoW，Default this.autoPow
    * `usePledgeQuota? : boolean` check是否运行PoW时，是否默认使用配额，Default this.usePledgeQuota

### freeze
Freeze account. Stop activating status.

1. Stop Checking balance.
2. Stop the automatic receiving transaction task.

### autoReceiveTx

- **Parameters** 
    * `intervals : number` Polling Intervals. Default 2000ms
    * `autoPow?: boolean` 发送交易是否默认运行PoW，Default this.autoPow
    * `usePledgeQuota? : boolean` check是否运行PoW时，是否默认使用配额，Default this.usePledgeQuota

### stopAutoReceiveTx
Stop auto receiving transaction

### sendRawTx
Send Original Transactions

- **Parameters** 
    * `accountBlock` Formatted accountBlock (可以不包含accountAddress字段)

- **Return**
    * Promise<`AccountBlock`>

### sendAutoPowRawTx
当没有配额时，自动运行PoW发送原始交易

- **Parameters** 
    * `accountBlock` 规范后的accountBlock（可以不包含accountAddress字段）
    * `usePledgeQuota : boolean` 是否优先使用配额，Default `this.usePledgeQuota`
    
- **Return**
    * Promise<`AccountBlock`>

### sendPowTx
发送一笔交易，传入不同阶段的函数回调，可用于执行自定义的用户行为，或者打断交易流程。

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
        - `methodName : string` `this.getBlock`中的方法名称
        - `params : Array` 传入`this.getBlock[methodName]`中的参数
        - `beforeCheckPow : Function`
        - `beforePow : Function`
        - `beforeSendTx : Function`
    
- **Return**
    * Promise<`{ lifeCycle, accountBlock, checkPowResult }`>

- **BeforeCheckPow**
    * **Parameters**
        - `accountBlock: AccountBlock`
        - `next : Function`

    * **Return**
        - `next(<usePledgeQuota: boolean>)` 是否优先使用配额 Default true

- **BeforePow**
    * **Parameters**
        - `accountBlock: AccountBlock`
        - `checkPowResult: <difficulty, quota>`
        - `next : Function`

    * **Return**
        - `next(<isReject: boolean>)` 是否打断交易流程. Default false

- **BeforeSendTx**
    * **Parameters**
        - `accountBlock: AccountBlock`
        - `checkPowResult: <difficulty, quota>`
        - `next : Function`

    * **Return**
        - `next(<isReject: boolean>)` 是否打断交易流程. Default false

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

Account 会自动从`client.builtinTxBlock`中获取生成块方法并进行封装。

### How to achieve in account instance

1. `accountBlock.accountAddress = this.address`
2. 通过block方法获取到合法块
3. 签名并发送AccountBlock

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
        return this._sendRawTx(block, autoPow, usePledgeQuota);
    };
}
```

### How to invoke

- **Parameters** 
    * `params : Array<accountBlock, requestType>` accountBlock（可以不包含accountAddress）
    * `autoPow？ : boolean` 是否自动运行PoW。Default `this.autoPow`
    * `usePledgeQuota? : boolean` 是否有效使用配额。Default `this.usePledgeQuota`

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
