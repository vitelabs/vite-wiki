# VEP 17: 配额衡量

Vite的虚拟机是在EVM的基础上扩展的，保留了EVM中燃料的概念。和EVM的燃料类似，在Vite中，通过配额来量化虚拟机执行代码时所消耗的计算资源和存储资源，并确保虚拟机在有限次执行内停机。

## 配额衡量依据

根据Vite链的特性和目前的实现细节，我们从以下几个方面衡量一笔交易或者一个虚拟机指令收取的配额：

* CPU执行时间，即在稳定的环境下，这个操作需要执行多长时间；
* 历史数据，这类数据需要永久存储，但通常不提供链上查询，例如账户块数据、智能合约的event等；
* 状态存储，这类数据可以通过历史数据恢复，通常需要提供最新状态的查询，例如账户余额，合约状态等；
* 带宽，即需要在网络上传播的数据，例如网络块；
* 内存，虚拟机执行过程中占用的内存。

Vite在代号为SPROUT的硬分叉修改了内置合约方法和虚拟机指令的配额消耗。

## 交易配额消耗表

|  交易名称  | 硬分叉后消耗配额 | 硬分叉前消耗配额 |
|:------------:|:-----------:|:-----------:|
| Request	| 21000 + 68×dataBytes | 21000 + 68×dataBytes |
| Response	| 21000	| 21000 |
| CreateRequest	| 31000 + 68×dataBytes | 21000 + 68×dataBytes |
| CreateResponse	| 31000	 | 53000 |
| PledgeRequest	| 105000	| 82000 |
| CancelPledgeRequest	| 105000	| 73000 |
| AgentPledgeRequest	| 115500	| - |
| AgentCancelPledgeRequest	| 115500	| - |
| RegisterRequest	| 168000	| 62200 |
| CancelRegisterRequest	| 126000	| 83200 |
| RewardRequest	| 147000	| 68200 |
| UpdateRegistrationRequest	| 168000	| 62200 |
| VoteRequest	| 84000	| 62000 |
| CancelVoteRequest	| 52500	| 62000 |
| MintRequest	| 189000	| 104525 |
| IssueRequest	| 126000	| 69325 |
| BurnRequest	| 115500	| 48837 |
| TransferOwnerRequest	| 136500	| 58981 |
| ChangeTokenTypeRequest	| 115500	| 63125 |
| GetTokenInfoRequest	| 31500	| - |
| DepositResponse | 10500 | - |
| WithdrawResponse | 10500 | - |
| NewmarketResponse | 31500 | - |
| NeworderResponse | 25200 | - |
| SettleorderResponse | 21000 | - |
| PeriodjobResponse | 8400 | - |
| PledgeforvxResponse | 31500 | - |
| PledgeforvipResponse | 31500 | - |
| PledgecallbackResponse | 12600 | - |
| CancelpledgecallbackResponse | 16800 | - |
| GettokenibfocallbackResponse | 10500 | - |
| OwnerconfigResponse | 16800 | - |
| OwnerconfigtradeResponse | 10500 | - |
| MarketownerconfigResponse | 10500 | - |
| TransfertokenownerResponse | 8400 | - |
| NotifytimeResponse | 10500 | - |
| NewinviterResponse | 18900 | - |
| BindInviteCodeResponse | 8400 | - |
| EndorseVxResponse | 6300 | - |
| SettleMakerMinedVxResponse | 25200 | - |

## 虚拟机指令配额消耗表

