# Utils

## 引入

```javascript
import { utils } from '@vite/vitejs';
```

## uriStringify
序列化一个 vite schema 的uri

- **Parameters**
    * `opt : object`
        - `opt.schema:string?` Default vite
        - `opt.target_address:vite Address string` 对方交易地址
        - `opt.chain_id?` 网络类型，默认主网
        - `opt.function_name?` 合约方法名
        - `opt.params:object?` 其他参数

- **Return**
    * `uri : string` 

- **Other Parameters**
  | 参数名 | 类型          | 描述                                     | 例子                                                  |
  | ---------- | ------------- | ---------------------------------------- | --------------------------------------------------- |
  | amount     | number        | 交易额                 |  1vite  amount=1 ,default :0               |
  | data       | base64 string | 附加数据	| data=MTIzYWJjZA  ,default: nil                                   |
  | fee        | number        | 交易费用               |  1vite  fee=1 ,default :0                           |
  | tti        | token_type_id | 交易币种id                                | default : vite tti	tti=tti_5649544520544f4b454e6e40 |

## isValidTokenId
tokenId 是否合法

- **Parameters**
    * `TokenId` 代币ID

- **Return**
    * `boolean` 是否合法

## getOriginalTokenIdFromTokenId
获取原始代币ID

- **Parameters**
    * `tokenId : TokenId`

- **Return**
    * `rawTokenId : RawTokenId` 原始代币ID

## getTokenIdFromOriginalTokenId
根据原始代币ID，获取代币ID

- **Parameters**
    * `OriginalTokenId` 原始代币ID

- **Return**
    * `TokenId` 代币ID

## isValidSBPName 
验证是否为合法的节点名称

- **Parameters**
    * `string`  字符串 sbpName

- **Return**
    * `boolean` 验证结果: true(是), false(不是)
  
## isInteger
判断输入的字符串是否为整数

- **Parameters**
    * `string`  number字符串

- **Return**
    * `boolean` 验证结果: true(是), false(不是)

## isNonNegativeInteger
判断输入的字符串是否为非负整数

- **Parameters**
    * `string`  number字符串

- **Return**
    * ` boolean` 验证结果: true(是), false(不是)

## isSafeInteger
判断输入是否为安全的整数

- **Parameters**
    * `string | number` number 或者 number-string

- **Return**
    * `number` -1: 输入不是整型; 0: 输入为number类型，但是超出安全数字范围(或者是小数); 1: 输入正确


## isArray

- **Parameters**
    * `any`

- **Return**
    * `boolean` true | false

## isObject

- **Parameters**
    * `any`

- **Return**
    * `boolean` true | false

## isHexString
字符串是否为hex-string

- **Parameters**
    * `string`

- **Return**
    * `boolean` true | false

## isBase64String
字符串是否为base64-string

- **Parameters**
    * `string`

- **Return**
    * `boolean` true | false

## blake2b 
对blake2b的快捷引用 参考 [blakejs/blake2b](https://www.npmjs.com/package/blakejs)

## blake2bHex
对blake2bHex的快捷引用 参考 [blakejs/blake2b](https://www.npmjs.com/package/blakejs)

## _Buffer 
对buffer的快捷引用

## _bn
对bn.js的快捷引用

## ed25519

### keyPair 
获取私钥对

- **Return**
    * Object 私钥对
        - `publicKey : Uint8Array with 32-byte public key`
        - `privateKey : Uint8Array with 64-byte private key`

### getPublicKey
通过私钥获取公钥 (此私钥必须是由keyPair派生出来的)

- **Parameters**
    * `Buffer` privateKey 私钥

- **Return**
    * `Uint8Array with 32-byte public key` publicKey 公钥

### sign 
签名

- **Parameters**
    * `Hex` hex-string 字符串
    * `Hex` privateKey 私钥

- **Return**
    * `Hex` hex-string signature 签名结果
  
### verify
验证

- **Parameters**
    * `Hex` 原始信息
    * `Hex` signature 签名结果
    * `Hex` publicKey 公钥

- **Return**
    * `Boolean` 验证结果 true or false
  
### random
生成随机数

- **Parameters**
    * `number` 字节长度 Default: 32
  
- **Return**
    * `num : Uint8Array` 随机数
