# abi

:::tip abstract
@vitejs/vitejs-abi
:::

```javascript import
import { abi } from '@vite/vitejs';

// Or
import * as abi from '@vite/vitejs-abi';
```

:::tip
Introduction of contract methods and parameter type.
Contract methods (including constructors, asynchronous invoke, offline reading) are able to contain multiple parameters, in addition，offline reading api can contain more than one return values. Currently the parameter types beneath could be supported:
:::

| Param Type | Name | Instance | Before Encode | After Encode |
|:------------:|:-----------:|:-----------:|:-----------:|:-----------:|
| `uint<M>` | Unsigned integer, 0 < M <= 256，M % 8 == 0 | uint256 | '2345675643' | '000000000000000000000000000000000000000000000000000000008bd02b7b' |
| `int<M>` | Signed integer, 0 < M <= 256，M % 8 == 0 | int8 | '2' | '0000000000000000000000000000000000000000000000000000000000000002' |
| `uint` | Equivalent to uint256 | uint | '2345675643' | '000000000000000000000000000000000000000000000000000000008bd02b7b' |
| `int` | Equivalent to int256 | int | '2' | '0000000000000000000000000000000000000000000000000000000000000002' |
| `tokenId` | Token id | tokenId | 'tti_5649544520544f4b454e6e40' | '000000000000000000000000000000000000000000005649544520544f4b454e' |
| `address` | Account address | address | 'vite_010000000000000000000000000000000000000063bef3da00' | '0000000000000000000000000100000000000000000000000000000000000000' |
| `gid` | Delegated consensus group id | gid | '01000000000000000000' | '0000000000000000000000000000000000000000000001000000000000000000' |
| `bool` | Bool | bool | true | '0000000000000000000000000000000000000000000000000000000000000001' |
| `bytes<M>` | Immutable array of bytes, 0 < M <= 32 | bytes32 | '0x0100000000000000000000000000000000000000000000000000000000000000' | '0100000000000000000000000000000000000000000000000000000000000000' |
| `bytes` | Non-immutable array of bytes | bytes | '0xdf3234' | '00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000003df32340000000000000000000000000000000000000000000000000000000000' | 
| `string` | Non-immutable string | string | 'foobar' | '0000000000000000000000000000000000000000000000000000000000000006666f6f6261720000000000000000000000000000000000000000000000000000' |
| `<type>[M]` | Non-immutable array with 'type' mode, M >= 0，the value rage of type:`uint<M>`、`int<M>`、`uint`、`int`、`tokenId`、`address`、`gid`、`bool`、`string` | uint8[2] | ['1','2'] | '00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002' |
| `<type>[]` | Non-immutable array with 'type' mode, the value rage of type:`uint<M>`、`int<M>`、`uint`、`int`、`tokenId`、`address`、`gid`、`bool`、`string` | uint256[] | ['1','2'] | '000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002' |

- **Example jsonInterface**

```json ::Demo
{
    "type": "event",
    "name": "methodName",
    "inputs": [
        { "name": "input1", "type": "address" }
    ]
}
```

## encodeLogSignature

- **params**
  - `jsonInterface | Array<jsonInterface>`
  - `methodName?` This parameter is required when type of the first parameter is array (Used to identify abi)
- **return**
  - `hexString`

```js ::Demo
let encodeLogSignatureResult1 = abi.encodeLogSignature({
    'type': 'event',
    'name': 'balance',
    'inputs': [{'name':'in','type':'uint256'}]
});
// 8a3390b86e28f274e3a88354b3b83cf0f8780a1f0975f629966bd2a2d38eb188

let encodeLogSignatureResult22 = abi.encodeLogSignature([
    {'type':'event','name':'heck','inputs':[{'name':'t','type':'address'}]},
    {'type':'event','name':'check','inputs':[{'name':'t','type':'address'},{'name':'b','type':'uint256'}]},
    {'type':'event','name':'eck','inputs':[]},
], 'check');
// 17c53855485cba60b5dea781a996394bb9d3b44bc8932b3adf79ac70e908b220
```    

## encodeFunctionSignature

- **params**
  - `jsonInterface | Array<jsonInterface>`
  - `methodName?` This parameter is required when type of the first parameter is array (Used to identify abi)
