import React from 'react';
import { SearchDetails, Flight, SearchPayload, FlightPayload }
  from './SearchInterfaces';
import { searchFlights } from '../../actions/SearchActions';
import DestinationList from '../../assets/data/airports.json';
import { datesAreOnSameDayOrLater } from '../../helpers/DateHelpers';
import Button from '@material-ui/core/Button';
import iataCodeHelper from '../../helpers/IataCodeHelper';
import Alert from '@material-ui/lab/Alert';
import history from '../../History';

interface SearchRequestProps {
  searchDetails: SearchDetails;
  searchFlights: typeof searchFlights
}

class SearchRequest extends React.Component<SearchRequestProps> {
  state = {
    searchDetailsValid: true
  }

  searchForFlights = () => {
    const searchValidated: boolean = this.validateSearchDetails();
    return searchValidated
      ? this.submitSearch()
      : this.setState({'searchDetailsValid': false});
  }

  submitSearch = () => {
    this.setState({'searchDetailsValid': true});
    const searchPayload: SearchPayload = {
      currency: this.props.searchDetails.currency,
      flights: this.createFlightPayload(),
      travellers: this.createPassengerPayload(),
      route_flexible: this.props.searchDetails.routeFlexible
    };
    let searchResult: any = this.props.searchFlights(searchPayload);
    searchResult.then((result: any) => this.handleSearchResult(result));
  }

  handleSearchResult = (result: any) =>
    result.flex_trip
      ? history.push('/results/pre-results/')
      : history.push('/results/itinerary/');

  createFlightPayload = () => {
    const flightPayload: Array<FlightPayload> = this.props.searchDetails.flights.map((flight: Flight, index: number) => ({
      id: index + 1,
      departure_date: flight.departureDate,
      cabin_class: flight.cabinClass,
      from_city: iataCodeHelper(flight.origin),
      to_city: iataCodeHelper(flight.destination),
      start_type: flight.origin.includes('All Airports') ? 'C' : 'A',
      end_type: flight.destination.includes('All Airports') ? 'C' : 'A'
    }));
    return flightPayload;
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
        {!this.state.searchDetailsValid &&
        <Alert severity="error" className='validationErrorAlert'>
          Invalid search details - please check dates and flights are correct.
        </Alert>
        }
      </div>
    );
  }
}

export default SearchRequest;