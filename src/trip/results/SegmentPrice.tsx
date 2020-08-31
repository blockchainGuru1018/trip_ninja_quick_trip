import React from 'react';
import { Segment } from './ResultsInterfaces';
import { currencySymbol } from '../../helpers/CurrencySymbolHelper';

interface SegmentPriceProps {
  segment: Segment;
  currency: string;
  activeSegment?: Segment;
  totalPrice: number;
}

class SegmentPrice extends React.Component<SegmentPriceProps> {
  render() {
    const relativePrice: number = this.props.activeSegment
      ? this.props.segment.relativePrice! - this.props.activeSegment.relativePrice!
      : 0;
    return (
      <div className="col-sm-2 my-auto">
        <p className="text-bold text-center segment-price">{this.setRelativePriceString(Math.round(relativePrice))}</p>
        <p className='text-small text-center'>Total: {currencySymbol(this.props.currency)}{Math.round(this.props.totalPrice + relativePrice)}</p>
        <p className='text-small text-center'>Source: {this.props.segment.source} - {this.props.segment.credential_info.pcc}</p>
      </div>
    );
  }

  setRelativePriceString = (relativePrice: number) =>
    `${relativePrice >= 0 ? '+ ' : '- '} ${currencySymbol(this.props.currency)}${Math.abs(relativePrice)}`
}

export default SegmentPrice;