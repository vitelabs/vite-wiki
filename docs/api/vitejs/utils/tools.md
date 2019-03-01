---
sidebarDepth: 1
---

# tools

:::tip Created by
[cs](https://github.com/lovelycs) [hurrytospring](https://github.com/hurrytospring)
:::

## checkParams 

- **params**
  - `obj : Object` Params that need to be verified
  - `requiredP : Array<string>` Compulsory Parameters
  - `validFunc : Array<{ name, func, msg? }>` Validation Function
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
Get original token ID

- **params**
  - `tokenId : string` Token ID
- **return**
  - `rawTokenId : string` Original token ID

## getTokenIdFromRaw
Get token ID according to original token ID

- **params**
  - `rawTokenId : string` Original token ID
- **return**
  - `tokenId : string` Token ID

## validNodeName 
Verify if the node is legal

- **params**
  - `str : string` 
- **return**
  - `target : boolean` Results: true(yes), false(no)
  
## validInteger
Verify if the input string is an integer

- **params**
  - `num : string`
- **return**
  - `target : boolean` Results: true, false

## stringify a transcation info to  vite uri

- **params**
  - `opt : object`
  - `opt.schema:string?` default vite
  - `opt.target_address:vite Address string` An address the tx will be send to
  - `opt.chain_id?`default  net type 
  - `opt.function_name?`contract function name 
  - `opt.params:object?` other params 
- **return**
  - `uri : string` 
- **other params**
  | param name | type          | desc                                     | eg                                                  |
  | ---------- | ------------- | ---------------------------------------- | --------------------------------------------------- |
  | amount     | number        | a number of amount                 |  1vite  amount=1 ,default :0               |
  | data       | base64 string | url safe encoded data	| data=MTIzYWJjZA  ,default: nil                                   |
  | fee        | number        | a number of fee                |  1vite  fee=1 ,default :0                           |
  | tti        | token_type_id | token id                                 | 	tti=tti_5649544520544f4b454e6e40 ,default : vite tti |