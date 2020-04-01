# 交易所订单服务

## 概述
交易所订单服务是由Vite Labs提供的中心化服务，搭建在ViteX去中心化协议之上，允许用户在不暴露私钥的情况下，通过REST API来实现ViteX去中心化交易所的相关操作。

* 当您需要第三方做市商来操作您的账户完成交易时，可以不将自己的私钥提供给做市商，而只提供API Key和API Secret。对方只能在您授权的交易对下进行下单和撤单操作，无法转移您的资产。
* 您可以针对每个交易对单独授权，ViteX合约会阻止API服务操作未经授权的交易对。
* 您可以随时发起链上交易，取消对API的授权。授权取消后，即使仍持有有效的API Key和API Secret，ViteX合约也不再接受来自API的订单操作请求。
* 请注意：用户通过API完成的订单操作，是通过ViteX.net API服务的私钥进行签名的，所产生的Vite链上交易也记录在ViteX.net API服务的账户中，用户无法在自己的Vite地址下找到相应的记录。
## 链上授权
在使用ViteX.net API前，需要用户在Vite链上对API服务进行授权，允许API服务所对应的Vite账户来代理用户进行订单操作。

为保证安全，建议您只授权必要的交易对。授权的对象是ViteX.net API的Vite地址，不需要提供私钥。请注意：在任何情况下，您都不要将自己的私钥和助记词提供给第三方，包括Vite Labs在内。

API服务会为每个用户分配一个单独的Vite地址，来代理用户签名链上交易。您需要为该地址抵押VITE代币来提供配额，以执行下单、撤单等操作。

## 网络
* 【Mainnet】: `https://api.vitex.net`

## 接口鉴权
接口分为公有和私有两种，私有接口需要通过签名来进行权限认证。

接口鉴权需要`API Key`和`API Secret`，请联系Vite Labs获取。注意`API Key`和`API Secret`是大小写敏感的。 

调用私有接口时，除了接口本身所需的参数外，还需要传递`key`、`timestamp`和`signature`三个参数。

* key即`API Key`字段。
* timestamp参数为UNIX时间戳（毫秒级）(UNIX-style timestamp in epoch millisecond format)，例如：1565360340430。为防止重放攻击，服务端会校验时间戳的合法性，若请求中的时间戳小于服务端时间5000 ms或大于1000 ms，均认为该请求无效。
* signature字段通过`HMAC SHA256`签名算法生成。`API Secret`作为`HMAC SHA256`的密钥，其他所有参数作为`HMAC SHA256`的操作对象，得到的输出即为签名。签名大小写不敏感。

timestamp 校验逻辑如下:

```
    if (timestamp < (serverTime + 1000) && (serverTime - timestamp) <= 5000) {
      // process request
    } else {
      // reject request
    }
```

## 基本规范
所有接口的响应均为JSON格式，时间戳均为UNIX时间，单位为毫秒。
HTTP状态码：

* HTTP `200` 表示接口正常返回
* HTTP `4XX` 表示错误的请求。
* HTTP `5XX` 表示API服务端异常。 

接口返回的格式为：

字段 | 取值
------------ | ------------
code | 返回码，调用成功返回`0`；调用失败返回具体错误代码
msg | 错误信息
data | 接口返回的实际数据

例如：
```javascript
{
  "code": 1,
  "msg": "Invalid symbol",
  "data": {}
}
```

code状态码：
* `1001` 访问限制：错误码表示超出API访问频次配额限制。
* `1002` 参数错误：timestamp异常、订单价格格式错误、订单交易数量异常、订单交易金额过小、订单指定交易市场不存在、不存在的委托授权、symbol不存在
* `1003` 网络环境：VITE全网拥堵、交易发送频繁，请您稍后再次尝试、代理地址配额不足
* `1004` 其他错误：撤销订单不属于当前地址、该订单状态不可以撤销、查询订单信息异常、
* `1005` 服务端异常：服务端server异常

## 访问限制
API接口的访问以60秒为一个固定周期，周期内次数用完，则调用接口失败；上一个周期未使用的次数不会顺延到下一个周期；