- **return**
  - `hexString`

```js ::Demo
let encodeMethodResult1 = abi.encodeFunctionSignature({
    'type': 'function',
    'name': 'singleParam',
    'inputs': [{'name':'param1','type':'address'}]
}); 
// 053f71a4
```  

## encodeFunctionCall

- **params**
  - `jsonInterface | Array<jsonInterface>`
  - `params`
  - `methodName?` This parameter is required when type of the first parameter is array (Used to identify abi)
- **return**
  - `hexString`

```js ::Demo
let result = abi.encodeFunctionCall({
    name: 'myMethod',
    type: 'function',
    inputs: [{
        type: 'uint256',
        name: 'myNumber'
    },{
        type: 'string',
        name: 'myString'
    }]
}, ['2345675643', 'Hello!%']);
// 96173f6c000000000000000000000000000000000000000000000000000000008bd02b7b0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000748656c6c6f212500000000000000000000000000000000000000000000000000

let result1 = abi.encodeFunctionCall([{
    name: 'myMethod',
    type: 'function',
    inputs: [{
        type: 'uint256',
        name: 'myNumber'
    },{
        type: 'string',
        name: 'myString'
    }]
}, {
    name: 'myethod',
    type: 'function',
    inputs: [{
        type: 'uint256',
        name: 'myNumber'
    },{
        type: 'string',
        name: 'myString'
    }]
}], ['2345675643', 'Hello!%'], 'myMethod');
// 96173f6c000000000000000000000000000000000000000000000000000000008bd02b7b0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000748656c6c6f212500000000000000000000000000000000000000000000000000
```  

## encodeParameter

- **params**
  - `type`
  - `params` The second parameter should pass an array type when the first parameter is an array (Both parameters should be consistent)
- **return**
  - `hexString`

```js ::Demo
let _r = abi.encodeParameter('uint256', '2345675643');
// 000000000000000000000000000000000000000000000000000000008bd02b7b

let encodeParameterResult4 = abi.encodeParameter('uint16[]', [1,2]);
// 000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002
```  

## decodeParameter

- **params**
  - `type`
  - `hexString`
- **return**
  - `decodeResult`

```js ::Demo
let _r = abi.decodeParameter('uint256', '000000000000000000000000000000000000000000000000000000008bd02b7b');
// 2345675643

let encodeParameterResult2 = abi.decodeParameter('uint8[]', '000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002');
// ['1','2']
```  

## encodeParameters

- **params**
  - `jsonInterface | Array<type-string> | Array<jsonInterface>`
  - `params`
  - `methodName?` This parameter is required when type of the first parameter is array (Used to identify abi and get corresponding types)
- **return**
  - `hexString`

```js ::Demo
let encodeParametersResult1 = abi.encodeParameters({'type':'constructor','inputs':[
    {'type':'uint8[]'}, {'type': 'bytes'}
]}, [['34','43'], '324567ff']);
// 000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000022000000000000000000000000000000000000000000000000000000000000002b0000000000000000000000000000000000000000000000000000000000000004324567ff00000000000000000000000000000000000000000000000000000000

let encodeParametersResult4 = abi.encodeParameters(['tokenId','address'], ['tti_01000000000000000000fb5e', 'vite_010000000000000000000000000000000000000063bef3da00']);
// 00000000000000000000000000000000000000000000010000000000000000000000000000000000000000000100000000000000000000000000000000000000

let encodeParametersResult12 = abi.encodeParameters([
    {'type':'constructor', 'name': 'myMethods', 'inputs':[{'type':'uint8[]'}, {'type': 'bytes'}]},
    {'type':'constructor', 'name': 'myMetod', 'inputs':[{'type': 'bytes'}]},
    {'type':'constructor', 'name': 'myMethowed', 'inputs':[{'type':'uint8[]'}, {'type': 'bytes'}]},
    {'type':'constructor', 'name': 'myMethossssd', 'inputs':[{'type': 'bytes'}]}
], [['34','43'], '324567ff'], 'myMethowed');
// 000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000022000000000000000000000000000000000000000000000000000000000000002b0000000000000000000000000000000000000000000000000000000000000004324567ff00000000000000000000000000000000000000000000000000000000

```  

