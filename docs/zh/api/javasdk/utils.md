---
sidebarDepth: 4
---

# 工具

## 判断交易类型

```demo
// 根据blockType字段判断交易类型
Boolean isSendBlock = BlockUtils.isSendBlock(EBlockType.SEND_CALL.getValue());
Boolean isReceiveBlock = BlockUtils.isReceiveBlock(EBlockType.RECEIVE.getValue());
// 直接判断一个accountBlock的交易类型
AccountBlock accountBlock = ...;
Boolean isSendBlock = accountBlock.isSendBlock();
Boolean isReceiveBlock = accountBlock.isReceiveBlock();
```

## 校验调用合约是否成功

判断逻辑为：

1. 校验sendBlockHash对应的账户块是否存在，如果不存在，返回false；
2. 校验sendBlockHash对应的交易是否为调用合约交易（toAddress为合约账户地址，交易类型为SEND_CALL或者SEND_CREATE），如果不是，返回false；
3. 判断sendBlockHash对应的请求交易是否被合约接收（通过accountBlock中的receiveBlockHash字段是否存在来判断），如果未被接收，则每隔一秒查询一次，直到请求交易被接收或者到达最大重试次数（retryTime，默认为10），如果到达最大重试次数仍然未被接收，返回false。这里未被接收的原因可能是合约没有配额，或者合约在创建时设置的ResponseLatency或者randomDegree过高，导致合约需要等待一定的确认数之后才会接收交易；
4. 判断接收是否成功（根据接收交易的data字段的第33字节值是否为0来判断，值为0表示执行合约代码成功，非0表示执行合约代码失败），如果失败返回false；
5. 如果接收交易是一个RS块（即在接收之后又发起了新的请求交易），并且新的请求交易中包含合约调用交易，则继续判断这些调用合约交易是否执行成功。如果接收交易没有发起新的请求交易，或者请求交易中没有发起合约调用交易，那么返回true。

```
Vitej vitej = new Vitej(new HttpService());
Hash sendBlockHash = new Hash("7683bbc8be1391172ed21cc1fe0843ac3b1311109aa329601b73f717e6a93b53");
// 下面两种方式效果相同
boolean success = ProtocolUtils.checkCallContractResult(vitej, sendBlockHash);
boolean success = ProtocolUtils.checkCallContractResult(vitej, sendBlockHash, 10);
```

## abi编码和解析工具
```
// json字符串解析为Abi对象
Abi abi = Abi.fromJson("[" +
        "{\"type\":\"function\",\"name\":\"voteForSBP\", \"inputs\":[{\"name\":\"sbpName\",\"type\":\"string\"}]}," +
        "{\"type\":\"offchain\",\"name\":\"getVotes\", \"inputs\":[{\"name\":\"voteAddress\",\"type\":\"address\"}], \"outputs\":[{\"name\":\"sbpName\",\"type\":\"string\"}]}," +
        "{\"type\":\"event\",\"name\":\"VoteForSBP\", \"inputs\":[{\"name\":\"sbpName\",\"type\":\"string\"},{\"name\":\"voteAddress\",\"type\":\"address\"}]}" +
        "]");
// 根据名称查询方法
Abi.Function functionByName = abi.findFunctionByName("voteForSBP");
// 方法编码，即调用合约请求交易的data字段
byte[] encodedFunctionData1 = functionByName.encode("Vite_SBP01");
byte[] encodedFunctionData2 = abi.encodeFunction("voteForSBP", "Vite_SBP01");
// 根据data查询方法
Abi.Function functionByData = abi.findFunctionByData(encodedFunctionData1);
// data反解析
List<?> decodedFunctionParams = functionByData.decode(encodedFunctionData1);
List<?> decodedFunctionParams2 = abi.decodeFunction(encodedFunctionData1);

// 根据名称查询getter方法
Abi.Offchain offchainByName = abi.findOffchainByName("getVotes");
// getter方法编码，即离线调用合约方法的data字段
byte[] encodedOffchainData1 = offchainByName.encode(new Address("vite_0996e651f3885e6e6b83dfba8caa095ff7aa248e4a429db7bd"));
byte[] encodedOffchainData2 = abi.encodeOffchain("getVotes", new Address("vite_0996e651f3885e6e6b83dfba8caa095ff7aa248e4a429db7bd"));
// 反解析离线调用合约方法的返回值
List<?> decodedOffchainParams = abi.decodeOffchainOutput("getVotes", BytesUtils.hexStringToBytes("0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000a566974655f534250303100000000000000000000000000000000000000000000"));

// 根据名称查询event
Abi.Event eventByName = abi.findEventByName("VoteForSBP");
// 根据vmlog的topics查询event
List<Hash> eventTopics = Arrays.asList(new Hash("afa4799f2c9e07964e722c02e1c5b6f1a84aca56854e5b0eba69c2a067843cd1"));
Abi.Event eventByTopics = abi.findEventByTopics(eventTopics);
// 反解析vmlog
byte[] eventData = BytesUtils.hexStringToBytes("000000000000000000000000000000000000000000000000000000000000004000000000000000000000000996e651f3885e6e6b83dfba8caa095ff7aa248e00000000000000000000000000000000000000000000000000000000000000000a566974655f534250303100000000000000000000000000000000000000000000");
List<?> decodedEventParams1 = eventByTopics.decode(eventData, eventTopics);
List<?> decodedEventParams2 = abi.decodeEvent(eventData, eventTopics);
```
