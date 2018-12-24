# 智能合约

Vite是一个通用的去中心化应用平台，Vite测试网络支持用户部署自己的智能合约。Vite采用了消息驱动的架构，智能合约之间不共享任何状态，可以通过消息传递的方式进行通信。Vite使用一种扩展自Solidity的语言Solidity++开发智能合约，Solidity++兼容大部分Solidity语法，并支持异步语义。

## 什么是异步智能合约

以太坊里的合约间调用是通过消息调用，或者叫内部交易的方式来完成的，这组调用要么同时完成，要么全部失败，这是一个原子性的ACID语义，会成为性能瓶颈。Vite借鉴了一些中心化互联网技术中比较成熟的方案，采用了消息驱动的架构，合约之间不共享任何状态，只通过彼此发送消息来进行通信。

和普通转账交易类似，Vite中一个合约调用交易被拆成了一个合约请求交易和一个合约响应交易，分别被插入到合约调用的请求方和响应方的账户链上，当一个请求交易被写入账本，则代表该交易被成功发起。

合约交易被写入账本和确认也是异步的，当合约响应交易被快照链快照时，表示这笔交易被确认了。

## 智能合约由谁来执行

用户创建智能合约时，需要指定一个所属的委托共识组，委托共识组中有一组指定的代理节点，通过DPoS算法代替合约账户打包账户链上的交易。

一个合约只能指定一个委托共识组，并且一旦指定就不能修改所属的委托共识组。一个委托共识组可以包含多个不同的合约。

Vite提供了一个默认的委托共识组，来帮助所有未单独建立委托共识组的账户打包交易，也称为公共共识组。

## 合约的成本

### 创建合约的费用

创建合约需要消耗Vite。在测试网络中，创建一个合约需要消耗10 Vite，这部分Vite会销毁。

### 合约的配额

合约执行需要消耗配额。合约请求交易和合约响应交易分别消耗交易发起者和被调用合约账户的配额。

测试网络中，合约账户只能通过抵押Vite的方式来获取配额。如果合约账户没有足够的配额，则合约所属委托共识组不会打包这个合约的任何交易，因此合约提供者应该及时为合约抵押Vite。

创建合约的接收交易配额由创建合约时销毁的Vite提供，在测试网络中，这笔交易会得到最高1000000的配额。

## 智能合约语言

以太坊提供了一种图灵完备的编程语言，用于开发智能合约。为了支持异步语义，Vite对Solidity进行了扩展，定义了一组用于消息通信的语法。扩展之后的Solidity称为Solidity++。

Solidity++将支持Solidity的大部分语法，但不再支持合约外的函数调用。开发者可以通过message关键字来定义消息，并通过onMessage关键字定义消息处理器，从而实现跨合约通信功能。Solidity++中的消息会被编译成CALL指令，并生成一个请求交易加入账本。在Vite中账本充当了合约之间异步通信的消息中间件，可以确保消息可靠存储并防止重复。同一个账户发往某个合约的多个消息，可以保证FIFO，不同账户向同一个合约发送的消息并不保证FIFO。

Solidity++文档 TODO

## 虚拟机

当前以太坊已经拥有大量开发者，也有不少基于Solidity和EVM开发的智能合约投入应用。因此，Vite虚拟机部分兼容EVM，大部分EVM指令可以在Vite中保持原有语义。但由于Vite的账本结构及交易定义与以太坊不同，一些EVM指令的语义需要重新定义。

### 指令集

参见 [Vite指令集](./instructions.html)

## Hello World


## 合约调试

参见 [调试智能合约](./debug.html)