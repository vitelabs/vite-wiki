# Onroad

:::tip Maintainer
[TiantaoZhu](https://github.com/TiantaoZhu)
:::

On-road Module

## onroad_getOnroadBlocksByAddress <Badge text="public"/>
Return all open transactions waiting to be received by the account address

* **Parameters**: 
  1. `Address`- The account address
  2. `int` - Page index
  3. `int`- Page size

* **Return**: 
* `[]AccountBlock`

::: demo

```json tab:Request
{
    "jsonrpc": "2.0",
    "id": 2,
    "method": "onroad_getOnroadBlocksByAddress",
    "params": [
        "vite_ae327378f27fd431ef116109eda90e5264b9758543c3772f7f",
        0, 
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
            "blockType": 2,
            "hash": "0782bd1983460c94c6c01b0df51bde79dfc9e85145c78fcbf01a26260b261bd5",
            "prevHash": "eed585c9731bcdad65726b06e42e42763dbc27129f16e8a291dbf42194f4c503",
            "accountAddress": "vite_5ac4c892e485a79ae1d94107902cc8488a07256f54d13f644e",
            "publicKey": "HYBXL10Goeg0NvhV9AhdSKG0+9GD/XZL8KbQmuX3KfU=",
            "toAddress": "vite_ae327378f27fd431ef116109eda90e5264b9758543c3772f7f",
            "fromBlockHash": "0000000000000000000000000000000000000000000000000000000000000000",
            "tokenId": "tti_5649544520544f4b454e6e40",
            "snapshotHash": "2003b1dd0956b3c88cf4c7c76dc3378b7f0d043b8c894fe297061e16747ad16c",
            "data": null,
            "logHash": null,
            "nonce": "x9MXVO4n1nU=",
            "signature": "HVpSGtI/GMULpPntqjBJubJxWojWxRqpGTwqSdcqTNPKH3uCwBiB3GxlLgeanRjG7TryGMvrp2eEGX5EmplyAQ==",
            "fromAddress": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
            "height": "14",
            "quota": "21000",
            "amount": "180",
            "fee": "0",
            "timestamp": 1539593415,
            "confirmedTimes": "0",
            "tokenInfo": {
                "tokenName": "Vite Token",
                "tokenSymbol": "VITE",
                "totalSupply": "1000000000000000000000000000",
                "decimals": 18,
                "owner": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68",
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
    "method": "onroad_getOnroadBlocksByAddress",
    "params": [
        "vite_ae327378f27fd431ef116109eda90e5264b9758543c3772f7f",
        0, 
        10
    ]
}
```
:::

## onroad_getAccountOnroadInfo <Badge text="public"/>
Return the information of tokens in all open transactions waiting to be received by the account address

* **Parameters**: 
  1. `Address`- The account address

* **Return**: 
* `RpcAccountInfo`
::: demo

```json tab:Request
{
    "jsonrpc": "2.0",
    "id": 2,
    "method": "onroad_getAccountOnroadInfo",
    "params": [
        "vite_ae327378f27fd431ef116109eda90e5264b9758543c3772f7f"
    ]
}
```

```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 2,
    "result": {
        "accountAddress": "vite_ae327378f27fd431ef116109eda90e5264b9758543c3772f7f",
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
                    "withdrawHeight": "0",
                    "tokenId": "tti_5649544520544f4b454e6e40"
                },
                "totalAmount": "180",
                "number": "1"
            }
        }
    }
}
```

```json test
{
    "jsonrpc": "2.0",
    "id": 2,
    "method": "onroad_getAccountOnroadInfo",
    "params": [
        "vite_ae327378f27fd431ef116109eda90e5264b9758543c3772f7f"
    ]
}
```
:::

## onroad_listWorkingAutoReceiveWorker <Badge text="private" type="error"/>
Return all account addresses who has setup to receive transactions automatically

* **Parameters**: 
  null

* **Return**: 
* `[]types.Address` - An array of account address

::: demo

```json tab:Request
{
	"jsonrpc": "2.0",
	"id": 9,
	"method": "onroad_listWorkingAutoReceiveWorker"
}
```

```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 9,
    "result": [
        "vite_ae327378f27fd431ef116109eda90e5264b9758543c3772f7f"
    ]
}
```

```json test
{
	"jsonrpc": "2.0",
	"id": 9,
	"method": "onroad_listWorkingAutoReceiveWorker"
}
```
:::

## onroad_startAutoReceive <Badge text="private" type="error"/>
Turn on the flag for the account to start receive transactions automatically. This method should be called again with new filter after the filtering rule is changed.

* **Parameters**: 
  1. `string`: `Primry address` or `EntropyStore abs filepath`
  2. `Address`: The account address where auto-receive is turned on
  3. `map[types.TokenTypeId]string`- The filter map having token ID as key and minimum amount of tokens to receive as value. All open transactions of the account will be received if this parameter is not present.

* **Return**: 
* null

::: demo

```json tab:Request
{
    "jsonrpc": "2.0",
    "id": 2,
    "method": "onroad_startAutoReceive",
    "params": [
        "vite_ae327378f27fd431ef116109eda90e5264b9758543c3772f7f",
        "vite_ae327378f27fd431ef116109eda90e5264b9758543c3772f7f",
        {"tti_5649544520544f4b454e6e40":"0"}
    ]
}
```

```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 2,
    "result": null
}
```

```json test
{
    "jsonrpc": "2.0",
    "id": 2,
    "method": "onroad_startAutoReceive",
    "params": [
        "vite_ae327378f27fd431ef116109eda90e5264b9758543c3772f7f",
        {"tti_5649544520544f4b454e6e40":"0"}
    ]
}
```
:::

## onroad_stopAutoReceive <Badge text="private" type="error"/>
Turn off the flag for the account to stop receive transactions automatically

* **Parameters**: 
  1. `Address` The account address

* **Return**: 
* null

::: demo

```json tab:Request
{
    "jsonrpc": "2.0",
    "id": 2,
    "method": "onroad_stopAutoReceive",
    "params": [
        "vite_ae327378f27fd431ef116109eda90e5264b9758543c3772f7f"
    ]
}
```

```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 2,
    "result": null
}
```

```json test
{
    "jsonrpc": "2.0",
    "id": 2,
    "method": "onroad_stopAutoReceive",
    "params": [
        "vite_ae327378f27fd431ef116109eda90e5264b9758543c3772f7f"
    ]
}
```
:::
