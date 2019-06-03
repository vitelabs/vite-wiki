# 跨链网关API协议

## 什么是跨链网关

跨链网关提供区块链上资产（我们称之为对手链）与VITE链上代币（我们称之为TOT）的交换能力。

例如，假如用户想在ViteX上交易BTC，用户需要先通过跨链网关将比特币链上的BTC置换成VITE链上的BTC代币，待完成交易后也可以通过跨链网关将VITE链上的BTC代币置换成比特币链上的BTC。在这个过程中跨链网关代用户锁定比特币链上的BTC。

任何人都可以运营一个跨链网关，因此我们设计了一套”跨链网关接口协议“，并且已经在官方web钱包中对接了这套协议，而跨链网关的运营者只需要实现”跨链网关接口协议“就可以轻松的完成与官方web钱包的对接。


## 如何搭建跨链网关
### 运行跨链网关的必要条件
* 在VITE上铸币TOT。用于在VITE链上代表对手链上的资产。关于如何铸币请参考[资产发行](./../../tutorial/rule/mintage.html)，铸币需要与对手链上资产的发行量、小数位保持一致。
* 运行VITE全节点，或使用官方节点API，用于验证或者发送TOT交易。关于如何发送或查询VITE交易请参考[RPC接口](./../../api/rpc/)
> * 验证或者发送交易。可以选择使用VITE官方RPC节点，也可以选择自行搭建VITE全节点并开启RPC功能。关于如何运行VITE全节点请参考[安装全节点](./../../tutorial/node/install.html)、[节点配置文件](./../../tutorial/node/node_config.html)。如果您的开发语言是java或者go，可使用官方提供的SDK与RPC节点交互。
> * 关于VITE钱包管理。如果您的开发语言是java或者go，可使用官方提供的SDK管理VITE钱包。如果使用其他开发语言可以参考[钱包管理](./../../tutorial/node/wallet-manage.html)
* 运行对手链全节点，或使用可信任的全节点API。用于验证或发送对手链上的资产。
* 实现"[跨链网关接口协议](#跨链网关接口协议)"所定义的接口。

### 如何测试联调
* 可以使用公测钱包作为联调入口。需要一个premainnet公测环境
* 在该环境下铸币，在这里假如是ETH-0
* ![](~/images/crosschain-set.png)
* ![](~/images/crosschain-seturl.png)
* ![](~/images/crosschain-debug.png)

## 跨链网关接口协议
> * 跨链网关服务需要HTTPS协议
> * 跨链网关服务需要支持CORS跨域
> * 所有金额都使用最小精度表示
### 统一返回格式
```
{
  "code": 0,//响应码，更多响应码见响应码表
  "subCode": 0,//子响应码 ，更多响应码见响应码表
  "msg": null,//响应说明
  "data":""//响应数据，具体定义见接口列表
}
```
### 元信息类接口
#### `/meta_info`
> 描述
```
获取跨链网关元信息。
```
> 方法
```
GET
```

> 请求参数

|参数名|描述|数据类型|
|:--|:---|:---:|
|tokenId|TOT id|string|
> 返回参数

|参数名|描述|数据类型|
|:--|:---|:---:|
|type|类型,枚举值:`0`代表单地址模式，如ETH，`1`代表需通过备注区分地址模式，如EOS，|int|
|depositState|转入通道状态,枚举值:`OPEN`，`MAINTAIN`，`CLOSED`|string|
|withdrawState|转出通道状态，枚举值:`OPEN`，`MAINTAIN`，`CLOSED`|string|

> 返回样例
```
{
	"code": 0,
	"subCode": 0,
	"msg": null,
	"data": {
		"type": 0,
		"depositState": "OPEN",
		"withdrawState": "OPEN"
	}
}
```

### 转入转出交易类接口
#### `/deposit_info`
> 描述
```
获取转入信息。
```

> 方法
```
GET
```

> 请求参数

|参数名|描述|数据类型|
|:--|:---|:---:|
|tokenId|TOT id|string|
|walletAddress|用户VITE地址|string|
> 返回参数

|参数名|描述|数据类型|
|:--|:---|:---:|
|type|类型,枚举值:`0`代表单地址模式，如ETH，`1`代表需通过备注区分地址模式，如EOS|int|
|depositAddress|转入地址|string|
|labelName|标签名，type为1时必传|string|
|label|标签值，type为1时必传|string|
|minimumDepositAmount|最小转入金额|string|
|comfirmationCount|入账确认数|string|
|noticeMsg|注意事项描述|string|

> 返回样例
```
{
	"code": 0,
	"subCode": 0,
	"msg": null,
	"data": {
		"type": 1,
		"depositAddress": "vitetothemoon",
		"labelName": "memo",
		"label": "123467",
		"minimumDepositAmount": "30000",
		"comfirmationCount": 1,
		"noticeMsg": ""
	}
}
```

#### `/withdraw_info`
> 描述
```
获取转出信息。
```

> 方法
```
GET
```

> 请求参数

|参数名|描述|数据类型|
|:--|:---|:---:|
|tokenId|TOT id|string|
|walletAddress|用户VITE地址|string|
> 返回参数

