import React, { useState, useContext } from 'react'
import { Container, Row, Col } from 'reactstrap';
import { UserContext } from '../../contexts/UserContextProvider'
import { AuctionContext } from '../../contexts/AuctionContextProvider'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import sv from "date-fns/locale/sv"; 
registerLocale("sv", sv); 


const CreateAd = (props) => {
  const { user } = useContext(UserContext)
  const { appendToAuctionsState } = useContext(AuctionContext)

  const today = new Date();
  const tomorrow = today.setDate(today.getDate()+1);
  const oneMonth = today.setDate(today.getDate()+30);
  const [endDate, setEndDate] = useState(tomorrow);

  const [itemName, setItemName] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [initialPrice, setInitialPrice] = useState('')

  const [message, setMessage] = useState('')

  const createAd = async (e) => {
    e.preventDefault();
    let date = new Date(endDate);
    let end_date = date.getTime()
    let data = {
      item_name: itemName,
      description,
      item_image: imageUrl,
      initial_price: initialPrice,
      owner_id: user.id,
      start_date: Date.now(),
      stop_date: end_date
    }

    await fetch(`/api/auctions`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then((response) => {
      if (response.ok) {
        response = response.json();
        Promise.resolve(response)
        .then(data => {
          appendToAuctionsState(data)
        })             
        props.history.push('/') 
      } else {
        setMessage("Submission failed!")
      }
    })
    .catch((error) => {
      return Promise.reject()
    });
  }

  return (
    <Container>
      <Row className="mt-5">
        <Col lg="3" className="border-top border-end rounded"></Col>
        <Col lg="6" className="py-5 rounded shadow-sm">
          <h4>Create ad</h4>
          <hr />
          <form onSubmit={createAd}>
            <input type="text" className="mt-2 form-control" placeholder="Item name"
               value={itemName} onChange={e=>setItemName(e.target.value)}/>
            <input type="text" className="mt-2 form-control" placeholder="Description"
               value={description} onChange={e=>setDescription(e.target.value)}/> 
            <input type="text" className="form-control mt-1" placeholder="Image URL"
              value={imageUrl} onChange={e=>setImageUrl(e.target.value)}/>
            <input type="text" className="form-control mt-1" placeholder="Initial price"
              value={initialPrice} onChange={e=>setInitialPrice(e.target.value)}/>
            <div className="mt-3">
            <span className="mr-5 text-dark">Ends </span>
              <DatePicker className="px-2 py-1 border border-secondary rounded" locale="sv"
                style={{ padding:'2px !important'}} selected={endDate}
                onChange={date=>setEndDate(date)}
                minDate={tomorrow} isClearable maxDate={oneMonth}
                showWeekNumbersshowTimeSelect showTimeSelect
                timeFormat="p" timeIntervals={15} dateFormat="Pp"
                showYearDropdown scrolllableMonthYearDropdown
                placeholderText="End date"
              />  
            </div>    
            <button className="btn btn-outline-success btn-sm float-right mt-3 px-5">Submit</button> 
            <p className="mt-1">{message&&message}</p>
          </form>
        </Col>
        <Col lg="3" className="border-start border-top rounded"></Col>
      </Row>
    </Container>
  )
}

export default CreateAd
