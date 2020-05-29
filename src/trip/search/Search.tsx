
import React from 'react';
import FlightInput from './FlightInput';
import PassengerSelect from './PassengerSelect';
import CurrencySelect from './CurrencySelect';
import TripPath from './TripPath';
import TripOptions from './TripOptions';
import SearchButton from './SearchButton';
import { Flight, SearchProps } from './Interfaces';
import './Search.css'

class Search extends React.Component<SearchProps> {

  render() {
    const flights: Array<any> = this.props.searchDetails.flights.map(
      (flight: Flight, index: number) =>
        <FlightInput
          key={index}
          i={index}
          updateFlightValue={this.props.updateFlightValue}
          flight={flight}/>
    );

    return (
      <div className="row">
        <div className="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1" id="search-form">
          <div className="row">
            <div className="col-lg">
              <h1>Flight Search</h1>
            </div>
          </div>
          {flights}
          <div className="row">
            <button className="btn btn-add-flights" onClick={this.onAddFlight}>Add Flight</button>
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
            <div className="col-sm-2">
              <CurrencySelect
                currency={this.props.searchDetails.currency}
                setValue={this.props.setValue}
              />
            </div>
            <div className="col-sm-7">
              <TripOptions />
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col-lg-9 col-md-8">
              <TripPath 
                flights={this.props.searchDetails.flights}
              />
            </div>
            <div className="col-lg-3 col-md-4">
              <SearchButton />
            </div>
          </div>
        </div>
      </div>
    )
  }

  onAddFlight = () =>
    this.props.addFlight({
      'origin': '',
      'destination': '',
      'departureDate': '',
      'cabinClass': ''
    });

  // onRemoveFlight = () => {
  //   this.setState({
  //     numberFlights: this.state.numberFlights - 1
  //   });
  // }
}

export default Search;
