  
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from './components/partials/TopNavbar'
import Footer from './components/partials/Footer'
import Home from './pages/Home'
import AuctionContextProvider from './contexts/AuctionContextProvider'

const App = () => {
  return (
    <div className="App">
      <AuctionContextProvider>
        <Router>         
          <Navbar/>       
            <div className="content">
              <Switch>         
                <Route exact path="/" component={Home} />                                                    
              </Switch>
            </div>
          <Footer/>                    
        </Router>
      </AuctionContextProvider>
    </div>
  );
}

export default App;
