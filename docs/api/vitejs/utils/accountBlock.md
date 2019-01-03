---
sidebarDepth: 1
---

# accountBlock

:::tip Created by
[cs](https://github.com/lovelycs)
:::

:::tip Abstract
Utils include common tool sets such as generating address and encrypting keystore, etc.
:::  

## getAccountBlock
Get normative accountBlock

- **params**
  - `block : Object<blockType, accountAddress, snapshotHash, prevHash?, height?, fromBlockHash?, data?, message?, toAddress?, tokenId?, amount?, nonce?>` block
- **return**
  - `accountBlock : AccountBlock` 
  

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
