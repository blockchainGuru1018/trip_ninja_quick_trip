import React from 'react';
import { FlightResultsDetails } from '../trip/results/ResultsInterfaces';
import { getTimeDifference } from '../helpers/DateHelpers';
import { withTranslation, WithTranslation } from 'react-i18next';

interface FlightStopsProps extends WithTranslation {
  flights: Array<FlightResultsDetails>
}

class FlightStops extends React.Component<FlightStopsProps> {
  render() {
    return (
      <div className='col-sm-2 my-auto'>
        {
          this.props.flights.length > 1
            ? <div className="text-bold">{this.props.flights.length - 1} {this.props.flights.length > 2 ? this.props.t("common.flightStops.stopsPlural") : this.props.t("common.flightStops.stop")}</div>
            : <p className="text-bold">{this.props.t("common.flightStops.direct")}</p>
        }
        {
          this.props.flights.length > 1
            && this.calculateHoursBetween(this.props.flights).map((stopOver: any, index: number) =>
              <div key={"stop-over-times-" + index} className='text-small'>
                {Object.keys(stopOver)[0] + ": " + Object.values(stopOver)[0]}
              </div>
            )
        }
      </div>
    );
  }

  calculateHoursBetween = (flights: Array<FlightResultsDetails>) => {
    let stopOverTimeDetails: Array<any> = [];
    flights.forEach((flight: FlightResultsDetails, index: number) => {
      if (index === flights.length - 1) {
        return '';
      } else {
        const stopOverTime = getTimeDifference(
          new Date(flight.arrival_time), new Date(flights[index + 1].departure_time)
        );
        stopOverTimeDetails.push({[flight.destination]: stopOverTime});
      }
    });
    return stopOverTimeDetails;
  }
}

export default withTranslation('common')(FlightStops);
