import React from 'react';
import { SearchDetails, Flight } from './Interfaces';
import DestinationList from '../../assets/data/airports.json';
import { datesAreOnSameDayOrLater } from '../../helpers/DateHelpers';

interface SearchButtonProps {
  searchDetails: SearchDetails
}

class SearchButton extends React.Component<SearchButtonProps> {

  searchForFlights = () => {
    const searchValidated: boolean = this.validateSearchDetails();
    console.log(searchValidated)
    // Create search payload
    // Send search - show loading screen
    // if a successful response then change the screen url.
  }

  validateSearchDetails = () => {
    let currentDate: Date = new Date();
    const flights: Array<Flight> = this.props.searchDetails.flights
    const validatedFlights = flights.filter((flight: Flight) => {
      const destinationIndex: number = DestinationList.findIndex(
        (destination: any) => destination.name === flight.destination
      );
      const originIndex: number = DestinationList.findIndex(
        (destination: any) => destination.name === flight.origin
      );
      const departureDate: Date = new Date(flight.departureDate);
      const currentDatePlusOneDay: Date = new Date(currentDate.setDate(currentDate.getDate() + 1))
      currentDate = departureDate;
      return destinationIndex >= 0 &&
        originIndex >= 0 &&
        destinationIndex !== originIndex &&
        flight.departureDate !== '' &&
        datesAreOnSameDayOrLater(departureDate, currentDatePlusOneDay)
    })
    return validatedFlights.length ===  flights.length
  }

  render() {
    return (
      <div className="float-right">
        <button
          className="btn btn-primary"
          onClick={this.searchForFlights}>Search Flights</button>
      </div>
    )
  }
}

export default SearchButton;