---
sidebarDepth: 4
---

# 调用RPC接口

## 开始

### 创建`Vitej`对象

后续使用`Vitej`来调用RPC接口。

使用http方式调用RPC接口：

```java
// 默认连接到 http://127.0.0.1:48132
Vitej vitej = new Vitej(new HttpService());
// 指定go-vite http url
Vitej vitej = new Vitej(new HttpService("http://127.0.0.1:48132"));
// 指定go-vite http url和http client
Vitej vitej = new Vitej(new HttpService("http://127.0.0.1:48132", new OkHttpClient.Builder().build()));
// 指定默认地址，后续发交易或者查询时默认使用keyPair地址
KeyPair keyPair = new Wallet(Arrays.asList("network","north","tell","potato","predict","almost","wonder","spirit","wheel","smile","disease","bonus","round","flock","pole","review","music","oven","clarify","exclude","loyal","episode","image","notable")).deriveKeyPair();
Vitej vitej = new Vitej(new HttpService(), keyPair);
```

使用WebSocket方式调用RPC接口：
```java
// 默认连接到 ws://127.0.0.1:41420
WebSocketService ws = new WebSocketService();
ws.connect();
Vitej vitej = new Vitej(ws);
// 指定go-vite WebSocket url
WebSocketService ws = new WebSocketService("ws://127.0.0.1:41420");
ws.connect();
Vitej vitej = new Vitej(ws);
// 指定go-vite WebSocket url和http client
WebSocketService ws = new WebSocketService("ws://127.0.0.1:41420", new OkHttpClient.Builder().build());
ws.connect();
Vitej vitej = new Vitej(ws);
// 指定默认地址，后续发交易或者查询时默认使用keyPair地址
WebSocketService ws = new WebSocketService();
ws.connect();
KeyPair keyPair = new Wallet(Arrays.asList("network","north","tell","potato","predict","almost","wonder","spirit","wheel","smile","disease","bonus","round","flock","pole","review","music","oven","clarify","exclude","loyal","episode","image","notable")).deriveKeyPair();
Vitej vitej = new Vitej(ws, keyPair);
```

### 调用RPC接口

[RPC接口汇总](../rpc/)

#### Request

RPC接口请求对象。符合`JSON-RPC 2.0`。

* `jsonrpc`: `String` 协议版本号，必须写`2.0`
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
 
RPC接口响应对象。符合`JSON-RPC 2.0`。

* `id`: `long` 响应标识，和Request中的id字段一致
* `jsonrpc`: `String` 协议版本号，值为`2.0`
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

```java
AccountBlocksResponse response = vitej.getAccountBlocksByAddress(
        new Address("vite_0996e651f3885e6e6b83dfba8caa095ff7aa248e4a429db7bd"), 0, 10
    ).send();
List<AccountBlock> accountBlockList = response.getResult();
```

异步调用

```java
CompletableFuture<AccountBlocksResponse> future = vitej.getAccountBlocksByAddress(
        new Address("vite_0996e651f3885e6e6b83dfba8caa095ff7aa248e4a429db7bd"), 0, 10
).sendAsync();
AccountBlocksResponse response = future.get();
List<AccountBlock> accountBlockList = response.getResult();
```

## RPC方法

### 发交易

sendTransaction接口发送交易流程如下：
1. 检查交易字段，自动填充必要的交易字段和默认值
2. 如果`autoPoW`为`true`，计算交易所需配额和账户当前配额，判断配额是否充足，如果配额不足，计算PoW难度，计算PoW
3. 计算交易哈希，签名交易

注意如果`autoPoW`为`true`，要求连接到的`go-vite`节点的`node_config.json`的`PublicModules`中配置了`util`模块。

