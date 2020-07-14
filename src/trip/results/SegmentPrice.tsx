import React from 'react';
import { Segment, ResultsDetails } from './ResultsInterfaces';
import { currencySymbol } from '../../helpers/CurrencySymbolHelper';
import { updateActiveSegments } from '../../helpers/CompatibilityHelpers';


interface SegmentPriceProps {
  segment: Segment;
  currency: string;
  resultsDetails: ResultsDetails;
  activeSegment?: Segment;
  segmentOptionsIndex: number;
  totalPrice: number;
}

class SegmentPrice extends React.Component<SegmentPriceProps> {
  render() {
    const relativePrice: number = this.props.activeSegment
      ? this.props.resultsDetails
        ? this.setIncompatibleRelativePrice(this.props.segment)
        : this.setCompatibleRelativePrice(this.props.segment, this.props.activeSegment)
      : 0;

    return (
      <div className="col-sm-2 my-auto">
        <p className="text-bold text-center segment-price">{this.setRelativePriceString(relativePrice)}</p>
      </div>
    );
  }

  setIncompatibleRelativePrice = (segment: Segment) => {
    // This isnt comparing total price
    const dummyActives = updateActiveSegments(
      this.props.resultsDetails, {segmentOptionIndex: this.props.segmentOptionsIndex, segmentItineraryRef: segment.itinerary_id}
    );
    return Array.from(dummyActives.activeSegments).reduce((total: number, activeSegment: any) =>
      total += activeSegment[1].price, 0
    ) - this.props.totalPrice;
  }

  setCompatibleRelativePrice = (segment: Segment, activeSegment: Segment) => {
    return segment.price - activeSegment.price;
  }

  setRelativePriceString = (relativePrice: number) =>
    `${relativePrice >= 0 ? '+ ' : '- '} ${currencySymbol(this.props.currency)}${Math.abs(relativePrice).toFixed()}`
}

export default SegmentPrice;