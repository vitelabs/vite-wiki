---
sidebarDepth: 4
title: 开始
---

# 调用RPC接口

## 开始

### 创建Vitej对象

后续使用Vitej来调用RPC接口。三种方式创建Vitej：

```demo
// 默认连接到http://127.0.0.1:48132
Vitej vitej = new Vitej(new HttpService());
// 指定go-vite http url
Vitej vitej = new Vitej(new HttpService("http://127.0.0.1:48132"));
// 指定go-vite http url和默认地址，后续发交易或者查询时默认使用keyPair地址
KeyPair keyPairDefault = new Wallet(Arrays.asList("alarm", "canal", "scheme", "actor", "left", "length", "bracket", "slush", "tuna", "garage", "prepare", "scout", "school", "pizza", "invest", "rose", "fork", "scorpion", "make", "enact", "false", "kidney", "mixed", "vast")).deriveKeyPair();
Vitej vitej = new Vitej(new HttpService("http://127.0.0.1:48132"), keyPairDefault);
```

### 调用RPC接口

#### Request

RPC接口请求对象。符合JSON-RPC 2.0。

* `jsonrpc`: `String` 协议版本号，必须写"2.0"
* `id`: `long` 请求标识
* `method`: `String` 方法名
* `params`: `List<Object>` 参数列表

```demo
{
	"jsonrpc": "2.0",
	"id": 1,
	"method": "ledger_getLatestSnapshotHash",
	"params": []
}
```

#### Response 
 
RPC接口响应对象。符合JSON-RPC 2.0。

* `id`: `long` 响应标识，和Request中的id字段一致
* `jsonrpc`: `String` 协议版本号，值为"2.0"
* `result`: `Object` 响应结果，请求成功时返回
* `error`: 错误信息，请求失败时返回
  * `code`: `int` 错误代码
  * `message`: `String` 错误描述

```demo
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "67f7ee751968a832d7d776aad6de3ca9b58f37c8c4bf8442a935f891a850d8b1"
}
```

#### 调用接口

同步调用

```demo
AccountBlocksResponse response = vitej.getAccountBlocksByAddress(
        new Address("vite_ab24ef68b84e642c0ddca06beec81c9acb1977bbd7da27a87a"), 0, 10
    ).send();
```
异步调用

```demo
CompletableFuture<AccountBlocksResponse> future = vitej.getAccountBlocksByAddress(
        new Address("vite_ab24ef68b84e642c0ddca06beec81c9acb1977bbd7da27a87a"), 0, 10
).sendAsync();
AccountBlocksResponse response = future.get();
```

## RPC方法


