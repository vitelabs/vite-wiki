---
sidebarDepth: 4
title: 开始
---

# 开始

这个是是测试的是文字

## 说明
* **IPC方式**：支持所有API调用

    1. **\*nix(linux darwin)**: `Unix domain Socket` 文件名称    `$HOME/viteisbest/vite.ipc`

    2. **Windows**: Named Pipe 受限于Windows的规范 文件名就是  `\\.\pipe\vite.ipc`
* **Http**：仅支持公共API(非wallet模块) 默认端口**48132**

* **WebSocket**：仅支持公共API(非wallet模块) 默认端口**31420**
* **不足**:

    1. 暂时不支持发布订阅模式，后续会支持；

    2. 项目迭代很快，目前的API在之后版本中会很大改变。

* **注意**:
    1. 尽量使用标准的 ***Json rpc2*** 的库
    2. 术语 交易（transaction 或者Tx） = account block


## 常见业务错误汇总

|  描述 | code | message | example |
|:------------:|:-----------:|:-----:|:-----:|
| 余额不足|  `-35001` |  The balance is not enough. |{"code":-35001,"message":"The balance is not enough."}|
| 密码错误	|  `-34001` | error decrypting key |{"code":-34001,"message":"error decrypting key"}|
| 账户重复解锁	|  `-34002` |  the address was previously unlocked |{"code":-34002,"message":"the address was previously unlocked"}|

## JSON-RPC Support

|  JSON-RPC 2.0  | HTTP | IPC |Publish–subscribe |Websocket |
|:------------:|:-----------:|:-----:|:-----:|:-----:|
| &#x2713;|  &#x2713; |  &#x2713; |waiting|&#x2713;|
