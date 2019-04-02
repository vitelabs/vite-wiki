# VEP 6: Vite URI 格式

## 简介
为各种用例创建 Vite URI 的标准方法。

## 语法
```c++
request                 = "vite" ":"[target_address] [ "@" chain_id ] [ "/" function_name ] [ "?" parameters ]
target_address          = vite_address
chain_id                = 1*DIGIT
function_name           = STRING
vite_address            = ( "vite_" 50*HEXDIG ) / VNS_NAME
parameters              = parameter *( "&" parameter )
parameter               = key "=" value
key                     = "tti" / "amount" / "fee" / "data"
value                   = number / vite_address / token_type_id / STRING
token_type_id           = "tti_" 24 *HEXDIG
number                  = [ "-" / "+" ] *DIGIT [ "." 1*DIGIT ] [ ( "e" / "E" ) [ 1*DIGIT ]
```

***STRING*** 是一个URLEncode的 unicode 字符串，并对 uri 出现的所有的分割符进行 % 转义，具体需要转义的分割符为 ***@/?&=%:***

***number*** 采用科学记数法

***VNS_NAME*** 标准正在制定中

### 语义

| 字段 | 说明 |
| --- | --- |
| target_address | 转账时，表示转入地址，调用智能合约时，表示合约地址 |
| chain_id | 标识主网、测试网络或者私有网络类型，可以省略，如果省略使用客户端当前网路类型 |
| function_name | 调用的智能合约方法名，如果是合约调用必须有"/"，没有"/"表示为普通转账。function_name 可以为空字符串，空字符串表示调用当前地址的默认合约方法。注意：目前调用智能合约时，通过设置 data 字段来表示合约方法签名和参数信息，因此目前 function_name 并不作任何解析，之后会支持通过指定 function_name 以及合约参数的方式来调用智能合约 |
| parameters | 参数，key 包括 "tti" / "amount" / "fee" / "data" |

### 参数

| key | value | 说明 | 例子 |
| --- | --- | --- | --- |
| tti | token_type_id | 指定转账的 Token Id ，可省略，如果省略表示转账的是 Vite Token | tti=tti_5649544520544f4b454e6e40 |
| amount | number | 指定转账金额，单位为代币的基本单位，例如转账 1VITE 就是 amount=1，可省略，如果省略表示 amount=0 | amount=1e-3，amount=1000，amount=0.04 |
| fee | number | 指定要销毁的 Vite 数，单位为 Vite 的基本单位，可省略，如果省略表示 fee=0 | 同 amount |
| data | [base64 url safe 编码](https://tools.ietf.org/html/rfc4648#section-5) | 转账时表示携带的备注信息，备注信息需要遵守[VEP-7](./vep-7.html)中约定的格式，调用智能合约调用时表示的是方法签名和参数信息 | data=MTIzYWJjZA |

## 具体例子

| 例子 | 说明 |
| --- | --- |
| vite:vite_fa1d81d93bcc36f234f7bccf1403924a0834609f4b2e9856ad | 表示一个账户地址 |
| vite:vite_fa1d81d93bcc36f234f7bccf1403924a0834609f4b2e9856ad?tti=tti_5649544520544f4b454e6e40&amount=1&data=MTIzYWJjZA | 向地址为 vite_fa1d81d93bcc36f234f7bccf1403924a0834609f4b2e9856ad 的账户转账 1 Vite ，备注为“123abcd” |
| vite:vite_fa1d81d93bcc36f234f7bccf1403924a0834609f4b2e9856ad/echo?amount=1&data=MTIzYWJjZA | 调用合约 echo 方法 |
