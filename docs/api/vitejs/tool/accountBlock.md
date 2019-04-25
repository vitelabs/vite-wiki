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
  - `block : Object<blockType, accountAddress, snapshotHash, prevHash?, height?, fromBlockHash?, data?, message?, toAddress?, tokenId?, amount?, nonce?>` block

- **Return**
  - `accountBlock : AccountBlock` 

- **Example**
```javascript ::Demo
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
  - `block : Object<accountAddress, toAddress, tokenId, amount, message?, prevHash?, height?, snapshotHash?>` block

- **Return**
  - `accountBlock : AccountBlock` 
  
### getReceiveTxBlock
Get normative receive accountBlock

- **Parameters**
  - `block : Object<accountAddress, fromBlockHash, prevHash?, height?, snapshotHash?>` block

- **Return**
  - `accountBlock : AccountBlock` 

### getBuiltinTxType 
Get specified transaction type

- **Parameters**
  - `toAddress : string` ToAddress
  - `data : string` data 
  - `blockType : number`

- **Return**
  - `builtinTxType : BuiltinTxType` Transaction Type

- **Example**
```javascript ::Demo
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
  - `accountBlock : Object<accountAddress, blockType, prevHash, snapshotHash, timestamp, height, fee, fromBlockHash?, toAddress?, tokenId?, amount?, data?, nonce?, logHash?>` AccountBlock

- **Return**
  - `blockHash : string`
  
### signAccountBlock

- **Parameters**
  - `accountBlock : Object<accountAddress, blockType, prevHash, snapshotHash, timestamp, height, fee, fromBlockHash?, toAddress?, tokenId?, amount?, data?, nonce?, logHash?>` AccountBlock
  - `privKey : string` Private Key 

- **Return**
  - `accountBlock : Object<accountAddress, blockType, prevHash, snapshotHash, timestamp, height, fee, fromBlockHash?, toAddress?, tokenId?, amount?, data?, nonce?, logHash?, hash, signature, publicKey>` AccountBlock after signing
