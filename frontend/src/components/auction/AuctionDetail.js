import React, {useContext, useState} from 'react'
import { AuctionContext } from '../../contexts/AuctionContextProvider'
import { SocketContext } from '../../contexts/SocketContextProvider'
import { Container, Row, Col} from 'reactstrap';
import moment from 'moment'

const AuctionDetail = () => {
  const { auctionItem, bids } = useContext(AuctionContext);
  const { sendBidData } = useContext(SocketContext);

  const [newBid, setNewBid] = useState('');

  const formatTime = (time) => {
    return moment(time).format('MMMM Do YYYY, H:mm');
  }

  const getTheHighestBid = (auctionId) => {
    let allBids = bids.map((bid, i) => bid.auction_id === auctionId?bid.bid:0);
    let highestBid = Math.max(...allBids)
    return highestBid;
  }

  const postNewBid = (e) => {
    e.preventDefault();
    if (newBid <= getTheHighestBid(auctionItem.id)) {
      alert(`Please write a value more than ${getTheHighestBid(auctionItem.id)}`)
    }else if(newBid <= auctionItem.initial_price ){
      alert(`Please write a value more than ${auctionItem.initial_price}`)
    }else{
      let data = {
        auction_id: auctionItem.id,
        bid: +newBid,
        bidder_id: 93,
        created_at: Date.now()
      }
      sendBidData(data)
      setNewBid('')
    }
  }

  const dispAuctionDetail = () => {
    return(
      <Row className="my-5">
        <Col lg="6">
          <img className="item-detail-img border border-secondary p-2 rounded" src={auctionItem.item_image} alt="mriduava@gmail.com" />
          <div className="mt-3">
            <h4 className="text-dark">{auctionItem.item_name}</h4>
            <hr />
            <div className="d-flex justify-content-between mt-3">
              <h6 className="text-secondary">Seller: <span className="text-uppercase text-success">{auctionItem.owner.name}</span></h6>
            </div>
          </div>
        </Col>
        <Col lg="3" className="rounded border bg-light pb-5 mr-2">
          <div className="d-flex justify-content-between mt-3">
            <h5 className="text-danger">{getTheHighestBid(auctionItem.id) !==0?'Leading bid':'Starting price'}</h5>
            <h5 className="text-danger">{getTheHighestBid(auctionItem.id) ===0?auctionItem.initial_price:getTheHighestBid(auctionItem.id)} SEK</h5>
          </div>
          <div className="d-flex justify-content-between mt-3">
            <p className="text-primary">Ends</p>
            <p className="text-primary">{formatTime(auctionItem.stop_date)}</p>
          </div>
          <hr />
          <div className="mt-5">
            <h6 className="text-secondary">Put a value greater than the highest bid.</h6>
            <form onSubmit={postNewBid}>
              <input type="text" className="form-control mt-1" placeholder="Bid price"
                value={newBid} onChange={e=>setNewBid(e.target.value)}/>
              <button type="button" className="btn btn-outline-success btn-sm mt-3 px-5">Place bid</button> 
            </form>
          </div>
        </Col>
        <Col lg="3" className="rounded border pl-5">
          <div className="d-flex justify-content-between mt-3">
            <h5 className="text-secondary">Bidder</h5>
            <h5 className="text-secondary">Bid</h5>
          </div>
          <hr />
          <div>
            {(() => {   
              return bids.map((bid, i) => {
                if (bid.auction_id === auctionItem.id) {
                  return (
                    <div className="d-flex justify-content-between" key={'sub' + bid.id + i}>
                      <h6 className="text-capitalize text-dark">{bid.bidder.name}</h6>
                      <h6 className="text-primary">{bid.bid} <span className="text-secondary">SEK</span></h6>
                    </div>       
                  )
                }
              })
            })()}
          </div>
        </Col>
      </Row>
    )
  }

  return (
    <Container>
      {auctionItem && dispAuctionDetail()}
    </Container>
  )
}

export default AuctionDetail
