import React from 'react';
import { baggageLabel } from '../helpers/BaggageHelper';
import CardTravelIcon from '@material-ui/icons/CardTravel';

interface SegmentBaggageProps {
  baggage: number
  offsetSpacing?: boolean
}

class SegmentBaggage extends React.Component<SegmentBaggageProps> {
  render() {
    return (
      <div className={this.props.offsetSpacing ? 'col-sm-1 baggage-icon-container offset-sm-1' : 'col-sm-1 baggage-icon-container'}>
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

export default SegmentBaggage;