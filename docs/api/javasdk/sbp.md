---
sidebarDepth: 4
---

# SBP & Voting API

## Register New SBP
```java
Vitej vitej = new Vitej(new HttpService());
Request<?, EmptyResponse> request = vitej.registerSBP(keyPair, "test_sbp", keyPair.getAddress(), keyPair.getAddress());
EmptyResponse response = request.send();
Preconditions.checkArgument(response.getError() == null);
Preconditions.checkArgument(ProtocolUtils.checkCallContractResult(vitej, ((TransactionParams) request.getParams().get(0)).getHashRaw()));
```

## Update Block Producing Address
```java
Vitej vitej = new Vitej(new HttpService());
Request<?, EmptyResponse> request = vitej.updateSBPBlockProducingAddress(keyPair, "test_sbp", new Address("vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68"));
EmptyResponse response = request.send();
Preconditions.checkArgument(response.getError() == null);
Preconditions.checkArgument(ProtocolUtils.checkCallContractResult(vitej, ((TransactionParams) request.getParams().get(0)).getHashRaw()));
```

## Update Reward Withdrawal Address
```java
Vitej vitej = new Vitej(new HttpService());
Request<?, EmptyResponse> request = vitej.updateSBPRewardWithdrawAddress(keyPair, "test_sbp", new Address("vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68"));
EmptyResponse response = request.send();
Preconditions.checkArgument(response.getError() == null);
Preconditions.checkArgument(ProtocolUtils.checkCallContractResult(vitej, ((TransactionParams) request.getParams().get(0)).getHashRaw()));
```

## Withdraw Reward
```java
Vitej vitej = new Vitej(new HttpService());
Request<?, EmptyResponse> request = vitej.withdrawSBPReward(keyPair, "test_sbp", new Address("vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68"));
EmptyResponse response = request.send();
Preconditions.checkArgument(response.getError() == null);
Preconditions.checkArgument(ProtocolUtils.checkCallContractResult(vitej, ((TransactionParams) request.getParams().get(0)).getHashRaw()));
```

## Cancel SBP Registration
```java
Vitej vitej = new Vitej(new HttpService());
Request<?, EmptyResponse> request = vitej.revokeSBP(keyPair, "test_sbp");
EmptyResponse response = request.send();
Preconditions.checkArgument(response.getError() == null);
Preconditions.checkArgument(ProtocolUtils.checkCallContractResult(vitej, ((TransactionParams) request.getParams().get(0)).getHashRaw()));
```

## Vote for SBP
```java
Vitej vitej = new Vitej(new HttpService());
Request<?, EmptyResponse> request = vitej.voteForSBP(keyPair, "s1");
EmptyResponse response = request.send();
Preconditions.checkArgument(response.getError() == null);
Preconditions.checkArgument(ProtocolUtils.checkCallContractResult(vitej, ((TransactionParams) request.getParams().get(0)).getHashRaw()));
```

## Cancel Voting
```java
Vitej vitej = new Vitej(new HttpService());
Request<?, EmptyResponse> request = vitej.cancelSBPVoting(keyPair);
EmptyResponse response = request.send();
Preconditions.checkArgument(response.getError() == null);
Preconditions.checkArgument(ProtocolUtils.checkCallContractResult(vitej, ((TransactionParams) request.getParams().get(0)).getHashRaw()));
```

## Get SBP Summary (by registration address)

```java
Vitej vitej = new Vitej(new HttpService());
SBPListResponse response = vitej.getSBPList(
        // registration address
        new Address("vite_0996e651f3885e6e6b83dfba8caa095ff7aa248e4a429db7bd")
).send();
// return summary of sbp nodes registered by the address 
List<SBPInfo> sbpInfoList = response.getResult();
```

## Query Available Reward for Withdrawal

```java
Vitej vitej = new Vitej(new HttpService());
SBPRewardResponse response = vitej.getSBPRewardPendingWithdrawal(
        // sbp name
        "Vite_SBP01"
).send();
SBPRewardResponse.Result reward = response.getResult();
```

## Get SBP Summary (by name)

```java
Vitej vitej = new Vitej(new HttpService());
SBPResponse response = vitej.getSBP(
        // sbp name
        "Vite_SBP01"
).send();
SBPInfo sbpInfo = response.getResult();
```

## Query Reward Details in Cycle

```java
Vitej vitej = new Vitej(new HttpService());
SBPRewardDetailResponse response = vitej.getSBPRewardByCycle(
        // cycle index. the first cycle (cycle 0) is from 20190521T12:00:00+08:00 to 20190522T12:00:00+08:00
        1L
).send();
SBPRewardDetailResponse.Result rewardDetail = response.getResult();
```

## Query Voting Details in Cycle

```java
Vitej vitej = new Vitej(new HttpService());
SBPVoteDetailsResponse response = vitej.getSBPVoteDetailsByCycle(
        // cycle index. the first cycle (cycle 0) is from 20190521T12:00:00+08:00 to 20190522T12:00:00+08:00
        0L
).send();
List<SBPVoteDetailsResponse.Result> voteDetail = response.getResult();
```

## Get Voting Summary (by address)

```java
Vitej vitej = new Vitej(new HttpService());
VotedSBPResponse response = vitej.getVotedSBP(
        new Address("vite_0996e651f3885e6e6b83dfba8caa095ff7aa248e4a429db7bd")
).send();
VotedSBPResponse.Result votedSBP = response.getResult();
```
