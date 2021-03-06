# ViteX内置合约设计与实现简介

ViteX是Vite链上的内置去中心化交易所，是Vite生态的重要组成，ViteX由Vite内置合约vDex和链下服务dexServer两部分组成。vDex最初设计的目标是实现所有核心功能全部上链，这些功能包含充值、提现、开通交易对、订单撮合，后来进一步将VX代币挖矿，手续费分红，运营商管理等功能上链，在实现资产安全的同时也保证了规则透明、公平。下面对vDex的设计与实现的几个关键点做一个介绍。

## 存储设计

相比中心化交易，vDex的实现会受限于链本身存储结构和性能，为了能最大化提高撮合效率，vDex同时采用了多种策略优化读写效率。

### 价格有序的订单id设计

订单存储的方式决定了写入和读取的效率，也最终决定了撮合的执行效率。Vite链底层基于LevelDB实现存储，支持字节序的顺序遍历，和vDex Taker-Maker撮合规则依次匹配价格有序订单的特点一致。vDex根据levelDB字节序的特点设计了下面的订单id格式，保证taker匹配时只需要一次迭代便利即可完成整个撮合，订单结构实现如下图表示。
![](~images/vDex.png)

       
订单id为定长的22字节，各个组成部分具体含义如下：

marketId:每个交易对的唯一标识，是一个自增的整数值。

side:0 买入 1卖出，marketId+side的组成的字节前缀，实现taker在一次匹配过程中需要遍历的全部订单有共同的前缀。

price:10个字节的价格定点数表示，前5个字节为整数部分，后5个字节为小数部分，能够支持最大12位有效整数+12为有效小数的价格。对于卖出，低价订单价格字节序在前；对于买入订单，价格字节取反，实现高价订单字节序在前。

timestamp:同价订单时间戳在前的字节序在前

serialNo:价格+时间戳相同的订单，通过链上确认挂单的顺序依次排序，保证严格的顺序性。

用以上规则拼接出来的订单编号作为key写入leveDB，实现了字节序遍历即价格序遍历，保证了撮合的效率。

具体撮合过程如下：

撮合引擎通过新taker的marketId+!side组合一个前缀，通过该前缀字节增序遍历levelDB中的kv，即可获取该市场已经排好序的对手交易深度的全部有序订单列表。taker和当前遍历到的maker是否匹配只需要满足 !taker.side && bytes.Cmp(taker.Price, maker.Price) >= 0 || taker.side && bytes.Cmp(taker.Price, maker.Price) <= 0 ，如果满足条件进行具体的订单执行，如果还有未撮合部分就可以依次迭代该列表进行撮合，直到匹配失败或者完权成交为止，如果匹配失败只需要简单的以订单id为key写入taker到存储即可。整个过程对存储的使用方式是最简单也是最高效的。

### 订单对象压缩存储

为了提高存储效率，使用protocol-buffers作为订单对象的序列化方式，在保证足够的压缩效率的情况下，也便于后续新增字段来扩展订单结构及向后兼容。

考虑到订单id已经包含了marketId、side、price、timestamp4个字段，在实际序列化订单对象之前，会将以上字段赋值为空，在反序列化后通过订单id解析后再赋值，以进一步节约存储。

### 清理存储

为了减少链上存储，对于匹配完成或者撤销的订单会及时进行空间的清理。同时订单有超时的机制，对于超时订单，可以通过批量的方式进行非验证的撤销。为了保证所有订单可访问，被清理掉的订单会存在链下服务dexServer中。

### 挖矿/分红指标存储优化

vDex支持链上交易挖矿、抵押挖矿及手续费分红，在以天为单位的周期结束后对该周期相关指标进行计算并产出挖矿/分红结果。为了不影响正常的交易，挖矿操作和周期滚动操作是异步的，这就要保证每个周期结束的状态可回溯，这里是通过快照每个周期结束时的状态来实现的。为了尽量减少快照数，只有新周期相比前一个有效周期出现业务意义上的指标差异时才记录，最大程度减少重复存储。

## 多合约协作

vDex目前版本由两个内置合约组成，dexFund承担充值、提现、上币、挖矿、分红等操作，dexTrade完成实际的挂单、撮合及撤单。

由两个不同合约组合完成交易所功能，从工程角度便于系统拆分和维护，同时方便后续dexTrade分片以提供更高的吞吐。

![](~images/built-in-contract.png)


## 其他

### 资产正确性校验

为了保证代码执行的正确性，除了通过单元测试和集成测试保证基本功能正确性外。vDex还通过实时校验资产一致性的功能，具体方式是将合约内所有资产进行加和并同合约在链上实际的账本余额进行对照，如果一致则可以认为没有因为i内部计算逻辑的错误导致资产增发或销毁。校验操作一定程度上等价于对合约的全量代码做了一次集成测试，该操作可以在测试阶段或者正式部署后定时执行，验证合约的正确性。

### vDex和dexServer协作
合约在执行的过程中会修改内部状态，这些内部状态的变更通过eventLog同步链下服务dexServer，满足相关展现及数据统计需求。
