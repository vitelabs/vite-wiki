---
demoUrl: "https://vitex.vite.net/test"
---

# ViteX API

## Network

* **Mainnet**: https://vitex.vite.net/

* **Test**: https://vitex.vite.net/test

## ViteX Private API
### Summary
ViteX REST API is a central service provided by Vite Labs, running on ViteX decentralized exchange. 
Users can set/cancel/query orders through the service without giving out private keys. 

* Trading is done by Vite Labs trading engine on behalf of you by providing **API Key** and **API Secret**. 
Your fund is safe in your exchange's account and cannot be misappropriated. 
* You must authorize to enable the service on trading pair explicitly. 
Trading service is inactivated without authorization. 
* You can cancel authorization at any time. 
* Orders set by trading service are not signed by your private key. 
Therefore, you cannot query the orders by your address. 

### Authorization on Trading Pair
In order to use ViteX REST API, authorization is required. 

It's highly recommended to authorize only on the specific trading pairs that you need to turn trading service on. Private keys are not required. DO NOT give private key to anyone including Vite Labs. 

Trading service engine will apply a unique address for each user to make the orders. It's your responsibility to provide necessary quota for the address by staking. Forgetting to stake may cause trading failure on the address.

### API Authorization
ViteX has 2 category of APIs - public and private. The latter requires authorization by providing **API Key** and **API Secret**.

At the time being, you should contact marketing representative of Vite Labs to get your API key and secret (case sensitive).

Please note besides normal API parameters, 3 additional parameters `key`, `timestamp` and `signature` should be specified. 

* `key` - Your **API Key**
* `timestamp` - UNIX-style timestamp in epoch millisecond format, like 565360340430. The API call will be regarded invalid if the timestamp in request is 5,000 ms earlier or 1,000 ms later than standard time to avoid replay attack.  
* `signature` - HMAC SHA256 signature on parameter string by feeding **API Secret** as encryption key

Timestamp checking:

```
    if (timestamp < (serverTime + 1000) && (serverTime - timestamp) <= 2000) {
        // process request
    } else {
        // reject request
    }
```

### Return Value
API response is returned in JSON string. 

HTTP code:

* HTTP `200` API returned successfully
* HTTP `4XX` Wrong API request
* HTTP `5XX` Service error

JSON format:

Key | Value
------------ | ------------
code | `0` - success. Error code returned if request failed
msg | Error message
data | Return data

Example:
```javascript
{
  "code": 1,
  "msg": "Invalid symbol",
  "data": {}
}
```

Error code: 

* `1001` Too frequent request - Request frequency exceeds limit. 
* `1002` Invalid parameter - This includes invalid timestamp, wrong order price format, invalid order amount, too small order, invalid market, insufficient permission, symbol not exist
* `1003` Network - includes network jam, network failure, insufficient quota
* `1004` Other failure - includes attempting to cancel order belonging to other address, attempting to cancel order unable to cancel, order status querying exception
* `1005` Server error - Trading service error


### Trigger Limit
The counter is reset in every counting period (60s). In each period, API request would fail if trigger limit is reached.  

### Signature of Request String

* List all parameters (parameter and API key) in alphabet order;
* Generate normalized request string by concatenating parameter name and value with `=` and name-value pairs with `&`;
* Sign the request string by HMAC SHA256 signature algorithm, as the encryption key is API secret;
* Signature is case in-sensitive;
* Signature is also required to pass in API in `signature` field;
* When both request string and request body are present, put request string in ahead of request body to produce signature.

### Example

Let's take API `/api/v1/order` as example. Assume we have the following API key/secret:

API Key | API Secret
------------ | ------------
11111111 | 22222222

We place an order on market ETH-000_BTC-000 to buy 10 ETH at price 0.09 BTC. The request has the following parameters:

Key | Value
------------ | ------------
symbol | ETH-000_BTC-000
side | 0
amount | 10
price | 0.09
timestamp | 1567067137937

The ordered request string is:

`amount=10&key=11111111&price=0.09&side=0&symbol=ETH-000_BTC-000&timestamp=1567755178560`

