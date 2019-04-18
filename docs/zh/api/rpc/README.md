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

## JSON-RPC Support

|  JSON-RPC 2.0  | HTTP | IPC |Publish–subscribe |Websocket |
|:------------:|:-----------:|:-----:|:-----:|:-----:|
| &#x2713;|  &#x2713; |  &#x2713; |waiting|&#x2713;|
