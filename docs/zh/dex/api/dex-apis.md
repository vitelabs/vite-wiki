---
demoUrl: "https://api.vitex.net/test"
---

# ViteX API

## 接入地址
* 【Test】`https://api.vitex.net/test`
* 【Mainnet】: `https://api.vitex.net/`

## REST API私有接口
### 概述
ViteX REST API允许用户在不暴露私钥的情况下，实现ViteX去中心化交易所的相关操作。

* 当您需要第三方做市商来操作您的账户完成交易时，可以不将自己的私钥提供给做市商，
而只提供API Key和API Secret。对方只能在您授权的交易对下进行下单和撤单操作，无法转移您的资产。
* 您可以针对每个交易对单独授权，ViteX合约会阻止API操作未经授权的交易对。
* 您可以随时发起链上交易，取消对API的授权。授权取消后，即使仍持有有效的API Key和API Secret，
ViteX合约也不再接受来自API的订单请求。
* 请注意：用户通过API完成的订单操作，是通过ViteX API的私钥进行签名的，
产生的Vite链上交易也属于ViteX API的账户链，而不在用户自己的Vite地址下。
### 链上授权
在使用ViteX REST API前，需要用户在链上对API服务进行授权，允许API服务来代替用户签名链上交易。

为保证安全，建议您只授权必要的交易对。授权对象是ViteX API服务对应的Vite地址，不需要提供私钥。
请注意：在任何情况下，您都不要将自己的私钥和助记词提供给第三方，包括Vite Labs在内。

ViteX REST API会为每个用户分配一个单独的Vite地址，来代理用户签名链上交易。
您需要为该地址抵押VITE代币来提供配额，以执行下单、撤单等操作。

### 接口鉴权
接口分为公有和私有两种，私有接口需要通过签名来进行权限认证。

接口鉴权需要`API Key`和`API Secret`，请联系Vite Labs获取。注意`API Key`和`API Secret`是大小写敏感的。 

调用私有接口时，除了接口本身所需的参数外，还需要传递`key`、`timestamp`和`signature`三个参数。

* key即`API Key`字段。
* timestamp参数为UNIX时间戳（毫秒级）(UNIX-style timestamp in epoch millisecond format)，例如：1565360340430。为防止重放攻击，服务端会校验时间戳的合法性，若请求中的时间戳小于服务端时间2000 ms或大于1000 ms，均认为该请求无效。
* signature字段通过`HMAC SHA256`签名算法生成。`API Secret`作为`HMAC SHA256`的密钥，其他所有参数作为`HMAC SHA256`的操作对象，得到的输出即为签名。签名大小写不敏感。

timestamp 校验逻辑如下:

```
    if (timestamp < (serverTime + 1000) && (serverTime - timestamp) <= 2000) {
      // process request
    } else {
      // reject request
    }
```

### 基本规范
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

### 访问限制
API接口的访问以60秒为一个固定周期，周期内次数用完，则调用接口失败；上一个周期未使用的次数不会顺延到下一个周期；

### 需要签名的接口
* 按照参数名称的字典顺序对请求的所有参数(接口定义的参数和key)需要按照字母先进行排序；
* 其中参数名称和值使用英文符号(=)进行连接；再把英文等号连接得到的字符串按参数名字的字典顺序依次使用&符号连接，即得到规范化的请求字符串；
* 签名使用`HMAC SHA256`算法. API-KEY所对应的API-Secret作为 `HMAC SHA256` 的密钥，其他所有参数作为`HMAC SHA256`的操作对象，得到的输出即为签名。
* 签名大小写不敏感。
* 调用这些接口时，除了接口本身所需的参数外，还需要传递`signature`即签名参数。
* 当同时使用query string和request body时，`HMAC SHA256`的输入query string在前，request body在后

### 接口签名示例
POST /api/v1/account/order 的示例

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

