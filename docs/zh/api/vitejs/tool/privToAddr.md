# privToAddr

:::tip abstract
@vitejs/vitejs-privtoaddr
:::

```javascript 引入
import { privToAddr } from '@vite/vitejs';

// Or
import * as privToAddr from '@vite/vitejs-privtoaddr';
```

## newHexAddr
根据私钥生成hex地址

- **params**
  - `privateKey? : string | buffer` 私钥
- **return**
  - `addrObj : AddrObj`

```javascript ::Demo
import { newHexAddr } from '@vite/vitejs-privtoaddr';

const { addr, pubKey, privKey, hexAddr } = newHexAddr();
```

## newHexAddrFromPub
根据公钥生成hex地址

- **params**
  - `publickey : string | buffer` 公钥
- **return**
  - `hexaddr : HexAddr` hex编码地址

## getAddrFromHexAddr
获取真实地址

- **params**
  - `hexaddr : HexAddr` hex编码地址
- **return**
  - `addr : Addr` 真实地址

```javascript ::Demo
import { getAddrFromHexAddr } from '@vite/vitejs-privtoaddr';

const addr = getAddrFromHexAddr('vite_69f3bdb5cdcfa145ae6cc42593a89088ff3dac587eb692d689');
// addr = '69f3bdb5cdcfa145ae6cc42593a89088ff3dac58'
```

## getHexAddrFromAddr
通过真实地址获取hex地址

- **params**
  - `addr : Addr` 真实地址
- **return**
  - `hexaddr : HexAddr` hex编码地址

## isValidHexAddr
校验是否为合法的hex地址

- **params**
  - `hexaddr : HexAddr` hex编码地址
- **return**
  - `validate : boolean` 是否合法
