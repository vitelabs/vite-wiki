# Error
常用错误类型

## 安装

:::demo
```bash tab:npm
npm install @vite/vitejs-error --save
```

```bash tab:yarn
yarn add @vite/vitejs-error
```
:::

## 引入

```javascript import
import { error } from '@vite/vitejs';
// Or
import * as error from '@vite/vitejs-error';
```

## 类型说明

| 属性 | code | 说明 |
|:-----:|:-------:|:--------:|
| no | 100000 | 未知错误 |
| paramsMissing | 100001 | 丢失参数 |
| paramsFormat | 100002 | 参数格式错误 |
| paramsConflict | 100003 | 参数冲突 |
| addressIllegal | 200001 | 地址不合法 |
| addressMissing | 200002 | 地址不存在 |
| requestTimeout | 300001 | 请求超时 |
