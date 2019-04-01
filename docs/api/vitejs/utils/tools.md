# tools

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

## getRawTokenId
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

## uriStringify
Convert a transaction object into formatted uri that complies to a specific schema

- **params**
  - `opt : object`
    - `opt.schema:string?` Schema type. Default is vite
    - `opt.target_address:vite Address string` Target address that the transaction will be sent to
    - `opt.chain_id?` Network id. Default is Vite mainnet 
    - `opt.function_name?` Contract function name 
    - `opt.params:object?` Other parameters 
- **return**
  - `uri : string` 
- **other params**
  | Param Name | Type          | Desc                                     | Example                                                  |
  | ---------- | ------------- | ---------------------------------------- | --------------------------------------------------- |
  | amount     | number        | Amount of token to be sent in below token id. Default is 0               |  amount=1            |
  | data       | base64 string | Data encoded in url safe format. Default is nil      	| data=MTIzYWJjZA                                  |
  | fee        | number        | Amount of fee in below token id. Default is 0                | fee=1                         |
  | tti        | token_type_id | Token id. Default is the token id of VITE                                 | 	tti=tti_5649544520544f4b454e6e40|

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
