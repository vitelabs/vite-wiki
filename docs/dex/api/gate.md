# ViteX Gateway Technical Specification

:::tip Introduction
This specification describes the API interface that 3rd party gateways need to implement for plugging into ViteX. 
It has been fully supported by [Vite Web Wallet](https://github.com/vitelabs/vite-web-wallet).

For how to integrate the gateway in wallet, please see [Gateway Plug-in Tutorial](../operation/gate-integration.md)
:::

:::warning Attention
* HTTPS is required
* CORS (Cross-Origin Resource Sharing) must be supported
* Transfer amount should be expressed in minimum precision
:::

## Request

### header
The following parameter(s) are appended in request header from Vite web wallet
  |Name|Description|
  |:--|:--|
  |lang|The wallet will pass the current locale, and the gateway should handle it to provide i18n support.<br>`zh-cn`(Chinese simplified) and `en`(English) are currently supported in the wallet.|
  |version|The spec version number(s) currently supported by the web wallet, split by `,`|
  
## Response

### header
The following parameter(s) should be appended in response header from gateway
  |Name|Description|
  |:--|:--|
  |version|The spec version number(s) currently supported by the gateway, split by `,`|
  
### body
```javascript
{
  "code": 0,//response code
  "subCode": 0,//sub code filled in by gateway for debugging
  "msg": null,//additional message filled in by gateway for debugging
  "data":""//response data
}
```
## Metadata API

### `/meta-info`

Get gateway information by token id

* **Method**: `GET`

* **Request**: `query string`

  |Name|Description|Data Type|Required|
  |:--|:---|:---:|:---:|
  |tokenId|Token id|string|true|
  
* **Response**

  |Name|Description|Data Type|Required|
  |:--|:---|:---:|:---:|
  |type|Binding type. Allowed value: <br>`0`Independent address mode<br>`1`Bind-by-comment mode|int|true|
  |depositState|Deposit channel state. Allowed value: `OPEN`, `MAINTAIN`, `CLOSED`|string|true|
  |withdrawState|Withdraw channel state. Allowed value: `OPEN`, `MAINTAIN`, `CLOSED`|string|true|

:::tip Binding Types
The web wallet needs use binding types to render different deposit/withdraw UI(s) and build different requests, while the gateway needs use it to return different responses. 
At the time being the following two types have been defined:
* `0` Independent address mode: In this mode, the gateway will bind a separate inbound address to each user's Vite address. Examples of this type are BTC and ETH<br>
* `1` Bind-by-comment mode: In this mode, the gateway cannot bind separate inbound address to each user's Vite address, so that it is necessary to identify the user's VITE address with additional comment. Examples of this type are EOS and XMR
:::

* **Example**

  ***Request***
    ```
    /meta-info?tokenId=tti_82b16ac306f0d98bf9ccf7e7
    ```
  ***Response***
    ```javascript
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

## Deposit/Withdraw API

### `/deposit-info`

Get deposit information by token id and user's Vite address. 
The gateway should bind user's Vite address to a source chain address, and the web wallet will display a deposit page based on gateway's response.

* **Method**: `GET`

* **Request**: `query string`

  |Name|Description|Data Type|Required|
  |:--|:---|:---:|:---:|
  |tokenId|Gateway token id|string|true|
  |walletAddress|User's Vite address|string|true|
  
* **Response**

	|Name|Description|Data Type|Required|
	|:--|:---|:---:|:---:|
	|depositAddress|Deposit address|string|true|
	|labelName|Label name, required if type=1|string|false|
	|label|Label value, required if type=1|string|false|
	|minimumDepositAmount|Minimum deposit amount|string|true|
	|confirmationCount|Confirmations on source chain|int|true|
	|noticeMsg|Extra message filled in by gateway|string|false|

* **Example**

  ***Request***
    ```
    /deposit-info?tokenId=tti_82b16ac306f0d98bf9ccf7e7&walletAddress=vite_52ea0d88812350817df9fb415443f865e5cf4d3fddc9931dd9
    ```
  ***Response***
  
  According to binding type:
  :::: tabs
  
  ::: tab 0:Independent-address
    By binding a BTC deposit address to user's Vite address, one deposit address is sufficient.
  ```javascript
    {
      "code": 0,
      "subCode": 0,
      "msg": null,
      "data": {
        "depositAddress": "mrkRBVtsd96oqHLELaDtCYWzcxUr7s4D26",
        "minimumDepositAmount": "30000",
        "confirmationCount": 2,
        "noticeMsg": ""
      }
    }
  ```
  :::
  
  ::: tab 1:Bind-by-comment
    A label `memo` and corresponding value are used to mark user's Vite address when depositing EOS. User's Vite address is stored in `label`.
    
    As `memo` is used in EOS gateway, similarly, `paymentID` can be used for XMR. The 3rd party gateways can define their own `labelName`.
  ```javascript
    {
      "code": 0,
      "subCode": 0,
      "msg": null,
      "data": {
        "depositAddress": "viteeosgateway",
        "labelName": "memo",
        "label": "vite_52ea0d88812350817df9fb415443f865e5cf4d3fddc9931dd9",
        "minimumDepositAmount": "30000",
        "confirmationCount": 1,
        "noticeMsg": ""
      }
    }
  ```
  :::
  ::::

:::tip Deposit Process
1. The gateway establishes the binding relationship between the **user's VITE address** and the **source chain deposit address**.
2. The gateway listens to the source chain transactions on the deposit address and waits for necessary confirmations.
3. After the gateway confirms the deposit transaction on the source chain, it initiates a transfer transaction to send the same amount of gateway tokens to user's Vite address on Vite chain.
4. The gateway listens to the transfer transaction on Vite. In case the transaction is not finally confirmed, it needs to be resent.
:::

### `/withdraw-info`

获取转出信息。如最小转出金额，TOT回收地址等。Web Wallet根据响应展示跨链转出界面。

* **Method**: `GET`

* **Request**: `query string`

|参数名|描述|数据类型|是否必传|
|:--|:---|:---:|:---:|
|tokenId|TOT id|string|true|
|walletAddress|用户VITE地址|string|true|
  
  
* **Response**

|参数名|描述|数据类型|是否必传|
|:--|:---|:---:|:---:|
|minimumWithdrawAmount|最小实际到账转出金额|string|true|
|maximumWithdrawAmount|最大实际到账转出金额|string|true|
|gatewayAddress|网关地址，web钱包会签名一个以该地址为目标地址的TOT回收交易，用于回收TOT|string|true|
|noticeMsg|注意事项描述，网关自行定义|string|false|
  

* **Example**

  ***Request***
    ```
    /withdraw-info?tokenId=tti_82b16ac306f0d98bf9ccf7e7&walletAddress=vite_52ea0d88812350817df9fb415443f865e5cf4d3fddc9931dd9
    ```
  ***Response***
    ```javascript
    {
      "code": 0,
      "subCode": 0,
      "msg": null,
      "data": {
        "minimumWithdrawAmount": "1000000",
        "maximumWithdrawAmount": "10000000000",
        "gatewayAddress": "vite_42f9a5d93e1e392624b97dfa3d7cab057b79c2489d6bc13682",
        "noticeMsg": ""
      }
    } 
    ```

### `/withdraw-address/verification`

校验转出地址。当用户在跨链转出界面中输入转出地址时进行校验。

* **Method**: `GET`

* **Request**: `query string`

|参数名|描述|数据类型|是否必传|
|:--|:---|:---:|:---:|
|tokenId|TOT id|string|true|
|withdrawAddress|用户对手链转出地址|string|true|
  
  
* **Response**

|参数名|描述|数据类型|是否必传|
|:--|:---|:---:|:---:|
|isValidAddress|地址是否合法|bool|true|
  

* **Example**

  ***Request***
    ```
    /withdraw-address/verification?tokenId=tti_82b16ac306f0d98bf9ccf7e7&withdrawAddress=moEGgYAg8KT9tydfNDofbukiUNjWTXaZTm
    ```
  ***Response***
    ```javascript
    {
      "code": 0,
      "subCode": 0,
      "msg": null,
      "data": {
        "isValidAddress": true
      }
    }
    ```

### `/withdraw-fee`

获取网关收取的转出手续费。

* **Method**: `GET`

* **Request**: `query string`

|参数名|描述|数据类型|是否必传|
|:--|:---|:---:|:---:|
|tokenId|TOT id|string|true|
|walletAddress|用户VITE地址|string|true|
|amount|金额|string|true|
|containsFee|传入的amount是否已包含手续费<br>如果为false，amount为实际到账金额，网关以该金额为基数直接计算手续费<br>如果为true，amount为实际到账金额+转出手续费，网关以amount为总额反推计算实际到账金额与手续费，用于全部转出场景|bool|true|


  
* **Response**

|参数名|描述|数据类型|是否必传|
|:--|:---|:---:|:---:|
|fee|网关收取的手续费|string|true|

* **Example**

  ***Request***
    ```
    /withdraw-fee?tokenId=tti_82b16ac306f0d98bf9ccf7e7&walletAddress=vite_52ea0d88812350817df9fb415443f865e5cf4d3fddc9931dd9&amount=100000000000000&containsFee=true
    ```
  ***Response***
    ```javascript
    {
      "code": 0,
      "subCode": 0,
      "msg": null,
      "data": {
        "fee": "1000000"
      }
    }
    ```
  
:::tip 关于跨链转出
1. 当用户填写完合法的转出地址与金额并确认转出后，Web Wallet会签名一笔TOT回收交易并发送至VITE网络。`用户填写的转出信息表示在交易的备注中`。
2. 网关监听VITE链上的TOT回收交易，等待合适的确认数。
3. 网关确认VITE链上的TOT回收交易后，发起对手链上的转出交易，交易目标地址为TOT回收交易的备注。
4. 网关监听对手链上的该笔转出交易，如果交易没有最终被确认，需要重试发送。
:::

#### 交易备注填写规范
依据[VEP 8: AccountBlock Data Content Type 规范](../../vep/vep-8.md)定义，由固定部分和可变部分拼接而成。
* 固定部分为:

|VEP-8 Type|Type|
|:--|:---|
|2 Byte,uint16|1 Byte,uint8|

VEP-8 Type固定为`3011`，用HEX表示为`0x0bc3`
<br>Type为`/meta-info`中的参数type
* 可变部分为:

  ::::: tabs
  ::: tab 0:单地址模式
  
    |Address|
    |:---:|
    |0 ~ 255 Byte,UTF-8|
    
    以转出地址是`mrkRBVtsd96oqHLELaDtCYWzcxUr7s4D26`为例，交易备注Binary用HEX表示为`0x0bc3006d726b52425674736439366f71484c454c6144744359577a63785572377334443236`
    
  :::
  ::: tab 1:通过备注区分地址模式
  
    |Address size|Address|Label size|Label|
    |:---:|:---:|:---:|:---:|
    |1 Byte,uint8|0 ~ 255 Byte,UTF-8|1 Byte,uint8|0 ~ 255 Byte,UTF-8|
    
    以转出地址是`vitetothemoon`,标签值为`12345`为例，交易备注Binary用HEX表示为`0x0bc3010d76697465746f7468656d6f6f6e053132333435`
   
  :::
  :::::


## 转入转出记录查询类接口

### `/deposit-records`

转入记录。

* **Method**: `GET`

* **Request**: `query string`

|参数名|描述|数据类型|是否必传|
|:--|:---|:---:|:---:|
|tokenId|TOT id|string|true|
|walletAddress|用户VITE地址|string|true|
|pageNum|分页参数，起始页序号，从1开始|int|true|
|pageSize|分页参数，每页大小|int|true|
  
  
* **Response**

|参数名|描述|数据类型|是否必传|
|:--|:---|:---:|:---:|
|totalCount|总记录数|int|true|
|depositRecords|转入记录列表|list|false|
|inTxExplorerFormat|对手链浏览器，用inTxHash替换{$tx}为该交易区块浏览器地址|string|true|
|outTxExplorerFormat|VITE链浏览器，用outTxHash替换{$tx}为该交易区块浏览器地址|string|true|
  
* ***其中depositRecords参数如下***

|参数名|描述|数据类型|是否必传|
|:--|:---|:---:|:---:|
|inTxHash|对手链转入交易hash|string|true|
|outTxHash|VITE链转出TOT交易hash|string|false|
|amount|转入金额|string|true|
|fee|网关收取的转入手续费|string|true|
|state|转入状态，枚举值<br>`OPPOSITE_PROCESSING`对手链转入交易确认中<br>`OPPOSITE_CONFIRMED`网关已确认对手链交易成功<br>`OPPOSITE_CONFIRMED_FAIL`网关已确认对手链交易失败<br>`BELOW_MINIMUM`对手链交易金额小于最小转入金额，转入流程结束<br>`TOT_PROCESSING`网关已发出tot转出交易<br>`TOT_CONFIRMED`网关已确认tot转出交易，转入流程结束|string|true|
|dateTime|转入时间,timestamp毫秒|string|true|

* **Example**

  ***Request***
    ```
    /deposit-records?tokenId=tti_82b16ac306f0d98bf9ccf7e7&walletAddress=vite_52ea0d88812350817df9fb415443f865e5cf4d3fddc9931dd9&pageNum=1&pageSize=10
    ```
  ***Response***
    ```javascript
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

### `/withdraw-records`

转出记录。

* **Method**: `GET`

* **Request**: `query string`

|参数名|描述|数据类型|是否必传|
|:--|:---|:---:|:---:|
|tokenId|TOT id|string|true|
|walletAddress|用户VITE地址|string|true|
|pageNum|分页参数，起始页序号，从1开始|int|true|
|pageSize|分页参数，每页大小|int|true|
  
  
* **Response**

|参数名|描述|数据类型|是否必传|
|:--|:---|:---:|:---:|
|totalCount|总记录数|int|true|
|withdrawRecords|转出记录列表|list|false|
|inTxExplorerFormat|VITE链浏览器，用inTxHash替换{$tx}为该交易区块浏览器地址|string|true|
|outTxExplorerFormat|对手链浏览器，用outTxHash替换{$tx}为该交易区块浏览器地址|string|true|
  
* ***其中withdrawRecords参数如下***

|参数名|描述|数据类型|是否必传|
|:--|:---|:---:|:---:|
|inTxHash|VITE链tot转入交易hash|string|true|
|outTxHash|对手链转出交易hash|string|false|
|amount|实际转出到账金额|string|true|
|fee|网关收取的转出手续费|string|true|
|state|转出状态，枚举值<br>`TOT_PROCESSING`VITE TOT转入交易已发送，待确认<br>`TOT_CONFIRMED`网关已确认VITE TOT交易<br>`TOT_EXCEED_THE_LIMIT`超过限额<br>`WRONG_WITHDRAW_ADDRESS`转出地址错误<br>`OPPOSITE_PROCESSING`网关已发出对手链转出交易<br>`OPPOSITE_CONFIRMED`网关已确认对手链转出交易，转出流程结束|string|true|
|dateTime|转出时间,timestamp毫秒|string|true|

* **Example**

  ***Request***
    ```
    /withdraw-records?tokenId=tti_82b16ac306f0d98bf9ccf7e7&walletAddress=vite_52ea0d88812350817df9fb415443f865e5cf4d3fddc9931dd9&pageNum=1&pageSize=10
    ```
  ***Response***
    ```javascript
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
  
## 错误码表
  |code|描述|
  |:--|:---|
  |0|请求成功|
  |1|请求参数校验不通过|
  |2|服务器内部异常|

## 协议版本
### 当前版本 
`v1.0`
### 历史版本
|版本号|更新说明|
|:--|:---|
|v1.0|初始化版本|

