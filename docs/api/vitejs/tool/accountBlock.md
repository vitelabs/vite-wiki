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
  
- **Example**
```javascript
import { getSendTxBlock } from '@vite/vitejs-accountblock';

const sendTxBlock = getSendTxBlock({
    accountAddress: 'vite_155e4e83fb0499dcc3047e0458bbfae77f2ac1270e38c176f8',
    amount: '0',
    toAddress: 'vite_000000000000000000000000000000000000000270a48cc491',
    tokenId: 'tti_5649544520544f4b454e6e40',
    height: '19',
    prevHash: 'fef0b178458acb3f7d37d575b10139357d79a5a90adc3fdc8ddd96800770fce7',
    message: '2123'
});
```

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

- **Example**
```javascript
import { getReceiveTxBlock } from '@vite/vitejs-accountblock';

const receiveTxBlock = getReceiveTxBlock({
    accountAddress: 'vite_155e4e83fb0499dcc3047e0458bbfae77f2ac1270e38c176f8',
    fromBlockHash: 'ff91866c4393566c44a667e8344c1567a12fdefa27093a69fed6ecbf4cb02046'
});
```

### getBuiltinTxType 
Get specified transaction type

- **Parameters**
    * `__namedParameters: object`
        - `toAddress : HexAddr` ToAddress
        - `data : string` `accountBlock.data` 
        - `blockType : BlockType`

- **Return**
    * `builtinTxType : BuiltinTxType` Transaction Type

- **Example**
```javascript
import { getBuiltinTxType } from '@vite/vitejs-accountblock';

const RevokeVoting = {
    blockType: 2,
    data: 'pinFMQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB',
    toAddress: 'vite_000000000000000000000000000000000000000270a48cc491'
};

const builtinTxType = getBuiltinTxType(RevokeVoting);
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
  
- **Example**
```javascript
import { getBlockHash } from '@vite/vitejs-accountblock';

const accountBlock = {
    accountAddress: 'vite_ab24ef68b84e642c0ddca06beec81c9acb1977bbd7da27a87a',
    blockType: 2,
    prevHash: 'd517e8d4dc9c676876b72ad0cbb4c45890804aa438edd1f171ffc66276202a95',
    height: '2',
    tokenId: 'tti_5649544520544f4b454e6e40',
    toAddress: 'vite_13f1f8e230f2ffa1e030e664e525033ff995d6c2bb15af4cf9',
    amount: '1000000000000000000000000'
};

const hash = getBlockHash(accountBlock);
// hash: '9c3f2b59408aa6a5c76f6f30cab40085eb181d200d574a029323b0822f54eef1'
```

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
