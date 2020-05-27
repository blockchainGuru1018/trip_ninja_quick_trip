import React from 'react';
import './Search.css';
import FlightInput from './FlightInput';
import PassengerSelect from './PassengerSelect';
import CurrencySelect from './CurrencySelect';
import TripPath from './TripPath';
import TripOptions from './TripOptions';
import SearchButton from './SearchButton';

class Search extends React.Component {
  state = {
    numberFlights: 1
  }
  render() {
    const flights = [];

    for (let i = 0; i < this.state.numberFlights; i += 1) {
      flights.push(<FlightInput key={i} />);
    };

    return (
      <div id="search-form">
        <div className="row">
          <div className="col-lg">
            <h1>Flight Search</h1>
          </div>
        </div>
        {flights}
        <div className="row">
          <button className="btn" onClick={this.onAddFlight}>Add Flight</button>
        </div>
        <hr/>
        <div className="row">
          <div className="col-lg">
            <h4>Additional Details</h4>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3">
            <PassengerSelect />
          </div>
          <div className="col-sm-3">
            <CurrencySelect />
          </div>
          <div className="col-sm-6">
            <TripOptions />
          </div>
        </div>
        <hr/>
        <div className="row">
          <div className="col-sm-9">
            <TripPath />
          </div>
          <div className="col-sm-3">
            <SearchButton />
          </div>
        </div>
      </div>
    )
  }

  onAddFlight = () => {
    this.setState({
      numberFlights: this.state.numberFlights + 1
    });
  }

  onRemoveFlight = () => {
    this.setState({
      numberFlights: this.state.numberFlights - 1
    });
  }
}

export default Search;