## 需要签名的接口
* 按照参数名称的字典顺序对请求的所有参数(接口定义的参数和key)需要按照字母先进行排序；
* 其中参数名称和值使用英文符号(=)进行连接；再把英文等号连接得到的字符串按参数名字的字典顺序依次使用&符号连接，即得到规范化的请求字符串；
* 签名使用`HMAC SHA256`算法. API-KEY所对应的API-Secret作为 `HMAC SHA256` 的密钥，其他所有参数作为`HMAC SHA256`的操作对象，得到的输出即为签名。
* 签名大小写不敏感。
* 调用这些接口时，除了接口本身所需的参数外，还需要传递`signature`即签名参数。
* 当同时使用query string和request body时，`HMAC SHA256`的输入query string在前，request body在后

## POST /api/v1/order 的示例

下面是调用下单接口的示例，假设API Key和API Secret为：

API Key | API Secret
------------ | ------------
11111111 | 22222222

若想在ETH-000对BTC-000的交易对下一个买单，以0.09 ETH/BTC的价格，买入10 ETH，参数如下：

参数 | 取值
------------ | ------------
symbol | ETH-000_BTC-000
side | 0
amount | 10
price | 0.09
timestamp | 1567067137937

### 接口签名示例
* **queryString:** amount=10&key=11111111&price=0.09&side=0&symbol=ETH-000_BTC-000&timestamp=1567755178560
* **签名消息(参数排序):**

    ```
    $ echo -n "amount=10&key=11111111&price=0.09&side=0&symbol=ETH-000_BTC-000&timestamp=1567755178560" | openssl dgst -sha256 -hmac "22222222"
    (stdin)= 409cf00bb97c08ae99317af26b379ac59f4cfaba9591df7738c0604a4cb68b9a
    ```


* **调用API:**

    ```
    $ curl -X POST -d "amount=10&key=11111111&price=0.09&side=0&symbol=ETH-000_BTC-000&timestamp=1567755178560&signature=409cf00bb97c08ae99317af26b379ac59f4cfaba9591df7738c0604a4cb68b9a" https://api.vitex.net/api/v1/order
    ```

# 公开API接口

## 枚举定义

### 订单状态
代码 | 含义 | 描述
------------ | ------------ | ------------
0 | Unknown | 未知状态
1 | Pending Request| 已提交下单请求，在链上生成Request交易
2 | Received | 订单已被系统接受，撮合状态未知
3 | Open | 未成交
4 | Filled | 完全成交
5 | Partially Filled | 部分成交
6 | Pending Cancel | 撤单请求已发送，但是否撤单成功未知
7 | Cancelled | 已取消
8 | Partially Cancelled| 部分成交后取消
9 | Failed | 订单失败
10 | Expired | 订单过期

### 订单类型

代码 | 含义 | 描述
------------ | ------------ | ------------
0 | Limit Order | 限价单
1 | Market Order | 市价单(暂不支持)

### 订单交易方向

代码 | 含义 | 描述
------------ | ------------ | ------------
0 | Buy Order | 买入
1 | Sell Order | 卖出

### Time in force

代码 | 含义 | 描述
------------ | ------------ | ------------
0 | GTC - Good Till Cancel | 成交为止
1 | IOC - Immediate or Cancel | 无法立即成交的部分就撤销 (暂不支持)
2 | FOK - Fill or Kill | 要么全部成交，要么撤销 (暂不支持)

## 通用接口
### 测试服务器连通性 PING
```
GET /api/v1/ping
```
测试API服务可用性

**参数:**
NONE

**响应:**
```javascript
{
  "code": 0,
  "msg": "Success"
}
```

### 获取服务器时间
```
GET /api/v1/timestamp
```
获取服务器时间

**参数:**
NONE

**响应:**
```javascript
{
  "code": 0,
  "msg": "Success",
  "data": 1565360340430
}
```

### 获取一组交易对信息
```
GET /api/v1/markets
```
**参数:**

名称 | 类型 | 是否必须 | 描述
------------ | ------------ | ------------ | ------------
operator | STRING | NO | 运营商id，返回该运营商负责的交易对，如空缺则返回全部交易对
quoteCurrency | STRING | NO | 交易对中的基础币种，如空缺则返回全部基础货币对应的交易对



