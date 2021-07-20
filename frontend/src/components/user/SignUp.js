import React, {useState} from 'react'
import { Container, Row, Col } from 'reactstrap';

const SignUp = (props) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [message, setMessage] = useState('')

  const signUpUser = async (e) => {
    e.preventDefault();

    const credentials = {
      name,
      email,
      password,
      pictureUrl: ''
    }
  
    await fetch("/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials)
    });
    try {
      props.history.push('/user-login')
    } catch {
      setMessage('Something wrong!')
    }
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
            <button className="btn btn-outline-success btn-sm float-right mt-3 px-5 w-100">Submit</button>
            <p className="mt-1">{message&&message}</p>
          </form>
        </Col>
        <Col lg="4" className="border rounded bg-light"></Col>
      </Row>
    </Container>
  )
}

export default SignUp
