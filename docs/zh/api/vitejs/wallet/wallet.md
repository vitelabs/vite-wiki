# Wallet实例

:::warning Notice

**密码短语 passphrase**
bip39使用 PBKDF2 生成seed。助记词作为其中的password, 密码短语passphrase作为盐值(salt)

如果使用助记词 + passphrase的形式生成种子，passphrase遗失也将丢失私钥

具体可参考 https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki

:::

## 应用

```javascript
import { wallet } from '@vite/vitejs';

const myWallet = wallet.createWallet();

console.log('rootPath: ', myWallet.rootPath);
console.log('my mnemonics: ', myWallet.mnemonics);
console.log('my entropy: ', myWallet.entropy);
console.log('my seed: ', myWallet.seedHex);

const theFirstAddress = myWallet.deriveAddress(0);
const { originalAddress, publicKey, privateKey, address, path } = theFirstAddress;
```

## Properties

|  Name  | Type | Description |
|:------------:|:-----:|:-----:|
| rootPath | string | 根据助记词派生地址的根路径 |
| mnemonics | string | 助记词 |
| entropy | Hex | 根据助记词生成的熵 |
| wordlist | String[] | 生成助记词的词语列表 |
| passphrase | string | 选填，密码短语 passphrase, Default '' |
| seed | Buffer | 种子 |
| seedHex | Hex | 种子的Hex-string |
| id | Hex | 根据0号地址进行blake2b得到的当前助记词的唯一标识 |

## Methods

### getAddressList

- **Return**
    * Object{ index: `WalletAddressObj` } 当前已经生成过的地址列表

- **Example**
```javascript
// ....
const currentAddressList = myWallet.getAddressList();
```

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
