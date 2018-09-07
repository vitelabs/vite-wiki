---
sidebarDepth: 4
title: 开始
---

# 开始

## 构建

### 构建步骤

1. [Install Go](https://golang.org/doc/install)
2. Run `go get github.com/vitelabs/go-vite` in your terminal, then you will find the source code here: `$GOPATH/src/github.com/vitelabs/go-vite/` (as default, $GOPATH is `~/go`)
3. Go to the source code directory and run `make all`, you will get executable files of darwin, linux, windows here: `$GOPATH/src/github.com/vitelabs/go-vite/build/cmd/rpc`  
4. Run the appropriate binary file on your OS.


### 配置

As default, Vite will give a default config. but you can set your config use two way as following.

#### cmd

| key | type | default | meaning |
|:--- |:--- |:--- |:--- |
| name | string | "vite-server" | the server name, use for log |
| maxpeers | number | 50 | the maximum number of peers can be connected |
| addr | string | "0.0.0.0:8483" | will be listen by vite |
| dir | string | "~/viteisbest" | the directory in which vite will store all files (like log, ledger) |
| netid | number | 2 | the network vite will connect, default 2 means TestNet |
| priv | string | "" | the hex code string of ed25519 privateKey |

#### configFile

we can also use config file `vite.config.json` to set Config. for example:

```json
{
    "P2P": {
        "Name":                 "vite-server",
        "PrivateKey":           "",
        "MaxPeers":             100,
        "Addr":                 "0.0.0.0:8483",
        "NetID":                2
    },
    "DataDir": ""
}
```

`vite.config.json` should be in the same directory of vite.

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
| 余额不足|  `-35001` |  The balance is not enough. |{"code":5001,"message":"The balance is not enough."}|
| 密码错误	|  `-34001` | error decrypting key |{"code":4001,"message":"error decrypting key"}|
| 账户重复解锁	|  `-34002` |  the address was previously unlocked |{"code":4002,"message":"the address was previously unlocked"}|

## JSON-RPC Support

|  JSON-RPC 2.0  | HTTP | IPC |Publish–subscribe |Websocket |
|:------------:|:-----------:|:-----:|:-----:|:-----:|
| &#x2713;|  &#x2713; |  &#x2713; |waiting|&#x2713;|
