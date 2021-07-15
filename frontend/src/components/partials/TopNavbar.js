import React, { useState } from 'react';
import { Link } from "react-router-dom";
import {Container, Collapse, Navbar, NavbarToggler, Nav, NavItem} from 'reactstrap';

const TopNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Container className="px-0 bg-light bg-gradient rounded-bottom shadow" fluid >
      <Container>
      <Navbar light expand="md" className="mb-0">
        <Link to="/" className="mr-auto navbar-brand text-success font-weight-bold mb-0 pt-2 pb-0"><h3>ANBUD</h3></Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav  className="float-right ml-auto" navbar>
            <NavItem className="mr-4">
              <Link className="text-dark mr-4" to="/register">SIGN UP</Link>
            </NavItem>
            <NavItem>
              <Link className="text-dark" to="/signin">SIGN IN</Link>
            </NavItem>
            <NavItem>
              <Link className="text-dark" to="/"> LOGOUT</Link>
            </NavItem>
          </Nav>          
        </Collapse>
      </Navbar>
      </Container>
    </Container>
  )
}

export default TopNavbar
