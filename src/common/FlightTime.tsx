import React from 'react';
import { FlightResultsDetails } from '../trip/results/ResultsInterfaces';
import Moment from 'react-moment';
import moment from 'moment';

interface FlightTimeProps {
  flights: Array<FlightResultsDetails>
}

class FlightTime extends React.Component<FlightTimeProps> {
  render() {
    const departureTime = moment(
      this.props.flights[0].departure_time.slice(0, this.props.flights[0].departure_time.length - 6)
    );
    const arrivalTime = moment(
      this.props.flights[this.props.flights.length - 1].arrival_time.slice(0, this.props.flights[0].arrival_time.length - 6)
    );
    const minutesDifference: number = this.props.flights.reduce((total: number, flightResult: FlightResultsDetails) => {
      return total += flightResult.flight_time;
    }, 0);
    return (
      <div className="col-sm-2">
        <div className="text-bold flight-preview-time">
          <Moment format="HH:mm">{departureTime}</Moment>
          <span> - </span>
          <Moment format="HH:mm">{arrivalTime}</Moment>
          {
            departureTime.hour() + minutesDifference / 60 > 24
              && <div className='plus-one-indicator'>+1</div>
          }
        </div>
        <p className="text-small">
          {
            Math.floor(minutesDifference / 60) + 'h ' +
            Math.round(60 * (minutesDifference / 60 % 1)) + 'm'
          }
        </p>
      </div>
    );
  }

}

export default FlightTime;