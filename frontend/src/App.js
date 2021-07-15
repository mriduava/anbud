  
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from './components/partials/TopNavbar'
import Footer from './components/partials/Footer'
import Home from './pages/Home'

const App = () => {
  return (
    <div className="App">
        <Router>         
          <Navbar/>       
            <div className="content">
              <Switch>         
                <Route exact path="/" component={Home} />                                                    
              </Switch>
            </div>
          <Footer/>                    
        </Router>
    </div>
  );
}

export default App;
