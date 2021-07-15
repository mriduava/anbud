import React, {useState, useEffect, useContext, createContext} from 'react'
import { AuctionContext } from './AuctionContextProvider'

export const SocketContext = createContext();

const SocketContextProvider = (props) => {
  const { updateItemsState } = useContext(AuctionContext)

  const [ws, setWs] = useState();
  const [isConnected, setIsConnected] = useState(false);
  const [dataWrapper, setDataWrapper] = useState()

  const send = (data) => {
    ws.send(JSON.stringify(data));
  }
  
  useEffect(()=>{
    const connect = () => {
    const ws = new WebSocket('ws://localhost:9000/anbudsocket');
    setWs(ws);
    
    ws.onmessage = (e) => {
      try {
        setDataWrapper(JSON.parse(e.data))
      } catch {
        console.warn('Could not parse:', e.data);
        return
      }

      switch(dataWrapper.action) {
        case 'auction':
          console.log('New auction:', dataWrapper.payload);
          updateItemsState(dataWrapper.payload)
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
      setIsConnected(true);
    };

    ws.onclose = (e) => {
      console.log("Closing websocket...");
    };
    console.log("Connecting...");
    }

    connect();
  }, [])

  const disconnect = () => {
    if (ws != null) {
        ws.close();
    }
    setIsConnected(false);
    console.log("Disconnected");
  }


  const sendAuctionItem = (newitem) => {
    send({
        action: 'auction',
        payload: newitem
    })
  }

  const values = {
    sendAuctionItem
  };

  return (
    <SocketContext.Provider value={values}>
      {props.children}
    </SocketContext.Provider>
  )
}

export default SocketContextProvider
