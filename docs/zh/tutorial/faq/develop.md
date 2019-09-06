# gvite开发常见问题

## 部署测试节点
见[本地运行测试节点](../contract/testnode.html)

## rpc接口常见错误
见[常见rpc错误汇总](../../api/rpc/#常见rpc错误汇总)

## 发交易SOP
发交易步骤：
1. 确定交易内容，包括previousHash、blockType、accountAddress、toAddress、sendBlockHash、amount、tokenId、data等
2. 计算交易所需配额、账户可用配额和全网拥堵程度，如果当前可用配额充足，直接构造完整的账户块，发交易即可
3. 如果当前可用配额不足，判断全网是否拥堵，如果全网拥堵，可以等待一段时间再发这笔交易；如果不拥堵，尝试计算PoW再发交易

相关RPC接口：[计算交易配额、账户可用配额、全网拥堵程度](../../api/rpc/ledger_v2.html#ledger_getPoWDifficulty)；[计算PoW](../../api/rpc/util.html#util_getPoWNonce)；[发交易](../../api/rpc/ledger_v2.html#ledger_sendRawTransaction)

注意：同一个账户的多笔交易之间必须严格有序，按照hash和previousHash的依赖关系形成一条链，previousHash相同的两个不同的块最终只有一个块会被快照，另一个块会被丢弃。因此批量收发交易时，同一个账户最好用一个线程来收发交易，用previousHash字段来强制指定交易发送顺序，这样账户链不容易分叉，前一笔交易被回滚时也比较容易发现。

`ledger_sendRawTransaction`接口常见错误和处理方法：
* lack of difficulty field，nonce字段非空，difficulty字段为空；
check pow nonce failed，difficulty字段和nonce字段不匹配；
tokenId doesn’t exist，tokenId不存在；
verify hash failed，哈希计算错误；
verify signature failed，签名计算错误；
receive's AccountAddress doesn't match the send'ToAddress，响应交易的sendBlockHash对应的请求交易不是当前账户的在途交易；
Inconsistent execution results in vm, err:xxx，xxx字段和虚拟机的执行结果不一致，通常是创建合约请求交易的toAddress、调用内置合约请求交易的data；
abi: method not found，调用内置合约时合约方法不存在，data字段不对；
invalid method param，调用内置合约时参数错误，通常是amount、tokenId和data中的参数不对；
contract not exists，请求交易的toAddress是合约地址，合约不存在

账户块字段错误，修改对应的字段内容后重试即可

* The node time is inaccurate, quite different from the time of latest snapshot block. 

节点上的最新快照块时间太旧，检查节点同步状态

* calc PoW twice referring to one snapshot block

在同一个快照块期间计算两次PoW，等一个快照块后重试即可

* generator_vm panic error

vm执行过程中发生了panic，通常是由于执行期间节点发生了回滚，重试即可

* block is already received successfully

响应交易的sendBlockHash对应的请求交易已经被接收，不能重复接收同一个块

* fail to find receive's send in verifyProducerLegality；failed to find the recvBlock's fromBlock

响应交易的fromBlockHash对应的块不存在，通常是由于分叉或回滚，确认请求交易是否被回滚，如果未回滚，重试即可

* verify prevBlock failed, incorrect use of prevHash or fork happened

账户链上最新的块和当前交易的previousHash、height对不上，通常是由于账户链分叉，可以尝试用账户链上最新块的hash和height重新生成这笔交易

* insufficient balance for transfer

余额不足，请确认账户余额和转账金额

* out of quota

配额不足。如果当前拥堵，等不拥堵时重试；如果当前有抵押，并且抵押获得的utpe足够覆盖这笔交易，等待配额恢复后重试或者尝试计算PoW即可；如果当前没有抵押或者抵押获得的utpe不能覆盖这笔交易，先抵押或者计算PoW

## 如何计算需要抵押多少VITE

一个账户的当前可用配额取决于当前抵押的`VITE`金额和这个账户在过去 74 个快照块期间的配额使用情况。判断需要抵押多少VITE时，参考[配额使用规则](../rule/quota.html#配额使用规则)计算这个账户在75秒内平均每秒需要使用多少配额

两种方法根据所需配额计算需要抵押多少VITE：
* 参考[配额计算逻辑](../rule/quota.html#配额计算逻辑)
* 通过RPC接口[计算最小抵押金额](../../api/rpc/contract_v2.html#contract-getrequiredstakeamount)

例如一个账户需要在75秒内发送两笔不带备注的转账交易，那么这个账户每秒使用的配额为 21000*2/75=560，那么这个账户至少需要抵押267 `VITE`

## 如何自动接收在途交易

vitejs等sdk提供了自动接收在途交易的接口，推荐使用这些工具来实现自动接收在途交易。

对于更灵活的场景，可以通过轮询[在途交易列表](../../api/rpc/ledger_v2.html#ledger_getUnreceivedBlocksByAddress)或者[订阅在途交易事件](../../api/rpc/subscribe_v2.html#subscribe_createUnreceivedBlockSubscriptionByAddress)的方式监听账户在途交易，然后构造响应交易的方式来[发送交易](../../api/rpc/ledger_v2.html#ledger_sendRawTransaction)

## 为何订阅不到消息

按以下步骤排查问题：
* 确认节点已经同步到最新高度
* 确认gvite节点的node_config.json的`PublicModules`中配置了`"subscribe"`，并且配置了`"SubscribeEnabled":true`
* 确认订阅成功，并且在订阅成功后，相应的事件发生了。例如订阅了指定账户地址的交易事件，可以用[查询用户账户块列表接口](../../api/rpc/ledger_v2.html#ledger_getAccountBlocksByAddress)查询用户账户链上是否有新交易。A账户给B账户发交易，想确认交易是否发送成功，应该订阅A账户的新交易或者订阅B账户的在途交易。

## 如何区分合约地址和普通账户地址

可以根据地址字符串生成规则直接区分一个地址是合约账户还是普通账户，见[VEP 16: 账户地址规范](../../vep/vep-16.html)

区块链浏览器中的账户详情页会展示一个地址是合约账户还是普通账户。

## 智能合约如何获取随机数
Solidity++中提供了两个语法来获取随机数

```
// 获取随机数种子，一次合约调用中多次调用方法，每次返回的值相同
uint64 random = random64();
// 获取随机数，一次合约调用中多次调用方法，每次返回的值不同
uint64 random = nextrandom();
```

随机数取值逻辑见[VEP 12: VITE中随机数的实现](../../vep/vep-12.html)

使用随机数的智能合约，在创建合约时需要指定`randomDegree`参数，参数值表示发给这个合约账户的请求交易被多少个包含随机数的快照块确认之后出响应交易，取值范围 0-75，取值越大越安全，合约出响应交易的速度也越慢。

## 如何反解析智能合约调用参数和事件

编译合约代码时指定`--abi`参数可以获得合约的ABI定义，包括合约构造函数、方法、事件（也叫event、vmlog）等。可以根据合约ABI定义反解析请求交易的data字段，获取合约调用参数；根据ABI定义反解析vmlog，获取事件参数。

在Vite链上部署智能合约后可以在区块链浏览器的合约账户详情页上传合约代码，上传成功后即可在账户详情页查看合约的源代码和ABI等信息。

内置合约的ABI定义见[调用内置合约](../../api/rpc/contract_v2.html#调用内置合约)

Vite的ABI是在[以太坊的ABI](https://solidity.readthedocs.io/en/develop/abi-spec.html)基础上扩展的，vitejs等sdk提供了abi解析和反解析的工具。

## 如何查询合约状态

合约执行过程中查询合约状态的两种方法：
* 通过event打印中间变量的值，soliditypp vscode插件提供了反解析event的功能，也可以用vitejs的abi反解析工具反解析event。
* 在node_config.json文件中配置`"VMDebug":true`，DataDir/maindata/vmlog/目录下的interpreter.log会打印合约代码执行过程日志，包含每一条合约指令的名称，执行后`stack`、`memory`、`storage`状态等。

离线查询合约状态的两种方法：
* Solidity++提供了getter语法，用于离线查询合约状态，可以调用RPC接口[离线查询合约状态](../../api/rpc/contract_v2.html#contract-calloffchainmethod)。
* 如果熟悉Solidity和EVM原理，可以调用RPC接口[离线查询合约存储](../../api/rpc/contract_v2.html#contract_getContractStorage)

## 执行智能合约时消耗的配额如何计算

智能合约在在接收一笔交易时花费的配额等于[接收交易本身的配额](../../vep/vep-17.html#交易配额消耗表)加上[执行合约代码消耗的配额](../../vep/vep-17.html#虚拟机指令配额消耗表)。

对于执行合约代码消耗的配额，由于Vite的虚拟机是在EVM的基础上扩展的，Vite执行合约时收取配额的逻辑类似EVM中执行合约时收取gas的逻辑，建议先阅读EVM的相关文档，了解一下EVM的执行原理。

下面以一个简单的示例来说明一笔合约响应交易的配额如何收取：

调用一个智能合约方法时，如果方法是non-payable的，即不可转账的，那么合约在执行这个方法时会先检查这笔调用交易的转账金额是否为0，检查转账金额的二进制代码大致如下：

`341561001057600080FD`

我们把这段代码翻译成更容易理解的OPCODE来说明执行逻辑和配额计算逻辑。

```
34 CALLVALUE 读取请求交易的转账金额，放到堆栈顶部，消耗配额1
15 ISZERO 判断堆栈顶部的转账金额是否为0，如果为0在堆栈顶部放1，否则放0，消耗配额1
610010 PUSH2 0x0010 在堆栈顶部放入0x0010，消耗配额1
57 JUMPI 如果堆栈顶部的第二个元素不为0，则跳转到0x0010处继续执行代码，否则不跳转，消耗配额4
6000 PUSH1 0x00 在堆栈顶部放入0x00，消耗配额1
80 DUP1 在堆栈顶部放入0x00，消耗配额1
FD REVERT 回滚（回滚指令会从栈顶读取两个元素，作为返回值），消耗配额0
```

如果执行这段代码时，转入金额为0，那么这笔响应交易最终会回滚，共消耗21000+1+1+1+4+1+1+0=21009配额。

可以在本地部署测试环境，在node_config.json文件中配置`"VMDebug":true`，观察DataDir/maindata/vmlog/目录下的interpreter.log日志文件，日志中包含合约执行过程中每一条合约指令的名称、剩余配额等。

## 为什么查不到智能合约的vmlog

gvite默认不保存vmlog（即event），智能合约依赖的全节点如果需要使用vmlog，注意修改node_config.json，配置以下任意一个参数:
* `"VmLogAll":true` 表示保存所有合约的vmlog
* `"VmLogWhiteList":["vite_d789431f1d820506c83fd539a0ae9863d6961382f67341a8b5","vite_000000000000000000000000000000000000000595292d996d"]` 表示只保存指定合约的vmlog

## 如何在测试钱包中调试

可以用类似[eruda](https://github.com/liriliri/eruda)的日志工具，查看控制台日志
