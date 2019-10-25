# 更多方法

:::warning Notice

**密码短语 passphrase**
bip39使用 PBKDF2 生成seed。助记词作为其中的password, 密码短语passphrase作为盐值(salt)

如果使用助记词 + passphrase的形式生成种子，passphrase遗失也将丢失私钥

具体可参考 https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki

:::

## getEntropyFromMnemonics
根据助记词获取熵

- **Parameters** 
    * `number` 选填，entropy的位数(bit)，Default 256 (256 即生成24个单词；128 即生成12个单词)
    * `Array<String>` 选填，选词列表， Default bip39.wordlists.EN，若需要其他语言可从bip39库中单独选取并传入

- **Return**
    * `Hex` 熵

## getSeedFromMnemonics
根据助记词获取种子

- **Parameters** 
    * `String` 必填，助记词
    * `String` 选填，密码短语 passphrase, Default ''
    * `Array<String>` 选填，选词列表， Default bip39.wordlists.EN，若需要其他语言可从bip39库中单独选取并传入

- **Return**
    * `Object`
        - `seed: Buffer` 种子 Buffer
        - `seedHex: Hex` 种子 hex-string

## createSeed
创建种子

- **Parameters** 
    * `number` 选填，entropy的位数(bit)，Default 256 (256 即生成24个单词；128 即生成12个单词)
    * `String`  选填，密码短语 passphrase, Default ''
    * `Array<String>` 选填，选词列表， Default bip39.wordlists.EN，若需要其他语言可从bip39库中单独选取并传入

- **Return**
    * `Object`
        - `mnemonic: String` 助记词
        - `seed: Buffer` 种子 Buffer
        - `seedHex: Hex` 种子 hex-string

## getMnemonicsFromEntropy
根据熵获取助记词

- **Parameters** 
    * `Hex` 必填，熵
    * `Array<String>` 选填，选词列表， Default bip39.wordlists.EN，若需要其他语言可从bip39库中单独选取并传入

- **Return**
    * `String` 助记词

## getPath
获取路径

- **Parameters** 
    * `number` 必填，index

- **Return**
    * `String` 派生路径

## deriveKeyPairByPath
通过路径派生私钥对

- **Parameters** 
    * `String` 必填，seed
    * `String` 必填，路径

- **Return**
    * `Object` 秘钥对
        - `privateKey: Hex` 私钥
        - `publicKey: Hex` 公钥

## deriveKeyPairByIndex
通过index派生私钥对

- **Parameters** 
    * `String` 必填，seed
    * `number` 必填，index

- **Return**
    * `Object` 秘钥对
        - `privateKey: Hex` 私钥
        - `publicKey: Hex` 公钥

## createAddressByPrivateKey
通过私钥创建地址

- **Parameters** 
    * `Hex?` 选填，私钥（如果没有，则会自动生成私钥）
    * `boolean?` 选填，是否为合约地址。Default false

- **Return**
    * `AddressObj`
        - `originalAddress: Hex` 原始地址
        - `publicKey: Hex`  公钥
        - `privateKey: Hex` 私钥
        - `address: Address` 地址

## getAddressFromPublicKey
通过公钥得到地址

- **Parameters** 
    * `Hex` 必填，公钥
    * `boolean?` 选填，是否为合约地址。Default false

- **Return**
    * `Address` 地址

## getOriginalAddressFromAddress
通过地址得到原始地址

- **Parameters** 
    * `Address` 必填，地址

- **Return**
    * `originalAddress` 原始地址

## getAddressFromOriginalAddress
通过原始地址得到地址

- **Parameters** 
    * `originalAddress` 必填，原始地址
    * `boolean?` 选填，是否为合约地址。Default false

- **Return**
    * `Address` 地址
