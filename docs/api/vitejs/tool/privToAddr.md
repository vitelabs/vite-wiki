
# privToAddr

:::tip abstract
@vitejs/vitejs-privtoaddr
:::

## newHexAddr
Generating hex address according to private key

- **params**
  - `privateKey?: string | buffer` Private key
- **return**
  - `addrObj: AddrObj`

## newHexAddrFromPub
Generating hex address according to public key

- **params**
  - `publickey: string | buffer` Public key
- **return**
  - `hexaddr: string` Hex encoded address

## getAddrFromHexAddr
Get real address

- **params**
  - `hexaddr: string` Hex encoded address
- **return**
  - `addr: string` Real address

## getHexAddrFromAddr
Generating hex address according to real address

- **params**
  - `addr: string` Real address
- **return**
  - `hexaddr: string` Hex encoded address

## isValidHexAddr
Verify if it is a legal hex address

- **params**
  - `hexaddr : string` Hex encoded address
- **return**
  - `validate : boolean` Legal or not
