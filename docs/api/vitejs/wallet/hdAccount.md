# hdAccount

:::tip abstract
@vite/vitejs-hdaccount
:::

```javascript

import provider from '@vite/vitejs-ws';
import { client, hdAccount, utils } from '@vite/vitejs';

let WS_RPC = new provider("ws://example.com");
let myClient = new client(WS_RPC);

let _hdAccount = new hdAccount({
    client: myClient
}, {
    addrTotalNum: 10
});
_hdAccount.addAddr();

```

## Constructor

- **constructor params**: 
    - __namedParameters: object
        * `client : Client` client Instance
        * `mnemonic? : string` Mnemonic Words
        * `bits? : number` Bits of Mnemonic Words default: 256
        * `addrNum? : number` Current addresses
        * `lang? : LangList` Language default: english
        * `pwd? : string` Password of Mnemonic Words
    - config?: object
        * `addrTotalNum : number` Total number of addresses default: 10
        * `addrStartInx : number` Index of the generated addresses index default: 0

## HdAccount Instance

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
HdAccount Instance Methods

#### activateAccount

- **Parameters** 
    __namedParameters: object Fill out with one of any parameters
    * `address : string` Activate Address
    * `index : number` Activate Account Index
    __namedParameters: object
    * `intervals : number` polling interval, default is 2000
    * `receiveFailAction : function`: receive transaction failed function, default is null
    * `duration : number`: Account activate duration, default is 5 * 60 * 1000. If duration < 0, account is available permanently until clear account manually
- **Return**:
    * `activeAccount : <Account>` Activated account

#### freezeAccount

- **Parameters** 
    * `activeAccount : <Account>` Account needs to be frozen

#### addAddr

- **Return**:
    * `addrObj : AddrObj` Newly-added address
