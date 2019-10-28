# accountBlock 类

补全accountBlock信息，并发送一个accountBlock

## 如何发送一个accountBlock

1. 得到一个AccountBlock实例
2. 配置 provider 和 privateKey
    - provider: 用于发送请求
    - privateKey: 用于签名AccountBlock
3. 补全AccountBlock缺少的属性（height、previousHash）
4. 签名并发送AccountBlock

- **Example**

```javascript
async function sendAccountBlock() {
    // 1. 得到一个AccountBlock实例, 并设置 provider 和 privateKey
    const myAccountBlock = createAccountBlock('send', {
        address: 'vite_553462bca137bac29f440e9af4ab2e2c1bb82493e41d2bc8b2',
        toAddress: 'vite_553462bca137bac29f440e9af4ab2e2c1bb82493e41d2bc8b2',
        tokenId: 'tti_5649544520544f4b454e6e40',
        amount: '0'
    }).setProvider(provider).setPrivateKey(privateKey);

    // 2. 自动设置previousAccountBlock
    await myAccountBlock.autoSetPreviousAccountBlock();

    // 3. 签名并发送AccountBlock
    const result = await myAccountBlock.sign().send();
    return result;
}
```

## Constructor

- **Constructor Parameters**
    * `__namedParameters: object`
        - `blockType: BlockType` 必填，AccountBlock类型
        - `address: Address` 必填，账户块所属的账户地址
        - `fee?: BigInt` 选填，手续费
        - `data?: Base64` 选填，备注
        - `sendBlockHash?: Hex` 选填，当AccountBlock为响应块时，必填；其值为对应的请求块的hash
        - `amount?: BigInt` 选填，转账金额（必须为最小单位，不支持小数和科学计数法，比如 10Vite应填 => 10000000000000000000）
        - `toAddress?: Address` 选填，响应账户地址
        - `tokenId?: TokenId` 选填，代币ID
    * `ViteAPI?` 即`ViteAPI`实例
    * `Hex?` privateKey

- **Example**

```javascript
import HTTP_RPC from '@vite/vitejs-http');
import { ViteAPI, accountBlock } from '@vite/vitejs';

// accountBlock 本身包含相关类库，以及AccountBlock类
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
| blockType | BlockType | AccountBlock类型 1 创建合约请求 2 转账或调用合约请求 3 增发请求 4 响应 5 响应失败 6 退款请求 7 创世响应 |
| address | Address | 账户块所属的账户地址  |
| fee |  BigInt | 手续费 |
| data | Base64 | 备注 |
| sendBlockHash | Hex | AccountBlock为响应块时，其值为对应的请求块的hash |
| toAddress | Address | 响应账户地址 |
| tokenId | TokenId | 代币ID |
| amount | BigInt | 转账金额 |
| height | Uint64 | 账户块高度 |
| previousHash | Hex | 账户链上上一个AccountBlock的hash, 如果当前AccountBlock是账户链上的第一个AccountBlock, hash为`0000000000000000000000000000000000000000000000000000000000000000` |
| difficulty | BigInt | PoW的难度 |
| nonce | Base64 | PoW的nonce |
| hash | Hex | 当前AccountBlock的Hash |
| signature | Base64 | 签名 |
| publicKey | Base64 | 账户公钥 |
| accountBlock | AccountBlock | 当前AccountBlock实例根据已知信息，组成的完整AccountBlock |
| originalAddress | originalAddress | 账户块所属账户地址的原始地址 |
| isRequestBlock | Boolean | 是否为请求块 |
| isResponseBlock | Boolean | 是否为响应块 |

## Methods

### setProvider
设置provider, 用于发送请求

- **Parameters**: 
  * `ViteAPI` 即`ViteAPI`实例

- **Returns**:
    - 当前实例: 即`return this;`

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
设置privateKey, 用于签名AccountBlock

- **Parameters**: 
  * `Hex` privateKey

- **Returns**:
    - 当前实例: 即`return this;`

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
获取当前账户链上的上一个AccountBlock

- **Returns**:
    - Promise<`AccountBlock`>  返回 previousAccountBlock

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
根据当前账户链上的上一个AccountBlock, 即`previousAccountBlock`，设置height和previousHash

```javascript
height = previousAccountBlock ? previousAccountBlock.height + 1 : 1
previousHash = previousAccountBlock ? previousAccountBlock.hash : '0000000000000000000000000000000000000000000000000000000000000000'
```

- **Parameters**: 
  * `AccountBlock` previousAccountBlock

- **Returns**:
    - 当前实例: 即`return this;`

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

    // 一般和 getPreviousAccountBlock 配合使用
    const previousAccountBlock = await myAccountBlock.getPreviousAccountBlock();
    myAccountBlock.setPreviousAccountBlock(previousAccountBlock);
}
```

