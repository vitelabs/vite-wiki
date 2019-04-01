# utils

:::tip abstract
@vitejs/vitejs-utils
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
Get different byte length of encoded string

- **params**
  - `str : string` 
  - `charset : utf8 | utf16` 
- **return**
  - `length : number`
  
## utf8ToBytes
Convert utf8 string to bytes

- **params**
  - `str : string` utf8 string
- **return**
  - `target : Uint8Array` Bytes
  
## blake2b 
Quick reference to blake2b. See more about [blakejs/blake2b](https://www.npmjs.com/package/blakejs)

## blake2bHex
Quick reference to blake2bHex. See more about [blakejs/blake2b](https://www.npmjs.com/package/blakejs)

## _Buffer 
Quick reference to buffer.

## ed25519

### KeyPairObj

- `publicKey : Uint8Array with 32-byte public key` Public Key
- `secretKey : Uint8Array with 64-byte secret key` Private Key

### keyPair 
Get private key pair

- **return**
  - `keyPair : KeyPairObj` Private Key Pair
  
### getPublicKey
Get public key via private key (This private key has to be derived from keyPair)

- **params**
  - `privKey : Buffer` Public Key
- **return**
  - `publicKey : Uint8Array with 32-byte public key` Private Key

### sign 

- **params**
  - `message : string` 
  - `privKey : buffer` Private Key
- **return**
  - `signature : Hex String` 
  
### verify

- **params**
  - `message : string` 
  - `signature : Hex String` 
  - `publicKey : Buffer` 
- **return**
  - `target : Boolean` Result
  
### random
Generating random number

- **params**
  - `bytesLen : number`, default: 32
- **return**
  - `num : Uint8Array` Random Number
