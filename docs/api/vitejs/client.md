---
sidebarDepth: 1
---
# Client Side

:::tip Created by
[cs](https://github.com/lovelycs)
[hurrytospring](https://github.com/hurrytospring)
:::

:::tip Abstract
Some built-in quick polymerization are included
:::

## Contructor
- **Constructor params**: 
`provider`:provider Instance

- **Example**
```javascript

import provider from '@vite/vitejs/dist/es5/provider/WS';
import { client } from '@vite/vitejs';

const WS_RPC = new provider("https://example.com");
const myClient = new Client(WS_RPC);

const block = myClient.buildinTxBlock.getAccountBlock.sync(...);

```
## buildinTxBlock
### cancelPledgeBlock(__namedParameters: object): Get revoke staked transaction block
- **Parameters**:
 __namedParameters：
* `accountAddress`: `string`  Staking Account
* `amount`: `string` Staking Amount
* `toAddress`: `string` Staking address
* `tokenId`: `string` Token ID

- **Return**:
* Promise<`accountBlock`>



### cancelRegisterBlock(__namedParameters: object) Construct cancel SBP registration block
- **Parameters**:
__namedParameters: object
* `Gid`: `string`
* `accountAddress`: `string`
* `nodeName`: `string`
* `tokenId`: `string`
* `Returns` `any`

- **Return**:
* Promise<`accountBlock`>

### cancelVoteBlock(__namedParameters: object): Construct cancel voting block
- **Parameters**:
__namedParameters: object
`Gid`: `string`
`accountAddress`: `string`
`tokenId`: `string`
- **Return**:
* Promise<`accountBlock`>


### getAccountBlock(__namedParameters: object): General construct block

- **Parameters**:
__namedParameters: object

`accountAddress`: any
`amount`: any
`blockType`: any
`data`: any
`fromBlockHash`: any
`message`: any
`toAddress`: any
`tokenId`: any
- **Return**:
* Promise<`accountBlock`>



### getBalance(addr: `string`): Get balance block
Parameters
`addr`: `string`
- **Return**:
* Promise<`accountBlock`>



### getBlocks(__namedParameters: object): any
Parameters
__namedParameters: object
`addr`: `string`
`index`: number
`pageCount`: number
- **Return**:
* Promise<`accountBlock`>



### pledgeBlock(__namedParameters: object) Construct staking TPS quota block
Parameters
__namedParameters: object
`accountAddress`: `string`
`amount`: `string`
`toAddress`: `string`
`tokenId`: `string`
- **Return**:
* Promise<`accountBlock`>



### receiveBlock(__namedParameters: object): Construct common receive block
Parameters
__namedParameters: object
`accountAddress`: `string`
`blockHash`: `string`
- **Return**:
* Promise<`accountBlock`>



### registerBlock(__namedParameters: object) Construct SBP registration block
Parameters
__namedParameters: object
`Gid`: `string`
`accountAddress`: `string`
`amount`: `string`
`nodeName`: `string`
`producerAddr`: `string`
`tokenId`: `string`
- **Return**:
* Promise<`accountBlock`>



### rewardBlock(__namedParameters: object)  ？？
Parameters
__namedParameters: object
`Gid`: `string`
`accountAddress`: `string`
`nodeName`: `string`
`rewardAddress`: `string`
`tokenId`: `string`
- **Return**:
* Promise<`accountBlock`>



### sendBlock(__namedParameters: object): Construct common sending block
Parameters
__namedParameters: object
`accountAddress`: `string`
`amount`: `string`
`message`: `string`
`toAddress`: `string`
`tokenId`: `string`
- **Return**:
* Promise<`accountBlock`>



### updateRegisterBlock(__namedParameters: object) Construct cancel SBP registration block
Parameters
__namedParameters: object
`Gid`: `string`
`accountAddress`: `string`
`nodeName`: `string`
`producerAddr`: `string`
`tokenId`: `string`
- **Return**:
* Promise<`accountBlock`>



### voteBlock(__namedParameters: object) Construct voting block
Parameters
__namedParameters: object
`Gid`: `string`
`accountAddress`: `string`
`nodeName`: `string`
`tokenId`: `string`
- **Return**:
* Promise<`accountBlock`>
