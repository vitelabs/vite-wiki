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
| 0x33 | CALLER | 0 | 1 |  Get caller address which is directly responsible for this execution | Same semantics | 
| 0x34 | CALLVALUE | 0 | 1 | Get transfer amount of called transaction | Same semantics | 
| 0x35 | CALLDATALOAD | 1 | 1 | Get input data of current call | Same semantics | 
| 0x36 | CALLDATASIZE | 0 | 1 | Get size of input data in current call | Same semantics | 
| 0x37 | CALLDATACOPY | 3 | 0 |  Copy input data in current call to memory | Same semantics | 
| 0x38 | CODESIZE | 0 | 1 |  Get size of code running in current environment | Same semantics | 
| 0x39 | CODECOPY | 3 | 0 |  Copy code running in current environment to memory | Same semantics | 
| 0x3A | GASPRICE | - | - | - | Not provided, Vite doesn't charge transaction fee |
| 0x3B | EXTCODESIZE | 1 | 1 | Get size of an account’s code | Same semantics | 
| 0x3C | EXTCODECOPY | 4 | 0 |  Copy a specific account’s code to memory | Same semantics | 
| 0x3D | RETURNDATASIZE | 0 | 1 | Get size of output data from the previous call | Same semantics | 
| 0x3E | RETURNDATACOPY | 3 | 0 | Copy output data from the previous call to memory | Same semantics | 
| 0x3F | EXTCODEHASH | 1 | 1 | Get the hash of an account’s code | Not provided |

## 40s：Block Information
|  No.  | Mnemonic | POP | PUSH | Description | Differential with EVM |
|:------------:|:-----------:|:-----------:|:-----------:|:-----------:|:-----------:|
| 0x40 | BLOCKHASH | 1 | 1 | Get the hash of one block | Different semantics. Return the hash of corresponding snapshot block |  
| 0x41 | COINBASE | - | - | Get the block's beneficiary address| Not provided |
| 0x42 | TIMESTAMP | 0 | 1 |  Get the block’s timestamp | Different semantics. Return the Tx referenced snapshot block's timestamp |
| 0x43 | HEIGHT | 0 | 1 | Get the block’s number | Different semantics. Return the Tx referenced snapshot block's number on snapshot chain |  
| 0x44 | DIFFICULTY | - | - | Get the block’s difficulty | Not provided |
| 0x45 | GASLIMIT | - | - | Get the block’s gas limit | Not provided |
| 0x46 | TOKENID | 0 | 1 | Get Tx's transfer token id | Additional |

## 50s：Stack, Memory, Storage and Flow Operations
|  No.  | Mnemonic | POP | PUSH | Description | Differential with EVM |
|:------------:|:-----------:|:-----------:|:-----------:|:-----------:|:-----------:|
| 0x50 | POP | 1 | 0 | Remove item from stack | Same semantics | 
| 0x51 | MLOAD | 1 | 1 | Load word from memory | Same semantics | 
| 0x52 | MSTORE | 2 | 0 | Save word to memory | Same semantics | 
| 0x53 | MSTORE8 | 2 | 0 | Save byte to memory | Same semantics | 
| 0x54 | SLOAD | 1 | 1 | Load word from storage | Same semantics | 
| 0x55 | SSTORE | 2 | 0 | Save word to storage | Same semantics | 
| 0x56 | JUMP | 1 | 0 | Alter the program counter | Same semantics | 
| 0x57 | JUMPI | 2 | 0 | Conditionally alter the program counter | Same semantics | 
| 0x58 | PC | 0 | 1 |  Get the value of the program counter | Same semantics | 
| 0x59 | MSIZE | 0 | 1 |  Get the size of active memory in bytes | Same semantics | 
| 0x5A | GAS | - | - | Get the amount of available gas | Not provided |
| 0x5B | JUMPDEST | 0 | 0 | Mark a valid destination for jump instructions | Same semantics | 

## 60s和70s：Push Operations
|  No.  | Mnemonic | POP | PUSH | Description | Differential with EVM |
|:------------:|:-----------:|:-----------:|:-----------:|:-----------:|:-----------:|
| 0x60 | PUSH1 | 0 | 1 | Place 1 byte item on stack | Same semantics | 
| 0x61 | PUSH2 | 0 | 1 | Place 2-byte item on stack | Same semantics | 
| ... | ... | ... | ... | ... | ... | 
| 0x7F | PUSH32 | 0 | 1 |  Place 32-byte (full word) item on stack | Same semantics | 

## 80s：: Duplication Operations
|  No.  | Mnemonic | POP | PUSH | Description | Differential with EVM |
|:------------:|:-----------:|:-----------:|:-----------:|:-----------:|:-----------:|
| 0x80 | DUP1 | 1 | 2 | Duplicate 1st stack item | Same semantics | 
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
