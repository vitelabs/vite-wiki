---
sidebarDepth: 1
---

# address

:::tip 作者
[cs](https://github.com/lovelycs)
[hurrytospring](https://github.com/hurrytospring)
:::

:::tip abstract
utils 包含常用的工具方法，例如：address生成，keystore加密等。
:::

## privToAddr

### newHexAddr
根据私钥生成hex地址

- **params**
  - `privateKey: string | buffer` 私钥
- **return**
  - `addrObj: AddrObj`

### newHexAddrFromPub
根据公钥生成hex地址

- **params**
  - `publickey: string | buffer` 公钥
- **return**
  - `hexaddr: string` hex编码地址

### getAddrFromHexAddr
获取真实地址

- **params**
  - `hexaddr: string` hex编码地址
- **return**
  - `addr: string` 真实地址

### isValidHexAddr
校验是否为合法的hex地址

- **params**
  - `hexaddr : string` hex编码地址
- **return**
  - `validate : boolean` 是否合法

## hdAddr

### newAddr
根据公钥生成hex地址

- **params**
  - `bits: number` 获取多少位的助记词 default: 256
- **return**
    - `mnemonicAddrObj: object`
        - `addrObj : AddrObj`
        - `entropy : string` 熵
        - `mnemonic : string` 助记词

### getAddrFromMnemonic
根据助记词获取某个地址

- **params**
  - `mnemonic : string` 助记词
  - `index : number` 地址序号 default: 0
- **return**
  - `addrObj: AddrObj`

### getAddrsFromMnemonic
根据助记词获取一串地址

- **params**
  - `mnemonic: string` 助记词
  - `start : number` 地址序号，从第几个地址开始
  - `num : number` 个数，获取多少个地址
- **return**
  - `addrObj: AddrObj`

### getId
根据助记词生成id

- **params**
  - `mnemonic: string` 助记词
- **return**
  - `id: string` ID

### getMnemonicFromEntropy
根据熵获取助记词

- **params**
  - `entropy: string` 熵
- **return**
 - `mnemonic: string` 助记词

### getEntropyFromMnemonic
获取助记词的熵

- **params**
  - `mnemonic: string` 助记词
- **return**
  - `entropy: string` 熵

### validateMnemonic
校验是否为合法的助记词

- **params**
  - `mnemonic: string` 助记词
- **return**
  - `validate: boolean` 是否合法

### getAddrFromHexAddr
获取真实地址 [同 privToAddr]

### isValidHexAddr
校验是否为合法的hex地址 [同 privToAddr]
