import React from 'react';
import { cityName } from '../helpers/CityNameHelper';

interface SelfTransferLabelProps {
  destinationName: string;
  layoverTime: number
}

function SelfTransferLabel (props: SelfTransferLabelProps) {
  return (
    <div className="row">
      <div className="col">
        <p className="self-transfer text-center">
          <span className="text-bold">Self Transfer in {cityName(props.destinationName)}. </span>
          <span>Layover: {props.layoverTime}</span>
        </p>
      </div>
    </div>
  );
}

export default SelfTransferLabel;