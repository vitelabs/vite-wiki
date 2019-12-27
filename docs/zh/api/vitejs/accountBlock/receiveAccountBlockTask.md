
# receiveAccountBlockTask

接收AccountBlock的任务（自动接收交易）

## Constructor

- **Constructor Parameters**
    * `__namedParameters: object`        
        - `address: Address` 必填，账户块所属的账户地址
        - `provider` 即`ViteAPI`实例
        - `privateKey: Hex` privateKey

- **Return**
    * receiveAccountBlockTask 实例

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
    // 当不存在未接收交易时，停止接收任务
    if (!result.accountBlockList) {
        ReceiveTask.stop();
    }
});
ReceiveTask.onError((error) => {
    console.log('error', error);
});
ReceiveTask.start({
    checkTime: 3000,
    transctionNumber: 10
});
```

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
