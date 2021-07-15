import React, {createContext, useState, useEffect } from 'react'

export const AuctionContext = createContext();

const AuctionContextProvider = (props) => {
  const [auctionItems, setAuctionItems] = useState()

  useEffect(()=>{
    const fetchAllAuctionItems = async () => {
      let auctions = await fetch('/rest/auctions')
      auctions = await auctions.json()
      setAuctionItems(auctions);
      console.log(auctionItems);
    };
    fetchAllAuctionItems()
  }, [])

  const values = {
    auctionItems
  }

  return (
    <AuctionContext.Provider value={values}>
      {props.children}
    </AuctionContext.Provider>
  )
}

export default AuctionContextProvider
