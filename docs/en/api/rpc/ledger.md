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
```json tab::Request
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
