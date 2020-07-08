import React from 'react';
import { Segment, FlightResultsDetails, ResultsDetails } from './ResultsInterfaces';
import '../../index.css';
import SegmentPreview from './SegmentPreview';
import { updateActives, updateFareFamily } from '../../actions/ResultsActions';
import { getFlightDetailsBySegment } from '../../helpers/FlightDetailsHelper';

interface SegmentPreviewsProps {
  segments: Array<Segment>;
  activeSegment?: Segment
  flightDetails: Array<FlightResultsDetails>;
  currency: string;
  segmentSelect: boolean;
  updateActives?: typeof updateActives;
  segmentOptionsIndex?: number;
  resultsDetails?: ResultsDetails;
  updateFareFamily?: typeof updateFareFamily;
  pathSequence?: Array<string>;
}

class SegmentPreviews extends React.Component<SegmentPreviewsProps> {

  render() {
    return (
      <div>
        {this.setSegmentsHTML()}
      </div>
    );
  }

  getTotalPrice = () =>
    Array.from(this.props.resultsDetails!.activeSegments).reduce((total: number, activeSegment: any) =>
      total += activeSegment[1].price, 0);

  setSegmentsHTML = () => {
    const totalPrice: number = this.props.resultsDetails ? this.getTotalPrice() : 0;
    return this.props.segments.map((segment: Segment, index: number) => {
      const segmentFlightDetails: Array<FlightResultsDetails> = getFlightDetailsBySegment(segment, this.props.flightDetails);
      return(
        <SegmentPreview
          totalPrice={totalPrice}
          segment={segment}
          segments={this.props.segments}
          index={index}
          key={index}
          segmentFlightDetails={segmentFlightDetails}
          segmentSelect={this.props.segmentSelect}
          activeSegment={this.props.activeSegment}
          currency={this.props.currency}
          segmentOptionsIndex={this.props.segmentOptionsIndex}
          resultsDetails={this.props.resultsDetails}
          updateActives={this.props.updateActives}
          updateFareFamily={this.props.updateFareFamily}
          pathSequence={this.props.pathSequence}
        />
      );
    });
  }
}

export default SegmentPreviews;
