import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import NavBar from './common/NavBar';
import Search from './trip/search/Search';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <NavBar {...this.props}/>
        <div className="container">
          <Router>
            <div>
              <Route exact path="/" component={Search} />
              <Route exact path="/search/" component={() => <Search {...this.props} />} />
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
