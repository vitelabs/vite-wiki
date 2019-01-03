---
sidebarDepth: 1
---

# Address

:::tip Created by
[cs](https://github.com/lovelycs)
:::

:::tip Abstract
Utils include common tool sets such as generating address and encrypting keystore, etc.
:::

## privToAddr

### newHexAddr
Generating hex address according to private key

- **params**
  - `privateKey: string | buffer` Private key
- **return**
  - `addrObj: AddrObj`

### newHexAddrFromPub
Generating hex address according to public key

- **params**
  - `publickey: string | buffer` Public key
- **return**
  - `hexaddr: string` Hex encoded address

### getAddrFromHexAddr
Get real address

- **params**
  - `hexaddr: string` Hex encoded address
- **return**
  - `addr: string` Real address

### isValidHexAddr
Verify if it is a legal hex address

- **params**
  - `hexaddr : string` Hex encoded address
- **return**
  - `validate : boolean` Legal or not

## hdAddr

### newAddr
Generate Hex address according to public key

- **params**
  - `bits: number` Decimals of mnemonic words default: 256
- **return**
    - `mnemonicAddrObj: object`
        - `addrObj : AddrObj`
        - `entropy : string` Entropy
        - `mnemonic : string` Mnemonic words

### getAddrFromMnemonic
Get an address by mnemonic words

- **params**
  - `mnemonic : string` Mnemonic words
  - `index : number` Number, default: 0
- **return**
  - `addrObj: AddrObj`

### getAddrsFromMnemonic
Get a group of addresses by mnemonic words

- **params**
  - `mnemonic: string` Mnemonic
  - `start : number` Start from which address number
  - `num : number` Amount of addresses
- **return**
  - `addrObj: AddrObj`

### getId
Generate ID via mnemonic words

- **params**
  - `mnemonic: string` Mnemonic words
- **return**
  - `id: string` ID

### getMnemonicFromEntropy
Get mnemonic words via entropy

- **params**
  - `entropy: string` Entropy
- **return**
 - `mnemonic: string` Mnemonic words

### getEntropyFromMnemonic
Get entropy of mnemonic words

- **params**
  - `mnemonic: string` Mnemonic words
- **return**
  - `entropy: string` Entropy

### validateMnemonic
Verify if it is a legal mnemonic words

- **params**
  - `mnemonic: string` Mnemonic words
- **return**
  - `validate: boolean` Legal or not

### getAddrFromHexAddr
Get real address [Same as privToAddr]

### isValidHexAddr
Verify if it is a legal hex address [Same as privToAddr]



