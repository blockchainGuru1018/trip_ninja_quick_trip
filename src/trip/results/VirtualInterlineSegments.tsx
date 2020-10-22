import React from 'react';
import { Segment, FlightResultsDetails, Results } from './ResultsInterfaces';
import SelfTransferLabel from '../../common/SelfTransferLabel';
import VirtualInterlineSegment from './VirtualInterlineSegment';
import { updateActives, updateFareFamily, getTravelportBrands } from '../../actions/ResultsActions';


interface VirtualInterlineSegmentsProps {
  index: number;
  segment: Segment;
  segments: Array<Segment>;
  viLinkedSegment?: Segment;
  segmentFlightDetails: Array<FlightResultsDetails>;
  viLinkedSegmentFlightDetails?: Array<FlightResultsDetails>;
  segmentSelect: boolean;
  activeSegment?: Segment;
  segmentOptionsIndex?: number;
  currency: string;
  updateActives?: typeof updateActives;
  updateFareFamily?: typeof updateFareFamily;
  getTravelportBrands?: typeof getTravelportBrands;
  pathSequence?: Array<string>;
  totalPrice: number;
  trip: Results;
}

class VirtualInterlineSegments extends React.Component<VirtualInterlineSegmentsProps> {

  render() {
    let flightDetails = [
      this.props.segmentFlightDetails,
      this.props.viLinkedSegmentFlightDetails && this.props.segment.virtual_interline
        ? this.props.viLinkedSegmentFlightDetails
        : []
    ];

    return(
      <div>        
        <div className="vi-segment-container">
          <VirtualInterlineSegment
            segment={this.props.segment}
            index={1000}
            key={1000}
            segmentFlightDetails={this.props.segmentFlightDetails}
            segmentSelect={this.props.segmentSelect}
            activeSegment={this.props.activeSegment}
            currency={this.props.currency}
            segmentOptionsIndex={this.props.segmentOptionsIndex}
            updateActives={this.props.updateActives}
            updateFareFamily={this.props.updateFareFamily}
            totalPrice={this.props.totalPrice}
            getTravelportBrands={this.props.getTravelportBrands}
            trip={this.props.trip}
          />
          <div className="row">
            <div className="col-xl-11 offset-xl-1 no-pad-right">
              <SelfTransferLabel 
                destinationName={this.props.segment.destination_name}
                firstFlight={flightDetails[0][flightDetails[0].length - 1]}
                secondFlight={flightDetails[1][0]}
                resultsDisplay={true}
              />
            </div>
          </div>
          { this.props.viLinkedSegment && this.props.viLinkedSegmentFlightDetails &&
            <VirtualInterlineSegment
              segment={this.props.viLinkedSegment}
              index={1001}
              key={1001}
              segmentFlightDetails={this.props.viLinkedSegmentFlightDetails}
              segmentSelect={this.props.segmentSelect}
              activeSegment={this.props.activeSegment}
              currency={this.props.currency}
              segmentOptionsIndex={this.props.segmentOptionsIndex}
              updateActives={this.props.updateActives}
              updateFareFamily={this.props.updateFareFamily}
              totalPrice={this.props.totalPrice}
              getTravelportBrands={this.props.getTravelportBrands}
              trip={this.props.trip}
            />
          }
        </div>
      </div>
    );
  }
}

export default VirtualInterlineSegments;
