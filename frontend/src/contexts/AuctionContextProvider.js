import React, {createContext, useState, useEffect } from 'react'

export const AuctionContext = createContext();

const AuctionContextProvider = (props) => {
  const [auctionItems, setAuctionItems] = useState()
  const [auctionItem, setAuctionItem] = useState()
  const [owner, setOwner] = useState()

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

  const fetchOneAuctionItem = async (id) => {
    let auction = await fetch(`/rest/auctions/${id}`)
    auction = await auction.json()
    setAuctionItem(auction);
    setOwner(auction.owner);
  };

  useEffect(() => {
    const parsedData = JSON.parse(localStorage.getItem("item"))
    setAuctionItem(parsedData)
  }, [])

  useEffect(() => {
    localStorage.setItem("item", JSON.stringify(auctionItem))
  }, [auctionItem])

  const values = {
    auctionItems,
    fetchAllAuctionItems,
    fetchOneAuctionItem,
    auctionItem,
    owner,
    setAuctionItem,
    updateItemsState
  }

  return (
    <AuctionContext.Provider value={values}>
      {props.children}
    </AuctionContext.Provider>
  )
}

export default AuctionContextProvider