#### 发送普通转账交易
```java
Vitej vitej = new Vitej(new HttpService());
KeyPair keyPair = new Wallet(Arrays.asList("network", "north", "tell", "potato", "predict", "almost", "wonder", "spirit", "wheel", "smile", "disease", "bonus", "round", "flock", "pole", "review", "music", "oven", "clarify", "exclude", "loyal", "episode", "image", "notable")).deriveKeyPair();
Request<?, EmptyResponse> request = vitej.sendTransaction(
        // 签名这笔交易的公私钥对
        keyPair,
        // 交易参数
        new TransactionParams()
                // 交易类型，非必填，默认SEND_CALL
                .setBlockType(EBlockType.SEND_CALL.getValue())
                // 交易接收地址，必填
                .setToAddress(new Address("vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68"))
                // 转账金额，非必填，默认0
                .setAmount(BigInteger.valueOf(1))
                // 转账代币id，非必填，默认VITE
                .setTokenId(CommonConstants.VITE_TOKEN_ID)
                // 备注，非必填，默认空
                .setData("Hello".getBytes()),
        // 如果配额不足，是否自动计算PoW
        false);
Hash sendBlockHash = ((TransactionParams) request.getParams().get(0)).getHashRaw();
EmptyResponse response = request.send();
```

#### 发送响应交易

```java
Vitej vitej = new Vitej(new HttpService());
KeyPair keyPair = new Wallet(Arrays.asList("network", "north", "tell", "potato", "predict", "almost", "wonder", "spirit", "wheel", "smile", "disease", "bonus", "round", "flock", "pole", "review", "music", "oven", "clarify", "exclude", "loyal", "episode", "image", "notable")).deriveKeyPair();
Request<?, EmptyResponse> request = vitej.sendTransaction(keyPair,
        new TransactionParams()
                // 交易类型，必填，填RECEIVE
                .setBlockType(EBlockType.RECEIVE.getValue())
                // 请求交易哈希，必填
                .setSendBlockHash(new Hash("ef5dccd73a6ef6370bc72b56b686362fd095152e2746f21113c2015e243b5056")),
        false);
Hash receiveBlockHash = ((TransactionParams) request.getParams().get(0)).getHashRaw();
EmptyResponse response = request.send();
```

#### 发送调用合约接口

