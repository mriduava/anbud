import React, {useContext, useState, useEffect } from 'react'
import { Container, Row, Col } from 'reactstrap';
import { AuctionContext } from '../../contexts/AuctionContextProvider'
import { SocketContext } from '../../contexts/SocketContextProvider'

const CreateAd = () => {
  const { auctionItems } = useContext(AuctionContext);
  const { sendAuctionItem } = useContext(SocketContext);

  const [itemName, setItemName] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [initialPrice, setInitialPrice] = useState('')

  const [message, setMessage] = useState('')

  const createAd = async (e) => {
    e.preventDefault();

    let data = {
      item_name: itemName,
      item_image: imageUrl,
      initial_price: initialPrice,
      owner_id: 1,
      start_date: Date.now(),
      stop_date: Date.now()
    }

    sendAuctionItem(data)

    // await fetch(`/rest/auctions`, {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json'
    //   }
    // })
    // .then((response) => {
    //   if (response.ok) {
    //     setMessage("Thread submission successful!")     
    //   } else {
    //     setMessage("Thread submission failed!")
    //   }
    // })
    // .catch((error) => {
    //   return Promise.reject();
    // });
  }

  return (
    <Container>
      <Row className="mt-5">
        <Col lg="3"></Col>
        <Col lg="6">
          <h4>Create ad</h4>
          <hr />
          <form onSubmit={createAd}>
            <input type="text" className="mt-2 form-control" placeholder="Item name"
               value={itemName} onChange={e=>setItemName(e.target.value)}/> 
            <input type="text" className="form-control mt-1" placeholder="Image URL"
              value={imageUrl} onChange={e=>setImageUrl(e.target.value)}/>
            <input type="text" className="form-control mt-1" placeholder="Initial price"
              value={initialPrice} onChange={e=>setInitialPrice(e.target.value)}/>
            <button class="btn btn-outline-success btn-sm float-right mt-2 px-5">Submit</button> 
          </form>
        </Col>
        <Col lg="3"></Col>
      </Row>
    </Container>
  )
}

export default CreateAd
