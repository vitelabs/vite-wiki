# Vite存储层设计概述

存储层负责完成Vite链各类数据的持久化存储，并提供缓存、多维度查询等功能。需要持久化存储的数据包括交易(Transaction/AccountBlock)、快照(SnapshotBlock)、账户状态(AccountState)、虚拟机状态(VmState)这四类数据。

## 一、存储层业务需求

每种类型的数据都有自己特殊的业务场景，相应的会有自己特有的读写需求：

### 1.交易

在Vite DAG的特性下，一个交易(Tx/Transaction)对应一个AccountBlock，除极个别情况外，交易总是由一个from地址发起，并对应一个唯一的to地址，这个发起的Tx称为SendTx，to地址收到该交易后，会生成一个ReceiveTx，SendTx和ReceiveTx是一一对应的。和其他链类似，每个Tx可以根据hash来进行查询，也可以根据地址来查询该地址关联的全部Tx，在Vite的场景中还有SendTx和ReceiveTx之间根据关联关系进行查询的需求。

### 2.快照

快照块是Vite的一条特殊的链，快照链的每个SnapshotBlock记录了该block快照的全部交易的快照信息，这样SnapshotBlock和被快照Tx之间就建立了关联关系。所以除了SnapshotBlock本身的查询及遍历需求外，还可以根据SnapshotBlock和Tx之间的关联来索引查询SnapshotBlock及Tx。

### 3.账户状态及虚拟机状态

账户状态和虚拟机状态两类数据比较类似，都是绑定在同一个地址上的存储结构状态，不同的是账户状态关联一个普通的地址，而虚拟机状态关联的地址是一个合约地址。随着该地址关联交易的执行而不断修改自己的状态，正是因为状态有修改的操作，所以需要状态存储能支持多版本来满足更新、回溯及回滚的操作。链上状态的变更为了能被外部读取，还支持event的输出，便于状态变化的trace。

## 二、总体设计

考虑到不同类型数据有不同的读写需求，因此存储层设计的原则是在底层通用方案的基础上进行了一些定制，并对下游模块暴露业务友好的接口。

### 1、通用方案设计

我们通过下面几个通用的设计方案为上层的业务模块的实现提供支撑，方便复用的同时提高系统的可靠性。

a、小文件存储

使用固定大小的小文件对两种类型的block进行暂存及永久性存储，小文件追加写入和批量读取性能非常好，也能兼顾随机读取的需要，非常适合区块链这样基于海量交易的数据结构的存储。

b、索引

通过levelDB实现索引存储。levelDB在批量追加写入方面有非常好的性能，非常适合区块链这样追加写多，更新少的场景。levelDB支持字节序的排序，方便通过定制化的key来实现多版本状态数据的读写，并且能够执行kv方式的读写，以兼顾随机读写的需求。

c、cache

为了充分利用内存性能优势尽可能加速读，cache会通过一定的策略来存储热点数据。

d、异步flush

为了提高IO性能，数据的持久化存储是通过异步的方式进行flush。不同数据类型通过不同的模块来处理，通过引入两阶段提交保证了数据的一致性，而redolog则用来避免未提交数据的丢失。

e、数据压缩

为了减少整体存储的数据量，可以选择压缩后再进行持久化。

### 2、具体实现

根据具体业务需求，存储分为下面三个模块实现。

a、blockDB设计

blockDB实现AccountBlock和SnapshotBlock的存储。考虑到block数据格式固定，绝大多数block数据会有固定的大小，因此blockDB主要通过小文件方式进行存储，同一个文件存储多个block，减少碎片的产生，同时便于索引。

b、indexDB设计

indexDB用来levelDB索引两种Block在blockDB小文件中的location，同时也会存储各种block之间的关联关系。

c、stateDB设计

stateDB用来存储账户状态和虚拟机状态，通过精心设计levelDB key的字节拼接，可以支持多版本的数据。

## 三、总结

通过上面介绍，我们从比较宏观角度了解到Vite存储层因应业务需要对存储系统进行了模块拆分，所有模块都建构在几个通用的设计方案上，每个的模块根据自己的特点组合采用几个方案来进行实现。后面我们还会通过一系列文章详细介绍每个子模块的设计细节，敬请期待。

