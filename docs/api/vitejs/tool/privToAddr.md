
# privToAddr

:::tip abstract
@vitejs/vitejs-privtoaddr
:::

```javascript import
import { privToAddr } from '@vite/vitejs';

// Or
import * as privToAddr from '@vite/vitejs-privtoaddr';
```

## newHexAddr
Generating hex address according to private key

- **params**
  - `privateKey? : string | buffer` Private key
- **return**
  - `addrObj : AddrObj`

```javascript ::Demo
import { newHexAddr } from '@vite/vitejs-privtoaddr';

const { addr, pubKey, privKey, hexAddr } = newHexAddr();
```

## newHexAddrFromPub
Generating hex address according to public key

- **params**
  - `publickey : string | buffer` Public key
- **return**
  - `hexaddr : HexAddr` Hex encoded address

## getAddrFromHexAddr
Get real address

- **params**
  - `hexaddr : HexAddr` Hex encoded address
- **return**
  - `addr : Addr` Real address

```javascript ::Demo
import { getAddrFromHexAddr } from '@vite/vitejs-privtoaddr';

const addr = getAddrFromHexAddr('vite_69f3bdb5cdcfa145ae6cc42593a89088ff3dac587eb692d689');
// addr = '69f3bdb5cdcfa145ae6cc42593a89088ff3dac58'
```

## getHexAddrFromAddr
Generating hex address according to real address

- **params**
  - `addr : Addr` Real address
- **return**
  - `hexaddr : HexAddr` Hex encoded address

## isValidHexAddr
Verify if it is a legal hex address

- **params**
  - `hexaddr : HexAddr` Hex encoded address
- **return**
  - `validate : boolean` Legal or not
