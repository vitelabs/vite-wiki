# 常量

:::作者
[hurrytospring](https://github.com/hurrytospring)
:::

:::abstract
与gvite连接的实现层，可以通过http，websocket，ipc与gvite连接。不同连接方式可以调用不同级别的接口。
:::

## http
{
        host = 'http://localhost:8415',
        headers={},
        timeout = 0
    }

## websocket
{
        url = 'ws://localhost:31420',
        protocol,
        headers,
        clientConfig,
        timeout = 0
    }

## ipc
{
        path = '',
        delimiter = '\n',
        timeout = 0
    }
