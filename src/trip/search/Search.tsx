
import React from 'react';
import FlightInput from './FlightInput';
import PassengerSelect from './PassengerSelect';
import CurrencySelect from './CurrencySelect';
import TripPath from './TripPath';
import TripOptions from './TripOptions';
import SearchRequest from './SearchRequest';
import { SearchProps, defaultFlight, Flight } from './SearchInterfaces';
import './Search.css';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';

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
          removeFlight={this.props.removeFlight}
          dateFormat={this.props.dateFormat}
        />
    );
    
    return (
      <div className="row">
        {this.props.authenticated
          ? <div className="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1" id="search-form">
            <h1>Flight Search</h1>
            {flights}
            <div className="row">
              <Button
                color="secondary"
                onClick={this.onAddFlight}>
                Add Flight
              </Button>
            </div>
            <hr/>
            <h4>Additional Details</h4>
            <div className="row">
              <div className="col-md-3 col-sm-4">
                <PassengerSelect
                  passengers={this.props.searchDetails.passengers}
                  updatePassengers={this.props.updatePassengers}
                />
              </div>
              <div className="col-md-2 col-sm-3">
                <CurrencySelect
                  currency={this.props.searchDetails.currency}
                  setValue={this.props.setValue}
                  defaultCurrency={this.props.defaultCurrency}
                />
              </div>
              <div className="col-md-7 col-sm-5">
                <TripOptions
                  routeFlexible={this.props.searchDetails.routeFlexible}
                  setValue={this.props.setValue}
                  flights={this.props.searchDetails.flights}
                />
              </div>
              <hr/>
            </div>
            <div className="row">
              <div className="col-lg-9 col-md-8">
                <TripPath
                  flights={this.props.searchDetails.flights}
                />
              </div>
              <div className="col-lg-3 col-md-4">
                <SearchRequest
                  searchDetails={this.props.searchDetails}
                  searchFlights={this.props.searchFlights}
                />
              </div>
            </div>
          </div>
          : <Redirect to='/login/' />}
      </div>
    );
  }
  onAddFlight = () => {
    const flights: Array<Flight> = this.props.searchDetails.flights;
    const origin: string = flights[flights.length - 1].destination || '';
    this.props.addFlight({...defaultFlight, origin: origin});
    // const flightInput: any = this.refs.flightInput0;
    // flightInput.refs.origin0.focus();
  }
}

export default Search;
