# Ledger
:::tip Maintainer
[lyd00](https://github.com/lyd00)
:::

## ledger_getBlocksByAccAddr
Return the transaction list of the account, equivalent to all blocks in the account chain

- **Parameters**:

  * `string`: `Addr`  The account address
  * `int`:  `Index` Page index
  * `int`: `Count`  Page size


- **Returns**:  `Array&lt;AccountBlock&gt;`
  
- **Example**:

::: demo

```json tab:Request
{
	"jsonrpc": "2.0",
	"id": 17,
	"method": "ledger_getBlocksByAccAddr",
	"params": ["vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68", 0, 10]
}
```

```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 17,
    "result": [
        {
            "blockType": 4,
            "hash": "8f37904d4df342569a2f79d8deb496c03c89eb89353cf027b1d7dc6dafcb351a",
            "prevHash": "0000000000000000000000000000000000000000000000000000000000000000",
            "accountAddress": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68",
            "publicKey": "OvmkehEUDGgcKyqFpM6Yf6sGklibLOIzv34XS9QwF3o=",
            "toAddress": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
            "fromBlockHash": "5113171e23ac1cdfcb6851f9bea7ad050058acccbe2e6faf8f5a2231f02c5f7c",
            "tokenId": "tti_5649544520544f4b454e6e40",
            "snapshotHash": "fc08446111289c671fe1547f634afcde92fab289c11fe16380958305b2f379ad",
            "data": null,
            "timestamp": "2018-10-11T01:21:45.899730786+08:00",
            "stateHash": "53af30da1fc818c9a03ef539aadf7a1e0c90039d5c4eb42143dd9cfc211adbe6",
            "logHash": "0000000000000000000000000000000000000000000000000000000000000000",
            "nonce": "1GO9X2PtbDM=",
            "signature": "rVA04yeWgERnmzVJ0LsLqIEkjn6r2BrePyxOCS2N4l+UKy3mjaIWO5ybk8sc6qiVR91reEwXHwyfeFo+CjNNCg==",
            "height": "1",
            "quota": "0",
            "amount": "1000000000000000000000000000",
            "receiveBlockHeight": "",
            "receiveBlockHash": null,
            "fee": "0",
            "confirmedTimes": "0",
            "tokenInfo": {
                "tokenName": "Vite Token",
                "tokenSymbol": "VITE",
                "totalSupply": "1000000000000000000000000000",
                "decimals": 18,
                "owner": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68",
                "pledgeAmount": "0",
                "withdrawHeight": "0"
            }
        }
    ]
}

```

```json test
{
	"jsonrpc": "2.0",
	"id": 17,
	"method": "ledger_getBlocksByAccAddr",
	"params": ["vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68", 0, 10]
}
```
:::


## ledger_getAccountByAccAddr
Return the detailed account information, including the height of account chain and the respective balance of different tokens

- **Parameters**: 
  * string: The account address

- **Returns**:

  `Object` : The detailed account information
   -  `AccountAddress` : `string of addr` The account address
   -  `TokenBalanceInfoMap` : `Map<string of TokenTypeId>token` The balance map of tokens, having token ID as key and balance as value
   -  `TotalNumber` : `string of uint64` The total number of transaction, equivalent to the height of account block

- **Example**:

::: demo
```json tab:Request
{
	"jsonrpc": "2.0",
	"id": 5,
	"method": "ledger_getAccountByAccAddr",
	"params": ["vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68"]
}
```

```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 5,
    "result": {
        "accountAddress": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68",
        "totalNumber": "1",
        "tokenBalanceInfoMap": {
            "tti_5649544520544f4b454e6e40": {
                "tokenInfo": {
                    "tokenName": "Vite Token",
                    "tokenSymbol": "VITE",
                    "totalSupply": "1000000000000000000000000000",
                    "decimals": 18,
                    "owner": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68",
                    "pledgeAmount": "0",
                    "withdrawHeight": "0"
                },
                "totalAmount": "1000000000000000000000000000",
                "number": null
            }
        }
    }
}
```
```json test
{
	"jsonrpc": "2.0",
	"id": 5,
	"method": "ledger_getAccountByAccAddr",
	"params": ["vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68"]
}
```
:::

## ledger_getLatestSnapshotChainHash
Return the hash of latest snapshot block

- **Parameters**: null 

- **Returns**: `Hash` The hash of latest snapshot block

- **Example**:
::: demo
```json tab:Request
{"jsonrpc":"2.0","id":1,"method":"ledger_getLatestSnapshotChainHash","params":null}
```
```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "fc08446111289c671fe1547f634afcde92fab289c11fe16380958305b2f379ad"
}
```
```json test
{"jsonrpc":"2.0","id":1,"method":"ledger_getLatestSnapshotChainHash","params":null}
```
::: 

## ledger_getLatestBlock
Return the latest account block

- **Parameters**: `Address` The account address

- **Returns**: `AccountBlock` The latest account block 

- **Example**:
::: demo
```json tab:Request
{
    "jsonrpc": "2.0",
    "id": 3,
    "method": "ledger_getLatestBlock",
    "params": [
        "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68"
    ]
}
```
```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 3,
    "result": {
        "blockType": 4,
        "hash": "8f37904d4df342569a2f79d8deb496c03c89eb89353cf027b1d7dc6dafcb351a",
        "prevHash": "0000000000000000000000000000000000000000000000000000000000000000",
        "accountAddress": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68",
        "publicKey": "OvmkehEUDGgcKyqFpM6Yf6sGklibLOIzv34XS9QwF3o=",
        "toAddress": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
        "fromBlockHash": "5113171e23ac1cdfcb6851f9bea7ad050058acccbe2e6faf8f5a2231f02c5f7c",
        "tokenId": "tti_5649544520544f4b454e6e40",
        "snapshotHash": "fc08446111289c671fe1547f634afcde92fab289c11fe16380958305b2f379ad",
        "data": null,
        "timestamp": "2018-10-11T01:21:45.899730786+08:00",
        "stateHash": "53af30da1fc818c9a03ef539aadf7a1e0c90039d5c4eb42143dd9cfc211adbe6",
        "receiveBlockHeight": "",
        "receiveBlockHash": null,
        "logHash": "0000000000000000000000000000000000000000000000000000000000000000",
        "nonce": "1GO9X2PtbDM=",
        "signature": "rVA04yeWgERnmzVJ0LsLqIEkjn6r2BrePyxOCS2N4l+UKy3mjaIWO5ybk8sc6qiVR91reEwXHwyfeFo+CjNNCg==",
        "height": "1",
        "quota": "0",
        "amount": "1000000000000000000000000000",
        "fee": "0",
        "confirmedTimes": "0",
        "tokenInfo": {
            "tokenName": "Vite Token",
            "tokenSymbol": "VITE",
            "totalSupply": "1000000000000000000000000000",
            "decimals": 18,
            "owner": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68",
            "pledgeAmount": "0",
            "withdrawHeight": "0"
        }
    }
}
```
```json test
{
    "jsonrpc": "2.0",
    "id": 3,
    "method": "ledger_getLatestBlock",
    "params": ["vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68"]
}
```
::: 

## ledger_getTokenMintage
Return the token information

- **Parameters**: `string` : `TokenTypeId` The token ID

- **Returns**: `Token` The token information
- **Example**:

::: demo
```json tab:Request
{
    "jsonrpc": "2.0",
    "id": 3,
    "method": "ledger_getTokenMintage",
    "params": [
        "tti_5649544520544f4b454e6e40"
    ]
}
```
```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 3,
    "result": {
        "TokenName": "Vite Token",
        "TokenSymbol": "VITE",
        "TotalSupply": "1000000000000000000000000000",
        "Decimals": 18,
        "Owner": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68",
        "PledgeAmount": "0",
        "WithdrawHeight": "0"
    }
}
```
```json test
{
    "jsonrpc": "2.0",
    "id": 3,
    "method": "ledger_getTokenMintage",
    "params": [
        "tti_5649544520544f4b454e6e40"
    ]
}
```
:::

## ledger_getBlockByHeight
Return the given address of account block in the given height

- **Parameters**: 
    - `string` : `address` The account address
    - `string` : `height`  The height of account block

- **Returns**: `AccountBlock` The account block

- **Example**:

::: demo
```json tab:Request
{
    "jsonrpc": "2.0",
    "id": 2,
    "method": "ledger_getBlockByHeight",
    "params": [
        "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68",
        "1"
    ]
}
```
```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 2,
    "result": [
        {
            "blockType": 4,
            "hash": "8f37904d4df342569a2f79d8deb496c03c89eb89353cf027b1d7dc6dafcb351a",
            "prevHash": "0000000000000000000000000000000000000000000000000000000000000000",
            "accountAddress": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68",
            "publicKey": "OvmkehEUDGgcKyqFpM6Yf6sGklibLOIzv34XS9QwF3o=",
            "toAddress": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
            "fromBlockHash": "5113171e23ac1cdfcb6851f9bea7ad050058acccbe2e6faf8f5a2231f02c5f7c",
            "tokenId": "tti_5649544520544f4b454e6e40",
            "snapshotHash": "fc08446111289c671fe1547f634afcde92fab289c11fe16380958305b2f379ad",
            "data": null,
            "timestamp": "2018-10-11T01:21:45.899730786+08:00",
            "stateHash": "53af30da1fc818c9a03ef539aadf7a1e0c90039d5c4eb42143dd9cfc211adbe6",
            "logHash": "0000000000000000000000000000000000000000000000000000000000000000",
            "nonce": "1GO9X2PtbDM=",
            "signature": "rVA04yeWgERnmzVJ0LsLqIEkjn6r2BrePyxOCS2N4l+UKy3mjaIWO5ybk8sc6qiVR91reEwXHwyfeFo+CjNNCg==",
            "receiveBlockHeight": "",
            "receiveBlockHash": null,
            "height": "1",
            "quota": "0",
            "amount": "1000000000000000000000000000",
            "fee": "0",
            "confirmedTimes": "0",
            "tokenInfo": {
                "tokenName": "Vite Token",
                "tokenSymbol": "VITE",
                "totalSupply": "1000000000000000000000000000",
                "decimals": 18,
                "owner": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68",
                "pledgeAmount": "0",
                "withdrawHeight": "0"
            }
        }
    ]
}
```
```json test
{
    "jsonrpc": "2.0",
    "id": 2,
    "method": "ledger_getBlockByHeight",
    "params": [
        "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68",
        "1"
    ]
}
```
:::
## ledger_getBlocksByHash
Return the given number of account blocks since the specific block

- **Parameters**: 
    - `string` : `address` The account address
    - `string` : `hash`  The hash of account block to search from
    - `int` :   The number of blocks

- **Returns**: `AccountBlock` The list of account blocks

- **Example**:

::: demo
```json tab:Request
{
    "jsonrpc": "2.0",
    "id": 2,
    "method": "ledger_getBlocksByHash",
    "params": [
        "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68",
        "8f37904d4df342569a2f79d8deb496c03c89eb89353cf027b1d7dc6dafcb351a",
        2
    ]
}
```
```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 2,
    "result": [
        {
            "blockType": 4,
            "hash": "8f37904d4df342569a2f79d8deb496c03c89eb89353cf027b1d7dc6dafcb351a",
            "prevHash": "0000000000000000000000000000000000000000000000000000000000000000",
            "accountAddress": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68",
            "publicKey": "OvmkehEUDGgcKyqFpM6Yf6sGklibLOIzv34XS9QwF3o=",
            "toAddress": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
            "fromBlockHash": "5113171e23ac1cdfcb6851f9bea7ad050058acccbe2e6faf8f5a2231f02c5f7c",
            "tokenId": "tti_5649544520544f4b454e6e40",
            "snapshotHash": "fc08446111289c671fe1547f634afcde92fab289c11fe16380958305b2f379ad",
            "data": null,
            "timestamp": "2018-10-11T01:21:45.899730786+08:00",
            "stateHash": "53af30da1fc818c9a03ef539aadf7a1e0c90039d5c4eb42143dd9cfc211adbe6",
            "logHash": "0000000000000000000000000000000000000000000000000000000000000000",
            "nonce": "1GO9X2PtbDM=",
            "receiveBlockHeight": "",
            "receiveBlockHash": null,
            "signature": "rVA04yeWgERnmzVJ0LsLqIEkjn6r2BrePyxOCS2N4l+UKy3mjaIWO5ybk8sc6qiVR91reEwXHwyfeFo+CjNNCg==",
            "height": "1",
            "quota": "0",
            "amount": "1000000000000000000000000000",
            "fee": "0",
            "confirmedTimes": "0",
            "tokenInfo": {
                "tokenName": "Vite Token",
                "tokenSymbol": "VITE",
                "totalSupply": "1000000000000000000000000000",
                "decimals": 18,
                "owner": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68",
                "pledgeAmount": "0",
                "withdrawHeight": "0"
            }
        }
    ]
}
```
```json test
{
    "jsonrpc": "2.0",
    "id": 2,
    "method": "ledger_getBlocksByHash",
    "params": [
        "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68",
        "8f37904d4df342569a2f79d8deb496c03c89eb89353cf027b1d7dc6dafcb351a",
        2
    ]
}
```
:::
## ledger_getBlocksByHashInToken
注意：此API只有在全节点的node_config.json中设置`"OpenPlugins": true`时才生效

Return the given number of account blocks of a certain token since the specific block

- **Parameters**: 
    - `string` : `address` The account address
    - `string` : `hash`  The hash of account block to search from
    - `string` : `tokenId` The id of token
    - `int` :   The number of blocks

- **Returns**: `AccountBlock` The list of account blocks

- **Example**:

::: demo
```json tab:Request
{
    "jsonrpc": "2.0",
    "id": 2,
    "method": "ledger_getBlocksByHashInToken",
    "params": [
        "vite_00000000000000000000000000000000000000056ad6d26692",
        null,
        "tti_5649544520544f4b454e6e40",
        10
    ]
}
```
```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 2,
    "result": [
        {
            "blockType": 4,
            "hash": "5a03aff84943cf1f5e3d981ae748816049e290e5d2137acdbfeb6bb63aca11bc",
            "prevHash": "5f1bfd19d52154a266f7046216499dafbd472831b5d1150e5674dd449d9087fe",
            "accountAddress": "vite_00000000000000000000000000000000000000056ad6d26692",
            "publicKey": "ZlFXeR1h9Y2eHlFrk0BzTVv5cIJvDTMASVWUpoKFqYg=",
            "toAddress": "vite_00000000000000000000000000000000000000056ad6d26692",
            "fromBlockHash": "ac15375d01664ee9194d582c1772c57889fb4475f2790de966c605bfbb9a4156",
            "tokenId": "tti_5649544520544f4b454e6e40",
            "snapshotHash": "5e93be7f632617fa5385816ceb23fc0cfe5a33665ced6c372d6c2f92fe2e7e85",
            "data": "S+pUvi6hVg9eNNrGmbewiSMLAUXd9dtJTwxS32hO4csA",
            "logHash": null,
            "nonce": null,
            "signature": "nfrz9nF6a5KhOFWdwnfcy1hqvoAeFkokHyk0XkiLEXiY+t11XnzlFsR04Y1t8ZzVCC1x17JezKU6W+BZ1JGKBA==",
            "fromAddress": "vite_ab24ef68b84e642c0ddca06beec81c9acb1977bbd7da27a87a",
            "receiveBlockHeight": "",
            "receiveBlockHash": null,
            "height": "5",
            "quota": "0",
            "amount": "0",
            "fee": "1000000000000000000000",
            "difficulty": null,
            "timestamp": 1546935398,
            "confirmedTimes": "4322",
            "tokenInfo": {
                "tokenName": "Vite Token",
                "tokenSymbol": "VITE",
                "totalSupply": "1000000000000000000000000000",
                "decimals": 18,
                "owner": "vite_ab24ef68b84e642c0ddca06beec81c9acb1977bbd7da27a87a",
                "pledgeAmount": "0",
                "withdrawHeight": "0",
                "tokenId": "tti_5649544520544f4b454e6e40"
            }
        },
        {
            "blockType": 4,
            "hash": "d9b053f24ae0844d2105ad01d62da90723f8537c62f1953ada10cae6d58d9ac0",
            "prevHash": "f17aae62fb6c15c752f43f7f4e49ebc83a206aa39874b6805bb012e31b3a5de9",
            "accountAddress": "vite_00000000000000000000000000000000000000056ad6d26692",
            "publicKey": "xP0t/cCgrTNjOrkS8HYoFD7RDKPtCPzkdrk12MIjMgM=",
            "toAddress": "vite_00000000000000000000000000000000000000056ad6d26692",
            "fromBlockHash": "2c757064c78cf25bdbd80dfc4af0377c00d155b1d0f71f209bf7a0589670354f",
            "tokenId": "tti_5649544520544f4b454e6e40",
            "snapshotHash": "4f9e834598ebad22047308a5b7489ef27de1120ea80d33f5310801cd1eaa5e4f",
            "data": "0e0HOSvpbeG+SKedm33fgHuNqHlmEFCIQhf2z3O3iQ8A",
            "logHash": null,
            "nonce": null,
            "receiveBlockHeight": "",
            "receiveBlockHash": null,
            "signature": "n4PqczrUj4YWRB1xExYehKrusbSlKS2kIwTXQuodjuAOK4vEXGx+IklZY71yY2TPKE2tbGk3PW1XmTfKUHz8AA==",
            "fromAddress": "vite_ab24ef68b84e642c0ddca06beec81c9acb1977bbd7da27a87a",
            "height": "3",
            "quota": "0",
            "amount": "0",
            "fee": "1000000000000000000000",
            "difficulty": null,
            "timestamp": 1546935356,
            "confirmedTimes": "4342",
            "tokenInfo": {
                "tokenName": "Vite Token",
                "tokenSymbol": "VITE",
                "totalSupply": "1000000000000000000000000000",
                "decimals": 18,
                "owner": "vite_ab24ef68b84e642c0ddca06beec81c9acb1977bbd7da27a87a",
                "pledgeAmount": "0",
                "withdrawHeight": "0",
                "tokenId": "tti_5649544520544f4b454e6e40"
            }
        }
    ]
}
```
```json test
{
    "jsonrpc": "2.0",
    "id": 2,
    "method": "ledger_getBlocksByHash",
    "params": [
        "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68",
        "8f37904d4df342569a2f79d8deb496c03c89eb89353cf027b1d7dc6dafcb351a",
        2
    ]
}
```
:::

## ledger_getSnapshotChainHeight
Query the current height of snapshot chain

- **Parameters**: `none`

- **Returns**: `string of uint64` The current height of snapshot chain

- **Example**:

::: demo

```json tab:Request
{
	"jsonrpc": "2.0",
	"id": 1,
	"method": "ledger_getSnapshotChainHeight",
	"params": null
}

```

```json tab:Response
{
	"jsonrpc": "2.0",
	"id": 1,
	"result": "1"
}
```
```json test
{
	"jsonrpc": "2.0",
	"id": 1,
	"method": "ledger_getSnapshotChainHeight",
	"params": null
}

```
:::

## ledger_getSnapshotBlockByHash
Query the snapshot block by hash

- **Parameters**: 
    - `Hash`  hash of snapshot block

- **Returns**: 
               
    `Object` : detail of snapshot block
     -  `hash` : `Hash` hash of snapshot block
     -  `prevHash` : `Hash` hash of previous snapshot block
     -  `height` : `uint64` height of snapshot block
     -  `publicKey` : `ed25519.PublicKey` public key of super node who produce the snapshot block
     -  `signature` : `[]byte` 签名 signature of the snapshot block 
     -  `timestamp` : `time` time when produce the snapshot block
     -  `seed`: `uint64` 
     -  `seedHash`: `Hash`
     -  `snapshotContent` : `map[types.Address]HashHeight` detail of snapshot


- **Example**:

::: demo

```json tab:Request
{
    "jsonrpc": "2.0",
    "id": 2,
    "method": "ledger_getSnapshotBlockByHash",
    "params": ["6c6c000ab47527b4f5e7d250538c7e32e9e134f2c0db265e007af2b7bac978dd"]
}
```

```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 2,
    "result": {
        "hash": "6c6c000ab47527b4f5e7d250538c7e32e9e134f2c0db265e007af2b7bac978dd",
        "prevHash": "0000000000000000000000000000000000000000000000000000000000000000",
        "height": 1,
        "publicKey": null,
        "signature": null,
        "seed": 0,
        "seedHash": null,
        "snapshotContent": {
            "vite_0000000000000000000000000000000000000003f6af7459b9": {
                "height": 1,
                "hash": "1772519602b4bfd8dd40ab13eb62f3d1e86eb6d22144835c068ff68f894a0d8a"
            },
            "vite_0000000000000000000000000000000000000004d28108e76b": {
                "height": 1,
                "hash": "dacdc0e6250b64cba6a9d6c666edf3cce08977170e05ca4b2b4a6e19257c1696"
            },
            "vite_000000000000000000000000000000000000000595292d996d": {
                "height": 1,
                "hash": "d519bd49599df00b6a5992a50065af7945c4b6af269af8791cca5688f3277e37"
            },
            "vite_360232b0378111b122685a15e612143dc9a89cfa7e803f4b5a": {
                "height": 1,
                "hash": "87431f8efedd7be224f3fe985f0257fadfce3259a2b2395ec7f8ec65f1d5148a"
            },
            "vite_56fd05b23ff26cd7b0a40957fb77bde60c9fd6ebc35f809c23": {
                "height": 1,
                "hash": "ef2788f1e0dcece653b297b087ab79e5411786596e0a2a23daa02c1c29c80694"
            },
            "vite_847e1672c9a775ca0f3c3a2d3bf389ca466e5501cbecdb7107": {
                "height": 1,
                "hash": "30ddc46a82a909b242ec0ad4cb75f1fe16999c17a2c29aae6c8aa2524bc90fa5"
            },
            "vite_ab24ef68b84e642c0ddca06beec81c9acb1977bbd7da27a87a": {
                "height": 1,
                "hash": "d517e8d4dc9c676876b72ad0cbb4c45890804aa438edd1f171ffc66276202a95"
            },
            "vite_ce18b99b46c70c8e6bf34177d0c5db956a8c3ea7040a1c1e25": {
                "height": 1,
                "hash": "e544ea40948c22ba0003ca034f440a57903a3a562ed0e129b5517438562ebdd5"
            }
        },
        "timestamp": 1557892800
    }
}
```
:::

## ledger_getSnapshotBlockByHeight
query the snapshot block by height

- **Parameters**: 
    - `uint64`  height of the snapshot block

- **Returns**: 
               
    `Object` : detail of snapshot block
     -  `hash` : `Hash` hash of snapshot block
     -  `prevHash` : `Hash` hash of previous snapshot block
     -  `height` : `uint64` height of snapshot block
     -  `publicKey` : `ed25519.PublicKey` public key of super node who produce the snapshot block
     -  `signature` : `[]byte` 签名 signature of the snapshot block 
     -  `timestamp` : `time` time when produce the snapshot block
     -  `seed`: `uint64` 
     -  `seedHash`: `Hash`
     -  `snapshotContent` : `map[types.Address]HashHeight` detail of snapshot


- **Example**:

::: demo

```json tab:Request
{
    "jsonrpc": "2.0",
    "id": 2,
    "method": "ledger_getSnapshotBlockByHeight",
    "params": [6363411]
}
```

```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 2,
    "result": {
        "hash": "6c6c000ab47527b4f5e7d250538c7e32e9e134f2c0db265e007af2b7bac978dd",
        "prevHash": "0000000000000000000000000000000000000000000000000000000000000000",
        "height": 1,
        "publicKey": null,
        "signature": null,
        "seed": 0,
        "seedHash": null,
        "snapshotContent": {
            "vite_0000000000000000000000000000000000000003f6af7459b9": {
                "height": 1,
                "hash": "1772519602b4bfd8dd40ab13eb62f3d1e86eb6d22144835c068ff68f894a0d8a"
            },
            "vite_0000000000000000000000000000000000000004d28108e76b": {
                "height": 1,
                "hash": "dacdc0e6250b64cba6a9d6c666edf3cce08977170e05ca4b2b4a6e19257c1696"
            },
            "vite_000000000000000000000000000000000000000595292d996d": {
                "height": 1,
                "hash": "d519bd49599df00b6a5992a50065af7945c4b6af269af8791cca5688f3277e37"
            },
            "vite_360232b0378111b122685a15e612143dc9a89cfa7e803f4b5a": {
                "height": 1,
                "hash": "87431f8efedd7be224f3fe985f0257fadfce3259a2b2395ec7f8ec65f1d5148a"
            },
            "vite_56fd05b23ff26cd7b0a40957fb77bde60c9fd6ebc35f809c23": {
                "height": 1,
                "hash": "ef2788f1e0dcece653b297b087ab79e5411786596e0a2a23daa02c1c29c80694"
            },
            "vite_847e1672c9a775ca0f3c3a2d3bf389ca466e5501cbecdb7107": {
                "height": 1,
                "hash": "30ddc46a82a909b242ec0ad4cb75f1fe16999c17a2c29aae6c8aa2524bc90fa5"
            },
            "vite_ab24ef68b84e642c0ddca06beec81c9acb1977bbd7da27a87a": {
                "height": 1,
                "hash": "d517e8d4dc9c676876b72ad0cbb4c45890804aa438edd1f171ffc66276202a95"
            },
            "vite_ce18b99b46c70c8e6bf34177d0c5db956a8c3ea7040a1c1e25": {
                "height": 1,
                "hash": "e544ea40948c22ba0003ca034f440a57903a3a562ed0e129b5517438562ebdd5"
            }
        },
        "timestamp": 1557892800
    }
}
```
:::

## ledger_getVmLogList
Return the list of VM contract execution logs

- **Parameters**:
   * `string` : `Hash`  Transaction Hash

- **Returns**: `VmLogList<array<VmLog>>` VM log list

  `Object` : `VmLog`
    * Topics : `[]types.Hash`
	* Data : `[]byte`

- **Example**:

::: demo

```json tab:Request
{
    "jsonrpc":"2.0",
    "id":1,
    "method":"ledger_getVmLogList",
    "params": null
}

```
```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": null
}
```
:::
