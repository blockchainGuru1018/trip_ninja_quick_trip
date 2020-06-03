
import React from 'react';
import FlightInput from './FlightInput';
import PassengerSelect from './PassengerSelect';
import CurrencySelect from './CurrencySelect';
import TripPath from './TripPath';
import TripOptions from './TripOptions';
import SearchButton from './SearchButton';
import { SearchProps } from './Interfaces';
import './Search.css'
import { Redirect } from 'react-router-dom';

class Search extends React.Component<SearchProps> {
  render() {
    const flights: Array<any> = this.props.searchDetails.flights.map(
      (_, index: number) =>
        <FlightInput
          key={index}
          i={index}
          updateFlightValue={this.props.updateFlightValue}
          updateFlightOriginDestination={this.props.updateFlightOriginDestination}
          flights={this.props.searchDetails.flights}
          removeFlight={this.props.removeFlight} />
    );

    return (

      <div className="row">
        {this.props.authenticated
          ? <div className="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1" id="search-form">
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
                <PassengerSelect
                  passengers={this.props.searchDetails.passengers}
                  updatePassengers={this.props.updatePassengers}
                />
              </div>
              <div className="col-sm-2">
                <CurrencySelect
                  currency={this.props.searchDetails.currency}
                  defaultCurrency={this.props.defaultCurrency}
                  setValue={this.props.setValue}
                />
              </div>
              <div className="col-sm-7">
                <TripOptions
                  routeFlexible={this.props.searchDetails.route_flexible}
                  setValue = {this.props.setValue}
                />
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
                <SearchButton
                  searchDetails={this.props.searchDetails}
                />
              </div>
            </div>
          </div>
          : <Redirect to='/login/' />}
      </div>
    )
  }

  onAddFlight = () =>
    this.props.addFlight({
      'origin': '',
      'destination': '',
      'departureDate': '',
      'cabinClass': '',
      'endType': ''
    })
}

export default Search;
