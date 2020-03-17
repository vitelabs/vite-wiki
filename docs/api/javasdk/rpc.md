---
sidebarDepth: 4
---

# RPC API Wrapper

## How to Call RPC API

### Create ViteJ Object

ViteJ object is instantiated to call RPC API

Using HTTP:

```java
// default url is http://127.0.0.1:48132
Vitej vitej0 = new Vitej(new HttpService());
// but you can specify a different one
Vitej vitej1 = new Vitej(new HttpService("http://127.0.0.1:48132"));
// specify http url and http client
Vitej vitej2 = new Vitej(new HttpService("http://127.0.0.1:48132", new OkHttpClient.Builder().build()));
// use given private key
KeyPair keyPair = new Wallet(Arrays.asList("network","north","tell","potato","predict","almost","wonder","spirit","wheel","smile","disease","bonus","round","flock","pole","review","music","oven","clarify","exclude","loyal","episode","image","notable")).deriveKeyPair();
Vitej vitej3 = new Vitej(new HttpService(), keyPair);
```

Using WebSocket:
```java
// default url is ws://127.0.0.1:41420
WebSocketService ws0 = new WebSocketService();
ws.connect();
Vitej vitej = new Vitej(ws);
// but you can specify a different one
WebSocketService ws1 = new WebSocketService("ws://127.0.0.1:41420");
ws.connect();
Vitej vitej = new Vitej(ws);
// specify websocket url and http client
WebSocketService ws2 = new WebSocketService("ws://127.0.0.1:41420", new OkHttpClient.Builder().build());
ws.connect();
Vitej vitej = new Vitej(ws);
// use given private key
WebSocketService ws3 = new WebSocketService();
ws.connect();
KeyPair keyPair = new Wallet(Arrays.asList("network","north","tell","potato","predict","almost","wonder","spirit","wheel","smile","disease","bonus","round","flock","pole","review","music","oven","clarify","exclude","loyal","episode","image","notable")).deriveKeyPair();
Vitej vitej = new Vitej(ws, keyPair);
```

### Call RPC API

Refer to [Vite RPC API](../rpc/)

#### Request

Request JSON object (JSON-RPC 2.0)

* `jsonrpc`: `String` Version. must be `2.0`
* `id`: `long` Request ID
* `method`: `String` Method name
* `params`: `List<Object>` Parameter list

```demo
{
	"jsonrpc": "2.0",
	"id": 1,
	"method": "ledger_getLatestSnapshotHash",
	"params": []
}
```

#### Response 
 
Response JSON object (JSON-RPC 2.0)

* `id`: `long` Response ID, have the same value with the request ID
* `jsonrpc`: `String` Version. must be `2.0`
* `result`: `Object` Response result
* `error`: Error message
  * `code`: `int` Error code
  * `message`: `String` Description

```demo
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "67f7ee751968a832d7d776aad6de3ca9b58f37c8c4bf8442a935f891a850d8b1"
}
```

#### Make the API Call

Synchronous call:

```java
AccountBlocksResponse response = vitej.getAccountBlocksByAddress(
        new Address("vite_0996e651f3885e6e6b83dfba8caa095ff7aa248e4a429db7bd"), 0, 10
    ).send();
List<AccountBlock> accountBlockList = response.getResult();
```

Asynchronous call:

```java
CompletableFuture<AccountBlocksResponse> future = vitej.getAccountBlocksByAddress(
        new Address("vite_0996e651f3885e6e6b83dfba8caa095ff7aa248e4a429db7bd"), 0, 10
).sendAsync();
AccountBlocksResponse response = future.get();
List<AccountBlock> accountBlockList = response.getResult();
```

## RPC Method

### Send Transaction

Sending a transaction contains the following steps (by `sendTransaction` method):
1. Validate transaction object and fill in default values if some required attributes are not present;
2. If `autoPoW`=`true`, firstly complete quota consumption estimation. If current quota in account is insufficient, do a PoW puzzle to obtain temporary quota;
3. Create transaction hash, then sign the transaction.

:::tip Note
Make sure `util` module is correctly configured in `PublicModules` in `node_config.json` on your node when `autoPoW`=`true`.
:::

#### 发送普通转账交易
```
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

```
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