Create signature:

    ```
    $ echo -n "amount=10&key=11111111&price=0.09&side=0&symbol=ETH-000_BTC-000&timestamp=1567755178560" | openssl dgst -sha256 -hmac "22222222"
    (stdin)= 409cf00bb97c08ae99317af26b379ac59f4cfaba9591df7738c0604a4cb68b9a
    ```

Make the API call:

    ```
    $ curl -X POST -d "amount=10&key=11111111&price=0.09&side=0&symbol=ETH-000_BTC-000&timestamp=1567755178560&signature=409cf00bb97c08ae99317af26b379ac59f4cfaba9591df7738c0604a4cb68b9a" https://api.vitex.net/api/v1/order
    ```

### Data Definition
#### Order Status
Code | Status | Description
------------ | ------------ | ------------
1 | Open| Order unfilled or partially filled
2 | Filled | Order filled
3 | Cancelled | Order cancelled
4 | Filled | Order filled

#### Order SubStatus
Code | Status | Description
------------ | ------------ | ------------
0 | Unknown | Status unknown
1 | Pending Request| Order submitted. A corresponding request transaction has been created on chain
2 | Received | Order received
3 | Open | Order unfilled
4 | Filled | Order filled
5 | Partially Filled | Order partially filled
6 | Pending Cancel | Cancel order request submitted. A corresponding request transaction has been created on chain
7 | Cancelled | Order cancelled
8 | Partially Cancelled| Order partially cancelled (the order was partially filled)
9 | Failed | Request failed
10 | Expired | Order expired

#### Order Type

Code | Status | Description
------------ | ------------ | ------------
0 | Limit Order | Limit Order
1 | Market Order | Market Order (not supported yet)

#### Order Side

Code | Status | Description
------------ | ------------ | ------------
0 | Buy Order | Buy
1 | Sell Order | Sell

#### Time in Force

Code | Status | Description
------------ | ------------ | ------------
0 | GTC - Good till Cancel | Order valid until it is fully filled or cancelled
1 | IOC - Immediate or Cancel | Place an order and cancel the unfilled part if any (not supported yet)
2 | FOK - Fill or Kill | Place an order only if it can be fully filled (not supported yet)

### Place Order (test)
```
POST /api/v1/order/test
```
This API can be used to verify signature

**Quota consumption:**
0 UT

**Parameter:**

Name | Type | Is Required? | Description
------------ | ------------ | ------------ | ------------
symbol | STRING | YES | Trading pair name. For example, "ETH-000_BTC-000"
amount | STRING | YES | Order amount (in trade token)
price | STRING | YES | Order price
side | INT | YES | Buy - `0`, Sell - `1`
timestamp | LONG | YES | Timestamp (client side)
key | STRING | YES | API Key
signature | STRING | YES | HMAC SHA256 signature

**Response:**
None

```javascript
{
  "code": 0,
  "msg": "ok",   
  "data": null
}
```


### Place Order
```
POST /api/v1/order
```

**Quota consumption:**
1 UT

**Parameter:**

Name | Type | Is Required? | Description
------------ | ------------ | ------------ | ------------
symbol | STRING | YES | Trading pair name. For example, "ETH-000_BTC-000"
amount | STRING | YES | Order amount (in trade token)
price | STRING | YES | Order price
side | INT | YES | Buy - `0`, Sell - `1`
timestamp | LONG | YES | Timestamp (client side)
key | STRING | YES | API Key
signature | STRING | YES | HMAC SHA256 signature

**Response:**

Name | Type | Description
------------ | ------------ | ------------
symbol | STRING | Trading pair name
orderId | STRING | Order ID

```javascript
{
  "code": 0,
  "msg": "ok",
  "data": {
    "symbol": "VX_ETH-000",
    "orderId": "c35dd9868ea761b22fc76ba35cf8357db212736ecb56399523126c515113f19d",
    "subStatus": 1
  }
}
```
### Cancel Order
```
DELETE /api/v1/order
```
Cancel order by given order ID. Please note this API initiates a cancel request, it doesn't guarantee the order will be cancelled eventually

**Quota consumption:**
1 UT

**Parameter:**

