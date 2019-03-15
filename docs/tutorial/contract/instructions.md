# Instructions

Vite VM retains semantics of most EVM instructions. However, since Vite adopts different ledger structure and transaction definition that are different from Ethereum, some EVM instructions need to be redefined, such as those to query block information.

The instruction set in Vite VM is as follows:

## 0s: Stop and Arithmetic Operations
|  No.  | Mnemonic | POP | PUSH | Description | Differential with EVM |
|:------------:|:-----------:|:-----------:|:-----------:|:-----------:|:-----------:|
| 0x00 | STOP | 0 | 0 | Halts execution | Same semantics | 
| 0x01 | ADD | 2 | 1 | Add two operands | Same semantics | 
| 0x02 | MUL | 2 | 1 | Multiply two operands | Same semantics | 
| 0x03 | SUB | 2 | 1 | Subtract two operands | Same semantics | 
| 0x04 | DIV | 2 | 1 | Integer division operation. If the divisor is 0 then returns 0 | Same semantics | 
| 0x05 | SDIV | 2 | 1 |  Signed integer division operation | Same semantics | 
| 0x06 | MOD | 2 | 1 | Modulo remainder operation | Same semantics | 
| 0x07 | SMOD | 2 | 1 | Signed modulo remainder operation | Same semantics | 
| 0x08 | ADDMOD | 3 | 1 | Modulo addition operation. Add the former two operands and modulo 3rd one | Same semantics | 
| 0x09 | MULMOD | 3 | 1 |  Modulo multiplication operation | Same semantics | 
| 0x0A | EXP | 2 | 1 |  Exponential operation | Same semantics | 
| 0x0B | SIGNEXTEND | 2 | 1 |  Extend length of two’s complement signed integer | Same semantics | 

## 10s: Comparison and Bitwise Logic Operations
|  No.  | Mnemonic | POP | PUSH | Description | Differential with EVM |
|:------------:|:-----------:|:-----------:|:-----------:|:-----------:|:-----------:|
| 0x10 | LT | 2 | 1 | Less-than comparison | Same semantics | 
| 0x11 | GT | 2 | 1 | Greater-than comparison | Same semantics | 
| 0x12 | SLT | 2 | 1 | Signed less-than comparison | Same semantics | 
| 0x13 | SGT | 2 | 1 | Signed greater-than comparison | Same semantics | 
| 0x14 | EQ | 2 | 1 | Equality comparison | Same semantics | 
| 0x15 | ISZERO | 1 | 1 | Zero or not | Same semantics | 
| 0x16 | AND | 2 | 1 | Bitwise AND operation | Same semantics | 
| 0x17 | OR | 2 | 1 |  Bitwise OR operation | Same semantics | 
| 0x18 | XOR | 2 | 1 | Bitwise XOR operation | Same semantics | 
| 0x19 | NOT | 1 | 1 | Bitwise NOT operation | Same semantics | 
| 0x1A | BYTE | 2 | 1 | Retrieve single byte from 2nd operand | Same semantics | 
| 0x1B | SHL | 2 | 1 | Shift left | Same semantics | 
| 0x1C | SHR | 2 | 1 | Shift right | Same semantics |
| 0x1D | SAR | 2 | 1 | Arithmetic shift right | Same semantics |

## 20s: SHA3 Instruction Set
|  No.  | Mnemonic | POP | PUSH | Description | Differential with EVM |
|:------------:|:-----------:|:-----------:|:-----------:|:-----------:|:-----------:|
| 0x21 | BLAKE2B | 2 | 1 | Compute Blake2b hash | Vite adopted Blake2b hash algorithm. There is no SHA3 operation provided |

