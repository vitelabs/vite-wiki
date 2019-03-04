---
sidebarDepth: 1
---

# tools

:::tip 作者
[cs](https://github.com/lovelycs)
:::

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
// ....
```  

## getRawTokenid
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
