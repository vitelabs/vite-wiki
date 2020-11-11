# 以实例讲解Vite异步架构

## 前言

Vite 是新一代响应式区块链 (Reactive Blockchain)， 采用了基于消息驱动的异步架构，在其生态体系中，异步是一个很重要的概念，也是 Vite 十分重要的一个创新点。

## 同步和异步

同步是指一个进程在执行某个请求的时候，如果该进程需要请求返回的结果，并且该请求需要一段时间才能返回进程需要的结果，那么这个进程会一直等待下去，直到收到返回结果才继续执行下去。同样是一个进程在执行某个请求，异步是指进程不需要一直等待请求返回的结果，在请求发出后，请求会在后台自动发出并获取数据，然后对数据进行处理，在此过程中，进程继续执行其他的操作，当有请求返回结果后，进程收到通知，再去对请求结果进行处理。

总结来说，同步和异步的区别在于：请求发出后，是否需要等待结果，才能继续执行其他的操作。异步的优势也十分明显，等量的操作时，异步会执行的更快，在相同的时间内，异步可以做更多的事。对于 Vite 来说，Vite 是 DAG，每个账户都有一个账本，一笔交易只改变一个账户的状态，所以多个账户之间的交易可以并行执行，这样系统就会有更高的吞吐。

## Vite的异步

Vite 的异步设计有三个方面，第一个是请求和响应的异步设计，第二个是交易写入和确认的异步设计，第三个是合约间通信的异步设计。这里我们主要讨论合约间通信的异步。

下面通过一个简单的例子，分别从编译器异步语法和虚拟机执行过程两个方面进行介绍。

pragma soliditypp ^0.4.4;
contract VoteContract {
    address private checkAddr;
    
	mapping(address => uint) public voteMap;
    mapping(address => bool) public invalidAddrsMap;    
   	message checkValid(address addr);

    onMessage vote(address addr, uint voteNum) payable {
        send(checkAddr, checkValid(addr), msg.tokenid, msg.amount); 
        voteMap[addr] = voteMap[addr] + voteNum;
    }

    onMessage isValid(address addr, bool valid) {
        if(!valid && !invalidAddrsMap[addr]) {
           	invalidAddrsMap[addr] = true;
       	}
    }

    getter getVoteNum(address addr) returns(bool isInValid, uint voteNum) {
       	return (invalidAddrsMap[addr], voteMap[addr]);
    }
}

如上所示的是一个投票的合约 VoteContract ，这里简单介绍合约里的数据结构：

voteMap 是用来存储所有投票记录的 map ，invalidAddrs 是用来存储无效的投票地址的一个 map ，checkAddr 是提供投票验证功能的合约的地址。

pragma soliditypp ^0.4.4;
contract CheckContract {

   	message isValid(address addr, bool valid);

   	onMessage checkValid(address addr) payable {
       	bool result = check(addr);
       	send(msg.sender, isValid(addr, result));
   	}

   	function check(address addr) private returns(bool checkResult) {
       	// 投票验证逻辑
   	}    
}

如上所示是另一个投票验证合约 CheckContract ，这里说一下合约里的 function ，check方法实现了投票验证逻辑，逻辑本身的内容我们不关心，最后会返回地址是否有效的 checkResult。

## 编译器的异步语法

下面我们从编译器的语法层面来说一下 Vite 的异步。

首先，跟 ETH 合约间的方法调用不同，我们在上面的合约代码中定义的是消息监听器 onMessage ，而不是 function 。这个 onMessage 会监听其他合约或者用户传进来的消息，过滤掉和自己无关的消息，并对自己监听的消息进行一些业务逻辑的处理。

在上面的实例中，VoteContract 合约有两个 onMessage ，一个投票消息的监听器 vote ，用户通过 vote 给指定的 address 投票，投票的数量为 voteNum ，这个消息监听器是 payable 的，也就是说投票时需要付费的，这个费用用于验证投票的地址是否有效；另一个消息监听器 isValid ，是用来监听投票地址验证结果的。

CheckContract 合约有一个 onMessage ，投票验证消息的监听器 checkVaild ，为投票合约提供投票验证功能，这个消息监听器也是 payable 的。

其次，在编译器的语法中，只有 message 能够在合约之间传递，也只有 onMessage 才能监听到消息并进行处理，所以首先需要声明消息 message ，然后要用 send 语法发送消息，这里有几个特例，下面会说。