Name | Type | Is Required? | Description
------------ | ------------ | ------------ | ------------
symbol | STRING | YES | Trading pair name. For example, "ETH-000_BTC-000"
orderId | STRING | YES | Order ID
timestamp | LONG | YES | Timestamp (client side)
key | STRING | YES | API Key
signature | STRING | YES | HMAC SHA256 signature

**Response:**

Name | Type | Description
------------ | ------------ | ------------
symbol | STRING | Trading pair name
orderId | STRING | Order ID
cancelRequest | STRING | Cancel request ID

```javascript
{
  "code": 0,
  "msg": "ok",
  "data": {
    "symbol": "VX_ETH-000",
    "orderId": "c35dd9868ea761b22fc76ba35cf8357db212736ecb56399523126c515113f19d",
    "cancelRequest": "2d015156738071709b11e8d6fa5a700c2fd30b28d53aa6160fd2ac2e573c7595",
    "subStatus": 6
  }
}
```

### Cancel Orders
```
DELETE /api/v1/orders
```

Cancel all orders under given trading pair. Please note this API initiates a number of cancel requests, it doesn't guarantee the orders will be cancelled eventually

**Quota consumption:**
N UT(N=Order Number)

**Parameters:**

Name | Type | Is Required? | Description
------------ | ------------ | ------------ | ------------
symbol | STRING | YES | Trading pair name. For example, "ETH-000_BTC-000"
timestamp | LONG | YES | Timestamp (client side)
key | STRING | YES | API Key
signature | STRING | YES | HMAC SHA256 signature

**Response:**

Name | Type | Description
------------ | ------------ | ------------
symbol | STRING | Trading pair name
orderId | STRING | Order ID
cancelRequest | STRING | Cancel request ID

```javascript
{
  "code": 0,
  "msg": "ok",
  "data": [
    {
      "symbol": "VX_ETH-000",
      "orderId": "de185edae25a60dff421c1be23ac298b121cb8bebeff2ecb25807ce7d72cf622",
      "cancelRequest": "355b6fab007d86e7ff09b0793fbb205e82d3880b64d948ed46f88237115349ab",
      "subStatus": 6
    },
    {
      "symbol": "VX_ETH-000",
      "orderId": "7e079d4664791207e082c0fbeee7b254f2a31e87e1cff9ba18c5faaeee3d400a",
      "cancelRequest": "55b80fe42c41fa91f675c04a8423afa85857cd30c0f8878d52773f7096bfac3b",
      "subStatus": 6
    }
  ]
}
```

## ViteX Public API

### Limit
```
/api/v1/limit
```

Get minimum order quantity for all 4 markets

* **Method**: `GET`

* **Responses**

  |code|msg|data|
  |:--|:--|:--:|
  |0|success|`Limit`|
  |1|error_msg|null|

* **Example**

  :::demo
  ```json test:Run url: /api/v1/limit method: GET
  {}
  ```
  :::

### All tokens
```
/api/v1/tokens
```

Get tokens list

* **Method**: `GET` 

* **Parameters**

  |Name|Located In|Description|Required|Schema|
  |:--|:--|:---|:---|:--:|
  |category|query|Default `all`. Allowed value: [`quote`,`all`]|no|string|
  |tokenSymbolLike|query|Token symbol. Example: `ETH`|no|string|
  |offset|query|Starting with `0`. Default `0`|no|integer|
  |limit|query|Default `500`. Max `500`|no|integer|

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
  
  ```json test:Run url: /api/v1/tokens method: GET
  {}
  ```
  :::

### Token detail
```
/api/v1/token/detail
```

Get token information

* **Method**: `GET` 

* **Parameters**

  |Name|Located In|Description|Required|Schema|
  |:--|:--|:---|:---|:--:|
  |tokenSymbol|query|Token symbol. Example: `VITE`|no|string|
  |tokenId|query|Token Id. Example: `tti_5649544520544f4b454e6e40`|no|string|

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
  
  ```json test:Run url: /api/v1/token/detail?tokenId=tti_5649544520544f4b454e6e40 method: GET
  {}
  ```
  :::
  
### Mapped tokens
```
/api/v1/token/mapped
```