|参数名|描述|数据类型|
|:--|:---|:---:|
|minimumWithdrawAmount|最小转出金额|string|
|maximumWithdrawAmount|最小转出金额|string|
|gatewayAddress|网关地址，web钱包会签名一个以该地址为目标地址的TOT转账交易，用于回收TOT|string|


> 返回样例
```
{
	"code": 0,
	"subCode": 0,
	"msg": null,
	"data": {
		"minimumWithdrawAmount": "1000000",
		"maximumWithdrawAmount": "10000000000",
		"gatewayAddress": "vite_42f9a5d93e1e392624b97dfa3d7cab057b79c2489d6bc13682"
	}
}
```

#### `/verify_withdraw_address`
> 描述
```
校验转出地址。
```

> 方法
```
GET
```

> 请求参数

|参数名|描述|数据类型|
|:--|:---|:---:|
|tokenId|TOT id|string|
|walletAddress|用户VITE地址|string|
> 返回参数

|参数名|描述|数据类型|
|:--|:---|:---:|
| |地址是否正确|bool|

> 返回样例
```
{
	"code": 0,
	"subCode": 0,
	"msg": null,
	"data": true
}
```

#### `/withdraw_fee`
> 描述
```
获取网关收取的转出手续费。
```

> 方法
```
GET
```

> 请求参数

|参数名|描述|数据类型|
|:--|:---|:---:|
|tokenId|TOT id|string|
|walletAddress|用户VITE地址|string|
|amount|金额|string|
|containsFee|传入的amount是否已包含手续费，用于全部转出场景|string|

> 返回参数

|参数名|描述|数据类型|
|:--|:---|:---:|
|fee|网关收取的手续费|string|


> 返回样例
```
{
	"code": 0,
	"subCode": 0,
	"msg": null,
	"data": {
		"fee": "1000000"
	}
}
```

#### `/withdraw`
> 描述
```
获取转出信息。
```

> 方法
```
POST
```

> 请求参数

