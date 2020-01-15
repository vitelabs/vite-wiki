---
sidebarDepth: 4
---

# WebSocket事件订阅

## 订阅快照块事件
```
WebSocketService ws = new WebSocketService();
ws.connect();
Vitej vitej = new Vitej(ws);
vitej.snapshotBlockFlowable().subscribe(msg -> {
    System.out.println("snapshotBlock: " + JSON.toJSONString(msg));
});
```

## 订阅账户块事件
```
WebSocketService ws = new WebSocketService();
ws.connect();
Vitej vitej = new Vitej(ws);
vitej.accountBlockFlowable().subscribe(msg -> {
    System.out.println("accountBlock: " + JSON.toJSONString(msg));
});
```

## 订阅指定账户的账户块事件
```
WebSocketService ws = new WebSocketService();
ws.connect();
Vitej vitej = new Vitej(ws);
vitej.accountBlockByAddressFlowable(new Address("vite_000000000000000000000000000000000000000595292d996d")).subscribe(msg -> {
    System.out.println("accountBlockByAddress: " + JSON.toJSONString(msg));
});
```

## 订阅待接收交易事件
```
WebSocketService ws = new WebSocketService();
ws.connect();
Vitej vitej = new Vitej(ws);
vitej.unreceivedBlockFlowable(new Address("vite_000000000000000000000000000000000000000595292d996d")).subscribe(msg -> {
    System.out.println("unreceivedBlock: " + JSON.toJSONString(msg));
});
```

## 订阅vmlog事件
```
WebSocketService ws = new WebSocketService();
ws.connect();
Vitej vitej = new Vitej(ws);
vitej.vmlogFlowable(new VmLogFilter(new Address("vite_000000000000000000000000000000000000000595292d996d"))).subscribe(msg -> {
    System.out.println("vmlog: " + JSON.toJSONString(msg));
});
```
