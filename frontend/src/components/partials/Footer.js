import React from 'react'
import { Container, Row } from 'reactstrap'

const Footer = () => {
  return (
   <Container className="footer bottom bg-light bg-gradient rounded-top" fluid>
    <Container className="mt-2 text-center">
      <Row>        
        <div className="mx-auto pt-3">
          <p className="mb-0 font-weight-bold">&copy; 2021 MARUF AHMED</p>
          <hr className="my-0 bg-secondary"/>
          <p className="mb-0">email: mriduava@gmail.com</p>
          <p>github.com/mriduava/anbud</p>
        </div>
      </Row>      
    </Container>
    </Container>
  )
}

export default Footer
