---
eip: 2
author: 朱天涛
status: Active
type: Meta
created: 2018-9-1
---

# VEP 2: 二维码规范

URL主要是使用在二维码，网页的超链接，邮件等，这是一个通用的类似于微信二维码的标准。本标准主要参考了[EIP-681](https://eips.ethereum.org/EIPS/eip-681),并且尽量和以太坊的标准保持一致。
***
## 语法
```c++
request                 = "vite" ":" [ prefix "-" ][target_address] [ "@" chain_id ] [ "/" function_name ] [ "?" parameters ]
prefix                  = STRING
target_address          = vite_address
chain_id                = 1*DIGIT
function_name           = STRING
vite_address            = ( "vite_" 50*HEXDIG ) / VNS_NAME
parameters              = parameter *( "&" parameter )
parameter               = key "=" value
key                     = "value" / TYPE
value                   = number / vite_address / token_type_id / gid / STRING  
token_type_id           = "tti_" 24 *HEXDIG
gid                     = 正在制定 共识组的ID
number                  = [ "-" / "+" ] *DIGIT [ "." 1*DIGIT ] [ ( "e" / "E" ) [ 1*DIGIT ] [ "+" UNIT ]
```

* **TYPE** 是保持和以太坊ABI相同的标准，参考[链接](https://solidity.readthedocs.io/en/develop/abi-spec.html)
* **STRING** 是一个URLEncode的字符串
* **number** 采用科学记数法
* **VNS_NAME** 标准正在制定中
***
## 语义

* prefix  在这里用来标识本次交易的类型 默认是转账或者合约调用类型, prefix从0-9是内置类型
* chain_id 标识主网、测试网络或者私有网络类型，可选项 默认调用URL方的的网络类型
* function_name 如果prefix标识是合约调用类型，那么target_address就是合约地址，funtion_name就是该合约函数，后面的Paramters就是函数的参数，比如
`vite:vite_fa1d81d93bcc36f234f7bccf1403924a0834609f4b2e9856ad/echo?string="helloworld"&string="goodbye"` 的含义就是调用了这个vite_fa1d81d93bcc36f234f7bccf1403924a0834609f4b2e9856ad合约的echo函数，并且传入了两个string参数
***
## 具体例子
* 标识一个账户什么都不干
`vite:vite_fa1d81d93bcc36f234f7bccf1403924a0834609f4b2e9856ad`

* 向一个账户转钱
`vite:vite_fa1d81d93bcc36f234f7bccf1403924a0834609f4b2e9856ad?tti=tti_2445f6e5cde8c2c70e446c83&amount=1&decimals=1e18`
如果缺省tti默认就是转Vite token,如果缺省decimals那么就是默认转 amount * min_decimals(token)，不然就是amount * decimals

* 发送一个铸币交易
`vite:2-vite_fa1d81d93bcc36f234f7bccf1403924a0834609f4b2e9856ad?totalsupply=10e10&decimals=1e18&name=xite`
需要一个prefix为2来标识这是铸币交易

* 创建合约的交易
`vite:3-?code=....&gid=GID&tti=tti_2445f6e5cde8c2c70e446c83&amount=1`
需要一个prefix为3来标识这是创建合约的交易，code是合约的字节码，gid是合约的共识组id，缺省情况下采用全局共识组，跟着的tti和amount表示创建合约的时候可以默认向里面打一笔钱。


