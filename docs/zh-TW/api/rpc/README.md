---
sidebarDepth: '4'
title: 開始
---

# 開始

## 說明

- **IPC方式** ：支持所有API調用

    1. ***nix(linux darwin)** : `Unix domain Socket`文件名稱`$HOME/viteisbest/vite.ipc`

    2. **Windows** : Named Pipe受限於Windows的規範文件名就是`\.\pipe\vite.ipc`

- **Http** ：僅支持公共API(非wallet模塊)默認端口**48132**

- **WebSocket** ：僅支持公共API(非wallet模塊)默認端口**31420**

- **不足** :

    1. 暫時不支持發布訂閱模式，後續會支持；

    2. 項目迭代很快，目前的API在之後版本中會很大改變。

- **注意** :

    1. 盡量使用標準的***Json rpc2***的庫
    2. 術語交易（transaction 或者Tx） = account block

## 常見業務錯誤匯總

描述 | code | message | example
--- | --- | --- | ---
餘額不足 | `-35001` | The balance is not enough. | {"code":-35001,"message":"The balance is not enough."}
密碼錯誤 | `-34001` | error decrypting key | {"code":-34001,"message":"error decrypting key"}
賬戶重複解鎖 | `-34002` | the address was previously unlocked | {"code":-34002,"message":"the address was previously unlocked"}

## JSON-RPC Support

JSON-RPC 2.0 | HTTP | IPC | Publish–subscribe | Websocket
--- | --- | --- | --- | ---
✓ | ✓ | ✓ | waiting | ✓
