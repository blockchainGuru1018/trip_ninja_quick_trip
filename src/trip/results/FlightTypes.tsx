import React from 'react';
import { Segment, FlightResult } from './ResultsInterfaces';

interface FlightTypesProps {
  segment: Segment
}

class FlightTypes extends React.Component<FlightTypesProps> {
  render() {
    return (
      <div className="col-sm-2">
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
        return total += ' Class';
      }
      return total;
    }, '')
}

export default FlightTypes;