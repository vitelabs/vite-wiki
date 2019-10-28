# AccountBlock Class

补全accountBlock信息，并发送一个accountBlock

## How to Send AccountBlock

1. Create an AccountBlock instance
2. Configure `provider` and `privateKey`
   - `provider`: send the request
   - `privateKey`: sign the AccountBlock
3. Complete missing attributes of AccountBlock such as `height` and `previousHash`
4. Sign and send the AccountBlock

- **Example**

```javascript
async function sendAccountBlock() {
    // 1. Create an AccountBlock instance, then set `provider` and `privateKey`
    const myAccountBlock = createAccountBlock('send', {
        address: 'vite_553462bca137bac29f440e9af4ab2e2c1bb82493e41d2bc8b2',
        toAddress: 'vite_553462bca137bac29f440e9af4ab2e2c1bb82493e41d2bc8b2',
        tokenId: 'tti_5649544520544f4b454e6e40',
        amount: '0'
    }).setProvider(provider).setPrivateKey(privateKey);

    // 2. Auto-complete missing height and previousHash
    await myAccountBlock.autoSetProperty();

    // 3. Sign and send the AccountBlock
    const result = await myAccountBlock.sign().send();
    return result;
}
```

## Constructor

- **Constructor Parameters**
    * `__namedParameters: object`
        - `blockType: BlockType` Type of AccountBlock, mandatory
        - `address: Address` Address of current account, mandatory
        - `fee?: BigInt` Transaction fee, optional
        - `data?: Base64` Additional data, optional
        - `sendBlockHash?: Hex` Hash of the block of corresponding request transaction, mandatory for response block
        - `amount?: BigInt` Amount to transfer, including decimals, optional. For example, transferring 10 VITE, fill in `10000000000000000000`
        - `toAddress?: Address` Address of recipient, optional
        - `tokenId?: TokenId` Token id, optional
    * `ViteAPI?` `ViteAPI` instance
    * `Hex?` Private key

- **Example**

```javascript
import HTTP_RPC from '@vite/vitejs-http');
import { ViteAPI, accountBlock } from '@vite/vitejs';

const AccountBlock = accountBlock.AccountBlock;
const api = new ViteAPI(new HTTP_RPC("http://example.com"), () => {
    console.log("Connected");
});

const myAccountBlock = new AccountBlock({
    blockType: 2,
    address: 'your address',
    toAddress: 'your toAddress',
    tokenId: 'your tokenId',
    amount: 'your amount'
});
myAccountBlock.setProvider(api).setPrivateKey('your privateKey');

myAccountBlock.autoSend().then(data => {
    console.log('success', data);
}).catch(err => {
    console.warn(err);
});
```

## Properties

|  Name  | Type | Description |
|:------------:|:-----:|:-----:|
| blockType | BlockType | Type of AccountBlock 1->request(create contract). 2->request(transfer). 3->request(re-issue token). 4->response. 5->response(failed). 6->request(refund by contract). 7->response(genesis). |
| address | Address | Address of current account |
| fee |  BigInt | Transaction fee |
| data | Base64 | Optional data the transaction may carry |
| sendBlockHash | Hex | Hash of the block of corresponding request transaction. For response transaction only |
| toAddress | Address | Address of the account the transaction is sent to. Transaction recipient |
| tokenId | TokenId | Token id |
| amount | BigInt | Amount to transfer |
| height | Uint64 | Height of current account chain |
| previousHash | Hex | Hash of the block of previous transaction. For the first transaction of account, `0000000000000000000000000000000000000000000000000000000000000000` is filled |
| difficulty | BigInt | PoW difficulty |
| nonce | Base64 | PoW nonce |
| hash | Hex | Hash of AccountBlock |
| signature | Base64 | Signature |
| publicKey | Base64 | Public key of current account |
| accountBlock | AccountBlock | Complete AccountBlock instance |
| originalAddress | originalAddress | Original address of current account |
| isRequestBlock | Boolean | If `true`, the block is a request block |
| isResponseBlock | Boolean | If `true`, the block is a response block |

