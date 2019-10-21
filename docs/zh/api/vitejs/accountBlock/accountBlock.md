# accountBlock 类

## 如何发送一个accountBlock

1. 初始化一个AccountBlock实例
2. 配置 provider 和 privateKey
    - provider: 用于发送请求
    - privateKey: 用于签名AccountBlock
3. 补全AccountBlock缺少的属性（height、previousHash; 如果是创建合约，还需要请求toAddress）
    - 如果需要PoW，则需要按顺序补全 difficulty -> nonce
4. 签名并发送AccountBlock

- **Example**

```javascript
async function sendAccountBlock() {
    // 1. 初始化一个AccountBlock实例, 并设置 provider 和 privateKey
    const myAccountBlock = new AccountBlock({
        blockType: 2,
        address: 'your address',
        toAddress: 'your toAddress',
        tokenId: 'your tokenId',
        amount: 'your amount'
    }, provider, privateKey);

    // 2. 自动补全AccountBlock缺少的属性
    await myAccountBlock.autoSetProperty();
    // 如果需要PoW, 若不需要则忽略
    // await myAccountBlock.PoW();

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

### setToAddress
当blockType为1，即创建合约请求时，需要通过Gvite_RPC接口`contract_createContractAddress`请求toAddress

- **Parameters**: 
  * `Address` toAddress

- **Returns**:
    - 当前实例: 即`return this;`

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
    // 一般和 getToAddress 配合使用
    const toAddress = await myAccountBlock.getToAddress();
    myAccountBlock.setToAddress(toAddress);
}
```

### autoSetToAddress
主动判断blockType, 并在blockType为1, 自动请求 toAddress 并设置

- **由于获取 toAddress 依赖于previousHash，所以应在设置过previousAccountBlock之后调用**

- **Returns**
    - Promise<`Address`> 返回toAddress

- **Example**
```javascript
async function testCreateContract() {
    const createContractAccountBlock = new AccountBlock({
        blockType: 1,
        address: 'your address',
        data: 'your data',
        fee: '10000000000000000000',    // 创建合约固定消耗10Vite手续费; 否则创建失败
        tokenId: Vite_TokenId
    }).setProvider(provider);

    await createContractAccountBlock.autoSetPreviousAccountBlock();
    // 省去 get=>set 步骤
    await createContractAccountBlock.autoSetToAddress();
    console.log(createContractAccountBlock.toAddress);
}
```

### autoSetProperty
自动设置属性: height、previousHash (如果blockType为1, 则还会自动获取toAddress); 即`autoSetPreviousAccountBlock` + `autoSetToAddress`

- **Returns**:
    - Promise<{ `height: Uint64; previousHash: Hex; toAddress: Address;` }> 返回对象 `{ height, previousHash, toAddress }`

- **Example**
```javascript
async function test() {
    // 1. blockType 为1
    const createContractAccountBlock = new AccountBlock({
        blockType: 1,
        address: 'your address',
        data: 'your data',
        fee: '10000000000000000000',    // 创建合约固定消耗10Vite手续费; 否则创建失败
        tokenId: Vite_TokenId
    }).setProvider(provider);

    // 省去单独请求并设置各属性的步骤
    await createContractAccountBlock.autoSetProperty();
    console.log(createContractAccountBlock.height);
    console.log(createContractAccountBlock.previousHash);
    console.log(createContractAccountBlock.toAddress);

    // 2. blockType 不为1时，调用方式没有区别
    const transferAccountBlock = new AccountBlock({
        blockType: 2,
        address: 'your address',
        toAddress: 'your toAddress',
        tokenId: 'your tokenId',
        amount: 'your amount'
    }).setProvider(provider);

    await transferAccountBlock.autoSetProperty();
    console.log(transferAccountBlock.height);
    console.log(transferAccountBlock.previousHash);
}
```

### getDifficulty
获取PoW难度，即通过Gvite_RPC接口`ledger_getPoWDifficulty`获取

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

### getNonce
根据PoW的难度，获取PoW的nonce

- **应在设置过 PoW 的 difficulty 之后调用**

- **Returns**:
    - Promise<`Base64`> 返回 nonce

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
    const nonce = await transferAccountBlock.getNonce();
    
    console.log(nonce);
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

### autoSetNonce
根据PoW的难度，自动获取并设置PoW的nonce, 即`getNonce` + `setNonce`

- **应在设置过 PoW 的 difficulty 之后调用**

- **Returns**:
    - Promise<`Base64`> 返回 nonce

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
    await transferAccountBlock.autoSetNonce();  // 省去get->set步骤

    console.log(transferAccountBlock.nonce);
}
```

### PoW
自动运行PoW (设置PoW难度，并计算nonce); 即无需手动配置difficulty和nonce

- **Parameters**: 
  * `BigInt?` 选填, PoW的difficulty; 如果, 则根据填入的difficulty计算nonce; 否则自动获取difficulty, 计算nonce

- **Returns**:
    - Promise<{ `difficulty: BigInt; nonce: Base64` }> 返回对象 `{ difficulty, nonce }`

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
    await transferAccountBlock.PoW();

    console.log(transferAccountBlock.difficulty);
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
签名AccountBlok

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

    await transferAccountBlock.autoSetProperty();
    // await transferAccountBlock.PoW();
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

    await transferAccountBlock.autoSetProperty();
    // await transferAccountBlock.PoW();
    transferAccountBlock.sign(privateKey);
    const result = await transferAccountBlock.send();

    console.log('send success', result);
}
```

### sendByPoW
自动进行PoW后，签名并发送AccountBlock

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
    }).setProvider(provider);

    await transferAccountBlock.autoSetProperty();
    const result = await transferAccountBlock.sendByPoW(privateKey);

    console.log('send success', result);
}
```

### autoSendByPoW
自动设置属性并进行PoW后，签名并发送AccountBlock `autoSetProperty` + `PoW` + `sign` + `send`

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
    }, provider);

    const result = await transferAccountBlock.autoSendByPoW(privateKey);
    console.log('send success', result);
}
```

### autoSend
自动设置属性后，签名并发送AccountBlock `autoSetProperty` + `sign` + `send`

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