Get a list of tokens have opened trading pair(s)

* **Method**: `GET` 

* **Parameters**

  |Name|Located In|Description|Required|Schema|
  |:--|:--|:---|:---|:--:|
  |quoteTokenSymbol|query|Token symbol. Example: `VITE` |yes|string|

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
  
  ```json test:Run url: /api/v1/token/mapped?quoteTokenSymbol=VITE method: GET
  {}
  ```
  :::
  
### Unmapped tokens
```
/api/v1/token/unmapped
```

Get a list of tokens haven't opened any trading pair

* **Method**: `GET` 

* **Parameters**

  |Name|Located In|Description|Required|Schema|
  |:--|:--|:---|:---|:--:|
  |quoteTokenSymbol|query|Token symbol. Example: `VITE`|yes|string|

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
  
  ```json test:Run url: /api/v1/token/unmapped?quoteTokenSymbol=VITE method: GET
  {}
  ```
  :::
  
### Markets
```
/api/v1/markets
```

Get market pairs

* **Method**: `GET` 

* **Parameters**

  |Name|Located In|Description|Required|Schema|
  |:--|:--|:---|:---|:--:|
  |offset|query|Starting with `0`. Default `0`|no|integer|
  |limit|query|Default `500`. Max `500`|no|integer|

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
  

### Query order
```
/api/v1/order
```

Get an order for a given address and order id

* **Method**: `GET` 

* **Parameters**

  |Name|Located In|Description|Required|Schema|
  |:--|:--|:---|:---|:--:|
  |address|query|the buyer/seller address|yes|string|
  |orderId|query|the order id|no|string|
  |orderHash|query|the order hash|no|string|
  orderId or orderHash must select one

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
        "orderId": "000007010000000000000d970100005e70805e0000b8",
        "orderHash": "0dfbafac33fbccf5c65d44d5d80ca0b73bc82ae0bbbe8a4d0ce536d340738e93",
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
        "status": 1,
        "subStatus": 5,
        "type": 0,
        "createTime": 1586941713
      }
    }
  ```
  
  ```json test:Run url: /api/v1/order method: GET
  {}
  ```
  :::  

### Query open orders
```
/api/v1/orders/open
```

Get open orders for a given address

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
            "orderId": "000007010000000000000d970100005e70805e0000b8",
            "orderHash": "0dfbafac33fbccf5c65d44d5d80ca0b73bc82ae0bbbe8a4d0ce536d340738e93",
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
            "status": 1,
            "subStatus": 5,
            "type": 0,
            "createTime": 1586941713
          }
        ],
        "total": -1
      }
    }
  ```
  
  ```json test:Run url: /api/v1/orders/open?address=vite_ff38174de69ddc63b2e05402e5c67c356d7d17e819a0ffadee method: GET
  {}
  ```
  :::

### Query orders
```
/api/v1/orders
```

Get orders list for a given address 

* **Method**: `GET` 

