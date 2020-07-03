import React from 'react';
import { Segment, FlightResultsDetails, ResultsDetails } from './ResultsInterfaces';
import '../../index.css';
import SegmentPreview from './SegmentPreview';
import { updateActives, updateFareFamily } from '../../actions/ResultsActions';


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

  getTotalPrice = () =>
    Array.from(this.props.resultsDetails!.activeSegments).reduce((total: number, activeSegment: any) =>
      total += activeSegment[1].price, 0);

  setSegmentsHTML = () => {
    const totalPrice: number = this.props.resultsDetails ? this.getTotalPrice() : 0;
    return this.props.segments.map((segment: Segment, index: number) => {
      const segmentFlightDetails: Array<FlightResultsDetails> = this.getFlightDetailsBySegment(segment);
      return(
        <SegmentPreview
          totalPrice={totalPrice}
          segment={segment}
          segments={this.props.segments}
          index={index}
          segmentFlightDetails={segmentFlightDetails}
          segmentSelect={this.props.segmentSelect}
          activeSegment={this.props.activeSegment}
          currency={this.props.currency}
          segmentOptionsIndex={this.props.segmentOptionsIndex}
          resultsDetails={this.props.resultsDetails}
          updateActives={this.props.updateActives}
          updateFareFamily={this.props.updateFareFamily}
        />
      );
    });
  }
}

export default SegmentPreviews;