**响应:**

名称 | 类型 | 描述
------------ | ------------ | ------------
symbol | STRING | 交易对名称
tradingCurrency | STRING | 交易币种简称
quoteCurrency | STRING | 基础币种（定价币种）简称
tradingCurrencyId | STRING | 交易币种Id
quoteCurrencyId | STRING | 基础币种Id
tradingCurrencyName | STRING | 交易币种全称
quoteCurrencyName | STRING | 基础币种（定价币种）全称
operator | STRING | 运营商id
operatorName | STRING | 运营商名称
operatorLogo | STRING | 运营商LOGO图片URL
pricePrecision | INT | 价格精度，即小数点后的位数
amountPrecision | INT | 下单数量精度，即小数点后的位数
minOrderSize | STRING | 最小下单金额，单位是基础币种
operatorMakerFee | STRING | 运营商额外收取的maker手续费，0.001表示费率为0.1%
operatorTakerFee | STRING | 运营商额外收取的taker手续费，0.001表示费率为0.1%


```javascript
{
  "code": 0,
  "msg": "Success",
  "data": [
    {
      "symbol": "ETH-000_BTC-000",
      "tradingCurrency": "ETH-000",
      "quoteCurrency": "BTC-000",
      "tradingCurrencyId": "tti_687d8a93915393b219212c73",
      "quoteCurrencyId": "tti_b90c9baffffc9dae58d1f33f",
      "tradingCurrencyName": "Ethereum",
      "quoteCurrencyName": "Bitcoin",
      "operator": "vite_050697d3810c30816b005a03511c734c1159f50907662b046f",
      "operatorName": "Vite Labs",
      "operatorLogo": "https://token-profile-1257137467.cos.ap-hongkong.myqcloud.com/icon/e6dec7dfe46cb7f1c65342f511f0197c.png",
      "pricePrecision": 6,
      "amountPrecision": 4,
      "minOrderSize": "0.0001",
      "operatorMakerFee": "0",
      "operatorTakerFee": "0.001"
    },
    {
      //...
    }
  ]
}
```

### 获取一个交易对的详细信息
```
GET /api/v1/market
```
**参数:**

名称 | 类型 | 是否必须 | 描述
------------ | ------------ | ------------ | ------------
symbol | STRING | NO | 交易对名称，例如:"ETH-000_BTC-000"


**响应:**

名称 | 类型 | 描述
------------ | ------------ | ------------
symbol | STRING | 交易对名称
tradingCurrency | STRING | 交易币种简称
quoteCurrency | STRING | 基础币种（定价币种）简称
tradingCurrencyName | STRING | 交易币种全称
tradingCurrencyId | STRING | 交易币种Id
quoteCurrencyId | STRING | 基础币种Id
quoteCurrencyName | STRING | 基础币种（定价币种）全称
operator | STRING | 运营商id
operatorName | STRING | 运营商名称
operatorLogo | STRING | 运营商LOGO图片URL
pricePrecision | INT | 价格精度，即小数点后的位数
amountPrecision | INT | 下单数量精度，即小数点后的位数
minOrderSize | STRING | 最小下单金额，单位是基础币种
operatorMakerFee | STRING | 运营商额外收取的maker手续费，0.001表示费率为0.1%
operatorTakerFee | STRING | 运营商额外收取的taker手续费，0.001表示费率为0.1%
highPrice | STRING | 24小时最高价
lowPrice | STRING | 24小时最低价
lastPrice | STRING | 最新成交价
volume | STRING | 24小时交易量（交易币种）
quoteVolume | STRING | 24小时交易量（计价币种）
bidPrice | STRING | 买一价
askPrice | STRING | 卖一价
openBuyOrders | INT | 买单挂单数量
openSellOrders | INT | 卖单挂单数量

