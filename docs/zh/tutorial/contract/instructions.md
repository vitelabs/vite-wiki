# 指令集

Vite保留了大部分EVM指令的语义，但由于Vite的账本结构及交易定义与以太坊不同，一些EVM指令的语义需要重新定义，例如获取区块信息的一组指令。

Vite提供的指令集如下：

## 0s：停止和代数运算指令集
|  指令代码  | 助记词 | 出栈数 | 入栈数 | 语义 | 和EVM的差异 |
|:------------:|:-----------:|:-----------:|:-----------:|:-----------:|:-----------:|
| 0x00 | STOP | 0 | 0 | 停止代码执行。 | 语义相同 | 
| 0x01 | ADD | 2 | 1 | 将两个操作数相加。 | 语义相同 | 
| 0x02 | MUL | 2 | 1 | 将两个操作数相乘。 | 语义相同 | 
| 0x03 | SUB | 2 | 1 | 将两个操作数相减。 | 语义相同 | 
| 0x04 | DIV | 2 | 1 | 将两个操作数相除，如除数为0，则返回0。 | 语义相同 | 
| 0x05 | SDIV | 2 | 1 | 带符号的整除。 | 语义相同 | 
| 0x06 | MOD | 2 | 1 | 求模操作。 | 语义相同 | 
| 0x07 | SMOD | 2 | 1 | 带符号的求模操作。 | 语义相同 | 
| 0x08 | ADDMOD | 3 | 1 | 先将前两个操作数相加，再与第三个操作数求模。 | 语义相同 | 
| 0x09 | MULMOD | 3 | 1 | 先将前两个操作数相乘，再与第三个操作数求模。 | 语义相同 | 
| 0x0A | EXP | 2 | 1 | 求两个操作数的乘方。 | 语义相同 | 
| 0x0B | SIGNEXTEND | 2 | 1 | 符号扩展。 | 语义相同 | 

## 10s：比较和位运算指令集
|  指令代码  | 助记词 | 出栈数 | 入栈数 | 语义 | 和EVM的差异 |
|:------------:|:-----------:|:-----------:|:-----------:|:-----------:|:-----------:|
| 0x10 | LT | 2 | 1 | 小于比较。 | 语义相同 | 
| 0x11 | GT | 2 | 1 | 大于比较。 | 语义相同 | 
| 0x12 | SLT | 2 | 1 | 带符号的小于比较。 | 语义相同 | 
| 0x13 | SGT | 2 | 1 | 带符号的大于比较。 | 语义相同 | 
| 0x14 | EQ | 2 | 1 | 比较是否相等。 | 语义相同 | 
| 0x15 | ISZERO | 1 | 1 | 判断是否为0。 | 语义相同 | 
| 0x16 | AND | 2 | 1 | 按位与操作。 | 语义相同 | 
| 0x17 | OR | 2 | 1 | 按位或操作。 | 语义相同 | 
| 0x18 | XOR | 2 | 1 | 按位异或操作。 | 语义相同 | 
| 0x19 | NOT | 1 | 1 | 按位非操作。 | 语义相同 | 
| 0x1A | BYTE | 2 | 1 | 取第二个操作数中的某一个字节。 | 语义相同 | 
| 0x1B | SHL | 2 | 1 | 左移。 | 语义相同 | 
| 0x1C | SHR | 2 | 1 | 逻辑右移。 | 语义相同 |
| 0x1D | SAR | 2 | 1 | 算术右移。 | 语义相同 |

## 20s：哈希指令集
|  指令代码  | 助记词 | 出栈数 | 入栈数 | 语义 | 和EVM的差异 |
|:------------:|:-----------:|:-----------:|:-----------:|:-----------:|:-----------:|
| 0x21 | BLAKE2B | 2 | 1 | 计算Blake2b哈希。 | Vite采用Blake2b哈希算法，不提供SHA3指令 |

