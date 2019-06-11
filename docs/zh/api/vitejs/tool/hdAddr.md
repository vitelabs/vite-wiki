# HdAddr

## 安装

:::demo
```bash tab:npm
npm install @vite/vitejs-hdaddr --save
```

```bash tab:yarn
yarn add @vite/vitejs-hdaddr
```
:::

## 引入

```javascript import
import { hdAddr } from '@vite/vitejs';
// Or
import * as hdAddr from '@vite/vitejs-hdaddr';
```

## Methods

### newAddr
自动生成助记词及其0号地址

- **Parameters**
    * `bits? : number` 获取多少位的助记词 Default 256
    * `lang? : LangList` 语言 Default english
    * `pwd? : string` 密码
    * `isContract? : boolean` 是否为合约地址 Default false

- **Return**
    * `mnemonicAddrObj: object`
        - `addrObj : AddrObj`
        - `entropy : string` 熵
        - `mnemonic : string` 助记词

- **Example**
```javascript
import { newAddr } from '@vite/vitejs-hdaddr';

let { addr, entropy, mnemonic } = newAddr();
```

### getAddrFromMnemonic
根据助记词获取某个地址

- **Parameters**
    * `mnemonic : string` 助记词
    * `index? : number` 地址序号 Default 0
    * `lang? : LangList` 语言 Default english
    * `pwd? : string` 密码
    * `isContract? : boolean` 是否为合约地址 Default false

- **Return**
    * `addrObj: AddrObj`

- **Example**
```javascript
import { getAddrFromMnemonic } from '@vite/vitejs-hdaddr';

let { addr, hexAddr, pubKey, privKey } = getAddrFromMnemonic('your mnemonic');
```

### getAddrsFromMnemonic
根据助记词获取一串地址

- **Parameters**
    * `mnemonic: string` 助记词
    * `start? : number` 地址序号，从第几个地址开始 Default 0
    * `num? : number` 个数，获取多少个地址 Default 10
    * `lang? : LangList` 语言 Default english
    * `pwd? : string` 密码
    * `isContract? : boolean` 是否为合约地址 Default false

- **Return**
    * `addrObjArr: Array<AddrObj>`

- **Example**
```javascript
import { getAddrsFromMnemonic } from '@vite/vitejs-hdaddr';

let addrObjArr = getAddrsFromMnemonic('your mnemonic');
```

### getId
根据助记词生成id

- **Parameters**
    * `mnemonic : string` 助记词
    * `lang? : LangList` 语言 Default english

- **Return**
    * `id: string`

### getMnemonicFromEntropy
根据熵获取助记词

- **Parameters**
    * `entropy: string` 熵
    * `lang? : LangList` 语言 Default english

- **Return**
    * `mnemonic: string` 助记词

### getEntropyFromMnemonic
获取助记词的熵

- **Parameters**
    * `mnemonic: string` 助记词
    * `lang? : LangList` 语言 Default english

- **Return**
    * `entropy: string` 熵

### validateMnemonic
校验是否为合法的助记词

- **Parameters**
    * `mnemonic: string` 助记词
    * `lang? : LangList` 语言 Default english
  
- **Return**
    * `validate: boolean` 是否合法

### getAddrFromHexAddr
获取真实地址 [同privToAddr.getAddrFromHexAddr](./privToAddr.md)

### isHexAddr
校验是否为合法的hex地址 [同privToAddr.isHexAddr](./privToAddr.md)
