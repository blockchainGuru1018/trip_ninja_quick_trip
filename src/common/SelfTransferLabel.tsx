import React from 'react';
import { cityName } from '../helpers/CityNameHelper';
import { FlightResultsDetails } from '../trip/results/ResultsInterfaces';
import { getLayoverTime } from '../helpers/DateHelpers';
import { useTranslation } from 'react-i18next';

interface SelfTransferLabelProps {
  destinationName: string;
  firstFlight: FlightResultsDetails
  secondFlight: FlightResultsDetails
  resultsDisplay: boolean
}

export default function SelfTransferLabel (props: SelfTransferLabelProps) {
  const [ t ] = useTranslation('common');
  return (
    <div className="row">
      <div className="col">
        <p className="self-transfer text-center">
          <span className="text-bold">{t('common.selfTransferLabel.selfTransferIn')} {cityName(props.destinationName)}. </span>
          <span>{t('common.selfTransferLabel.layover')}: {getLayoverTime(props.firstFlight, props.secondFlight)}</span>
        </p>
      </div>
    </div>
  );
}

