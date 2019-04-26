# AccountBlock

## 安装

:::demo
```bash tab:npm
npm install @vite/vitejs-accountblock --save
```

```bash tab:yarn
yarn add @vite/vitejs-accountblock
```
:::

## 引入

```javascript import
import { accountBlock } from '@vite/vitejs';
// Or
import * as accountBlock from '@vite/vitejs-accountblock';
```

## Methods

### getAccountBlock
获取规范的accountBlock

- **Parameters** 
    * `__namedParameters: Object`
        - `blockType: BlockType`
        - `accountAddress: Address`
        - `fromBlockHash?: Hex`
        - `data?: Base64`
        - `message?: string`
        - `toAddress?: Address`
        - `tokenId?: TokenId`
        - `amount?: BigInt`
        - `fee?: BigInt`
        - `prevHash?: Hex`
        - `height?: Uint64`
        - `nonce?: Base64`

- **Return**
    * `accountBlock : AccountBlock` 规范的 accountBlock

- **Example**
```javascript
import { getAccountBlock } from '@vite/vitejs-accountblock';

const block = {
    accountAddress: 'vite_155e4e83fb0499dcc3047e0458bbfae77f2ac1270e38c176f8',
    blockType: 2,
    snapshotHash: 'ff91866c4393566c44a667e8344c1567a12fdefa27093a69fed6ecbf4cb02046'
};

const formatBlock = getAccountBlock({
    accountAddress: 'vite_155e4e83fb0499dcc3047e0458bbfae77f2ac1270e38c176f8',
    blockType: 2,
    snapshotHash: 'ff91866c4393566c44a667e8344c1567a12fdefa27093a69fed6ecbf4cb02046'
});
```

### getSendTxBlock 
获取规范的 send accountBlock

- **Parameters**
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `toAddress: Address`
        - `tokenId: TokenId`
        - `amount: BigInt`
        - `message?: string`
        - `prevHash?: Hex`
        - `height?: Uint64`
- **Return**
    * `accountBlock : AccountBlock` 规范的 send accountBlock
  
### getReceiveTxBlock
获取规范的 receive accountBlock

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `fromBlockHash: Hex`
        - `prevHash?: Hex`
        - `height?: Uint64`

- **Return**
    * `accountBlock : AccountBlock` 

### getBuiltinTxType 
获取详细的交易类型

- **Parameters**
    * `toAddress : HexAddr` ToAddress
    * `data : string` `accountBlock.data` 
    * `blockType : BlockType`

- **Return**
    * `builtinTxType : BuiltinTxType`

- **Example**
```javascript
import { getAccountBlock } from '@vite/vitejs-accountblock';

const RevokeVoting = {
    blockType: 2,
    data: 'pinFMQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB',
    toAddress: 'vite_000000000000000000000000000000000000000270a48cc491'
};
```

### getBlockHash
获取块hash

- **Parameters**
    * `__namedParameters: object`
        - `accountAddress: HexAddr`
        - `blockType: BlockType`
        - `height: Uint64`
        - `toAddress?: Address`
        - `tokenId?: TokenId`
        - `amount?: BigInt`
        - `fromBlockHash?: Hex`
        - `data?: Base64`
        - `prevHash?: Hex`
        - `fee?: BigInt`
        - `nonce?: Base64`
        - `logHash?: Hex`
        - `sendBlockList?: Array`

- **Return**
    * `blockHash : Hex`
  
### signAccountBlock
签名accountBlock

- **Parameters**
    * `__namedParameters: object`
        - `accountAddress: HexAddr`
        - `blockType: BlockType`
        - `height: Uint64`
        - `toAddress?: Address`
        - `tokenId?: TokenId`
        - `amount?: BigInt`
        - `fromBlockHash?: Hex`
        - `data?: Base64`
        - `prevHash?: Hex`
        - `fee?: BigInt`
        - `nonce?: Base64`
        - `logHash?: Hex`
        - `sendBlockList?: Array`
    * `privateKey: Hex` 私钥
  
- **Return**
    * `accountBlock: AccountBlock` 签名后的AccountBlock
        - `accountAddress: HexAddr`
        - `blockType: BlockType`
        - `height: Uint64`
        - `toAddress?: Address`
        - `tokenId?: TokenId`
        - `amount?: BigInt`
        - `fromBlockHash?: Hex`
        - `data?: Base64`
        - `prevHash?: Hex`
        - `fee?: BigInt`
        - `nonce?: Base64`
        - `logHash?: Hex`
        - `sendBlockList?: Array`
        - `hash: Hex`
        - `signature: Hex`
        - `publicKey: Hex`
