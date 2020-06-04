import React from 'react';
import { SearchDetails, Flight, SearchPayload } from './SearchInterfaces';
import { searchFlights } from '../../actions/SearchActions';
import DestinationList from '../../assets/data/airports.json';
import { datesAreOnSameDayOrLater } from '../../helpers/DateHelpers';
import Button from '@material-ui/core/Button';

interface SearchButtonProps {
  searchDetails: SearchDetails;
  searchFlights: typeof searchFlights
}

class SearchButton extends React.Component<SearchButtonProps> {

  searchForFlights = () => {
    const searchValidated: boolean = this.validateSearchDetails();
    console.log(searchValidated);
    return searchValidated
      ? this.submitSearch()
      : ''; // show some sort of error message
    // Create search payload
    // Send search - show loading screen
    // if a successful response then change the screen url.
  }

  submitSearch = () => {
    const searchPayload: SearchPayload = {
      currency: this.props.searchDetails.currency,
      flights: this.props.searchDetails.flights,
      travellers: this.createPassengerPayload(),
      alliance: ''
    };
    this.props.searchFlights(searchPayload);
  }

  createPassengerPayload = ()  => {
    let passengerPayload = {};
    this.props.searchDetails.passengers.map(passenger => passengerPayload[passenger.type.toLowerCase()] = passenger.count);
    return passengerPayload;
  }

  validateSearchDetails = () => {
    let currentDate: Date = new Date();
    const flights: Array<Flight> = this.props.searchDetails.flights;
    const validatedFlights = flights.filter((flight: Flight) => {
      const destinationIndex: number = DestinationList.findIndex(
        (destination: any) => destination.name === flight.destination
      );
      const originIndex: number = DestinationList.findIndex(
        (destination: any) => destination.name === flight.origin
      );
      const departureDate: Date = new Date(flight.departureDate);
      const currentDatePlusOneDay: Date = new Date(currentDate.setDate(currentDate.getDate() + 1));
      currentDate = departureDate;
      return destinationIndex >= 0 &&
        originIndex >= 0 &&
        destinationIndex !== originIndex &&
        flight.departureDate !== '' &&
        datesAreOnSameDayOrLater(departureDate, currentDatePlusOneDay);
    });
    return validatedFlights.length ===  flights.length;
  }

  render() {
    return (
      <div className="float-right">
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={this.searchForFlights}>
            Search Flights
        </Button>
      </div>
    );
  }
}

export default SearchButton;