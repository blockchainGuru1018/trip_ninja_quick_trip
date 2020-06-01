import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import NavBar from './common/NavBar';
import Home from './common/Home';
import Search from './trip/search/Search';
import './App.css';
import { setValue, addFlight, updateFlightValue, updatePassengers }
  from './actions/SearchActions';
import { Flight, SearchDetails } from './trip/search/Interfaces';

interface IAppProps {
  searchDetails: SearchDetails;
  setValue: typeof setValue;
  addFlight: typeof addFlight;
  updateFlightValue: typeof updateFlightValue;
  updatePassengers: typeof updatePassengers;
}

class App extends React.Component<IAppProps> {
  render() {
    return (
      <div className="App">
        <NavBar {...this.props}/>
        <div className="container-fluid">
          <Router>
            <div>
              <Route exact path="/" component={Home} />
              <Route exact path="/search/" component={() =>
                <Search
                  searchDetails={this.props.searchDetails}
                  setValue={this.props.setValue}
                  addFlight={this.props.addFlight}
                  updateFlightValue={this.props.updateFlightValue}
                  updatePassengers={this.props.updatePassengers}
                />
              }
              />
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
