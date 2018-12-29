# 开始

:::tip 作者
[cs](https://github.com/lovelycs)
:::

:::tip abstract
网络连接层使用RPC协议，可通过http，websocket或者ipc与gvite连接。
不同连接方式可以调用不同级别的接口（gvite wallet下的全部接口仅针对ipc连接开放)。
:::

## provider

### 实例属性

|  名称  | 类型 | 说明 |
|:------------:|:-----:|:-----:|
| type |  string | 网络传输协议类型 |
| timeout | number(ms) | 请求超时时间 |

### 实例方法

#### abort
打断当前连接的剩余请求，并将请求列表清空

#### request
发起request请求

- **params**: 

  * `methodName : string` 方法名
  * `params : any` 请求参数

- **Returns**:
    - Promise<`JsonRPC response`>

#### notification

- **params**: 

  * `methodName : string` 方法名
  * `params : any` 请求参数

#### batch

- **params**: 

  * `requests : array<object>` 
	- `type : string<request | notification | batch>` : 请求类型
    - `methodName : string`: 方法名
    - `params : any`: 请求参数

- **Returns**:
    - Promise<`JsonRPC response`>
