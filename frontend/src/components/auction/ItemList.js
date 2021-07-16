import React, {useContext} from 'react'
import { AuctionContext } from '../../contexts/AuctionContextProvider'
import { Link } from 'react-router-dom';
import { Row, Col, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle} from 'reactstrap';
import moment from 'moment'

const ItemList = () => {
  const { auctionItems, fetchOneAuctionItem } = useContext(AuctionContext)

  const formateTime = (time) => {
    return moment(time).format('MMMM Do YYYY, H:mm');
  }

  const mapAuctionItems = () => {
    return auctionItems.map((item, i) => {
      return (
        <Col lg="4" key={'sub' + item.id + i} className="my-3" onClick={()=>fetchOneAuctionItem(item.id)}>
        <Link to={`/${item.item_name}`} style={{ textDecoration: 'none' }}>
          <Card className="card">
            <CardImg top className="card-image" width="100%" src={item.item_image} alt="Anbud Image" />
            <CardBody>
              <CardTitle tag="h5" className="text-dark">{item.item_name}</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">Seller: <span className="text-capitalize text-success">{item.owner.name}</span></CardSubtitle>
              <hr />
              <div className="d-flex justify-content-between mt-3">
                <CardText><span className="text-danger">{item.initial_price}</span><span className="text-secondary"> SEK</span></CardText>
                <CardText className="text-primary"><span className="text-secondary">Ends: </span>{formateTime(item.stop_date)}</CardText>
              </div>
            </CardBody>
          </Card>
        </Link>
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
