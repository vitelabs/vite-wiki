# utils

:::tip abstract
@vitejs/vitejs-utils
:::

```javascript 引入
import { utils } from '@vite/vitejs';

// Or
import * as utils from '@vite/vitejs-utils';
```

## checkParams 
检验参数

- **params**
  - `obj : Object` 参与校验的参数
  - `requiredP : Array<string>` 定义必填参数
  - `validFunc : Array<{ name, func, msg? }>` 校验函数
- **return**
  - `error : null | Object<code, message>`
- **Example**:

```javascript
// ....
   function test(a, b, c, d) {
        let err = checkParams({ a, b, c, d }, ['b', 'c'], [{
            name: 'a',
            func: (_a) => {
                return validA(_a);
            },
            msg: 'Is not A'
        },{
            name: 'd',
            func: (_d) => {
                return validD(_d);
            }
        }]);

        if (err) {
            return err;
        }

        // Continue ...
   }
// ....
```  

## getRawTokenId
获取原始 token ID

- **params**
  - `tokenId : string` Token ID
- **return**
  - `rawTokenId : string` 原始 token ID

## getTokenIdFromRaw
根据原始 token ID，获取展示 token ID

- **params**
  - `rawTokenId : string` 原始 token ID
- **return**
  - `tokenId : string` Token ID

## validNodeName 
验证是否为合法的节点名称

- **params**
  - `str : string`  字符串
- **return**
  - `target : boolean` 验证结果: true(是), false(不是)
  
## validInteger
判断输入的字符串是否为整数

- **params**
  - `num : string`  字符串
- **return**
  - `target : boolean` 验证结果: true(是), false(不是)

## uriStringify
序列化一个 vite schema 的uri

- **params**
  - `opt : object`
    - `opt.schema:string?` default vite
    - `opt.target_address:vite Address string` 对方交易地址
    - `opt.chain_id?`default  网络类型，默认主网
    - `opt.function_name?`合约方法名
    - `opt.params:object?` 其他参数
- **return**
  - `uri : string` 
- **otherparams**
  | 参数名 | 类型          | 描述                                     | 例子                                                  |
  | ---------- | ------------- | ---------------------------------------- | --------------------------------------------------- |
  | amount     | number        | 交易数目                 |  1vite  amount=1 ,default :0               |
  | data       | base64 string | 附加数据	| data=MTIzYWJjZA  ,default: nil                                   |
  | fee        | number        | 交易费用               |  1vite  fee=1 ,default :0                           |
  | tti        | token_type_id | 交易币种id                                | default : vite tti	tti=tti_5649544520544f4b454e6e40 |

## isArray

- **params**
  - `params : any`
- **return**
  - `result : boolean`

## isObject

- **params**
  - `params : any`
- **return**
  - `result : boolean`

## bytesToHex 
- **params**
  - `arr : buffer`
- **return**
  - `addr : string` hex string  
  
## hexToBytes
- **params**
  - `hex : string` hex
- **return**
  - `arr : array` bytes

## getBytesSize 
获取不同编码字符串的字节长度

- **params**
  - `str : string`  字符串
  - `charset : utf8 | utf16` 编码格式
- **return**
  - `length : number` 字节长度
  
## utf8ToBytes
utf8字符串转换为字节

- **params**
  - `str : string` uft8编码字符串
- **return**
  - `target : Uint8Array` 字节
  
## blake2b 
对blake2b的快捷引用 参考 [blakejs/blake2b](https://www.npmjs.com/package/blakejs)

## blake2bHex
对blake2bHex的快捷引用 参考 [blakejs/blake2b](https://www.npmjs.com/package/blakejs)

## _Buffer 
对buffer的快捷引用

## ed25519

### KeyPairObj

- `publicKey : Uint8Array with 32-byte public key` 公钥
- `secretKey : Uint8Array with 64-byte secret key` 私钥

### keyPair 
获取私钥对

- **return**
  - `keyPair : KeyPairObj` 私钥对
  
### getPublicKey
通过私钥获取公钥 (此私钥必须是由keyPair派生出来的)

- **params**
  - `privKey : Buffer` 私钥
- **return**
  - `publicKey : Uint8Array with 32-byte public key` 公钥

### sign 
签名

- **params**
  - `message : string` 字符串
  - `privKey : buffer` 私钥
- **return**
  - `signature : Hex String` 签名结果
  
### verify
验证

- **params**
  - `message : string` 字符串
  - `signature : Hex String` 签名结果
  - `publicKey : Buffer` 公钥
- **return**
  - `target : Boolean` 验证结果
  
### random
生成随机数

- **params**
  - `bytesLen : number` 字节长度, default: 32
- **return**
  - `num : Uint8Array` 随机数
