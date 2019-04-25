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
  - `bits? : number` 获取多少位的助记词 default: 256
  - `lang? : LangList` 语言 default: english
  - `pwd? : string` 密码 default: ''

- **Return**
    - `mnemonicAddrObj: object`
        - `addrObj : AddrObj`
        - `entropy : string` 熵
        - `mnemonic : string` 助记词

- **Example**
```javascript ::Demo
import { newAddr } from '@vite/vitejs-hdaddr';

let { addr, entropy, mnemonic } = newAddr();
```

### getAddrFromMnemonic
根据助记词获取某个地址

- **Parameters**
  - `mnemonic : string` 助记词
  - `index? : number` 地址序号 default: 0
  - `lang? : LangList` 语言 default: english
  - `pwd? : string` 密码 default: ''

- **Return**
  - `addrObj: AddrObj`

### getAddrsFromMnemonic
根据助记词获取一串地址

- **Parameters**
  - `mnemonic: string` 助记词
  - `start : number` 地址序号，从第几个地址开始
  - `num : number` 个数，获取多少个地址
  - `lang? : LangList` 语言 default: english
  - `pwd? : string` 密码 default: ''

- **Return**
  - `addrObj: AddrObj`

### getId
根据助记词生成id

- **Parameters**
  - `mnemonic : string` 助记词
  - `lang? : LangList` 语言 default: english

- **Return**
  - `id: string` ID

### getMnemonicFromEntropy
根据熵获取助记词

- **Parameters**
  - `entropy: string` 熵
  - `lang? : LangList` 语言 default: english

- **Return**
 - `mnemonic: string` 助记词

### getEntropyFromMnemonic
获取助记词的熵

- **Parameters**
  - `mnemonic: string` 助记词
  - `lang? : LangList` 语言 default: english

- **Return**
  - `entropy: string` 熵

### validateMnemonic
校验是否为合法的助记词

- **Parameters**
  - `mnemonic: string` 助记词
  - `lang? : LangList` 语言 default: english
  
- **Return**
  - `validate: boolean` 是否合法

### getAddrFromHexAddr
获取真实地址 [同privToAddr](/api/vitejs/tool/privToAddr.html)

### isValidHexAddr
校验是否为合法的hex地址 [同privToAddr](/api/vitejs/tool/privToAddr.html)