## 30s: Environmental Information
|  No.  | Mnemonic | POP | PUSH | Description | Differential with EVM |
|:------------:|:-----------:|:-----------:|:-----------:|:-----------:|:-----------:|
| 0x30 | ADDRESS | 0 | 1 |  Get address of currently executing account | Same semantics | 
| 0x31 | BALANCE | 2 | 1 | Get specific token's balance of the given account | Add tokenid as request parameter | 
| 0x32 | ORIGIN | - | - | Get execution origination address | Not provided, Vite doesn't maintain casual relationship between inner Tx and user Tx |
| 0x33 | CALLER | 0 | 1 | 获取直接调用者地址。 | Same semantics | 
| 0x34 | CALLVALUE | 0 | 1 | 获取调用交易中的转账金额。 | Same semantics | 
| 0x35 | CALLDATALOAD | 1 | 1 | 获取本次调用的参数数据。 | Same semantics | 
| 0x36 | CALLDATASIZE | 0 | 1 | 获取本次调用的参数数据大小。 | Same semantics | 
| 0x37 | CALLDATACOPY | 3 | 0 | 将调用参数数据拷贝到内存。 | Same semantics | 
| 0x38 | CODESIZE | 0 | 1 | 获取在当前环境中运行的代码的大小。 | Same semantics | 
| 0x39 | CODECOPY | 3 | 0 | 将当前环境中运行的代码拷贝到内存。 | Same semantics | 
| 0x3A | GASPRICE | - | - | - | 不提供，Vite交易不需要手续费。 |
| 0x3B | EXTCODESIZE | 1 | 1 | 获取一个账户的代码大小。 | Same semantics | 
| 0x3C | EXTCODECOPY | 4 | 0 | 将指定账户的代码拷贝到内存。 | Same semantics | 
| 0x3D | RETURNDATASIZE | 0 | 1 | 获取前一次调用返回的数据大小。 | Same semantics | 
| 0x3E | RETURNDATACOPY | 3 | 0 | 将前一次调用返回的数据拷贝到内存。 | Same semantics | 
| 0x3F | EXTCODEHASH | 1 | 1 | 获取指定账户的代码哈希。 | 不提供 |

## 40s：区块信息指令集
|  No.  | Mnemonic | POP | PUSH | Description | Differential with EVM |
|:------------:|:-----------:|:-----------:|:-----------:|:-----------:|:-----------:|
| 0x40 | BLOCKHASH | 1 | 1 | 获取一个区块的哈希。 | 语义不同。返回相应的快照块的哈希。 |  
| 0x41 | COINBASE | - | - | 获取所在区块挖矿受益人地址。 | 不提供 |
| 0x42 | TIMESTAMP | 0 | 1 | 获取所在区块的时间戳。 | 语义不同。返回交易引用的快照块的时间戳。 |
| 0x43 | HEIGHT | 0 | 1 | 返回所在区块编号。 | 语义不同，返回交易引用的快照块在快照链上的编号。 |  
| 0x44 | DIFFICULTY | - | - | 返回所在区块的难度。 | 不提供 |
| 0x45 | GASLIMIT | - | - | 返回所在区块的燃料限额。 | 不提供 |
| 0x46 | TOKENID | 0 | 1 | 获取交易的转账代币id | 新增 |

## 50s：栈、内存、存储、控制流操作指令集
|  No.  | Mnemonic | POP | PUSH | Description | Differential with EVM |
|:------------:|:-----------:|:-----------:|:-----------:|:-----------:|:-----------:|
| 0x50 | POP | 1 | 0 | 从栈顶弹出一条数据。 | Same semantics | 
| 0x51 | MLOAD | 1 | 1 | 从内存加载一个字。 | Same semantics | 
| 0x52 | MSTORE | 2 | 0 | 保存一个字到内存。 | Same semantics | 
| 0x53 | MSTORE8 | 2 | 0 | 保存一个字节到内存。 | Same semantics | 
| 0x54 | SLOAD | 1 | 1 | 从存储中加载一个字。 | Same semantics | 
| 0x55 | SSTORE | 2 | 0 | 保存一个字到存储。 | Same semantics | 
| 0x56 | JUMP | 1 | 0 | 跳转指令。 | Same semantics | 
| 0x57 | JUMPI | 2 | 0 | 条件跳转指令。 | Same semantics | 
| 0x58 | PC | 0 | 1 | 获取程序计数器的值。 | Same semantics | 
| 0x59 | MSIZE | 0 | 1 | 获取内存大小。 | Same semantics | 
| 0x5A | GAS | - | - | 获取可用燃料数 | 不提供 |
| 0x5B | JUMPDEST | 0 | 0 | 标注一个跳转目的地。 | Same semantics | 

