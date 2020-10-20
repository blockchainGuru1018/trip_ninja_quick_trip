import React from 'react';
import { FlightResultsDetails } from '../trip/results/ResultsInterfaces';
import Moment from 'react-moment';
import moment from 'moment';
import { withTranslation, WithTranslation } from 'react-i18next';

interface FlightTimeProps extends WithTranslation {
  flights: Array<FlightResultsDetails>
  itineraryDisplay?: boolean;
}

class FlightTime extends React.Component<FlightTimeProps> {
  render() {
    const departureTime = moment(
      this.props.flights[0].departure_time.slice(0, this.props.flights[0].departure_time.length - 6)
    );
    const arrivalTime = moment(
      this.props.flights[this.props.flights.length - 1].arrival_time.slice(0, this.props.flights[0].arrival_time.length - 6)
    );
    const minutesDifference: number = this.getMinutesDifference();

    return (
      <div className={(this.props.itineraryDisplay ? ' col-sm-3' : 'col-sm-2') + ' my-auto'}>
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
            Math.floor(minutesDifference / 60) + this.props.t("common.flightTime.hoursIndicator") +' ' +
            Math.round(60 * (minutesDifference / 60 % 1)) + this.props.t("common.flightTime.minutesIndicator")
          }
        </p>
      </div>
    );
  }

  getMinutesDifference = () => {
    return this.props.flights.reduce((total: number, flightResult: FlightResultsDetails, index: number) => {
      const layoverTime: number = index !== 0
        ? this.getLayoverTimeInMinutes(index, this.props.flights)
        : 0;
      return total += (flightResult.flight_time + layoverTime);
    }, 0);
  }

  getLayoverTimeInMinutes = (index: number, flightDetails: Array<FlightResultsDetails>) => {
    const arrivingFlightTime: Date = new Date(flightDetails[index - 1].arrival_time);
    const departingFlightTime: Date = new Date(flightDetails[index].departure_time);
    return moment(departingFlightTime).diff(moment(arrivingFlightTime), 'minutes');
  }
}

export default withTranslation('common')(FlightTime);