```javascript
{
  "code": 0,
  "msg": "Success",
  "data": {
    "symbol": "ETH-000_BTC-000",
    "tradingCurrency": "ETH-000",
    "quoteCurrency": "BTC-000",
    "tradingCurrencyId": "tti_687d8a93915393b219212c73",
    "quoteCurrencyId": "tti_b90c9baffffc9dae58d1f33f",
    "tradingCurrencyName": "Ethereum",
    "quoteCurrencyName": "Bitcoin",
    "operator": "vite_050697d3810c30816b005a03511c734c1159f50907662b046f",
    "operatorName": "Vite Labs",
    "operatorLogo": "https://token-profile-1257137467.cos.ap-hongkong.myqcloud.com/icon/e6dec7dfe46cb7f1c65342f511f0197c.png",
    "pricePrecision": 6,
    "amountPrecision": 4,
    "minOrderSize": "0.0001",
    "operatorMakerFee": "0",
    "operatorTakerFee": "0.001",
    "highPrice": "0.023511",
    "lowPrice": "0.022790",
    "lastPrice": "0.023171",
    "volume": "3798.4379",
    "quoteVolume": "46.5912",
    "bidPrice": "0.023171",
    "askPrice": "0.023511",
    "openBuyOrders": 25,
    "openSellOrders": 36
  }
}
```

## 公有接口

### 24h行情：

```
GET /api/v1/ticker/24hr
```

**参数:**

名称 | 类型 | 是否必须 | 描述
------------ | ------------ | ------------ | ------------
quoteCurrency | STRING | NO | 交易对中的基础币种，如空缺则返回全部基础货币对应的交易对
symbol | STRING | NO | 交易对名称，例如:"ETH-000_BTC-000"

**响应:**

名称 | 类型 | 描述
------------ | ------------ | ------------
symbol | STRING | 交易对名称
tradingCurrency | STRING | 交易币种简称
quoteCurrency | STRING | 基础币种（定价币种）简称
tradingCurrencyId | STRING | 交易币种Id
quoteCurrencyId | STRING | 基础币种Id
openPrice | STRING | 开盘价
prevPrice | STRING | 　前一个价格
lastPrice | STRING | 当前价
priceChange | STRING | 价格变化( lastPrice - openPrice)
priceChangePercent | STRING | 价格变化率((lastPrice - openPrice) / openPrice)
highPrice | STRING | 最高价
lowPrice | STRING | 最低价
volume | STRING | 24小时交易量（交易币种）
quoteVolume | STRING | 24小时交易量（基础币种）
pricePrecision | INT | 价格精度，即小数点后的位数
amountPrecision | INT | 下单数量精度，即小数点后的位数

```javascript
{
  "code": 0,
  "msg": "Success",
  "data": [
    {
      "symbol": "CSTT-47E_VITE",
      "tradingCurrency": "CSTT",
      "quoteCurrency": "VITE",
      "tradingCurrencyId": "tti_b6f7019878fdfb21908a1547",
      "quoteCurrencyId": "tti_5649544520544f4b454e6e40",
      "openPrice": "1.00000000",
      "prevPrice": "0.00000000",
      "lastPrice": "1.00000000",
      "priceChange": "0.00000000",
      "priceChangePercent": 0.0,
      "highPrice": "1.00000000",
      "lowPrice": "1.00000000",
      "volume": "45336.20000000",
      "quoteVolume": "45336.20000000",
      "pricePrecision": 8,
      "amountPrecision": 8
    }
  ]
}
```


### 最佳价格

```
GET /api/v1/ticker/bookTicker
```


**参数:**

名称 | 类型 | 是否必须 | 描述
------------ | ------------ | ------------ | ------------
symbol | STRING | YES | 交易对名称，例如:"ETH-000_BTC-000"

**响应:**

名称 | 类型 | 描述
------------ | ------------ | ------------
symbol | LONG | 交易对
bidPrice | STRING | 买一价
bidVolume | STRING | 交易币种交易量
askPrice | STRING | 卖一价
askVolume | STRING | 交易币种交易量

```javascript
{
  "code": 0,
  "msg": "Success",
  "data": {
      "symbol": "CSTT-47E_VITE",
      "bidPrice": "1.00000000",
      "bidVolume": "45336.20000000"
      "askPrice": "1.00000000",
      "askVolume": "45336.20000000"
    }
}
```

### 深度信息
```
GET /api/v1/depth
```

**参数:**

