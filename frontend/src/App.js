  
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from './components/partials/TopNavbar'
import Footer from './components/partials/Footer'
import Home from './pages/Home'
import AuctionContextProvider from './contexts/AuctionContextProvider'
import SocketContextProvider from './contexts/SocketContextProvider'

const App = () => {
  return (
    <div className="App">
      <AuctionContextProvider>
      <SocketContextProvider>
        <Router>         
          <Navbar/>       
            <div className="content">
              <Switch>         
                <Route exact path="/" component={Home} />                                                    
              </Switch>
            </div>
          <Footer/>                    
        </Router>
      </SocketContextProvider>
      </AuctionContextProvider>
    </div>
  );
}

export default App;