* **Parameters**

  |Name|Located In|Description|Required|Schema|
  |:--|:--|:---|:---|:--:|
  |address|query|The buyer/seller address|yes|string|
  |symbol|query|market pair symbol. e.g. `ABC-000_VITE`|no|string|
  |quoteTokenSymbol|query|Symbol of quote token|no|string|
  |tradeTokenSymbol|query|Symbol of trade token|no|string|
  |startTime|query|Start time in Seconds|no|long|
  |endTime|query|End time in Seconds|no|long|
  |side|query|Order side. Allowed value: [`0`:buy, `1`:sell]|no|integer|
  |status|query|Order status list. Allowed value: [`1`:open, `2`:closed, `3`:canceled, `4`:failed]|no|integer|
  |offset|query|Starting with `0`. Default `0`|no|integer|
  |limit|query|Default `30`. Max value `100`|no|integer|
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
            "orderId": "000007010000000000000d970100005e70805e0000b8",
            "orderHash": "0dfbafac33fbccf5c65d44d5d80ca0b73bc82ae0bbbe8a4d0ce536d340738e93",
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
            "status": 1,
            "subStatus": 5,
            "type": 0,
            "createTime": 1586941713
          }
        ],
        "total": -1
      }
    }
  ```
  
  ```json test:Run url: /api/v1/orders?address=vite_ff38174de69ddc63b2e05402e5c67c356d7d17e819a0ffadee method: GET
  {}
  ```
  :::

### 24Ticker
```
/api/v1/ticker/24hr
```

Get 24-hour price change statistics for a given market pair

* **Method**: `GET` 

* **Parameters**

  |Name|Located In|Description|Required|Schema|
  |:--|:--|:---|:---|:--:|
  |symbols|query|Market pair split by `,`. Example: `ABC-000_VITE, ABC-001_VITE`|no|string|
  |quoteTokenSymbol|query|Symbol of quote token|no|string|
  |quoteTokenCategory|query|The category of quote token. Allowed value: [`VITE`,`ETH`,`BTC`,`USDT`]|no|string|
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
  
  ```json test:Run url: /api/v1/ticker/24hr?quoteTokenSymbol=VITE method: GET
  {}
  ```
  :::


### BookTicker
```
/api/v1/ticker/bookTicker
```

Get the best bid/ask price for a given market pair

* **Method**: `GET` 

* **Parameters**

  |Name|Located In|Description|Required|Schema|
  |:--|:--|:---|:---|:--:|
  |symbol|query|Market pair. Example: `ABC-000_VITE`|yes|string|

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
  
  ```json test:Run url: /api/v1/ticker/bookTicker?symbol=BTC-000_VITE-000 method: GET
  {}
  ```
  :::
  
### Trade
```
/api/v1/trades
```

Get a list of historical trades for a given market pair

* **Method**: `GET` 

* **Parameters**

  |Name|Located In|Description|Required|Schema|
  |:--|:--|:---|:---|:--:|
  |symbol|query|Market pair. Example: `BTC-000_VITE`|yes|string|
  |orderId|query|Order id|no|string|
  |startTime|query|Start time in Seconds|no|long|
  |endTime|query|End time in Seconds|no|long|
  |side|query|Order side. Allowed value: [`0`:buy, `1`:sell].|no|integer|
  |offset|query|Starting with `0`. Default `0`.|no|integer|
  |limit|query|Default `30`. Max `100`.|no|integer|
  |total|query|Total number required. `0` for not required and `1` for required. Default is not required and will return total=-1 in response|no|integer|

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
          "buyerOrderId": "00000700fffffffffffff268feff005e70805e0000bb",
          "sellerOrderId": "000007010000000000000d970100005e70805e0000b8",
          "buyFee": "0.00000000",
          "sellFee": "0.00000000",
          "blockHeight": 260
        }
      ],
      "total": -1
    }
  }
  ```
  
  ```json test:Run url: /api/v1/trades?symbol=BTC-000_VITE-000 method: GET
  {}
  ```
  :::
  
### Depth
```
/api/v1/depth
```

Get the order book depth data for a given market pair

* **Method**: `GET` 

* **Parameters**

  |Name|Located In|Description|Required|Schema|
  |:--|:--|:---|:---|:--:|
  |symbol|query|Market pair. Example: `CSTT-47E_VITE`|yes|string|
  |limit|query|Default `100`. Max `100`|no|integer|

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
  
  ```json test:Run url: /api/v1/depth?symbol=BTC-000_VITE-000 method: GET
  {}
  ```
  :::

### KLine
```
/api/v1/klines
```

Get kline bars for a given market pair

* **Method**: `GET` 

* **Parameters**

  |Name|Located In|Description|Required|Schema|
  |:--|:--|:---|:---|:--:|
  |symbol|query|Market pair. Example: `CSTT-47E_VITE`|yes|string|
  |interval|query|Interval. Allowed value: [`minute`、`hour`、`day`、`minute30`、`hour6`、`hour12`、`week`]|yes|string|
  |limit|query|Default `500`. Max `1500`|no|integer|
  |startTime|query|Start time in Seconds|no|integer|
  |endTime|query|End time in Seconds.|no|integer|

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
  
  ```json test:Run url: /api/v1/klines?symbol=BTC-000_VITE-000&interval=minute method: GET
  {}
  ```
  :::
  
