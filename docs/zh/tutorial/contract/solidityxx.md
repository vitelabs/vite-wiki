# Solidity++

Solidity++和Solidity的语法基本上相同,他们之间的差异主要是因为Solidity++是异步的而Solidity是同步的

## Solidity++删除的语法

```
tx.gasprice
block.coinbase
block.difficulty
block.gaslimit
gasleft()
msg.gas
selfdestruct(_owner)
address(addr).send(_amount)
```

以上示例的语法在Solidity++中全部失效

所有与ecrecover,ripemd160相关的语法全部失效

delegatecall方法暂时不提供


## Solidity++新增和修改的语法

Solidity++的address和tokenId定义的语法如下:

```
tokenId token01 = tokenId("tti_2445f6e5cde8c2c70e446c83");
tokenId token02 = "tti_2445f6e5cde8c2c70e446c83";
address addr01 = address("vite_8ba849f3678057aeefc84c787f7cb957426cc3a4b0e8eca13c");
address addr02 = "vite_8ba849f3678057aeefc84c787f7cb957426cc3a4b0e8eca13c";
```

Solidity++中获取交易中的转账tokenId的语法如下

```
msg.tokenid
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

因为在vite中新增了tokenId的概念,所以在Solidity++中进行交易的时候需要加上需要交易的tokenId

```
address(_addr).transfer(_tokenId, _amount);
```

Solidity中以太币的单位为:wei/szabo/finney/ether

1 ether = 1000 finney, 1 finney = 1000 szabo, 1 szabo = 1000000000000 wei

在Solidity++中vite币的单位为:attov/vite

1 vite = 1000000000000000000 attov

在Solidity++中,所有与sha256,sha3相关的语法都替换为blake2b


## Solidity++异步语法

在Solidity++中,合约之间不可以通过方法调用来进行交互,只能进行消息传递

也就是说,在Solidity++中public类型的方法不再对外提供访问接口,并且function不可以被定义为external类型,function只可以是public,private和internal类型

同时,合约内public类型的静态变量也无法被合约外部访问

示例

```
pragma solidityxx ^0.4.0;
contract A {
   message sum(uint sum);
 
   onMessage add(uint a, uint b) {
        uint sum = a + b;
        address sender = msg.sender;
        send(sender, sum(sum));       
   }
}
contract B {
    uint total;
    message add(address addr, uint a, uint b);
 
    function invoker(address addr, uint a, uint b) public {
       send(addr, add(a, b));
    }
 
    onMessage sum(uint sum) {
        if (sum > 10) {
           total += sum;
       }
    }
}
```

message:关键字,定义一条消息,包括消息的名称,和传递的参数,"message sum(uint sum)"就定义了一条sum消息,其中需要传递一个uint类型的参数

onMessage:关键字,定义一种消息的监听器,包括消息的名字,和接收的参数,以及对消息的处理逻辑,"onMessage add(uint a, uint b)"就定义了一个消息的监听器,监听的是名字为add,接收的是两个uint类型的参数

send:关键字,是一条message的发送操作,需要有两个参数,一个是接收消息的地址(address),另一个是发送的消息(message)

一个合约可以定义message,这个message的send操作只能在合约内执行,如果定义的消息希望被某一个合约处理,则对于message的名称和传递参数,需要根据该合约的消息监听器而定

也就是说，如果合约A需要给合约B发送一条消息并且希望合约B对消息进行处理,那么合约B必须有某一种类型消息的监听器,合约A需要按照合约B的消息监听器的名字和参数来定义消息并进行发送

一个合约可以定义消息监听器,消息监听器规定了这个合约可以接收的消息类型,只有符合该合约定义的消息监听器规范的消息才会被该合约正常接收和处理

如上所示：

合约A定义了一个"add(uint a, uint b)"的消息监听器,合约B定义了一个"sum(uint sum)"的消息监听器,分别表示A和B会接收这两种类型的消息并进行处理

合约B因为要给A发送消息,因此合约B要按照A定义的add的消息监听器的规范定义消息,合约A在add消息的监听器中,要给合约B发送消息,因此合约A要按照B定义的sum的消息监听器的规范定义sum消息


## Solidity++合约示例

定义一个合约，合约的主要功能是给一个地址和金额的列表，合约给指定的地址转账指定金额数

```
// 告诉该合约用的是0.4.0版本的solidityxx编写，并且这些代码具有向上兼容性。保证不会在不同solidityxx编译版本下编译会出现不同的行为。
pragma solidityxx ^0.4.0;
 
 
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
                address(addr).transfer(msg.tokenid ,amount);
             }
         }
         require(totalAmount == msg.value);
     }
}
```
