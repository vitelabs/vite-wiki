# accountBlock

:::tip Abstract
@vitejs/vitejs-accountblock
::: 

## getAccountBlock
获取规范的accountBlock

- **params**
  - `block : Object<blockType, accountAddress, snapshotHash, prevHash?, height?, fromBlockHash?, data?, message?, toAddress?, tokenId?, amount?, nonce?>` block
- **return**
  - `accountBlock : AccountBlock` 规范的 accountBlock
  

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

## formatAccountBlock

## validReqAccountBlock

## getCreateContractData
