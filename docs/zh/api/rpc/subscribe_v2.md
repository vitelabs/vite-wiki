---
sidebarDepth: 4
---

# Subscribe
:::tip 维护者
[viteLiz](https://github.com/viteLiz)
:::

事件订阅相关接口。Vite提供两种事件订阅模式：轮询模式和长连接模式。

轮询模式先创建`filter`，然后通过`filterId`轮询`subscribe_getChangesByFilterId`接口，获取新事件。轮询模式如果超过5分钟没有请求则自动关闭这个`filterId`，也可以通过`subscribe_uninstallFilter`接口主动取消订阅。

长连接模式先注册一个`subscription`，当产生新事件时`subscription`会通过回调的方式返回新事件。长连接断开时自动取消订阅。

当前支持5种类型的事件：新快照（即新快照块）事件、新交易（即新账户块）事件、单个账户的新交易（即新账户块）事件、单个账户的新在途事件、新日志（即新账户块中的日志）事件。每一种类型的事件都包含相应的回滚事件，回滚时，事件消息中的removed字段为true。

## 使用说明

### 长连接模式订阅日志

先注册一个`subscription`，例如订阅`vite_f48f811a1800d9bde268e3d2eacdc4b4f8b9110e017bd7a76f`地址的日志事件。
```bash
// method填subscribe_subscribe，params的第一个参数为长连接注册subscription的方法名，第二个参数开始为方法参数。
{"jsonrpc": "2.0","id": 1,"method": "subscribe_subscribe","params": ["createVmlogSubscription", {"addressHeightRange":{"vite_f48f811a1800d9bde268e3d2eacdc4b4f8b9110e017bd7a76f":{"fromHeight":"0","toHeight":"0"}}}]}
// 注册成功后返回订阅id 0x4b97e0674a5ebef942dbb07709c4a608。
{"jsonrpc": "2.0","id": 1,"result": "0x4b97e0674a5ebef942dbb07709c4a608"}
```
订阅成功后，产生新事件时自动回调。
```bash
// 返回值中的subscription为订阅id，result为事件内容
{"jsonrpc":"2.0","method":"subscribe_subscription","params":{"subscription":"0x4b97e0674a5ebef942dbb07709c4a608","result":[{"vmlog":{"topics":["aa65281f5df4b4bd3c71f2ba25905b907205fce0809a816ef8e04b4d496a85bb","000000000000000000000000bb6ad02107a4422d6a324fd2e3707ad53cfed935"],"data":"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAo="},"accountBlockHash":"23ea04b0dea4b9d0aa4d1f84b246b298a30faba753fa48303ad2deb29cd27f40","accountBlockHeight":"10","address":"vite_f48f811a1800d9bde268e3d2eacdc4b4f8b9110e017bd7a76f","removed":false}]}}
```
长连接模式订阅无需取消订阅，断开连接时会自动取消。

### 轮询模式订阅日志

先创建一个`filter`。
```bash
// method和其他RPC接口一样，填"模块名_方法名"，params填方法参数。
{
	"jsonrpc": "2.0",
	"id": 1,
	"method": "subscribe_createVmlogFilter",
	"params": [{
      "addressHeightRange":{
        "vite_f48f811a1800d9bde268e3d2eacdc4b4f8b9110e017bd7a76f":{"fromHeight":"0","toHeight":"0"}
      }
		}]
}
// 订阅成功后返回filterId
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x61d780619649fb0872e1f94a40cec713"
}
```
按一定的时间间隔用`filterId`轮询新事件。
```bash
// params填filterId
{
	"jsonrpc": "2.0",
	"id": 2,
	"method": "subscribe_getChangesByFilterId",
	"params": ["0x61d780619649fb0872e1f94a40cec713"]
}
// 根据订阅类型，返回对应格式的数据，返回的数据是上一次查询之后发生的新事件
{
    "jsonrpc": "2.0",
    "id": 2,
    "result": {
        "result": [
            {
                "vmlog": {
                    "topics": [
                        "96a65b1cd08da045d0318cafda7b8c8436092851d5a4b7e75054c005a296e3fb",
                        "0000000000000000000000ab24ef68b84e642c0ddca06beec81c9acb1977bb00"
                    ],
                    "data": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAN4Lazp2QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAF"
                },
                "accountBlockHash": "802b82821ec52bdadb8b79a53363bf2f90645caef95a83c34af20c640a6c320b",
                "accountBlockHeight": "10",
                "address": "vite_f48f811a1800d9bde268e3d2eacdc4b4f8b9110e017bd7a76f",
                "removed": false
            }
        ],
        "subscription": "0x61d780619649fb0872e1f94a40cec713"
    }
}
```
轮询模式需要手动取消订阅
```bash
{
	"jsonrpc": "2.0",
	"id": 1,
	"method": "subscribe_uninstallFilter",
	"params": ["0x61d780619649fb0872e1f94a40cec713"]
}
```

### 补全数据

如果由于断开连接导致订阅不连续，可以通过`ledger_getSnapshotBlocks`（按高度范围查询快照块）、`ledger_getBlocksByHeight`（按高度范围查询账户块）、`ledger_getUnreceivedBlocksByAddress`（查询在途交易列表）、`ledger_getVmlogsByFilter`（按账户地址、索引信息查询日志）一次性获取一段时间内的所有事件。

例如，在重新订阅快照事件时，应该先通过`subscribe_createSnapshotBlockFilter`或者`subscribe_createSnapshotBlockSubscription`订阅事件，然后通过`ledger_getLatestSnapshotBlock`接口获取最新的快照块高度，然后通过`ledger_getSnapshotBlocks`补全断开连接时缺失的快照块。

注意：
 * 需要在node_config.json的PublicModules中配置"subscribe"，并且配置"SubscribeEnabled":true，才能使用事件订阅接口。

## subscribe_createSnapshotBlockFilter
轮询模式，创建一个新快照事件的filter，创建成功后可以通过subscribe_getChangesByFilterId轮询新事件。

- **Parameters**: 
  null
  
- **Returns**:  
	- `string` filterId

::: demo
```json tab:Request
{
	"jsonrpc": "2.0",
	"id": 1,
	"method": "subscribe_createSnapshotBlockFilter",
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

## subscribe_createAccountBlockFilter
轮询模式，创建一个所有账户新交易事件的filter，创建成功后可以通过subscribe_getChangesByFilterId轮询新事件。

- **Parameters**: 
  null

- **Returns**:  
	- `string` filterId

::: demo
```json tab:Request
{
	"jsonrpc": "2.0",
	"id": 1,
	"method": "subscribe_createAccountBlockFilter",
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

## subscribe_createAccountBlockFilterByAddress
轮询模式，创建单个账户新交易事件的filter，创建成功后可以通过subscribe_getChangesByFilterId轮询新事件。

- **Parameters**:
  * `string address`: 订阅的账户地址

- **Returns**:  
	- `string` filterId

::: demo
```json tab:Request
{
	"jsonrpc": "2.0",
	"id": 1,
	"method": "subscribe_createAccountBlockFilterByAddress",
	"params": ["vite_ab24ef68b84e642c0ddca06beec81c9acb1977bbd7da27a87a"]
}
```
```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x4f18a08c6e6801aeb7a8cfbad0ca90af"
}
```
:::

## subscribe_createUnreceivedBlockFilterByAddress
轮询模式，创建单个账户在途交易事件的filter，创建成功后可以通过subscribe_getChangesByFilterId轮询新事件。新事件包括新在途交易、在途交易被接收和在途交易被回滚。

- **Parameters**:
  * `Address`: 订阅的账户地址

- **Returns**:  
	- `string` filterId

::: demo
```json tab:Request
{
	"jsonrpc": "2.0",
	"id": 1,
	"method": "subscribe_createUnreceivedBlockFilterByAddress",
	"params": ["vite_ab24ef68b84e642c0ddca06beec81c9acb1977bbd7da27a87a"]
}
```
```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x64e1eb3d26517a0d736b3d85ae9ce299"
}
```
:::

## subscribe_createVmlogFilter
轮询模式，创建一个指定参数的新日志事件filter，创建成功后可以通过subscribe_getChangesByFilterId轮询新事件。

- **Parameters**:
  * `FilterParam`
    * `addressHeightRange`: `map[Address]Range` 只查询指定的账户地址和账户高度的日志，可以同时指定多个账户地址和高度范围，必须至少指定一个账户地址
      * `fromHeight`: `uint64` 起始高度，为0表示从最新的高度开始查询
      * `toHeight`: `uint64` 结束高度，为0表示不设置结束高度
    * `topics`: `[][]Hash` 订阅的topics的前缀组合，使用方法见示例。

```
topics取值示例：
 [] 匹配所有日志
 [[A]] 匹配topics中第一个元素为A的日志
 [[],[B]] 匹配topics中第二个元素为B的日志
 [[A],[B]] 匹配topics中第一个元素为A且第二个元素为B的日志
 [[A,B],[C,D]] 匹配topics中第一个元素为A或B，且第二个元素为C或D的日志
```

- **Returns**:  
	- `string` filterId
	
::: demo
```json tab:Request
{
	"jsonrpc": "2.0",
	"id": 1,
	"method": "subscribe_createVmlogFilter",
	"params": [{
		"addressHeightRange":{
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
轮询模式，轮询模式取消订阅。

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

## subscribe_getChangesByFilterId
轮询模式，轮询新事件。返回值类型取决于订阅事件类型。如果上一次轮询后未产生新事件，则返回空数组。

- **Parameters**:
  * `string`: filterId

- **subscribe_createSnapshotBlockFilter返回值**: 
  * `SnapshotBlocks`
    * `subscription`: `string` filterId
    * `result`: `Array<SnapshotBlockMessage>`
      * `hash`: `string hash` 快照块哈希
      * `height`: `string uint64` 快照块高度
      * `removed`: `bool` 是否回滚。true表示回滚，false表示新交易。

- **subscribe_createAccountBlockFilter返回值**: 
  * `AccountBlocks`
    * `subscription`: `string` filterId
    * `result`: `Array<AccountBlockMessage>`
      * `hash`: `string hash` 账户块哈希
      * `removed`: `bool` 是否回滚。true表示回滚，false表示新交易。

- **subscribe_createAccountBlockFilterByAddress返回值**: 
  * `AccountBlocksWithHeight`
    * `subscription`: `string` filterId
    * `result`: `Array<AccountBlockWithHeightMessage>`
      * `hash`: `string hash` 账户块哈希
      * `height`: `string height` 账户块高度
      * `removed`: `bool` 是否回滚。true表示回滚，false表示新交易。

- **subscribe_createUnreceivedBlockFilterByAddress返回值**: 
  * `UnreceivedBlocks`
    * `subscription`: `string` filterId
    * `result`: `Array<UnreceivedBlockMessage>`
      * `hash`: `string hash` 账户块哈希
      * `received`: `bool` 在途交易是否被接收。
      * `removed`: `bool` 是否回滚。removed为true时表示在途交易被回滚；removed为false，received为false时表示为新在途交易；removed为false，received为true时表示在途交易被接收。
  
- **subscribe_createVmlogFilter返回值**:
  * `Vmlogs` 
    * `subscription`: `string` filterId
    * `result`: `Array<VmlogMessage>`
      * `accountBlockHash`: `Hash` 账户块哈希
      * `accountBlockHeight`: `uint64` 账户块高度
      * `address`: `Address` 账户地址
      * `vmlog`: `VmLog` 日志信息，即智能合约event
        * `topics`: `Array<string hash>` event签名和索引字段，其中签名可以用ABI定义生成
        * `data`: `string base64` event的非索引字段，可以用ABI定义反解析
      * `removed`: `bool` 是否回滚。true表示回滚；false表示新日志。

::: demo
```json tab:Request
{
	"jsonrpc": "2.0",
	"id": 1,
	"method": "subscribe_getChangesByFilterId",
	"params": ["0xf90906914486a9c22d620e50022b38d5"]
}
```
```json tab:SnapshotBlocks
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
      "result": [
          {
              "hash": "5d47f2e0a532923f7ee53e7b465381f197a669e86155d541b3b7f3d63f07a0e2",
              "height": "124",
              "removed": false
          },
          {
              "hash": "78b19cb84ac293d4af3f36e741938929f6d3311362e1265e87bbaa74e5fcef09",
              "height": "125",
              "removed": false
          },
          {
              "hash": "94437996b3e70afd5d8593e2020ae56f63dbbc538df1ead1633340393bd52c1a",
              "height": "126",
              "removed": false
          }
      ],
      "subscription": "0xf90906914486a9c22d620e50022b38d5"
    }
}
```
```json tab:AccountBlocks
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
      "result": [
          {
              "hash": "9cc9ba996a4192e35ddbfe3ba448611fc06f6342463e21d3300e58e9772b348f",
              "removed": false
          },
          {
              "hash": "8b9f8067ef09aa09c8f9d652f0d9ac5e99d083722089a6d91323cffd8b2dcf08",
              "removed": false
          }
      ],
      "subscription": "0xf90906914486a9c22d620e50022b38d5"
    }
}
```
```json tab:AccountBlocksWithHeight
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
      "result": [
          {
              "hash": "72ec861cb2f6c32a48632407f3aa1b05d5ad450ef75fa7660dd39d7be6d3ab68",
              "height": "15",
              "removed": false
          }
      ],
      "subscription": "0xf90906914486a9c22d620e50022b38d5"
    }
}
```
```json tab:UnreceivedBlocks
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
      "result": [
          {
              "hash": "72ec861cb2f6c32a48632407f3aa1b05d5ad450ef75fa7660dd39d7be6d3ab68",
              "received": false,
              "removed": false
          },
          {
              "hash": "72ec861cb2f6c32a48632407f3aa1b05d5ad450ef75fa7660dd39d7be6d3ab68",
              "received": true,
              "removed": false
          },
          {
              "hash": "72ec861cb2f6c32a48632407f3aa1b05d5ad450ef75fa7660dd39d7be6d3ab68",
              "received": false,
              "removed": true
          }
      ],
      "subscription": "0xf90906914486a9c22d620e50022b38d5"
    }
}
```
```json tab:Vmlogs
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
      "result": [
          {
              "vmlog": {
                  "topics": [
                      "aa65281f5df4b4bd3c71f2ba25905b907205fce0809a816ef8e04b4d496a85bb",
                      "000000000000000000000000bb6ad02107a4422d6a324fd2e3707ad53cfed935"
                  ],
                  "data": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAo="
              },
              "accountBlockHash": "de8cd1dc188fd4bf44c0cb90958ffbcccab5766840d56f7b35443a1a1c5c9d3e",
              "accountBlockHeight": "10",
              "address": "vite_78926f48bccef67a3b9cc64fdfe864f2a708ebce1d0bbe9aef",
              "removed": false
          }
      ],
      "subscription": "0xf90906914486a9c22d620e50022b38d5"
    }
}
```
:::

## subscribe_createSnapshotBlockSubscription
长连接模式，创建一个新快照事件的长连接。

- **Parameters**: 
  null
  
- **Returns**:  
	- `string` 订阅id
	
- **Callback**:  
  - `SnapshotBlocks` 同`subscribe_getChangesByFilterId`返回值

::: demo
```json tab:Request
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "subscribe_subscribe",
  "params": ["createSnapshotBlockSubscription"]
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
    "result":[{"hash":"22c38acb79e2de0de3c5a09618054b93ac7c7e82f41f9e15d754e58694eefe16","height":"250","removed":false}]
  }
}
```
:::

## subscribe_createAccountBlockSubscription
长连接模式，创建一个所有账户新交易事件的subscription。

- **Parameters**: 
  null
  
- **Returns**:  
	- `string` 订阅id
	
- **Callback**:  
  - `AccountBlocks` 同`subscribe_getChangesByFilterId`返回值

::: demo
```json tab:Request
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "subscribe_subscribe",
  "params": ["createAccountBlockSubscription"]
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

