import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import NavBar from './common/NavBar';
import Search from './trip/search/Search';
import './App.css';

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={Search} />
      <Route exact path="/search/" component={Search} />
    </div>
  </Router>
)

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="container">
        {routing}    
      </div>
    </div>
  );
}

export default App;
