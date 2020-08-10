import React from 'react';
import { Segment, FlightResultsDetails, ResultsDetails, Results } from './ResultsInterfaces';
import '../../index.css';
import SegmentPreview from './SegmentPreview';
import { updateActives, updateFareFamily, setBrandedFaresInfo } from '../../actions/ResultsActions';
import { sortBySortOrder } from '../../helpers/SortHelper';
import { getFlightDetailsBySegment } from '../../helpers/FlightDetailsHelper';
import { priceFlights } from '../../actions/PricingActions';
import { AuthDetails } from '../../auth/AuthInterfaces';

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
  priceFlights: typeof priceFlights;
  pathSequence?: Array<string>;
  sortOrder?: string;
  totalPrice: number;
  authDetails: AuthDetails;
  setBrandedFaresInfo?: typeof setBrandedFaresInfo;
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

  setSegmentsHTML = () => {
    const shownSegments: Array<Segment> = this.props.sortOrder
      ? sortBySortOrder(this.props.segments, this.props.sortOrder ? this.props.sortOrder : 'best')
      : this.props.segments;
    return shownSegments.map((segment: Segment, index: number) => {
      const segmentFlightDetails: Array<FlightResultsDetails> = getFlightDetailsBySegment(segment, this.props.flightDetails);
      return(
        <div key={index.toString()}>
          {!segment.filtered || segment.status === 'active'
            ? <SegmentPreview
              segment={segment}
              segments={this.props.segments}
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
              priceFlights={this.props.priceFlights}
              authDetails={this.props.authDetails}
              setBrandedFaresInfo={this.props.setBrandedFaresInfo}
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
