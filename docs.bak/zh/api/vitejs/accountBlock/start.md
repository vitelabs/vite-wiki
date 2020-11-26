# 开始

## 什么是AccountBlock

Vite 采用 DAG 账本结构，每个账户对应一条链（可以理解为此账户的账本），这条链就是由多个AccountBlock串联形成。

当A账户发送一笔交易给B账户，就是A账户在自己的账户链上形成一个toAddress为B账户的AccountBlock，并得到确认的过程。

所以AccountBlock必须包含两部分信息
1. 发送给谁，发送多少
2. 上一个账户块的hash（以此顺序得到一条链，达到账本记录的目的）

## 介绍
accountBlock类库则集成了
1. 生成各类型交易的accountBlock方法；详见[createAccountBlock](./createAccountBlock.md)
2. 如何补充AccountBlock信息，以及如何发送一个AccountBlock；详见[accountBlock类](./accountBlock.md)
3. 相关功能函数；详见[utils](./utils.md)

## 引入

:::demo

```javascript tab:ES6
import { accountBlock } from '@vite/vitejs';

const { createAccountBlock, utils, AccountBlock } = accountBlock;
```

```javascript tab:require
const { accountBlock } = require('@vite/vitejs');

const { createAccountBlock, utils, AccountBlock } = accountBlock;
```

:::demo