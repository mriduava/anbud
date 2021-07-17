import React, {createContext, useState, useEffect } from 'react'

export const AuctionContext = createContext();

const AuctionContextProvider = (props) => {
  const [auctionItems, setAuctionItems] = useState([])
  const [auctionItem, setAuctionItem] = useState(null)
  const [bids, setBids] = useState([])
  const [itemBids, setItemBids] = useState()
  const [auctionId, setAuctionId] = useState()

  const fetchAllBids= async () => {
    let bids = await fetch(`/rest/bids`)
    bids = await bids.json()
    setBids(bids);
  };

  const fetchBidsByAuctionId = async (auctionId) => {
    let oneItemBids = await fetch(`/rest/bids/${auctionId}`)
    oneItemBids= await oneItemBids.json()
    setItemBids(oneItemBids);
  };

  const fetchAllAuctionItems = async () => {
    let auctions = await fetch('/rest/auctions')
    auctions = await auctions.json()
    setAuctionItems(auctions);
  };
  useEffect(()=>{
    fetchAllAuctionItems()
    fetchAllBids()
  }, [])

  const updateBids = (newBid) => {
    bids.push(newBid)
    fetchAllBids()
  }

  const fetchOneAuctionItem = async (id) => {
    let auction = await fetch(`/rest/auctions/${id}`)
    auction = await auction.json()
    setAuctionItem(auction);
    setAuctionId(id)
  };

  useEffect(() => {
    let parsedData;
    if (localStorage.getItem("item") !== null || localStorage.getItem("item") !== undefined) {
      parsedData = JSON.parse(localStorage.getItem("item"))
    }
    setAuctionItem(parsedData)
  }, [])

  useEffect(() => {
    if (auctionItem !== null || auctionItem !== undefined) {
       localStorage.setItem("item", JSON.stringify(auctionItem))
    }
  }, [auctionItem])


  const values = {
    auctionItems,
    fetchAllAuctionItems,
    fetchOneAuctionItem,
    auctionItem,
    setAuctionItem,
    fetchAllBids,
    bids,
    updateBids
  }

  return (
    <AuctionContext.Provider value={values}>
      {props.children}
    </AuctionContext.Provider>
  )
}

export default AuctionContextProvider