## decodeParameters

- **params**
  - `jsonInterface | Array<type-string> | Array<jsonInterface>`
  - `hexString`
  - `methodName?` This parameter is required when type of the first parameter is array (Used to identify abi and get corresponding types)
- **return**
  - `decodeResult`

```js ::Demo
let decodeParametersResult1 = abi.decodeParameters({'type':'constructor','inputs':[
    {'type':'uint8[]'}, {'type': 'bytes'}
]}, '000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000022000000000000000000000000000000000000000000000000000000000000002b0000000000000000000000000000000000000000000000000000000000000004324567ff00000000000000000000000000000000000000000000000000000000');
// [['34','43'], '324567ff']

let decodeParametersResult5 = abi.decodeParameters(['string', 'tokenId','address'], '000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000f343832393438326e73646b6a736b640000000000000000000000000000000000');
// ['4829482nsdkjskd', 'tti_01000000000000000000fb5e', 'vite_010000000000000000000000000000000000000063bef3da00']

let decodeParametersResult22 = abi.decodeParameters([
    {'type':'function','name':'singl','inputs':[{'name':'param1','type':'address'}]},
    {'type':'function','name':'singleParam','inputs':[
        {'name':'param1','type':'address'},
        {'name':'param1','type':'uint8[]'}
    ]}
], '00000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002', 'singleParam');
// ['vite_010000000000000000000000000000000000000063bef3da00', [1,2]]
```  

## decodeLog

- **params**
  - `jsonInterface.inputs | jsonInterface | Array<jsonInterface>`
  - `hexString`
  - `methodName?` This parameter is required when type of the first parameter is JsonInterface (Used to identify abi and get corresponding inputs)
- **return**
  - `decodeResult`

```js ::Demo
let decodeResult2 = abi.decodeLog(
    [
        {'indexed':true,'name':'from','type':'address'},
        {'indexed':true,'name':'to','type':'address'},
        {'indexed':false,'name':'value','type':'uint256'}
    ], 
    '00000000000000000000000000000000000000000000000000000000000f4240',
    ['0000000000000000000000000100000000000000000000000000000000000000', '0000000000000000000000000200000000000000000000000000000000000000']
);
// {
//     '0': 'vite_010000000000000000000000000000000000000063bef3da00',
//     '1': 'vite_0200000000000000000000000000000000000000e4194eedc2',
//     '2': '1000000',
//     from: 'vite_010000000000000000000000000000000000000063bef3da00',
//     to: 'vite_0200000000000000000000000000000000000000e4194eedc2',
//     value: '1000000'
// }

let decodeResult222 = abi.decodeLog([
    { 
        'type':'constructor',
        'name': '89xxx',
        'inputs':[{type:'string',name:'myString'}]
    },
    { 'name': '232', 'inputs':[] },
    { 
        'type':'constructor',
        'name': 'xxxxx',
        'inputs':[
            {type:'string',name:'myString'},
            {type:'uint256',name:'myNumber',indexed: true},
            {type: 'uint8',name: 'mySmallNumber',indexed: true}
        ]
    }
], 
'0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000748656c6c6f252100000000000000000000000000000000000000000000000000',
['000000000000000000000000000000000000000000000000000000000000f310', '0000000000000000000000000000000000000000000000000000000000000010'], 'xxxxx');
// {
//     '0': 'Hello%!',
//     '1': '62224',
//     '2': '16',
//     myString: 'Hello%!',
//     myNumber: '62224',
//     mySmallNumber: '16'
// }

let decodeResult1 = abi.decodeLog({'type':'constructor','inputs':[
    {type:'string',name:'myString'},
    {type:'uint256',name:'myNumber',indexed: true},
    {type: 'uint8',name: 'mySmallNumber',indexed: true}
]}, 
'0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000748656c6c6f252100000000000000000000000000000000000000000000000000',
['000000000000000000000000000000000000000000000000000000000000f310', '0000000000000000000000000000000000000000000000000000000000000010']);
// {
//     '0': 'Hello%!',
//     '1': '62224',
//     '2': '16',
//     myString: 'Hello%!',
//     myNumber: '62224',
//     mySmallNumber: '16'
// }
```  
