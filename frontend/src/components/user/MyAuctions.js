import React, {useContext, useState, useEffect } from 'react'
import { Container, Row, Col, Fade } from 'reactstrap';
import { UserContext } from '../../contexts/UserContextProvider'
import moment from 'moment'

const MyAuctions = () => {
  const { user } = useContext(UserContext)
  const [myAuctions, setMyAuctions] = useState([])

  const formateTime = (time) => {
    return moment(time).format('MMMM Do YYYY, H:mm');
  }

  useEffect(()=>{
    let id = user.id
    const fetchMyAuctions = async (myId) => {
      let auctions = await fetch(`/api/auctions/myauctions/${myId}`)
      auctions = await auctions.json()
      setMyAuctions(auctions);
    };
    fetchMyAuctions(id)
  }, [user])

  const DispTopTexts = () => {
    return(
      <div className="text-dark d-flex ">
        <div style={{width: "65px"}} className="my-auctions-top p-1 pb-0 rounded">
          <h6>Index</h6>
        </div>
        <div style={{width: "350px"}} className="my-auctions-top p-1 pb-0  rounded">
          <h6>Item Name</h6>
        </div>
        <div style={{width: "150px"}} className="my-auctions-top p-1 pb-0 rounded">
          <h6>Initial Price (SEK)</h6>
        </div>
        <div style={{width: "180px"}} className="my-auctions-top p-1 pb-0 rounded">
          <h6>Start Date</h6>
        </div>
        <div style={{width: "185px"}} className="my-auctions-top p-1 pb-0  rounded">
          <h6>End Date</h6>
        </div>
        <div style={{width: "410px"}} className="ml-1 my-auctions-top p-1 pb-0  rounded">
          <h6>Description</h6>
        </div>
      </div>
    )
  }

  const DispMyAuctionList = () => {
    let values = []
    for (let i = 0; i < myAuctions.length; i++) {
      let color; i%2===0?color='rgb(248 248 248)':color='#faf8f0'     
      values[i] = (
        <div className="d-flex ml-1 data-row mx-0" style={{cursor: 'pointer'}} key={"mridu "+ i +"x"}>  
          <h6 className="pt-2 pl-2" key={"key"+ i} style= {{width:"65px"}}>
            {i+1}
          </h6>
          <h6 className="ml-1 pl-3 pt-2" key={"key"+ i}
            style={{width:"350px"}}>
            {myAuctions[i].item_name}
          </h6>
          <h6 className="ml-1 pl-2 pt-2" key={"key"+ i}
            style={{width:"150px"}}>
            {myAuctions[i].initial_price}
          </h6>
          <h6 className="ml-1 pl-2 pt-2" key={"key"+ i}
            style={{width:"176px"}}>
            {formateTime(myAuctions[i].start_date)}
          </h6>
          <h6 className="ml-1 pl-2 pt-2" key={"key"+ i}
            style={{width:"180px"}}>
            {formateTime(myAuctions[i].stop_date)}
          </h6>
          <h6 className="ml-1 pl-2 pt-2" key={"key"+ i}
            style={{width:"390px"}}>
            {myAuctions[i].description}
          </h6>
        </div>
      )      
    }
    return values;    
  }

  return (
    <Container>
      <Row>
        <Col lg="12" className="px-0 mb-3 pb-3 mt-5" 
          style={{overflowX: 'scroll', borderRadius: "5px"}}>
          {!myAuctions?
          (<div class="spinner-border text-secondary" role="status">
              <span class="sr-only">Loading...</span>
            </div>):
          (<div className="px-0" style={{width: "1320px", maxHeight: "50vh"}}>
            <Fade>
              <DispTopTexts/>
              <DispMyAuctionList/>
            </Fade>
          </div>)}
        </Col>
      </Row>
      
    </Container>
  )
}

export default MyAuctions
