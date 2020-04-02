---
sidebarDepth: 4
---

# RPC API Bridge

## How to Call RPC API

### Create ViteJ Object

At beginning, you should create a ViteJ object and choose how to connect to a node. 

Use HTTP:

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

Use WebSocket:
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

See [RPC API Documentation](../rpc/) to know more information about Vite RPC API.

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

#### Make the Call

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

Sending a transaction (by `sendTransaction` method) includes the following steps :
1. Check transaction object. Fill in default value if required parameters are not present;
2. Calculate quota consumption. If the available quota of the account is insufficient and having `autoPoW`=`true`, do a PoW puzzle to get temporary quota;
3. Create transaction hash, then sign the transaction.

:::tip Note
Make sure `util` module is configured in `PublicModules` in `node_config.json` on your node when `autoPoW`=`true`.
:::

#### Send a Transfer
```java
Vitej vitej = new Vitej(new HttpService());
KeyPair keyPair = new Wallet(Arrays.asList("network", "north", "tell", "potato", "predict", "almost", "wonder", "spirit", "wheel", "smile", "disease", "bonus", "round", "flock", "pole", "review", "music", "oven", "clarify", "exclude", "loyal", "episode", "image", "notable")).deriveKeyPair();
Request<?, EmptyResponse> request = vitej.sendTransaction(
        // key used to sign the transaction
        keyPair,
        // transaction information
        new TransactionParams()
                // transaction type, optional. Default is SEND_CALL
                .setBlockType(EBlockType.SEND_CALL.getValue())
                // recipient address. must present
                .setToAddress(new Address("vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68"))
                // transfer amount, optional. Default is 0
                .setAmount(BigInteger.valueOf(1))
                // transfer token id, optional. Default token is VITE
                .setTokenId(CommonConstants.VITE_TOKEN_ID)
                // transaction comment, optional
                .setData("Hello".getBytes()),
        // enable/disable pow
        false);
Hash sendBlockHash = ((TransactionParams) request.getParams().get(0)).getHashRaw();
EmptyResponse response = request.send();
```

#### Receive

```java
Vitej vitej = new Vitej(new HttpService());
KeyPair keyPair = new Wallet(Arrays.asList("network", "north", "tell", "potato", "predict", "almost", "wonder", "spirit", "wheel", "smile", "disease", "bonus", "round", "flock", "pole", "review", "music", "oven", "clarify", "exclude", "loyal", "episode", "image", "notable")).deriveKeyPair();
Request<?, EmptyResponse> request = vitej.sendTransaction(keyPair,
        new TransactionParams()
                // transaction type. must be RECEIVE
                .setBlockType(EBlockType.RECEIVE.getValue())
                // request transaction hash. must present
                .setSendBlockHash(new Hash("ef5dccd73a6ef6370bc72b56b686362fd095152e2746f21113c2015e243b5056")),
        false);
Hash receiveBlockHash = ((TransactionParams) request.getParams().get(0)).getHashRaw();
EmptyResponse response = request.send();
```

#### Call Smart Contract

