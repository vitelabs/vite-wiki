---
demoUrl: "https://vitex.vite.net/test"
---

# 数据查询服务

## RestAPI接入文档

### 环境地址
* 【test】`https://vitex.vite.net/test`
* 【Pre-mainnet】: `https://vitex.vite.net/`

### `/api/v1/limit`

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

### `/api/v1/tokens`

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

### `/api/v1/token/detail`

获取Token的详细信息

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
  
### `/api/v1/token/mapped`

获取已开通交易对的Token列表

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
  
### `/api/v1/token/unmapped`

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
  
### `/api/v1/markets`

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

### `/api/v1/order`

查询订单信息

* **Method**: `GET` 

* **Parameters**

  |Name|Located In|Description|Required|Schema|
  |:--|:--|:---|:---|:--:|
  |address|query|start with `0`; default `0`.|yes|string|
  |orderId|query|the `orderId` of order.|yes|string|

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
        "orderId": "quEOx/ai3o7Xyv9em+qJIbJu7pM=",
        "symbol": "VCP-4_VITE",
        "tradeTokenSymbol": "VCP.test",
        "quoteTokenSymbol": "VITE",
        "tradeToken": "tti_c2695839043cf966f370ac84",
        "quoteToken": "tti_5649544520544f4b454e6e40",
        "side": 1,
        "price": "6.00000000",
        "quantity": "1.00000000",
        "amount": "6.00000000",
        "executedQuantity": "0.00000000",
        "executedAmount": "0.00000000",
        "executedPercent": "0.00000000",
        "executedAvgPrice": "0.00000000",
        "fee": "0.00000000",
        "status": 1,
        "type": 0,
        "createTime": 1554722699
    }
  }
  ```
  
  ```json test:Test url: /api/v1/order method: GET
  {}
  ```
  :::  


### `/api/v1/orders/open`

获取Pending(挂单中)状态的订单

* **Method**: `GET` 

* **Parameters**

  |Name|Located In|Description|Required|Schema|
  |:--|:--|:---|:---|:--:|
  |address|query|start with `0`; default `0`|yes|string|
  |quoteTokenSymbol|query|the `symbol` of quote token|no|string|
  |tradeTokenSymbol|query|the `symbol` of trade token|no|string|
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
          "orderId": "quEOx/ai3o7Xyv9em+qJIbJu7pM=",
          "symbol": "VCP-4_VITE",
          "tradeTokenSymbol": "VCP.test",
          "quoteTokenSymbol": "VITE",
          "tradeToken": "tti_c2695839043cf966f370ac84",
          "quoteToken": "tti_5649544520544f4b454e6e40",
          "side": 1,
          "price": "6.00000000",
          "quantity": "1.00000000",
          "amount": "6.00000000",
          "executedQuantity": "0.00000000",
          "executedAmount": "0.00000000",
          "executedPercent": "0.00000000",
          "executedAvgPrice": "0.00000000",
          "fee": "0.00000000",
          "status": 1,
          "type": 0,
          "createTime": 1554722699
        }
      ],
      "total": 13
    }
  }
  ```
  
  ```json test:Test url: /api/v1/orders/open?address=vite_ff38174de69ddc63b2e05402e5c67c356d7d17e819a0ffadee method: GET
  {}
  ```
  :::

### `/api/v1/orders`

获取订单列表

* **Method**: `GET` 

* **Parameters**

  |Name|Located In|Description|Required|Schema|
  |:--|:--|:---|:---|:--:|
  |address|query|the buyer/seller address|yes|string|
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
          "orderId": "ZDFDKEcwCs2BVs8fE8vULzb10/g=",
          "symbol": "CSTT-47E_VITE",
          "tradeTokenSymbol": "CSTT.test",
          "quoteTokenSymbol": "VITE",
          "tradeToken": "tti_b6f7019878fdfb21908a1547",
          "quoteToken": "tti_5649544520544f4b454e6e40",
          "side": 0,
          "price": "1.00000000",
          "quantity": "118222.20000000",
          "amount": "118222.20000000",
          "executedQuantity": "0.00000000",
          "executedAmount": "0.00000000",
          "executedPercent": "0.00000000",
          "executedAvgPrice": "0.00000000",
          "fee": "0.00000000",
          "status": 4,
          "type": 0,
          "createTime": 1554702092
        }
      ],
      "total": 1215
    }
  }
  ```
  
  ```json test:Test url: /api/v1/orders?address=vite_ff38174de69ddc63b2e05402e5c67c356d7d17e819a0ffadee method: GET
  {}
  ```
  :::

### `/api/v1/ticker/24hr`

获取ticker的24小时价格变化统计信息

* **Method**: `GET` 

* **Parameters**

  |Name|Located In|Description|Required|Schema|
  |:--|:--|:---|:---|:--:|
  |symbols|query|market pair symbols; split by `,`; e.g. `ABC-000_VITE,ABC-001_VITE`|no|string|
  |quoteTokenSymbol|query|the `symbol` of quote token|no|string|
  |quoteTokenCategory|query|the `catetory` of quote token,e.g. [`VITE`,`ETH`,`BTC`,`USDT`]|no|string|

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


### `/api/v1/ticker/bookTicker`

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
  
### `/api/v1/trades`

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
      "trade": [
        {
          "tradeId": "4EOgUqsCyZ73O4+A2gZuK9RfOXs=",
          "symbol": "VTT-F_ETH",
          "tradeTokenSymbol": "VTT",
          "quoteTokenSymbol": "ETH",
          "tradeToken": "tti_2736f320d7ed1c2871af1d9d",
          "quoteToken": "tti_06822f8d096ecdf9356b666c",
          "price": "0.10000000",
          "quantity": "1.00000000",
          "amount": "0.10000000",
          "time": 1554793244,
          "side": 0,
          "buyerOrderId": "DqpoIXTCT+4s1rMBFVCoWY9iDys=",
          "sellerOrderId": "FB4eiknqAQpIEOYi+HgamZOj/ac=",
          "buyFee": "0.00010000",
          "sellFee": "0.00010000",
          "blockHeight": 2806
        }
      ],
      "total": 1
    }
  }
  ```
  
  ```json test:Test url: /api/v1/trades?symbol=BTC-000_VITE-000 method: GET
  {}
  ```
  :::
  
### `/api/v1/depth`

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

### `/api/v1/klines`

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
  
### `/api/v1/deposit-withdraw`

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
  
### `/api/v1/exchange-rate`

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

### `/api/v1/usd-cny`

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

### `/api/v1/time`

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

## WS接入文档
### 1. 环境地址：
* 【Pre-mainnet】wss://vitex.vite.net/websocket
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
