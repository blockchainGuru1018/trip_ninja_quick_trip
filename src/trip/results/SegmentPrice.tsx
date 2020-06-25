import React from 'react';
import { Segment } from './ResultsInterfaces';
import { currencySymbol } from '../../helpers/CurrencySymbolHelper';


interface SegmentPriceProps {
  segment: Segment
  currency: string;
}

class SegmentPrice extends React.Component<SegmentPriceProps> {
  render() {
    return (
      <div className="col-sm-2">
        <p className="text-bold text-center segment-price">{currencySymbol(this.props.currency)}{this.props.segment.price.toFixed()}</p>
      </div>
    );
  }

}

export default SegmentPrice;