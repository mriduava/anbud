  
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from './components/partials/TopNavbar'
import Footer from './components/partials/Footer'
import CreateAd from './components/auction/CreateAd'
import AuctionDetail from './components/auction/AuctionDetail'
import SignUp from './components/user/SignUp'
import Home from './pages/Home'
import AuctionContextProvider from './contexts/AuctionContextProvider'
import SocketContextProvider from './contexts/SocketContextProvider'
import UserContextProvider from './contexts/UserContextProvider'

const App = () => {
  return (
    <div className="App">
      <AuctionContextProvider>
        <SocketContextProvider>
          <UserContextProvider>
            <Router>         
              <Navbar/>       
                <div className="content">
                  <Switch>         
                    <Route exact path="/" component={Home} />                                                 
                    <Route exact path="/newauction" component={CreateAd} />
                    <Route exact path="/register" component={SignUp} />
                    <Route exact path="/:id" component={AuctionDetail} />                                             
                  </Switch>
                </div>
              <Footer/>                    
            </Router>
          </UserContextProvider>
        </SocketContextProvider>
      </AuctionContextProvider>
    </div>
  );
}

export default App;
