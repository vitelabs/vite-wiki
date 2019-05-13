# Solidity++

Solidity++ retains most syntax in Solidity. The difference mainly comes from Vite's asynchronous architecture and native multi-token model, as explained below.

## Syntax Removed in Solidity++

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

Above syntax has been disabled in Solidity++

Syntax related to `ecrecover` and `ripemd160` has been disabled

`DELEGATECALL` is not available at this moment


## Syntax Added/Modified in Solidity++

`address` and `tokenId` are redefined in Solidity++

```
tokenId token01 = tokenId("tti_2445f6e5cde8c2c70e446c83");
tokenId token02 = "tti_2445f6e5cde8c2c70e446c83";
address addr01 = address("vite_8ba849f3678057aeefc84c787f7cb957426cc3a4b0e8eca13c");
address addr02 = "vite_8ba849f3678057aeefc84c787f7cb957426cc3a4b0e8eca13c";
```

To obtain transfer tokenId in Solidity++

```
msg.tokenid
```

To obtain account balance

In Solidity,

```
address.balance
```

In Solidity++, since multiple tokens co-exist in an account, a parameter of tokenId is required

```
address.balance(_tokenId)
```

In Solidity, sending ETH to an address

```
address(_addr).transfer(_amount);
```

In Solidity++, sending token to an address. An additional parameter of tokenId is required

```
address(_addr).transfer(_tokenId, _amount);
```

Unit of ETH in Solidity: wei/szabo/finney/ether

1 ether = 1000 finney, 1 finney = 1000 szabo, 1 szabo = 1000000000000 wei

Unit of VITE in Solidity++: attov/vite

1 vite = 1000000000000000000 attov

In Solidity++, all syntax related to sha256 or sha3 is replaced by blake2b

## Asynchronous Syntax in Solidity++

In Solidity++, cross-contract calls are not completed by function calls, but only by message sending

`public` function in Solidity++ won't provide external access. Moreover, `function` is not be able to declare as `external`. Instead, `function` can only be declared as `public`, `private` or `internal`

In the meantime, `public` static variable can not be visited from outside

An example

```
pragma soliditypp ^0.4.2;
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

`message`: keyword, declaring a message, including message name and passed-in parameter. `message sum(uint result)` declares message "sum", accepting a `uint` parameter.

`onMessage`: keyword, declaring a message listener, including message name, passed-in parameter and logic that handles the message. `onMessage add(uint a, uint b)` declares message listener "add", accepting two `uint` parameters.

`send`: keyword, sending a message, accepting two parameters, the message receiving address and the actual message


Messages can be declared in contract. The send operation of the message can only be called in the contract that declares it. If a message is to be processed by another contract, the name and passed-in parameters of the message rely on how message listener defines in the other contract.

In other words, if contract A is going to send a message to contract B for processing, contract B must define a listener of a certain type of message for A to follow when declaring the message.

A contract can define a message listener. The message listener specifies the type of message that the contract can receive. Only messages that conform to spec will be normally received and processed.

Note: message listener cannot be called directly like normal function.

In above example,

Contract A defines message listener `add(uint a, uint b)` while contract B defines message listener `sum(uint result)`, indicating contract A and contract B will receive the two kinds of messages and process respectively.

Since contract B sends message to contract A, contract B must declare an "add" message which complies to the message listener defined in contract A. Meanwhile, contract A should declare a "sum" message according to the message listener in contract B, since contract A will send "sum" message to contract B in message listener "add".

## `getter` in Solidity++

In Solidity++, the interaction between contracts is carried out through message passing in an asynchronous manner, so the contract's public fields cannot be accessed externally. 
To address this situation, Solidity++ provides a special way to access the fields.

```
pragma soliditypp ^0.4.2;
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

As shown in the example above, a `getter` keyword is defined, which has the following characteristics:

* Keyword `getter` is used to define a method.
* Method name, input parameters and return value are required when defining a "getter". As a query interface, this method is only used to obtain the state of contract but cannot modify it.
* The compiled code of "getter" method is not stored on chain, so it is not allowed to get transaction information, such as calling `msg.amount` or `msg.tokenid`, within the method.
* "getter" cannot interact with other accounts, such as sending transactions, sending messages, etc. It cannot call `require` or `revert` either.
* "getter" can call other functions. The function it calls should be defined as `view` type.

## Example of Solidity++ Contract

A batch transfer contract which accepts a list of addresses and amounts and transfers the specified amount to the specified address

```
// Declares the contract is written in soliditypp 0.4.0. Backwards compatibility is guaranteed to ensure different version of compilers will yield the same output.
pragma soliditypp ^0.4.2;
 
 
// Defines contract A
contract A {
     // Defines a message listener. Since cross-contract communication has to be completed via message sending, all external methods must be defined as message listeners
     // The listener needs to define message name and parameters. Visibility is not necessary. Message listener has no return value
     // In this example, a "transfer" listener is defined with a passed-in parameter of uint array, representing address in odd element and amount in even
     onMessage transfer(uint[] calldata body) payable {
         // Checks if the parameter length is even because each address has to match an amount
         require(body.length%2==0);
         uint256 totalAmount = 0;
         for(uint i = 0; i < body.length; i=i+2) {
             uint addr = body[i];
             uint amount = body[i+1];
             totalAmount = totalAmount + amount;
             require(totalAmount >= amount);
             if(amount > 0) {
                // Transfers the amount to address. Token ID is defined in msg.tokenid
                address(addr).transfer(msg.tokenid ,amount);
             }
         }
         require(totalAmount == msg.amount);
     }
}
```
