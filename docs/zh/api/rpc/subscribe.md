---
sidebarDepth: 4
---

# Subscribe
:::tip 维护者
[viteLiz](https://github.com/viteLiz)
:::

事件订阅相关接口。Vite提供两种事件订阅模式：轮询模式和长连接模式。

轮询模式先创建`filter`，然后通过`filterId`轮询`subscribe_getFilterChanges`接口，获取新事件。轮询模式如果超过5分钟没有请求则自动关闭这个`filterId`，也可以通过`subscribe_uninstallFilter`接口主动取消定业。

长连接模式先先注册一个`subscription`，然后当产生新事件时`subscription`会通过回调的方式返回新事件。长连接断开时自动取消订阅。

当前支持3种类型的事件：新快照（即新快照块）事件、新交易（即新账户块）事件、新日志（即新账户块中的日志）事件。每一种类型的事件都包含相应的回滚事件，回滚时，事件消息中的removed字段为true。

## 使用说明

以长连接模式订阅日志为例：

先注册一个subscription，订阅`vite_f48f811a1800d9bde268e3d2eacdc4b4f8b9110e017bd7a76f`地址的日志事件。
```bash
// method填subscribe_subscribe，params的第一个参数为方法名，第二个参数开始为方法参数。
{"jsonrpc": "2.0","id": 1,"method": "subscribe_subscribe","params": ["newLogs", {"addrRange":{"vite_f48f811a1800d9bde268e3d2eacdc4b4f8b9110e017bd7a76f":{"fromHeight":"0","toHeight":"0"}}}]}
// 注册成功后返回订阅id 0x4b97e0674a5ebef942dbb07709c4a608。
{"jsonrpc": "2.0","id": 1,"result": "0x4b97e0674a5ebef942dbb07709c4a608"}
```
订阅成功后，产生新事件时自动回调。
```bash
// 参数中的subscription为订阅id，result为事件内容
{"jsonrpc":"2.0","method":"subscribe_subscription","params":{"subscription":"0x4b97e0674a5ebef942dbb07709c4a608","result":[{"log":{"topics":["aa65281f5df4b4bd3c71f2ba25905b907205fce0809a816ef8e04b4d496a85bb","000000000000000000000000bb6ad02107a4422d6a324fd2e3707ad53cfed935"],"data":"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAo="},"accountBlockHash":"23ea04b0dea4b9d0aa4d1f84b246b298a30faba753fa48303ad2deb29cd27f40","addr":"vite_f48f811a1800d9bde268e3d2eacdc4b4f8b9110e017bd7a76f","removed":false}]}}
```
如果由于断开连接导致订阅不连续，可以通过ledger_getSnapshotBlocks（按高度范围查询快照块）、ledger_getBlocksByHeight（按高度范围查询账户块）、subscribe_getLogs（按账户地址、索引信息查询日志）一次性获取一段时间内的所有事件。

## subscribe_newSnapshotBlocksFilter
创建一个新快照事件的filter，创建成功后可以通过subscribe_getFilterChanges轮询新事件。

- **Returns**:  
	- `string` filterId

::: demo
```json tab:Request
{
	"jsonrpc": "2.0",
	"id": 1,
	"method": "subscribe_newSnapshotBlocksFilter",
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


## subscribe_newAccountBlocksFilter
创建一个新交易事件的filter，创建成功后可以通过subscribe_getFilterChanges轮询新事件。

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
创建一个指定参数的新日志事件filter，创建成功后可以通过subscribe_getFilterChanges轮询新事件。

- **Parameters**:

  * `FilterParam`
    1. `addrRange`: `map[Address]Range` 只查询指定的账户地址和账户高度的日志，可以同时指定多个账户地址和高度范围
    2. `topics`: `[][]Hash` 订阅的topics的前缀组合，使用方法见示例。
    
`Range`
  1. `fromHeight`: `uint64` 起始高度，为0表示从最新的高度开始查询
  2. `toHeight`: `uint64` 结束高度，为0表示不设置结束高度
  
topics取值示例：

 `{}` 匹配所有日志
 
 `{{A}}` 匹配topics中第一个元素为A的日志
 
 `{{},{B}}` 匹配topics中第二个元素为B的日志
 
 `{{A},{B}}` 匹配topics中第一个元素为A且第二个元素为B的日志
 
 `{{A,B},{C,D}}` 匹配topics中第一个元素为A或B，且第二个元素为C或D的日志

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
轮询模式取消订阅。

- **Parameters**:
  * `string`: filterId

- **Returns**:  
	- `bool` 取消结果，true 取消成功，false 取消失败。

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
轮询新事件。返回值类型取决于订阅事件类型。如果上一次轮询后未产生新事件，则返回空数组。

- **Parameters**:
  * `string`: filterId

- **subscribe_newSnapshotBlocksFilter返回值**: 
  * `subscription`: `string` filterId
  * `result`: `Array&lt;NewSnapshotBlocksMsg&gt;`
    1. `hash`: `Hash` 快照块哈希
    2. `height`: `uint64` 快照块高度
    3. `removed`: `bool` 是否回滚。true表示回滚，false表示新交易。
  
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
      "subscription": [
          {
              "hash": "5d47f2e0a532923f7ee53e7b465381f197a669e86155d541b3b7f3d63f07a0e2",
              "height": 124,
              "removed": false
          },
          {
              "hash": "78b19cb84ac293d4af3f36e741938929f6d3311362e1265e87bbaa74e5fcef09",
              "height": 125,
              "removed": false
          },
          {
              "hash": "94437996b3e70afd5d8593e2020ae56f63dbbc538df1ead1633340393bd52c1a",
              "height": 126,
              "removed": false
          }
      ],
      "result": "0xf90906914486a9c22d620e50022b38d5"
    }
}
```
:::  

- **subscribe_newAccountBlocksFilter返回值**: 
  * `subscription`: `string` filterId
  * `result`: `Array&lt;NewAccountBlocksMsg&gt;`
    1. `hash`: `Hash` 账户块哈希
    2. `removed`: `bool` 是否回滚。true表示回滚，false表示新交易。
  
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
      "subscription": [
          {
              "Hash": "9cc9ba996a4192e35ddbfe3ba448611fc06f6342463e21d3300e58e9772b348f",
              "Removed": false
          },
          {
              "Hash": "8b9f8067ef09aa09c8f9d652f0d9ac5e99d083722089a6d91323cffd8b2dcf08",
              "Removed": false
          }
      ],
      "result": "0xf90906914486a9c22d620e50022b38d5"
    }
}
```
:::

- **subscribe_newLogsFilter返回值**: 
  * `subscription`: `string` filterId
  * `result`: `Array&lt;LogsMsg&gt;`
    1. `accountBlockHash`: `Hash` 账户块哈希
    2. `addr`: `Address` 账户地址
    3. `log`: `VmLog` 日志信息
    4. `removed`: `bool` 是否回滚。true表示回滚；false表示新日志。

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

## subscribe_newSnapshotBlocks
创建一个新快照事件的长连接。

- **Returns**:  
	- `string` 订阅id
	
- **Callback**:  
`Object`
  1. `subscription`: `string`  订阅id
  2. `result`: `Array&lt;NewSnapshotBlocksMsg&gt;` 事件信息

::: demo
```json tab:Request
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "subscribe_subscribe",
  "params": ["newSnapshotBlocks"]
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
    "result":[{"hash":"22c38acb79e2de0de3c5a09618054b93ac7c7e82f41f9e15d754e58694eefe16","height":250,"removed":false}]
  }
}
```
:::

## subscribe_newAccountBlocks
创建一个新交易事件的长连接。

- **Returns**:  
	- `string` 订阅id
	
- **Callback**:  
`Object`
  1. `subscription`: `string`  订阅id
  2. `result`: `Array&lt;NewAccountBlocksMsg&gt;` 事件信息

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
创建一个新日志事件的长连接。

- **Parameters**:

  * `FilterParam` 订阅参数，同subscribe_newLogsFilter

- **Returns**:  
	- `string` 订阅id
	
- **Callback**:  
`Object`
  1. `subscription`: `string`  订阅id
  2. `result`: `Array&lt;NewLogsMsg&gt;` 事件信息

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
查询历史日志。

- **Parameters**:

  * `FilterParam` 日志查询参数，同subscribe_newLogsFilter

- **Returns**:  
	- `Array&lt;LogsMsg&gt;` 日志信息
	
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
  "result":"0x4b97e0674a5ebef942dbb07709c4a608"
}
```
```json tab:Callback
{
    "jsonrpc": "2.0",
    "id": 17,
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
:::
