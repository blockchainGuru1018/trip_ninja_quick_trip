import React from 'react';
import { baggageLabel } from '../helpers/BaggageHelper';
import baggageIcon from '../assets/images/baggage_icon.svg';

interface SegmentBaggageProps {
  baggage: number
  itineraryDisplay?: boolean
}

class SegmentBaggage extends React.Component<SegmentBaggageProps> {
  render() {
    return (
      <div className={(this.props.itineraryDisplay ? 'col-sm-2' : 'col-sm-1') + ' my-auto baggage-icon-container'}>
        <img src={baggageIcon} alt="baggage-icon" className="baggage-icon my-auto"  />
        <div className='baggage-amount-text my-auto'>
          {baggageLabel(this.props.baggage)}
        </div>
      </div>
    );
  }
}

export default SegmentBaggage;