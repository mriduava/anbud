import React, {useContext} from 'react'
import { AuctionContext } from '../../contexts/AuctionContextProvider'
import { Link } from 'react-router-dom';
import { Row, Col, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle} from 'reactstrap';

const ItemList = () => {
  const { auctionItems } = useContext(AuctionContext)

  const mapAuctionItems = () => {
    return auctionItems.map((item, i) => {
      return (
        <Col lg="4" key={'sub' + item._id + i} className="my-3">
          <Card className="card">
            <CardImg top className="card-image" width="100%" src={item.item_image} alt="Anbud Image" />
            <CardBody>
              <CardTitle tag="h5" className="text-dark">{item.item_name}</CardTitle>
              {/* <CardSubtitle tag="h6" className="mb-2 text-muted">Seller: <span className="text-capitalize text-success">{item.owner.name}</span></CardSubtitle> */}
              <CardText className="text-secondary">Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
              <CardText><span className="text-danger">{item.initial_price}</span> SEK</CardText>
              <CardText className="text-primary">End: {item.stop_date}</CardText>
            </CardBody>
          </Card>
        </Col>    
      )
    })
  }

  return (
    <Row>
      {auctionItems&&mapAuctionItems()}
    </Row>
  )
}

export default ItemList
