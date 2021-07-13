import {store} from './store.js'

let ws;
let isConnected = false;

const connect = () => {
    ws = new WebSocket('ws://localhost:9000/anbudsocket');
    
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
            case 'auction':
                console.log('New auction:', dataWrapper.payload);
                store.commit('prependAuction', dataWrapper.payload)
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

connect();

const disconnect = () => {
    if (ws != null) {
        ws.close();
    }
    isConnected = false;
    console.log("Disconnected");
}

const send = (data) => {
    ws.send(JSON.stringify(data));
}

const sendMessage = (message) => {
    send({
        action: 'message',
        payload: message
    })
}

const sendAuctionItem = (newitem) => {
    send({
        action: 'auction',
        payload: newitem
    })
}

export {
    send, 
    sendMessage,
    sendAuctionItem
}