名称 | 类型 | 是否必须 | 描述
------------ | ------------ | ------------ | ------------
symbol | STRING | YES | 交易对名称，例如:"ETH-000_BTC-000"
limit | INT | NO | 返回数据数量，默认10，最大 100. 可选值:[5, 10, 20, 50, 100]
precision | INT | NO | 聚合精度，即小数点后的位数，例如:4。若空缺或给出的参数大于交易对精度，则按交易对精度聚合深度。


**响应:**

名称 | 类型 | 描述
------------ | ------------ | ------------
timestamp | LONG | 时间戳
asks | ARRAY | 卖单深度，按价格升序排列。格式:[价格, 数量]
bids | ARRAY | 买单深度，按价格降序排列。格式:[价格, 数量]

```javascript
{
  "code": 0,
  "msg": "Success",   
  "data": {
    "timestamp": 1565360340430,
    "asks": [
      ["0.023511", "0.1000"],
      ["0.024000", "2.0000"],
      ["0.025000", "14.0000"],
      ["0.026000", "20.0000"],
      ["0.027000", "100.0000"]      
    ],  
    "bids": [
      ["0.023171", "1.2300"],
      ["0.023000", "3.7588"],
      ["0.022000", "5.0000"],
      ["0.021000", "10.0000"],
      ["0.020000", "50.0000"]
    ]
  }
}
```

### 最近成交记录
```
GET /api/v1/trades
```
获取最近成交记录

**参数:**

名称 | 类型 | 是否必须 | 描述
------------ | ------------ | ------------ | ------------
symbol | STRING | YES | 交易对名称，例如:"ETH-000_BTC-000"
limit | INT | NO | 限制返回数据的数量，最大 500.

**响应:**

名称 | 类型 | 描述
------------ | ------------ | ------------
timestamp | LONG | 成交时间
price | STRING | 成交价
amount | STRING | 成交数量，以交易币种为单位
side | INT | 交易方向，买入为0，卖出为1

```javascript
{
  "code": 0,
  "msg": "Success",   
  "data": [
    {
      "timestamp": 1565360340430,
      "price": "0.023171",
      "amount": "0.0123",
      "side": 0
    }, {
        // ...
    }
  ]
}
```

### K线

```
GET /api/v1/klines
```
获取Kline

**参数:**

名称 | 类型 | 是否必须 | 描述
------------ | ------------ | ------------ | ------------
symbol | STRING | YES | 交易对名称，例如:"ETH-000_BTC-000"
limit | INT | NO | 限制返回数据的数量，最大 500.
interval|STRING|YES|指标维度， 可选: [`minute`、`hour`、`day`、`minute30`、`hour6`、`hour12`、`week`]
startTime|LONG|NO|开始时间
endTime|LONG|NO|结束时间

**响应:**

名称 | 类型 | 描述
------------ | ------------ | ------------
t | LONG | 时间
c | STRING | 收盘价(closePrice)
p | STRING | 开盘价(openPrice)
h | STRING | 最高价(highPrice)
l | STRING | 最低价(lowPrice)
v | STRING | 交易币种交易量(volume)

```javascript
{
  "code": 0,
  "msg": "Success",
  "data": {
    "t": [ 1554207060 ],
    "c": [ 1.0 ],
    "p": [ 1.0 ],
    "h": [ 1.0 ],
    "l": [ 1.0 ],
    "v": [ 12970.8 ]
  }
}
```


## 私有接口
### 下单测试(验证签名)
```
POST /api/v1/order/test  (HMAC SHA256)
```

**配额消耗:**
0 UT

**参数:**

名称 | 类型 | 是否必须 | 描述
------------ | ------------ | ------------ | ------------
symbol | STRING | YES | 交易对名称，例如:"ETH-000_BTC-000"
amount | STRING | YES | 下单数量，以交易币种为单位
price | STRING | YES | 下单价格
side | INT | YES | 订单方向，买入为0，卖出为1
timestamp | LONG | YES | 客户端时间戳
key | STRING | YES | API Key
signature | STRING | YES | 签名

**响应:**

```javascript
{
  "code": 0,
  "msg": "Success",   
  "data": null
}
```


### 下单
```
POST /api/v1/order  (HMAC SHA256)
```

**配额消耗:**
1 UT

**参数:**

