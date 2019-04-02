# VEP 4: QR Code Specification

This specification mainly refers to [EIP-681](https://eips.ethereum.org/EIPS/eip-681) and keeps maximum consistency with it.

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

* `TYPE` is in the same standard as Ethereum. See [Ethereum ABI Specification](https://solidity.readthedocs.io/en/develop/abi-spec.html)
* `STRING` is a string of `URLEncode`
* `number` is represented in scientific notation
* `VNS_NAME` standard is still *under construction*

## Semantics

* `prefix` identifies transaction type. Default is type of transfer or smart contract invocation. Prefix 0-9 are reserved for internal use.
* `chain_id` identifies network type such as main net, test net and private net. This field is optional and will be in align with the requester's network ID if not specified.

The following fields must be provided if the prefix type stands for smart contract invocation:
* `function_name` - the calling method name
* `target_address` - smart contract address
* `parameters` - passed-in parameters

For example, `vite:vite_fa1d81d93bcc36f234f7bccf1403924a0834609f4b2e9856ad/echo?string="helloworld"&string="goodbye"`
represents an invocation to method `echo` of contract "vite_fa1d81d93bcc36f234f7bccf1403924a0834609f4b2e9856ad" with 2 string parameters "helloworld" and "goodbye". 

## Examples

* Display account address

`vite:vite_fa1d81d93bcc36f234f7bccf1403924a0834609f4b2e9856ad`

* Transfer

`vite:vite_fa1d81d93bcc36f234f7bccf1403924a0834609f4b2e9856ad?tti=tti_2445f6e5cde8c2c70e446c83&amount=1&decimals=1e18`

`tti`(Token Type ID) stands for in what token the transfer takes place. Default is "VITE" if not specified. Transferring amount is calculated by `amount * decimals`, or `amount * min_decimals(token)` if `decimals` is not present. 

* Issue new token

`vite:2-vite_fa1d81d93bcc36f234f7bccf1403924a0834609f4b2e9856ad?totalsupply=10e10&decimals=1e18&name=xite`

Prefix `2` means this is a transaction of token issuance.

* Create new smart contract

`vite:3-?code=....&gid=GID&tti=tti_2445f6e5cde8c2c70e446c83&amount=1`

Prefix `3` means this is a transaction to create smart contract. 
`code` is bytecode of the contract. 
`gid` is consensus group ID if the contract has designated one. If not, global consensus group is used by default. 
`tti` and `amount` are useful if an initial amount of tokens are transferred to contract during creation. 


