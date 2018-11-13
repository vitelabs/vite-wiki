# Onroad

:::tip 维护者 [TiantaoZhu](https://github.com/TiantaoZhu) :::

在途模块

## onroad_getOnroadBlocksByAddress <badge text="public"/>

获取账户的在途交易

* **Parameters**:
    
    1. `Address`- 要查询的addr
    2. `int` -页码 index
    3. `int`- 每页大小 

* **Return**:

* `[]AccountBlock`

::: demo

```json tab:Request { "jsonrpc": "2.0", "id": 2, "method": "onroad_getOnroadBlocksByAddress", "params": [ "vite_ae327378f27fd431ef116109eda90e5264b9758543c3772f7f", 0, 10 ] }

    <br />```json tab:Response
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
    
    

```json test { "jsonrpc": "2.0", "id": 2, "method": "onroad_getOnroadBlocksByAddress", "params": [ "vite_ae327378f27fd431ef116109eda90e5264b9758543c3772f7f", 0, 10 ] }

    :::
    
    ## onroad_getAccountOnroadInfo <Badge text="public"/>
    
    获取某个账户的在途资金情况
    
    * **Parameters**: 
      1. `Address`- 要查询的addr
    
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
    

```json tab:Response { "jsonrpc": "2.0", "id": 2, "result": { "accountAddress": "vite_ae327378f27fd431ef116109eda90e5264b9758543c3772f7f", "totalNumber": "1", "tokenBalanceInfoMap": { "tti_5649544520544f4b454e6e40": { "tokenInfo": { "tokenName": "Vite Token", "tokenSymbol": "VITE", "totalSupply": "1000000000000000000000000000", "decimals": 18, "owner": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68", "pledgeAmount": "0", "withdrawHeight": "0", "tokenId": "tti_5649544520544f4b454e6e40" }, "totalAmount": "180", "number": "1" } } } }

    <br />```json test
    {
        "jsonrpc": "2.0",
        "id": 2,
        "method": "onroad_getAccountOnroadInfo",
        "params": [
            "vite_ae327378f27fd431ef116109eda90e5264b9758543c3772f7f"
        ]
    }
    

:::

## onroad_listWorkingAutoReceiveWorker <badge text="private" type="error"/>

获取正在工作中的自动接收交易的工人

* **Parameters**: null

* **Return**:

* []types.Address

::: demo

```json tab:Request { "jsonrpc": "2.0", "id": 9, "method": "onroad_listWorkingAutoReceiveWorker" }

    <br />```json tab:Response
    {
        "jsonrpc": "2.0",
        "id": 9,
        "result": [
            "vite_ae327378f27fd431ef116109eda90e5264b9758543c3772f7f"
        ]
    }
    

```json test { "jsonrpc": "2.0", "id": 9, "method": "onroad_listWorkingAutoReceiveWorker" }

    :::
    
    ## onroad_startAutoReceive <Badge text="private" type="error"/>
    
    开始自动接收在途资金, 如果用户想临时改变filter规则，无须先关闭再开启，直接掉开启就可以了
    
    * **Parameters**: 
      1. `string`: `Primry address` 或者 `EntropyStore abs filepath`
      1. `string`:  `Address`
      2.  `map[types.TokenTypeId]string`- 一个简单的filter，key是要接收的币种，value是接收该币种的最少数量（大于等于 value），如果没设置，就会全部接收
    
    
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
            {"tti_5649544520544f4b454e6e40":"0"}
        ]
    }
    

```json tab:Response { "jsonrpc": "2.0", "id": 2, "result": null }

    <br />```json test
    {
        "jsonrpc": "2.0",
        "id": 2,
        "method": "onroad_startAutoReceive",
        "params": [
            "vite_ae327378f27fd431ef116109eda90e5264b9758543c3772f7f",
            {"tti_5649544520544f4b454e6e40":"0"}
        ]
    }
    

:::

## onroad_stopAutoReceive <badge text="private" type="error"/>

关闭某个自动接受交易的工人

* **Parameters**:
    
    1. `Address`

* **Return**:

* null

::: demo

```json tab:Request { "jsonrpc": "2.0", "id": 2, "method": "onroad_stopAutoReceive", "params": [ "vite_ae327378f27fd431ef116109eda90e5264b9758543c3772f7f" ] }

    <br />```json tab:Response
    {
        "jsonrpc": "2.0",
        "id": 2,
        "result": null
    }
    

    json test
    {
        "jsonrpc": "2.0",
        "id": 2,
        "method": "onroad_stopAutoReceive",
        "params": [
            "vite_ae327378f27fd431ef116109eda90e5264b9758543c3772f7f"
        ]
    } :::