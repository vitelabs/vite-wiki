# Utils

## 安装

:::demo
```bash tab:npm
npm install @vite/vitejs-utils --save
```

```bash tab:yarn
yarn add @vite/vitejs-utils
```
:::

## 引入

```javascript
import { utils } from '@vite/vitejs';
// Or
import * as utils from '@vite/vitejs-utils';
```

## checkParams 
检验参数

- **Parameters**
    * `obj : Object` 参与校验的参数
    * `requiredP : Array<string>` 定义必填参数
    * `validFunc : Array<{ name, func, msg? }>` 校验函数

- **Return**
    * `error : null | Object<code, message>`

- **Example**
```javascript
import { checkParams } from '@vite/vitejs-utils';

function test(a, b, c, d) {
    let err = checkParams({ a, b, c, d }, ['b', 'c'], [{
        name: 'a',
        func: (_a)=>{
            return validA(_a);
        },
        msg: 'Is not A'
    },{
        name: 'd',
        func: (_d)=>{
            return validD(_d);
        }
    }]);

    if (err) {
        return err;
    }

    // Continue ...
}

test(a); // Got an error
```  

## getRawTokenId
获取原始 token ID

- **Parameters**
    * `tokenId : TokenId`

- **Return**
    * `rawTokenId : RawTokenId` 原始 token ID

## getTokenIdFromRaw
根据原始 token ID，获取展示 token ID

- **Parameters**
    * `rawTokenId : RawTokenId` 原始 token ID

- **Return**
    * `tokenId : TokenId`

## validNodeName 
验证是否为合法的节点名称

- **Parameters**
    * `str : string`  字符串

- **Return**
    * `target : boolean` 验证结果: true(是), false(不是)
  
## validInteger
判断输入的字符串是否为整数

- **Parameters**
    * `num : string`  字符串

- **Return**
    * `target : boolean` 验证结果: true(是), false(不是)

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
  | amount     | number        | 交易数目                 |  1vite  amount=1 ,default :0               |
  | data       | base64 string | 附加数据	| data=MTIzYWJjZA  ,default: nil                                   |
  | fee        | number        | 交易费用               |  1vite  fee=1 ,default :0                           |
  | tti        | token_type_id | 交易币种id                                | default : vite tti	tti=tti_5649544520544f4b454e6e40 |

## isArray

- **Parameters**
    * `params : any`

- **Return**
    * `result : boolean`

## isObject

- **Parameters**
    * `params : any`

- **Return**
    * `result : boolean`

## bytesToHex 

- **Parameters**
    * `arr : buffer`

- **Return**
    * `hex : Hex`
  
## hexToBytes

- **Parameters**
    * `hex : Hex`

- **Return**
    * `arr : Uint8Array` 字节

## getBytesSize 
获取不同编码字符串的字节长度

- **Parameters**
    * `str : string`  字符串
    * `charset : string<'utf8' | 'utf16'>` 编码格式

- **Return**
    * `length : number` 字节长度
  
## utf8ToBytes
utf8字符串转换为字节

- **Parameters**
    * `str : string` uft8编码字符串

- **Return**
    * `target : Uint8Array` 字节
  
## blake2b 
对blake2b的快捷引用 参考 [blakejs/blake2b](https://www.npmjs.com/package/blakejs)

## blake2bHex
对blake2bHex的快捷引用 参考 [blakejs/blake2b](https://www.npmjs.com/package/blakejs)

## _Buffer 
对buffer的快捷引用

## ed25519

### keyPair 
获取私钥对

- **Return**
    * `keyPair : KeyPairObj` 私钥对

- **KeyPairObj**
    * `publicKey : Uint8Array with 32-byte public key`
    * `privateKey : Uint8Array with 64-byte private key`
  
### getPublicKey
通过私钥获取公钥 (此私钥必须是由keyPair派生出来的)

- **Parameters**
    * `privateKey : Buffer`

- **Return**
    * `publicKey : Uint8Array with 32-byte public key`

### sign 
签名

- **Parameters**
    * `message : string` 字符串
    * `privateKey : buffer`

- **Return**
    * `signature : Hex` 签名结果
  
### verify
验证

- **Parameters**
    * `message : string` 字符串
    * `signature : Hex` 签名结果
    * `publicKey : Buffer`

- **Return**
    * `target : Boolean` 验证结果
  
### random
生成随机数

- **Parameters**
    * `bytesLen : number` 字节长度 Default: 32
  
- **Return**
    * `num : Uint8Array` 随机数