### Deposit & Withdraw records
```
/api/v1/deposit-withdraw
```

Get historical deposit/withdraw records for a given address

* **Method**: `GET` 

* **Parameters**

  |Name|Located In|Description|Required|Schema|
  |:--|:--|:---|:---|:--:|
  |address|query|The buyer/seller address|yes|string|
  |tokenId|query|Token id|yes|string|
  |offset|query|Starting with `0`. Default `0`|no|integer|
  |limit|query|Default `100`. Max `100`|no|integer|

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
  
  ```json test:Run url: /api/v1/deposit-withdraw?address=vite_ff38174de69ddc63b2e05402e5c67c356d7d17e819a0ffadee&tokenId=tti_5649544520544f4b454e6e40 method: GET
  {}
  ```
  :::
  
### Exchange-rate
```
/api/v1/exchange-rate
```

Get cryptocurrency rates

* **Method**: `GET` 

* **Parameters**

  |Name|Located In|Description|Required|Schema|
  |:--|:--|:---|:---|:--:|
  |tokenSymbols|query|Token symbols split by `,`. Example: `VITE, ETH`|no|string|
  |tokenIds|query|Token ids split by `,`. Example: `tti_5649544520544f4b454e6e40,tti_5649544520544f4b454e6e40`|no|string|

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
  
  ```json test:Run url: /api/v1/exchange-rate?tokenIds=tti_5649544520544f4b454e6e40 method: GET
  {}
  ```
  :::  

### Usd-cny
```
/api/v1/usd-cny
```

Get currency exchange rate of USD/CNY

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
  
  ```json test:Run url: /api/v1/usd-cny method: GET
  {}
  ```
  ::: 

### Server time
```
/api/v1/time
```

Get the current time in milliseconds according to the HTTP service

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
  
  ```json test:Run url: /api/v1/time method: GET
  {}
  ```
  ::: 

### Balance
```
/api/v1/balance
```
Get account's exchange balance in exchange

* **Method**: `GET` 

**Quota consumption:**
0 UT

**Parameters:**

Name | Type | Is Required? | Description
------------ | ------------ | ------------ | ------------
timestamp | LONG | YES | Timestamp (client side)
key | STRING | YES | API Key
signature | STRING | YES | HMAC SHA256 signature

**Response:**

Name | Type | Description
------------ | ------------ | ------------
available | STRING | Balance available
locked | STRING | Balance locked (by order)


```javascript
{
    "code": 0,
    "msg": "ok",
    "data": {
        "VX": {
            "available": "0.00000000",
            "locked": "0.00000000"
        },
        "BTC-000": {
            "available": "0.02597393",
            "locked": "0.13721639"
        }
    }
}
```

## WebSocket
### 1. Network
* **Mainnet**: wss://vitex.vite.net/websocket

* **Testnet**: wss://vitex.vite.net/test/websocket

* op_type: The `ping` heartbeat message needs to be sent at least once per minute. If the interval exceeds 1 minute, the registered event will expire.


### 2. Protocol Model
```
syntax = "proto3";

package protocol;

option java_package = "org.vite.data.dex.bean.protocol";
option java_outer_classname = "DexProto";

message DexProtocol {
    string client_id = 1; // Identify a single client
    string topics = 2; // See below
    string op_type = 3; // sub,un_sub,ping,pong,push
    bytes message = 4; // See proto data
    int32 error_code = 5; // Error code. 0:normal, 1:illegal_client_id, 2:illegal_event_key, 3:illegal_op_type, 5:visit limit
}

```
### 3. Definition of op_type  
* sub: subscription
* un_sub: un-subscription
* ping: heartbeat message sent every 10 seconds to validate client_id
* pong: server-side acknowledgement
* push: push data to client


### 4. Definition of Topic

Multiple topics can be subscribed to by `topic_1, topic2, ...`

