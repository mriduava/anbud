import React, {createContext, useState, useEffect } from 'react'

export const AuctionContext = createContext();

const AuctionContextProvider = (props) => {
  const [auctionItems, setAuctionItems] = useState([])

  const fetchAllAuctionItems = async () => {
    let auctions = await fetch('/rest/auctions')
    auctions = await auctions.json()
    setAuctionItems(auctions);
  };
  useEffect(()=>{
    fetchAllAuctionItems()
  }, [])

  const updateItemsState = (item) => {
    setAuctionItems([...auctionItems, item])
  }

  useEffect(()=>{
    updateItemsState()
  }, [auctionItems])

  const values = {
    auctionItems,
    fetchAllAuctionItems,
    updateItemsState
  }

  return (
    <AuctionContext.Provider value={values}>
      {props.children}
    </AuctionContext.Provider>
  )
}

export default AuctionContextProvider
