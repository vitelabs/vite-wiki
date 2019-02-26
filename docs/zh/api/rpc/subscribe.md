---
sidebarDepth: 4
---

# Subscribe
:::tip 维护者
[viteLiz](https://github.com/viteLiz)
:::

事件订阅相关接口。Vite提供两种事件订阅模式：轮询模式和长连接模式。

轮询模式先创建`filter`，然后通过`filterId`轮询`subscribe_getFilterChanges`接口，获取新事件。轮询模式如果超过5分钟没有请求则自动关闭这个filterId。

长连接模式先先注册一个`subscription`，然后当产生新事件时`subscription`会通过回调的方式返回新事件。

当前支持4种类型的事件：新交易（即新账户块）事件、交易确认（即账户块被快照）事件、新日志（即新账户块中的日志）事件、日志确认（即日志所在的账户块被快照）事件。每一种类型的事件都包含相应的回滚事件，回滚时，事件消息中的removed字段为true。

## subscribe_newAccountBlocksFilter
创建一个新交易事件的filter，创建成功后可以通过subscribe_getFilterChanges轮询新事件。

- **Returns**:  
	- `string` filterId
	
## subscribe_newConfirmedAccountBlocksFilter
创建一个交易确认事件的filter，创建成功后可以通过subscribe_getFilterChanges轮询新事件。

- **Returns**:  
	- `string` filterId
	
## subscribe_newLogsFilter
创建一个指定参数的日志事件filter，创建成功后可以通过subscribe_getFilterChanges轮询新事件。

- **Parameters**:

`FilterParam`
  1. `accountHash`: `Hash` 账户块哈希，如果指定了账户块哈希，则只查询这个哈希值对应的账户块的日志
  2. `snapshotHash`: `Hash` 快照块哈希，如果指定了快照块哈希，则只查询这个哈希值对应的快照块的日志
  3. `fromBlock`: `string` 开始订阅的快照块高度，为空时表示从最新的快照块开始订阅
  4. `toBlock`: `string` 结束订阅的快照块高度，为空时表示不设置订阅结束的高度
  5. `addrList`: `[]Address` 只查询指定的账户地址的日志，可以同时指定多个账户地址
  6. `topics`: `[][]Hash` 订阅的topics的前缀组合，使用方法见示例。
  
topics取值示例：

 `{}` 匹配所有日志
 
 `{{A}}` 匹配topics中第一个元素为A的日志
 
 `{{},{B}}` 匹配topics中第二个元素为B的日志
 
 `{{A},{B}}` 匹配topics中第一个元素为A且第二个元素为B的日志
 
 `{{A,B},{C,D}}` 匹配topics中第一个元素为A或B，且第二个元素为C或D的日志

- **Returns**:  
	- `string` filterId


## subscribe_uninstallFilter
取消订阅filter。

- **Parameters**:
  * `string`: filterId

- **Returns**:  
	- `bool` 取消结果，true 取消成功，false 取消失败。

## subscribe_getFilterChanges
轮询新事件。返回值类型取决于订阅事件类型。如果上一次轮询后未产生新事件，则返回空数组。

- **Parameters**:
  * `string`: filterId
  
- **subscribe_newAccountBlocksFilter返回值**: 
`Array&lt;NewAccountBlocksMsg&gt;`
  1. `hash`: `Hash` 账户块哈希
  2. `blockType`: `byte` 交易类型
  3. `fromAddr`: `Address` 交易请求地址
  4. `toAddr`: `Address` 交易响应地址
  5. `height`: `string` 账户块高度
  6. `amount`: `string` 转账金额
  7. `tokenId`: `TokenId` 转账代币id
  8. `data`: `[]byte` 交易数据
  9. `removed`: `bool` 是否回滚。true表示回滚，此时只有hash字段非空；false表示新交易，此时其他字段都非空。

- **subscribe_newConfirmedAccountBlocksFilter返回值**: 
`Array&lt;NewConfirmedAccountBlocksMsg&gt;`
  1. `accountBlockList`: `Array&lt;NewAccountBlocksMsg&gt;`
  2. `snapshotHash`: `Hash` 快照交易的快照块哈希 
  3. `removed`: `bool` 是否回滚。true表示回滚，此时NewAccountBlocksMsg只有hash字段非空；false表示为新的确认交易事件。

- **subscribe_newFilter、subscribe_newLogsFilter、subscribe_newConfirmedLogsFilter返回值**: 
`Array&lt;LogsMsg&gt;`
  1. `accountBlockHash`: `Hash` 账户块哈希
  2. `snapshotBlockHash`: `Hash` 快照块哈希。新日志事件为空，确认日志事件为非空
  3. `addr`: `Address` 账户地址
  4. `data`: `[]byte` 日志的data值
  5. `topics`: `[]Hash` 日志的topics值
  6. `removed`: `bool` 是否回滚。true表示回滚，此时只有accountBlockHash字段非空，如果是已确认的日志被回滚，则snapshotBlockHash非空；false表示新日志或者新确认日志事件。

## subscribe_newAccountBlocks
创建一个新交易事件的长连接。

- **Returns**:  
	- `string` 订阅id
	
- **Callback**:  
`Object`
  1. `params`: `object`
     * `subscription`: `string`  订阅id
     * `result`: `Array&lt;NewAccountBlocksMsg&gt;` 事件信息
  
## subscribe_newConfirmedAccountBlocks
创建一个交易确认事件的长连接。

- **Returns**:  
	- `string` 订阅id
	
- **Callback**:  
`Object`
  1. `params`: `object`
     * `subscription`: `string`  订阅id
     * `result`: `Array&lt;NewConfirmedAccountBlocksMsg&gt;` 事件信息

## subscribe_newLogs
创建一个交易确认事件的长连接。

- **Parameters**:

  * `FilterParam` 订阅参数，同subscribe_newFilter

- **Returns**:  
	- `string` 订阅id
	
- **Callback**:  
`Object`
  1. `params`: `object`
     * `subscription`: `string`  订阅id
     * `result`: `Array&lt;LogsMsg&gt;` 事件信息
