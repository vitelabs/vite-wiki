# AccountBlock

## Installation

:::demo
```bash tab:npm
npm install @vite/vitejs-accountblock --save
```

```bash tab:yarn
yarn add @vite/vitejs-accountblock
```
:::

## Import

```javascript import
import { accountBlock } from '@vite/vitejs';
// Or
import * as accountBlock from '@vite/vitejs-accountblock';
```

## Methods

### getAccountBlock
Get normative accountBlock

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
    * `accountBlock : AccountBlock` 

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
Get normative send accountBlock

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
    * `accountBlock : AccountBlock` 
  
### getReceiveTxBlock
Get normative receive accountBlock

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `fromBlockHash: Hex`
        - `prevHash?: Hex`
        - `height?: Uint64`

- **Return**
    * `accountBlock : AccountBlock` 

### getBuiltinTxType 
Get specified transaction type

- **Parameters**
    * `toAddress : HexAddr` ToAddress
    * `data : string` `accountBlock.data` 
    * `blockType : BlockType`

- **Return**
    * `builtinTxType : BuiltinTxType` Transaction Type

- **Example**
```javascript
import { getAccountBlock } from '@vite/vitejs-accountblock';

const RevokeVoting = {
    blockType: 2,
    data: 'pinFMQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB',
    toAddress: 'vite_000000000000000000000000000000000000000270a48cc491'
};

const builtinTxType = getBuiltinTxType(RevokeVoting.toAddress, RevokeVoting.data, RevokeVoting.blockType);
// builtinTxType === 'RevokeVoting'
```

### getBlockHash

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
    * `privateKey: Hex` Private Key 

- **Return**
    * `accountBlock: AccountBlock` AccountBlock after signing
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
