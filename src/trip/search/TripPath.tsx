import React from 'react';
import FlightIcon from '@material-ui/icons/Flight';
import { Flight } from './Interfaces';
import iataCode from '../../helpers/iataCode';

interface TripPathProps {
  flights: Array<Flight>;
}

class TripPath extends React.Component<TripPathProps> {

  render() {   
    let flightList = this.props.flights.filter(this.checkForOriginDestinationPair);
    const path = flightList.map((item, index) => (
      <span key={index}>
        <span className="path-iata">{iataCode(item.origin)}</span>
        <FlightIcon className="rotate-90" color="primary"/>
        <span className="path-iata">{iataCode(item.destination)}</span>
        {index < this.props.flights.length-1 &&
          <span className="divider-light">|</span>
        }
      </span>
    ));

    return (
      <div className="trip-path float-right">
        {path}
      </div>
    )
  }

  checkForOriginDestinationPair = (flight: Flight) => {
    return flight.origin && flight.destination;
  }
}

export default TripPath;