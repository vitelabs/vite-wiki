# Wallet实例

## Properties

|  Name  | Type | Description |
|:------------:|:-----:|:-----:|
| rootPath | string | 根据助记词派生地址的根路径 |
| mnemonics | string | 助记词 |
| entropy | Hex | 根据助记词生成的熵 |
| wordlist | String[] | 生成助记词的词语列表 |
| password | string | 密码，根据助记词 + password生成seed |
| seed | Buffer | 种子 |
| seedHex | Hex | 种子的Hex-string |
| id | Hex | 根据0号地址进行blake2b得到的当前助记词的唯一标识 |

## Methods

### getAddressList

- **Return**
    * Object{ index: `WalletAddressObj` } 当前已经生成过的地址列表

### deriveAddress

- **Parameters**
    * `number` 必填，index，生成地址的序号

- **Return**
    * `WalletAddressObj` { originalAddress, publicKey, privateKey, address, path }

- **Example**

```javascript
import { wallet } from '@vite/vitejs';

const { createWallet } = wallet;

const myWallet = createWallet();
const addressObj = myWallet.deriveAddress(0);

console.log(addressObj.address)
console.log(addressObj.originalAddress)
console.log(addressObj.privateKey)
console.log(addressObj.publicKey)
console.log(addressObj.path)
```

### deriveAddressList

- **Parameters**
    * `number` 必填，startIndex，生成地址的起始序号
    * `number` 必填，endIndex，生成地址的终止序号

- **Return**
    * `WalletAddressObj[]` [{ originalAddress, publicKey, privateKey, address, path }, ...]

- **Example**
```javascript
import { wallet } from '@vite/vitejs';

const { createWallet } = wallet;

const myWallet = createWallet();
const addressObjList = myWallet.deriveAddressList(0, 9);
```
