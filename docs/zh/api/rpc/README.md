---
sidebarDepth: 4
title: 开始
---

# 开始

## 说明
* **IPC方式**：支持所有API调用

    1. **\*nix(linux darwin)**: `Unix domain Socket` 文件名称    `~/.gvite/testdata/gvite.ipc`

    2. **Windows**: Named Pipe 受限于Windows的规范 文件名就是  `\\.\pipe\gvite.ipc`
* **Http**：仅支持公共API(非wallet模块) 默认端口**48132**

* **WebSocket**：仅支持公共API(非wallet模块) 默认端口**31420**
* **不足**:

    1. 暂时不支持发布订阅模式，后续会支持；

    2. 项目迭代很快，目前的API在之后版本中会很大改变。

* **注意**:
    1. 尽量使用标准的 ***Json rpc2*** 的库
    2. 术语 交易（transaction 或者Tx） = account block

:::warning
所有byte数组的类型，请转为base64传递，uint64和big.int都用string传递
:::

## 常见RPC错误汇总

|  描述 | code | message | example |
|:------------:|:-----------:|:-----:|:-----:|
| 服务端尝试解析json出错	|  `-32700` | 语法解析错误 |{"code":-32700,"message":"missing request id"}|
| json不是一个有效的请求对象，缺少必要字段或者字段取值错误	|  `-32600` | 无效请求 |{"code":-32600,"message":"Unable to parse subscription request"}|
| 方法不存在，请确认已经在`PublicModules`中配置相应的模块，并且方法存在	|  `-32601` | 方法不存在 |{"code":-32601,"message":"The method tx_sendRawTx does not exist/is not available"}|
| 方法参数错误，例如方法要求传uint8，实际传了string	|  `-32602` | 无效参数 |{"code":-32602,"message":"missing value for required argument"}|
| 服务器已经停止服务 |  `-32000` | server is shutting down |{"code":-32000,"message":"server is shutting down"}|
| 服务器执行异常，稍后重试即可 | `-32001` | server execute panic |{"code":-32001,"message":"server execute panic"}|
| 回调方法返回错误 | `-32002` | call back error |{"code":-32002,"message":"notifications not supported"}|

## 常见业务错误汇总

|  描述 | code | message | example |
|:------------:|:-----------:|:-----:|:-----:|
| 密码错误	|  `-34001` | error decrypting key |{"code":-34001,"message":"error decrypting key"}|
| 余额不足|  `-35001` | insufficient balance for transfer |{"code":-35001,"message":"insufficient balance for transfer"}|
| 配额不足 |  `-35002` | out of quota |{"code":-35002,"message":"out of quota"}|
| 参数错误 |  `-35004` | invalid method param |{"code":-35004,"message":"invalid method param"}|
| 通过计算PoW获取配额操作过于频繁 |  `-35005` | calc PoW twice referring to one snapshot block |{"code":-35005,"message":"calc PoW twice referring to one snapshot block"}|
| 合约方法不存在 |  `-35006` | abi: method not found |{"code":-35006,"message":"abi: method not found"}|
| 创建合约时确认次数非法 |  `-35007` | invalid confirm time |{"code":-35007,"message":"invalid confirm time"}|
| 合约地址不存在 |  `-35008` | contract not exists |{"code":-35008,"message":"contract not exists"}|
| 创建合约时配额翻倍数非法 |  `-35010` | invalid quota ratio |{"code":-35010,"message":"invalid quota ratio"}|

## JSON-RPC Support

|  JSON-RPC 2.0  | HTTP | IPC |Publish–subscribe |Websocket |
|:------------:|:-----------:|:-----:|:-----:|:-----:|
| &#x2713;|  &#x2713; |  &#x2713; |waiting|&#x2713;|
