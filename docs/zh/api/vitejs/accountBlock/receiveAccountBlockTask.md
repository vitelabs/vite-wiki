
# receiveAccountBlockTask

接收AccountBlock的任务（自动接收交易）

## Constructor

- **Constructor Parameters**
    * `__namedParameters: object`        
        - `address: Address` 必填，账户块所属的账户地址
        - `provider` 即`ViteAPI`实例
        - `privateKey?: Hex` privateKey
        - `sign?: Function`<Badge text="v2.3.6"/>  签名时调用的函数，仅在`privateKey`不存在的时候起作用，该方法用于无法取到私钥，需要“远程”签名的时候，可以用这个方法。例如：使用硬件钱包。
        

- **Return**
    * receiveAccountBlockTask 实例

- **Example**

:::: tabs
::: tab privateKey
```javascript
import { accountBlock } from '@vite/vitejs';

const { ReceiveAccountBlockTask } = accountBlock;

const ReceiveTask = new ReceiveAccountBlockTask({
    address: 'your address',
    privateKey: 'your privateKey',
    provider: viteProvider,
});

ReceiveTask.onSuccess((result) => {
    console.log('success', result);
});
ReceiveTask.onError((error) => {
    console.log('error', error);
});
ReceiveTask.start({
    checkTime: 3000,
    transctionNumber: 10
});
```
:::

::: tab sign
```javascript
import { accountBlock } from '@vite/vitejs';

const { ReceiveAccountBlockTask } = accountBlock;


const signWithHardWallet = async () => {
    let signature = '';
    // Sign with hard wallet, and return signature

    return signature;
}

const ReceiveTask = new ReceiveAccountBlockTask({
    address: 'your address',
    provider: viteProvider,
    sign: async (_accountBlock) => {
        let signature = await signWithHardWallet();
        // Set publicKey if not
        _accountBlock.setPublicKey(this.publicKey);
        // Set signature, this is required
        _accountBlock.setSignature(signature);
    }
});

ReceiveTask.onSuccess((result) => {
    console.log('success', result);
});
ReceiveTask.onError((error) => {
    console.log('error', error);
});
ReceiveTask.start({
    checkTime: 3000,
    transctionNumber: 10
});
```
:::

::::

## Methods

### start
开始接收accountBlock任务

- **Parameters** 
    * `__namedParameters: object`
        - `checkTime?: number` 定时检测是否有交易未接收 Default 3000(ms)
        - `transctionNumber?: number` 一次性接收交易数量 Default 5

- **Example**
```javascript
import { accountBlock } from '@vite/vitejs';

const { ReceiveAccountBlockTask } = accountBlock;

const ReceiveTask = new ReceiveAccountBlockTask({
    address: 'your address',
    privateKey: 'your privateKey',
    provider: viteProvider,
});

ReceiveTask.start({
    checkTime: 3000,
    transctionNumber: 10
});
```

### stop
停止接收accountBlock任务

- **Example**
```javascript
import { accountBlock } from '@vite/vitejs';

const { ReceiveAccountBlockTask } = accountBlock;

const ReceiveTask = new ReceiveAccountBlockTask({
    address: 'your address',
    privateKey: 'your privateKey',
    provider: viteProvider,
});

ReceiveTask.start({
    checkTime: 3000,
    transctionNumber: 10
});
ReceiveTask.stop();
```

### onError
监听error

- **Parameters** 
    * `errorCB: Function` 每次接收失败时触发失败事件, errorCB(`<error>`)

- **error** 返回的error信息
    - `status: 'error'`
    - `message: string` 错误信息描述
    - `timestamp: number` 当前时间戳
    - `unreceivedHash?: Hex` 未接收成功的accountBlock hash
    - `error: any` RPC接口的报错信息, 可参照RPC接口的错误信息格式

- **Example**
```javascript
import { accountBlock } from '@vite/vitejs';

const { ReceiveAccountBlockTask } = accountBlock;

const ReceiveTask = new ReceiveAccountBlockTask({
    address: 'your address',
    privateKey: 'your privateKey',
    provider: viteProvider,
});

ReceiveTask.onError((error) => {
    console.log('error', error);
});
ReceiveTask.start({
    checkTime: 3000,
    transctionNumber: 10
});
```

### onSuccess
监听success

- **Parameters** 
    * `successCB: Function` 每次接收成功时触发成功事件, successCB(`<success>`)

- **success** 返回的成功信息
    - `status: 'ok'`
    - `message: string` 成功信息描述
    - `timestamp: number` 当前时间戳
    - `accountBlockList?: AccountBlock[]` 接收成功的accountBlockList

- **Example**
```javascript
import { accountBlock } from '@vite/vitejs';

const { ReceiveAccountBlockTask } = accountBlock;

const ReceiveTask = new ReceiveAccountBlockTask({
    address: 'your address',
    privateKey: 'your privateKey',
    provider: viteProvider,
});

ReceiveTask.onSuccess((result) => {
    console.log('success', result);
});
ReceiveTask.start({
    checkTime: 3000,
    transctionNumber: 10
});
```
