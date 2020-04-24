---
sidebarDepth: 4
---

# 超级节点和投票相关接口

## 发送注册超级节点交易
```java
Vitej vitej = new Vitej(new HttpService());
Request<?, EmptyResponse> request = vitej.registerSBP(keyPair, "test_sbp", keyPair.getAddress(), keyPair.getAddress());
EmptyResponse response = request.send();
Preconditions.checkArgument(response.getError() == null);
Preconditions.checkArgument(ProtocolUtils.checkCallContractResult(vitej, ((TransactionParams) request.getParams().get(0)).getHashRaw()));
```

## 发送更新超级节点出块地址交易
```java
Vitej vitej = new Vitej(new HttpService());
Request<?, EmptyResponse> request = vitej.updateSBPBlockProducingAddress(keyPair, "test_sbp", new Address("vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68"));
EmptyResponse response = request.send();
Preconditions.checkArgument(response.getError() == null);
Preconditions.checkArgument(ProtocolUtils.checkCallContractResult(vitej, ((TransactionParams) request.getParams().get(0)).getHashRaw()));
```

## 发送更新超级节点提取奖励地址交易
```java
Vitej vitej = new Vitej(new HttpService());
Request<?, EmptyResponse> request = vitej.updateSBPRewardWithdrawAddress(keyPair, "test_sbp", new Address("vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68"));
EmptyResponse response = request.send();
Preconditions.checkArgument(response.getError() == null);
Preconditions.checkArgument(ProtocolUtils.checkCallContractResult(vitej, ((TransactionParams) request.getParams().get(0)).getHashRaw()));
```

## 发送提取奖励交易
```java
Vitej vitej = new Vitej(new HttpService());
Request<?, EmptyResponse> request = vitej.withdrawSBPReward(keyPair, "test_sbp", new Address("vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68"));
EmptyResponse response = request.send();
Preconditions.checkArgument(response.getError() == null);
Preconditions.checkArgument(ProtocolUtils.checkCallContractResult(vitej, ((TransactionParams) request.getParams().get(0)).getHashRaw()));
```

## 发送撤销超级节点交易
```java
Vitej vitej = new Vitej(new HttpService());
Request<?, EmptyResponse> request = vitej.revokeSBP(keyPair, "test_sbp");
EmptyResponse response = request.send();
Preconditions.checkArgument(response.getError() == null);
Preconditions.checkArgument(ProtocolUtils.checkCallContractResult(vitej, ((TransactionParams) request.getParams().get(0)).getHashRaw()));
```

## 发送投票交易
```java
Vitej vitej = new Vitej(new HttpService());
Request<?, EmptyResponse> request = vitej.voteForSBP(keyPair, "s1");
EmptyResponse response = request.send();
Preconditions.checkArgument(response.getError() == null);
Preconditions.checkArgument(ProtocolUtils.checkCallContractResult(vitej, ((TransactionParams) request.getParams().get(0)).getHashRaw()));
```

## 发送取消投票交易
```java
Vitej vitej = new Vitej(new HttpService());
Request<?, EmptyResponse> request = vitej.cancelSBPVoting(keyPair);
EmptyResponse response = request.send();
Preconditions.checkArgument(response.getError() == null);
Preconditions.checkArgument(ProtocolUtils.checkCallContractResult(vitej, ((TransactionParams) request.getParams().get(0)).getHashRaw()));
```

## 根据地址查询超级节点列表

```java
Vitej vitej = new Vitej(new HttpService());
SBPListResponse response = vitej.getSBPList(
        // 账户地址
        new Address("vite_0996e651f3885e6e6b83dfba8caa095ff7aa248e4a429db7bd")
).send();
// 该账户注册的超级节点和可以提取奖励的超级节点列表
List<SBPInfo> sbpInfoList = response.getResult();
```

## 查询超级节点待提取奖励

```java
Vitej vitej = new Vitej(new HttpService());
SBPRewardResponse response = vitej.getSBPRewardPendingWithdrawal(
        // 超级节点名称
        "Vite_SBP01"
).send();
SBPRewardResponse.Result reward = response.getResult();
```

## 查询超级节点信息

```java
Vitej vitej = new Vitej(new HttpService());
SBPResponse response = vitej.getSBP(
        // 超级节点名称
        "Vite_SBP01"
).send();
SBPInfo sbpInfo = response.getResult();
```

## 查询一个周期内的超级节点奖励信息

```java
Vitej vitej = new Vitej(new HttpService());
SBPRewardDetailResponse response = vitej.getSBPRewardByCycle(
        // 周期，20190521T12:00:00+08:00 ~ 20190522T12:00:00+08:00为第0个周期
        1L
).send();
SBPRewardDetailResponse.Result rewardDetail = response.getResult();
```

## 按周期查询超级节点投票信息

```java
Vitej vitej = new Vitej(new HttpService());
SBPVoteDetailsResponse response = vitej.getSBPVoteDetailsByCycle(
        // 周期，20190521T12:00:00+08:00 ~ 20190522T12:00:00+08:00为第0个周期
        0L
).send();
List<SBPVoteDetailsResponse.Result> voteDetail = response.getResult();
```

## 查询投票信息

```java
Vitej vitej = new Vitej(new HttpService());
VotedSBPResponse response = vitej.getVotedSBP(
        new Address("vite_0996e651f3885e6e6b83dfba8caa095ff7aa248e4a429db7bd")
).send();
VotedSBPResponse.Result votedSBP = response.getResult();
```
