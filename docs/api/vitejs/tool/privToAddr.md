# PrivToAddr

## Installation

:::demo
```bash tab:npm
npm install @vite/vitejs-privtoaddr --save
```

```bash tab:yarn
yarn add @vite/vitejs-privtoaddr
```
:::

## Import

```javascript
import { privToAddr } from '@vite/vitejs';
// Or
import * as privToAddr from '@vite/vitejs-privtoaddr';
```

## Methods

### newHexAddr
Generating hex address according to private key

- **Parameters**
    * `privateKey? : string | buffer` Private key
    * `isContract? : boolean` Is it a contract address? Default false

- **Return**
    * `addrObj : AddrObj`

- **Example**
```javascript
import { newHexAddr } from '@vite/vitejs-privtoaddr';

const { addr, pubKey, privKey, hexAddr } = newHexAddr();
```

### newHexAddrFromPub
Generating hex address according to public key

- **Parameters**
    * `publickey : string | buffer` Public key
    * `isContract? : boolean` Is it a contract address? Default false

- **Return**
    * `hexaddr : HexAddr` Hex encoded address

### getAddrFromHexAddr
Get real address

- **Parameters**
    * `hexaddr : HexAddr` Hex encoded address

- **Return**
    * `addr : Addr` Real address

- **Example**
```javascript
import { getAddrFromHexAddr } from '@vite/vitejs-privtoaddr';

const addr = getAddrFromHexAddr('vite_69f3bdb5cdcfa145ae6cc42593a89088ff3dac587eb692d689');
// addr = '69f3bdb5cdcfa145ae6cc42593a89088ff3dac5800'
```

### getHexAddrFromAddr
Generating hex address according to real address

- **Parameters**
    * `addr : Addr` Real address

- **Return**
    * `hexaddr : HexAddr` Hex encoded address

### isValidHexAddr
Verify if it is a legal hex address

- **Parameters**
    * `hexaddr : HexAddr` Hex encoded address
  
- **Return**
    * `validate : boolean` Legal or not