See [Call Contract](../rpc/contract_v2.html#call-contract) for detailed information

```java
Vitej vitej = new Vitej(new HttpService());
KeyPair keyPair = new Wallet(Arrays.asList("network", "north", "tell", "potato", "predict", "almost", "wonder", "spirit", "wheel", "smile", "disease", "bonus", "round", "flock", "pole", "review", "music", "oven", "clarify", "exclude", "loyal", "episode", "image", "notable")).deriveKeyPair();
// use abi to generate binary data to call a method on contract
Abi abi = Abi.fromJson("[{\"type\":\"function\",\"name\":\"VoteForSBP\", \"inputs\":[{\"name\":\"sbpName\",\"type\":\"string\"}]}]");
byte[] callContractData = abi.encodeFunction("VoteForSBP", "Vite_SBP01");
Request<?, EmptyResponse> request = vitej.sendTransaction(
        keyPair,
        new TransactionParams()
                // transaction type. must be SEND_CALL
                .setBlockType(EBlockType.SEND_CALL.getValue())
                // smart contract address. must present
                .setToAddress(new Address("vite_0000000000000000000000000000000000000004d28108e76b"))
                // transfer amount, optional. Default is 0
                .setAmount(new BigInteger("0"))
                // transfer token id, optional. Default token is VITE
                .setTokenId(CommonConstants.VITE_TOKEN_ID)
                // data generated in above step to call contain method. If not present, no method will be called
                .setData(callContractData),
        false);
Hash sendBlockHash = ((TransactionParams) request.getParams().get(0)).getHashRaw();
EmptyResponse response = request.send();
// check result
boolean callSuccess = ProtocolUtils.checkCallContractResult(vitej, sendBlockHash);
```

#### Create Smart Contract

See [Create Contract](../rpc/contract_v2.html#create-contract) for detailed information

```java
Vitej vitej = new Vitej(new HttpService());
KeyPair keyPair = new Wallet(Arrays.asList("network", "north", "tell", "potato", "predict", "almost", "wonder", "spirit", "wheel", "smile", "disease", "bonus", "round", "flock", "pole", "review", "music", "oven", "clarify", "exclude", "loyal", "episode", "image", "notable")).deriveKeyPair();
// specify binary code of the contract. tips: use --bin to generate binary when compiling soliditypp source code
byte[] bytecode = BytesUtils.hexStringToBytes("6080604052348015600f57600080fd5b50604051602080608183398101806040526020811015602d57600080fd5b810190808051906020019092919050505050603580604c6000396000f3fe6080604052600080fdfea165627a7a723058208602dc0b6a1bf2e56f2160299868dc8c3f435c9af6d384858722a21906c7c0740029");
// use abi to load constructor
Abi abi = Abi.fromJson("[{\"inputs\":[{\"name\":\"i\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"}]");
byte[] callConstructorData = abi.encodeConstructor(BigInteger.valueOf(1));
// generate binary data. pass in 5 parameters (binary code, constructor data, response latency, random degree, quota multiplier)
byte[] createContractData = ContractUtils.getCreateContractData(bytecode, callConstructorData, 2, 1, 10);
Request<?, EmptyResponse> request = vitej.sendTransaction(
        keyPair,
        new TransactionParams()
                // transaction type. must be SEND_CREATE
                .setBlockType(EBlockType.SEND_CREATE.getValue())
                // transfer amount, optional. Default is 0
                .setAmount(new BigInteger("0"))
                // transfer token id, optional. Default token is VITE
                .setTokenId(CommonConstants.VITE_TOKEN_ID)
                // 10 VITE contract creation fee, optional. Default is 10 VITE
                .setFee(CommonConstants.CREATE_CONTRACT_FEE)
                // data generated in above step to create smart contract. must present
                .setData(createContractData),
        false);
Hash sendBlockHash = ((TransactionParams) request.getParams().get(0)).getHashRaw();
EmptyResponse response = request.send();
boolean callSuccess = ProtocolUtils.checkCallContractResult(vitej, sendBlockHash);
```

### Calculate PoW

```java
Vitej vitej = new Vitej(new HttpService());
PoWNonceResponse response = vitej.getPoWNonce(
        // PoW difficulty
        BigInteger.valueOf(67108863),
        // hash value. can be obtained through BlockUtils.getPoWData
        new Hash("d517e8d4dc9c676876b72ad0cbb4c45890804aa438edd1f171ffc66276202a95")
).send();
byte[] nonce = response.getNonce();
```

### Get Account Block List

Get a list of account blocks in descending order of block height, starting at the latest block

```java
Vitej vitej = new Vitej(new HttpService());
AccountBlocksResponse response = vitej.getAccountBlocksByAddress(
        // address of account
        new Address("vite_0996e651f3885e6e6b83dfba8caa095ff7aa248e4a429db7bd"),
        // page index. start at 0
        0,
        // page size
        10).send();
List<AccountBlock> accountBlockList = response.getResult();
```

### Get Account Block (by height)

```java
Vitej vitej = new Vitej(new HttpService());
AccountBlockResponse response = vitej.getAccountBlockByHeight(
        // address of account
        new Address("vite_0996e651f3885e6e6b83dfba8caa095ff7aa248e4a429db7bd"),
        // block height
        1L).send();
AccountBlock accountBlock = response.getResult();
```

### Get Account Block (by hash)

```java
Vitej vitej = new Vitej(new HttpService());
AccountBlockResponse response = vitej.getAccountBlockByHash(
        // hash of account block
        new Hash("c4b11ff481c5476945000993816794fbc21a315901aaecb523b503c19c133154")).send();
AccountBlock accountBlock = response.getResult();
```

### Get Account Block (full block)

This method can be also used to return a full RS (Receive-Send) block by specifying RS block hash

```java
Vitej vitej = new Vitej(new HttpService());
AccountBlockResponse response = vitej.getCompleteAccountBlockByHash(
        // hash of account block
        new Hash("c4b11ff481c5476945000993816794fbc21a315901aaecb523b503c19c133154")).send();
AccountBlock accountBlock = response.getResult();
```

### Get the Latest Account Block

```java
Vitej vitej = new Vitej(new HttpService());
AccountBlockResponse response = vitej.getLatestAccountBlock(
        // address of account
        new Address("vite_0996e651f3885e6e6b83dfba8caa095ff7aa248e4a429db7bd")).send();
AccountBlock accountBlock = response.getResult();
```

### Get Account Block List (by token id)

Get a list of account blocks in which the transfers are done in certain token

```java
Vitej vitej = new Vitej(new HttpService());
AccountBlocksResponse response = vitej.getAccountBlocks(
        // account address. must present
        new Address("vite_0996e651f3885e6e6b83dfba8caa095ff7aa248e4a429db7bd"),
        // hash of account block to start from. If not present, use the latest account block
        new Hash("c4b11ff481c5476945000993816794fbc21a315901aaecb523b503c19c133154"),
        // token id
        CommonConstants.VITE_TOKEN_ID,
        // number of item returned. must present
        10
).send();
List<AccountBlock> accountBlockList = response.getResult();
```

### Get Account Info

```java
Vitej vitej = new Vitej(new HttpService());
AccountInfoResponse response = vitej.getAccountInfoByAddress(
        // address of account
        new Address("vite_0996e651f3885e6e6b83dfba8caa095ff7aa248e4a429db7bd")
).send();
// total transaction number
Long blockCount = response.getResult().getBlockCount();
// token-balance summary
Map<TokenId, AccountInfoResponse.BalanceInfo> balanceInfoMap = response.getResult().getBalanceInfoMap();
```

### Get Unreceived Transaction List

```java
Vitej vitej = new Vitej(new HttpService());
AccountBlocksResponse response = vitej.getUnreceivedBlocksByAddress(
        // account address
        new Address("vite_0996e651f3885e6e6b83dfba8caa095ff7aa248e4a429db7bd"),
        // page index. start at 0
        0,
        // page size
        10
).send();
// unreceived transaction list
List<AccountBlock> accountBlockList = response.getResult();
```

### Get Unreceived Transaction Summary

```java
Vitej vitej = new Vitej(new HttpService());
AccountInfoResponse response = vitej.getUnreceivedTransactionSummaryByAddress(
        // account address
        new Address("vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68")
).send();
// number of unreceived transaction
Long blockCount = response.getResult().getBlockCount();
// unreceived token-balance summary
Map<TokenId, AccountInfoResponse.BalanceInfo> balanceInfoMap = response.getResult().getBalanceInfoMap();
```

### Get the Latest Snapshot Block Hash

```java
Vitej vitej = new Vitej(new HttpService());
LatestSnapshotHashResponse response = vitej.getLatestSnapshotHash().send();
Hash latestSnapshotHash = response.getHash();
```

### Get the Latest Snapshot Block Height

```java
Vitej vitej = new Vitej(new HttpService());
SnapshotChainHeightResponse response = vitej.getSnapshotChainHeight().send();
Long latestSnapshotHeight = response.getHeight();
```

### Get the Latest Snapshot Block

```java
Vitej vitej = new Vitej(new HttpService());
SnapshotBlockResponse response = vitej.getLatestSnapshotBlock().send();
SnapshotBlock snapshotBlock = response.getResult();
```

### Get Snapshot Block List

Get a list of snapshot blocks in descending order, starting at specified height

```java
Vitej vitej = new Vitej(new HttpService());
SnapshotBlocksResponse response = vitej.getSnapshotBlocks(
        // height to start from
        100L,
        // number of item returned
        10
).send();
List<SnapshotBlock> snapshotBlock = response.getResult();
```

### Get Smart Contract Event Log 

```java
Vitej vitej = new Vitej(new HttpService());
VmlogsResponse response = vitej.getVmlogs(
        // hash of smart contract response block
        new Hash("d519bd49599df00b6a5992a50065af7945c4b6af269af8791cca5688f3277e37")
).send();
List<Vmlog> vmLogList = response.getResult();
```

### Get Smart Contract Event Log (by filter)

```java
Vitej vitej = new Vitej(new HttpService());
// only get event log from account block height 1-10 on smart contract vite_000000000000000000000000000000000000000595292d996d
VmLogFilter filter = new VmLogFilter(new Address("vite_000000000000000000000000000000000000000595292d996d"),
        1L, 10L);
// define a topic to get event log which has two indexed fields as the value specified
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

### Get Smart Contract Info

```java
Vitej vitej = new Vitej(new HttpService());
ContractInfoResponse response = vitej.getContractInfo(
        new Address("vite_000000000000000000000000000000000000000595292d996d")
).send();
ContractInfo contractInfo = response.getResult();
```

### Call Offchain Method

```java
Vitej vitej = new Vitej(new HttpService());
// load abi of offchain method
Abi abi = Abi.fromJson("[{\"inputs\":[],\"name\":\"getData\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"type\":\"offchain\"}]");
String methodName = "getData";
// call offchain method
CallOffChainMethodResponse response = vitej.callOffChainMethod(
        // contract address
        new Address("vite_da0e4189f8155035d5b373f8f1328e43d7d70980f4fb69ff18"),
        // specify binary code of the offchain method. tips: use --bin to generate offchain binary when compiling soliditypp source code
        BytesUtils.hexStringToBytes("6080604052600436106042576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c1a34865146044576042565b005b604a6060565b6040518082815260200191505060405180910390f35b60006000600050549050606e565b9056fea165627a7a7230582098acc939ef119097e24d6b599d9dd18bb2061a9fab6ec77401def1c0a7e52ecd0029"),
        abi.encodeOffchain(methodName)
).send();
// use abi to decode result
List<?> outputList = abi.decodeOffchainOutput(methodName, response.getReturnData());
BigInteger output = ((BigInteger) outputList.get(0));
```

### Get Node Status

```java
Vitej vitej = new Vitej(new HttpService());
NetNodeInfoResponse response = vitej.netNodeInfo().send();
NetNodeInfoResponse.Result nodeInfo = response.getResult();
```

### Get Sync Status

```java
Vitej vitej = new Vitej(new HttpService());
NetSyncInfoResponse response = vitej.netSyncInfo().send();
NetSyncInfoResponse.Result nodeInfo = response.getResult();
```

### Get Sync Detail

```java
Vitej vitej = new Vitej(new HttpService());
NetSyncDetailResponse response = vitej.netSyncDetail().send();
NetSyncDetailResponse.Result nodeInfo = response.getResult();
```

### Call Raw RPC Method

Below we show an example to call `ledger_getAccountBlocksByAddress` method of RPC API. You can call any RPC method with necessary method name and parameters as this way. 

```java
Vitej vitej = new Vitej(new HttpService());
CommonResponse response = vitej.commonMethod("ledger_getAccountBlocksByAddress", "vite_ab24ef68b84e642c0ddca06beec81c9acb1977bbd7da27a87a",0,10).send();
Object result = response.getResult();
```
