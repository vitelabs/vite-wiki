# ViteRpcInterface
:::tip 维护者
[Eric](https://github.com/roymoro)
:::

## latestSnapshotHashReq
获取主链最新的快照块hash
- **Parameters**:
- **Returns**:  获取主链最新的快照块hash
  
- **Example**:

::: demo

```java tab:Request
        ViteJ viteJ = ViteJ.build("http://150.109.116.1:48132");
        SnapshotBlockHashRes snapshotBlockHashRes = viteJ.latestSnapshotHashReq().send();
        if (snapshotBlockHashRes.hasError()) {
            System.err.println("err");
        } else {
            snapshotBlockHashRes.getSnapshotChainHash();
        }

```


## snapshotChainHeightReq
获取主链最新的高度

- **Parameters**: 
- **Returns**: 获取主链最新的高度

- **Example**:

::: demo


## snapshotBlockByHashReq
根据 hash获取快照块

- **Parameters**:  
 * @param hash snapshotBlock 的hash值
- **Returns**:  SnapshotBlockRes SnapshotBlock 块 

- **Example**:
::: demo



## snapshotBlockByHeightReq
根据 height获取快照块

- **Parameters**: 
* @param height 高度 

- **Returns**: `SnapshotBlockRes` SnapshotBlock 快照块

- **Example**:
::: demo



## latestAccountBlockReq
获取address地址的最近一个Block块

- **Parameters**: 
* @param address 地址

- **Returns**: `AccountBlockRes` 获取address地址的最近一个Block块

- **Example**:



## accountBlockByHeightReq
获取地址指定高度的块

- **Parameters**: 
* @param address 地址

- **Returns**: `AccountBlockRes` 获取地址指定高度的块

- **Example**:


## accountBlockByHashReq
获取指定hash的块

- **Parameters**: 
 * @param hash block块hash

- **Returns**: `AccountBlockRes`获取指定hash的块

- **Example**:


## accountBlocksByAddressReq
address的accountBlock 列表
- **Parameters**: 
     * @param address  地址
     * @param index   页码，从0开始
     * @param size 每页数目
- **Returns**: `AccountBlockListRes`获取地址的列表

- **Example**:


## accountBlockListReq
 获取指定地址的block列表，以hash块开始，总共n个，支持币种筛选
- **Parameters**: 
      * @param address 地址
      * @param hash    开始hash，包含此值
      * @param tokenId tokenId
      * @param n       长度n
- **Returns**: `AccountBlockListRes`获取地址的列表

- **Example**:


## accountInfoByAddressReq
  获取地址对应的账户详情
- **Parameters**: 
      * @param address 地址
- **Returns**: `AccountDetailRes`获取地址的详细信息，币种金额，交易数等信息。

- **Example**:
 

## chunks
   根据快照链开始高度和结束高度获取快照数据，左闭右闭
- **Parameters**: 
       * @param fromHeight 开始高度
       * @param endHeight  结束高度
- **Returns**: `ChunkListRes` 根据快照链开始高度和结束高度获取快照数据，左闭右闭

- **Example**:


## unreceivedBlocksByAddressReq
   获取一个地址的待接收列表
- **Parameters**: 
      * @param address  地址
      * @param index   页面 0开始
      * @param size 页大小
- **Returns**: `AccountBlockListRes`  获取一个地址的待接收列表

- **Example**:
 
 
 
 ## unreceivedTransactionSummaryByAddress
    获取一个地址的待接收交易详情
 - **Parameters**: 
       * @param address  地址
 - **Returns**: `AccountBlockListRes`      获取一个地址的待接收交易详情

 
 - **Example**:
    
    
    
