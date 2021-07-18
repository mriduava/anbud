import React, {useContext, useState, useEffect } from 'react'
import { Container, Row, Col } from 'reactstrap';
import { UserContext } from '../../contexts/UserContextProvider'

const SignUp = (props) => {
  const { setUser } = useContext(UserContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [pictureUrl, setPictureUrl] = useState('')

  const [message, setMessage] = useState('')

  const signUpUser = async (e) => {
    e.preventDefault();

    await fetch(`/register`, {
      method: 'POST',
      body: JSON.stringify({name, email, pictureUrl, password}),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then((response) => {
      if (response.ok) {
        response = response.json();
        Promise.resolve(response)
        .then(user => {
          setUser(user)
          localStorage.setItem('user', JSON.stringify(user)) 
        })          
        props.history.push('/') 
        setMessage("User registration successful!")     
      } else {
        setMessage("User registration failed!")
      }
    })
    .catch((error) => {
      return Promise.reject();
    });
  }

  return (
    <Container>
      <Row className="mt-5">
        <Col lg="4" className="border rounded bg-light"></Col>
        <Col lg="4" className="py-5 rounded">
          <h4>Sign up</h4>
          <hr />
          <form onSubmit={signUpUser}>
            <input type="text" className="mt-2 form-control" placeholder="Name"
               value={name} onChange={e=>setName(e.target.value)} required/> 
            <input type="email" className="form-control mt-1" placeholder="Email"
              value={email} onChange={e=>setEmail(e.target.value)} required/>
            <input type="password" className="form-control mt-1" placeholder="Password"
              value={password} onChange={e=>setPassword(e.target.value)} required/>
            <input type="text" className="form-control mt-1" placeholder="Picture URL (Optional)"
              value={pictureUrl} onChange={e=>setPictureUrl(e.target.value)}/>
            <button className="btn btn-outline-success btn-sm float-right mt-3 px-5">Submit</button> 
          </form>
        </Col>
        <Col lg="4" className="border rounded bg-light"></Col>
      </Row>
    </Container>
  )
}

export default SignUp
