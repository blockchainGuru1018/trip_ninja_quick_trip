
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
import { styled } from '@material-ui/core/styles';

const AddFlightButton = styled(Button)({
  color: 'var(--tertiary)',
  '&:hover': {
    backgroundColor: '#ffffff',
    opacity: '0.7'
  }
});


class Search extends React.Component<SearchProps> {

  componentDidMount() {
    this.setInputFocus();
  }

  render() {
    const flights: Array<any> = this.props.searchDetails.flights.map(
      (_, index: number) => {
        return <FlightInput
          key={index}
          i={index}
          ref={'flightInput' + index}
          updateFlightValue={this.props.updateFlightValue}
          flights={this.props.searchDetails.flights}
          removeFlight={this.props.removeFlight}
          dateFormat={this.props.dateFormat}
        />;
      }
    );

    return (
      <div className="row">
        {this.props.authenticated
          ? <div className="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1" id="search-form">
            <div className="row">
              <div className="col-xl">
                <h1 className="flight-search-header">Flight Search</h1>
              </div>
            </div>        
            {flights}
            <div className="row">
              <div className="col-xl add-flight-btn-container">
                <AddFlightButton
                  onClick={this.onAddFlight}>
                  Add Flight
                </AddFlightButton>
              </div>
            </div>            
            <div className="row">
              <div className="col-xl">
                <hr/>
                <h4>Additional Details</h4>
              </div>
            </div>            
            <div className="row">
              <div className="col-md-3 col-sm-5 search-input">
                <PassengerSelect
                  passengers={this.props.searchDetails.passengers}
                  updatePassengers={this.props.updatePassengers}
                />
              </div>
              <div className="col-md-2 col-sm-3 search-input">
                <CurrencySelect
                  currency={this.props.searchDetails.currency}
                  setValue={this.props.setValue}
                  defaultCurrency={this.props.defaultCurrency}
                />
              </div>
              <div className="col-md-7 col-sm-4">
                <TripOptions
                  routeFlexible={this.props.searchDetails.routeFlexible}
                  setValue={this.props.setValue}
                  flights={this.props.searchDetails.flights}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-xl">
                <hr/>
              </div>
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

  onAddFlight = async () => {
    const flights: Array<Flight> = this.props.searchDetails.flights;
    const origin: string = flights[flights.length - 1].destination || '';
    const addFlight: any = this.props.addFlight({...defaultFlight, origin: origin});
    addFlight.then(() => this.setInputFocus());
  }

  setInputFocus = () => {
    if(this.refs) {
      let ref: any = this.refs['flightInput' + (this.props.searchDetails.flights.length - 1)];
      return ref
        ? ref.refs.flightInputRef.firstElementChild.firstElementChild.click()
        : '';
    }
  }
}

export default Search;