### autoSetPreviousAccountBlock
自动获取并设置 previousAccountBlock, 即`getPreviousAccountBlock` + `setPreviousAccountBlock`

- **Returns**:
    - Promise<{ `height: Uint64; previousHash: Hex` }> 返回对象 `{ height, previousHash }`

- **Example**
```javascript
const myAccountBlock = new AccountBlock({
    blockType: 2,
    address: 'your address',
    toAddress: 'your toAddress',
    tokenId: 'your tokenId',
    amount: 'your amount'
}).setProvider(provider);

// 省去get=>set流程
myAccountBlock.autoSetPreviousAccountBlock().then(({ height, previousHash }) => {
    console.log('height', height);
    console.log('previousHash', previousHash);
});
```

### getToAddress
当blockType为1，即创建合约请求时，需要通过Gvite_RPC接口`contract_createContractAddress`请求toAddress

- **由于获取 toAddress 依赖于previousHash，所以应在设置过previousAccountBlock之后调用**

- **Returns**:
    - Promise<`Address`> 返回toAddress

- **Example**
```javascript
async function test() {
    const myAccountBlock = new AccountBlock({
        blockType: 1,
        address: 'your address',
        data: 'your data',
        fee: '10000000000000000000',    // 创建合约固定消耗10Vite手续费; 否则创建失败
        tokenId: Vite_TokenId
    }).setProvider(provider);

    await myAccountBlock.autoSetPreviousAccountBlock();
    const toAddress = await myAccountBlock.getToAddress()
    console.log('toAddress', toAddress);
}
```


### getDifficulty
根据当前AccountBlock的信息获取PoW难度，即通过Gvite_RPC接口`ledger_getPoWDifficulty`获取

- **由于获取 PoW 的difficulty依赖于previousHash，所以应在设置过previousAccountBlock之后调用**

- **Returns**
    - Promise<`BigInt`> 返回 difficulty

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
设置PoW难度

- **Parameters**: 
  * `BigInt` difficulty

- **Returns**:
    - 当前实例: 即`return this;`

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
自动获取并设置PoW难度, 即`getDifficulty` + `setDifficulty`

- **由于获取 PoW 的difficulty依赖于previousHash，所以应在设置过previousAccountBlock之后调用**

- **Returns**:
    - Promise<`BigInt`> 返回 difficulty

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
设置PoW的nonce

- **Parameters**: 
  * `Base64` nonce

- **Returns**:
    - 当前实例: 即`return this;`

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
    // 一般和getNonce配合使用
    const nonce = await transferAccountBlock.getNonce();
    transferAccountBlock.setNonce(nonce);

    console.log(transferAccountBlock.nonce);
}
```

### setPublicKey
设置公钥

- **Parameters**: 
  * `Hex | Base64` publicKey

- **Returns**:
    - 当前实例: 即`return this;`

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
设置签名

- **Parameters**: 
  * `Hex | Base64` signature

- **Returns**:
    - 当前实例: 即`return this;`

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
签名AccountBlock

- **签名需在补全AccountBlock所有属性之后进行；如果需要PoW, 应在运行过PoW之后进行签名**

- **Parameters**: 
  * `Hex?` privateKey, Default `this.privateKey`，即通过`setPrivateKey`配置过私钥后，则不必传参

- **Returns**:
    - 当前实例: 即`return this;`

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
发送AccountBlock (根据已知信息，组成的完整AccountBlock) 

- **Returns**:
    - Promise<`AccountBlock`> 返回AccountBlock

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
自动设置属性后，签名并发送AccountBlock `autoSetPreviousAccountBlock` + `sign` + `send`

- **Parameters**: 
  * `Hex?` privateKey, Default `this.privateKey`，即通过`setPrivateKey`配置过私钥后，则不必传参

- **Returns**:
    - Promise<`AccountBlock`> 返回AccountBlock

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

1. 首先获取 PoW难度: difficulty
2. 根据difficulty 计算nonce
3. 将 difficulty + nonce 分别填入accountBlock信息中

- **example**
```javascript

const PoW = async () => {
    const provider = 'your provider';
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

    // PoW服务通过difficulty计算的nonce, 以base64-string形式设置
    const nonce = '....';   

    accountBlock.setDifficulty(difficulty);
    accountBlock.setNonce(nonce);

    await accountBlock.autoSend();
}
```
