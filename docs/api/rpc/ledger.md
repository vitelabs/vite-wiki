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
Return the current height of snapshot chain

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

## ledger_getFittestSnapshotHash
Return the hash of snapshot block which is most suitable for being referenced by a new transaction

- **Parameters**:
   * `address` : `Address` `Optional` account address. Once specified, the hash of snapshot block referenced by last transaction of the account or afterwards will be returned.
   * `sendblockHash` : `Hash` `Optional` hash of the corresponding request block if a new response transaction is to be created. Once specified, the hash of snapshot block referenced by the request transaction or afterwards will be returned.

   If neither is specified, the hash of the snapshot block which is 10 blocks prior to current will be returned.

- **Returns**: `Hash` The hash of snapshot block

- **Example**:

::: demo

```json tab:Request
{
    "jsonrpc":"2.0",
    "id":1,
    "method":"ledger_getFittestSnapshotHash",
    "params": [
        "vite_bece0bfc8893a6dde206dea9d4058af7dd718c165c3a17332e",
        "e698b4b6cdf2fe40bc74f27097cd53eb07c85e2268e04062c193da8fc294f393",
    ]
}

```
```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 2,
    "result": "df6c3c2d874b790dd1f1cad0a4bbcd539bbfa99d9dc75b19056ebee310d2e47a"
}
```
:::
