# 开始

## 引入

:::demo

```javascript tab:ES6
import { wallet } from '@vite/vitejs';
```

```javascript tab:require
const { wallet } = require('@vite/vitejs');
```

:::

## 常用类型

```typescript
export declare type AddressObj = {
    originalAddress: Hex;
    publicKey: Hex;
    privateKey: Hex;
    address: Address;
}

export declare type WalletAddressObj {
    publicKey: Hex;
    privateKey: Hex;
    originalAddress: Hex;
    address: Address;
    path: String;
}
```

## Methods

### createMnemonics
创建助记词

- **Parameters** 
    * `number` 选填，助记词位数，Default 256
    * `Array<String>` 选填，选词列表， Default bip39.wordlists.EN，若需要其他语言可从bip39库中单独选取并传入

- **Return**
    * `String` 助记词

### deriveAddress
根据助记词派生地址

- **Parameters** 
    * `__namedParameters: Object`
        - `mnemonics: String` 必填，助记词，格式为'word1 word2 word3'
        - `index?: number` 选填，生成地址的序号，Default 0
        - `wordlist?: Array<String>` 选填，选词列表，默认为bip39的英语列表，若需要其他语言可从bip39库中单独选取并传入
        - `password?: String` 选填，根据助记词 + password生成seed，Default ''
        - `isContract?: boolean` 选填，是否为合约地址，Default false

- **Return**
    * `AddressObj` { originalAddress, publicKey, privateKey, address }

### deriveAddressList
根据助记词派生地址列表

**startIndex <= 地址列表 <= endIndex**

- **Parameters** 
    * `__namedParameters: Object`
        - `mnemonics: String` 必填，助记词，格式为'word1 word2 word3 ...'
        - `startIndex: number` 必填，生成地址的起始序号
        - `endIndex: number` 必填，生成地址的终止序号
        - `wordlist?: Array<String>` 选填，选词列表，默认为bip39.wordlists.EN，若需要其他语言可从bip39库中单独选取并传入
        - `password?: String` 选填，Default ''。（根据助记词 + password生成seed）
        - `isContract?: boolean` 选填，是否为合约地址，Default false

- **Return**
    * `AddressObj[]` [{ originalAddress, publicKey, privateKey, address }, ...]

### createWallet
创建钱包（即私钥管理器）

- **Parameters** 
    * `number` 选填，助记词位数，Default 256
    * `Array<String>` 选填，选词列表， Default bip39.wordlists.EN，若需要其他语言可从bip39库中单独选取并传入
    * `string` 选填，password，Default ''。（根据助记词 + password生成seed）

- **Return**
    * Wallet实例

### getWallet
根据助记词还原钱包（即私钥管理器）

- **Parameters** 
    * `string` 必填，助记词，格式为'word1 word2 word3 ...'
    * `number` 选填，助记词位数，Default 256
    * `Array<String>` 选填，选词列表， Default bip39.wordlists.EN，若需要其他语言可从bip39库中单独选取并传入
    * `string` 选填，password，Default ''。（根据助记词 + password生成seed）

- **Return**
    * Wallet实例