消息的声明需要参考对应的消息监听器，上面的示例中，VoteContract 声明了 checkValid(address addr, uint voteNum) 这个 message ，才能在 vote 执行过程中发送 checkValid 消息，CheckContract 才能监听到消息并对消息进行处理。CheckContract 中同样也声明了 isValid(address addr, bool valid) 消息用来给 VoteContract 合约发送投票验证结果。但是消息的声明有两个特例，Vite 中的转账不需要声明消息；用户调用合约的消息也不用声明。

消息的发送语法是 send(address addr, message msg, tokenId token, uint amount) ，addr 指定需要发送的合约地址，msg 指定要发送什么消息，token 和 amount 指定发消息时转账的代币和金额，这两个参数可以省略不写，默认不转账。目前带有转账参数的语法还未发布，处于测试阶段，这里用这个语法是为了更好的解释合约间异步调用的需要，但是目前 send(address addr, message msg) 的语法是可用的，另外，合约间单独转账的消息发送是特例，可以用 addr.transfer(tokenId token, uint amount) 语法，addr 指定需要转账的地址，token 指定转账的币种，amount 指定转账的金额。 

最后，消息监听器是没有返回值的，这就意味着其他合约或者用户在发送对应的消息之后，就不需要再等待消息处理的结果了。如上面的示例，VoteContract 在消息监听器 vote 中发分别发送了向 CheckContract 转账和投票验证的消息，在消息发送后就继续执行后面的操作了，CheckContract 在消息监听器 checkValid 中发送完投票验证结果的消息后 checkValid 就结束了。需要说明一点，消息监听器和 ETH 的返回值为空的方法是不同的，在 ETH 中，即使合约间调用的方法定义为空，最后也还是会返回一个方法调用是否成功的结果，也就是说，ETH 中的合约间方法调用一定需要等待方法执行的结果，一定是同步的。

有了以上这些语法上的规定，就可以保证 Vite 语法上的异步，以下是语法层面的异步解读。

## 虚拟机异步实现

我们再从合约在虚拟机上执行的层面来说一下 Vite 异步的实现。

在开始介绍前，先了解一些概念：

第一，Vite 中的交易分为请求交易（request）和响应交易（response）。无论是一笔转账还是一次合约调用，均会在账本上先后生成两笔交易，而 ETH 中的一笔交易相当于 Vite 中的一次请求交易和一次响应交易。之所以进行交易拆分，主要也是因为 Vite 的异步设计，将请求和响应分离，无论是转账还是合约间调用，只要发起了请求交易，不用等待响应交易即可返回。

第二，ETH 是需要收费的，收取 GAS ，在 ETH 的 EVM 执行过程中，EVM 会计算 GAS 的消耗量，并在交易执行的过程中扣除掉，和 ETH 不同的是，Vite 不收费，但是还是会计算一个和 GAS 类似的东西，叫做配额，但是由于交易被拆分成了请求交易和响应交易，并且是异步执行的，请求交易阶段不能获取到响应交易阶段所需要的配额，所以，配额需要扣除两次，分别在请求交易和响应交易过程中扣除各自需要的配额。

在虚拟机执行过程中，对于请求交易和响应交易的执行逻辑是分开的。请求交易的主动发起方式一定是用户发出了一条消息，或者是转账或者是调用合约的消息。如上面的例子，用户向 VoteContract 合约发出的投票的消息，就是一个请求交易。请求交易还有一种被动发起的方式，在后面进行介绍。

第一个阶段，虚拟机收到这条请求交易后，就执行请求交易的逻辑。假设我们在虚拟机执行的过程中不会抛出任何异常，首先会计算这条请求交易需要消耗的配额（在这里我们不具体介绍配额的计算过程和计算逻辑），然后扣减金额，最后虚拟机就会更新请求交易块并返回，对于这里扣减金额的操作，在下一个阶段在介绍。

第二个阶段，VoteContract 合约所在的委托共识组的出块节点收到该请求交易后，需要构造一条响应交易，虚拟机就执行响应交易的逻辑，依次进行调用深度检查、配额计算、金额增加的操作，因为是合约账户，所以接下来要执行消息监听器的代码。在执行代码逻辑的过程中，因为还需要向 CheckContract 合约发送 checkValid 消息，所以虚拟机在执行完消息监听器的代码后，还需要向 CheckContract 合约发起一个请求交易。介绍到这里，就有几点内容要详细说明一下。

第一，就是前文提到的请求交易的另一种被动发起方式，合约的请求交易是永远都不会主动发起的，而是在响应用户或者其他合约的请求交易时，被动产生的。像这个例子一样，VoteContract 合约在执行响应交易的过程中，向另一个合约发起了一个新的请求交易。为了解决这一类问题，虚拟机在所有合约的响应交易中都带有一个请求交易的列表，通过这个请求交易列表向用户或者其他合约发出新的请求交易。

