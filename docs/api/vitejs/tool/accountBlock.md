# accountBlock

:::tip Abstract
@vitejs/vitejs-accountblock
::: 

```javascript import
import { accountBlock } from '@vite/vitejs';

// Or
import * as accountBlock from '@vite/vitejs-accountblock';
```

## getAccountBlock
Get normative accountBlock

- **params**
  - `block : Object<blockType, accountAddress, snapshotHash, prevHash?, height?, fromBlockHash?, data?, message?, toAddress?, tokenId?, amount?, nonce?>` block
- **return**
  - `accountBlock : AccountBlock` 

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

## getSendTxBlock 
Get normative send accountBlock

- **params**
  - `block : Object<accountAddress, toAddress, tokenId, amount, message?, prevHash?, height?, snapshotHash?>` block
- **return**
  - `accountBlock : AccountBlock` 
  
## getReceiveTxBlock
Get normative receive accountBlock

- **params**
  - `block : Object<accountAddress, fromBlockHash, prevHash?, height?, snapshotHash?>` block
- **return**
  - `accountBlock : AccountBlock` 

## getBuiltinTxType 
Get specified transaction type

- **params**
  - `toAddress : string` ToAddress
  - `data : string` data 
  - `blockType : number`
- **return**
  - `builtinTxType : BuiltinTxType` Transaction Type

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

## getBlockHash

- **params**
  - `accountBlock : Object<accountAddress, blockType, prevHash, snapshotHash, timestamp, height, fee, fromBlockHash?, toAddress?, tokenId?, amount?, data?, nonce?, logHash?>` AccountBlock
- **return**
  - `blockHash : string`
  
## signAccountBlock

- **params**
  - `accountBlock : Object<accountAddress, blockType, prevHash, snapshotHash, timestamp, height, fee, fromBlockHash?, toAddress?, tokenId?, amount?, data?, nonce?, logHash?>` AccountBlock
  - `privKey : string` Private Key 
- **return**
  - `accountBlock : Object<accountAddress, blockType, prevHash, snapshotHash, timestamp, height, fee, fromBlockHash?, toAddress?, tokenId?, amount?, data?, nonce?, logHash?, hash, signature, publicKey>` AccountBlock after signing
