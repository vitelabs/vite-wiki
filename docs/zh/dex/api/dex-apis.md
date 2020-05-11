---
demoUrl: "https://api.vitex.net/test"
---

# ViteX API

:::tip 更新日志
2020-04-30
- API接口版本升级到v2，原有v1版本接口将保留到2020-05-15，请现有API用户尽快升级；
- 返回字段 msg 值由`Success` 改为 `ok`；
- 查询订单接口变更为公开接口，不再需要授权，根据用户地址即可查询，详情见`/api/v2/order`和`/api/v2/orders`；
- 查询用户余额接口变更为公开接口，不再需要授权。由`/api/v1/account` 改为 `/api/v2/balance`；
- `/markets`、`/ticker/24hr`、`/ticker/bookTicker` 接口发生变动。
:::

## 概述
ViteX API允许用户在不暴露私钥的情况下，完成在ViteX去中心化交易所的相关操作。
ViteX API分为交易和行情两类。交易API（也称私有API）需要身份验证和授权，为用户提供下单、撤单等功能。行情API（也称公开API）提供市场的行情数据，信息查询等。行情API无需授权即可访问。 

## 环境地址
* 【MainNet】: `https://api.vitex.net/`
* 【TestNet】`https://api.vitex.net/test`

## 接口规范
API接口的响应均为JSON格式，时间戳为UNIX时间。

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
```json
{
  "code": 1,
  "msg": "Invalid symbol",
  "data": {}
}
```

code状态码：
* `0` 调用成功 
* `1` 一般错误：可在msg字段中查看具体错误信息
* `1001` 访问限制：错误码表示超出API访问频次配额限制。
* `1002` 参数错误：timestamp异常、订单价格格式错误、订单交易数量异常、订单交易金额过小、订单指定交易市场不存在、不存在的委托授权、symbol不存在
* `1003` 网络环境：VITE全网拥堵、交易发送频繁，请您稍后再次尝试、代理地址配额不足
* `1004` 其他错误：撤销订单不属于当前地址、该订单状态不可以撤销、查询订单信息异常、
* `1005` 服务端异常：服务端server异常

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

### Time In Force

代码 | 含义 | 描述
------------ | ------------ | ------------
0 | GTC - Good Till Cancel | 订单保持到成交或被取消
1 | IOC - Immediate or Cancel | 无法立即成交的部分就撤销 (暂不支持)
2 | FOK - Fill or Kill | 要么全部成交，要么撤销 (暂不支持)

## 私有API授权

在使用ViteX私有API前，用户必须在交易所"[委托代理](https://x.vite.net/tradeTrust)"页面授权，委托ViteX API服务代替用户发起交易。授权对象是API服务生成的代理地址（Delegation Address），用户无需提供私钥。

* 当您需要第三方做市商来操作您的账户完成交易时，可以不将自己的私钥提供给做市商，而只提供API Key和API Secret。对方只能在您授权的交易对下进行下单和撤单操作，无法转移您的资产；
* 您可以针对每个交易对单独授权，交易所合约会阻止API操作未经授权的交易对；
* 您可以随时取消对API的授权。授权取消后，即使仍持有有效的API Key和API Secret，ViteX交易所合约也不再接受来自API的订单请求。

我们建议您仅授权必要的交易对。另外请注意，在任何情况下，您都不需要将自己的私钥和助记词提供给任何人。

:::tip 代理地址及配额
通过API完成的下单、撤单等操作，是由API生成的代理地址的私钥进行签名的，产生的链上交易位于代理地址的账户链，而不在用户自己的账户地址下。

每个用户会分配有一个单独的代理地址。您需要为该地址抵押VITE代币来提供配额。 
:::

### 访问控制
API访问计数以60秒为一个固定周期，周期内套餐额度用完，则剩余时间内调用接口会失败。此外，剩余额度不会累积，上一个周期未使用的额度不会顺延到下一个周期。

### API鉴权
私有API需要通过签名来进行权限认证。

