import React from 'react';
import { cityName } from '../helpers/CityNameHelper';
import { FlightResultsDetails } from '../trip/results/ResultsInterfaces';
import { getTimeDifference } from '../helpers/DateHelpers';

interface SelfTransferLabelProps {
  destinationName: string;
  flights: Array<FlightResultsDetails>
}

function SelfTransferLabel (props: SelfTransferLabelProps) {
  return (
    <div className="row">
      <div className="col">
        <p className="self-transfer text-center">
          <span className="text-bold">Self Transfer in {cityName(props.destinationName)}. </span>
          <span>Layover: {getLayoverTime(props.flights)}</span>
        </p>
      </div>
    </div>
  );
}

const getLayoverTime = (flights: Array<FlightResultsDetails>) => {
  const arrivingFlightTime: Date = new Date(flights[0].arrival_time);
  const departingFlightTime: Date = new Date(flights[1].departure_time);
  return getTimeDifference(arrivingFlightTime, departingFlightTime);
};

export default SelfTransferLabel;