参考 [调用合约步骤](https://vite.wiki/zh/api/rpc/contract_v2.html#调用合约步骤)

```
Vitej vitej = new Vitej(new HttpService());
KeyPair keyPair = new Wallet(Arrays.asList("network", "north", "tell", "potato", "predict", "almost", "wonder", "spirit", "wheel", "smile", "disease", "bonus", "round", "flock", "pole", "review", "music", "oven", "clarify", "exclude", "loyal", "episode", "image", "notable")).deriveKeyPair();
// 根据ABI定义生成调用合约的data（包括方法签名和方法参数）
Abi abi = Abi.fromJson("[{\"type\":\"function\",\"name\":\"VoteForSBP\", \"inputs\":[{\"name\":\"sbpName\",\"type\":\"string\"}]}]");
byte[] callContractData = abi.encodeFunction("VoteForSBP", "Vite_SBP01");
Request<?, EmptyResponse> request = vitej.sendTransaction(
        keyPair,
        new TransactionParams()
                // 交易类型，非必填，默认SEND_CALL
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

参考 [创建合约步骤](https://vite.wiki/zh/api/rpc/contract_v2.html#创建合约步骤)

```
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

```
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

```
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

```
Vitej vitej = new Vitej(new HttpService());
AccountBlockResponse response = vitej.getAccountBlockByHeight(
        // 账户地址
        new Address("vite_0996e651f3885e6e6b83dfba8caa095ff7aa248e4a429db7bd"),
        // 账户块高度
        1L).send();
AccountBlock accountBlock = response.getResult();
```

### 根据哈希查询账户块

```
Vitej vitej = new Vitej(new HttpService());
AccountBlockResponse response = vitej.getAccountBlockByHash(
        // 账户块哈希
        new Hash("c4b11ff481c5476945000993816794fbc21a315901aaecb523b503c19c133154")).send();
AccountBlock accountBlock = response.getResult();
```

### 根据哈希查询完整账户块

如果传入合约RS块的S交易哈希，则返回完整的RS块

```
Vitej vitej = new Vitej(new HttpService());
AccountBlockResponse response = vitej.getCompleteAccountBlockByHash(
        // 账户块哈希
        new Hash("c4b11ff481c5476945000993816794fbc21a315901aaecb523b503c19c133154")).send();
AccountBlock accountBlock = response.getResult();
```

### 查询最新的账户块

```
Vitej vitej = new Vitej(new HttpService());
AccountBlockResponse response = vitej.getLatestAccountBlock(
        // 账户地址
        new Address("vite_0996e651f3885e6e6b83dfba8caa095ff7aa248e4a429db7bd")).send();
AccountBlock accountBlock = response.getResult();
```

### 根据代币id查询账户块

```
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

```
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

```
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

```
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

```
Vitej vitej = new Vitej(new HttpService());
LatestSnapshotHashResponse response = vitej.getLatestSnapshotHash().send();
Hash latestSnapshotHash = response.getHash();
```

### 查询最新的快照块高度

```
Vitej vitej = new Vitej(new HttpService());
SnapshotChainHeightResponse response = vitej.getSnapshotChainHeight().send();
Long latestSnapshotHeight = response.getHeight();
```

### 查询最新的快照块信息

```
Vitej vitej = new Vitej(new HttpService());
SnapshotBlockResponse response = vitej.getLatestSnapshotBlock().send();
SnapshotBlock snapshotBlock = response.getResult();
```

### 查询快照块列表

从指定高度开始往前批量查询快照块信息，返回值按高度倒序排序

```
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

```
Vitej vitej = new Vitej(new HttpService());
VmlogsResponse response = vitej.getVmlogs(
        new Hash("d519bd49599df00b6a5992a50065af7945c4b6af269af8791cca5688f3277e37")
).send();
List<Vmlog> vmLogList = response.getResult();
```

### 根据过滤条件查询合约事件

```
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

```
Vitej vitej = new Vitej(new HttpService());
ContractInfoResponse response = vitej.getContractInfo(
        new Address("vite_000000000000000000000000000000000000000595292d996d")
).send();
ContractInfo contractInfo = response.getResult();
```

### 离线调用合约方法

```
Vitej vitej = new Vitej(new HttpService());
// 智能合约offchain ABI定义
Abi abi = Abi.fromJson("[{\"inputs\":[],\"name\":\"getData\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"type\":\"offchain\"}]");
String methodName = "getData";
CallOffChainMethodResponse response = vitej.callOffChainMethod(
        // 合约地址
        new Address("vite_da0e4189f8155035d5b373f8f1328e43d7d70980f4fb69ff18"),
        // 合约offchain二进制代码。编译代码时指定--bin参数后得到的Offchain Binary代码。
        BytesUtils.hexStringToBytes("6080604052600436106042576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c1a34865146044576042565b005b604a6060565b6040518082815260200191505060405180910390f35b60006000600050549050606e565b9056fea165627a7a7230582098acc939ef119097e24d6b599d9dd18bb2061a9fab6ec77401def1c0a7e52ecd0029"),
        // 离线调用合约方法的data，包括方法签名和方法参数
        abi.encodeOffchain(methodName)
).send();
// 用ABI反解析返回值
List<?> outputList = abi.decodeOffchainOutput(methodName, response.getReturnData());
BigInteger output = ((BigInteger) outputList.get(0));
```

### 查询节点网络连接信息

```
Vitej vitej = new Vitej(new HttpService());
NetNodeInfoResponse response = vitej.netNodeInfo().send();
NetNodeInfoResponse.Result nodeInfo = response.getResult();
```

### 查询节点同步状态

```
Vitej vitej = new Vitej(new HttpService());
NetSyncInfoResponse response = vitej.netSyncInfo().send();
NetSyncInfoResponse.Result nodeInfo = response.getResult();
```

### 查询节点同步详情

```
Vitej vitej = new Vitej(new HttpService());
NetSyncDetailResponse response = vitej.netSyncDetail().send();
NetSyncDetailResponse.Result nodeInfo = response.getResult();
```

### 查询其他RPC接口

```
Vitej vitej = new Vitej(new HttpService());
CommonResponse response = vitej.commonMethod("ledger_getAccountBlocksByAddress", "vite_ab24ef68b84e642c0ddca06beec81c9acb1977bbd7da27a87a",0,10).send();
Object result = response.getResult();
```
