let ws;
let isConnected = false;
connect();

function connect() {
    ws = new WebSocket('ws://localhost:9000/data-socket');
    ws.onmessage = (e) => {
      showSomething(e.data);
    }
    ws.onopen = (e) => {
        sendSomething();
        isConnected = true;
    };

    ws.onclose = (e) => {
        console.log("Closing websocket...");
    };

  console.log("Connecting...");
}

function disconnect() {
    if (ws != null) {
        ws.close();
    }
    isConnected = false;
    console.log("Disconnected");
}

function sendSomething() {
    ws.send(JSON.stringify({firstname: "Hello World!" }));
}

function showSomething(message) {
    console.log(message);
}