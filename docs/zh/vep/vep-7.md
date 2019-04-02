# VEP 7: AccountBlock Data Content Type 规范

## 背景
在使用 tx_sendRawTx 接口发送交易时，AccountBlock 中的 data 字段可以携带任何数据。为了方便尽可能以正确的格式展示出 data 携带的数据，需要通过某种方式来描述 data 字段中的数据类型。

## 实现
具体采用的方法是在 data 中附加 2 Byte 数据在开头作为 Content Type 用来标示紧随其后的数据是何内容类型，需要注意的是本提案中描述的 data 字段的格式并不是强制的，只是建议大家都使用此格式来处理 data，以便更好的展示 data 的内容。

不过即使按照本文所述的格式处理或展示 data，还是会有概率无法正确识别 data 的内容类型，因为在使用 tx_sendRawTx 调用智能合约时，data 字段的前几个字节是调用的合约方法名的 hash，可能会和 Content Type 冲突。

Content Type 使用 UInt16 标示，采用大端格式存储，规定小于等于 2048（0x0800） 的 type 为官方保留的通用 type，大于 2048（0x0800） 的 type 可自行指定。

## 已定义的 Type

### 通用 Type
| 类型 | Type(Hex) | 说明 |
| --- | --- | --- |
| Binary | 0x0001 | 保留，目前还未使用 |
| UTF-8 字符串 | 0x0002 | 转账备注使用 |

### 自定义 Type
| 类型 | Type(Hex) | 说明 |
| --- | --- | --- |
| Grin 钱包数据 | 0x8001 | 保存 Grin 文件索引 |