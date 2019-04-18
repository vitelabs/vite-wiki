---
sidebarDepth: 4
---

# Subscribe

:::tip Maintainer
[viteLiz](https://github.com/viteLiz)
:::

Event subscription interface. 

Vite provides two types of event subscription API: polling and persistent connection.

With polling API, client program should create a filter first, then polls `subscribe_getFilterChanges` method with `filterId` for new events. 
The filter will expire if there is no request for more than 5 minutes, so that the subscription will close automatically. Client can also unsubscribe by calling `subscribe_uninstallFilter` method.

`subscribe_newAccountBlocksFilter`, `subscribe_newLogsFilter`, `subscribe_uninstallFilter` and `subscribe_getFilterChanges` are polling APIs.

Persistent connection API will register new subscription first. Any event that was subscribed to will be returned by callback when it is generated. 
The subscription will close automatically When persistent connection is broken.

`subscribe_newAccountBlocks`, `subscribe_newLogs` and `subscribe_getLogs` are persistent connection APIs.

Two types of events are currently supported: new transactions(new account blocks) and new logs(logs in new account blocks). 
Each type contains corresponding rollback event. When rollback occurs, the `removed` field in the event message is set to true.

## subscribe_newAccountBlocksFilter
Create a filter listening to new transaction. The filter will be used to poll new transactions by feeding into `subscribe_getFilterChanges` method

- **Returns**:  
	- `string` filterId

::: demo
```json tab:Request
{
	"jsonrpc": "2.0",
	"id": 1,
	"method": "subscribe_newAccountBlocksFilter",
	"params": []
}
```
```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0xf90906914486a9c22d620e50022b38d5"
}
```
:::

## subscribe_newLogsFilter
Create a filter listening to new log with specific parameters. The filter will be used to poll new logs by feeding into `subscribe_getFilterChanges` method

- **Parameters**:

  * `FilterParam`
    1. `addrRange`: `map[Address]Range` Query logs of specified account address and account height. Multiple account addresses and a range of height can be specified.
    2. `topics`: `[][]Hash` Subscribed topics, see example for the usage.
    
`Range`
  1. `fromHeight`: `uint64` Start height, 0 means starting from the latest height
  2. `toHeight`: `uint64` End height, 0 means no end height is set

```
Topic examples：
 {} matches all logs
 {{A}} matches the logs having "A" as the first element
 {{},{B}} matches the logs having "B" as the second element
 {{A},{B}} matches the logs having "A" as the first element and "B" as the second element
 {{A,B},{C,D}} matches the logs having "A" or "B" as the first element, and "C" or "D" as the second element
```
::: demo
```json tab:Request
{
	"jsonrpc": "2.0",
	"id": 1,
	"method": "subscribe_newLogsFilter",
	"params": [{
		"addrRange":{
			"vite_bb6ad02107a4422d6a324fd2e3707ad53cfed9359378a78792":{
				"fromHeight":"0",
				"toHeight":"0"
			}
		}
	}]
}
```
```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x8f34ddeb22b87fdfd2acb6c9f5a2b50d"
}
```
:::

## subscribe_uninstallFilter
Unsubscribe(polling mode)

- **Parameters**:
  * `string`: filterId

- **Returns**:  
	- `bool` un-subscription result

::: demo
```json tab:Request
{
	"jsonrpc": "2.0",
	"id": 1,
	"method": "subscribe_uninstallFilter",
	"params": ["0x8f34ddeb22b87fdfd2acb6c9f5a2b50d"]
}
```
```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": true
}
```
:::

## subscribe_getFilterChanges
Poll for new events. The type of return value depends on the type of subscription. If no event is generated since last poll, an empty array is returned.

- **Parameters**:
  * `string`: filterId
  
- **Returns in `subscribe_newAccountBlocksFilter`**: 
  * `subscription`: `string` filterId
  * `result`: `Array<NewAccountBlocksMsg>`
    1. `hash`: `Hash` The hash of account block
    2. `removed`: `bool` Whether the block was rolled back, `true` for yes and new transaction will be marked as `false`
  
::: demo
```json tab:Request
{
	"jsonrpc": "2.0",
	"id": 1,
	"method": "subscribe_getFilterChanges",
	"params": ["0xf90906914486a9c22d620e50022b38d5"]
}
```
```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
      "result": [
          {
              "Hash": "9cc9ba996a4192e35ddbfe3ba448611fc06f6342463e21d3300e58e9772b348f",
              "Removed": false
          },
          {
              "Hash": "8b9f8067ef09aa09c8f9d652f0d9ac5e99d083722089a6d91323cffd8b2dcf08",
              "Removed": false
          }
      ],
      "subscription": "0xf90906914486a9c22d620e50022b38d5"
    }
}
```
:::

- **Returns in `subscribe_newLogsFilter`**: 
  * `subscription`: `string` filterId
  * `result`: `Array<LogsMsg>`
    1. `accountBlockHash`: `Hash` The hash of account block
    2. `addr`: `Address` Account address
    3. `log`: `VmLog` Log
    4. `removed`: `bool` Whether the log was rolled back, `true` for yes and new log will be marked as `false`

::: demo
```json tab:Request
{
	"jsonrpc": "2.0",
	"id": 1,
	"method": "subscribe_getFilterChanges",
	"params": ["0x8f34ddeb22b87fdfd2acb6c9f5a2b50d"]
}
```
```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
      "result": [
          {
              "log": {
                  "topics": [
                      "aa65281f5df4b4bd3c71f2ba25905b907205fce0809a816ef8e04b4d496a85bb",
                      "000000000000000000000000bb6ad02107a4422d6a324fd2e3707ad53cfed935"
                  ],
                  "data": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAo="
              },
              "accountBlockHash": "de8cd1dc188fd4bf44c0cb90958ffbcccab5766840d56f7b35443a1a1c5c9d3e",
              "addr": "vite_78926f48bccef67a3b9cc64fdfe864f2a708ebce1d0bbe9aef",
              "removed": false
          }
      ],
      "subscription": "0x8f34ddeb22b87fdfd2acb6c9f5a2b50d"
    }
}
```
:::

## subscribe_newAccountBlocks
Create a persistent connection listening for new transaction

- **Returns**:  
	- `string` Subscription id
	
- **Callback**:  
`Object`
  * `subscription`: `string`  Subscription id
  * `result`: `Array<NewAccountBlocksMsg>`
     1. `hash`: `Hash` The hash of account block
     2. `removed`: `bool` Whether the block was rolled back, `true` for yes and new transaction will be marked as `false`

::: demo
```json tab:Request
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "subscribe_subscribe",
  "params": ["newAccountBlocks"]
}
```
```json tab:Response
{
  "jsonrpc":"2.0",
  "id":1,
  "result":"0xa809145803ebb2a52229aefcbd52a99d"
}
```
```json tab:Callback
{
  "jsonrpc":"2.0",
  "method":"subscribe_subscription",
  "params":{
    "subscription":"0xa809145803ebb2a52229aefcbd52a99d",
    "result":[{
      "hash":"20009ee78d5f77122d215c3021f839b4024e4f2701e57bdb574e0cae1ae44e6c",
      "removed":false
    }]
  }
}
```
:::

## subscribe_newLogs
Create a persistent connection listening for new log

- **Parameters**:

  * `FilterParam`
    1. `addrRange`: `map[Address]Range` Query logs of specified account address and account height. Multiple account addresses and a range of height can be specified.
    2. `topics`: `[][]Hash` Subscribed topics, see example for the usage.
    
`Range`
  1. `fromHeight`: `uint64` Start height, 0 means starting from the latest height
  2. `toHeight`: `uint64` End height, 0 means no end height is set

- **Returns**:  
	- `string` Subscription id
	
- **Callback**:  
`Object`
  * `subscription`: `string`  Subscription id
  * `result`: `Array<LogsMsg>`
    1. `accountBlockHash`: `Hash` The hash of account block
    2. `addr`: `Address` Account address
    3. `log`: `VmLog` Log
    4. `removed`: `bool` Whether the log was rolled back, `true` for yes and new log will be marked as `false`

::: demo
```json tab:Request
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "subscribe_subscribe",
  "params": [
    "newLogs",
    {
      "addrRange":{
        "vite_f48f811a1800d9bde268e3d2eacdc4b4f8b9110e017bd7a76f":{
          "fromHeight":"0",
          "toHeight":"0"
        }
      }
    }
  ]
}
```
```json tab:Response
{
  "jsonrpc":"2.0",
  "id":1,
  "result":"0x4b97e0674a5ebef942dbb07709c4a608"
}
```
```json tab:Callback
{
  "jsonrpc":"2.0",
  "method":"subscribe_subscription",
  "params":{
    "subscription":"0x4b97e0674a5ebef942dbb07709c4a608",
    "result":[
      {
        "log":{
          "topics":[
            "aa65281f5df4b4bd3c71f2ba25905b907205fce0809a816ef8e04b4d496a85bb",
            "000000000000000000000000bb6ad02107a4422d6a324fd2e3707ad53cfed935"
          ],
          "data":"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAo="
        },
        "accountBlockHash":"23ea04b0dea4b9d0aa4d1f84b246b298a30faba753fa48303ad2deb29cd27f40",
        "addr":"vite_f48f811a1800d9bde268e3d2eacdc4b4f8b9110e017bd7a76f",
        "removed":false
      }
    ]
  }
}
```
:::

## subscribe_getLogs
Return historical logs

- **Parameters**:

  * `FilterParam`
    1. `addrRange`: `map[Address]Range` Query logs of specified account address and account height. Multiple account addresses and a range of height can be specified.
    2. `topics`: `[][]Hash` Subscribed topics, see example for the usage.
    
`Range`
  1. `fromHeight`: `uint64` Start height, 0 means starting from the latest height
  2. `toHeight`: `uint64` End height, 0 means no end height is set

- **Returns**:  
  * `result`: `Array<LogsMsg>`
    1. `accountBlockHash`: `Hash` The hash of account block
    2. `addr`: `Address` Account address
    3. `log`: `VmLog` Log
    4. `removed`: `bool` Whether the log was rolled back, `true` for yes and new log will be marked as `false`
	
::: demo
```json tab:Request
{
	"jsonrpc": "2.0",
	"id": 17,
	"method": "subscribe_getLogs",
	"params": [{
		"addrRange":{
			"vite_8810e12ec2d4d61e7568cac25ebd5dd44735d36a405b94f1fa":{
				"fromHeight":"0",
				"toHeight":"0"
			}
		}
	}]
}
```
```json tab:Response
{
  "jsonrpc":"2.0",
  "id":1,
  "result": [
    {
      "log": {
      "topics": [
        "28e6ea56797f4a1b22a1d1986cb6c22e80099ba8e4fd14d42accfaedfe5f6640"
      ],
      "data": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGQQurTFV9WklB2DRvsX8wLCgyoVomYHSCebb9Br/hQ+RAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwYLIcJLnbQjGl+qeU7YWlTWwfsoF6mescP5xz2fDTEg="
    },
    "accountBlockHash": "e4917f357a4588ec1752797ee5516939f46078f5356b14422d4a9dfe45f88bf5",
    "addr": "vite_8810e12ec2d4d61e7568cac25ebd5dd44735d36a405b94f1fa",
    "removed": false
    }
  ]
}
```
```
:::