## 30s：环境信息指令集
|  指令代码  | 助记词 | 出栈数 | 入栈数 | 语义 | 和EVM的差异 |
|:------------:|:-----------:|:-----------:|:-----------:|:-----------:|:-----------:|
| 0x30 | ADDRESS | 0 | 1 | 获取当前账户地址。 | 语义相同 | 
| 0x31 | BALANCE | 2 | 1 | 获取一个账户某种代币的余额。 | 入参增加代币id。 | 
| 0x32 | ORIGIN | - | - | 获取原始交易发送者地址。 | 不提供，Vite不维护内部交易与用户交易之间因果关系。 |
| 0x33 | CALLER | 0 | 1 | 获取直接调用者地址。 | 语义相同 | 
| 0x34 | CALLVALUE | 0 | 1 | 获取调用交易中的转账金额。 | 语义相同 | 
| 0x35 | CALLDATALOAD | 1 | 1 | 获取本次调用的参数数据。 | 语义相同 | 
| 0x36 | CALLDATASIZE | 0 | 1 | 获取本次调用的参数数据大小。 | 语义相同 | 
| 0x37 | CALLDATACOPY | 3 | 0 | 将调用参数数据拷贝到内存。 | 语义相同 | 
| 0x38 | CODESIZE | 0 | 1 | 获取在当前环境中运行的代码的大小。 | 语义相同 | 
| 0x39 | CODECOPY | 3 | 0 | 将当前环境中运行的代码拷贝到内存。 | 语义相同 | 
| 0x3A | GASPRICE | - | - | - | 不提供，Vite交易不需要手续费。 |
| 0x3B | EXTCODESIZE | 1 | 1 | 获取一个账户的代码大小。 | 语义相同 | 
| 0x3C | EXTCODECOPY | 4 | 0 | 将指定账户的代码拷贝到内存。 | 语义相同 | 
| 0x3D | RETURNDATASIZE | 0 | 1 | 获取前一次调用返回的数据大小。 | 语义相同 | 
| 0x3E | RETURNDATACOPY | 3 | 0 | 将前一次调用返回的数据拷贝到内存。 | 语义相同 | 
| 0x3F | EXTCODEHASH | 1 | 1 | 获取指定账户的代码哈希。 | 不提供 |

## 40s：区块信息指令集
|  指令代码  | 助记词 | 出栈数 | 入栈数 | 语义 | 和EVM的差异 |
|:------------:|:-----------:|:-----------:|:-----------:|:-----------:|:-----------:|
| 0x40 | BLOCKHASH | 1 | 1 | 获取一个区块的哈希。 | 语义不同。返回相应的快照块的哈希。 |  
| 0x41 | COINBASE | - | - | 获取所在区块挖矿受益人地址。 | 不提供 |
| 0x42 | TIMESTAMP | 0 | 1 | 获取所在区块的时间戳。 | 语义不同。返回交易引用的快照块的时间戳。 |
| 0x43 | HEIGHT | 0 | 1 | 返回所在区块编号。 | 语义不同，返回交易引用的快照块在快照链上的编号。 |  
| 0x44 | DIFFICULTY | - | - | 返回所在区块的难度。 | 不提供 |
| 0x45 | GASLIMIT | - | - | 返回所在区块的燃料限额。 | 不提供 |
| 0x46 | TOKENID | 0 | 1 | 获取交易的转账代币id | 新增 |

## 50s：栈、内存、存储、控制流操作指令集
|  指令代码  | 助记词 | 出栈数 | 入栈数 | 语义 | 和EVM的差异 |
|:------------:|:-----------:|:-----------:|:-----------:|:-----------:|:-----------:|
| 0x50 | POP | 1 | 0 | 从栈顶弹出一条数据。 | 语义相同 | 
| 0x51 | MLOAD | 1 | 1 | 从内存加载一个字。 | 语义相同 | 
| 0x52 | MSTORE | 2 | 0 | 保存一个字到内存。 | 语义相同 | 
| 0x53 | MSTORE8 | 2 | 0 | 保存一个字节到内存。 | 语义相同 | 
| 0x54 | SLOAD | 1 | 1 | 从存储中加载一个字。 | 语义相同 | 
| 0x55 | SSTORE | 2 | 0 | 保存一个字到存储。 | 语义相同 | 
| 0x56 | JUMP | 1 | 0 | 跳转指令。 | 语义相同 | 
| 0x57 | JUMPI | 2 | 0 | 条件跳转指令。 | 语义相同 | 
| 0x58 | PC | 0 | 1 | 获取程序计数器的值。 | 语义相同 | 
| 0x59 | MSIZE | 0 | 1 | 获取内存大小。 | 语义相同 | 
| 0x5A | GAS | - | - | 获取可用燃料数 | 不提供 |
| 0x5B | JUMPDEST | 0 | 0 | 标注一个跳转目的地。 | 语义相同 | 

