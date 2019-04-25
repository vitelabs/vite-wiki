# HdAddr

## Installation

:::demo
```bash tab:npm
npm install @vite/vitejs-hdaddr --save
```

```bash tab:yarn
yarn add @vite/vitejs-hdaddr
```
:::

## Import

```javascript import
import { hdAddr } from '@vite/vitejs';
// Or
import * as hdAddr from '@vite/vitejs-hdaddr';
```

## Methods

### newAddr
自动生成助记词及其0号地址

- **Parameters**
  - `bits? : number` Decimals of mnemonic words default: 256
  - `lang? : LangList` Language default: english
  - `pwd? : string` Password default: ''

- **Return**
    - `mnemonicAddrObj: object`
        - `addrObj : AddrObj`
        - `entropy : string` Entropy
        - `mnemonic : string` Mnemonic words

- **Example**
```javascript ::Demo
import { newAddr } from '@vite/vitejs-hdaddr';

let { addr, entropy, mnemonic } = newAddr();
```

### getAddrFromMnemonic
Get an address by mnemonic words

- **Parameters**
  - `mnemonic : string` Mnemonic words
  - `index? : number` Number, default: 0
  - `lang? : LangList` Language, default: english
  - `pwd? : string` Password, default: ''

- **Return** 
  - `addrObj: AddrObj`

### getAddrsFromMnemonic
Get a group of addresses by mnemonic words

- **Parameters**
  - `mnemonic: string` Mnemonic
  - `start : number` Start from which address number
  - `num : number` Amount of addresses
  - `lang? : LangList` Language, default: english
  - `pwd? : string` Password, default: ''

- **Return**
  - `addrObj: AddrObj`

### getId
Generate ID via mnemonic words

- **Parameters**
  - `mnemonic : string` Mnemonic words
  - `lang? : LangList` Language, default: english

- **Return**
  - `id: string` ID

### getMnemonicFromEntropy
Get mnemonic words via entropy

- **Parameters**
  - `entropy : string` Entropy
  - `lang? : LangList` Language, default: english

- **Return**
 - `mnemonic: string` Mnemonic words

### getEntropyFromMnemonic
Get entropy of mnemonic words

- **Parameters**
  - `mnemonic: string` Mnemonic words
  - `lang? : LangList` Language, default: english

- **Return**
  - `entropy: string` Entropy

### validateMnemonic
Verify if it is a legal mnemonic words

- **Parameters**
  - `mnemonic: string` Mnemonic words
  - `lang? : LangList` Language default: english

- **Return**
  - `validate: boolean` Legal or not

### getAddrFromHexAddr
Get actual address [Same as privToAddr](/api/vitejs/tool/privToAddr.html)

### isValidHexAddr
Verify if it is a legal hex address [Same as privToAddr](/api/vitejs/tool/privToAddr.html)