#### 签名示例
* **queryString:** amount=10&key=11111111&price=0.09&side=0&symbol=ETH-000_BTC-000&timestamp=1567755178560
* **签名消息(参数排序):**

    ```
    $ echo -n "amount=10&key=11111111&price=0.09&side=0&symbol=ETH-000_BTC-000&timestamp=1567755178560" | openssl dgst -sha256 -hmac "22222222"
    (stdin)= 409cf00bb97c08ae99317af26b379ac59f4cfaba9591df7738c0604a4cb68b9a
    ```


* **调用API:**

    ```
    $ curl -X POST -d "amount=10&key=11111111&price=0.09&side=0&symbol=ETH-000_BTC-000&timestamp=1567755178560&signature=409cf00bb97c08ae99317af26b379ac59f4cfaba9591df7738c0604a4cb68b9a" https://api.vitex.net/test/api/v1/account/order
    ```

### 枚举定义
#### 订单状态
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

#### 订单类型

代码 | 含义 | 描述
------------ | ------------ | ------------
0 | Limit Order | 限价单
1 | Market Order | 市价单(暂不支持)

#### 订单交易方向

代码 | 含义 | 描述
------------ | ------------ | ------------
0 | Buy Order | 买入
1 | Sell Order | 卖出

#### Time in force

代码 | 含义 | 描述
------------ | ------------ | ------------
0 | GTC - Good Till Cancel | 成交为止
1 | IOC - Immediate or Cancel | 无法立即成交的部分就撤销 (暂不支持)
2 | FOK - Fill or Kill | 要么全部成交，要么撤销 (暂不支持)