## 60s和70s：压栈操作指令集
|  No.  | Mnemonic | POP | PUSH | Description | Differential with EVM |
|:------------:|:-----------:|:-----------:|:-----------:|:-----------:|:-----------:|
| 0x60 | PUSH1 | 0 | 1 | 将1字节对象压入栈顶。 | Same semantics | 
| 0x61 | PUSH2 | 0 | 1 | 将2字节对象压入栈顶。 | Same semantics | 
| ... | ... | ... | ... | ... | ... | 
| 0x7F | PUSH32 | 0 | 1 | 将32字节对象（整个字）压入栈顶。 | Same semantics | 

## 80s：复制操作指令集
|  No.  | Mnemonic | POP | PUSH | Description | Differential with EVM |
|:------------:|:-----------:|:-----------:|:-----------:|:-----------:|:-----------:|
| 0x80 | DUP1 | 1 | 2 | 复制栈中第1个对象，并压入栈顶。 | Same semantics | 
| 0x81 | DUP2 | 2 | 3 | 复制栈中第2个对象，并压入栈顶。 | Same semantics | 
| ... | ... | ... | ... | ... | ... | 
| 0x8F | DUP16 | 16 | 17 | 复制栈中第16个对象，并压入栈顶。 | Same semantics | 

## 90s：交换操作指令集
|  No.  | Mnemonic | POP | PUSH | Description | Differential with EVM |
|:------------:|:-----------:|:-----------:|:-----------:|:-----------:|:-----------:|
| 0x90 | SWAP1 | 2 | 2 | 交换栈中第1个和第2个对象。 | Same semantics | 
| 0x91 | SWAP2 | 3 | 3 | 交换栈中第1个和第3个对象。 | Same semantics | 
| ... | ... | ... | ... | ... | ... | 
| 0x9F | SWAP16 | 17 | 17 | 交换栈中第1个和第17个对象。 | Same semantics | 

## a0s：日志操作指令集
|  No.  | Mnemonic | POP | PUSH | Description | Differential with EVM |
|:------------:|:-----------:|:-----------:|:-----------:|:-----------:|:-----------:|
| 0xA0 | LOG0 | 2 | 0 | 扩展日志记录，不设主题。 | Same semantics | 
| 0xA1 | LOG1 | 3 | 0 | 扩展日志记录，1个主题。 | Same semantics | 
| ... | ... | ... | ... | ... | ... |
| 0xA4 | LOG4 | 6 | 0 | 扩展日志记录，4个主题。 | Same semantics | 

## f0s：系统操作指令集
|  No.  | Mnemonic | POP | PUSH | Description | Differential with EVM |
|:------------:|:-----------:|:-----------:|:-----------:|:-----------:|:-----------:|
| 0xF0 | CREATE | - | - | 创建一个新合约。 | 不提供 |
| 0xF1 | CALL | 5 | 0 | 调用另一个合约。 | 异步调用另一个合约，无返回值。 | 
| 0xF2 | CALLCODE | - | - | 调用另一个合约的代码，改变本账户状态。 | 不提供 |
| 0xF3 | RETURN | 2 | 0 | 停止执行并返回数据。 | Same semantics | 
| 0xF4 | DELEGATECALL | 6 | 1 | 同步调用另一个合约的代码，改变本账户状态，保留原始交易信息。 | 暂不提供 | 
| 0xFA | STATICCALL | - | - | 调用另一个合约，不允许改变状态。 | 不提供 |
| 0xFD | REVERT | 2 | 0 | 停止执行，恢复状态并返回数据。 | Same semantics | 
| 0xFF | SELFDESTRUCT | 1 | 0 | 停止执行，将合约设置为待删除，返回所有余额。 | 暂不提供 | 