鉴权需要 API Key 和 API Secret，您可自行在交易所["API"](https://x.vite.net/tradeOpenapi)页面申请。请注意，API Key 和 API Secret 是大小写敏感的。

调用私有API时，除了接口本身要求的参数外，还需要传递`key`、`timestamp`和`signature`三个参数。

* key：即`API Key`字段。
* timestamp：为UNIX时间戳，单位为毫秒，如：1565360340430。为防止重放攻击，服务端会校验时间戳的合法性，若请求时间戳对服务端时间小于**5000 ms**或大于**1000 ms**，均认为该请求无效。
* signature：该字段通过 HMAC SHA256 签名算法生成。取`API Secret`作为 HMAC SHA256 密钥，把其他所有参数作为操作对象，得到的输出即为签名。签名大小写不敏感。

`timestamp`校验逻辑如下:

```java
    if (timestamp < (serverTime + 1000) && (serverTime - timestamp) <= 5000) {
      // process request
    } else {
      // reject request
    }
```

### 接口签名
* 按照参数名称的字典顺序对请求的所有参数 (接口定义的参数和 API Key) 排序；
* 参数名称和值用ASCII等号(=)连接；再把连接得到的字符串按参数名字的字典顺序依次使用"&"符号连接，得到规范化的请求字符串；
* 签名使用 HMAC SHA256 算法。将 API Key 所对应的 API Secret 作为 HMAC SHA256 签名算法的密钥，规范化的请求字符串作为操作对象，得到的输出即为签名。签名大小写不敏感。
* 将签名作为请求参数的一部分附加在请求字符串之后。
* 当接口同时使用请求字符串和请求body时，签名操作对象要求把请求字符串放在请求body之前

### 接口签名示例

下面是调用下单接口`/api/v2/order`的示例，假设API Key和API Secret为：

API Key | API Secret
------------ | ------------
6344A08BB85F5EF6E5F9762CB9F6E767 | 0009431FFA3F9954F3F3CB0A68ABCD99

若想在ETH-000/BTC-000的交易对下一个买单，以0.09的价格，买入10 ETH，参数如下：

参数 | 取值
------------ | ------------
symbol | ETH-000_BTC-000
side | 0
amount | 10
price | 0.09
timestamp | 1567067137937

在这个例子中，
* **请求字符串：** amount=10&key=6344A08BB85F5EF6E5F9762CB9F6E767&price=0.09&side=0&symbol=ETH-000_BTC-000&timestamp=1567755178560
* **签名(参数已排序)：**

```bash
$ echo -n "amount=10&key=6344A08BB85F5EF6E5F9762CB9F6E767&price=0.09&side=0&symbol=ETH-000_BTC-000&timestamp=1567755178560" | openssl dgst -sha256 -hmac "0009431FFA3F9954F3F3CB0A68ABCD99"
(stdin)= 7df4a9731ff6a75ed4037c2e48788fa3b0f478ec835022b17e44ff1cd9486d47
```

* **调用API：**

```bash
$ curl -X POST -d "amount=10&key=6344A08BB85F5EF6E5F9762CB9F6E767&price=0.09&side=0&symbol=ETH-000_BTC-000&timestamp=1567755178560&signature=7df4a9731ff6a75ed4037c2e48788fa3b0f478ec835022b17e44ff1cd9486d47" https://api.vitex.net/test/api/v2/order
```

## 私有 REST API

### 下单测试
测试订单请求，但不会提交到交易所合约。该接口一般用来验证签名是否正确
```
POST /api/v2/order/test
```

**配额消耗:**
0 UT

**参数:**

名称 | 类型 | 是否必须 | 描述
------------ | ------------ | ------------ | ------------
symbol | STRING | YES | 交易对名称，例如:`ETH-000_BTC-000`
amount | STRING | YES | 下单数量，以交易币种为单位
price | STRING | YES | 下单价格
side | INT | YES | 订单方向，买入为`0`，卖出为`1`
timestamp | LONG | YES | 客户端时间戳（毫秒）
key | STRING | YES | API Key
signature | STRING | YES | 签名

**响应:**

```json
{
  "code": 0,
  "msg": "ok",   
  "data": null
}
```

### 下单
```
POST /api/v2/order
```

**配额消耗:**
1 UT

**参数:**

名称 | 类型 | 是否必须 | 描述
------------ | ------------ | ------------ | ------------
symbol | STRING | YES | 交易对名称，例如:`ETH-000_BTC-000`
amount | STRING | YES | 下单数量，以交易币种为单位
price | STRING | YES | 下单价格
side | INT | YES | 订单方向，买入为`0`，卖出为`1`
timestamp | LONG | YES | 客户端时间戳（毫秒）
key | STRING | YES | API Key
signature | STRING | YES | 签名

**响应:**

```json
{
  "code": 0,
  "msg": "ok",
  "data": {
    "symbol": "VX_ETH-000",
    "orderId": "c35dd9868ea761b22fc76ba35cf8357db212736ecb56399523126c515113f19d",
    "status": 1
  }
}
```

### 撤销订单
```
DELETE /api/v2/order
```

**配额消耗:**
1 UT

**参数:**

名称 | 类型 | 是否必须 | 描述
------------ | ------------ | ------------ | ------------
symbol | STRING | YES | 交易对名称，例如:`ETH-000_BTC-000`
orderId | STRING | YES | 订单ID
timestamp | LONG | YES | 客户端时间戳（毫秒）
key | STRING | YES | API Key
signature | STRING | YES | 签名

**响应:**
```json
{
  "code": 0,
  "msg": "ok",
  "data": {
    "symbol": "VX_ETH-000",
    "orderId": "c35dd9868ea761b22fc76ba35cf8357db212736ecb56399523126c515113f19d",
    "cancelRequest": "2d015156738071709b11e8d6fa5a700c2fd30b28d53aa6160fd2ac2e573c7595",
    "status": 6
  }
}
```

### 撤销全部订单
```
DELETE /api/v2/orders
```

**配额消耗:**
N UT (N=订单数量)

**参数:**

名称 | 类型 | 是否必须 | 描述
------------ | ------------ | ------------ | ------------
symbol | STRING | YES | 交易对名称，例如:`ETH-000_BTC-000`
timestamp | LONG | YES | 客户端时间戳（毫秒）
key | STRING | YES | API Key
signature | STRING | YES | 签名

**响应:**
```json
{
  "code": 0,
  "msg": "ok",
  "data": [
    {
      "symbol": "VX_ETH-000",
      "orderId": "de185edae25a60dff421c1be23ac298b121cb8bebeff2ecb25807ce7d72cf622",
      "cancelRequest": "355b6fab007d86e7ff09b0793fbb205e82d3880b64d948ed46f88237115349ab",
      "status": 6
    },
    {
      "symbol": "VX_ETH-000",
      "orderId": "7e079d4664791207e082c0fbeee7b254f2a31e87e1cff9ba18c5faaeee3d400a",
      "cancelRequest": "55b80fe42c41fa91f675c04a8423afa85857cd30c0f8878d52773f7096bfac3b",
      "status": 6
    }
  ]
}
```

## 公有 REST API
### 获取各个市场最小下单金额
```  
GET /api/v2/limit 
```

* **响应：**

  :::demo
  ```json tab:Response
  {
    "code": 0,
    "msg": "ok",
    "data": {
        "minAmount": {
            "BTC-000": "0.0001",
            "USDT-000": "1",
            "ETH-000": "0.01"
        },
        "depthStepsLimit": {}
    }
  }
  ```
  ```json test: "Test" url: /api/v2/limit method: GET
  {}
  ```
  :::

### 获取所有代币列表
```  
GET /api/v2/tokens
```

* **参数：**

名称 | 类型 | 是否必须 | 描述
------------ | ------------ | ------------ | ------------
category | STRING | NO | 币种种类，取值[`quote`,`all`]，默认值`all`
tokenSymbolLike | STRING | NO | 币种简称，如`VITE`
offset | INTEGER | NO | 起始查询索引，从`0`开始，默认`0`
limit | INTEGER | NO | 查询数量，默认`500`，最大`500`

* **响应：**

  :::demo
  
  ```json tab:Response
  {
    "code": 0,
    "msg": "ok",
    "data": [
      {
        "tokenId": "tti_322862b3f8edae3b02b110b1",
        "name": "BTC Token",
        "symbol": "BTC-000",
        "originalSymbol": "BTC",
        "totalSupply": "2100000000000000",
        "owner": "vite_ab24ef68b84e642c0ddca06beec81c9acb1977bbd7da27a87a",
        "tokenDecimals": 8,
        "urlIcon": null
      }
    ]
  }
  ```
  
  ```json test:Test url: /api/v2/tokens?tokenSymbolLike=ETH method: GET
  {}
  ```
  :::

### 获取代币详情
```  
GET /api/v2/token/detail
```

* **参数：**

名称 | 类型 | 是否必须 | 描述
------------ | ------------ | ------------ | ------------
tokenSymbol | STRING | NO | 币种简称，如`VITE`
tokenId | STRING | NO | 币种id，如`tti_5649544520544f4b454e6e40`

* **响应：**

  :::demo
  
  ```json tab:Response
  {
    "code": 0,
    "msg": "ok",
    "data": {
      "tokenId": "tti_322862b3f8edae3b02b110b1",
      "name": "BTC Token",
      "symbol": "BTC-000",
      "originalSymbol": "BTC",
      "totalSupply": "2100000000000000",
      "publisher": "vite_ab24ef68b84e642c0ddca06beec81c9acb1977bbd7da27a87a",
      "tokenDecimals": 8,
      "tokenAccuracy": "0.00000001",
      "publisherDate": null,
      "reissue": 2,
      "urlIcon": null,
      "gateway": null,
      "website": null,
      "links": null,
      "overview": null
    }
  }
  ```
  
  ```json test:Test url: /api/v2/token/detail?tokenId=tti_5649544520544f4b454e6e40 method: GET
  {}
  ```
  :::
  
### 获取已开通交易对的代币列表

```  
GET /api/v2/token/mapped
```

* **参数：**

名称 | 类型 | 是否必须 | 描述
------------ | ------------ | ------------ | ------------
quoteTokenSymbol | STRING | YES | 基础币种（定价币种）简称，如`VITE`

* **响应：**

  :::demo
  
  ```json tab:Response
  {
    "code": 0,
    "msg": "ok",
    "data": [
      {
        "tokenId": "tti_c2695839043cf966f370ac84",
        "symbol": "VCP"
      }
    ]
  }
  ```
  
  ```json test:Test url: /api/v2/token/mapped?quoteTokenSymbol=VITE method: GET
  {}
  ```
  :::
  
### 获取未开通交易对的代币列表

```  
GET /api/v2/token/unmapped
```

* **参数：**

名称 | 类型 | 是否必须 | 描述
------------ | ------------ | ------------ | ------------
quoteTokenSymbol | STRING | YES | 基础币种（定价币种）简称，如`VITE`

* **响应：**

  :::demo
  
  ```json tab:Response
  {
    "code": 0,
    "msg": "ok",
    "data": [
      {
        "tokenId": "tti_2736f320d7ed1c2871af1d9d",
        "symbol": "VTT"
      }
    ]
  }
  ```
  
  ```json test:Test url: /api/v2/token/unmapped?quoteTokenSymbol=VITE method: GET
  {}
  ```
  :::

### 获取某个交易对详情
```  
GET /api/v2/market
```

* **参数：**

名称 | 类型 | 是否必须 | 描述
------------ | ------------ | ------------ | ------------
symbol | STRING | YES | 交易对名称，如`GRIN-000_BTC-000`

* **响应：**

  :::demo
  
  ```json tab:Response
  {
     "code": 0,
        "msg": "ok",
        "data": {
            "symbol": "GRIN-000_BTC-000",
            "tradingCurrency": "GRIN-000",
            "quoteCurrency": "BTC-000",
            "tradingCurrencyId": "tti_289ee0569c7d3d75eac1b100",
            "quoteCurrencyId": "tti_b90c9baffffc9dae58d1f33f",
            "tradingCurrencyName": "Grin",
            "quoteCurrencyName": "Bitcoin",
            "operator": "vite_4c2c19f563187163145ab8f53f5bd36864756996e47a767ebe",
            "operatorName": "Vite Labs",
            "operatorLogo": "https://token-profile-1257137467.cos.ap-hongkong.myqcloud.com/icon/f62f3868f3cbb74e5ece8d5a4723abef.png",
            "pricePrecision": 8,
            "amountPrecision": 2,
            "minOrderSize": "0.0001",
            "operatorMakerFee": 5.0E-4,
            "operatorTakerFee": 5.0E-4,
            "highPrice": "0.00007000",
            "lowPrice": "0.00006510",
            "lastPrice": "0.00006682",
            "volume": "1476.37000000",
            "baseVolume": "0.09863671",
            "bidPrice": "0.00006500",
            "askPrice": "0.00006999",
            "openBuyOrders": 27,
            "openSellOrders": 42
        }
  }
  ```
  
  ```json test:Test url: /api/v2/market?symbol=GRIN-000_BTC-000 method: GET
  {}
  ```
  :::
  
### 获取所有市场交易对
```  
GET /api/v2/markets
```

* **参数：**

名称 | 类型 | 是否必须 | 描述
------------ | ------------ | ------------ | ------------
offset | INTEGER | NO | 起始查询索引，从`0`开始，默认`0`
limit | INTEGER | NO | 查询数量，默认`500`，最大`500`

* **响应：**

  :::demo
  
  ```json tab:Response
  {
    "code": 0,
    "msg": "ok",
    "data": [
      {
        "symbol": "BTC-000_USDT",
        "tradeTokenSymbol": "BTC-000",
        "quoteTokenSymbol": "USDT-000",
        "tradeToken": "tti_322862b3f8edae3b02b110b1",
        "quoteToken": "tti_973afc9ffd18c4679de42e93",
        "pricePrecision": 8,
        "quantityPrecision": 8
      }
    ]
  }
  ```
  
  ```json test:Test url: /api/v2/markets method: GET
  {}
  ```
  :::

### 获取订单信息
```  
GET /api/v2/order
```

* **参数：**

名称 | 类型 | 是否必须 | 描述
------------ | ------------ | ------------ | ------------
address | STRING | YES | 用户账户地址（非代理地址）
orderId | STRING | YES | 订单id

* **响应：**

  :::demo
  
  ```json tab:Response
  {
    "code": 0,
    "msg": "ok",
    "data": {
      "address": "vite_228f578d58842437fb52104b25750aa84a6f8558b6d9e970b1",
      "orderId": "0dfbafac33fbccf5c65d44d5d80ca0b73bc82ae0bbbe8a4d0ce536d340738e93",
      "symbol": "VX_ETH-000",
      "tradeTokenSymbol": "VX",
      "quoteTokenSymbol": "ETH-000",
      "tradeToken": "tti_564954455820434f494e69b5",
      "quoteToken": "tti_06822f8d096ecdf9356b666c",
      "side": 1,
      "price": "0.000228",
      "quantity": "100.0001",
      "amount": "0.02280002",
      "executedQuantity": "100.0000",
      "executedAmount": "0.022800",
      "executedPercent": "0.999999",
      "executedAvgPrice": "0.000228",
      "fee": "0.000045",
      "status": 5,
      "type": 0,
      "createTime": 1586941713
    }
  }
  ```
  
  ```json test:Test url: /api/v2/order?address=vite_ff38174de69ddc63b2e05402e5c67c356d7d17e819a0ffadee method: GET
  {}
  ```
  :::  

### 获取挂单信息
```
GET /api/v2/orders/open
```

获取当前未成交与部分成交状态的订单信息

* **参数：**

名称 | 类型 | 是否必须 | 描述
------------ | ------------ | ------------ | ------------
address | STRING | YES | 用户账户地址（非代理地址）
symbol | STRING | NO | 交易对名称，如`GRIN-000_BTC-000`
quoteTokenSymbol | STRING | NO | 基础币种（定价币种）简称，如`BTC-000`
tradeTokenSymbol | STRING | NO | 交易币种简称，如`GRIN-000`
offset | INTEGER | NO | 起始查询索引，从`0`开始，默认`0`
limit | INTEGER | NO | 查询数量，默认`30`，最大`100`
total | INTEGER | NO | 是否在结果中包含查询总数，`0`不包含，`1`包含，默认不返回，此时显示`total=-1`

* **响应：**

  :::demo
  ```json tab:Response
  {
    "code": 0,
    "msg": "ok",
    "data": {
      "order": [
        {
          "address": "vite_ff38174de69ddc63b2e05402e5c67c356d7d17e819a0ffadee",
          "orderId": "5379b281583bb17c61bcfb1e523b95a6c153150e03ce9db35f37d652bbb1b321",
          "symbol": "BTC-000_USDT-000",
          "tradeTokenSymbol": "BTC-000",
          "quoteTokenSymbol": "USDT-000",
          "tradeToken": "tti_322862b3f8edae3b02b110b1",
          "quoteToken": "tti_973afc9ffd18c4679de42e93",
          "side": 0,
          "price": "1.2000",
          "quantity": "1.0000",
          "amount": "1.20000000",
          "executedQuantity": "0.0000",
          "executedAmount": "0.0000",
          "executedPercent": "0.0000",
          "executedAvgPrice": "0.0000",
          "confirmations": null,
          "fee": "0.0000",
          "status": 3,
          "type": 0,
          "createTime": 1587906622
        }
      ]
    }
  }
  ```
  ```json test: "Test" url: /api/v2/orders/open?address=vite_ff38174de69ddc63b2e05402e5c67c356d7d17e819a0ffadee method: GET
  {}
  ```
  :::

### 获取订单列表
```  
GET /api/v2/orders
```

* **参数：**

名称 | 类型 | 是否必须 | 描述
------------ | ------------ | ------------ | ------------
address | STRING | YES | 用户账户地址（非代理地址）
symbol | STRING | NO | 交易对名称，如`GRIN-000_VITE`
quoteTokenSymbol | STRING | NO | 基础币种（定价币种）简称，如`VITE`
tradeTokenSymbol | STRING | NO | 交易币种简称，如`GRIN-000`
startTime | LONG | NO | 查询起始时间（秒）
endTime | LONG | NO | 查询截止时间（秒）
side | INTEGER | NO | 订单方向，买入为`0`，卖出为`1`
status | INTEGER | NO | 订单状态，取值`0-10`，其中`3`和`5`返回所有未完全成交订单，`7`和`8`返回所有已撤销订单
offset | INTEGER | NO | 起始查询索引，从`0`开始，默认`0`
limit | INTEGER | NO | 查询数量，默认`30`，最大`100`
total | INTEGER | NO | 是否在结果中包含查询总数，`0`不包含，`1`包含，默认不返回，此时显示`total=-1`

* **响应：**

  :::demo
  
  ```json tab:Response
  {
    "code": 0,
    "msg": "ok",
    "data": {
      "order": [
        {
          "address": "vite_ff38174de69ddc63b2e05402e5c67c356d7d17e819a0ffadee",
          "orderId": "0dfbafac33fbccf5c65d44d5d80ca0b73bc82ae0bbbe8a4d0ce536d340738e93",
          "symbol": "VX_ETH-000",
          "tradeTokenSymbol": "VX",
          "quoteTokenSymbol": "ETH-000",
          "tradeToken": "tti_564954455820434f494e69b5",
          "quoteToken": "tti_06822f8d096ecdf9356b666c",
          "side": 1,
          "price": "0.000228",
          "quantity": "100.0001",
          "amount": "0.02280002",
          "executedQuantity": "100.0000",
          "executedAmount": "0.022800",
          "executedPercent": "0.999999",
          "executedAvgPrice": "0.000228",
          "fee": "0.000045",
          "status": 5,
          "type": 0,
          "createTime": 1586941713
        }
      ],
      "total": -1
    }
  }
  ```
  
  ```json test:Test url: /api/v2/orders?address=vite_ff38174de69ddc63b2e05402e5c67c356d7d17e819a0ffadee method: GET
  {}
  ```
  :::

### 获取24小时行情
```  
GET /api/v2/ticker/24hr
```

* **参数：**

名称 | 类型 | 是否必须 | 描述
------------ | ------------ | ------------ | ------------
symbols | STRING | NO | 交易对名称列表，用","分隔
quoteTokenSymbol | STRING | NO | 基础币种（定价币种）简称，如`USDT-000`，如空缺则返回全部交易对

* **响应：**

  :::demo
  
  ```json tab:Response
  {
    "code": 0,
    "msg": "ok",
    "data": [
      {
        "symbol":"BTC-000_USDT-000",
        "tradeTokenSymbol":"BTC-000",
        "quoteTokenSymbol":"USDT-000",
        "tradeToken":"tti_b90c9baffffc9dae58d1f33f",
        "quoteToken":"tti_80f3751485e4e83456059473",
        "openPrice":"7540.0000",
        "prevClosePrice":"7717.0710",
        "closePrice":"7683.8816",
        "priceChange":"143.8816",
        "priceChangePercent":0.01908244,
        "highPrice":"7775.0000",
        "lowPrice":"7499.5344",
        "quantity":"13.8095",
        "amount":"104909.3499",
        "pricePrecision":4,
        "quantityPrecision":4,
        "openTime":null,
        "closeTime":null
      }
    ]
  }
  ```
  
  ```json test:Test url: /api/v2/ticker/24hr?quoteTokenSymbol=VITE method: GET
  {}
  ```
  :::

### 获取当前最优挂单
```  
GET /api/v2/ticker/bookTicker
```

* **参数：**

名称 | 类型 | 是否必须 | 描述
------------ | ------------ | ------------ | ------------
symbol | STRING | YES | 交易对名称，如`GRIN-000_VITE`

* **响应：**

  :::demo
  
  ```json tab:Response
  {
    "code": 0,
    "msg": "ok",
    "data": {
      "symbol": "BTC-000_USDT-000",
      "bidPrice": "7600.0000",
      "bidQuantity": "0.7039",
      "askPrice": "7725.0000",
      "askQuantity": "0.0001",
      "height": null
    }
  }
  ```
  
  ```json test:Test url: /api/v2/ticker/bookTicker?symbol=BTC-000_VITE-000 method: GET
  {}
  ```
  :::
  
  
### 获取精简数据成交记录
```
GET /api/v2/trades
```
* **参数：**

名称 | 类型 | 是否必须 | 描述
------------ | ------------ | ------------ | ------------
symbol | STRING | YES | 交易对名称，如`GRIN-000_VITE`
limit | INTEGER | NO | 数量，默认500

* **响应：**

  :::demo
  
  ```json tab:Response
  {
      "code": 0,
      "msg": "ok",
      "data": [
        {
            "timestamp": 1588214534000,
            "price": "0.024933",
            "amount": "0.0180",
            "side": 0
        },
        {
            "timestamp": 1588214364000,
            "price": "0.024535",
            "amount": "0.0127",
            "side": 0
        }
      ]
    }
  ```
  
  ```json test:Test url: /api/v2/trades/part?symbol=BTC-000_USDT-000 method: GET
  {}
  ```
  :::


### 获取完整数据成交记录
```  
GET /api/v2/trades/all
```

* **参数：**

名称 | 类型 | 是否必须 | 描述
------------ | ------------ | ------------ | ------------
symbol | STRING | YES | 交易对名称，如`GRIN-000_VITE`
orderId | STRING | NO | 订单id
startTime | LONG | NO | 查询起始时间（秒）
endTime | LONG | NO | 查询截止时间（秒）
side | INTEGER | NO | 订单方向，买入为`0`，卖出为`1`
offset | INTEGER | NO | 起始查询索引，从`0`开始，默认`0`
limit | INTEGER | NO | 查询数量，默认`30`，最大`100`
total | INTEGER | NO | 是否返回查询总数，不返回`0`，返回`1`，默认不返回，此时总量显示为`-1`

* **响应：**

  :::demo
  
  ```json tab:Response
  {
    "code": 0,
    "msg": "ok",
    "data": {
      "height": null,
      "trade": [
        {
          "tradeId": "d3e7529de05e94d247a4e7ef58a56b069b059d52",
          "symbol": "VX_ETH-000",
          "tradeTokenSymbol": "VX",
          "quoteTokenSymbol": "ETH-000",
          "tradeToken": "tti_564954455820434f494e69b5",
          "quoteToken": "tti_06822f8d096ecdf9356b666c",
          "price": "0.000228",
          "quantity": "0.0001",
          "amount": "0.00000002",
          "time": 1586944732,
          "side": 0,
          "buyFee": "0.00000000",
          "sellFee": "0.00000000",
          "blockHeight": 260
        }
      ],
      "total": -1
    }
  }
  ```
  
  ```json test:Test url: /api/v2/trades?symbol=BTC-000_USDT-000 method: GET
  {}
  ```
  :::
  
### 获取市场深度
```  
GET /api/v2/depth
```

* **参数：**

名称 | 类型 | 是否必须 | 描述
------------ | ------------ | ------------ | ------------
symbol | STRING | YES | 交易对名称，如`GRIN-000_VITE`
limit | INTEGER | NO | 返回结果数量，最大`100`，缺省`100`
precision | INTEGER | NO | 价格小数位

* **响应：**

  :::demo
  
  ```json tab:Response
  {
    "code": 0,
    "msg": "ok",
    "data": {
      "timestamp": 1588170501936,
      "asks": [
        [
            "0.025750",
            "0.0323"
        ],
        [
            "0.026117",
            "0.0031"
        ]    
      ],
      "bids": [
        [
            "0.024820",
            "0.0004"
        ],
        [
            "0.024161",
            "0.0042"
        ]
      ]
    }
  }
  ```
  
  ```json test:Test url: /api/v2/depth?symbol=BTC-000_USDT-000 method: GET
  {}
  ```
  :::

### 获取K线数据
```  
GET /api/v2/klines
```

* **参数：**

名称 | 类型 | 是否必须 | 描述
------------ | ------------ | ------------ | ------------
symbol | STRING | YES | 交易对名称，如`GRIN-000_VITE`
interval | STRING | YES | 周期，取值[`minute`, `hour`, `day`, `minute30`, `hour6`, `hour12`, `week`]
limit | INTEGER | NO | 返回结果数量，最大`1500`，缺省`500`
startTime | INTEGER | NO | 查询起始时间（秒）
endTime | INTEGER | NO | 查询截止时间（秒）

* **响应：**

名称 | 类型 | 描述
------------ | ------------ | ------------
t | LONG | 时间
c | STRING | 收盘价(closePrice)
p | STRING | 开盘价(openPrice)
h | STRING | 最高价(highPrice)
l | STRING | 最低价(lowPrice)
v | STRING | 交易币种交易量(volume)

  :::demo
  
  ```json tab:Response
  {
    "code": 0,
    "msg": "ok",
    "data": {
      "t": [
        1554207060
      ],
      "c": [
        1.0
      ],
      "p": [
        1.0
      ],
      "h": [
        1.0
      ],
      "l": [
        1.0
      ],
      "v": [
        12970.8
      ]
    }
  }
  ```
  
  ```json test:Test url: /api/v2/klines?symbol=VITE_BTC-000&interval=minute method: GET
  {}
  ```
  :::
  
### 获取充提记录
```  
GET /api/v2/deposit-withdraw
```

* **参数：**

名称 | 类型 | 是否必须 | 描述
------------ | ------------ | ------------ | ------------
address | STRING | YES | 下单地址
tokenId | STRING | YES | 币种id，如`tti_5649544520544f4b454e6e40`
offset | INTEGER | NO | 起始查询索引，从`0`开始，默认`0`
limit | INTEGER | NO | 查询数量，默认`100`，最大`100`

* **响应：**

  :::demo
  
  ```json tab:Response
  {
    "code": 0,
    "msg": "ok",
    "data": {
      "record": [
        {
          "time": 1555057049,
          "tokenSymbol": "VITE",
          "amount": "1000000.00000000",
          "type": 1
        }
      ],
      "total": 16
    }
  }
  ```
  
  ```json test:Test url: /api/v2/deposit-withdraw?address=vite_ff38174de69ddc63b2e05402e5c67c356d7d17e819a0ffadee&tokenId=tti_5649544520544f4b454e6e40 method: GET
  {}
  ```
  :::
  
### 获取币种汇率
```  
GET /api/v2/exchange-rate
```

* **参数：**

名称 | 类型 | 是否必须 | 描述
------------ | ------------ | ------------ | ------------
tokenSymbols | STRING | NO | 币种简称列表，用","分隔，如`VITE,ETH-000`
tokenIds | STRING | NO | 币种id列表，用","分隔，如`tti_5649544520544f4b454e6e40,tti_5649544520544f4b454e6e40`

* **响应：**

  :::demo
  
  ```json tab:Response
  {
    "code": 0,
    "msg": "ok",
    "data": [
      {
        "tokenId": "tti_5649544520544f4b454e6e40",
        "tokenSymbol": "VITE",
        "usdRate": 0.03,
        "cnyRate": 0.16
      }
    ]
  }
  ```
  
  ```json test:Test url: /api/v2/exchange-rate?tokenIds=tti_5649544520544f4b454e6e40 method: GET
  {}
  ```
  :::  

### 获取美元人民币汇率
```  
GET /api/v2/usd-cny
```

* **参数：**
  无

* **响应：**

  :::demo
  
  ```json tab:Response
  {
    "code": 0,
    "msg": "ok",
    "data": 6.849
  }
  ```
  
  ```json test:Test url: /api/v2/usd-cny method: GET
  {}
  ```
  ::: 


### 获取用户交易所账户余额
```
GET /api/v2/balance
```

**参数：**

名称 | 类型 | 是否必须 | 描述
------------ | ------------ | ------------ | ------------
address | STRING | YES | 账户地址


**响应：**

名称 | 类型 | 描述
------------ | ------------ | ------------
available | STRING | 交易所可用余额
locked | STRING | 交易所锁定（下单中）余额

  :::demo
  
  ```json tab:Response
  {
    "code": 0,
    "msg": "ok",
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
      }
    }
  }
  ```
  
  ```json test:Test url: /api/v2/balance method: GET
  {}
  ```
  ::: 

### 获取服务器时间
```  
GET /api/v2/time
GET /api/v2/timestamp
```

* **参数：**
  无

* **响应：**

  :::demo
  
  ```json tab:Response
  {
    "code": 0,
    "msg": "ok",
    "data": 1559033445000
  }
  ```
  
  ```json test:Test url: /api/v2/time method: GET
  {}
  ```
  ::: 

## WebSocket API

### op_type定义
* sub，表示订阅
* un_sub，表示取消订阅
* ping，表示心跳请求，保证10s内一次，用于判断客户端client_id是否有效
* pong，服务端响应，通常无须关注
* push，表示服务推送数据

:::tip 注意
`ping`心跳消息需要至少1分钟周期发送1次。当心跳间隔超过1分钟后，注册的事件订阅（Event Subscription）会失效清理
:::

### topics列表
支持单、多主题订阅，多个主题订阅使用","分隔，如：`topic1,topic2`

| 主题 | 描述| Message |
|:--|:--|:--:|
|`order.$address`|订单变化| `Order`|
|`market.$symbol.depth`|深度数据| `DepthList`|
|`market.$symbol.trade`|交易数据| `TradeList`|
|`market.$symbol.tickers`|某个交易对统计数据|`TickerStatistics`|
|`market.quoteToken.$symbol.tickers`|计价币种的交易对统计数据|`TickerStatistics`|
|`market.quoteTokenCategory.VITE.tickers`|VITE市场的交易对统计数据|`TickerStatistics`|
|`market.quoteTokenCategory.ETH.tickers`|ETH市场的交易对统计数据|`TickerStatistics`|
|`market.quoteTokenCategory.USDT.tickers`|USDT市场的交易对统计数据|`TickerStatistics`|
|`market.quoteTokenCategory.BTC.tickers`|BTC市场的交易对统计数据|`TickerStatistics`|
|`market.$symbol.kline.minute`|分钟kline数据|`Kline`|
|`market.$symbol.kline.minute30`|30分钟kline数据|`Kline`|
|`market.$symbol.kline.hour`|1小时kline数据|`Kline`|
|`market.$symbol.kline.day`|日kline数据|`Kline`|
|`market.$symbol.kline.week`|周kline数据|`Kline`|
|`market.$symbol.kline.hour6`|6小时kline数据|`Kline`|
|`market.$symbol.kline.hour12`|12小时kline数据|`Kline`|

## Protobuf 消息订阅

### 环境地址
* 【MainNet】`wss://vitex.vite.net/websocket`
* 【TestNet】`wss://vitex.vite.net/test/websocket`

### 协议模型
```
syntax = "proto3";

package protocol;

option java_package = "org.vite.data.dex.bean.protocol";
option java_outer_classname = "DexProto";

message DexProtocol {
    string client_id = 1; // 用于区分一个client
    string topics = 2; // 主题
    string op_type = 3; // sub,un_sub,ping,pong,push
    bytes message = 4; // proto数据
    int32 error_code = 5; //错误编码 0:normal，1:illegal_client_id，2:illegal_event_key，3:illegal_op_type，5:visit limit
}
```

### message数据结构定义
```
syntax = "proto3";
option java_package = "org.vite.data.dex.bean.proto";
option java_outer_classname = "DexPushMessage";

// TickerStatistics
message TickerStatisticsProto {

    //symbol
    string symbol = 1;
    //symbol
    string tradeTokenSymbol = 2;
    //symbol
    string quoteTokenSymbol = 3;
    //tokenId
    string tradeToken = 4;
    //tokenId
    string quoteToken = 5;
    //价格
    string openPrice = 6;
    //价格
    string prevClosePrice = 7;
    //价格
    string closePrice = 8;
    //价格
    string priceChange = 9;
    //变化率
    string priceChangePercent = 10;
    //价格
    string highPrice = 11;
    //价格
    string lowPrice = 12;
    //数量
    string quantity = 13;
    //成交额
    string amount = 14;
    //price精度
    int32 pricePrecision = 15;
    //quantity精度
    int32 quantityPrecision = 16;
}

// TradeList
message TradeListProto {
    repeated TradeProto trade = 1;
}

// Trade
message TradeProto {

    string tradeId = 1;
    //symbol
    string symbol = 2;
    //symbol
    string tradeTokenSymbol = 3;
    //symbol
    string quoteTokenSymbol = 4;
    //tokenId
    string tradeToken = 5;
    //tokenId
    string quoteToken = 6;
    //price
    string price = 7;
    //quantity
    string quantity = 8;
    //amount
    string amount = 9;
    //time
    int64 time = 10;
    //side
    int32 side = 11;
    //orderId
    string buyerOrderId = 12;
    //orderId
    string sellerOrderId = 13;
    //fee
    string buyFee = 14;
    //fee
    string sellFee = 15;
    //height
    int64 blockHeight = 16;
}

// Kline
message KlineProto {

    int64 t = 1;

    double c = 2;

    double o = 3;

    double h = 4;

    double l = 5;

    double v = 6;
}

// Order
message OrderProto {

    //订单ID
    string orderId = 1;
    //symbol
    string symbol = 2;
    //symbol
    string tradeTokenSymbol = 3;
    //symbol
    string quoteTokenSymbol = 4;
    //tokenId
    string tradeToken = 5;
    //tokenId
    string quoteToken = 6;
    //方向
    int32 side = 7;
    //价格
    string price = 8;
    //数量
    string quantity = 9;
    //交易量
    string amount = 10;
    //成交Quantity
    string executedQuantity = 11;
    //成交Amount
    string executedAmount = 12;
    //成交率
    string executedPercent = 13;
    //均价
    string executedAvgPrice = 14;
    //手续费
    string fee = 15;
    //状态
    int32 status = 16;
    //类型
    int32 type = 17;
    //时间
    int64 createTime = 18;
    //地址
    string address = 19;
}

// DepthList
message DepthListProto {

    repeated DepthProto asks = 1;

    repeated DepthProto bids = 2;
}

// Depth
message DepthProto {
    //价格
    string price = 1;
    //数量
    string quantity = 2;
    //交易量
    string amount = 3;
}
```

## JSON 消息订阅

### 环境地址
* 【MainNet】`wss://api.vitex.net/ws`

### message数据结构定义

#### Order

* **定义:**
```
```java
// order id
private String oid;
// symbol
private String s;
// trade token symbol
private String ts;
// quote token symbol
private String qs;
// trade tokenId
private String tid;
// quote tokenId
private String qid;
// side
private Integer side;
// price
private String p;
// quantity
private String q;
// amount
private String a;
// executed quantity
private String eq;
// executed amount
private String ea;
// executed percentage
private String ep;
// executed average price
private String eap;
// fee
private String f;
// status
private Integer st;
// type
private Integer tp;
// create time
private Long ct;
// address
private String d;
```

* **示例:**

  :::demo
  
  ```json tab:Subscribe
  {
    "clientId":"test",
    "opType":"sub",
    "topics":"order.vite_cc392cbb42a22eebc9136c6f9ba416d47d19f3be1a1bd2c072"
  }
  ```
  
  ```json tab:Response
  {
    "message":{
      "a":"13.72516176",
      "ct":1588142062,
      "d":"vite_cc392cbb42a22eebc9136c6f9ba416d47d19f3be1a1bd2c072",
      "ea":"13.7251",
      "eap":"0.1688",
      "ep":"1.0000",
      "eq":"81.3102",
      "f":"0.0308",
      "oid":"b0e0e20739c570d533679315dbb154201c8367b6e23636b6521e9ebdd9f8fc0a",
      "p":"0.1688",
      "q":"81.3102",
      "qid":"tti_80f3751485e4e83456059473",
      "qs":"USDT-000",
      "s":"VX_USDT-000",
      "side":0,
      "st":2,
      "tid":"tti_564954455820434f494e69b5",
      "tp":0,
      "ts":"VX"
    }
  }
  ```
  :::

#### Trade

* **定义:**
```java
// tradeId
private String id;
// symbol
private String s;
// trade token symbol
private String ts;
// quote token symbol
private String qs;
// trade tokenId
private String tid;
// quote tokenId
private String qid;
// price
private String p;
// quantity
private String q;
// amount
private String a;
// time
private Long t;
// side
private Integer side;
// buyer orderId
private String bid;
//seller orderId
private String sid;
// buyer fee
private String bf;
// seller fee
private String sf;
// block height
private Long bh;
```

* **示例:**

  :::demo
  
  ```json tab:Subscribe
  {
    "clientId":"test",
    "opType":"sub",
    "topics":"market.VX_VITE.trade"
  }
  ```
  
  ```json tab:Response
  {
    "message":[
     {
      "a":"6324.77710294",
      "bf":"14.23074848",
      "bh":14526719,
      "bid":"00001f00fffffffff340910fa1ff005e6618cb000030",
      "id":"702d8d5bd6e8d5aa7b40953484acbcfeae6c1fcf",
      "p":"12.8222",
      "q":"493.2677",
      "qid":"tti_5649544520544f4b454e6e40",
      "qs":"VITE",
      "s":"VX_VITE",
      "sf":"14.23074848",
      "sid":"00001f01000000000cbf6ef05e00005e6618cb00002f",
      "side":0,
      "t":1583749346,
      "tid":"tti_564954455820434f494e69b5",
      "ts":"VX"
      }
    ]
  }
  ```
  :::

#### TickerStatistics

* **定义:**
```java
// symbol
private String s;
// trade token symbol
private String ts;
// quote token symbol
private String qs;
// trade tokenId
private String tid;
// quote tokenId
private String qid;
// open price
private String op;
// previous close price
private String pcp;
// close price
private String cp;
// price change 
private String pc;
// price change percentage
private String pCp;
// high price 
private String hp;
// low price
private String lp;
// quantity 
private String q;
// amount 
private String a;
// price precision
private Integer pp;
// quantity precision
private Integer qp;
```

* **示例:**

  :::demo
  
  ```json tab:Subscribe
  {
    "clientId":"test",
    "opType":"sub",
    "topics":"market.VX_VITE.tickers"
  }
  ```
  
  ```json tab:Response
  {
    "message":{
      "a":"14932378.5785",
      "cp":"13.3013",
      "hp":"13.5200",
      "lp":"10.9902",
      "op":"11.3605",
      "pc":"1.9408",
      "pcp":"13.2947",
      "pp":4,
      "q":"1207963.7611",
      "qid":"tti_5649544520544f4b454e6e40",
      "qp":4,
      "qs":"VITE",
      "s":"VX_VITE",
      "tid":"tti_564954455820434f494e69b5",
      "ts":"VX"
    }
  }
  ```
  :::

#### KLine

* **定义:**
```java
private Long t;
private Double c;
private Double o;
private Double v;
private Double h;
private Double l;
```

* **示例:**

  :::demo
  
  ```json tab:Subscribe
  {
    "clientId":"test",
    "opType":"sub",
    "topics":"market.VX_VITE.kline.minute"
  }
  ```
  
  ```json tab:Response
  {
    "message":{
    "c":12.935,
    "h":12.935,
    "l":12.935,
    "o":12.935,
    "t":1583749440,
    "v":415.1729
    }
  }
  ```
  :::
  
#### Depth

* **定义:**
```java
private List<List<String>> asks; // [[price, quantity],[price, quantity]]
private List<List<String>> bids; // [[price, quantity],[price, quantity]]
```

* **示例:**

  :::demo
  
  ```json tab:Subscribe
  {
    "clientId":"test",
    "opType":"sub",
    "topics":"market.VX_VITE.depth"
  }
  ```
  
  ```json tab:Response
  {
    "message":{
    "asks":[
    [
      "12.9320",
      "185.3194"
    ],[
      "13.3300",
      "48.9177"
    ],[
      "13.4959",
      "1305.9508"
    ],[
      "13.5100",
      "466.7237"
    ],[
      "13.8000",
      "134.5858"
    ]],
    "bids":[
    [
      "12.7002",
      "170.2562"
    ],[
      "12.6000",
      "63.6076"
    ],[
      "12.4000",
      "15339.2586"
    ],[
      "12.3010",
      "324.6731"
    ],[
      "12.3000",
      "222.7945"
    ]]
    }
  }
  ```
  :::
