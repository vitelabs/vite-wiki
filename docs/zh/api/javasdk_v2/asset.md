---
sidebarDepth: 4
---

# 资产发行相关接口

## 发送发行代币交易
```
Vitej vitej = new Vitej(new HttpService());
Request<?, EmptyResponse> request = vitej.issueToken(keyPair,
        new IssueTokenParams()
                .setReIssuable(true)
                .setTokenName("Test Token")
                .setTokenSymbol("TT")
                .setTotalSupply(BigInteger.valueOf(10000L))
                .setMaxSupply(BigInteger.valueOf(20000L))
                .setDecimals(1)
                .setOwnerBurnOnly(false));
EmptyResponse response = request.send();
Preconditions.checkArgument(response.getError() == null);
Preconditions.checkArgument(ProtocolUtils.checkCallContractResult(vitej, ((TransactionParams) request.getParams().get(0)).getHashRaw()));
```

## 发送增发代币交易
```
Vitej vitej = new Vitej(new HttpService());
Request<?, EmptyResponse> request = vitej.reIssue(keyPair, new TokenId("tti_10b56995f5d6a6e1f9a60441"), BigInteger.valueOf(100), keyPair.getAddress());
EmptyResponse response = request.send();
Preconditions.checkArgument(response.getError() == null);
Preconditions.checkArgument(ProtocolUtils.checkCallContractResult(vitej, ((TransactionParams) request.getParams().get(0)).getHashRaw()));
```

## 发送销毁代币交易
```
Vitej vitej = new Vitej(new HttpService());
Request<?, EmptyResponse> request = vitej.burn(keyPair, new TokenId("tti_10b56995f5d6a6e1f9a60441"), BigInteger.valueOf(100));
EmptyResponse response = request.send();
Preconditions.checkArgument(response.getError() == null);
Preconditions.checkArgument(ProtocolUtils.checkCallContractResult(vitej, ((TransactionParams) request.getParams().get(0)).getHashRaw()));
```

## 发送转移代币所有权交易
```
Vitej vitej = new Vitej(new HttpService());
Request<?, EmptyResponse> request = vitej.transferOwnership(keyPair, new TokenId("tti_10b56995f5d6a6e1f9a60441"), new Address("vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68"));
EmptyResponse response = request.send();
Preconditions.checkArgument(response.getError() == null);
Preconditions.checkArgument(ProtocolUtils.checkCallContractResult(vitej, ((TransactionParams) request.getParams().get(0)).getHashRaw()));
```

## 发送修改代币类型交易
```
Vitej vitej = new Vitej(new HttpService());
Request<?, EmptyResponse> request = vitej.disableReIssue(keyPair, new TokenId("tti_10b56995f5d6a6e1f9a60441"));
EmptyResponse response = request.send();
Preconditions.checkArgument(response.getError() == null);
Preconditions.checkArgument(ProtocolUtils.checkCallContractResult(vitej, ((TransactionParams) request.getParams().get(0)).getHashRaw()));
```

## 查询代币信息列表

```
Vitej vitej = new Vitej(new HttpService());
TokenInfoListWithTotalResponse response = vitej.getTokenInfoList(
        // 页码，从0开始
        0,
        // 每页条数
        10
).send();
// 代币总数
Integer count = response.getResult().getTotalCount();
// 代币信息列表
List<TokenInfo> tokenInfoList = response.getResult().getTokenInfoList();
```

## 查询代币信息

```
Vitej vitej = new Vitej(new HttpService());
TokenInfoResponse response = vitej.getTokenInfoById(
        // 代币id
        new TokenId("tti_5649544520544f4b454e6e40")
).send();
TokenInfo tokenInfo = response.getResult();
```

## 根据所有者账户查询代币信息列表

```
Vitej vitej = new Vitej(new HttpService());
TokenInfoListResponse response = vitej.getTokenInfoListByOwner(
        new Address("vite_0996e651f3885e6e6b83dfba8caa095ff7aa248e4a429db7bd")
).send();
List<TokenInfo> tokenInfo = response.getResult();
```
