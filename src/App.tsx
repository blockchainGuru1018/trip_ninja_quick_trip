import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import NavBar from './common/NavBar';
import Search from './trip/search/Search';
import './App.css';
import { setValue } from './actions/SearchActions';

interface IAppProps {
  searchDetails: Object
  setValue: typeof setValue;
}

class App extends React.Component<IAppProps> {
  render() {
    return (
      <div className="App">
        <NavBar {...this.props}/>
        <div className="container">
          <Router>
            <div>
              <Route exact path="/" component={Search} />
              <Route exact path="/search/" component={
                () => <Search searchDetails={this.props.searchDetails} setValue={this.props.setValue}/>} />
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