## Methods

### setProvider
Set provider

- **Parameters**: 
  * `ViteAPI` `ViteAPI` instance

- **Returns**:
    - this AccountBlock instance

- **Example**
```javascript
const myAccountBlock = new AccountBlock({
    blockType: 2,
    address: 'your address',
    toAddress: 'your toAddress',
    tokenId: 'your tokenId',
    amount: 'your amount'
});

myAccountBlock.setProvider(provider);
```

### setPrivateKey
Set private key

- **Parameters**: 
  * `Hex` privateKey

- **Returns**:
    - this AccountBlock instance

- **Example**
```javascript
const myAccountBlock = new AccountBlock({
    blockType: 2,
    address: 'your address',
    toAddress: 'your toAddress',
    tokenId: 'your tokenId',
    amount: 'your amount'
});

myAccountBlock.setPrivateKey('your privateKey');
```

### getPreviousAccountBlock
Get previous block of current account

- **Returns**:
    - Promise<`AccountBlock`>  Previous AccountBlock

- **Example**
```javascript
const myAccountBlock = new AccountBlock({
    blockType: 2,
    address: 'your address',
    toAddress: 'your toAddress',
    tokenId: 'your tokenId',
    amount: 'your amount'
}).setProvider(provider);

myAccountBlock.getPreviousAccountBlock().then((previousAccountBlock) => {
    console.log('previousAccountBlock', previousAccountBlock);
});
```

### setPreviousAccountBlock
Set previous account block. This method will set `height` and `previousHash` based on the previous block.

```javascript
height = previousAccountBlock ? previousAccountBlock.height + 1 : 1
previousHash = previousAccountBlock ? previousAccountBlock.hash : '0000000000000000000000000000000000000000000000000000000000000000'
```

- **Parameters**: 
  * `AccountBlock` previousAccountBlock

- **Returns**:
    - this AccountBlock instance

- **Example**
```javascript
async function test() {
    const myAccountBlock = new AccountBlock({
        blockType: 2,
        address: 'your address',
        toAddress: 'your toAddress',
        tokenId: 'your tokenId',
        amount: 'your amount'
    }).setProvider(provider);

    // Usually work together with getPreviousAccountBlock
    const previousAccountBlock = await myAccountBlock.getPreviousAccountBlock();
    myAccountBlock.setPreviousAccountBlock(previousAccountBlock);
}
```

### autoSetPreviousAccountBlock
Set previous account block. This is the aggregation method of `getPreviousAccountBlock` and `setPreviousAccountBlock`

- **Returns**:
    - Promise<{ `height: Uint64; previousHash: Hex` }> 

- **Example**
```javascript
const myAccountBlock = new AccountBlock({
    blockType: 2,
    address: 'your address', 
    toAddress: 'your toAddress',
    tokenId: 'your tokenId',
    amount: 'your amount'
}).setProvider(provider);

myAccountBlock.autoSetPreviousAccountBlock().then(({ height, previousHash }) => {
    console.log('height', height);
    console.log('previousHash', previousHash);
});
```

### getDifficulty
Return PoW difficulty

:::warning Note
Set `previousHash` first before calling this method. Call `autoSetPreviousAccountBlock` to set `previousHash`.
:::

- **Returns**
    - Promise<`BigInt`>  PoW difficulty

- **Example**
```javascript
async function test() {
    const transferAccountBlock = new AccountBlock({
        blockType: 2,
        address: 'your address',
        toAddress: 'your toAddress',
        tokenId: 'your tokenId',
        amount: 'your amount'
    }).setProvider(provider);

    await transferAccountBlock.autoSetPreviousAccountBlock();
    await transferAccountBlock.getDifficulty();

    console.log('difficulty', transferAccountBlock.difficulty);
}
```

### setDifficulty
Set PoW difficulty to account block

- **Parameters**: 
  * `BigInt` PoW difficulty

- **Returns**:
    - this AccountBlock instance

