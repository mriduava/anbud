import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import {Container, Collapse, Navbar, NavbarToggler, Nav, NavItem} from 'reactstrap';
import { UserContext } from '../../contexts/UserContextProvider'
import { AuctionContext } from '../../contexts/AuctionContextProvider'
let throttleSearch;

const TopNavbar = () => {
  const { user, setUser } = useContext(UserContext)
  const { setAuctionItems } = useContext(AuctionContext)

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const logoutUser = async () => {
    await fetch('/logout')
    setUser(null)
    localStorage.removeItem('user');
  }

  const searchAuctionItem = async (input) => {
    let res;
    if(!input.trim()) {
      res = await fetch('/api/auctions')
    } else {
      res = await fetch('/api/auctions/search/' + input)
    }
    res = await res.json()
    setAuctionItems(res)
  }

  const autoSearch = (input) => {
    clearTimeout(throttleSearch)
    throttleSearch = setTimeout(async () => {
      await searchAuctionItem(input)
    }, 300);
  }

  return (
    <Container className="px-0 bg-light bg-gradient rounded-bottom shadow" fluid >
      <Container>
      <Navbar light expand="md" className="mb-0">
        <Link to="/" className="mr-auto navbar-brand text-success font-weight-bold mb-0 pt-2 pb-0"><h3>ANBUD</h3></Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav  className="ms-auto" navbar>
          <form className="form-inline d-flex">
            <input className="form-control" type="search" placeholder="Search" aria-label="Search" style={{height: "32px"}}
              onChange={e => autoSearch(e.target.value)} autoComplete="off" />
          </form>  
          {!user?(
            <div className="mt-1 d-lg-flex">
              <NavItem>
                <Link className="text-dark mx-lg-4" to="/user-register">SIGN UP</Link>
              </NavItem>
              <NavItem>
                <Link className="text-dark ml-lg-3 mr-lg-0" to="/user-login">SIGN IN</Link>
              </NavItem>
            </div>
            ):(
            <div className="mt-1 d-lg-flex">
              <NavItem>
                <Link className="text-dark mx-lg-4" to="/newauction">CREATE AD</Link>
              </NavItem>
              <NavItem lassName="mt-3 mx-1">
                <Link className="text-dark mx-lg-3 text-uppercase" to="/" style={{textDecoration:'none'}}>User: <span className="text-success">{user&&user.name}</span></Link>
              </NavItem>
              <NavItem>
                <Link className="text-dark ml-lg-2" onClick={logoutUser} to="/"> LOGOUT</Link>
              </NavItem>
            </div>
            )}
          </Nav>       
        </Collapse>
        
      </Navbar>
      </Container>
    </Container>
  )
}

export default TopNavbar
