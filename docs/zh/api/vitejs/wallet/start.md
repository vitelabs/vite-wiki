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

- **Example**
```javascript
const bip39 = require('bip39');
import { wallet } from '@vite/vitejs';

const { createMnemonics } = wallet;

const myMnemonics = createMnemonics();
// 如果选择其他语言
const myJapanMnemonics = createMnemonics(256, bip39.wordlists.japanese)
```

### validateMnemonics
校验助记词

- **Parameters** 
    * `string` 必填，助记词
    * `Array<String>` 选填，选词列表， Default bip39.wordlists.EN，若需要其他语言可从bip39库中单独选取并传入

- **Return**
    * `boolean` 校验结果

- **Example**
```javascript
const bip39 = require('bip39');
import { wallet } from '@vite/vitejs';

const result = wallet.validateMnemonics('your menemonics');
// 若是语言不是英语
const myJapanMnemonics = wallet.validateMnemonics('your menemonics', bip39.wordlists.japanese);
```

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

- **Example**
```javascript
import { wallet } from '@vite/vitejs';

const { originalAddress, publicKey, privateKey, address } = wallet.deriveAddress({ 
    mnemonics: 'your mnemonics', 
    index: 0 
});
```

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

- **Example**
```javascript
import { wallet } from '@vite/vitejs';

const addressList = wallet.deriveAddressList({ 
    mnemonics: 'your mnemonics', 
    startIndex: 0,
    endIndex: 9
});
```

### isValidAddress
判断地址类型

- **Parameters** 
    * `string` 地址

- **Return**
    * `0 | 1 | 2` Illegal: 0; Account Address: 1; Contract Address: 2

- **Example**
```javascript
import { wallet } from '@vite/vitejs';

const addrType = wallet.isValidAddress('vite_553462bca137bac29f440e9af4ab2e2c1bb82493e41d2bc8b2');  // addrType === 1
const addrType2 = wallet.isValidAddress('32323');  // addrType2 === 0
```

### createWallet
创建钱包（即私钥管理器）

- **Parameters** 
    * `number` 选填，助记词位数，Default 256
    * `Array<String>` 选填，选词列表， Default bip39.wordlists.EN，若需要其他语言可从bip39库中单独选取并传入
    * `string` 选填，password，Default ''。（根据助记词 + password生成seed）

- **Return**
    * Wallet实例

- **Example**
```javascript
import { wallet } from '@vite/vitejs';

const myWallet = wallet.createWallet();
```

### getWallet
根据助记词还原钱包（即私钥管理器）

- **Parameters** 
    * `string` 必填，助记词，格式为'word1 word2 word3 ...'
    * `number` 选填，助记词位数，Default 256
    * `Array<String>` 选填，选词列表， Default bip39.wordlists.EN，若需要其他语言可从bip39库中单独选取并传入
    * `string` 选填，password，Default ''。（根据助记词 + password生成seed）

- **Return**
    * Wallet实例


- **Example**
```javascript
import { wallet } from '@vite/vitejs';

const myWallet = wallet.getWallet('your mnemonics');
```