### 下单测试
用来验证签名
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
  "msg": "ok",   
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
  "msg": "ok",
  "data": {
    "symbol": "VX_ETH-000",
    "orderId": "c35dd9868ea761b22fc76ba35cf8357db212736ecb56399523126c515113f19d",
    "cancelRequest": "2d015156738071709b11e8d6fa5a700c2fd30b28d53aa6160fd2ac2e573c7595",
    "status": 6
  }
}
```

### 撤销全部挂单
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

## REST API公有接口
### 市场最小金额
```/api/v1/limit```

获取各个基础交易对的最小下单金额

* **Method**: `GET`

* **Responses**

  |code|msg|data|
  |:--|:--|:--:|
  |0|success|`Limit`|
  |1|error_msg|null|

* **Example**

  :::demo
  ```json test: "Test" url: /api/v1/limit method: GET
  {}
  ```
  :::

### 获取所有币种
```/api/v1/tokens```

获取所有的Token列表

* **Method**: `GET` 

* **Parameters**

  |Name|Located In|Description|Required|Schema|
  |:--|:--|:---|:---|:--:|
  |category|query|default `all`; Allowed value:[`quote`,`all`]|no|string|
  |tokenSymbolLike|query|symbol like; e.g. `ETH`|no|string|
  |offset|query|start with `0`; default `0`|no|integer|
  |limit|query|default `500`; max `500`|no|integer|

* **Responses**

  |code|msg|data|
  |:--|:--|:--:|
  |0|success|[`Token`]|
  |1|error_msg|null|

* **Example**

  :::demo
  
  ```json tab:Response
  {
    "code": 0,
    "msg": "ok",
    "data": [
      {
        "tokenId": "tti_4e88a475c675971dab7ec917",
        "name": "Bitcoin",
        "symbol": "BTC",
        "originalSymbol": "BTC",
        "totalSupply": "2100000000000000",
        "owner": "vite_ab24ef68b84e642c0ddca06beec81c9acb1977bbd7da27a87a"
      }
    ]
  }
  ```
  
  ```json test:Test url: /api/v1/tokens method: GET
  {}
  ```
  :::

### 获取代币详情
```/api/v1/token/detail```


* **Method**: `GET` 

* **Parameters**

  |Name|Located In|Description|Required|Schema|
  |:--|:--|:---|:---|:--:|
  |tokenSymbol|query|the `symbol` of token; e.g. `VITE`|no|string|
  |tokenId|query|the `tokenId` of token; e.g. `tti_5649544520544f4b454e6e40`|no|string|

* **Responses**

  |code|msg|data|
  |:--|:--|:--:|
  |0|success|[`TokenDetail`]|
  |1|error_msg|null|

* **Example**

  :::demo
  
  ```json tab:Response
  {
    "code": 0,
    "msg": "ok",
    "data": {
      "tokenId": "tti_4e88a475c675971dab7ec917",
      "name": "Bitcoin",
      "symbol": "BTC",
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
  
  ```json test:Test url: /api/v1/token/detail?tokenId=tti_5649544520544f4b454e6e40 method: GET
  {}
  ```
  :::
  
### 已开通交易对的代币
获取已开通交易对的Token列表

```/api/v1/token/mapped```

* **Method**: `GET` 

* **Parameters**

  |Name|Located In|Description|Required|Schema|
  |:--|:--|:---|:---|:--:|
  |quoteTokenSymbol|query|the `symbol` of quote token; e.g. `VITE` |yes|string|

* **Responses**

  |code|msg|data|
  |:--|:--|:--:|
  |0|success|[`TokenMapping`]|
  |1|error_msg|null|

* **Example**

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
  
  ```json test:Test url: /api/v1/token/mapped?quoteTokenSymbol=VITE method: GET
  {}
  ```
  :::
  
### 未开通交易对的代币
获取未开通交易对的Token列表

```/api/v1/token/unmapped```

获取未开通交易对的Token列表(上币使用)

* **Method**: `GET` 

* **Parameters**

  |Name|Located In|Description|Required|Schema|
  |:--|:--|:---|:---|:--:|
  |quoteTokenSymbol|query|the `symbol` of quote token; e.g. `VITE`|yes|string|

* **Responses**

  |code|msg|data|
  |:--|:--|:--:|
  |0|success|[`TokenMapping`]|
  |1|error_msg|null|

* **Example**

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
  
  ```json test:Test url: /api/v1/token/unmapped?quoteTokenSymbol=VITE method: GET
  {}
  ```
  :::
  
### 所有市场
```/api/v1/markets```

获取所有的市场(交易对)

* **Method**: `GET` 

* **Parameters**

  |Name|Located In|Description|Required|Schema|
  |:--|:--|:---|:---|:--:|
  |offset|query|start with `0`; default `0`|no|integer|
  |limit|query|default `500`; max `500`|no|integer|

* **Responses**

  |code|msg|data|
  |:--|:--|:--:|
  |0|success|[`Market`]|
  |1|error_msg|null|

* **Example**

  :::demo
  
  ```json tab:Response
  {
    "code": 0,
    "msg": "ok",
    "data": [
      {
        "symbol": "BTC-A_USDT",
        "tradeTokenSymbol": "BTC-A",
        "quoteTokenSymbol": "USDT",
        "tradeToken": "tti_322862b3f8edae3b02b110b1",
        "quoteToken": "tti_973afc9ffd18c4679de42e93",
        "pricePrecision": 8,
        "quantityPrecision": 8
      }
    ]
  }
  ```
  
  ```json test:Test url: /api/v1/markets method: GET
  {}
  ```
  :::

### 订单信息
```/api/v1/order```

* **Method**: `GET` 

* **Parameters**

  |Name|Located In|Description|Required|Schema|
  |:--|:--|:---|:---|:--:|
  |address|query|the buyer/seller address|yes|string|
  |orderId|query|the order id|no|string|
  |orderHash|query|the order hash|no|string|

orderId或者orderHash(orderHash为私有接口中的orderId)必须有一个

* **Responses**

  |code|msg|data|
  |:--|:--|:--:|
  |0|success|[`Order`]|
  |1|error_msg|null|

* **Example**

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
  
  ```json test:Test url: /api/v1/order method: GET
  {}
  ```
  :::  


### 所有挂单
```/api/v1/orders/open```

获取Pending(挂单中)状态的订单

* **Method**: `GET` 

* **Parameters**

  |Name|Located In|Description|Required|Schema|
  |:--|:--|:---|:---|:--:|
  |address|query|the buyer/seller address|yes|string|
  |symbol|query|market pair symbol. e.g. `ABC-000_VITE`|no|string|
  |quoteTokenSymbol|query|Quote token symbol|no|string|
  |tradeTokenSymbol|query|Trade token symbol|no|string|
  |offset|query|Starting with `0`. Default `0`|no|integer|
  |limit|query|Default`30`. Max `100`|no|integer|
  |total|query|Total number required. `0` for not required and `1` for required. Default is not required and will return total=-1 in response|no|integer|

* **Responses**

  |code|msg|data|
  |:--|:--|:--:|
  |0|success|`OrderList`|
  |1|error_msg|null|

* **Example**

  :::demo
  
  ```json tab:Response
  {
    "code": 0,
    "msg": "ok",
    "data": {
      "order": [
        {
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
      ],
      "total": -1
    }
  }
  ```
  
  ```json test:Test url: /api/v1/orders/open?address=vite_ff38174de69ddc63b2e05402e5c67c356d7d17e819a0ffadee method: GET
  {}
  ```
  :::

### 订单列表
```/api/v1/orders```

获取订单列表

* **Method**: `GET` 

* **Parameters**

  |Name|Located In|Description|Required|Schema|
  |:--|:--|:---|:---|:--:|
  |address|query|the buyer/seller address|yes|string|
  |symbol|query|market pair symbol. e.g. `ABC-000_VITE`|no|string|
  |quoteTokenSymbol|query|the `symbol` of quote token|no|string|
  |tradeTokenSymbol|query|the `symbol` of trade token|no|string|
  |startTime|query|start time in Seconds|no|long|
  |endTime|query|end time in Seconds|no|long|
  |side|query|order side; Allowed value: [`0`:buy, `1`:sell]|no|integer|
  |status|query|order status list; Allowed value: [`1`:open, `2`:closed, `3`:canceled, `4`:failed]|no|integer|
  |offset|query|start with `0`; default `0`|no|integer|
  |limit|query|default `30`; max `100`|no|integer|
  |total|query|total number required, `0` for not required and `1` for required; default not required, return total=-1 in response|no|integer|

* **Responses**

  |code|msg|data|
  |:--|:--|:--:|
  |0|success|`OrderList`|
  |1|error_msg|null|

* **Example**

  :::demo
  
  ```json tab:Response
  {
    "code": 0,
    "msg": "ok",
    "data": {
      "order": [
        {
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
      ],
      "total": -1
    }
  }
  ```
  
  ```json test:Test url: /api/v1/orders?address=vite_ff38174de69ddc63b2e05402e5c67c356d7d17e819a0ffadee method: GET
  {}
  ```
  :::

### 24小时行情
```/api/v1/ticker/24hr```

获取ticker的24小时价格变化统计信息

* **Method**: `GET` 

* **Parameters**

  |Name|Located In|Description|Required|Schema|
  |:--|:--|:---|:---|:--:|
  |symbols|query|market pair symbols; split by `,`; e.g. `ABC-000_VITE,ABC-001_VITE`|no|string|
  |quoteTokenSymbol|query|the `symbol` of quote token|no|string|
  |quoteTokenCategory|query|the `category` of quote token,e.g. [`VITE`,`ETH`,`BTC`,`USDT`]|no|string|

* **Responses**

  |code|msg|data|
  |:--|:--|:--:|
  |0|success|[`TickerStatistics`]|
  |1|error_msg|null|

* **Example**

  :::demo
  
  ```json tab:Response
  {
    "code": 0,
    "msg": "ok",
    "data": [
      {
        "symbol": "CSTT-47E_VITE",
        "tradeTokenSymbol": "CSTT",
        "quoteTokenSymbol": "VITE",
        "tradeToken": "tti_b6f7019878fdfb21908a1547",
        "quoteToken": "tti_5649544520544f4b454e6e40",
        "openPrice": "1.00000000",
        "prevClosePrice": "0.00000000",
        "closePrice": "1.00000000",
        "priceChange": "0.00000000",
        "priceChangePercent": 0.0,
        "highPrice": "1.00000000",
        "lowPrice": "1.00000000",
        "quantity": "45336.20000000",
        "amount": "45336.20000000",
        "pricePrecision": 8,
        "quantityPrecision": 8
      }
    ]
  }
  ```
  
  ```json test:Test url: /api/v1/ticker/24hr?quoteTokenSymbol=VITE method: GET
  {}
  ```
  :::


### 最优价
```/api/v1/ticker/bookTicker```

获取ticker的最佳价格

* **Method**: `GET` 

* **Parameters**

  |Name|Located In|Description|Required|Schema|
  |:--|:--|:---|:---|:--:|
  |symbol|query|market pair symbol. e.g. `ABC-000_VITE`|yes|string|

* **Responses**

  |code|msg|data|
  |:--|:--|:--:|
  |0|success|`BookTicker`|
  |1|error_msg|null|

* **Example**

  :::demo
  
  ```json tab:Response
  {
    "code": 0,
    "msg": "ok",
    "data": {
        "symbol": "CSTT-47E_VITE",
        "bidPrice": "1.00000000",
        "bidQuantity": "45336.20000000",
        "askPrice": "1.00000000",
        "askQuantity": "45336.20000000"
      }
  }
  ```
  
  ```json test:Test url: /api/v1/ticker/bookTicker?symbol=BTC-000_VITE-000 method: GET
  {}
  ```
  :::
  
### 成交记录
```/api/v1/trades```

获取所有的交易(订单撮合)记录

* **Method**: `GET` 

* **Parameters**

  |Name|Located In|Description|Required|Schema|
  |:--|:--|:---|:---|:--:|
  |symbol|query|market pair symbol ; e.g. `BTC-000_VITE`.|yes|string|
  |orderId|query|order id.|no|string|
  |startTime|query|start time in Seconds.|no|long|
  |endTime|query|end time in Seconds.|no|long|
  |side|query|order side. Allowed value: [`0`:buy, `1`:sell].|no|integer|
  |offset|query|start with `0`; default `0`.|no|integer|
  |limit|query|default `30`; max `100`.|no|integer|
  |total|query|total number required ;`0` for not required and `1` for required; default not required, return total=-1 in response|no|integer|

* **Responses**

  |code|msg|data|
  |:--|:--|:--:|
  |0|success|`TradeList`|
  |1|error_msg|null|

* **Example**

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
  
  ```json test:Test url: /api/v1/trades?symbol=BTC-000_VITE-000 method: GET
  {}
  ```
  :::
  
### 市场深度
```/api/v1/depth```

获取市场(交易对)的深度

* **Method**: `GET` 

* **Parameters**

  |Name|Located In|Description|Required|Schema|
  |:--|:--|:---|:---|:--:|
  |symbol|query|market pair symbol ; e.g. `CSTT-47E_VITE`.|yes|string|
  |limit|query|default `100`; max `100`.|no|integer|

* **Responses**

  |code|msg|data|
  |:--|:--|:--:|
  |0|success|[`MarketDepth`]|
  |1|error_msg|null|

* **Example**

  :::demo
  
  ```json tab:Response
  {
    "code": 0,
    "msg": "ok",
    "data": {
      "asks": [
        {
          "price": "1.00000000",
          "quantity": "111233.50000000",
          "amount": "111233.50000000"
        }    
      ],
      "bids": [
        {
          "price": "2.00000000",
          "quantity": "111233.50000000",
          "amount": "111233.50000000"
        }
      ]
    }
  }
  ```
  
  ```json test:Test url: /api/v1/depth?symbol=BTC-000_VITE-000 method: GET
  {}
  ```
  :::

### K线
```/api/v1/klines```

获取市场(交易对)的K线

* **Method**: `GET` 

* **Parameters**

  |Name|Located In|Description|Required|Schema|
  |:--|:--|:---|:---|:--:|
  |symbol|query|market pair symbol ; e.g. `CSTT-47E_VITE`.|yes|string|
  |interval|query|interval. Allowed value: [`minute`、`hour`、`day`、`minute30`、`hour6`、`hour12`、`week`]|yes|string|
  |limit|query|default `500`; max `1500`.|no|integer|
  |startTime|query|start time in Seconds.|no|integer|
  |endTime|query|end time in Seconds.|no|integer|

* **Responses**

  |code|msg|data|
  |:--|:--|:--:|
  |0|success|[`MarketKline`]|
  |1|error_msg|null|

* **Example**

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
  
  ```json test:Test url: /api/v1/klines?symbol=BTC-000_VITE-000&interval=minute method: GET
  {}
  ```
  :::
  
### 充提记录
```/api/v1/deposit-withdraw```

获取充提记录

* **Method**: `GET` 

* **Parameters**

  |Name|Located In|Description|Required|Schema|
  |:--|:--|:---|:---|:--:|
  |address|query|the buyer/seller address|yes|string|
  |tokenId|query|token id.|yes|string|
  |offset|query|start with `0`; default `0`.|no|integer|
  |limit|query|default `100`; max `100`.|no|integer|

* **Responses**

  |code|msg|data|
  |:--|:--|:--:|
  |0|success|`DepositWithdrawList`|
  |1|error_msg|null|

* **Example**

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
  
  ```json test:Test url: /api/v1/deposit-withdraw?address=vite_ff38174de69ddc63b2e05402e5c67c356d7d17e819a0ffadee&tokenId=tti_5649544520544f4b454e6e40 method: GET
  {}
  ```
  :::
  
### 币种汇率
```/api/v1/exchange-rate```

获取Token的汇率

* **Method**: `GET` 

* **Parameters**

  |Name|Located In|Description|Required|Schema|
  |:--|:--|:---|:---|:--:|
  |tokenSymbols|query|token symbols ; split by `,` ; e.g. `VITE,ETH`.|no|string|
  |tokenIds|query|token ids ; split by `,`; e.g.`tti_5649544520544f4b454e6e40,tti_5649544520544f4b454e6e40`.|no|string|

* **Responses**

  |code|msg|data|
  |:--|:--|:--:|
  |0|success|[`ExchangeRate`]|
  |1|error_msg|null|

* **Example**

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
  
  ```json test:Test url: /api/v1/exchange-rate?tokenIds=tti_5649544520544f4b454e6e40 method: GET
  {}
  ```
  :::  

### 美元兑RMB汇率
```/api/v1/usd-cny```

获取USD-CNY的汇率

* **Method**: `GET` 

* **Parameters**

  |Name|Located In|Description|Required|Schema|
  |:--|:--|:---|:---|:--:|

* **Responses**

  |code|msg|data|
  |:--|:--|:--:|
  |0|success|`double`|
  |1|error_msg|null|

* **Example**

  :::demo
  
  ```json tab:Response
  {
    "code": 0,
    "msg": "ok",
    "data": 6.849
  }
  ```
  
  ```json test:Test url: /api/v1/usd-cny method: GET
  {}
  ```
  ::: 


### 账户交易所余额
```
/api/v1/balance
```
查询用户委托地址对应的交易所账户余额

* **Method**: `GET` 

**配额消耗:**
0 UT

**参数:**

名称 | 类型 | 是否必须 | 描述
------------ | ------------ | ------------ | ------------
address | STRING | YES | 地址


**响应:**

名称 | 类型 | 描述
------------ | ------------ | ------------
available | STRING | 交易所可用余额
locked | STRING | 交易所锁定余额(下单锁定)


```javascript
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
        },
        "ITDC-000": {
            "available": "0.00000000",
            "locked": "7186.00370000"
        }
    }
}
```


### 获取服务器时间
```/api/v1/time```

获取服务器时间(ms)

* **Method**: `GET` 

* **Parameters**

  |Name|Located In|Description|Required|Schema|
  |:--|:--|:---|:---|:--:|

* **Responses**

  |code|msg|data|
  |:--|:--|:--:|
  |0|success|`long`|
  |1|error_msg|null|

* **Example**

  :::demo
  
  ```json tab:Response
  {
    "code": 0,
    "msg": "ok",
    "data": 1559033445000
  }
  ```
  
  ```json test:Test url: /api/v1/time method: GET
  {}
  ```
  ::: 

## WebSocket
### 1. 环境地址：
* 【线上】wss://vitex.vite.net/websocket
* 【测试】wss://vitex.vite.net/test/websocket
* op_type:`ping`消息包需要至少1分钟周期发送，如果：心跳间隔超过1分钟后，注册的event会失效清理

### 2. 协议模型：
```
syntax = "proto3";

package protocol;

option java_package = "org.vite.data.dex.bean.protocol";
option java_outer_classname = "DexProto";

message DexProtocol {
    string client_id = 1; //Identify a single client
    string topics = 2; //见下面
    string op_type = 3; // sub,un_sub,ping,pong,push
    bytes message = 4; //proto数据
    int32 error_code = 5; //错误编码 0:normal, 1:illegal_client_id，2:illegal_event_key，3:illegal_op_type,5:visit limit
}

```
### 3. op_type说明： 
* sub,表示订阅
* un_sub,表示取消订阅
* ping,表示心跳请求，保证10s内一次，用于判断客户端client_id是否有效；
* pong,服务端响应，无须关注
* push,表示服务推送数据


### 4. topics说明： 
支持单个订阅，多个订阅使用`,`分割；比如：`xxx,xxx`

|Topic|Description| Message 模型|
|:--|:--|:--:|
|`order.$address`|订单变化| 见`OrderProto`|
|`market.$symbol.depth`|深度数据| 见`DepthListProto`|
|`market.$symbol.trade`|交易数据| 见`TradeListProto`|
|`market.$symbol.tickers`|某个交易对统计数据|见`TickerStatisticsProto`|
|`market.quoteToken.$symbol.tickers`|计价币种的交易对统计数据|见`TickerStatisticsProto`|
|`market.quoteTokenCategory.VITE.tickers`|VITE市场的交易对统计数据|见`TickerStatisticsProto`|
|`market.quoteTokenCategory.ETH.tickers`|ETH市场的交易对统计数据|见`TickerStatisticsProto`|
|`market.quoteTokenCategory.USDT.tickers`|USDT市场的交易对统计数据|见`TickerStatisticsProto`|
|`market.quoteTokenCategory.BTC.tickers`|BTC市场的交易对统计数据|见`TickerStatisticsProto`|
|`market.$symbol.kline.minute`|分钟kline数据|见`KlineProto`|
|`market.$symbol.kline.minute30`|30分钟kline数据|见`KlineProto`|
|`market.$symbol.kline.hour`|小时kline数据|见`KlineProto`|
|`market.$symbol.kline.day`|日kline数据|见`KlineProto`|
|`market.$symbol.kline.week`|周kline数据|见`KlineProto`|
|`market.$symbol.kline.hour6`|6小时kline数据|见`KlineProto`|
|`market.$symbol.kline.hour12`|12小时kline数据|见`KlineProto`|


### 5. message数据格式定义
```
syntax = "proto3";
option java_package = "org.vite.data.dex.bean.proto";
option java_outer_classname = "DexPushMessage";


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


message TradeListProto {
    repeated TradeProto trade = 1;
}

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

message KlineProto {

    int64 t = 1;

    double c = 2;

    double o = 3;

    double h = 4;

    double l = 5;

    double v = 6;
}

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

message DepthListProto {

    repeated DepthProto asks = 1;

    repeated DepthProto bids = 2;
}

message DepthProto {
    //价格
    string price = 1;
    //数量
    string quantity = 2;
    //交易量
    string amount = 3;
}
```
