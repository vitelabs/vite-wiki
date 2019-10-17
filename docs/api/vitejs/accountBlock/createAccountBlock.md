
# createAccountBlock

## 调用

- **Parameters** 
    * `methodName: String` [accountBlock 类型](#accountblock-类型)
    * `params: Object` accountBlock 类型对应的参数

- **Return**
    * AccountBlock实例

- **Example**
```javascript
import { accountBlock } from '@vite/vitejs';

const { createAccountBlock, utils } = accountBlock;

const accountBlock = createAccountBlock('receive', {
    address,
    sendBlockHash: data[0].hash
});

async function sendAccountBlock(accountBlock) {
    accountBlock.setProvider(viteProvider).setPrivateKey(privateKey);
    await accountBlock.autoSetPreviousAccountBlock();
    const result = await accountBlock.sign().send();
    console.log('send success', result);
}
```

## accountBlock 类型

### receive 
接收交易

- **Parameters** 
    * `__namedParameters: object`
        - `address: Address` 账户块所属的账户地址
        - `sendBlockHash: Hex` 接收的accountBlock的hash值

- **Return**
    * accountBlock实例

### send 
生成一个request accountBlock

- **Parameters** 
    * `__namedParameters: object`
        - `address: Address` 账户块所属的账户地址
        - `toAddress: Address` 发送给哪个地址
        - `tokenId: TokenId` Default Vite_TokenId
        - `amount: BigInt` Default '0' 金额（最小单位，比如 10vite = 10000000000000000000）
        - `data: Base64`

- **Return**
    * accountBlock实例

### sendTransaction 
发送交易

- **Parameters** 
    * `__namedParameters: object`
        - `address: Address` 账户块所属的账户地址
        - `toAddress: Address` 发送给哪个地址
        - `tokenId: TokenId` Default Vite_TokenId
        - `amount: BigInt` Default '0' 金额（最小单位，比如 10vite = 10000000000000000000）
        - `message: string` 备注（比如, '转账'）

- **Return**
    * accountBlock实例

### createContract 
创建合约

- **Parameters** 
    * `__namedParameters: object`
        - `address: Address` 账户块所属的账户地址
        - `code: Hex` 编译器编译出的合约代码
        - `responseLatency?: Uint8` Default '0' 确认数
        - `quotaMultiplier?: Uint8` Default '10' 配额翻倍数
        - `randomDegree?: Uint8` Default '0' 随机数确认数
        - `abi?: Object | Array<Object>` abi
        - `params?: string | Array<string | boolean>` abi构造函数的参数

- **Return**
    * accountBlock实例

### callContract 
调用合约

- **Parameters** 
    * `__namedParameters: object`
        - `address: Address` 账户块所属的账户地址
        - `toAddress: Address` 合约地址
        - `abi: Object | Array<Object>` 合约
        - `methodName?: string` 调用合约的名称 name
        - `params?: any` 合约入参
        - `tokenId?: TokenId` Default Vite_TokenId
        - `amount?: BigInt` Default '0'
        - `fee?: BigInt` Default '0'

- **Return**
    * accountBlock实例

### registerSBP 
注册超级节点

注册超级节点时需要转账100w `VITE`作为抵押，超级节点注册成功后7776000个快照块（大约3个月）后可以注销超级节点。

- **Parameters** 
    * `__namedParameters: object`
        - `address: Address` 账户块所属的账户地址
        - `sbpName: string` 超级节点名称
        - `blockProducingAddress: Address` 出块地址，建议将注册地址和出块地址分开

- **Return**
    * accountBlock实例

### updateSBPBlockProducingAddress 
更新超级节点出块地址

- **Parameters** 
    * `__namedParameters: object`
        - `address: Address` 账户块所属的账户地址
        - `sbpName: string` 超级节点名称
        - `newBlockProducingAddress: Address` 新的出块地址

- **Return**
    * accountBlock实例

### revokeSBP 
注销超级节点

- **Parameters** 
    * `__namedParameters: object`
        - `address: Address` 账户块所属的账户地址
        - `sbpName: string` 超级节点名称

- **Return**
    * accountBlock实例

### withdrawSBPReward 
提取出块奖励

- **Parameters** 
    * `__namedParameters: object`
        - `address: Address` 账户块所属的账户地址
        - `sbpName: string` 超级节点名称
        - `receiveAddress: Address` 奖励接收地址

- **Return**
    * accountBlock实例

### voteForSBP 
投票给超级节点

计票时用当时的账户余额作为投票数。同一个账户多次发起投票请求交易，后一次投票的结果会覆盖前一次投票的结果。

- **Parameters** 
    * `__namedParameters: object`
        - `address: Address` 账户块所属的账户地址
        - `sbpName: string` 超级节点名称

- **Return**
    * accountBlock实例

### cancelVote 
取消投票

- **Parameters** 
    * `__namedParameters: object`
        - `address: Address` 账户块所属的账户地址
        
- **Return**
    * accountBlock实例

### stakeForQuota 
抵押获取配额

- **Parameters** 
    * `__namedParameters: object`
        - `address: Address` 账户块所属的账户地址        
        - `beneficiaryAddress: Address` 配额受益地址
        - `amount: BigInt` 抵押多少vite, 至少134Vite; 金额（最小单位，比如 10vite = 10000000000000000000）

- **Return**
    * accountBlock实例

### cancelStake 
取消抵押

- **Parameters** 
    * `__namedParameters: object`
        - `address: Address` 账户块所属的账户地址        
        - `beneficiaryAddress: Address` 金额退回地址
        - `amount: Uint256` 取消金额，单次取消抵押的金额不低于 134 VITE; 剩余抵押金额不低于 134 VITE; 金额（最小单位，比如 10vite = 10000000000000000000）

- **Return**
    * accountBlock实例

### issueToken 
铸币

铸币请求会支付1000 `VITE`手续费。铸币成功后，铸币账户即为代币所有者，会收到一笔金额等于发行总量的在途交易。

- **Parameters** 
    * `__namedParameters: object`
        - `address: Address` 账户块所属的账户地址        
        - `tokenName: string` 代币名称，1 到 40 个字符，包含大小写字母、下划线、空格，不能以空格开头或结尾，不能包含连续空格
        - `tokenSymbol: string` 代币简称，1 到 10 个字符，包含大写字母、数字，不能使用 VITE 、 VCP 、 VX
        - `decimals: Uint8` 小数位数，$10^{decimals} \leq totalSupply$
        - `maxSupply: Uint256` 最大发行量，不可增发代币此字段值填0，可增发代币$totalSupply \leq maxSupply \leq 2^{256}-1$
        - `totalSupply: Uint256` 发行总量，$totalSupply \leq 2^{256}-1$
        - `isReIssuable: boolean` 是否可增发，true 可增发 false 不可增发
        - `isOwnerBurnOnly: boolean` 是否仅所有者可销毁，true 仅所有者可销毁 false 所有持币账户可销毁，不可增发代币此字段填false

- **Return**
    * accountBlock实例

### reIssueToken 
增发代币

可增发代币的所有者可以发起交易来增发代币

- **Parameters** 
    * `__namedParameters: object`
        - `address: Address` 账户块所属的账户地址        
        - `tokenId: TokenId`     
        - `amount: BigInd` 销毁金额，金额（最小单位，比如 10vite = 10000000000000000000）
        - `receiveAddress: Address` 增发代币的接收地址

- **Return**
    * accountBlock实例
    
### burnToken 
销毁代币

可增发代币可以销毁，销毁时将需要销毁的金额转账给铸币合约地址。不可增发代币不能销毁。

- **Parameters** 
    * `__namedParameters: object`
        - `address: Address` 账户块所属的账户地址        
        - `tokenId: TokenId`     
        - `amount: BigInd` 销毁金额，金额（最小单位，比如 10vite = 10000000000000000000）

- **Return**
    * accountBlock实例
       
### disableReIssueToken 
将可增发代币修改为不可增发代币

可增发代币的所有者可以将可增发代币修改为不可增发代币。

- **Parameters** 
    * `__namedParameters: object`
        - `address: Address` 账户块所属的账户地址        
        - `tokenId: TokenId`     

- **Return**
    * accountBlock实例 

### transferTokenOwnership 
转移可增发代币的所有权

可增发代币的所有者可以将代币所有权转移给其他账户。不可增发代币不能转移所有权。

- **Parameters** 
    * `__namedParameters: object`
        - `address: Address` 账户块所属的账户地址        
        - `tokenId`: `string tokenId` 代币id
        - `newOwnerAddress`: `string address` 新的所有者账户地址

- **Return**
    * accountBlock实例 

### transferTokenOwnership 
转移可增发代币的所有权

可增发代币的所有者可以将代币所有权转移给其他账户。不可增发代币不能转移所有权。

- **Parameters** 
    * `__namedParameters: object`
        - `address: Address` 账户块所属的账户地址        
        - `tokenId`: `string tokenId` 代币id
        - `newOwnerAddress`: `string address` 新的所有者账户地址

- **Return**
    * accountBlock实例 