|  指令代码  | 助记词 | 硬分叉后消耗配额 | 硬分叉前消耗配额 | 语义 |
|:------------:|:------------:|:-----------:|:-----------:|:-----------:|
| 0x00 | STOP | 0 | 0 | 停止代码执行。 |
| 0x01 | ADD | 2 | 3 | 将两个操作数相加。 |
| 0x02 | MUL | 2 | 5 | 将两个操作数相乘。 |
| 0x03 | SUB | 2 | 3 | 将两个操作数相减。 |
| 0x04 | DIV | 3 | 5 | 将两个操作数相除，如除数为0，则返回0。 |
| 0x05 | SDIV | 5 | 5 | 带符号的整除。 |
| 0x06 | MOD | 3 | 5 | 求模操作。 |
| 0x07 | SMOD | 4 | 5 | 带符号的求模操作。 |
| 0x08 | ADDMOD | 4 | 8 | 先将前两个操作数相加，再与第三个操作数求模。 |
| 0x09 | MULMOD | 5 | 8 | 先将前两个操作数相乘，再与第三个操作数求模。 |
| 0x0A | EXP | 10+50×expBytes | 10+50×expBytes | 求两个操作数的乘方。 |
| 0x0B | SIGNEXTEND | 2 | 5 | 符号扩展。 |
| 0x10 | LT | 2 | 3 | 小于比较。 |
| 0x11 | GT | 2 | 3 | 大于比较。 |
| 0x12 | SLT | 2 | 3 | 带符号的小于比较。 |
| 0x13 | SGT | 2 | 3 | 带符号的大于比较。 |
| 0x14 | EQ | 2 | 3 | 比较是否相等。 |
| 0x15 | ISZERO | 1 | 3 | 判断是否为0。 |
| 0x16 | AND | 2 | 3 | 按位与操作。 |
| 0x17 | OR | 2 | 3 | 按位或操作。 |
| 0x18 | XOR | 2 | 3 | 按位异或操作。 |
| 0x19 | NOT | 2 | 3 | 按位非操作。 |
| 0x1A | BYTE | 2 | 3 | 取第二个操作数中的某一个字节。 |
| 0x1B | SHL | 2 | 3 | 左移。 |
| 0x1C | SHR | 2 | 3 | 逻辑右移。 |
| 0x1D | SAR | 3 | 3 | 算术右移。 |
| 0x21 | BLAKE2B | 20+words | 30+6×words | 计算Blake2b哈希。 |
| 0x30 | ADDRESS | 1 | 2 | 获取当前账户地址。|
| 0x31 | BALANCE | 150 | 400 | 获取当前账户某种代币的余额。 |
| 0x33 | CALLER | 1 | 2 | 获取直接调用者地址。 |
| 0x34 | CALLVALUE | 1 | 2 | 获取调用交易中的转账金额。 |
| 0x35 | CALLDATALOAD | 2 | 3 | 获取本次调用的参数数据。 |
| 0x36 | CALLDATASIZE | 1 | 2 | 获取本次调用的参数数据大小。 |
| 0x37 | CALLDATACOPY | memGas + 3 + 3×memWords | memGas + 3 + 3×memWords  | 将调用参数数据拷贝到内存。 |
| 0x38 | CODESIZE | 1 | 2 | 获取在当前环境中运行的代码的大小。 |
| 0x39 | CODECOPY | memGas + 3 + 3×memWords | memGas + 3 + 3×memWords | 将当前环境中运行的代码拷贝到内存。 |
| 0x3D | RETURNDATASIZE | 1 | 2 | 获取前一次调用返回的数据大小。 |
| 0x3E | RETURNDATACOPY | memGas + 3 + 3×memWords | memGas + 3 + 3×memWords | 将前一次调用返回的数据拷贝到内存。 |
| 0x42 | TIMESTAMP | 1 | 2 | 获取最新快照块的时间戳。 |
| 0x43 | HEIGHT | 1 | 2 | 获取最新快照块的高度。 |
| 0x46 | TOKENID | 1 | 2 | 获取交易的转账代币id。 |
| 0x47 | ACCOUNTHEIGHT | 1 | 2 | 获取账户链高度。 |
| 0x48 | PREVHASH | 1 | 2 | 获取账户链上一个块的哈希。 |
| 0x49 | FROMHASH | 1 | 2 | 获取请求交易的哈希。 |
| 0x4A | SEED | 200 | 2 | 获取随机数种子。 |
| 0x4B | RANDOM | 250 | 2 | 获取一个新的随机数。 |
| 0x50 | POP | 1 | 2 | 从栈顶弹出一条数据。 |
| 0x51 | MLOAD | 2 | 3 | 从内存加载一个字。 |
| 0x52 | MSTORE | memGas + 1 | 3 | 保存一个字到内存。 |
| 0x53 | MSTORE8 | memGas + 1 | 3 | 保存一个字节到内存。 |
| 0x54 | SLOAD | 150 | 200 | 从存储中加载一个字。 |
| 0x55 | SSTORE | init/reset: 15000, clear: 0, noop: 200, mem: 200  | 5000 | 保存一个字到存储。 |
| 0x56 | JUMP | 4 | 8 | 跳转指令。 |
| 0x57 | JUMPI | 4 | 10 | 条件跳转指令。 |
| 0x58 | PC | 1 | 2 | 获取程序计数器的值。 |
| 0x59 | MSIZE | 1 | 2 | 获取内存大小。 |
| 0x5B | JUMPDEST | 1 | 1 | 标注一个跳转目的地。 |
| 0x60~0x7F | PUSH | 1 | 3 | 压栈操作。 |
| 0x80~0x8F | DUP | 1 | 3 | 复制操作。 |
| 0x90~0x9F | SWAP | 2 | 3 | 交换操作。 |
| 0xA0~0xA4 | LOG | 375 + 375×topics + 8×dataBytes | 375 | 扩展日志记录。 |
| 0xF1 | CALL | 7500 | 11000 | 调用另一个合约。 |
| 0xF3 | RETURN | 0 | 0 | 停止执行并返回数据。 |
| 0xFD | REVERT | 0 | 0 | 停止执行，恢复状态并返回数据。 |
| - | memGas | words + words×words/1024 | 3×words + words×words/512 | 内存扩展。 |
| - | confirmTime | 40 | 200 | 创建合约时指定了confirmTime的合约，合约链上的每笔响应交易对confirmTime收取配额。 |
| - | code | 160 | 200 | 创建合约响应交易中保存1byte代码。 |

