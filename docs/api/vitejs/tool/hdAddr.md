# hdAddr

:::tip abstract
@vitejs/vitejs-hdaddr
:::

## newAddr
Generate Hex address according to public key

- **params**
  - `bits: number` Decimals of mnemonic words default: 256
  - `lang: LangList` Language default: english
  - `pwd: string` Password default: ''
- **return**
    - `mnemonicAddrObj: object`
        - `addrObj : AddrObj`
        - `entropy : string` Entropy
        - `mnemonic : string` Mnemonic words

## getAddrFromMnemonic
Get an address by mnemonic words

- **params**
  - `mnemonic : string` Mnemonic words
  - `index : number` Number, default: 0
  - `lang: LangList` Language, default: english
  - `pwd: string` Password, default: ''
- **return** 
  - `addrObj: AddrObj`

## getAddrsFromMnemonic
Get a group of addresses by mnemonic words

- **params**
  - `mnemonic: string` Mnemonic
  - `start : number` Start from which address number
  - `num : number` Amount of addresses
  - `lang: LangList` Language, default: english
  - `pwd: string` Password, default: ''
- **return**
  - `addrObj: AddrObj`

## getId
Generate ID via mnemonic words

- **params**
  - `mnemonic: string` Mnemonic words
  - `lang: LangList` Language, default: english
- **return**
  - `id: string` ID

## getMnemonicFromEntropy
Get mnemonic words via entropy

- **params**
  - `entropy: string` Entropy
  - `lang: LangList` Language, default: english
- **return**
 - `mnemonic: string` Mnemonic words

## getEntropyFromMnemonic
Get entropy of mnemonic words

- **params**
  - `mnemonic: string` Mnemonic words
  - `lang: LangList` Language, default: english
- **return**
  - `entropy: string` Entropy

## validateMnemonic
Verify if it is a legal mnemonic words

- **params**
  - `mnemonic: string` Mnemonic words
  - `lang: LangList` Language default: english
- **return**
  - `validate: boolean` Legal or not

## getAddrFromHexAddr
Get actual address [Same as privToAddr](/api/vitejs/tool/privToAddr.html)

## isValidHexAddr
Verify if it is a legal hex address [Same as privToAddr](/api/vitejs/tool/privToAddr.html)
