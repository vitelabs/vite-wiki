---
sidebarDepth: 4
---

# Utility API

## Determine Block Type

```java
// determine block type based on 'blockType' field
Boolean isSendBlock = BlockUtils.isSendBlock(EBlockType.SEND_CALL.getValue());
Boolean isReceiveBlock = BlockUtils.isReceiveBlock(EBlockType.RECEIVE.getValue());
// determine block type directly
AccountBlock accountBlock = ...;
Boolean isSendBlock = accountBlock.isSendBlock();
Boolean isReceiveBlock = accountBlock.isReceiveBlock();
```

## Check Contract Execution Result

The method consists of the following steps:

1. Look up for the account block that `sendBlockHash` refers to. If it doesn't exist, return `false`;
2. Verify if the request transaction contained in send block is valid contract call transaction (`toAddress` is contract address and block type is `SEND_CALL` or `SEND_CREATE`). Return `false` if no;
3. Check if the request has been accepted by smart contract (valid `receiveBlockHash` is contained in send block). If no, loop for up to 10 times retry by default until correct `receiveBlockHash` is set. If maximum retry is reached and `receiveBlockHash` is still not set, return `false`; 

:::tip Tips
The possible reason could be contract is short of quota, or `ResponseLatency`/`randomDegree` for the contract is too high so that in-coming request can only be accepted after certain waiting number is reached.
:::

4. Confirm the smart contract is executed as expected (value of the 33th byte of data field of response transaction should be `0`; any non-zero value indicates execution failure). If the value is not zero, return `false`;
5. Confirm all in-contract request transactions (RS blocks) are executed successfully, if any. Then return `true`.

```java
Vitej vitej = new Vitej(new HttpService());
Hash sendBlockHash = new Hash("7683bbc8be1391172ed21cc1fe0843ac3b1311109aa329601b73f717e6a93b53");
// use default retry times (=10)
boolean success = ProtocolUtils.checkCallContractResult(vitej, sendBlockHash);
// use retry times 15
boolean success = ProtocolUtils.checkCallContractResult(vitej, sendBlockHash, 15);
```

## ABI Encoding / Decoding
```java
// parse from JSON string
Abi abi = Abi.fromJson("[" +
        "{\"type\":\"function\",\"name\":\"voteForSBP\", \"inputs\":[{\"name\":\"sbpName\",\"type\":\"string\"}]}," +
        "{\"type\":\"offchain\",\"name\":\"getVotes\", \"inputs\":[{\"name\":\"voteAddress\",\"type\":\"address\"}], \"outputs\":[{\"name\":\"sbpName\",\"type\":\"string\"}]}," +
        "{\"type\":\"event\",\"name\":\"VoteForSBP\", \"inputs\":[{\"name\":\"sbpName\",\"type\":\"string\"},{\"name\":\"voteAddress\",\"type\":\"address\"}]}" +
        "]");
// select function by name
Abi.Function functionByName = abi.findFunctionByName("voteForSBP");
// encode function call, passing in one parameter 'Vite_SBP01'
byte[] encodedFunctionData1 = functionByName.encode("Vite_SBP01");
byte[] encodedFunctionData2 = abi.encodeFunction("voteForSBP", "Vite_SBP01");
// select function by encoded data
Abi.Function functionByData = abi.findFunctionByData(encodedFunctionData1);
// decode from data
List<?> decodedFunctionParams = functionByData.decode(encodedFunctionData1);
List<?> decodedFunctionParams2 = abi.decodeFunction(encodedFunctionData1);

// select getter function by name
Abi.Offchain offchainByName = abi.findOffchainByName("getVotes");
// encode getter function to look into the data field of a smart contract
byte[] encodedOffchainData1 = offchainByName.encode(new Address("vite_0996e651f3885e6e6b83dfba8caa095ff7aa248e4a429db7bd"));
byte[] encodedOffchainData2 = abi.encodeOffchain("getVotes", new Address("vite_0996e651f3885e6e6b83dfba8caa095ff7aa248e4a429db7bd"));
// decode return value
List<?> decodedOffchainParams = abi.decodeOffchainOutput("getVotes", BytesUtils.hexStringToBytes("0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000a566974655f534250303100000000000000000000000000000000000000000000"));

// find event by name
Abi.Event eventByName = abi.findEventByName("VoteForSBP");
// find event by topics
List<Hash> eventTopics = Arrays.asList(new Hash("afa4799f2c9e07964e722c02e1c5b6f1a84aca56854e5b0eba69c2a067843cd1"));
Abi.Event eventByTopics = abi.findEventByTopics(eventTopics);
// decode smart contract event
byte[] eventData = BytesUtils.hexStringToBytes("000000000000000000000000000000000000000000000000000000000000004000000000000000000000000996e651f3885e6e6b83dfba8caa095ff7aa248e00000000000000000000000000000000000000000000000000000000000000000a566974655f534250303100000000000000000000000000000000000000000000");
List<?> decodedEventParams1 = eventByTopics.decode(eventData, eventTopics);
List<?> decodedEventParams2 = abi.decodeEvent(eventData, eventTopics);
```
