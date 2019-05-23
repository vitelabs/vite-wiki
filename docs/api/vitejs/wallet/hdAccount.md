# HdAccount

## Installation

:::demo
```bash tab:npm
npm install @vite/vitejs-hdaccount --save
```

```bash tab:yarn
yarn add @vite/vitejs-hdaccount
```
:::

## Import

:::demo
```javascript tab:ES6
import { hdAccount } from '@vite/vitejs';
// Or
import hdAccount from '@vite/vitejs-hdaccount';
```

```javascript tab:require
const { hdAccount } = require('@vite/vitejs-hdaccount');
```
:::

## Constructor

- **constructor params**: 
    * `__namedParameters: object`
        - `client : Client` Client Instance
        - `mnemonic? : string` Mnemonic Words
        - `bits? : number` Bits of Mnemonic Words. Default 256
        - `addrNum? : number` Current addresses. Default 1
        - `lang? : LangList` Language. Default english
        - `pwd? : string` Password of Mnemonic Words
    * `config?: object` Default `{ maxAddrNum: 10, addrStartInx: 0 }`
        - `maxAddrNum : number` Max number of addresses. Default 10
        - `addrStartInx : number` Index of the generated addresses. Default 0

- **Example**
```javascript
import WS_RPC from '@vite/vitejs-ws';
import { client, hdAccount, utils, constant } from '@vite/vitejs';

let { Vite_TokenId } = constant;

let myClient = new client( new WS_RPC("ws://example.com") );
let myHdAccount = new hdAccount({ client: myClient });
myHdAccount.addAddr();

let firstAccount = myHdAccount.getAccount();

firstAccount.sendTx({
    toAddress: 'Your toAddress',    
    amount: '10000000000000000000',    // 10Vite + 18个0
    tokenId: Vite_TokenId
}).then((accountBlock) => {
    console.log(accountBlock);
}).catch((err) => {
    console.log(err);
});
```

## Properties

|  Name  | Type | Description |
|:------------:|:-----:|:-----:|
| addrList | Array: AddrObj | Address List |
| lang | LangList | Language |
| mnemonic | string | Mnemonic words |
| addrNum | number | Current addresses |
| addrStartInx | number | Index of the generating address |
| entropy | string | Entropy |
| maxAddrNum | number | Max number of generated addresses |
| id | string | Account ID |
| activeAccountList | Array: Account | Activated account list |
| pwd | string | Password of mnemonic words |

## Methods

### activateAccount
Activate an account in the hdAccount instance. Call `Account.activate`.

- **Parameters**
    * `__namedParameters: object` object Fill out with one of `{ address, index }`
        - `address? : string` Activate Address
        - `index? : number` Activate Account Index. Default 0
    * `__namedParameters: object`
        - `intervals : number` polling interval. Default 2000ms
        - `duration : number`: Account activate duration, Default 5 * 60 * 1000(ms)。If duration < 0, account is available permanently until clear account manually
        - `autoPow?: boolean` Whether to run PoW by default when sending a transaction without quota. Default false
        - `usePledgeQuota? : boolean` Whether the quota is used preferentially, when checking if you need to run pow. Default true

- **Return**:
    * `activeAccount : Account` Activated account

### freezeAccount
Freeze an account. Call `Account.freeze` and release `activeAccount`.

- **Parameters** 
    * `activeAccount : Account` Account needs to be frozen

### getAccount
Get an account instance

- **Parameters**
    * `__namedParameters: object` object Fill out with one of `{ address, index }`
        - `address? : string`
        - `index? : number` Account Index. Default 0
        - `autoPow?: boolean` Whether to run PoW by default when sending a transaction without quota. Default false
        - `usePledgeQuota? : boolean` Whether the quota is used preferentially, when checking if you need to run pow. Default true

- **Return**:
    * `account : Account` The account instance

### addAddr

- **Return**:
    * `addrObj : AddrObj` Newly-added address
