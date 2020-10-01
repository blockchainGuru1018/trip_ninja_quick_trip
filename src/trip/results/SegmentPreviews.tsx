import React from 'react';
import { Segment, FlightResultsDetails, ResultsDetails, Results } from './ResultsInterfaces';
import '../../index.css';
import SegmentPreview from './SegmentPreview';
import { updateActives, updateFareFamily, getTravelportBrands } from '../../actions/ResultsActions';
import { sortBySortOrder } from '../../helpers/SortHelper';
import { getFlightDetailsBySegment } from '../../helpers/FlightDetailsHelper';

interface SegmentPreviewsProps {
  segments: Array<Segment>;
  activeSegment?: Segment;
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
  getTravelportBrands?: typeof getTravelportBrands;
  trip: Results;
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
  
  getVirtualInterlineLinkedSegment = (currentSegment: Segment) => {
    return currentSegment.virtual_interline ?
      this.props.segments.find((segment: Segment) => (segment.option_id === currentSegment.option_id && segment.vi_position === 1) || undefined)
      : undefined;
  }

  setSegmentsHTML = () => {
    const shownSegments: Array<Segment> = this.props.sortOrder
      ? sortBySortOrder(this.props.segments, this.props.sortOrder ? this.props.sortOrder : 'best')
      : this.props.segments;
    return shownSegments.map((segment: Segment, index: number) => {
      const segmentFlightDetails: Array<FlightResultsDetails> = getFlightDetailsBySegment(segment, this.props.flightDetails);
      const linkedViSegment = this.getVirtualInterlineLinkedSegment(segment);
      console.log(linkedViSegment);
      const linkedViSegmentFlightDetails = linkedViSegment ? getFlightDetailsBySegment(linkedViSegment, this.props.flightDetails) : undefined;
      console.log(linkedViSegmentFlightDetails);
      return(
        <div key={index.toString()}>
          {(!segment.filtered || segment.status === 'active') && (segment.virtual_interline ? segment.vi_position === 0 : true)
            ? <SegmentPreview
              segment={segment}
              segments={this.props.segments}
              viLinkedSegment={linkedViSegment}
              index={index}
              key={index}
              segmentFlightDetails={segmentFlightDetails}
              viLinkedSegmentFlightDetails={linkedViSegmentFlightDetails}
              segmentSelect={this.props.segmentSelect}
              activeSegment={this.props.activeSegment}
              currency={this.props.currency}
              segmentOptionsIndex={this.props.segmentOptionsIndex}
              updateActives={this.props.updateActives}
              updateFareFamily={this.props.updateFareFamily}
              pathSequence={this.props.pathSequence}
              totalPrice={this.props.totalPrice}
              getTravelportBrands={this.props.getTravelportBrands}
              trip={this.props.trip}
            />
            : ''
          }
        </div>
      );
    });
  }
}

export default SegmentPreviews;
