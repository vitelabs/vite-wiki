---
sidebarDepth: 4
---

# 配额相关接口

## 发送抵押交易
```java
Vitej vitej = new Vitej(new HttpService());
Request<?, EmptyResponse> request = vitej.stakeForQuota(keyPair, keyPair.getAddress(), org.vitej.core.constants.BuiltinContracts.MINIMUM_STAKE_FOR_QUOTA_AMOUNT);
EmptyResponse response = request.send();
Preconditions.checkArgument(response.getError() == null);
Preconditions.checkArgument(ProtocolUtils.checkCallContractResult(vitej, ((TransactionParams) request.getParams().get(0)).getHashRaw()));
```

## 发送撤销抵押交易
```java
Vitej vitej = new Vitej(new HttpService());
Request<?, EmptyResponse> request = vitej.cancelQuotaStaking(keyPair, new Hash("874aeae0389118ade5f81371041a45bb39a85630b3eb463c3329dfef89618d36"));
EmptyResponse response = request.send();
Preconditions.checkArgument(response.getError() == null);
Preconditions.checkArgument(ProtocolUtils.checkCallContractResult(vitej, ((TransactionParams) request.getParams().get(0)).getHashRaw()));
```

## 查询账户配额

```java
Vitej vitej = new Vitej(new HttpService());
QuotaResponse response = vitej.getQuotaByAccount(
        // 账户地址
        new Address("vite_0996e651f3885e6e6b83dfba8caa095ff7aa248e4a429db7bd")
).send();
// 当前可用配额
Long currentQuota = response.getResult().getCurrentQuota();
// 最大可用配额
Long maxQuota = response.getResult().getMaxQuota();
// 抵押受益金额
BigInteger stakeAmount = response.getResult().getStakeAmount();
```

## 查询抵押信息列表

```java
Vitej vitej = new Vitej(new HttpService());
StakeListResponse response = vitej.getStakeList(
        // 抵押地址
        new Address("vite_0996e651f3885e6e6b83dfba8caa095ff7aa248e4a429db7bd"),
        // 页码，从0开始
        0,
        // 每页条数
        10
).send();
// 总抵押金额
BigInteger totalStakeAmount = response.getResult().getTotalStakeAmount();
// 抵押信息条数
Integer totalStakeCount = response.getResult().getTotalStakeCount();
// 抵押信息
List<StakeListResponse.StakeInfo> stakeInfoList = response.getResult().getStakeList();
```

## 根据配额预估抵押金额

```java
Vitej vitej = new Vitej(new HttpService());
// 平均每个快照块消耗的配额，例如预期每秒发送一笔不带备注的转账交易（消耗21000配额），那么入参填21000
StakeAmountResponse response = vitej.getRequiredStakeAmount(21000L).send();
BigInteger stakeAmount = response.getStakeAmount();
```

## 获取交易所需配额

```java
Vitej vitej = new Vitej(new HttpService());
RequiredQuotaResponse response = vitej.getRequiredQuota(
        // 交易参数，同sendTransaction接口
        new TransactionParams()
                // 交易类型，默认值SEND_CALL
                .setBlockType(EBlockType.SEND_CALL.getValue())
                // 签名交易地址
                .setAddress(new Address("vite_0996e651f3885e6e6b83dfba8caa095ff7aa248e4a429db7bd"))
                // 接收交易地址
                .setToAddress(new Address("vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68"))
                // 交易备注
                .setData("Hello".getBytes())).send();
Long requiredQuota = response.getRequiredQuota();
```

## 获取发交易需要计算的PoW难度

```java
Vitej vitej = new Vitej(new HttpService());
PoWDifficultyResponse response = vitej.getPoWDifficulty(
        // 交易参数，同sendTransaction接口
        new TransactionParams()
                // 交易类型，默认值SEND_CALL
                .setBlockType(EBlockType.SEND_CALL.getValue())
                // 签名交易地址
                .setAddress(new Address("vite_0996e651f3885e6e6b83dfba8caa095ff7aa248e4a429db7bd"))
                // 接收交易地址
                .setToAddress(new Address("vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68"))
                // 交易备注
                .setData("Hello".getBytes())).send();
// 发送交易所需配额
Long requiredQuota = response.getResult().getRequiredQuota();
// 判断网络是否拥堵，如果网络拥堵，建议等待一段时间后再发交易
boolean isCongested = response.getResult().getCongestion();
// 发送这笔交易需要计算的PoW难度
BigInteger difficulty = response.getResult().getDifficulty();
```