第二，虚拟机执行完消息监听器 vote 的代码的过程中会构造请求交易列表，在代码执行完之后，向 CheckContract 合约发起并执行请求交易列表中的请求交易，这里送了一条带有转账交易的消息， checkValid 消息，在消息发出后，不管 CheckContract 有没有响应，vote 的代码都已经执行完了，整个过程没有等待，这就是 Vite 在虚拟机层面异步的体现。

第三，VoteContract 合约发起了一个请求交易，因此，虚拟机会在这个响应交易的过程中再执行一次请求交易的逻辑，和之前用户发起的那一个请求交易不同的是，这次的请求交易在执行的过程中不再消耗配额。另外，因为是带有转账的请求交易，所以该请求交易需要扣减相应的金额。因为 ETH 是单链，全局只有一个账本，所以 ETH 在交易过程中交易双方的金额扣减和增加是在一起进行的，但是在 Vite 中，这两个操作会在请求交易和响应交易中分两次执行，因为 Vite 是多链，每一条链只需要改变自己的金额，而全局的金额在最终会达到一个正确的状态，这也是 Vite 异步特性的一个保障。在上面的示例中，当有多个用户投票时，VoteContract 就会向 CheckContract 发起多次转账的消息，扣减自己的金额（其实这些扣减的金额是用户转给自己的），不管这些转账消息什么时候被 CheckContract 响应，也不管这些转账消息被 CheckContract 响应的顺序，最终 CheckContract 增加的金额一定是和 VoteContract 扣减的金额相等的。

第三个阶段，是 CheckContract 合约执行响应交易，对应 checkValid 的消息监听器，执行过程和第二个阶段基本一样。在执行 checkValid 的请求交易之后，还需要向 VoteContract 发出一个 isValid 消息，并执行新的请求交易。

第四个阶段，VoteContract 合约所在的委托共识组的出块节点收到 CheckContract 合约发出的 isValid 请求交易后，就会构造一条响应交易，进行一些列的检查和操作。这时，VoteContract 发出的 checkValid 消息终于收到 CheckContract 投票检查结果的通知，并开始对结果进行处理，开始执行 isValid 消息监听器的代码。这也就是最开始我们提到的：当有请求返回结果后，进程收到通知，再去对请求结果进行处理。

以上就是从用户发起投票到最终投票完成虚拟机执行的整个过程，也是虚拟机异步执行的全部实现。但是上面的执行过程都有一个前提条件，就是没有发生异常，如果执行过程中发生了异常，整个交易都会发生回滚，所有状态都会回到交易发起之前。如果是在请求交易阶段发生了异常，那么请求交易就会被回滚。如果请求交易执行成功，在响应交易的阶段发生了异常，那么首先响应交易会被回滚，其次如果在请求交易的时候扣减了金额，就会再发起一条新的请求交易，把扣减的金额再加回去。比如上面的 VoteContract 在发起 checkValid 的请求交易后，会扣减金额，CheckContract 在响应交易的过程中失败了，就会发起一条新的请求交易，把 VoteContract 扣减的金额再退还回去。

## getter

虽然异步模式有很多优势，但是也会给我们带来一些问题。因为异步是不会有返回结果的，只能通过定义消息监听器的方式来获取返回的消息，那么用户如果想要获取合约中的一些状态的话就会比较麻烦，因为用户没办法定义消息监听器。

getter getVoteNum(address addr) returns(bool isInValid, uint voteNum) {
	return (invalidAddrsMap[addr], voteMap[addr]);
}

在开始的的示例中，我们还有一部分没有介绍，就是上面的这个语法。

简单的说，这个 getter 就是提供给用户用来查询合约内的状态的，它可以有返回值，但是我们对于 getter 有很多的限制。其中最重要的有两点，第一，getter 只能查询状态，不可以修改状态；第二，getter 不可以访问链上的数据。所以，getter 其实是链下的查询方法，所以，定义成 getter 的方法也是不上链的，getter其实类似 ETH 的链下查询的 public 方法。这也说明了 getter 并不会影响 Vite 的异步特性，同时我们也解决了 Vite 异步特性带来的用户查询合约状态的问题。

## 总结

本文的主要目的是简单介绍 Vite 的异步原理以及实现，通过这个简单的示例让大家了解一下合约间异步通信的流程。

如果大家想了解更多细节，欢迎关注[vite官网](https://vite.org/)

## 参考资料

 [vite白皮书](https://www.vite.org/whitepaper/vite_cn.pdf)

 [vite-vm源码](https://github.com/vitelabs/go-vite/tree/master/vm)
