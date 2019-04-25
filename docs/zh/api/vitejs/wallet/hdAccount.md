# HdAccount

## 安装

:::demo
```bash tab:npm
npm install @vite/vitejs-hdaccount --save
```

```bash tab:yarn
yarn add @vite/vitejs-hdaccount
```
:::

## 引入

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
        - `client : Client` client实例
        - `mnemonic? : string` 助记词
        - `bits? : number` 生成多少位的助记词 Default 256
        - `addrNum? : number` 当前所需地址数量 Default 1
        - `lang? : LangList` 语言 Default english
        - `pwd? : string` 助记词密码
    * `config?: object` Default `{ maxAddrNum: 10, addrStartInx: 0 }`
        - `maxAddrNum : number` 最多可生成的地址数量 Default 10
        - `addrStartInx : number` 生成地址的开始index Default 0

- **Example**
```javascript
import WS_RPC from '@vite/vitejs-ws';
import { client, hdAccount, utils } from '@vite/vitejs';

let myClient = new client( new WS_RPC("ws://example.com") );

let myHdAccount = new hdAccount({ client: myClient });
myHdAccount.addAddr();
```

## Properties

|  Name  | Type | Description |
|:------------:|:-----:|:-----:|
| addrList | Array: AddrObj | 地址列表 |
| lang | LangList | 语言 |
| mnemonic | string | 助记词 |
| addrNum | number | 现有多少个地址 |
| addrStartInx | number | 生成地址的开始index |
| entropy | string | 熵 |
| maxAddrNum | number | 最多可生成地址数量  |
| id | string | 账户id |
| activeAccountList | Array: Account | 当前已激活的账户列表 |
| pwd | string | 助记词密码 |

## Methods

### activateAccount
激活包含于HdAccount中的某个账户，调用`Account.activate`

- **Parameters**
    * `__namedParameters: object` `address`和`index`参数任填1个
        - `address? : string` 激活哪个账户地址
        - `index? : number` 激活哪个账户index，Default 0
    * `__namedParameters: object`
        - `intervals : number` 轮询间隔，Default 2000ms
        - `duration : number`: 账户激活状态保持时长, Default 5 * 60 * 1000(ms)。duration < 0 则永久有效，直到手动释放account
        - `autoPow?: boolean` 发送交易是否默认运行PoW，Default false
        - `usePledgeQuota? : boolean` check是否运行PoW时，是否默认使用配额，Default true

- **Return**:
    * `activeAccount : Account` 已激活的账户实例

### freezeAccount
冻结账户，调用`Account.freeze`并释放`activeAccount`

- **Parameters** 
    * `activeAccount : Account` 需要冻结的账户

### getAccount
获取某个账户实例

- **Parameters**
    * `__namedParameters: object` `address`和`index`参数任填1个
        - `address? : string` 获取的账户地址
        - `index? : number` 获取的账户index，Default 0
        - `autoPow?: boolean` 发送交易是否默认运行PoW，Default false
        - `usePledgeQuota? : boolean` check是否运行PoW时，是否默认使用配额，Default true

- **Return**:
    * `account : Account` 账户实例

### addAddr

- **Return**:
    * `addrObj : AddrObj` 新增的地址
