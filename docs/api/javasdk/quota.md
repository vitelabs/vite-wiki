---
sidebarDepth: 4
---

# Quota API

## Stake for Quota
```java
Vitej vitej = new Vitej(new HttpService());
Request<?, EmptyResponse> request = vitej.stakeForQuota(keyPair, keyPair.getAddress(), org.vitej.core.constants.BuiltinContracts.MINIMUM_STAKE_FOR_QUOTA_AMOUNT);
EmptyResponse response = request.send();
Preconditions.checkArgument(response.getError() == null);
Preconditions.checkArgument(ProtocolUtils.checkCallContractResult(vitej, ((TransactionParams) request.getParams().get(0)).getHashRaw()));
```

## Cancel Quota Staking
```java
Vitej vitej = new Vitej(new HttpService());
Request<?, EmptyResponse> request = vitej.cancelQuotaStaking(keyPair, new Hash("874aeae0389118ade5f81371041a45bb39a85630b3eb463c3329dfef89618d36"));
EmptyResponse response = request.send();
Preconditions.checkArgument(response.getError() == null);
Preconditions.checkArgument(ProtocolUtils.checkCallContractResult(vitej, ((TransactionParams) request.getParams().get(0)).getHashRaw()));
```

## Get Account Quota Summary

```java
Vitej vitej = new Vitej(new HttpService());
QuotaResponse response = vitej.getQuotaByAccount(
        // address of account
        new Address("vite_0996e651f3885e6e6b83dfba8caa095ff7aa248e4a429db7bd")
).send();
// quota available
Long currentQuota = response.getResult().getCurrentQuota();
// max quota
Long maxQuota = response.getResult().getMaxQuota();
// total staking amount 
BigInteger stakeAmount = response.getResult().getStakeAmount();
```

## Get Account Staking List

```java
Vitej vitej = new Vitej(new HttpService());
StakeListResponse response = vitej.getStakeList(
        // staking address
        new Address("vite_0996e651f3885e6e6b83dfba8caa095ff7aa248e4a429db7bd"),
        // page index. start at 0
        0,
        // page size
        10
).send();
// total staking amount
BigInteger totalStakeAmount = response.getResult().getTotalStakeAmount();
// total staking records
Integer totalStakeCount = response.getResult().getTotalStakeCount();
// staking list
List<StakeListResponse.StakeInfo> stakeInfoList = response.getResult().getStakeList();
```

## Calculate Expected Staking Amount 

The input parameter is estimated quota consumption per second. For example, if you need send a basic transaction (no comment) in every second, you should input 21000.

```java
Vitej vitej = new Vitej(new HttpService());
StakeAmountResponse response = vitej.getRequiredStakeAmount(21000L).send();
BigInteger stakeAmount = response.getStakeAmount();
```

## Calculate Quota Consumption

```java
Vitej vitej = new Vitej(new HttpService());
RequiredQuotaResponse response = vitej.getRequiredQuota(
        // transaction parameters
        new TransactionParams()
                // block type. default is SEND_CALL
                .setBlockType(EBlockType.SEND_CALL.getValue())
                // sender address
                .setAddress(new Address("vite_0996e651f3885e6e6b83dfba8caa095ff7aa248e4a429db7bd"))
                // recipient address
                .setToAddress(new Address("vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68"))
                // comment
                .setData("Hello".getBytes())).send();
Long requiredQuota = response.getRequiredQuota();
```

## Calculate Expected PoW Difficulty

```java
Vitej vitej = new Vitej(new HttpService());
PoWDifficultyResponse response = vitej.getPoWDifficulty(
        // transaction parameters
        new TransactionParams()
                // block type. default is SEND_CALL
                .setBlockType(EBlockType.SEND_CALL.getValue())
                // sender address
                .setAddress(new Address("vite_0996e651f3885e6e6b83dfba8caa095ff7aa248e4a429db7bd"))
                // recipient address
                .setToAddress(new Address("vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68"))
                // comment
                .setData("Hello".getBytes())).send();
// estimated quota consumption for sending this transaction
Long requiredQuota = response.getResult().getRequiredQuota();
// network jam flag. when Vite network is jammed, expect more quota to be consumed than usual. In this case, you need more quota or wait for a while to send the transaction
boolean isCongested = response.getResult().getCongestion();
// expected pow difficulty for sending this transaction
BigInteger difficulty = response.getResult().getDifficulty();
```
