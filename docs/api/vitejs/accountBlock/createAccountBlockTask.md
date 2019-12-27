
# receiveAccountBlockTask

Recieve AccountBlock task (Start auto receiving transactions)

## Constructor

- **Constructor Parameters**
    * `__namedParameters: object`        
        - `address: Address` Address of current account, mandatory
        - `provider: ViteAPI` `ViteAPI` instance
        - `privateKey: Hex` privateKey

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
    // Don\'t have unrecieved accountBlocks, stop receiving-task
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
Start receiving accountBlocks

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
Stop receiving accountBlocks

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
