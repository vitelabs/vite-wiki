# Account

## 安装

:::demo
```bash tab:npm
npm install @vite/vitejs-account --save
```

```bash tab:yarn
yarn add @vite/vitejs-account
```
:::

## 引入

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

- **Constructor Parameters**: 
    * `__namedParameters : object`
        - `privateKey? : Hex` 私钥
        - `address?: Address` 地址
        - `client : Client` client实例
    * `__namedParameters? : object` Default { autoPow: false, usePledgeQuota: true }
        - `autoPow?: boolean` 配额不足时，发送交易是否默认运行PoW Default false
        - `usePledgeQuota? : boolean` 检查是否需要运行PoW时，是否优先使用配额 Default true

| privateKey | address | 是否可调用全部方法 | 是否自动生成私钥 | 是否自动生成地址| 描述 |
|:-----------:|:-----:|:-----:|:-----:|:-----:|:-----:|
| -- | -- | &#x2713; | &#x2713; | &#x2713; | |
| &#x2713; | -- | &#x2713; | -- | &#x2713; | |
| -- | &#x2713; | -- | -- | -- | 只能调用不使用私钥的方法，否则报错 |
| &#x2713; | &#x2713; | &#x2713; | -- | -- | 私钥和地址不匹配则报错 |

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
| privateKey | string | 私钥 |
| publicKey | string | 公钥 |
| address | Address | 地址 |
| balance | object | 余额 |
| autoPow | boolean | 是否自动运行PoW |
| usePledgeQuota | boolean | 检查PoW时，是否优先使用配额 |

## Methods

### clearPrivateKey
冻结账户并且清空私钥

### setPrivateKey

- **Parameters** 
    * `privateKey : string`

### getPublicKey

- **Return**:
    * `publicKey : Uint8Array with 32-byte public key`

### sign

- **Parameters** 
    * `hexStr : Hex` 需要签名的Hex-string

- **Return**:
    * `signature : string` 签名后的信息

### signAccountBlock

- **Parameters** 
    * `accountBlock : AccountBlock`

- **Return**:
    * `accountBlock : AccountBlock` 签名后的accountBlock

### activate
激活账户

1. 轮询账户余额 => 自动更新balance属性; 
2. 当发现在途时，会启动自动接收交易任务; 在途接收完成，任务停止。

- **Parameters** 
    * `intervals : number` 轮询间隔 Default 2000ms
    * `autoPow?: boolean` 发送交易配额不足时，是否默认运行PoW Default this.autoPow
    * `usePledgeQuota? : boolean` 检查是否需要运行PoW时，是否优先使用配额 Default this.usePledgeQuota

### freeze
冻结账户，停止激活状态

1. 停止轮询余额
2. 停止自动接收交易任务

### autoReceiveTx
启动自动接收交易任务

- **Parameters** 
    * `intervals : number` 轮询间隔 Default 2000ms
    * `autoPow?: boolean` 配额不足时，是否默认运行PoW Default this.autoPow
    * `usePledgeQuota? : boolean` 检查是否需要运行PoW时，是否优先使用配额 Default this.usePledgeQuota

### stopAutoReceiveTx
停止自动接收交易任务

### sendRawTx
发送原始交易。 *[client.sendTx](../client/client.md)*

- **Parameters** 
    * `accountBlock` 规范后的accountBlock（可以不包含accountAddress字段）

- **Return**
    * Promise<`AccountBlock`>

### sendAutoPowRawTx
当没有配额时，自动运行PoW发送原始交易。 *[client.sendAutoPowTx](../client/client.md)*

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
    1. *beforeCheckPow ? beforeCheckPow() : go to **2***
    2. Check PoW. [tx_calcPoWDifficulty](../../rpc/tx.md)
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
        - `methodName : string` `this.getBlock`中的方法名称
        - `params : Array` 传入`this.getBlock[methodName]`中的参数
        - `beforeCheckPow : Function`
        - `beforePow : Function`
        - `beforeSignTx? : Function`
        - `beforeSendTx : Function`
    
- **Return**
    * Promise<`{ lifeCycle, accountBlock, checkPowResult }`>

- **BeforeCheckPow**
    * **Parameters**
        - `accountBlock: AccountBlock` 不同类型的accountBlock（无PoW，无签名）
        - `next : Function`

    * **Return**
        - `next(<usePledgeQuota: boolean>)` 是否优先使用配额 Default true

- **BeforePow**
    * **Parameters**
        - `accountBlock: AccountBlock` 不同类型的accountBlock（无PoW，无签名）
        - `checkPowResult: <difficulty, quota>`
        - `next : Function`

    * **Return**
        - `next(<isReject: boolean>)` 是否打断交易流程. Default false

- **beforeSignTx**
    * **Parameters**
        - `accountBlock: AccountBlock` 在检查PoW（并可能运行PoW）后的accountBlock（无签名）
        - `checkPowResult: <difficulty, quota>`
        - `next : Function`

    * **Return**
        - `next(<isReject: boolean>)` 是否打断交易流程. Default false

- **BeforeSendTx**
    * **Parameters**
        - `accountBlock: AccountBlock` 签名后的accountBlock
        - `checkPowResult: <difficulty, quota>`
        - `next : Function`

    * **Return**
        - `next(<isReject: boolean>)` 是否打断交易流程. Default false

:::tip next
使用`next(true)`打断流程，会默认返回`Promise.resolve({ lifeCycle, accountBlock, checkPowResult });`

若希望自定义行为，可以`return Promise.reject() || new Promise((res, rej) => {})`
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

## 快速发送交易

Account 会自动从[client.builtinTxBlock](../client/builtinTxBlock.md)中获取生成块方法并进行封装。

### 实现方式
如果想自行实现此方法，可参照此调用逻辑进行封装。

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
        const _autoPow = autoPow === true || autoPow === false ? autoPow : !!this.autoPow;

        if (!_autoPow) {
            return this.sendRawTx(accountBlock);
        }
        return this.sendAutoPowRawTx(accountBlock, usePledgeQuota);
    };
}
```

### 调用方式

- **Parameters** 
    * `params : Array<accountBlock, requestType>` accountBlock（可以不包含accountAddress）
    * `autoPow？ : boolean` 是否自动运行PoW。Default `this.autoPow`
    * `usePledgeQuota? : boolean` 是否优先使用配额。Default `this.usePledgeQuota`

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
