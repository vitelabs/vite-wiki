---
sidebarDepth: 4
---

# Subscription API

You must enable WebSocket service (default port 41420) on the node in order to use subscription API. 

## Listen to New Snapshot Block
```java
WebSocketService ws = new WebSocketService();
ws.connect();
Vitej vitej = new Vitej(ws);
vitej.snapshotBlockFlowable().subscribe(msg -> {
    System.out.println("snapshotBlock: " + JSON.toJSONString(msg));
});
```

## Listen to New Account Block
```java
WebSocketService ws = new WebSocketService();
ws.connect();
Vitej vitej = new Vitej(ws);
vitej.accountBlockFlowable().subscribe(msg -> {
    System.out.println("accountBlock: " + JSON.toJSONString(msg));
});
```

## Listen to New Account Block (by address)
```java
WebSocketService ws = new WebSocketService();
ws.connect();
Vitej vitej = new Vitej(ws);
vitej.accountBlockByAddressFlowable(new Address("vite_000000000000000000000000000000000000000595292d996d")).subscribe(msg -> {
    System.out.println("accountBlockByAddress: " + JSON.toJSONString(msg));
});
```

## Listen to New Unreceived Transaction
```java
WebSocketService ws = new WebSocketService();
ws.connect();
Vitej vitej = new Vitej(ws);
vitej.unreceivedBlockFlowable(new Address("vite_000000000000000000000000000000000000000595292d996d")).subscribe(msg -> {
    System.out.println("unreceivedBlock: " + JSON.toJSONString(msg));
});
```

## Listen to New Smart Contract Event 
```java
WebSocketService ws = new WebSocketService();
ws.connect();
Vitej vitej = new Vitej(ws);
vitej.vmlogFlowable(new VmLogFilter(new Address("vite_000000000000000000000000000000000000000595292d996d"))).subscribe(msg -> {
    System.out.println("vmlog: " + JSON.toJSONString(msg));
});
```
