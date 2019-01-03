# walletAccount

## Constructor

- **constructor params**: 
    - __namedParameters: object
        * `client : Client` client Instance
        * `mnemonic : string` Mnemonic Words
        * `bits : number` Bits of Mnemonic Words default: 256
        * `addrNum : number` Current addresses
        * `lang : LangList` Language default: english
        * `pwd : string` Password of Mnemonic Words
    - config: object
        * `addrTotalNum : number` Total number of addresses default: 10
        * `addrStartInx : number` Index of the generated addresses index default: 0

## WalletAccount Instance

### Instance Properties

|  Name  | Type | Description |
|:------------:|:-----:|:-----:|
| addrList | Array: AddrObj | Address List |
| lang | LangList | Language |
| mnemonic | string | Mnemonic words |
| addrNum | number | Current addresses |
| addrStartInx | number | Index of the generating address |
| entropy | string | Entropy |
| addrTotalNum | number | Total number of generated addresses |
| id | string | Account ID |
| activeAccountList | Array: Account | Activated account list |
| pwd | string | Password of mnemonic words |

### Instance Methods
WalletAccount Instance Methods

#### activateAccount

- **Parameters** Fill out with one of any parameters
    * `address : string` Activate Address
    * `index : number` Activate Account Index
- **Return**:
    * `activeAccount : <Account>` Activated account

#### freezeAccount

- **Parameters** 
    * `activeAccount : <Account>` Account needs to be frozen

#### addAddr

- **Return**:
    * `addrObj : AddrObj` Newly-added address
