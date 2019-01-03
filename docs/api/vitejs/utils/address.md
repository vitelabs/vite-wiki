---
sidebarDepth: 1
---

# address

:::tip 作者
[cs](https://github.com/lovelycs)
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
  - `validate : boolean` Legally or not

## hdAddr

### newAddr
根据公钥生成hex地址

- **params**
  - `bits: number` 获取多少位的助记词 default: 256
  - `lang: LangList` 语言 default: english
  - `pwd: string` 密码 default: ''
- **return**
    - `mnemonicAddrObj: object`
        - `addrObj : AddrObj`
        - `entropy : string` Entropy
        - `mnemonic : string` Mnemonic

### getAddrFromMnemonic
根据助记词获取某个地址

- **params**
  - `mnemonic : string` Mnemonic
  - `index : number` 地址序号 default: 0
  - `lang: LangList` 语言 default: english
  - `pwd: string` 密码 default: ''
- **return** 
  - `addrObj: AddrObj`

### getAddrsFromMnemonic
根据助记词获取一串地址

- **params**
  - `mnemonic: string` Mnemonic
  - `start : number` 地址序号，从第几个地址开始
  - `num : number` 个数，获取多少个地址
  - `lang: LangList` 语言 default: english
  - `pwd: string` 密码 default: ''
- **return**
  - `addrObj: AddrObj`

### getId
根据助记词生成id

- **params**
  - `mnemonic: string` Mnemonic
  - `lang: LangList` 语言 default: english
- **return**
  - `id: string` ID

### getMnemonicFromEntropy
根据熵获取助记词

- **params**
  - `entropy: string` Entropy
  - `lang: LangList` 语言 default: english
- **return**
 - `mnemonic: string` Mnemonic

### getEntropyFromMnemonic
获取助记词的熵

- **params**
  - `mnemonic: string` Mnemonic
  - `lang: LangList` 语言 default: english
- **return**
  - `entropy: string` Entropy

### validateMnemonic
Verify if it is a legal mnemonic

- **params**
  - `mnemonic: string` Mnemonic
  - `lang: LangList` 语言 default: english
- **return**
  - `validate: boolean` Legally or not

### getAddrFromHexAddr
Get real address [同privToAddr](/api/vitejs/utils/address.html#privtoaddr)

### isValidHexAddr
Verify if it is a legal hex address [同privToAddr](/api/vitejs/utils/address.html#privtoaddr)
