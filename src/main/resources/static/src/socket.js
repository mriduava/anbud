import {store} from './store.js'

let ws;
let isConnected = false;
connect();

function connect() {
    ws = new WebSocket('ws://localhost:9000/data-socket');
    
    ws.onmessage = (e) => {
        let dataWrapper;
        try {
            dataWrapper = JSON.parse(e.data)
        } catch {
            console.warn('Could not parse:', e.data);
            return
        }
    
        switch(dataWrapper.action) {
            case 'message':
                console.log('New message:', dataWrapper.payload);
                store.commit('prependMessage', dataWrapper.payload)
                break;
            case 'user-status':
                console.log('New status change:', dataWrapper.payload);
                break;
            default:
                console.log('Could not read action:', dataWrapper.action);
        }
    }

    ws.onopen = (e) => {
        send({
            action: 'connection',
            payload: 'user connected'
        });
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

function send(data) {
    ws.send(JSON.stringify(data));
}

function sendMessage(message) {
    send({
        action: 'message',
        payload: message
    })
}

export {
    send, 
    sendMessage
}