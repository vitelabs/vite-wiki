# Onroad
在途模块

## onroad_getOnroadBlocksByAddress 
获取账户的在途交易

**Public Api**

-**Parameters**: 
  1. `Address`- 要查询的addr
  2. `int` -页码 index
  3. `int`- 每页大小 

-**Return**: 
* `[]AccountBlock`

## onroad_getAccountOnroadInfo
获取某个账户的在途资金情况

**Public Api**

-**Parameters**: 
  1. `Address`- 要查询的addr

-**Return**: 
* `RpcAccountInfo`
```json tab:: 返回值Demo
{
    "AccountAddress": "vite_13712181754b1a5941f21b7dd8aac0acd021dc9be0b49c98e8",
    "TotalNumber": "433",
    "TokenBalanceInfoMap": {
        "tti_8816f463487a9cc3c3886b8c": {
            "TokenInfo": {
                "TokenName": "as",
                "TokenSymbol": "aa",
                "TotalSupply": "10000",
                "Decimals": 19,
                "Owner": "vite_13712181754b1a5941f21b7dd8aac0acd021dc9be0b49c98e8",
                "PledgeAmount": "10000",
                "WithdrawHeight": "12"
            },
            "TotalAmount": "132",
            "Number": "88"
        }
    }
}
```

## onroad_listWorkingAutoReceiveWorker
获取正在工作中的自动接收交易的工人

**Private Api**

-**Parameters**: 
  null

-**Return**: 
* []types.Address

## onroad_startAutoReceive
开始自动接收在途资金

**Private Api**

-**Parameters**: 
  1. `Address`
  2.  `map[types.TokenTypeId]string`- 一个简单的filter，key是要接收的币种，value是接收该币种的最少数量，如果没设置，就会全部接收

-**Return**: 
* null


## onroad_stopAutoReceive
关闭某个自动接受交易的工人

**Private Api**

-**Parameters**: 
  1. `Address`

-**Return**: 
* null