参考 [调用合约步骤](../rpc/contract_v2.html#调用合约步骤)

```java
Vitej vitej = new Vitej(new HttpService());
KeyPair keyPair = new Wallet(Arrays.asList("network", "north", "tell", "potato", "predict", "almost", "wonder", "spirit", "wheel", "smile", "disease", "bonus", "round", "flock", "pole", "review", "music", "oven", "clarify", "exclude", "loyal", "episode", "image", "notable")).deriveKeyPair();
// 根据ABI定义生成调用合约的data（包括方法签名和方法参数）
Abi abi = Abi.fromJson("[{\"type\":\"function\",\"name\":\"VoteForSBP\", \"inputs\":[{\"name\":\"sbpName\",\"type\":\"string\"}]}]");
byte[] callContractData = abi.encodeFunction("VoteForSBP", "Vite_SBP01");
Request<?, EmptyResponse> request = vitej.sendTransaction(
        keyPair,
        new TransactionParams()
                // 交易类型，必填，填SEND_CALL
                .setBlockType(EBlockType.SEND_CALL.getValue())
                // 合约账户地址，必填
                .setToAddress(new Address("vite_0000000000000000000000000000000000000004d28108e76b"))
                // 调用合约接口时的转账金额，非必填，默认0
                .setAmount(new BigInteger("0"))
                // 调用合约接口时的转账代币id，非必填，默认VITE
                .setTokenId(CommonConstants.VITE_TOKEN_ID)
                // 调用合约的data，非必填，默认空
                .setData(callContractData),
        false);
Hash sendBlockHash = ((TransactionParams) request.getParams().get(0)).getHashRaw();
EmptyResponse response = request.send();
// 检查调用合约是否成功
boolean callSuccess = ProtocolUtils.checkCallContractResult(vitej, sendBlockHash);
```

#### 创建合约

参考 [创建合约步骤](../rpc/contract_v2.html#创建合约步骤)

```java
Vitej vitej = new Vitej(new HttpService());
KeyPair keyPair = new Wallet(Arrays.asList("network", "north", "tell", "potato", "predict", "almost", "wonder", "spirit", "wheel", "smile", "disease", "bonus", "round", "flock", "pole", "review", "music", "oven", "clarify", "exclude", "loyal", "episode", "image", "notable")).deriveKeyPair();
// 智能合约二进制代码。编译代码时指定--bin参数后得到的Binary代码。
byte[] bytecode = BytesUtils.hexStringToBytes("6080604052348015600f57600080fd5b50604051602080608183398101806040526020811015602d57600080fd5b810190808051906020019092919050505050603580604c6000396000f3fe6080604052600080fdfea165627a7a723058208602dc0b6a1bf2e56f2160299868dc8c3f435c9af6d384858722a21906c7c0740029");
// 根据构造函数的ABI定义生成参数
Abi abi = Abi.fromJson("[{\"inputs\":[{\"name\":\"i\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"}]");
byte[] callConstructorData = abi.encodeConstructor(BigInteger.valueOf(1));
// 生成创建合约的data，5个参数含义分别为：二进制代码，构造函数的参数，确认数，随机数确认数，配额翻倍数
byte[] createContractData = ContractUtils.getCreateContractData(bytecode, callConstructorData, 2, 1, 10);
Request<?, EmptyResponse> request = vitej.sendTransaction(
        keyPair,
        new TransactionParams()
                // 交易类型，必填，值为SEND_CREATE
                .setBlockType(EBlockType.SEND_CREATE.getValue())
                // 调用构造函数时的转账金额，非必填，默认为0
                .setAmount(new BigInteger("0"))
                // 调用构造函数时的转账代币id，非必填，默认为VITE
                .setTokenId(CommonConstants.VITE_TOKEN_ID)
                // 创建合约需要销毁10 VITE，非必填，默认为10 VITE
                .setFee(CommonConstants.CREATE_CONTRACT_FEE)
                // 创建合约参数，必填
                .setData(createContractData),
        false);
Hash sendBlockHash = ((TransactionParams) request.getParams().get(0)).getHashRaw();
EmptyResponse response = request.send();
boolean callSuccess = ProtocolUtils.checkCallContractResult(vitej, sendBlockHash);
```

### 计算PoW

```java
Vitej vitej = new Vitej(new HttpService());
PoWNonceResponse response = vitej.getPoWNonce(
        // PoW难度
        BigInteger.valueOf(67108863),
        // data，可以通过BlockUtils.getPoWData接口获取
        new Hash("d517e8d4dc9c676876b72ad0cbb4c45890804aa438edd1f171ffc66276202a95")
).send();
byte[] nonce = response.getNonce();
```

### 根据地址查询账户块列表

从账户链上最新的块开始，往前查询账户块，返回值按高度倒序排序。

```java
Vitej vitej = new Vitej(new HttpService());
AccountBlocksResponse response = vitej.getAccountBlocksByAddress(
        // 账户地址
        new Address("vite_0996e651f3885e6e6b83dfba8caa095ff7aa248e4a429db7bd"),
        // 页码，从0开始
        0,
        // 每页条数
        10).send();
List<AccountBlock> accountBlockList = response.getResult();
```

### 根据高度查询账户块

```java
Vitej vitej = new Vitej(new HttpService());
AccountBlockResponse response = vitej.getAccountBlockByHeight(
        // 账户地址
        new Address("vite_0996e651f3885e6e6b83dfba8caa095ff7aa248e4a429db7bd"),
        // 账户块高度
        1L).send();
AccountBlock accountBlock = response.getResult();
```

### 根据哈希查询账户块

```java
Vitej vitej = new Vitej(new HttpService());
AccountBlockResponse response = vitej.getAccountBlockByHash(
        // 账户块哈希
        new Hash("c4b11ff481c5476945000993816794fbc21a315901aaecb523b503c19c133154")).send();
AccountBlock accountBlock = response.getResult();
```

### 根据哈希查询完整账户块

如果传入合约RS块的S交易哈希，则返回完整的RS块

```java
Vitej vitej = new Vitej(new HttpService());
AccountBlockResponse response = vitej.getCompleteAccountBlockByHash(
        // 账户块哈希
        new Hash("c4b11ff481c5476945000993816794fbc21a315901aaecb523b503c19c133154")).send();
AccountBlock accountBlock = response.getResult();
```

### 查询最新的账户块

```java
Vitej vitej = new Vitej(new HttpService());
AccountBlockResponse response = vitej.getLatestAccountBlock(
        // 账户地址
        new Address("vite_0996e651f3885e6e6b83dfba8caa095ff7aa248e4a429db7bd")).send();
AccountBlock accountBlock = response.getResult();
```

### 根据代币id查询账户块

```java
Vitej vitej = new Vitej(new HttpService());
AccountBlocksResponse response = vitej.getAccountBlocks(
        // 账户地址，必填
        new Address("vite_0996e651f3885e6e6b83dfba8caa095ff7aa248e4a429db7bd"),
        // 开始查询的账户块哈希，非必填，如果为空，默认从最新的账户块开始查询
        new Hash("c4b11ff481c5476945000993816794fbc21a315901aaecb523b503c19c133154"),
        // 查询的代币id，非必填，如果为空，默认查询所有的代币
        CommonConstants.VITE_TOKEN_ID,
        // 查询条数，必填
        10
).send();
List<AccountBlock> accountBlockList = response.getResult();
```

### 查询账户信息

```java
Vitej vitej = new Vitej(new HttpService());
AccountInfoResponse response = vitej.getAccountInfoByAddress(
        // 账户地址
        new Address("vite_0996e651f3885e6e6b83dfba8caa095ff7aa248e4a429db7bd")
).send();
// 交易数量
Long blockCount = response.getResult().getBlockCount();
// 各代币账户余额
Map<TokenId, AccountInfoResponse.BalanceInfo> balanceInfoMap = response.getResult().getBalanceInfoMap();
```

### 根据地址查询待接收交易

```java
Vitej vitej = new Vitej(new HttpService());
AccountBlocksResponse response = vitej.getUnreceivedBlocksByAddress(
        // 账户地址
        new Address("vite_0996e651f3885e6e6b83dfba8caa095ff7aa248e4a429db7bd"),
        // 页码，从0开始
        0,
        // 每页条数
        10
).send();
// 待接收交易列表
List<AccountBlock> accountBlockList = response.getResult();
```

### 查询账户待接收交易汇总信息

```java
Vitej vitej = new Vitej(new HttpService());
AccountInfoResponse response = vitej.getUnreceivedTransactionSummaryByAddress(
        // 账户地址
        new Address("vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68")
).send();
// 待接收交易数量
Long blockCount = response.getResult().getBlockCount();
// 待接收交易中，各代币金额汇总
Map<TokenId, AccountInfoResponse.BalanceInfo> balanceInfoMap = response.getResult().getBalanceInfoMap();
```

### 查询最新的快照块哈希

```java
Vitej vitej = new Vitej(new HttpService());
LatestSnapshotHashResponse response = vitej.getLatestSnapshotHash().send();
Hash latestSnapshotHash = response.getHash();
```

### 查询最新的快照块高度

```java
Vitej vitej = new Vitej(new HttpService());
SnapshotChainHeightResponse response = vitej.getSnapshotChainHeight().send();
Long latestSnapshotHeight = response.getHeight();
```

### 查询最新的快照块信息

```java
Vitej vitej = new Vitej(new HttpService());
SnapshotBlockResponse response = vitej.getLatestSnapshotBlock().send();
SnapshotBlock snapshotBlock = response.getResult();
```

### 查询快照块列表

从指定高度开始往前批量查询快照块信息，返回值按高度倒序排序

```java
Vitej vitej = new Vitej(new HttpService());
SnapshotBlocksResponse response = vitej.getSnapshotBlocks(
        // 开始查询的高度
        100L,
        // 查询条数
        10
).send();
List<SnapshotBlock> snapshotBlock = response.getResult();
```

### 根据合约响应交易哈希查询合约事件

```java
Vitej vitej = new Vitej(new HttpService());
VmlogsResponse response = vitej.getVmlogs(
        new Hash("d519bd49599df00b6a5992a50065af7945c4b6af269af8791cca5688f3277e37")
).send();
List<Vmlog> vmLogList = response.getResult();
```

### 根据过滤条件查询合约事件

```java
Vitej vitej = new Vitej(new HttpService());
// 过滤条件，只查询vite_000000000000000000000000000000000000000595292d996d合约高度范围为1-10的账户块
VmLogFilter filter = new VmLogFilter(new Address("vite_000000000000000000000000000000000000000595292d996d"),
        1L, 10L);
// 合约事件topics过滤条件，下面的条件表示合约事件至少有两个indexed字段，其中，第一个indexed字段值取值为000000000000000000000000000000000000000000005649544520544f4b454e或者00000000000000000000000000000000000000000000564954455820434f494e
filter.setTopics(Arrays.asList(
        Collections.emptyList(),
        Arrays.asList(new Hash("000000000000000000000000000000000000000000005649544520544f4b454e"), new Hash("00000000000000000000000000000000000000000000564954455820434f494e")),
        Collections.emptyList()
));
VmlogInfosResponse response = vitej.getVmlogsByFilter(
        filter
).send();
List<VmLogInfo> vmLogInfoList = response.getResult();
```

### 查询合约信息

```java
Vitej vitej = new Vitej(new HttpService());
ContractInfoResponse response = vitej.getContractInfo(
        new Address("vite_000000000000000000000000000000000000000595292d996d")
).send();
ContractInfo contractInfo = response.getResult();
```

### 离线调用合约方法

```java
Vitej vitej = new Vitej(new HttpService());
// 智能合约offchain ABI定义
Abi abi = Abi.fromJson("[{\"inputs\":[],\"name\":\"getData\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"type\":\"offchain\"}]");
String methodName = "getData";
// 离线调用合约方法的data，包括方法签名和方法参数
CallOffChainMethodResponse response = vitej.callOffChainMethod(
        // 合约地址
        new Address("vite_da0e4189f8155035d5b373f8f1328e43d7d70980f4fb69ff18"),
        // 合约offchain二进制代码。编译代码时指定--bin参数后得到的Offchain Binary代码。
        BytesUtils.hexStringToBytes("6080604052600436106042576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c1a34865146044576042565b005b604a6060565b6040518082815260200191505060405180910390f35b60006000600050549050606e565b9056fea165627a7a7230582098acc939ef119097e24d6b599d9dd18bb2061a9fab6ec77401def1c0a7e52ecd0029"),
        abi.encodeOffchain(methodName)
).send();
// 用ABI反解析返回值
List<?> outputList = abi.decodeOffchainOutput(methodName, response.getReturnData());
BigInteger output = ((BigInteger) outputList.get(0));
```

### 查询节点网络连接信息

```java
Vitej vitej = new Vitej(new HttpService());
NetNodeInfoResponse response = vitej.netNodeInfo().send();
NetNodeInfoResponse.Result nodeInfo = response.getResult();
```

### 查询节点同步状态

```java
Vitej vitej = new Vitej(new HttpService());
NetSyncInfoResponse response = vitej.netSyncInfo().send();
NetSyncInfoResponse.Result nodeInfo = response.getResult();
```

### 查询节点同步详情

```java
Vitej vitej = new Vitej(new HttpService());
NetSyncDetailResponse response = vitej.netSyncDetail().send();
NetSyncDetailResponse.Result nodeInfo = response.getResult();
```

## 查询其他RPC接口

```java
Vitej vitej = new Vitej(new HttpService());
CommonResponse response = vitej.commonMethod("ledger_getAccountBlocksByAddress", "vite_ab24ef68b84e642c0ddca06beec81c9acb1977bbd7da27a87a",0,10).send();
Object result = response.getResult();
```
