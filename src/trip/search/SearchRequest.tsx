import React from 'react';
import { SearchDetails, Flight, SearchPayload, FlightPayload }
  from './SearchInterfaces';
import { searchFlights } from '../../actions/SearchActions';
import DestinationList from '../../assets/data/airports.json';
import { datesAreOnSameDayOrLater } from '../../helpers/DateHelpers';
import { createPassengerPayload } from '../../helpers/PassengersListHelper';
import { flexTripAllowed } from '../../helpers/FlexTripAllowedHelper';
import Button from '@material-ui/core/Button';
import iataCodeHelper from '../../helpers/IataCodeHelper';
import Alert from '@material-ui/lab/Alert';
import history from '../../History';
import Hotkeys from 'react-hot-keys';
import { withTranslation, WithTranslation } from 'react-i18next';


interface SearchRequestProps extends WithTranslation {
  searchDetails: SearchDetails;
  searchFlights: typeof searchFlights
  virtualInterliningAccess: boolean
}

export class SearchRequest extends React.Component<SearchRequestProps> {
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
      travellers: createPassengerPayload(this.props.searchDetails.passengers),
      route_flexible: this.props.searchDetails.routeFlexible && flexTripAllowed(this.props.searchDetails.flights),
      max_cache: 24,
      virtual_interlining: this.props.virtualInterliningAccess ? this.props.searchDetails.virtualInterlining : false
    };
    let searchResult: any = this.props.searchFlights(searchPayload);
    searchResult.then((result: any) => this.handleSearchResult(result));
  }

  handleSearchResult = (result: any) =>
    result.success
      ? result.flex_trip
        ? history.push('/results/pre-results/')
        : history.push('/results/itinerary/')
      : '';

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
        <Hotkeys 
          keyName="ctrl+enter, command+enter" 
          onKeyDown={this.searchForFlights}
        />
        <Button
          disableElevation
          variant="contained"
          color="primary"
          size="large"
          onClick={this.searchForFlights}>
          {this.props.t("search.searchRequest.searchFlights")}
        </Button>
        {!this.state.searchDetailsValid &&
        <Alert severity="error" className='validation-error-alert'>
          {this.props.t("search.searchRequest.searchFlightsError")}
        </Alert>
        }
      </div>
    );
  }
}

export default withTranslation('common')(SearchRequest);