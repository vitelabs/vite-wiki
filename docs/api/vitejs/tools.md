---
sidebarDepth: 1
---

# tools

:::tip 作者
[cs](https://github.com/lovelycs)
[hurrytospring](https://github.com/hurrytospring)
:::

:::tip abstract
utils 包含常用的工具方法，例如：address生成，keystore加密等。
:::  

## checkParams 
检验参数

- **params**
  - `obj : Object` 参与校验的参数
  - `requiredP : Array<string>` 必填参数
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
