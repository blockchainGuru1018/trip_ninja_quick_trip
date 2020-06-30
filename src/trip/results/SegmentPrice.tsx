import React from 'react';
import { Segment } from './ResultsInterfaces';
import { currencySymbol } from '../../helpers/CurrencySymbolHelper';


interface SegmentPriceProps {
  segment: Segment;
  currency: string;
  activeSegmentPrice: number;
}

class SegmentPrice extends React.Component<SegmentPriceProps> {
  render() {
    return (
      <div className="col-sm-2">
        <p className="text-bold text-center segment-price">{this.calculateRelativePrice(this.props.segment.price)}</p>
      </div>
    );
  }

  calculateRelativePrice = (price: number) => {
    let relativePrice = 0;
    if (this.props.segment.itinerary_type === 'ONE_WAY') {
      relativePrice = price - this.props.activeSegmentPrice;
    } else {
      // Do openjaw magic
    }
    return (relativePrice >= 0 ? '+ ' : '- ') + currencySymbol(this.props.currency) + Math.abs(relativePrice).toFixed(); //set to absolute value
  }

}

export default SegmentPrice;