|参数名|描述|数据类型|
|:--|:---|:---:|
|rawTx|web钱包已签名的AccountBlock json<br>AccountBlock与[发送交易](./../../api/rpc/tx.html#tx-sendrawtx)接口所描述的accountBlock一致，其中ToAddress为`/withdraw_info`接口返回的gatewayAddress，Amount为实际转出金额+转出手续费|string|
|withdrawAddress|用户转出地址|string|
|signature|用户使用当前VITE地址的私钥，对rawTx和withdrawAddress组成的json，即{"rawTx": "xxx","withdrawAddress":"mjRrUJsFVUzefb9qoHLwE7ym7Mu9cFUtBZ"}进行签名|string|

> 返回参数

> 返回样例
```
{
	"code": 0,
	"subCode": 0,
	"msg": null,
	"data": true
}
```

### 转入转出记录查询类接口
#### `/deposit_records`
> 描述
```
转入记录。
```

> 方法
```
GET
```

> 请求参数

|参数名|描述|数据类型|
|:--|:---|:---:|
|tokenId|TOT id|string|
|walletAddress|用户VITE地址|string|
|pageNum|分页参数，起始页序号，从1开始|int|
|pageSize|分页参数，每页大小|int|

> 返回参数

|参数名|描述|数据类型|
|:--|:---|:---:|
|totalCount|总记录数|int|
|depositRecords|转入记录列表|list|
|inTxExplorerFormat|对手链浏览器，用inTxHash替换{$tx}为该交易区块浏览器地址|string|
|outTxExplorerFormat|vite链浏览器，用outTxHash替换{$tx}为该交易区块浏览器地址|string|

>> 其中depositRecords参数如下

|参数名|描述|数据类型|
|:--|:---|:---:|
|inTxHash|对手链转入交易hash|string|
|outTxHash|VITE链转出TOT交易hash|string|
|amount|转入金额|string|
|fee|网关收取的转入手续费|string|
|state|转入状态，枚举值<br>`OPPOSITE_PROCESSING`对手链转入交易确认中<br>`OPPOSITE_CONFIRMED`网关已确认对手链交易<br>`BELOW_MINIMUM`对手链交易金额小于最小转入金额，转入流程结束<br>`TOT_PROCESSING`网关已发出tot转出交易<br>`TOT_CONFIRMED`网关已确认tot转出交易，转入流程结束|string|
|dateTime|转入时间,timestamp毫秒|string|


> 返回样例
```
{
	"code": 0,
	"subCode": 0,
	"msg": null,
	"data": {
		"totalCount": 1,
		"depositRecords": [{
			"inTxHash": "0x8e791fc2430761ce82f432c6ad1614fa1ebc57b1e1e0925bd9302a9edf8fd235",
			"outTxHash": "9fb415eb6f30b27498a174bd868c29c9d30b9fa5bfb050d19156523ac540744b",
			"amount": "300000000000000000",
			"fee": "0",
			"state": "TOT_CONFIRMED",
			"dateTime": "1556129201000"
		}],
		"inTxExplorerFormat": "https://ropsten.etherscan.io/tx/{$tx}",
		"outTxExplorerFormat": "https://explorer.vite.org/zh/transaction/{$tx}"
	}
}
```

#### `/withdraw_records`
> 描述
```
转出记录。
```

> 方法
```
GET
```

> 请求参数

|参数名|描述|数据类型|
|:--|:---|:---:|
|tokenId|TOT id|string|
|walletAddress|用户VITE地址|string|
|pageNum|分页参数，起始页序号，从1开始|int|
|pageSize|分页参数，每页大小|int|

> 返回参数

|参数名|描述|数据类型|
|:--|:---|:---:|
|totalCount|总记录数|int|
|withdrawRecords|转出记录列表|list|
|inTxExplorerFormat|vite链浏览器，用inTxHash替换{$tx}为该交易区块浏览器地址|string|
|outTxExplorerFormat|对手链浏览器，用outTxHash替换{$tx}为该交易区块浏览器地址|string|

>> 其中withdrawRecords参数如下

|参数名|描述|数据类型|
|:--|:---|:---:|
|inTxHash|VITE链tot转入交易hash|string|
|outTxHash|对手链转出交易hash|string|
|amount|实际转出到账金额|string|
|fee|网关收取的转出手续费|string|
|state|转出状态，枚举值<br>`TODO`VITE TOT转入交易待发送至网络<br>`TOT_PROCESSING`VITE TOT转入交易已发送，待确认<br>`TOT_NOT_RECEIVED`VITE TOT转入交易确认失败，转出流程结束<br>`TOT_CONFIRMED`网关已确认VITE TOT交易<br>`OPPOSITE_PROCESSING`网关已发出对手链转出交易<br>`OPPOSITE_CONFIRMED`网关已确认对手链转出交易，转出流程结束|string|
|dateTime|转出时间,timestamp毫秒|string|

> 返回样例
```
{
	"code": 0,
	"subCode": 0,
	"msg": null,
	"data": {
		"totalCount": 2,
		"withdrawRecords": [{
			"inTxHash": "b95c11ac34d4136f3be1daa3a9fab047e11ee9c87acef63ca21ba2cee388a80f",
			"outTxHash": "0x8096542d958a3ac4f247eba3551cea4aa09e1cdad5d7de79db4b55f28864b628",
			"amount": "190000000000000000",
			"fee": "10000000000000000",
			"state": "OPPOSITE_CONFIRMED",
			"dateTime": "1556129201000"
		}],
		"inTxExplorerFormat": "https://explorer.vite.org/zh/transaction/{$tx}",
		"outTxExplorerFormat": "https://ropsten.etherscan.io/tx/{$tx}"
	}
}
```

## TIPS
### 资产托管
* 采用冷钱包管理私钥
* 热钱包管理策略（存活周期，资金金额控制，密钥管理）
* 私钥存储管理（多人多份多地）
* 多地址分散（不要把鸡蛋放在一个篮子里）
* 及时对账

### 转入与转出
* 合理的交易确认数
* 分叉时关闭充提币功能

### 监控
* 对首次提币地址及用户监控
* 保证监控的高可靠性
* 转入与转出数据分析
* 额充提币的监控及确认

### 限流

## 实例
以下以ETH网关为例子，介绍跨链网关基本流程
### 钱包构成
以地址维度来看，整个跨链网关中存在

![](~/images/crosschain-wallet.png)
1. 网关冷钱包地址，包括ETH的地址与VITE链的地址，为了保证资产托管安全一般将大部分资金存入冷钱包
2. 网关热钱包地址，包括ETH的地址与VITE链的地址，用于应对网关日常的转入转出
3. 网关ETH链转入地址，网关为每个VITE地址分配一个转入地址
4. 用户对手链地址与VITE链地址

### 业务流程
#### 跨链转入
1. 为用户分配地址。当用户发起跨链转入请求时，为每个用户VITE地址分配独立的ETH转入地址。转入地址暴露给用户，私钥由网关保存。

![](~/images/crosschain-deposit.png)
2. 监听ETH转入地址，并等待足够确认数。
3. 当网关认为这笔ETH交易已确认后，操作VITE热钱包转账对应的TOT至用户的VITE地址。如果有需要，将ETH转入地址余额归集到ETH热钱包。
4. 监听VITE网络，确认这笔TOT交易，更新跨链转入记录。

#### 跨链转出
1. 当用户填写转出地址，并点击跨链转出后，官方web钱包会根据网关VITE热钱包地址，转出金额、手续费等，离线签名出一个VITE交易，该交易是将TOT从用户VITE地址转账至网关VITE热钱包地址。

![](~/images/crosschain-withdraw.png)
2. 网关验证完这笔交易的合法性后，需要将这笔交易发至VITE网络。
3. 监听这笔交易的确认情况，并等待足够确认数。
4. 当网关认为这笔VITE交易已确认后，操作ETH热钱包转账ETH至用户填写的ETH地址。
5. 监听ETH网络，确认这笔ETH交易，更新跨链转出记录。

#### 冷热钱包资金转移
一般将20%的资金放在热钱包，80%的资金放在冷钱包。具体策略根据网关余额总量，流动性，实时流水监控而不同。
