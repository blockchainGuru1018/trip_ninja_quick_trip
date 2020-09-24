import React from 'react';
import { Segment, FlightResult } from '../trip/results/ResultsInterfaces';
import { withTranslation, WithTranslation } from 'react-i18next';

interface FlightTypesProps extends WithTranslation {
  segment: Segment
}

export class FlightTypes extends React.Component<FlightTypesProps> {
  render() {
    return (
      <div className="col-sm-2 my-auto">
        <p className="text-bold">{this.props.segment.fare_type}</p>
        <p className="text-small">{this.getFlightTypes(this.props.segment.flights)}</p>
      </div>
    );
  }

  getFlightTypes = (flightResults: Array<FlightResult>) =>
    flightResults.reduce((total: string, flightResult: FlightResult, index: number) => {
      total += flightResult.booking_code;
      if (index !== flightResults.length - 1) {
        total += ', ';
      } else {
        return total += ' ' + this.props.t("common.flightTypes.class");
      }
      return total;
    }, '')
}

export default withTranslation('common')(FlightTypes);
