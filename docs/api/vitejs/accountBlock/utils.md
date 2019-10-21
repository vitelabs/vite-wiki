# utils

## Methods

### isValidAccountBlockBeforeHash
参数是否可以生成AccountBlock的hash

- **Parameters** 
    * `__namedParameters: Object`
        - `blockType: BlockType`
        - `address: Address`
        - `height: Uint64`
        - `previousHash: Hex`
        - `fee?: BigInt`
        - `amount?: BigInt`
        - `toAddress?: Address`
        - `tokenId?: TokenId`
        - `data?: Base64`
        - `sendBlockHash?: Hex`
        - `difficulty?: BigInt`
        - `nonce?: Base64`

- **Return**
    * `Boolean` 验证结果

- **Example**
```javascript
import { accountBlock } from '@vite/vitejs';

const { utils } = accountBlock;

utils.isValidAccountBlockBeforeHash({
    address: 'vite_553462bca137bac29f440e9af4ab2e2c1bb82493e41d2bc8b2',
    amount: '0',
    blockType: 2,
    data: 'pinFMQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB',
    fee: '0',
    hash: '156a47de8b5a690562278360e41e337ee4f1b4aa8d979f377beb0cc70f939032',
    height: '105',
    previousHash: '558c6873d27c903ec9067cf54432e9d16d9b31474adab165ad1f6cc392beeb8d',
    producer: 'vite_553462bca137bac29f440e9af4ab2e2c1bb82493e41d2bc8b2',
    toAddress: 'vite_0000000000000000000000000000000000000004d28108e76b',
    tokenId: 'tti_5649544520544f4b454e6e40'
});
```

### isValidAccountBlockBeforeSignature
参数是否可以生成AccountBlock的签名

- **Parameters** 
    * `__namedParameters: Object`
        - `blockType: BlockType`
        - `address: Address`
        - `height: Uint64`
        - `previousHash: Hex`
        - `hash: Hex`
        - `fee?: BigInt`
        - `amount?: BigInt`
        - `toAddress?: Address`
        - `tokenId?: TokenId`
        - `data?: Base64`
        - `sendBlockHash?: Hex`
        - `difficulty?: BigInt`
        - `nonce?: Base64`

- **Return**
    * `Boolean` 验证结果

### isValidAccountBlock
是否为一个完整、合法、可发送的AccountBlock

- **Parameters** 
    * `__namedParameters: Object`
        - `blockType: BlockType`
        - `address: Address`
        - `height: Uint64`
        - `previousHash: Hex`
        - `hash: Hex`
        - `signature: Base64`
        - `publicKey: Base64`
        - `fee?: BigInt`
        - `amount?: BigInt`
        - `toAddress?: Address`
        - `tokenId?: TokenId`
        - `data?: Base64`
        - `sendBlockHash?: Hex`
        - `difficulty?: BigInt`
        - `nonce?: Base64`

- **Return**
    * `Boolean` 验证结果

### getAccountBlockHash
获取AccountBlock的hash

- **Parameters**
    * `__namedParameters: object`
        `blockType: BlockType`
        `address: Address`
        `hash?: Hex`
        `height?: Uint64`
        `previousHash?: Hex`
        `fromAddress?: Address`
        `toAddress?: Address`
        `sendBlockHash?: Hex`
        `tokenId?: TokenId`
        `amount?: BigInt`
        `fee?: BigInt`
        `data?: Base64`
        `difficulty?: BigInt`
        `nonce?: Base64`
        `vmlogHash?: Hex`
        `triggeredSendBlockList?: AccountBlockType[]`

- **Return**
    * `Hex` AccountBlock的hash
 
