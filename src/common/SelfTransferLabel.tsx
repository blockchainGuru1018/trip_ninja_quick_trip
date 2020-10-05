import React from 'react';
import { cityName } from '../helpers/CityNameHelper';
import { FlightResultsDetails } from '../trip/results/ResultsInterfaces';
import { getTimeDifference } from '../helpers/DateHelpers';
import { useTranslation } from 'react-i18next';

interface SelfTransferLabelProps {
  destinationName: string;
  flights: Array<FlightResultsDetails>
}

export default function SelfTransferLabel (props: SelfTransferLabelProps) {
  const [ t ] = useTranslation('common');

  return (
    <div className="row">
      <div className="col">
        <p className="self-transfer text-center">
          <span className="text-bold">{t('common.selfTransferLabel.selfTransferIn')} {cityName(props.destinationName)}. </span>
          <span>{t('common.selfTransferLabel.layover')}: {getLayoverTime(props.flights)}</span>
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
