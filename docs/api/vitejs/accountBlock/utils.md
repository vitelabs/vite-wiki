# utils

## Methods

### isValidAccountBlockBeforeHash
参数是否可以生成AccountBlock的hash

- **Parameters** 
    * `__namedParameters: Object`
        - `blockType: BlockType`
        - `address: Address`
        - `height: Uint64`
        - `previousHash: Hex`
        - `fee?: BigInt`
        - `amount?: BigInt`
        - `toAddress?: Address`
        - `tokenId?: TokenId`
        - `data?: Base64`
        - `sendBlockHash?: Hex`
        - `difficulty?: BigInt`
        - `nonce?: Base64`

- **Return**
    * `Boolean` 验证结果

- **Example**
```javascript
import { accountBlock } from '@vite/vitejs';

const { utils } = accountBlock;

```

### isValidAccountBlockBeforeSignature
参数是否可以生成AccountBlock的签名

- **Parameters** 
    * `__namedParameters: Object`
        - `blockType: BlockType`
        - `address: Address`
        - `height: Uint64`
        - `previousHash: Hex`
        - `hash: Hex`
        - `fee?: BigInt`
        - `amount?: BigInt`
        - `toAddress?: Address`
        - `tokenId?: TokenId`
        - `data?: Base64`
        - `sendBlockHash?: Hex`
        - `difficulty?: BigInt`
        - `nonce?: Base64`

- **Return**
    * `Boolean` 验证结果

- **Example**
```javascript
import { accountBlock } from '@vite/vitejs';

const { utils } = accountBlock;

```

### isValidAccountBlock
是否为一个完整、合法、可发送的AccountBlock

- **Parameters** 
    * `__namedParameters: Object`
        - `blockType: BlockType`
        - `address: Address`
        - `height: Uint64`
        - `previousHash: Hex`
        - `hash: Hex`
        - `signature: Base64`
        - `publicKey: Base64`
        - `fee?: BigInt`
        - `amount?: BigInt`
        - `toAddress?: Address`
        - `tokenId?: TokenId`
        - `data?: Base64`
        - `sendBlockHash?: Hex`
        - `difficulty?: BigInt`
        - `nonce?: Base64`

- **Return**
    * `Boolean` 验证结果

- **Example**
```javascript
import { accountBlock } from '@vite/vitejs';

const { utils } = accountBlock;

```

### getAccountBlockHash
获取AccountBlock的hash

- **Parameters**
    * `__namedParameters: object`
        `blockType: BlockType`
        `address: Address`
        `hash?: Hex`
        `height?: Uint64`
        `previousHash?: Hex`
        `fromAddress?: Address`
        `toAddress?: Address`
        `sendBlockHash?: Hex`
        `tokenId?: TokenId`
        `amount?: BigInt`
        `fee?: BigInt`
        `data?: Base64`
        `difficulty?: BigInt`
        `nonce?: Base64`
        `vmlogHash?: Hex`
        `triggeredSendBlockList?: AccountBlockType[]`

- **Return**
    * `Hex` AccountBlock的hash
 
- **Example**
```javascript

```

### signAccountBlock
签名accountBlock

- **Parameters**
    * `__namedParameters: object` AccountBlock
        - `address: Address`
        - `blockType: BlockType`
        - `hash: Hex`
        - `height: Uint64`
        - `previousHash: Hex`
        - `toAddress?: Address`
        - `tokenId?: TokenId`
        - `amount?: BigInt`
        - `sendBlockHash?: Hex`
        - `data?: Base64`
        - `fee?: BigInt`
        - `difficulty?: BigInt`
        - `nonce?: Base64`
    * `Hex` privateKey 私钥
  
- **Return**
    * `Object`
        - `signature: Base64`
        - `publicKey: Base64`


- **Example**
```javascript
import { signAccountBlock } from '@vite/vitejs-accountblock';

const accountBlock = {
    accountAddress: 'vite_13f1f8e230f2ffa1e030e664e525033ff995d6c2bb15af4cf9',
    blockType: 4,
    prevHash: '6388daf1e34e9aa9000006f455737ec3d191c7cb7b0d79a882cb976200f55b68',
    height: '4',
    fromBlockHash: '6388daf1e34e9aa9000006f455737ec3d191c7cb7b0d79a882cb976200f55b68',
    nonce: 'Sg0sdhyaEus=',
    difficulty: '65534',
    hash: '23b9a085f0280eb5309f27094bd00420ba2e2c5b16ef98dc40b1c778820f31a7'
};

const { hash, signature, publicKey } = signAccountBlock(accountBlock, /** your privateKey */);
```

## 更多方法

### isRequestBlock
根据blockType判断, 是非为一个请求块

### isResponseBlock
根据blockType判断, 是非为一个响应块

### getCreateContractData
生成创建合约 (即 blockType 为1) 的 AccountBlock 的 data

### getCallContractData
生成调用合约的 AccountBlock 的 data

### getTransactionType 
获取详细的交易类型

- **Parameters**
    * `__namedParameters: object`
        - `toAddress : HexAddr` ToAddress
        - `data : string` `accountBlock.data` 
        - `blockType : BlockType`

- **Return**
    * `txType : TxType`

- **Example**
```javascript
import { getTxType } from '@vite/vitejs-accountblock';

const RevokeVoting = {
    blockType: 2,
    data: 'pinFMQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB',
    toAddress: 'vite_000000000000000000000000000000000000000270a48cc491'
};

const txType = getTxType(RevokeVoting);
// txType === 'RevokeVoting'
```

### decodeAccountBlockByContract

- **Parameters**
    * `__namedParameters: object`
        - `accountBlock: AccountBlock`
        - `contractAddr: Address`
        - `abi: jsonInterface | Array<jsonInterface>`
        - `topics?: Array<hexString>`
        - `mehtodName?: string` 当第一个参数为jsonInterface数组时, 此参数必填(用于识别abi, 取出对应inputs)

- **Return**
    * `decodeResult`: 如果accountBlock不属于这个合约，return null

- **Example**
```javascript
import { accountblock, constant } from '@vite/vitejs';

// Just Example
const SBPregAccountBlock = {
    accountAddress: 'vite_553462bca137bac29f440e9af4ab2e2c1bb82493e41d2bc8b2',
    blockType: 2,
    data: '8pxs4gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGAAAAAAAAAAAAAAAFU0YryhN7rCn0QOmvSrLiwbuCSTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACc3MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
    toAddress: 'vite_0000000000000000000000000000000000000004d28108e76b'
}

const decodeResult = accountblock.decodeBlockByContract({
    accountBlock: SBPregAccountBlock,
    contractAddr: constant.Contracts.SBPreg.contractAddr,
    abi: constant.Contracts.SBPreg.abi
});

/** decodeResult like
    { 
        '0': '00000000000000000001',
        '1': 'ss',
        '2': 'vite_553462bca137bac29f440e9af4ab2e2c1bb82493e41d2bc8b2',
        gid: '00000000000000000001',
        name: 'ss',
        nodeAddr: 'vite_553462bca137bac29f440e9af4ab2e2c1bb82493e41d2bc8b2' 
    }
*/
```