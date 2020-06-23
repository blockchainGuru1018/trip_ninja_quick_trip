import React from 'react';
import { baggageLabel } from '../../helpers/BaggageHelper';
import CardTravelIcon from '@material-ui/icons/CardTravel';

interface FlightBaggageProps {
  baggage: number
}

class FlightBaggage extends React.Component<FlightBaggageProps> {
  render() {
    return (
      <div className="col-sm-1 baggage-icon-container">
        <CardTravelIcon
          color="primary"
          fontSize="large"
          className='card-travel-icon'
        />
        <div className='baggage-amount-text'>
          {baggageLabel(this.props.baggage)}
        </div>
      </div>
    );
  }

}

export default FlightBaggage;