---
eip: 2
author: 朱天涛
status: Active
type: Meta
created: 2018-9-1
---

# VEP 4: QR code specification

This spec mainly refers to [EIP-681](https://eips.ethereum.org/EIPS/eip-681) and stays maximum consistency with that of Ethereum.
***
## Syntax
```c++
request                 = "vite" ":" [ prefix "-" ][target_address] [ "@" chain_id ] [ "/" function_name ] [ "?" parameters ]
prefix                  = STRING
target_address          = vite_address
chain_id                = 1*DIGIT
function_name           = STRING
vite_address            = ( "vite_" 50*HEXDIG ) / VNS_NAME
parameters              = parameter *( "&" parameter )
parameter               = key "=" value
key                     = "value" / TYPE
value                   = number / vite_address / token_type_id / gid / STRING  
token_type_id           = "tti_" 24 *HEXDIG
gid                     = Consensus group ID
number                  = [ "-" / "+" ] *DIGIT [ "." 1*DIGIT ] [ ( "e" / "E" ) [ 1*DIGIT ] [ "+" UNIT ]
```

* **TYPE** has the same standard as Ethereum ABI. See [Ethereum ABI spec](https://solidity.readthedocs.io/en/develop/abi-spec.html)
* **STRING** is a string of URLEncode
* **number** is represented in scientific notation
* **VNS_NAME** standard is *yet under construction*
***
## Semantics

* **prefix** identifies transaction type. The default type is transfer or contract invocation. **prefix** 0-9 have been reserved for internal use.
* **chain_id** identifies network type such as mainnet, testnet or private net. It's optional. If not specified, **chain_id** will be set to caller's network ID.

Below fields are required if **prefix** corresponds to contract invocation:
* **function_name** - contract function name;
* **target_address** - contract address to be called;
* **parameters** - function parameters. 

For example, `vite:vite_fa1d81d93bcc36f234f7bccf1403924a0834609f4b2e9856ad/echo?string="helloworld"&string="goodbye"`
represents an invocation to `echo` function on contract `vite_fa1d81d93bcc36f234f7bccf1403924a0834609f4b2e9856ad` with 2 string parameters passed in. 
***
## More examples
* Show an account address

`vite:vite_fa1d81d93bcc36f234f7bccf1403924a0834609f4b2e9856ad`

* Transfer

`vite:vite_fa1d81d93bcc36f234f7bccf1403924a0834609f4b2e9856ad?tti=tti_2445f6e5cde8c2c70e446c83&amount=1&decimals=1e18`

**tti**(token type id) stands for what token you want to transfer. If not specified, default is VITE. The transfer amount is **amount** * **decimals**, or **amount** * **min_decimals(token)** if **decimals** is not present. 

* Issue new token

`vite:2-vite_fa1d81d93bcc36f234f7bccf1403924a0834609f4b2e9856ad?totalsupply=10e10&decimals=1e18&name=xite`

Use **prefix**=2 to identify this is a token issuance transaction

* Create new contract

`vite:3-?code=....&gid=GID&tti=tti_2445f6e5cde8c2c70e446c83&amount=1`

Use **prefix**=3 to identify a transaction of creating contract. **code** is bytecode of the contract; **gid** is consensus group ID of the contract(if not specified, default is global consensus group); **tti** and **amount** are used to transfer a amount of tokens to the contract when it is created. 