## subscribe_createAccountBlockSubscriptionByAddress
长连接模式，创建单个账户新交易事件的subscription。

- **Parameters**:
  * `string address` 订阅的账户地址

- **Returns**:  
	- `string` 订阅id
	
- **Callback**:  
  - `AccountBlocksWithHeight` 同`subscribe_getChangesByFilterId`返回值

::: demo
```json tab:Request
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "subscribe_subscribe",
  "params": ["createAccountBlockSubscriptionByAddress", "vite_ab24ef68b84e642c0ddca06beec81c9acb1977bbd7da27a87a"]
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
      "height":"1",
      "removed":false
    }]
  }
}
```
:::

## subscribe_createUnreceivedBlockSubscriptionByAddress
长连接模式，创建单个账户在途交易事件的subscription。

- **Parameters**:
  * `address` 订阅的账户地址

- **Returns**:  
	- `string` 订阅id
	
- **Callback**:  
  - `UnreceivedBlocks` 同`subscribe_getChangesByFilterId`返回值

::: demo
```json tab:Request
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "subscribe_subscribe",
  "params": ["createUnreceivedBlockSubscriptionByAddress", "vite_ab24ef68b84e642c0ddca06beec81c9acb1977bbd7da27a87a"]
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
      "received":false,
      "removed":false
    }]
  }
}
```
:::

## subscribe_createVmlogSubscription
长连接模式，创建一个新日志事件的subscription。

- **Parameters**:
  * `FilterParam` 订阅参数，同`subscribe_createVmlogFilter`

- **Returns**:  
	- `string` 订阅id
	
- **Callback**:  
  - `Vmlogs` 同`subscribe_getChangesByFilterId`返回值

::: demo
```json tab:Request
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "subscribe_subscribe",
  "params": [
    "createVmlogSubscription",
    {
      "addressHeightRange":{
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
        "vmlog":{
          "topics":[
            "aa65281f5df4b4bd3c71f2ba25905b907205fce0809a816ef8e04b4d496a85bb",
            "000000000000000000000000bb6ad02107a4422d6a324fd2e3707ad53cfed935"
          ],
          "data":"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAo="
        },
        "accountBlockHash":"23ea04b0dea4b9d0aa4d1f84b246b298a30faba753fa48303ad2deb29cd27f40",
        "accountBlockHeight": "10",
        "address":"vite_f48f811a1800d9bde268e3d2eacdc4b4f8b9110e017bd7a76f",
        "removed":false
      }
    ]
  }
}
```
:::


