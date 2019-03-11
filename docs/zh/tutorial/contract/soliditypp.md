# Solidity++

Solidity++和Solidity的语法基本上相同，他们之间的差异主要是因为Solidity++是异步的而Solidity是同步的

## Solidity++删除的语法

```
tx.gasprice
block.coinbase
block.difficulty
block.gaslimit
gasleft()
msg.gas
selfdestruct(_owner)
suicide(_addr)
address(_addr).send(_amount)
```

以上示例的语法在Solidity++中全部失效

所有与ecrecover，ripemd160相关的语法全部失效

delegatecall方法暂时不提供

Solidity中内联汇编的语法暂时不提供


## Solidity++新增和修改的语法

Solidity++新增的语法如下:

```
bytes32 b1 = fromhash();
uint height = accountheight();
bytes32 b2 = accounthash(height);
```

"fromhash()"返回请求交易的哈希值

"accountheight()"获取账户链上最新块的高度

"accounthash(uint height)"根据高度获取账户块哈希值

Solidity++的address和tokenId定义的语法如下:

```
tokenId token01 = tokenId("tti_2445f6e5cde8c2c70e446c83");
tokenId token02 = "tti_2445f6e5cde8c2c70e446c83";
address addr01 = address("vite_8ba849f3678057aeefc84c787f7cb957426cc3a4b0e8eca13c");
address addr02 = "vite_8ba849f3678057aeefc84c787f7cb957426cc3a4b0e8eca13c";
```

获取交易中的转账在Solidity中的语法如下:
```
msg.value
```

Solidity++中获取转账金额的语法做了修改(由value变成amount)，并新增了获取交易中的转账tokenId的语法:

```
msg.amount;
msg.tokenid;
```

获取当前账户某个tokenId的余额或者获取其他账户某个tokenId的余额，

Solidity中的语法是如下

```
address.balance
```

直接获取某个账户的余额，因为现在一个账户可以拥有多种代币，因此在Solidity++中获取代币余额的时候需要指定tokenId

```
address.balance(_tokenId)
```

在Solidity中发送以太币到一个地址可以使用transfer方法

```
address(_addr).transfer(_amount);
```

因为在vite中新增了tokenId的概念，所以在Solidity++中进行交易的时候需要加上需要交易的tokenId

```
address(_addr).transfer(_tokenId, _amount);
```

Solidity中以太币的单位为:wei/szabo/finney/ether

1 ether = 1000 finney， 1 finney = 1000 szabo， 1 szabo = 1000000000000 wei

在Solidity++中vite币的单位为:attov/vite

1 vite = 1000000000000000000 attov

在Solidity++中，所有与sha256，sha3相关的语法都替换为blake2b


## Solidity++异步语法

在Solidity++中，合约之间不可以通过方法调用来进行交互，只能进行消息传递

也就是说，在Solidity++中public类型的方法不再对外提供访问接口，并且function不可以被定义为external类型，function只可以是public，private和internal类型

同时，合约内public类型的静态变量也无法被合约外部访问

示例

```
pragma soliditypp ^0.4.1;
contract A {
   message sum(uint result);

   onMessage add(uint a, uint b) {
        uint result = a + b;
        address sender = msg.sender;
        send(sender, sum(result));
   }
}
contract B {
    uint total;
    message add(uint a, uint b);

    onMessage invoker(address addr, uint a, uint b) {
       send(addr, add(a, b));
    }

    onMessage sum(uint result) {
        if (result > 10) {
           total += result;
       }
    }
}
```

message:关键字，定义一条消息，包括消息的名称，和传递的参数，"message sum(uint result)"就定义了一条sum消息，其中需要传递一个uint类型的参数

onMessage:关键字，定义一种消息的监听器，包括消息的名字，和接收的参数，以及对消息的处理逻辑，"onMessage add(uint a, uint b)"就定义了一个消息的监听器，监听的是名字为add，接收的是两个uint类型的参数

