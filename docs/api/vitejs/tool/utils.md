# Utils

## Installation

:::demo
```bash tab:npm
npm install @vite/vitejs-utils --save
```

```bash tab:yarn
yarn add @vite/vitejs-utils
```
:::

## Import

```javascript import
import { utils } from '@vite/vitejs';
// Or
import * as utils from '@vite/vitejs-utils';
```

## checkParams 

- **Parameters**
    * `obj : Object` Params that need to be verified
    * `requiredP : Array<string>` Compulsory Parameters
    * `validFunc : Array<{ name, func, msg? }>` Validation Function

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
Get original token ID

- **Parameters**
    * `tokenId : TokenId`

- **Return**
    * `rawTokenId : RawTokenId` Original token ID

## getTokenIdFromRaw
Get token ID according to original token ID

- **Parameters**
    * `rawTokenId : RawTokenId` Original token ID

- **Return**
    * `tokenId : TokenId`

## validNodeName 
Verify if the node is legal

- **Parameters**
    * `str : string` 

- **Return**
    * `target : boolean` Results: true(yes), false(no)
  
## validInteger
Verify if the input string is an integer

- **Parameters**
    * `num : string`

- **Return**
    * `target : boolean` Results: true, false

## uriStringify
Convert a transaction object into formatted uri that complies to a specific schema

- **Parameters**
    * `opt : object`
        - `opt.schema:string?` Schema type. Default is vite
        - `opt.target_address:vite Address string` Target address that the transaction will be sent to
        - `opt.chain_id?` Network id. Default is Vite mainnet 
        - `opt.function_name?` Contract function name 
        - `opt.params:object?` Other parameters 

- **Return**
    * `uri : string` 

- **Other Parameters**
  | Param Name | Type          | Desc                                     | Example                                                  |
  | ---------- | ------------- | ---------------------------------------- | --------------------------------------------------- |
  | amount     | number        | Amount of token to be sent in below token id. Default is 0               |  amount=1            |
  | data       | base64 string | Data encoded in url safe format. Default is nil      	| data=MTIzYWJjZA                                  |
  | fee        | number        | Amount of fee in below token id. Default is 0                | fee=1                         |
  | tti        | token_type_id | Token id. Default is the token id of VITE                                 | 	tti=tti_5649544520544f4b454e6e40|

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
    * `addr : Hex`
  
## hexToBytes

- **Parameters**
    * `hex : Hex`

- **Return**
    * `arr : Uint8Array` Bytes

## getBytesSize 
Get different byte length of encoded string

- **Parameters**
    * `str : string` 
    * `charset : string<'utf8' | 'utf16'>` 

- **Return**
    * `length : number`
  
## utf8ToBytes
Convert utf8 string to bytes

- **Parameters**
    * `str : string` Utf8 string

- **Return**
    * `target : Uint8Array` Bytes
  
## blake2b 
Quick reference to blake2b. See more about [blakejs/blake2b](https://www.npmjs.com/package/blakejs)

## blake2bHex
Quick reference to blake2bHex. See more about [blakejs/blake2b](https://www.npmjs.com/package/blakejs)

## _Buffer 
Quick reference to buffer.

## ed25519

### keyPair 
Get private key pair

- **Return**
    * `keyPair : KeyPairObj` Private Key Pair

- **KeyPairObj**
    * `publicKey : Uint8Array with 32-byte public key`
    * `privateKey : Uint8Array with 64-byte private key`
  
### getPublicKey
Get public key via private key (This private key has to be derived from keyPair)

- **Parameters**
    * `privateKey : Buffer`

- **Return**
    * `publicKey : Uint8Array with 32-byte public key`

### sign 

- **Parameters**
    * `message : string` 
    * `privateKey : buffer`

- **Return**
    * `signature : Hex` 
  
### verify

- **Parameters**
    * `message : string` 
    * `signature : Hex` 
    * `publicKey : Buffer` 

- **Return**
    * `target : Boolean` Result
  
### random
Generating random number

- **Parameters**
    * `bytesLen : number` Default 32

- **Return**
    * `num : Uint8Array` Random Number