- **Example**
```javascript
import { accountBlock } from '@vite/vitejs';

const { utils } = accountBlock;

const hash = utils.getAccountBlockHash({
    address: 'vite_ab24ef68b84e642c0ddca06beec81c9acb1977bbd7da27a87a',
    blockType: 2,
    previousHash: 'd517e8d4dc9c676876b72ad0cbb4c45890804aa438edd1f171ffc66276202a95',
    height: '2',
    tokenId: 'tti_5649544520544f4b454e6e40',
    toAddress: 'vite_13f1f8e230f2ffa1e030e664e525033ff995d6c2bb15af4cf9',
    amount: '1000000000000000000000000',
    hash: '9c3f2b59408aa6a5c76f6f30cab40085eb181d200d574a029323b0822f54eef1',
    signature: 'sGELMXeZ/ZTvwec5n2kvo2hz/i824QTadKHC35sQcdVhSAPS6+uzanfcjPqp7qaQFEEorTfFNnd90hgbJpSNCw==',
    publicKey: 'WHZinxslscE+WaIqrUjGu2scOvorgD4Q+DQOOcDBv4M='
});
```

### signAccountBlock
签名accountBlock

- **Parameters**
    * `__namedParameters: object` AccountBlock
        - `address: Address`
        - `blockType: BlockType`
        - `hash: Hex`
        - `height: Uint64`
        - `previousHash: Hex`
        - `toAddress?: Address`
        - `tokenId?: TokenId`
        - `amount?: BigInt`
        - `sendBlockHash?: Hex`
        - `data?: Base64`
        - `fee?: BigInt`
        - `difficulty?: BigInt`
        - `nonce?: Base64`
    * `Hex` privateKey 私钥
  
- **Return**
    * `Object`
        - `signature: Base64`
        - `publicKey: Base64`

- **Example**
```javascript
import { accountBlock } from '@vite/vitejs';

const { utils } = accountBlock;

const { signature, publicKey } = utils.signAccountBlock({
    accountAddress: 'vite_13f1f8e230f2ffa1e030e664e525033ff995d6c2bb15af4cf9',
    blockType: 4,
    prevHash: '6388daf1e34e9aa9000006f455737ec3d191c7cb7b0d79a882cb976200f55b68',
    height: '4',
    fromBlockHash: '6388daf1e34e9aa9000006f455737ec3d191c7cb7b0d79a882cb976200f55b68',
    nonce: 'Sg0sdhyaEus=',
    difficulty: '65534',
    hash: '23b9a085f0280eb5309f27094bd00420ba2e2c5b16ef98dc40b1c778820f31a7'
}, /** your privateKey */);
```

## 更多方法

### isRequestBlock
根据blockType判断, 是非为一个请求块

- **Parameters**
    * `BlockType`: blockType

- **Return**
    * `boolean`: 判断结果

- **Example**
```javascript
import { accountBlock } from '@vite/vitejs';

const { utils } = accountBlock;
utils.isRequestBlock(1);
```

### isResponseBlock
根据blockType判断, 是非为一个响应块

- **Parameters**
    * `BlockType`: blockType

- **Return**
    * `boolean`: 判断结果

- **Example**
```javascript
import { accountBlock } from '@vite/vitejs';

const { utils } = accountBlock;
utils.isResponseBlock(1);
```

### getCreateContractData
生成创建合约 (即 blockType 为1) 的 AccountBlock 的 data

- **Parameters**
    * `__namedParameters: object`
        - `responseLatency?: Uint8` 确认数
        - `quotaMultiplier?: Uint8` 配额翻倍数
        - `randomDegree?: Uint8` 随机数确认数
        - `code?: Hex` 合约代码
        - `abi?: Object | Array<Object>` Abi
        - `params?: string | Array<string | boolean>` Abi 参数

- **Return**
    * `Base64`: AccountBlock.data