send:关键字，是一条message的发送操作，需要有两个参数，一个是接收消息的地址(address)，另一个是发送的消息(message)

一个合约可以定义message，这个message的send操作只能在合约内执行，如果定义的消息希望被某一个合约处理，则对于message的名称和传递参数，需要根据该合约的消息监听器而定

也就是说，如果合约A需要给合约B发送一条消息并且希望合约B对消息进行处理，那么合约B必须有某一种类型消息的监听器，合约A需要按照合约B的消息监听器的名字和参数来定义消息并进行发送

一个合约可以定义消息监听器，消息监听器规定了这个合约可以接收的消息类型，只有符合该合约定义的消息监听器规范的消息才会被该合约正常接收和处理

注意，消息监听器不能像function一样被调用

如上所示：

合约A定义了一个"add(uint a, uint b)"的消息监听器，合约B定义了一个"sum(uint result)"的消息监听器，分别表示A和B会接收这两种类型的消息并进行处理

合约B因为要给A发送消息，因此合约B要按照A定义的add的消息监听器的规范定义消息，合约A在add消息的监听器中，要给合约B发送消息，因此合约A要按照B定义的sum的消息监听器的规范定义sum消息

## Solidity++中的getter

在Solidity++中，合约间的交互是通过消息传递的机制进行的，是异步的，因此合约内public类型的静态变量无法被合约外部访问，然而对于合约内部的状态，Solidity++提供了一种特殊的访问方式

```
pragma soliditypp ^0.4.1;
contract A {

    uint magic = 0;
   
    getter getMagic() returns(uint256) {
        return magic;
    }

    getter getMagicAdd(uint256 m) returns(uint256) {
        return calculate(m);
    }
    
    function calculate(uint256 m) public view returns(uint256) {
        return m + magic;
    }
}
```

如上例所示，在Solidity++中定义了一个getter关键字，该关键字有如下特性:

首先，getter定义的是一个方法

其次，getter定义的方法只需要定义方法名和入参，必须有返回值，该方法可以用来获取合约的状态但不能修改状态，仅向外部提供查询的接口

再次，getter定义的方法经过编译后的代码不会上链，因此getter定义的方法不能获取交易的信息，如调用"msg.amount"，"msg.tokenid"等

另外，getter定义的方法不能和其他链交互，如发交易，发送消息等，不能调用"require"，"revert"方法

最后，getter定义的方法体内可以调用function，其调用的function应该定义为view类型

## Solidity++合约示例

定义一个合约，合约的主要功能是给一个地址和金额的列表，合约给指定的地址转账指定金额数

```
// 告诉该合约用的是0.4.1版本的soliditypp编写，并且这些代码具有向上兼容性。保证不会在不同soliditypp编译版本下编译会出现不同的行为。
pragma soliditypp ^0.4.1;
 
 
// 定义一个合约A
contract A {
     // 定义一个消息监听器，合约只能通过消息的传递进行交互，因此凡是需要向外部提供的接口都需要定义成监听器
     // 监听器需要定义监听的消息名称和消息所带的参数，不需要定义可见性，监听器没有返回值
     // 在这里监听器的名称是transfer，传的参数是一个uint类型的数组body，数组的第奇数位的元素是地址，偶数位的元素是地址对应的需要转账的金额数
     onMessage transfer(uint[] calldata body) payable {
         // 判断入参的长度是否是偶数，因为地址和金额数是一一对应的
         require(body.length%2==0);
         uint256 totalAmount = 0;
         for(uint i = 0; i < body.length; i=i+2) {
             uint addr = body[i];
             uint amount = body[i+1];
             totalAmount = totalAmount + amount;
             require(totalAmount >= amount);
             if(amount > 0) {
                // 向addr地址转账，金额是amount，转账的tokenId是msg.tokenid
                address(addr).transfer(msg.tokenid, amount);
             }
         }
         require(totalAmount == msg.amount);
     }
}
```
