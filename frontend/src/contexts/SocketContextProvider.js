import React, {useState, useEffect, useContext, createContext} from 'react'
import { AuctionContext } from './AuctionContextProvider'

export const SocketContext = createContext();

const SocketContextProvider = (props) => {
  const { updateBids, fetchAllBids } = useContext(AuctionContext)

  const [ws, setWs] = useState();
  const [isConnected, setIsConnected] = useState(false);
  
  useEffect(()=>{
    const connect = () => {
      const ws = new WebSocket('ws://localhost:9000/anbud-socket');
      setWs(ws)
      let dataWrapper;
      ws.onmessage = (e) => {
        try {
          dataWrapper = JSON.parse(e.data)
        } catch {
          console.warn('Could not parse:', e);
          return
        }
    
        switch(dataWrapper.action) {
          case 'bid':
            updateBids([dataWrapper.payload])
            break;
          case 'user-status':
              console.log('New status change:', dataWrapper.payload);
              break;
          default:
              console.log('Could not read action:', dataWrapper.action);
        }
      }

      ws.onopen = (e) => {
        ws.send(JSON.stringify({
          action: 'connection',
          payload: 'user connected'
        }));
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

  const send = (data) => {
    ws.send(JSON.stringify(data));
  }

  const sendBidData = (newBid) => {
    send({
        action: 'bid',
        payload: newBid
    })
  }

  const values = {
    sendBidData
  };

  return (
    <SocketContext.Provider value={values}>
      {props.children}
    </SocketContext.Provider>
  )
}

export default SocketContextProvider