- **Example**
```javascript
import { accountBlock } from '@vite/vitejs';

const { utils } = accountBlock;

const data = utils.getCreateContractData({
    'responseLatency': 2,
    'randomDegree': 1,
    'quotaMultiplier': 10,
    'code': '608060405234801561001057600080fd5b506101ca806100206000396000f3fe608060405260043610610041576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806380ae0ea114610046575b600080fd5b6100bd6004803603602081101561005c57600080fd5b810190808035906020019064010000000081111561007957600080fd5b82018360208201111561008b57600080fd5b803590602001918460208302840111640100000000831117156100ad57600080fd5b90919293919293905050506100bf565b005b60006002838390508115156100d057fe5b061415156100dd57600080fd5b600080905060008090505b8383905081101561018a576000848483818110151561010357fe5b9050602002013590506000858560018501818110151561011f57fe5b905060200201359050808401935080841015151561013c57600080fd5b600081111561017d578173ffffffffffffffffffffffffffffffffffffffff164669ffffffffffffffffffff168260405160405180820390838587f1505050505b50506002810190506100e8565b50348114151561019957600080fd5b50505056fea165627a7a723058203cef4a3f93b33e64e99e0f88f586121282084394f6d4b70f1030ca8c360b74620029',
    'params': ''
});
```

### getCallContractData
生成调用合约的 AccountBlock 的 data

- **Parameters**
    * `__namedParameters: object`
        - `abi: Object | Array<Object>`
        - `params?: any`
        - `methodName?: string`

- **Return**
    * `Base64`: AccountBlock.data

- **Example**
```javascript
import { accountBlock } from '@vite/vitejs';

const { utils } = accountBlock;

const params = [ '00000000000000000001', 'ss', 'vite_553462bca137bac29f440e9af4ab2e2c1bb82493e41d2bc8b2' ];
const abi = Contracts.RegisterSBP.abi;
const data = utils.getCallContractData({ params, abi });
```

### getTransactionType 
获取详细的交易类型

- **Parameters**
    * `__namedParameters: object`
        - `toAddress : HexAddr` ToAddress
        - `data : string` `accountBlock.data` 
        - `blockType : BlockType`

- **Return**
    * `txType : TxType`

- **Example**
```javascript
import { accountBlock } from '@vite/vitejs';

const { utils } = accountBlock;

const RevokeVoting = {
    blockType: 2,
    data: 'pinFMQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB',
    toAddress: 'vite_000000000000000000000000000000000000000270a48cc491'
};

const txType = utils.getTransactionType(RevokeVoting);
// txType === 'RevokeVoting'
```

### decodeAccountBlockByContract

- **Parameters**
    * `__namedParameters: object`
        - `accountBlock: AccountBlock`
        - `contractAddr: Address`
        - `abi: jsonInterface | Array<jsonInterface>`
        - `topics?: Array<hexString>`
        - `mehtodName?: string` 当第一个参数为jsonInterface数组时, 此参数必填(用于识别abi, 取出对应inputs)

- **Return**
    * `decodeResult`: 如果accountBlock不属于这个合约，return null

- **Example**
```javascript
import { accountblock, constant } from '@vite/vitejs';

const { utils } = accountBlock;

// Just Example
const SBPregAccountBlock = {
    accountAddress: 'vite_553462bca137bac29f440e9af4ab2e2c1bb82493e41d2bc8b2',
    blockType: 2,
    data: '8pxs4gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGAAAAAAAAAAAAAAAFU0YryhN7rCn0QOmvSrLiwbuCSTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACc3MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
    toAddress: 'vite_0000000000000000000000000000000000000004d28108e76b'
}

const decodeResult = utils.decodeAccountBlockByContract({
    accountBlock: SBPregAccountBlock,
    contractAddr: constant.Contracts.SBPreg.contractAddr,
    abi: constant.Contracts.SBPreg.abi
});

/** decodeResult like
    { 
        '0': '00000000000000000001',
        '1': 'ss',
        '2': 'vite_553462bca137bac29f440e9af4ab2e2c1bb82493e41d2bc8b2',
        gid: '00000000000000000001',
        name: 'ss',
        nodeAddr: 'vite_553462bca137bac29f440e9af4ab2e2c1bb82493e41d2bc8b2' 
    }
*/
```