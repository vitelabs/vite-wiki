# VEP 18: 动态配额

## 引入动态配额的意义

在Vite中，通过配额来量化虚拟机执行代码时所消耗的计算资源和存储资源。配额可以通过抵押vite代币或者计算PoW来获取。一笔交易的可用配额取决于发起这笔交易的账户抵押的vite代币数量、这个账户在过去一段时间内已使用的配额、这笔交易额外计算的PoW难度。

配额是单账户维度的，本身存在超卖，当同时发交易的账户数过多时，可能会导致全网拥堵，具体表现在快照块快照的交易过多，快照块验证时间过长，广播数据量过多等。全网拥堵会导致快照链容易分叉。

在SPROUT硬分叉中，我们增加了动态配额的概念，来解决全网拥堵的问题。

动态配额本质上是根据全网拥堵程度动态调整获得配额的成本，例如正常情况下获得1utps的配额需要抵押1w vite，拥堵时获得1 utps的配额可能需要抵押2w vite，甚至更多，具体数量取决于拥堵程度。

在网络拥堵时，官方矿池也将停止提供计算PoW的服务，此时由于获取相同配额的成本变高，没有抵押vite的用户和抵押vite数量较少的用户将不能发起交易，这部分用户可以等待网络不再拥堵时再发交易或者自己计算一个难度更高的PoW。

## 动态配额的具体计算逻辑 

引入动态配额后，在计算配额时，先根据过去74个快照块快照的交易配额之和（即拥堵程度）计算出当前全网的配额系数`Qc`，然后将抵押金额或者PoW难度乘以配额系数，得到一个拥堵时的抵押金额或者PoW难度，用这个拥堵时抵押金额或者PoW难度来计算拥堵时的可用配额。

配额系数计算公式如下：

$$Qc =\begin{cases} 1, if g \leq 1050000\\ 2-e^{8.260667775706495e-09 \times (g - 1050000)}, if 1050000<g \leq 2100000\\ e^{1.6949794096275418e-10 \times (2100000-g)}-0.9, if g>2100000 	\end{cases}$$

其中，
* $g$: 最近74个快照块平均每个快照块快照的交易配额之和。

根据配额系数公式，在网络不拥堵时（过去74个快照块平均每个快照块快照的交易配额之后不超过50ut），配额系数为1；在网络逐渐拥堵时（过去74个快照块平均每个快照块快照的交易配额之后超过50ut），配额系数逐渐降低。

拥堵时的配额公式变更为：

$$Q_{PoW}=Qm \times (1- \frac{2}{1+e^{Qc \times \xi d \times \rho d}})$$
$$Q_{Stake}=Qm \times (1- \frac{2}{1+e^{Qc \times \xi s \times \rho s}})$$

其中，
* $Q_{PoW}$: 通过计算PoW获得的配额，通过计算PoW获得的配额是一次性的，只能在当前交易中使用；
* $Q_{Stake}$: 通过抵押获得的配额，抵押获得的配额是长期的，并且可以累积，最多累积75个快照块；
* $Qm$: 单个账户块配额上限；
* $Qc$: 配额系数，和最近74个快照块快照的所有交易的配额之和相关；
* $\xi d$: 用户在发起一笔交易时计算出的`PoW`难度；
* $\rho d$: 通过计算`PoW`获取配额的权重；
* $\xi s$: 账户受益的抵押金额；
* $\rho s$: 抵押获取配额的权重。

目前Vite网络中，各参数取值如下：
* $Qm$ = 1000000
* $\rho d$ = 6.259408129e-10
* $\rho s$ = 4.201037667e-24