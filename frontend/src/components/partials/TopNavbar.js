import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import {Container, Collapse, Navbar, NavbarToggler, Nav, NavItem} from 'reactstrap';
import { UserContext } from '../../contexts/UserContextProvider'

const TopNavbar = () => {
  const { user, setUser } = useContext(UserContext)

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const logoutUser = async () => {
    await fetch('/logout')
    setUser(null)
    localStorage.removeItem('user');
  }

  return (
    <Container className="px-0 bg-light bg-gradient rounded-bottom shadow" fluid >
      <Container>
      <Navbar light expand="md" className="mb-0">
        <Link to="/" className="mr-auto navbar-brand text-success font-weight-bold mb-0 pt-2 pb-0"><h3>ANBUD</h3></Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav  className="ml-auto" navbar>
          {!user?(
            <>
              <NavItem className="mr-4">
                <Link className="text-dark mx-lg-2" to="/register">SIGN UP</Link>
              </NavItem>
              <NavItem>
                <Link className="text-dark mx-lg-3" to="/signin">SIGN IN</Link>
              </NavItem>
            </>
            ):(
            <>
              <NavItem>
                <Link className="text-dark mx-lg-3" to="/newauction">CREATE AD</Link>
              </NavItem>
              <NavItem>
                <Link className="text-dark mx-lg-3 text-uppercase" to="/" style={{textDecoration:'none'}}>User: <span className="text-success">{user&&user.name}</span></Link>
              </NavItem>
              <NavItem>
                <Link className="text-dark ml-lg-2" onClick={logoutUser} to="/"> LOGOUT</Link>
              </NavItem>
            </>
            )}
          </Nav>          
        </Collapse>
      </Navbar>
      </Container>
    </Container>
  )
}

export default TopNavbar
