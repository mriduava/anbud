import React, {useContext, useState } from 'react'
import { useHistory } from "react-router-dom";
import { Container, Row, Col } from 'reactstrap';
import { UserContext } from '../../contexts/UserContextProvider'

const SignIn = (props) => {
  const { fetchUser } = useContext(UserContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  let history = useHistory();

  const signInUser = async (e) => {
    e.preventDefault();

    const credentials = 'username=' +
    encodeURIComponent(email)
    + '&password=' +
    encodeURIComponent(password)

    let response = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: credentials
    });

    if(response.url.includes('error')) {
      setMessage('Wrong email or password!')
    }else{
      fetchUser();
      history.goBack() 
    }
  }

  return (
    <Container>
      <Row className="mt-5">
        <Col lg="4" className="border rounded bg-light"></Col>
        <Col lg="4" className="py-5 rounded">
          <h4>Sign in</h4>
          <hr />
          <form onSubmit={signInUser}>
            <input type="email" className="form-control mt-1" placeholder="Email"
              value={email} onChange={e=>setEmail(e.target.value)} required/>
            <input type="password" className="form-control mt-1" placeholder="Password"
              value={password} onChange={e=>setPassword(e.target.value)} required/>
            <button className="btn btn-outline-success btn-sm float-right mt-3 px-5 w-100">Submit</button> 
            <p className="text-danger mt-1">{message&&message}</p>
          </form>
        </Col>
        <Col lg="4" className="border rounded bg-light"></Col>
      </Row>
    </Container>
  )
}

export default SignIn