- **Example**
```javascript
async function test() {
    const transferAccountBlock = new AccountBlock({
        blockType: 2,
        address: 'your address',
        toAddress: 'your toAddress',
        tokenId: 'your tokenId',
        amount: 'your amount'
    }).setProvider(provider);

    await transferAccountBlock.autoSetPreviousAccountBlock();
    const difficulty = await transferAccountBlock.getDifficulty();
    transferAccountBlock.setDifficulty(difficulty);
}
```

### autoSetDifficulty
Auto-set PoW difficulty to account block. This is the aggregation method of `getDifficulty` and `setDifficulty`

:::warning Note
Set `previousHash` first before calling this method. Call `autoSetPreviousAccountBlock` to set `previousHash`.
:::

- **Returns**:
    - Promise<`BigInt`> PoW difficulty

- **Example**
```javascript
async function test() {
    const transferAccountBlock = new AccountBlock({
        blockType: 2,
        address: 'your address',
        toAddress: 'your toAddress',
        tokenId: 'your tokenId',
        amount: 'your amount'
    }).setProvider(provider);

    await transferAccountBlock.autoSetPreviousAccountBlock();
    await transferAccountBlock.autoSetDifficulty();

    console.log(transferAccountBlock.difficulty);
}
```

### setNonce
Set PoW nonce to account block

- **Parameters**: 
  * `Base64` nonce

- **Returns**:
    - this AccountBlock instance

- **Example**
```javascript
async function test() {
    const transferAccountBlock = new AccountBlock({
        blockType: 2,
        address: 'your address',
        toAddress: 'your toAddress',
        tokenId: 'your tokenId',
        amount: 'your amount'
    }).setProvider(provider);

    await transferAccountBlock.autoSetPreviousAccountBlock();
    await transferAccountBlock.autoSetDifficulty();
    // Usually work together with getNonce
    const nonce = await transferAccountBlock.getNonce();
    transferAccountBlock.setNonce(nonce);

    console.log(transferAccountBlock.nonce);
}
```

### setPublicKey
Set public key to account block

- **Parameters**: 
  * `Hex | Base64` Public key

- **Returns**:
    - this AccountBlock instance

- **Example**
```javascript
const transferAccountBlock = new AccountBlock({
    blockType: 2,
    address: 'your address',
    toAddress: 'your toAddress',
    tokenId: 'your tokenId',
    amount: 'your amount'
}).setProvider(provider);

transferAccountBlock.setPublicKey('your publicKey');
```

### setSignature
Set signature to account block

- **Parameters**: 
  * `Hex | Base64` Signature

- **Returns**:
    - this AccountBlock instance

- **Example**
```javascript
const transferAccountBlock = new AccountBlock({
    blockType: 2,
    address: 'your address',
    toAddress: 'your toAddress',
    tokenId: 'your tokenId',
    amount: 'your amount'
}).setProvider(provider);

transferAccountBlock.setSignature('your signature');
```

### sign
Sign account block

:::warning Note
Complete all necessary block properties first before calling this method. Call `autoSetProperty` to set block properties. If quota is acquired through PoW, run `PoW` method to set the properties too.
:::

- **Parameters**: 
  * `Hex?` Private key. Default is `this.privateKey`

- **Returns**:
    - this AccountBlock instance

- **Example**
```javascript
async function test() {
    const transferAccountBlock = new AccountBlock({
        blockType: 2,
        address: 'your address',
        toAddress: 'your toAddress',
        tokenId: 'your tokenId',
        amount: 'your amount'
    }).setProvider(provider);

    await transferAccountBlock.autoSetPreviousAccountBlock();
    transferAccountBlock.sign(privateKey);
}
```

### send
Send account block. The account block must be complete.

- **Returns**:
    - Promise<`AccountBlock`> 

- **Example**
```javascript
async function test() {
    const transferAccountBlock = new AccountBlock({
        blockType: 2,
        address: 'your address',
        toAddress: 'your toAddress',
        tokenId: 'your tokenId',
        amount: 'your amount'
    }).setProvider(provider);

    await transferAccountBlock.autoSetPreviousAccountBlock();
    transferAccountBlock.sign(privateKey);
    const result = await transferAccountBlock.send();

    console.log('send success', result);
}
```

