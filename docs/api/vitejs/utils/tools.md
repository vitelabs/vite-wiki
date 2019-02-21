---
sidebarDepth: 1
---

# tools

:::tip Created by
[cs](https://github.com/lovelycs)
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
