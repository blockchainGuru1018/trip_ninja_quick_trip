import React from 'react';
import './Search.css';
import FlightInput from './FlightInput';
import PassengerSelect from './PassengerSelect';
import CurrencySelect from './CurrencySelect';
import TripPath from './TripPath';
import TripOptions from './TripOptions';
import SearchButton from './SearchButton';

class Search extends React.Component {
  render() {
    return (
      <div id="search-form">
        <div className="row">
          <div className="col-lg">
            <h1>Flight Search</h1>
          </div>
        </div>
        <FlightInput />
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
}

export default Search;