名称 | 类型 | 是否必须 | 描述
------------ | ------------ | ------------ | ------------
symbol | STRING | YES | 交易对名称，例如:"ETH-000_BTC-000"
amount | STRING | YES | 下单数量，以交易币种为单位
price | STRING | YES | 下单价格
side | INT | YES | 订单方向，买入为0，卖出为1
timestamp | LONG | YES | 客户端时间戳
key | STRING | YES | API Key
signature | STRING | YES | 签名

**响应:**

```javascript
{
  "code": 0,
  "msg": "Success",   
  "data": {
    "symbol": "ETH-000_BTC-000",
    "orderId": "f848eb32ea44d810b0f35c6c44ccb6795f7d31503b15bdd8171be2809bee4a25"
  }
}
```

### 查询订单
```
GET /api/v1/order (HMAC SHA256)
```
查询一个订单的详细信息

**配额消耗:**
0 UT

**参数:**

名称 | 类型 | 是否必须 | 描述
------------ | ------------ | ------------ | ------------
symbol | STRING | YES | 交易对名称，例如:"ETH-000_BTC-000"
orderId | STRING | YES | 订单ID
timestamp | LONG | YES | 客户端时间戳
key | STRING | YES | API Key
signature | STRING | YES | 签名


**响应:**

名称 | 类型 | 描述
------------ | ------------ | ------------
symbol | STRING | 交易对名称
orderId | STRING | 订单ID
status | INT | 订单状态代码，含义参考 [订单状态定义](#订单状态)
side | INT | 订单方向，买入为0，卖出为1
price | STRING | 下单价格，单位为基础币种
amount | STRING | 订单数量，单位为交易币种
filledAmount | STRING | 已成交数量，单位为交易币种
filledValue | STRING | 已成交金额，单位为基础币种
fee | STRING | 手续费，单位为基础币种
created | LONG | 订单创建时间
updated | LONG | 订单最后更新时间
timeInForce | INT | 订单[Time In Force](#time-in-force)
type | INT | 订单类型，[订单类型定义](#订单类型)


```javascript
{
  "code": 0,
  "msg": "Success",   
  "data": {
    "symbol": "ETH-000_BTC-000",
    "orderId": "f848eb32ea44d810b0f35c6c44ccb6795f7d31503b15bdd8171be2809bee4a25",
    "status": 3,
    "side": 0,
    "price": "0.020000",
    "amount": "1.1100",
    "filledAmount": "0.1000",
    "filledValue": "0.002000",
    "fee": "0.000002",
    "created": 1565360340430,
    "updated": 1565360340430,
    "timeInForce": 0,
    "type": 0
  }
}
```

### 撤销订单
```
DELETE /api/v1/order  (HMAC SHA256)
```

撤销一个订单。由于ViteX的订单操作是异步执行的，该接口只是向系统发送撤单请求，不能保证订单撤销成功。

**配额消耗:**
1 UT

**参数:**

名称 | 类型 | 是否必须 | 描述
------------ | ------------ | ------------ | ------------
symbol | STRING | YES | 交易对名称，例如:"ETH-000_BTC-000"
orderId | STRING | YES | 订单ID
timestamp | LONG | YES | 客户端时间戳
key | STRING | YES | API Key
signature | STRING | YES | 签名

**响应:**
```javascript
{
  "code": 0,
  "msg", "Success",   
  "data": {
    "symbol": "ETH-000_BTC-000",
    "orderId": "f848eb32ea44d810b0f35c6c44ccb6795f7d31503b15bdd8171be2809bee4a25",
    "cancelRequest": "fd7d9ecd2471dbc458ac5d42024e69d6d0a033b9935a3c0524e718adb30b27db"
  }
}
```

### 撤销一个交易对下的全部挂单
```
DELETE /api/v1/orders  (HMAC SHA256)
```

撤销一个交易对下的全部挂单。由于ViteX的订单操作是异步执行的，该接口只是向系统发送撤单请求，不能保证订单撤销成功。

**配额消耗:**
N UT(N与订单数量有关)

**参数:**

名称 | 类型 | 是否必须 | 描述
------------ | ------------ | ------------ | ------------
symbol | STRING | YES | 交易对名称，例如:"ETH-000_BTC-000"
timestamp | LONG | YES | 客户端时间戳
key | STRING | YES | API Key
signature | STRING | YES | 签名

**响应:**
```javascript
{
  "code": 0,
  "msg", "Success",   
  "data": [
    {
      "symbol": "ETH-000_BTC-000",
      "orderId": "f848eb32ea44d810b0f35c6c44ccb6795f7d31503b15bdd8171be2809bee4a25",
      "cancelRequest": "fd7d9ecd2471dbc458ac5d42024e69d6d0a033b9935a3c0524e718adb30b27db"
    }
  ]
}
```

### 查询历史订单
```
GET /api/v1/orders (HMAC SHA256)
```
查询历史订单信息

**配额消耗:**
0 UT

**参数:**

名称 | 类型 | 是否必须 | 描述
------------ | ------------ | ------------ | ------------
symbol | STRING | YES | 交易对名称，例如:"ETH-000_BTC-000"
startTime |LONG | NO | 
endTime |LONG | NO | 
side | INT | NO | 订单方向，买入为0，卖出为1
status | INT | NO | 订单状态代码，含义参考 [订单状态定义](#订单状态)
limit | INT | NO | 限制返回数据的数量，最大 500.
timestamp | LONG | YES | 客户端时间戳
key | STRING | YES | API Key
signature | STRING | YES | 签名


**响应:**

名称 | 类型 | 描述
------------ | ------------ | ------------
symbol | STRING | 交易对名称
orderId | STRING | 订单ID
status | INT | 订单状态代码，含义参考 [订单状态定义](#订单状态)
side | INT | 订单方向，买入为0，卖出为1
price | STRING | 下单价格，单位为基础币种
amount | STRING | 订单数量，单位为交易币种
filledAmount | STRING | 已成交数量，单位为交易币种
filledValue | STRING | 已成交金额，单位为基础币种
fee | STRING | 手续费，单位为基础币种
created | LONG | 订单创建时间
updated | LONG | 订单最后更新时间
timeInForce | INT | 订单[Time In Force](#Time-In_Force)
type | INT | 订单类型，[订单类型定义](#订单类型)


```javascript
{
  "code": 0,
  "msg": "Success",
  "data": [
    {
      "symbol": "ETH-000_BTC-000",
      "orderId": "f848eb32ea44d810b0f35c6c44ccb6795f7d31503b15bdd8171be2809bee4a25",
      "status": 3,
      "side": 0,
      "price": "0.020000",
      "amount": "1.1100",
      "filledAmount": "0.1000",
      "filledValue": "0.002000",
      "fee": "0.000002",
      "created": 1565360340430,
      "updated": 1565360340430,
      "timeInForce": 0,
      "type": 0
    }
  ]
}
```

### 查询交易所账户余额
```
GET /api/v1/account (HMAC SHA256)
```
查询用户委托地址对应的交易所账户余额

**配额消耗:**
0 UT

**参数:**

名称 | 类型 | 是否必须 | 描述
------------ | ------------ | ------------ | ------------
timestamp | LONG | YES | 客户端时间戳
key | STRING | YES | API Key
signature | STRING | YES | 签名


**响应:**

名称 | 类型 | 描述
------------ | ------------ | ------------
available | STRING | 交易所可用余额
locked | STRING | 交易所锁定余额(下单锁定)


```javascript
{
    "code": 0,
    "msg": "Success",
    "data": {
        "VX": {
            "available": "0.00000000",
            "locked": "0.00000000"
        },
        "VCP": {
            "available": "373437.00000000",
            "locked": "0.00000000"
        },
        "BTC-000": {
            "available": "0.02597393",
            "locked": "0.13721639"
        },
        "USDT-000": {
            "available": "162.58284100",
            "locked": "170.40459600"
        },
        "GRIN-000": {
            "available": "0.00000000",
            "locked": "0.00000000"
        },
        "VITE": {
            "available": "30047.62090072",
            "locked": "691284.75633290"
        },
        "ETH-000": {
            "available": "1.79366977",
            "locked": "7.93630000"
        },
        "ITDC-000": {
            "available": "0.00000000",
            "locked": "7186.00370000"
        }
    }
}
```
