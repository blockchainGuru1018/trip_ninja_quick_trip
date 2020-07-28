import React from 'react';
import { Segment, FlightResultsDetails, ResultsDetails } from './ResultsInterfaces';
import '../../index.css';
import SegmentPreview from './SegmentPreview';
import { updateActives, updateFareFamily } from '../../actions/ResultsActions';
import { sortBySortOrder } from '../../helpers/SortHelper';
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
  sortOrder?: string;
  totalPrice: number;
}

class SegmentPreviews extends React.Component<SegmentPreviewsProps> {

  render() {
    return (
      <div>
        {this.setSegmentsHTML()}
      </div>
    );
  }

  getFlightDetailsBySegment = (segment: Segment): Array<FlightResultsDetails> =>
    segment.flights.map((flight: any) => {
      const filteredFlightDetails = this.props.flightDetails.filter(
        (flightDetails: FlightResultsDetails) =>
          flight.flight_detail_ref === flightDetails.reference
      );
      return filteredFlightDetails[0];
    });

  setSegmentsHTML = () => {
    const sortedSegments = this.props.sortOrder
      ? sortBySortOrder(this.props.segments, this.props.sortOrder)
      : this.props.segments;
    return sortedSegments.map((segment: Segment, index: number) => {
      const segmentFlightDetails: Array<FlightResultsDetails> = getFlightDetailsBySegment(segment, this.props.flightDetails);
      return(
        <SegmentPreview
          segment={segment}
          segments={sortedSegments}
          index={index}
          key={index}
          segmentFlightDetails={segmentFlightDetails}
          segmentSelect={this.props.segmentSelect}
          activeSegment={this.props.activeSegment}
          currency={this.props.currency}
          segmentOptionsIndex={this.props.segmentOptionsIndex}
          updateActives={this.props.updateActives}
          updateFareFamily={this.props.updateFareFamily}
          pathSequence={this.props.pathSequence}
          totalPrice={this.props.totalPrice}
        />
      );
    });
  }
}

export default SegmentPreviews;
