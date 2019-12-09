---
sidebarDepth: 4
title: 开始
---
# Vite java sdk

## github

[Vitej](https://github.com/vitelabs/vitej)

## 开始

### 添加maven依赖
1. 本地拉取本仓库代码，在代码目录下执行`mvn install`，安装到本地maven仓库
2. 在项目`pom.xml`中添加依赖
```
<dependency>
  <groupId>org.vitej</groupId>
  <artifactId>vitej</artifactId>
  <version>1.0.0-SNAPSHOT</version>
</dependency>
```

### 使用示例

`Vitej`包装了go-vite的大部分RPC接口

三种创建Vitej的方式如下：
```
默认连接到http://127.0.0.1:48132
Vitej vitej = new Vitej(new HttpService());
指定go-vite http url
Vitej vitej = new Vitej(new HttpService("http://127.0.0.1:48132"));
指定go-vite http url和默认地址，后续发交易或者查询时默认使用keyPair地址
KeyPair keyPairDefault = new Wallet(Arrays.asList("alarm", "canal", "scheme", "actor", "left", "length", "bracket", "slush", "tuna", "garage", "prepare", "scout", "school", "pizza", "invest", "rose", "fork", "scorpion", "make", "enact", "false", "kidney", "mixed", "vast")).deriveKeyPair();
Vitej vitej = new Vitej(new HttpService("http://127.0.0.1:48132"), keyPairDefault);
```

同步查询用户账户链
```
AccountBlocksResponse response = vitej.getAccountBlocksByAddress(
        new Address("vite_ab24ef68b84e642c0ddca06beec81c9acb1977bbd7da27a87a"), 0, 10
    ).send();
```
异步查询用户账户链
```
CompletableFuture<AccountBlocksResponse> future = vitej.getAccountBlocksByAddress(
        new Address("vite_ab24ef68b84e642c0ddca06beec81c9acb1977bbd7da27a87a"), 0, 10
).sendAsync();
AccountBlocksResponse response = future.get();
```


