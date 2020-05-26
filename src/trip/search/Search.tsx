import React from 'react';
import FlightInput from './FlightInput';
import './Search.css';

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
        <div className="row">
          <div className="col-lg">
            <h4>Additional Details</h4>
          </div>
        </div>
      </div>
    )
  }
}

export default Search;