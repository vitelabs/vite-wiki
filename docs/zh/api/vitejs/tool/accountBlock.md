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
  - `block : Object<blockType, accountAddress, snapshotHash, prevHash?, height?, fromBlockHash?, data?, message?, toAddress?, tokenId?, amount?, nonce?>` block

- **Return**
  - `accountBlock : AccountBlock` 规范的 accountBlock

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
获取规范的 send accountBlock

- **Parameters**
  - `block : Object<accountAddress, toAddress, tokenId, amount, message?, prevHash?, height?, snapshotHash?>` block

- **Return**
  - `accountBlock : AccountBlock` 规范的 send accountBlock
  
### getReceiveTxBlock
获取规范的 receive accountBlock

- **Parameters**
  - `block : Object<accountAddress, fromBlockHash, prevHash?, height?, snapshotHash?>` block

- **Return**
  - `accountBlock : AccountBlock` 规范的 receive accountBlock

### getBuiltinTxType 
获取详细的交易类型

- **Parameters**
  - `toAddress : string` ToAddress
  - `data : string` data 
  - `blockType : number` 块类型

- **Return**
  - `builtinTxType : BuiltinTxType` 交易类型

- **Example**
```javascript ::Demo
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
  - `accountBlock : Object<accountAddress, blockType, prevHash, snapshotHash, timestamp, height, fee, fromBlockHash?, toAddress?, tokenId?, amount?, data?, nonce?, logHash?>` AccountBlock

- **Return**
  - `blockHash : string` 块hash
  
### signAccountBlock
签名accountBlock

- **Parameters**
  - `accountBlock : Object<accountAddress, blockType, prevHash, snapshotHash, timestamp, height, fee, fromBlockHash?, toAddress?, tokenId?, amount?, data?, nonce?, logHash?>` AccountBlock
  - `privKey : string` 私钥
  
- **Return**
  - `accountBlock : Object<accountAddress, blockType, prevHash, snapshotHash, timestamp, height, fee, fromBlockHash?, toAddress?, tokenId?, amount?, data?, nonce?, logHash?, hash, signature, publicKey>` 签名后的AccountBlock
