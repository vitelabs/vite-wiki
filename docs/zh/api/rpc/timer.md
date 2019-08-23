---
sidebarDepth: 4
---

# Timer
:::tip 维护者
[viteLiz](https://github.com/viteLiz)
:::

## 合约信息说明
定时任务合约，合约账户地址： `vite_0000000000000000000000000000000000000008e745d12403`

ABI：

```json
[
    // 注册定时任务
    {"type":"function","name":"NewTimer", "inputs":[{"name":"timerType","type":"uint64"},{"name":"start","type":"uint64"},{"name":"window","type":"uint64"},{"name":"interval","type":"uint64"},{"name":"expiringCondition","type":"uint64"},{"name":"invokingAddr","type":"address"},{"name":"refundAddr","type":"address"}]},
    // 删除定时任务
		{"type":"function","name":"DeleteTimer", "inputs":[{"name":"timerId","type":"bytes32"},{"name":"refundAddr","type":"address"}]},
    // 充值
		{"type":"function","name":"Deposit", "inputs":[{"name":"timerId","type":"bytes32"}]},
]
```

定时任务回调ABI：

```json
[
		{"type":"function","name":"__notify", "inputs":[{"name":"current","type":"uint64"},{"name":"timerId","type":"bytes32"}]}
]
```

## timer_getNewTimerData
获取注册定时任务请求数据，也可以通过对ABI中的`NewTimer`方法编码获取交易请求数据。

- **Parameters**: 

`Object`
  1. `timeHeightType`:`uint8` 触发类型，1-按时间触发，2-按快照块高度触发
  2. `expiringType`:`uint8` 结束条件类型，1-到达指定时间或高度后结束，2-触发若干次后结束，3-永不结束
  3. `intervalType`:`uint8` 如何计算下一次触发，1-按实际触发时间或高度顺延，2-按固定间隔触发
  4. `start`:`uint64` 第一次触发的时间或高度，如果填历史时间或高度，则以此为基准计算第一次触发时间或高度
  5. `interval`:`uint64` 触发时间间隔/触发高度间隔，时间间隔不低于一轮（即75s），高度间隔不低于75个快照块
  6. `window`:`uint64` 触发时间窗口/触发高度窗口，时间窗口不低于一轮（即75s），高度窗口不低于75个快照块，触发窗口小于等于触发间隔。如果在窗口内未触发，则跳过本次触发
  7. `expiringCondition`:`uint64` 结束条件，结束条件类型为1时填指定时间或高度，结束条件为2是填触发次数，结束条件为3时0
  8. `invokingAddr`:`Address` 交易接收地址
  9. `refundAddr`:`Address` 退款地址，定时任务到达结束条件时自动退款到此地址

- **Returns**: 
	- `[]byte` Data

- **Example**:


::: demo


```json tab:Request
{
	"jsonrpc": "2.0",
	"id": 1,
	"method": "timer_getNewTimerData",
	"params": [{
		"timeHeightType":2,
		"expiringType":2,
		"intervalType":2,
		"start":"1",
		"window":"75",
		"interval":"75",
		"expiringCondition":"10",
		"invokingAddr":"vite_ab24ef68b84e642c0ddca06beec81c9acb1977bbd7da27a87a",
		"refundAddr":"vite_ab24ef68b84e642c0ddca06beec81c9acb1977bbd7da27a87a"
	}]
}
```

:::

## timer_getDeleteTimerData
获取删除定时任务交易请求数据，也可以通过对ABI中的`DeleteTimer`方法编码获取交易请求数据。

- **Parameters**: 

  * `Hash`: 定时任务id，即注册定时任务请求交易的哈希
  * `Address`: 退款地址

- **Returns**: 
	- `[]byte` Data

- **Example**:


::: demo

```json tab:Request
{
	"jsonrpc": "2.0",
	"id": 1,
	"method": "timer_getDeleteTimerData",
	"params": ["058c54c3434d46f73bc1fdabc4608ffd616b3d5e456465c6c2c2581c057f4247","vite_56fd05b23ff26cd7b0a40957fb77bde60c9fd6ebc35f809c23"]
}
```

:::

## timer_getDepositData
获取充值交易请求数据，也可以通过对ABI中的`Deposit`方法编码获取交易请求数据。

- **Parameters**: 

  * `Hash`: 定时任务id，即注册定时任务请求交易的哈希

- **Returns**: 
	- `[]byte` Data

- **Example**:

::: demo

```json tab:Request
{
	"jsonrpc": "2.0",
	"id": 1,
	"method": "timer_getDepositData",
	"params": ["058c54c3434d46f73bc1fdabc4608ffd616b3d5e456465c6c2c2581c057f4247"]
}
```
:::

## timer_getTimerInfoById
查询根据定时任务id询定时任务列表

- **Parameters**: 

  * `Hash`: 定时任务id，即注册定时任务请求交易的哈希

- **Returns**: 
`TimerInfo` 
  1. `timerId`:`Hash` 定时任务id 
  2. `timeHeight`:`uint8` 触发类型
  3. `expiringType`:`uint8` 结束条件类型
  4. `intervalType`:`uint8` 如何计算下一次触发
  5. `interval`:`uint64` 触发时间间隔/触发高度间隔
  6. `window`:`uint64` 触发时间窗口/触发高度窗口
  7. `expiringCondition`:`uint64` 结束条件
  8. `invokingAddr`:`Address` 交易接收地址
  9. `refundAddr`:`Address` 退款地址
  10. `ownerAddr`:`Address` 注册者地址
  11. `index`:`uint64` 内部序号
  12. `amount`:`big.Int` 账户余额
  13. `triggerTimes`:`uint64` 已触发次数
  14. `next`:`uint64` 下一次触发时间/高度
  15. `delete`:`uint64` 欠费的定时任务被自动删除的快照块高度

- **Example**:


::: demo


```json tab:Request
{
	"jsonrpc": "2.0",
	"id": 1,
	"method": "timer_getTimerInfoById",
	"params": ["058c54c3434d46f73bc1fdabc4608ffd616b3d5e456465c6c2c2581c057f4247"]
}
```

```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "timerId": "058c54c3434d46f73bc1fdabc4608ffd616b3d5e456465c6c2c2581c057f4247",
        "timeHeightType": 2,
        "expiringType": 2,
        "intervalType": 2,
        "window": "75",
        "interval": "75",
        "expiringCondition": "10",
        "invokingAddr": "vite_ab24ef68b84e642c0ddca06beec81c9acb1977bbd7da27a87a",
        "refundAddr": "vite_ab24ef68b84e642c0ddca06beec81c9acb1977bbd7da27a87a",
        "ownerAddr": "vite_56fd05b23ff26cd7b0a40957fb77bde60c9fd6ebc35f809c23",
        "index": "1",
        "amount": "990000000000000000000",
        "triggerTimes": "0",
        "next": "226",
        "delete": "0"
    }
}
```

:::

## timer_getTimerInfosByOwner
查询根据注册地址查询定时任务列表

- **Parameters**: 

  * `Address`: 定时任务注册者地址

- **Returns**: 
`Array<TimerInfo>` 见`timer_getTimerInfoById`接口返回值

- **Example**:


::: demo


```json tab:Request
{
	"jsonrpc": "2.0",
	"id": 1,
	"method": "timer_getTimerInfosByOwner",
	"params": ["vite_56fd05b23ff26cd7b0a40957fb77bde60c9fd6ebc35f809c23"]
}
```

```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": [
        {
            "timerId": "058c54c3434d46f73bc1fdabc4608ffd616b3d5e456465c6c2c2581c057f4247",
            "timeHeightType": 2,
            "expiringType": 2,
            "intervalType": 2,
            "window": "75",
            "interval": "75",
            "expiringCondition": "10",
            "invokingAddr": "vite_ab24ef68b84e642c0ddca06beec81c9acb1977bbd7da27a87a",
            "refundAddr": "vite_ab24ef68b84e642c0ddca06beec81c9acb1977bbd7da27a87a",
            "ownerAddr": "vite_56fd05b23ff26cd7b0a40957fb77bde60c9fd6ebc35f809c23",
            "index": "1",
            "amount": "990000000000000000000",
            "triggerTimes": "0",
            "next": "226",
            "delete": "0"
        }
    ]
}
```

:::
