# PrivToAddr

## 安装

:::demo
```bash tab:npm
npm install @vite/vitejs-privtoaddr --save
```

```bash tab:yarn
yarn add @vite/vitejs-privtoaddr
```
:::

## 引入

```javascript
import { privToAddr } from '@vite/vitejs';
// Or
import * as privToAddr from '@vite/vitejs-privtoaddr';
```

## Methods

### newHexAddr
根据私钥生成hex地址

- **Parameters**
    * `privateKey? : string | buffer` 私钥
    * `isContract? : boolean` 是否为合约地址 Default false

- **Return**
    * `addrObj : AddrObj`

- **Example**
```javascript
import { newHexAddr } from '@vite/vitejs-privtoaddr';

const { addr, pubKey, privKey, hexAddr } = newHexAddr();
```

### newHexAddrFromPub
根据公钥生成hex地址

- **Parameters**
    * `publickey : string | buffer` 公钥
    * `isContract? : boolean` 是否为合约地址 Default false

- **Return**
    * `hexaddr : HexAddr` hex编码地址

### getAddrFromHexAddr
获取真实地址

- **Parameters**
    * `hexaddr : HexAddr` hex编码地址

- **Return**
    * `addr : Addr` 真实地址

- **Example**
```javascript
import { getAddrFromHexAddr } from '@vite/vitejs-privtoaddr';

const addr = getAddrFromHexAddr('vite_69f3bdb5cdcfa145ae6cc42593a89088ff3dac587eb692d689');
// addr = '69f3bdb5cdcfa145ae6cc42593a89088ff3dac5800'
```

### getHexAddrFromAddr
通过真实地址获取hex地址

- **Parameters**
    * `addr : Addr` 真实地址

- **Return**
    * `hexaddr : HexAddr` hex编码地址

### isValidHexAddr
校验是否为合法的hex地址

- **Parameters**
    * `hexaddr : HexAddr` hex编码地址
  
- **Return**
    * `addrType : ADDR_TYPE` 非法地址: 0;  账户地址: 1; 合约账户地址: 2
