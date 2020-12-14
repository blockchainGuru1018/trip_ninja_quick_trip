import React from 'react';
import { Segment, FlightResultsDetails, ResultsDetails, Results } from './ResultsInterfaces';
import '../../index.css';
import SegmentPreview from './SegmentPreview';
import PnrResultHeader from './PnrResultHeader';
import { updateActives, updateFareFamily, getTravelportBrands } from '../../actions/ResultsActions';
import { sortBySortOrder } from '../../helpers/SortHelper';
import { getFlightDetailsBySegment } from '../../helpers/FlightDetailsHelper';
import { cloneDeep } from 'lodash';
import { calculateDistributedMarkup } from '../../helpers/MarkupHelper';
import CancellationPolicy from '../../common/CancellationPolicy';
import SkeletonPreview from "../../common/SkeletonPreview";


interface SegmentPreviewsProps {
  segments: Array<Segment>;
  activeSegment?: Segment;
  flightDetails: Array<FlightResultsDetails>;
  currency: string;
  segmentSelect: boolean;
  orderByPnr: boolean;
  updateActives?: typeof updateActives;
  segmentOptionsIndex?: number;
  resultsDetails?: ResultsDetails;
  updateFareFamily?: typeof updateFareFamily;
  pathSequence?: Array<string>;
  sortOrder?: string;
  totalPrice: number;
  getTravelportBrands?: typeof getTravelportBrands;
  trip: Results;
  loading: boolean;
}

class SegmentPreviews extends React.Component<SegmentPreviewsProps> {
  static whyDidYouRender = true

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
      this.props.trip.segments[currentSegment.segment_position].find((segment: Segment) => (segment.vi_solution_id === currentSegment.vi_solution_id && segment.vi_position === 1) || undefined)
      : undefined;
  }

  sortItineraryByPNR = (segments: Array<Segment>) => {
    return segments.sort(function(a: Segment, b: Segment) {
      let segmentA = JSON.parse(a.itinerary_structure)[0].toString()+(a.vi_position ? a.vi_position : 0).toString()+(a.itinerary_id);
      let segmentB = JSON.parse(b.itinerary_structure)[0].toString()+(b.vi_position ? b.vi_position : 0).toString()+(b.itinerary_id);
      if (segmentA < segmentB) {
        return -1;
      }
      if (segmentA > segmentB) {
        return 1;
      }
      if (segmentA === segmentB) {
        return a.segment_position - b.segment_position;
      }
      return 0;
    });
  }

  getItineraryOrder = (segments: Array<Segment>) => {
    let segmentsList: Array<Segment> = cloneDeep(segments);
    segmentsList.forEach((segment: Segment) => {
      let viSegment = this.getVirtualInterlineLinkedSegment(segment);
      if (viSegment) {
        let newViSegment = cloneDeep(viSegment);
        segment.virtual_interline = false;
        newViSegment.virtual_interline = false;
        segmentsList.push(newViSegment);
      } 
    });
    segmentsList = this.sortItineraryByPNR(segmentsList);
    return segmentsList;
  }

  setSegmentsHTML = () => {
    let shownSegments: Array<Segment> = this.props.sortOrder
      ? sortBySortOrder(this.props.segments, this.props.sortOrder ? this.props.sortOrder : 'best')
      : this.props.segments;
    shownSegments = this.props.orderByPnr ? this.getItineraryOrder(shownSegments) : shownSegments;
    let itineraryNumber: number = 0;

    return shownSegments.map((segment: Segment, index: number) => {
      const segmentFlightDetails: Array<FlightResultsDetails> = getFlightDetailsBySegment(segment, this.props.flightDetails);
      const linkedViSegment = this.getVirtualInterlineLinkedSegment(segment);
      const linkedViSegmentFlightDetails = linkedViSegment ? getFlightDetailsBySegment(linkedViSegment, this.props.flightDetails) : undefined;
      const firstPositionInStructure = segment.segment_position === JSON.parse(segment.itinerary_structure)[0];

      let markup = segment.itinerary_markup > 0 ? segment.itinerary_markup : calculateDistributedMarkup(this.props.trip.markup, segment.price, this.props.totalPrice);
      let itineraryPrice: number = segment.price + markup;

      if (segment.vi_segment_base_price) {
        itineraryPrice = segment.vi_segment_base_price + segment.vi_segment_fees! + segment.vi_segment_taxes! + markup;
      }
      if (this.props.loading) {
        return (
          <SkeletonPreview segmentSelect={this.props.segmentSelect} orderByPnr={this.props.orderByPnr}/>
        );
      } else {
        return (
          <div key={index.toString()}>
            {this.props.orderByPnr && firstPositionInStructure &&
            <PnrResultHeader
              itineraryNumber={++itineraryNumber}
              price={itineraryPrice}
              currency={this.props.currency}
              segmentType={segment.itinerary_type}
              segmentCount={this.props.segments.length}
              structure={JSON.parse(segment.itinerary_structure)}
              segmentIsVi={segment.vi_solution_id ? true : false}
            />
            }
            {(!segment.filtered || segment.status === 'active') && (segment.virtual_interline ? segment.vi_position === 0 : true)
              ?
              <SegmentPreview
                segment={segment}
                segments={this.props.segments}
                viLinkedSegment={linkedViSegment}
                index={index}
                key={index}
                segmentFlightDetails={segmentFlightDetails}
                viLinkedSegmentFlightDetails={linkedViSegmentFlightDetails}
                orderByPnr={this.props.orderByPnr}
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
            {this.props.orderByPnr &&
            ((firstPositionInStructure && segment.itinerary_type === 'ONE_WAY') || (!firstPositionInStructure && segment.itinerary_type === 'OPEN_JAW')) &&
              <CancellationPolicy
                currency={this.props.currency}
                price={segment.vi_segment_base_price ? (segment.vi_segment_base_price + segment.vi_segment_taxes! + segment.vi_segment_fees!) : segment.price}
                segments={[segment]}
                tripTotal={false}
                tripMarkup={markup}
              />
            }
          </div>
        );
      }
    });
  }
}

export default SegmentPreviews;