|Topic|Description| Message Model|
|:--|:--|:--:|
|`order.$address`|Order update| See `OrderProto`|
|`market.$symbol.depth`|Depth data update| See `DepthListProto`|
|`market.$symbol.trade`|Trade data update| See `TradeListProto`|
|`market.$symbol.tickers`|Market pair statistics update|See `TickerStatisticsProto`|
|`market.quoteToken.$symbol.tickers`|Quote token statistics update|See `TickerStatisticsProto`|
|`market.quoteTokenCategory.VITE.tickers`|Quote token category statistics update|See `TickerStatisticsProto`|
|`market.quoteTokenCategory.ETH.tickers`|Quote token category statistics update|See `TickerStatisticsProto`|
|`market.quoteTokenCategory.USDT.tickers`|Quote token category statistics update|See `TickerStatisticsProto`|
|`market.quoteTokenCategory.BTC.tickers`|Quote token category statistics update|See `TickerStatisticsProto`|
|`market.$symbol.kline.minute`|1-minute kline update|See `KlineProto`|
|`market.$symbol.kline.minute30`|30-minute kline update|See `KlineProto`|
|`market.$symbol.kline.hour`|1-hour kline update|See `KlineProto`|
|`market.$symbol.kline.day`|1-day kline update|See `KlineProto`|
|`market.$symbol.kline.week`|1-week kline update|See `KlineProto`|
|`market.$symbol.kline.hour6`|6-hour kline update|See `KlineProto`|
|`market.$symbol.kline.hour12`|12-hour kline update|See `KlineProto`|


###  5. Message Model
```
syntax = "proto3";
option java_package = "org.vite.data.dex.bean.proto";
option java_outer_classname = "DexPushMessage";


message TickerStatisticsProto {

    //symbol
    string symbol = 1;
    //trade token symbol
    string tradeTokenSymbol = 2;
    //quote token symbol
    string quoteTokenSymbol = 3;
    //trade tokenId
    string tradeToken = 4;
    //quote tokenId
    string quoteToken = 5;
    //opening price
    string openPrice = 6;
    //previous closing price
    string prevClosePrice = 7;
    //closing price
    string closePrice = 8;
    //price change
    string priceChange = 9;
    //price change percentage
    string priceChangePercent = 10;
    //highest price
    string highPrice = 11;
    //lowest price
    string lowPrice = 12;
    //trading volumn
    string quantity = 13;
    //turnover
    string amount = 14;
    //price precision
    int32 pricePrecision = 15;
    //quantity precision
    int32 quantityPrecision = 16;
}


message TradeListProto {
    repeated TradeProto trade = 1;
}

message TradeProto {

    string tradeId = 1;
    //symbol
    string symbol = 2;
    //trade token symbol
    string tradeTokenSymbol = 3;
    //quote token symbol
    string quoteTokenSymbol = 4;
    //trade tokenId
    string tradeToken = 5;
    //quote tokenId
    string quoteToken = 6;
    //price
    string price = 7;
    //trading volumn
    string quantity = 8;
    //turnover
    string amount = 9;
    //time
    int64 time = 10;
    //side
    int32 side = 11;
    //buy order Id
    string buyerOrderId = 12;
    //sell order Id
    string sellerOrderId = 13;
    //buyer fee
    string buyFee = 14;
    //seller fee
    string sellFee = 15;
    //block height
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

    //order ID
    string orderId = 1;
    //symbol
    string symbol = 2;
    //trade token symbol
    string tradeTokenSymbol = 3;
    //quote token symbol
    string quoteTokenSymbol = 4;
    //trade tokenId
    string tradeToken = 5;
    //quote tokenId
    string quoteToken = 6;
    //side
    int32 side = 7;
    //price
    string price = 8;
    //order quantity
    string quantity = 9;
    //order amount
    string amount = 10;
    //filled quantity
    string executedQuantity = 11;
    //filled amount
    string executedAmount = 12;
    //turnover rate
    string executedPercent = 13;
    //average price
    string executedAvgPrice = 14;
    //trading fee
    string fee = 15;
    //order status
    int32 status = 16;
    //order type
    int32 type = 17;
    //creation time
    int64 createTime = 18;
    //address
    string address = 19;
}

message DepthListProto {

    repeated DepthProto asks = 1;

    repeated DepthProto bids = 2;
}

message DepthProto {
    //price
    string price = 1;
    //quantity
    string quantity = 2;
    //amount
    string amount = 3;
}
```