### autoSend
Auto-set properties, sign, then send the account block. This is the aggregation method of `autoSetPreviousAccountBlock`, `sign` and `send`


- **Parameters**: 
  * `Hex?` Private key. Default is `this.privateKey`

- **Returns**:
    - Promise<`AccountBlock`> 

- **Example**
```javascript
async function test() {
    const transferAccountBlock = new AccountBlock({
        blockType: 2,
        address: 'your address',
        toAddress: 'your toAddress',
        tokenId: 'your tokenId',
        amount: 'your amount'
    }, provider, privateKey);
    const result = await transferAccountBlock.autoSend();
    console.log('send success', result);
}
```


## 配额不足

具体了解[配额](../../../tutorial/rule/quota.md)

当账户配额不足时，则会发送交易失败。`{"code":-35002,"message":"out of quota"}`

解决方案为获取配额，[获取配额有两种方式](../../../tutorial/rule/quota#获取配额的两种方式)：抵押 或者 PoW。

### 抵押
如何发起抵押请求，详见[createAccountBlock](./createAccountBlock.md)

- **example**
```javascript
// .....

const address = 'vite_553462bca137bac29f440e9af4ab2e2c1bb82493e41d2bc8b2';  // your Address
const provider = 'your provider';
const privateKey = 'your privateKey';

const accountBlock = createAccountBlock('stakeForQuota', {
    address,
    beneficiaryAddress: address,    // 配额受益地址
    amount: '134000000000000000000' // 至少134Vite
});

accountBlock.setProvider(provider).setPrivateKey(privateKey);

accountBlock.autoSend().then(() => {
    // 发送抵押请求成功
}).catch(err => {
    console.warn(err);
    // 发送抵押请求失败
});

// 检查配额
provider.request('contract_getQuotaByAccount', address).then(result => {
    console.log(result);
}).catch(err => {
    console.warn(err);
});
```

### PoW

具体了解[PoW计算](../../../tutorial/rule/quota#计算pow)

GVite-RPC 也提供获取 nonce 的方法，可参考 `util_getPoWNonce`

1. 首先获取 PoW难度: difficulty
2. 根据 difficulty 计算 nonce
3. 将 difficulty + nonce 分别填入accountBlock信息中

- **example**
```javascript
import { utils, wallet, accountBlock, ViteAPI } from '@vite/vitejs';
import HTTP_RPC from "@vite/vitejs-http";

const { createAccountBlock } = accountBlock;

const PoW = async () => {
    const provider = new ViteAPI(new HTTP_RPC('http://example.com'));
    const privateKey = 'your privateKey';

    const accountBlock = createAccountBlock(/* type **/, /* parameters **/);
    accountBlock.setProvider(provider).setPrivateKey(privateKey);

    await accountBlock.autoSetPreviousAccountBlock();

    // 得到difficulty
    const difficulty = await provider.request('ledger_getPoWDifficulty', {
        address: accountBlock.address,
        previousHash: accountBlock.previousHash,
        blockType: accountBlock.blockType,
        toAddress: accountBlock.toAddress,
        data: accountBlock.data
    });

    // 1. 使用自己的PoW服务通过difficulty计算出nonce, 以base64-string形式设置
    // 2. 当前 GVite-RPC 也提供根据difficulty计算nonce的方法, 以 GVite-Rpc 为例, 调用方式如下

    const getNonceHashBuffer = Buffer.from(accountBlock.originalAddress + accountBlock.previousHash, 'hex');
    const getNonceHash = utils.blake.blake2bHex(getNonceHashBuffer, null, 32);
    const nonce = await yourPoWProvider.request('util_getPoWNonce', difficulty, getNonceHash)

    accountBlock.setDifficulty(difficulty);
    accountBlock.setNonce(nonce);

    await accountBlock.sign().send();
}
```
