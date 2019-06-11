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
Automatic generation mnemonics and address (index = 0)

- **Parameters**
    * `bits? : number` Decimals of mnemonic words. Default 256
    * `lang? : LangList` Language. Default english
    * `pwd? : string` Password
    * `isContract? : boolean` Is it a contract address? Default false

- **Return**
    * `mnemonicAddrObj: object`
        - `addrObj : AddrObj`
        - `entropy : string` Entropy
        - `mnemonic : string` Mnemonic words

- **Example**
```javascript
import { newAddr } from '@vite/vitejs-hdaddr';

let { addr, entropy, mnemonic } = newAddr();
```

### getAddrFromMnemonic
Get an address by mnemonic words

- **Parameters**
    * `mnemonic : string` Mnemonic words
    * `index? : number` Number. Default 0
    * `lang? : LangList` Language. Default english
    * `pwd? : string` Password.
    * `isContract? : boolean` Is it a contract address? Default false

- **Return** 
    * `addrObj: AddrObj`

- **Example**
```javascript
import { getAddrFromMnemonic } from '@vite/vitejs-hdaddr';

let { addr, hexAddr, pubKey, privKey } = getAddrFromMnemonic('your mnemonic');
```

### getAddrsFromMnemonic
Get a group of addresses by mnemonic words

- **Parameters**
    * `mnemonic: string` Mnemonic
    * `start : number` Start from which address number. Default 0
    * `num : number` Amount of addresses. Default 10
    * `lang? : LangList` Language. Default english
    * `pwd? : string` Password
    * `isContract? : boolean` Is it a contract address? Default false

- **Return**
    * `addrObjArr: Array<AddrObj>`

- **Example**
```javascript
import { getAddrsFromMnemonic } from '@vite/vitejs-hdaddr';

let addrObjArr = getAddrsFromMnemonic('your mnemonic');
```

### getId
Generate ID via mnemonic words

- **Parameters**
    * `mnemonic : string` Mnemonic words
    * `lang? : LangList` Language. Default english

- **Return**
    * `id: string` ID

### getMnemonicFromEntropy
Get mnemonic words via entropy

- **Parameters**
    * `entropy : string` Entropy
    * `lang? : LangList` Language. Default english

- **Return**
    * `mnemonic: string` Mnemonic words

### getEntropyFromMnemonic
Get entropy of mnemonic words

- **Parameters**
    * `mnemonic: string` Mnemonic words
    * `lang? : LangList` Language. Default english

- **Return**
    * `entropy: string` Entropy

### validateMnemonic
Verify if it is a legal mnemonic words

- **Parameters**
    * `mnemonic: string` Mnemonic words
    * `lang?: LangList` Language. Default english

- **Return**
    * `validate: boolean` Legal or not

### getAddrFromHexAddr
Get actual address [Same as privToAddr.getAddrFromHexAddr](./privToAddr.md)

### isHexAddr
Verify if it is a legal hex address [Same as privToAddr.isHexAddr](./privToAddr.md)
