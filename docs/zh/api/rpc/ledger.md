# Ledger
:::tip 维护者
[lyd00](https://github.com/lyd00)
:::

## ledger_getBlocksByAccAddr
获得一个账户的交易列表

- **Parameters**:

  * `string`: `Addr`  要查询的addr
  * `int`:  `Index` 页码
  * `int`: `Count`  每页大小


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
            "fromAddress": "vite_00000000000000000000000000000000000000056ad6d26692",
            "toAddress": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68",
            "fromBlockHash": "5113171e23ac1cdfcb6851f9bea7ad050058acccbe2e6faf8f5a2231f02c5f7c",
            "tokenId": "tti_5649544520544f4b454e6e40",
            "receiveBlockHeight": "",
            "receiveBlockHash": null,
            "snapshotHash": "fc08446111289c671fe1547f634afcde92fab289c11fe16380958305b2f379ad",
            "data": null,
            "timestamp": "2018-10-11T01:21:45.899730786+08:00",
            "logHash": "0000000000000000000000000000000000000000000000000000000000000000",
            "nonce": "1GO9X2PtbDM=",
            "signature": "rVA04yeWgERnmzVJ0LsLqIEkjn6r2BrePyxOCS2N4l+UKy3mjaIWO5ybk8sc6qiVR91reEwXHwyfeFo+CjNNCg==",
            "height": "1",
            "quota": "0",
            "receiveBlockHeights": [],            
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
获取一个账户的详情,包含账户链的高度，账户的各个token的余额等

- **Parameters**: 
  * string: 需要查询的账户的地址

- **Returns**:

  `Object` : 账户详情
   -  `AccountAddress` : `string of addr` 账户地址
   -  `TokenBalanceInfoMap` : `Map<string of TokenTypeId>token` 账户各代币的余额信息
   -  `TotalNumber` : `string of uint64` 账户交易数量 等同于是账户链高度

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
获取最近的快照块的hash

- **Parameters**: null 

- **Returns**: `Hash` snapshot hash

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
获取账户的最近一个交易

- **Parameters**: `Address` 

- **Returns**: `AccountBlock`

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
        "fromAddress": "vite_00000000000000000000000000000000000000056ad6d26692",
        "toAddress": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68",
        "fromBlockHash": "5113171e23ac1cdfcb6851f9bea7ad050058acccbe2e6faf8f5a2231f02c5f7c",
        "receiveBlockHeight": "",
        "receiveBlockHash": null,
        "tokenId": "tti_5649544520544f4b454e6e40",
        "snapshotHash": "fc08446111289c671fe1547f634afcde92fab289c11fe16380958305b2f379ad",
        "data": null,
        "timestamp": "2018-10-11T01:21:45.899730786+08:00",
        "logHash": "0000000000000000000000000000000000000000000000000000000000000000",
        "nonce": "1GO9X2PtbDM=",
        "receiveBlockHeights": [],
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

## ledger_getBlockByHeight
获取某个账号在某个账号链高度下的交易块

- **Parameters**: 
    - `string` : `address` 账号地址
    - `string` : `height`  交易高度

- **Returns**: `AccountBlock` 交易块

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
            "receiveBlockHeight": "",
            "receiveBlockHash": null,
            "snapshotHash": "fc08446111289c671fe1547f634afcde92fab289c11fe16380958305b2f379ad",
            "data": null,
            "timestamp": "2018-10-11T01:21:45.899730786+08:00",
            "stateHash": "53af30da1fc818c9a03ef539aadf7a1e0c90039d5c4eb42143dd9cfc211adbe6",
            "logHash": "0000000000000000000000000000000000000000000000000000000000000000",
            "nonce": "1GO9X2PtbDM=",
            "signature": "rVA04yeWgERnmzVJ0LsLqIEkjn6r2BrePyxOCS2N4l+UKy3mjaIWO5ybk8sc6qiVR91reEwXHwyfeFo+CjNNCg==",
            "height": "1",
            "receiveBlockHeights": [],
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
## ledger_getBlockByHash
获取某个hash对应的交易

- **Parameters**: 
    - `string` : `hash`  交易Hash

- **Returns**: `AccountBlock`

- **Example**:

::: demo
```json tab:Request
{
    "jsonrpc": "2.0",
    "id": 2,
    "method": "ledger_getBlockByHash",
    "params": [
        "8f37904d4df342569a2f79d8deb496c03c89eb89353cf027b1d7dc6dafcb351a"
    ]
}
```
```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 2,
    "result": 
    {
        "blockType": 4,
        "hash": "8f37904d4df342569a2f79d8deb496c03c89eb89353cf027b1d7dc6dafcb351a",
        "prevHash": "0000000000000000000000000000000000000000000000000000000000000000",
        "accountAddress": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68",
        "publicKey": "OvmkehEUDGgcKyqFpM6Yf6sGklibLOIzv34XS9QwF3o=",
        "fromAddress": "vite_00000000000000000000000000000000000000056ad6d26692",
        "toAddress": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68",
        "fromBlockHash": "5113171e23ac1cdfcb6851f9bea7ad050058acccbe2e6faf8f5a2231f02c5f7c",
        "receiveBlockHeight": "",
        "receiveBlockHash": null,
        "tokenId": "tti_5649544520544f4b454e6e40",
        "snapshotHash": "fc08446111289c671fe1547f634afcde92fab289c11fe16380958305b2f379ad",
        "data": null,
        "timestamp": "2018-10-11T01:21:45.899730786+08:00",
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
:::
## ledger_getBlocksByHash
从某个账户链获取某个交易的hash开始向前的N个块

- **Parameters**: 
    - `string` : `address` 要获取的账户
    - `string` : `hash`  起始的交易Hash
    - `int` :   需要获取的长度

- **Returns**: `AccountBlock`列表

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
            "fromAddress": "vite_00000000000000000000000000000000000000056ad6d26692",
            "toAddress": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68",
            "fromBlockHash": "5113171e23ac1cdfcb6851f9bea7ad050058acccbe2e6faf8f5a2231f02c5f7c",
            "tokenId": "tti_5649544520544f4b454e6e40",
            "snapshotHash": "fc08446111289c671fe1547f634afcde92fab289c11fe16380958305b2f379ad",
            "receiveBlockHeight": "",
            "receiveBlockHash": null,
            "data": null,
            "timestamp": "2018-10-11T01:21:45.899730786+08:00",
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
从某个账户链获取某个交易的hash开始向前的N个相同token的块

- **Parameters**: 
    - `string` : `address` 要获取的账户
    - `string` : `hash`  起始的交易Hash
    - `string` : `tokenId` token的ID
    - `int` :   需要获取的长度

- **Returns**: `AccountBlock` 相同token的交易列表

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
            "receiveBlockHeight": "",
            "receiveBlockHash": null,
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
            "receiveBlockHeight": "",
            "receiveBlockHash": null,
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
获取当前快照链高度

- **Parameters**: `none`

- **Returns**: `string of uint64`
 当前快照链高度

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
获取某个快照块hash对应的快照块

- **Parameters**: 
    - `Hash`  快照块hash

- **Returns**: 
               
    `Object` : 快照块详情
     -  `hash` : `Hash` 快照块hash
     -  `prevHash` : `Hash` 快照链上上一个快照块的hash
     -  `height` : `uint64` 快照块高度
     -  `publicKey` : `ed25519.PublicKey` 打包快照块的超级节点的公钥
     -  `signature` : `[]byte` 签名
     -  `timestamp` : `time` 出块时间
     -  `stateHash` : `Hash` 状态hash
     -  `snapshotContent` : `map[types.Address]HashHeight` 快照的账户块高度和hash


- **Example**:

::: demo

```json tab:Request
{
	"jsonrpc": "2.0",
	"id": 2,
	"method": "ledger_getSnapshotBlockByHash",
	"params": ["1cf965e7b9a8ab4a3758e7c2fa97890ce8724cfd071cd0b0966c1be17cfc48ad"]
}
```

```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 2,
    "result": {
        "hash": "1cf965e7b9a8ab4a3758e7c2fa97890ce8724cfd071cd0b0966c1be17cfc48ad",
        "prevHash": "ce0e8595aace97b2732126afd104c889d71f87586740f401135f1ff58309363e",
        "height": 6363411,
        "publicKey": "uPBd4umnBsp0rGrKQWWsabcawNYEjPh3MKXnGNVTMWs=",
        "signature": "JcYfU1LWuZTgKgpMrQ1T6uUuw3krUImikmgTqoyEDXubYt00ND/loABQ7KoQkBh8PYQOvVrPZtBjVlTGWJx6DQ==",
        "timestamp": "2019-01-25T03:18:04Z",
        "stateHash": "93f40fc8892855ae46134c85f7a5010308da9cb7a07337b2a68da34473c04492",
        "snapshotContent": {
            "vite_56fd05b23ff26cd7b0a40957fb77bde60c9fd6ebc35f809c23": {
                "height": 31578,
                "hash": "91fa958eb01f82b93ef4077a938fe9f9b5e1c2555979045e0a3c3b06721e69cc"
            },
            "vite_eef384a5fc40e0fbe282411e1d8e70c0f3c0e4a4f783448780": {
                "height": 894,
                "hash": "347a08b2e7666db832b1e0f69972f9dd1875fe6c1d3fc03aa55ab07e9a4858ae"
            }
        }
    }
}
```
:::

## ledger_getSnapshotBlockByHeight
获取某个高度的快照块

- **Parameters**: 
    - `uint64`  快照块高度

- **Returns**: 
               
    `Object` : 快照块详情
     -  `hash` : `Hash` 快照块hash
     -  `prevHash` : `Hash` 快照链上上一个快照块的hash
     -  `height` : `uint64` 快照块高度
     -  `publicKey` : `ed25519.PublicKey` 打包快照块的超级节点的公钥
     -  `signature` : `[]byte` 签名
     -  `timestamp` : `time` 出块时间
     -  `stateHash` : `Hash` 状态hash
     -  `snapshotContent` : `map[types.Address]HashHeight` 快照的账户块高度和hash


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
    "id": 17,
    "result": {
        "hash": "1cf965e7b9a8ab4a3758e7c2fa97890ce8724cfd071cd0b0966c1be17cfc48ad",
        "prevHash": "ce0e8595aace97b2732126afd104c889d71f87586740f401135f1ff58309363e",
        "height": 6363411,
        "publicKey": "uPBd4umnBsp0rGrKQWWsabcawNYEjPh3MKXnGNVTMWs=",
        "signature": "JcYfU1LWuZTgKgpMrQ1T6uUuw3krUImikmgTqoyEDXubYt00ND/loABQ7KoQkBh8PYQOvVrPZtBjVlTGWJx6DQ==",
        "timestamp": "2019-01-25T03:18:04Z",
        "stateHash": "93f40fc8892855ae46134c85f7a5010308da9cb7a07337b2a68da34473c04492",
        "snapshotContent": {
            "vite_56fd05b23ff26cd7b0a40957fb77bde60c9fd6ebc35f809c23": {
                "height": 31578,
                "hash": "91fa958eb01f82b93ef4077a938fe9f9b5e1c2555979045e0a3c3b06721e69cc"
            },
            "vite_eef384a5fc40e0fbe282411e1d8e70c0f3c0e4a4f783448780": {
                "height": 894,
                "hash": "347a08b2e7666db832b1e0f69972f9dd1875fe6c1d3fc03aa55ab07e9a4858ae"
            }
        }
    }
}
```
:::

## ledger_getVmLogList
获取VM合约执行日志列表

- **Parameters**:
   * `string` : `hash`  交易Hash

- **Returns**: `VmLogList<array<VmLog>>` 日志列表

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
return the fittest snapshotHash when create tx

- **Parameters**:
   * `address` : `Address`  用户地址。`选填`，当填写时会选择账户链上最新一笔交易所依赖的快照块高度本身或之后的快照块Hash。
   * `sendblockHash` : `Hash`  在创建接受交易时，建议填写对应的发送交易的Hash，而创建发送交易时，无需填写。`选填`，当填写时会选择对应发送交易所依赖的快照块高度本身或之后的快照块Hash。

   如果以上两个参数均不填，会选择最新快照块之前10个块高度的快照块Hash。


- **Returns**: `Hash` 适宜引用用来发起交易的快照快Hash

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
