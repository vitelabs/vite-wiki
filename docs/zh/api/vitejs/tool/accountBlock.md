# accountBlock

:::tip Abstract
@vitejs/vitejs-accountblock
::: 

```javascript 引入
import { accountBlock } from '@vite/vitejs';

// Or
import * as accountBlock from '@vite/vitejs-accountblock';
```

## getAccountBlock
获取规范的accountBlock

- **params**
  - `block : Object<blockType, accountAddress, snapshotHash, prevHash?, height?, fromBlockHash?, data?, message?, toAddress?, tokenId?, amount?, nonce?>` block
- **return**
  - `accountBlock : AccountBlock` 规范的 accountBlock
  
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
获取规范的 send accountBlock

- **params**
  - `block : Object<accountAddress, toAddress, tokenId, amount, message?, prevHash?, height?, snapshotHash?>` block
- **return**
  - `accountBlock : AccountBlock` 规范的 send accountBlock
  
## getReceiveTxBlock
获取规范的 receive accountBlock

- **params**
  - `block : Object<accountAddress, fromBlockHash, prevHash?, height?, snapshotHash?>` block
- **return**
  - `accountBlock : AccountBlock` 规范的 receive accountBlock

## getBuiltinTxType 
获取详细的交易类型

- **params**
  - `toAddress : string` ToAddress
  - `data : string` data 
  - `blockType : number` 块类型
- **return**
  - `builtinTxType : BuiltinTxType` 交易类型
  
```javascript ::Demo
import { getAccountBlock } from '@vite/vitejs-accountblock';

const RevokeVoting = {
    blockType: 2,
    data: 'pinFMQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB',
    toAddress: 'vite_000000000000000000000000000000000000000270a48cc491'
};
```

## getBlockHash
获取块hash

- **params**
  - `accountBlock : Object<accountAddress, blockType, prevHash, snapshotHash, timestamp, height, fee, fromBlockHash?, toAddress?, tokenId?, amount?, data?, nonce?, logHash?>` AccountBlock
- **return**
  - `blockHash : string` 块hash
  
## signAccountBlock
签名accountBlock

- **params**
  - `accountBlock : Object<accountAddress, blockType, prevHash, snapshotHash, timestamp, height, fee, fromBlockHash?, toAddress?, tokenId?, amount?, data?, nonce?, logHash?>` AccountBlock
  - `privKey : string` 私钥
- **return**
  - `accountBlock : Object<accountAddress, blockType, prevHash, snapshotHash, timestamp, height, fee, fromBlockHash?, toAddress?, tokenId?, amount?, data?, nonce?, logHash?, hash, signature, publicKey>` 签名后的AccountBlock
