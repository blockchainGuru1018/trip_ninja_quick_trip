import React from 'react';
import { Segment } from './ResultsInterfaces';
import { currencySymbol } from '../../helpers/CurrencySymbolHelper';

interface SegmentPriceProps {
  segment: Segment;
  currency: string;
  activeSegment?: Segment;
}

class SegmentPrice extends React.Component<SegmentPriceProps> {
  render() {
    const relativePrice: number = this.props.activeSegment
      ? this.props.segment.relativePrice! - this.props.activeSegment.relativePrice!
      : 0;

    return (
      <div className="col-sm-2">
        <p className="text-bold text-center segment-price">{this.setRelativePriceString(relativePrice)}</p>
      </div>
    );
  }

  setRelativePriceString = (relativePrice: number) =>
    `${relativePrice >= 0 ? '+ ' : '- '} ${currencySymbol(this.props.currency)}${Math.abs(relativePrice).toFixed()}`
}

export default SegmentPrice;