## 60s和70s：压栈操作指令集
|  指令代码  | 助记词 | 出栈数 | 入栈数 | 语义 | 和EVM的差异 |
|:------------:|:-----------:|:-----------:|:-----------:|:-----------:|:-----------:|
| 0x60 | PUSH1 | 0 | 1 | 将1字节对象压入栈顶。 | 语义相同 | 
| 0x61 | PUSH2 | 0 | 1 | 将2字节对象压入栈顶。 | 语义相同 | 
| ... | ... | ... | ... | ... | ... | 
| 0x7F | PUSH32 | 0 | 1 | 将32字节对象（整个字）压入栈顶。 | 语义相同 | 

## 80s：复制操作指令集
|  指令代码  | 助记词 | 出栈数 | 入栈数 | 语义 | 和EVM的差异 |
|:------------:|:-----------:|:-----------:|:-----------:|:-----------:|:-----------:|
| 0x80 | DUP1 | 1 | 2 | 复制栈中第1个对象，并压入栈顶。 | 语义相同 | 
| 0x81 | DUP2 | 2 | 3 | 复制栈中第2个对象，并压入栈顶。 | 语义相同 | 
| ... | ... | ... | ... | ... | ... | 
| 0x8F | DUP16 | 16 | 17 | 复制栈中第16个对象，并压入栈顶。 | 语义相同 | 

## 90s：交换操作指令集
|  指令代码  | 助记词 | 出栈数 | 入栈数 | 语义 | 和EVM的差异 |
|:------------:|:-----------:|:-----------:|:-----------:|:-----------:|:-----------:|
| 0x90 | SWAP1 | 2 | 2 | 交换栈中第1个和第2个对象。 | 语义相同 | 
| 0x91 | SWAP2 | 3 | 3 | 交换栈中第1个和第3个对象。 | 语义相同 | 
| ... | ... | ... | ... | ... | ... | 
| 0x9F | SWAP16 | 17 | 17 | 交换栈中第1个和第17个对象。 | 语义相同 | 

## a0s：日志操作指令集
|  指令代码  | 助记词 | 出栈数 | 入栈数 | 语义 | 和EVM的差异 |
|:------------:|:-----------:|:-----------:|:-----------:|:-----------:|:-----------:|
| 0xA0 | LOG0 | 2 | 0 | 扩展日志记录，不设主题。 | 语义相同 | 
| 0xA1 | LOG1 | 3 | 0 | 扩展日志记录，1个主题。 | 语义相同 | 
| ... | ... | ... | ... | ... | ... |
| 0xA4 | LOG4 | 6 | 0 | 扩展日志记录，4个主题。 | 语义相同 | 

## F0s：系统操作指令集
|  指令代码  | 助记词 | 出栈数 | 入栈数 | 语义 | 和EVM的差异 |
|:------------:|:-----------:|:-----------:|:-----------:|:-----------:|:-----------:|
| 0xF0 | CREATE | - | - | 创建一个新合约。 | 不提供 |
| 0xF1 | CALL | 5 | 0 | 调用另一个合约。 | 异步调用另一个合约，无返回值。 | 
| 0xF2 | CALLCODE | - | - | 调用另一个合约的代码，改变本账户状态。 | 不提供 |
| 0xF3 | RETURN | 2 | 0 | 停止执行并返回数据。 | 语义相同 | 
| 0xF4 | DELEGATECALL | 6 | 1 | 同步调用另一个合约的代码，改变本账户状态，保留原始交易信息。 | 暂不提供 | 
| 0xFA | STATICCALL | - | - | 调用另一个合约，不允许改变状态。 | 不提供 |
| 0xFD | REVERT | 2 | 0 | 停止执行，恢复状态并返回数据。 | 语义相同 | 
| 0xFF | SELFDESTRUCT | 1 | 0 | 停止执行，将合约设置为待删除，返回所有余额。 | 暂不提供 | 