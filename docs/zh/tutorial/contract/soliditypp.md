# Solidity++

Solidity++和Solidity的语法基本上相同，他们之间的差异主要是因为Solidity++是异步的而Solidity是同步的

## Solidity++删除的语法

```
tx.gasprice;
block.coinbase;
block.difficulty;
block.gaslimit;
blockhash(param);
gasleft();
msg.gas;
selfdestruct(_owner);
suicide(_addr);
address(_addr).send(_amount);
```

以上示例的语法在Solidity++中全部失效

所有与ecrecover，ripemd160相关的语法全部失效

delegatecall方法暂时不提供

Solidity中内联汇编的语法暂时不提供


## Solidity++新增和修改的语法

Solidity++新增的语法如下:

```
uint height = height();
bytes32 b1 = fromhash();
uint height = accountheight();
bytes32 b2 = prevhash();
uint64 random = random64();
uint64 newRandom = nextrandom();
```

"height()"返回当前快照块的高度

"fromhash()"返回请求交易的哈希值

"accountheight()"获取账户链上最新块的高度

"prevhash()"获取账户链上最新块的哈希

"random64()"获取一个uint64的随机数，在一次合约运行过程中返回同一个值

"nextrandom()"获取一个uint64的随机数，在一次合约运行过程中返回不同的值

Solidity++的address和tokenId定义的语法如下:

```
tokenId token01 = tokenId("tti_2445f6e5cde8c2c70e446c83");
tokenId token02 = "tti_2445f6e5cde8c2c70e446c83";
address addr01 = address("vite_0102030405060708090807060504030201020304eddd83748e");
address addr02 = "vite_0102030405060708090807060504030201020304eddd83748e";
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

直接获取某个账户的余额，因为现在一个账户可以拥有多种代币，因此在Solidity++中获取代币余额的时候需要指定tokenId，另外现在只能读取自己的余额

```
balance(_tokenId)
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
pragma soliditypp ^0.4.3;
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

对于关键字message和send的补充:

在Solidity++的0.4.5版本开始,合约间消息传递的语法支持以下两个功能:

1.发送消息时转账

2.发送消息的send语法可以获取一个bytes32类型的返回值,该返回值代表的是当前的请求hash

```
pragma soliditypp ^0.4.5;
contract A {
   message messageWithPay(uint result) payable;

   onMessage add(uint a, uint b) {
        uint result = a + b;
        address sender = msg.sender;
        send(sender, messageWithPay(result), "tti_5649544520544f4b454e6e40", 100 vite);
   }
}
contract B {
    uint total;

    onMessage messageWithPay(uint result) payable {
        if (result > 10) {
           total += result;
       }
    }
}
```

如上所示:

合约B中的"onMessage messageWithPay(uint result)"是payable类型的,因此,合约A需要定义一个payable类型的messageWithPay消息

在send的语法中,因为消息是payable的,所以需要带上转账的tokenId和转账的金额,在如上所示的例子中,send一共有四个参数,第一个参数是合约地址,第二个参数是发送的消息,第三个参数是转账的tokenId,第四个参数是转账的金额

对于messageWithPay这个消息来说,因为消息定义为payable类型的,所以在写send语句的时候,可以在第三个和第四个参数的位置上写tokenId和金额这两个参数,这两个参数也可以不指定,如果不指定,则编译过程会自动填写默认的vite的tokenId和0金额

另外,如果定义的消息不是payable的话,那么在写send语句的时候,一定不能指定tokenId和金额,只需要指定合约地址和消息这两个参数即可,如下的写法是会编译不通过的

```
pragma soliditypp ^0.4.5;
contract A {
   message message(uint result);

   onMessage add(uint a, uint b) {
        uint result = a + b;
        address sender = msg.sender;
        send(sender, message(result), "tti_5649544520544f4b454e6e40", 100 vite);
   }
}
```

当然,如果onMessage方法定义的是payable类型,那么对应的message最好定义为payable类型,不推荐把payable类型的onMessage方法对应的message定义为非payable类型

```
pragma soliditypp ^0.4.5;
contract A {
   message messageWithPay(uint result) payable;
   bytes32 hash;

   onMessage add(uint a, uint b) {
        uint result = a + b;
        address sender = msg.sender;
        hash = send(sender, messageWithPay(result), "tti_5649544520544f4b454e6e40", 100 vite);
   }
}
contract B {
    uint total;

    onMessage messageWithPay(uint result) payable {
        if (result > 10) {
           total += result;
       }
    }
}
```

如上所示,在合约A中定义了一个bytes32类型的hash,并且在send时给hash赋值

send语法的返回值只能是byte32类型的,定义为其他类型会编译不通过,当然这个返回值并不是发送的消息执行之后的返回结果,而是发送消息是的请求哈希值

对于这个请求哈希的用法,例如我们可以获取抵押请求的hash，后续直接用这个hash直接用来取消抵押

## Solidity++中的getter

在Solidity++中，合约间的交互是通过消息传递的机制进行的，是异步的，因此合约内public类型的静态变量无法被合约外部访问，然而对于合约内部的状态，Solidity++提供了一种特殊的访问方式

```
pragma soliditypp ^0.4.3;
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

定义一个合约，合约的主要功能是给一个地址投票,但是需要调用第三方的投票验证合约,验证投票合法性，第三方投票验证合约需要收取手续费

```
pragma soliditypp ^0.4.5;
contract VoteContract {
    // 第三方投票验证合约的地址
    address private checkAddr = "vite_0102030405060708090807060504030201020304eddd83748e";
    // 投票的计票器
    mapping(address => uint) public voteMap;
    // 投票合法地址map
    mapping(address => bool) public invalidAddrsMap;
    // 投票合法验证消息,payable类型
    message checkValid(address addr) payable;
 
    // 投票接口
    onMessage vote(address addr, uint voteNum) payable {
        // 发送投票合法性验证消息,调用第三方验证合约
        send(checkAddr, checkValid(addr), msg.tokenid, msg.amount);
        // 更新计票器
        voteMap[addr] = voteMap[addr] + voteNum;
    }
 
    // 根据投票合法性验证结果更新投票合法地址的map
    onMessage isValid(address addr, bool valid) {
        if(!valid && !invalidAddrsMap[addr]) {
            invalidAddrsMap[addr] = true;
        }
    }
    
    getter getVoteNum(address addr) returns(bool isInValid, uint voteNum) {
        return (invalidAddrsMap[addr], voteMap[addr]);
    }
}

contract CheckContract {
    
    // 给投票合约发送验证结果
    message isValid(address addr, bool valid);

    // 接收并验证投票地址是否合法
    onMessage checkValid(address addr) payable {
        bool result = check(addr);
        send(msg.sender, isValid(addr, result));
    }

    function check(address addr) private pure returns(bool checkResult) {
        // 投票验证逻辑
    }
}
```
