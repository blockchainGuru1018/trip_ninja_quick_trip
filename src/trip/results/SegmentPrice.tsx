import React from 'react';
import { Segment } from './ResultsInterfaces';
import { currencySymbol } from '../../helpers/CurrencySymbolHelper';


interface SegmentPriceProps {
  segment: Segment;
  currency: string;
  relativePrice: number;
}

class SegmentPrice extends React.Component<SegmentPriceProps> {
  render() {
    return (
      <div className="col-sm-2">
        <p className="text-bold text-center segment-price">{this.props.relativePrice}</p>
      </div>
    );
  }

  setRelativePriceString = () =>
    this.props.relativePrice >= 0 ? '+ ' : '- ' + 
    currencySymbol(this.props.currency) +
    Math.abs(this.props.relativePrice).toFixed();


}

export default SegmentPrice;