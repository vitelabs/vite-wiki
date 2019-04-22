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
        * `client : Client` client实例
        * `mnemonic? : string` 助记词
        * `bits? : number` 生成多少位的助记词 default: 256
        * `addrNum? : number` 现有多少个地址
        * `lang? : LangList` 语言 default: english
        * `pwd? : string` 助记词密码
    - config?: object
        * `addrTotalNum : number` 共可以生成多少个地址 default: 10
        * `addrStartInx : number` 生成地址的开始index default: 0

## HdAccount 实例

### Instance Properties

|  Name  | Type | Description |
|:------------:|:-----:|:-----:|
| addrList | Array: AddrObj | 地址列表 |
| lang | LangList | 语言 |
| mnemonic | string | 助记词 |
| addrNum | number | 现有多少个地址 |
| addrStartInx | number | 生成地址的开始index |
| entropy | string | 熵 |
| addrTotalNum | number | 共可以生成多少个地址 |
| id | string | 账户id |
| activeAccountList | Array: Account | 当前已激活的账户列表 |
| pwd | string | 助记词密码 |

### Instance Methods
HdAccount 实例方法

#### activateAccount

- **Parameters**
    __namedParameters: object 参数任填1个
    * `address : string` 激活哪个账户地址
    * `index : number` 激活哪个账户index
    __namedParameters: object
    * `intervals : number` 轮询间隔，default 2000
    * `receiveFailAction : function`: 接收交易失败处理函数，default null,
    * `duration : number`: 账户激活状态保持时长, default 5 * 60 * 1000。duration < 0 则永久有效，直到手动释放account
- **Return**:
    * `activeAccount : <Account>` 激活的账户

#### freezeAccount

- **Parameters** 
    * `activeAccount : <Account>` 需要冻结的账户

#### addAddr

- **Return**:
    * `addrObj : AddrObj` 新增的地址
