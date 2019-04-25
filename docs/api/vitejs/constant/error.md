# Error
Common Error Types

## Installation

:::demo
```bash tab:npm
npm install @vite/vitejs-error --save
```

```bash tab:yarn
yarn add @vite/vitejs-error
```
:::

## Import

```javascript import
import { error } from '@vite/vitejs';
// Or
import * as error from '@vite/vitejs-error';
```

## Type description

| property | code | description |
|:-----:|:-------:|:--------:|
| no | 100000 | Unknown Error |
| paramsMissing | 100001 | Missing Parameters |
| paramsFormat | 100002 | Wrong Format |
| paramsConflict | 100003 | Parameter Conflict |
| addressIllegal | 200001 | Illegal Address |
| addressMissing | 200002 | Address Not Existed |
| requestTimeout | 300001 | Request timeout |
