import React from 'react';
import { Segment, FlightResultsDetails, ResultsDetails } from '../results/ResultsInterfaces';
import { PricingDetails } from '../results/PricingInterfaces';
import SegmentOriginDestination from '../results/SegmentOriginDestination';
import FlightLogo from '../results/FlightLogo';
import FlightTime from '../results/FlightTime';
import SegmentBaggage from '../results/SegmentBaggage';
import FlightStops from '../results/FlightStops';
import FlightTypes from '../results/FlightTypes';

interface ItineraryProps {
  pricingDetails: PricingDetails;
  resultsDetails: ResultsDetails;
}

class Itinerary extends React.Component<ItineraryProps> {

  getSegmentDetails = (segment: Segment) => {
    return(
      <div
        className="row segment-container" key={this.props.index.toString()}>
        <div className={'row ' + (this.props.segmentSelect ? 'col-md-12' : 'col-md-10')}>
          <div className="row segment col-md-12">
            <SegmentOriginDestination segment={this.props.segment} departure={this.props.segmentFlightDetails[0].departure_time}/>
            <FlightLogo flights={this.props.segmentFlightDetails} />
            <FlightTime flights={this.props.segmentFlightDetails} />
            <FlightStops flights={this.props.segmentFlightDetails} />
            <FlightTypes segment={this.props.segment} />
            <SegmentBaggage baggage={this.props.segment.baggage.number_of_pieces}/>
            }
        </div>
      </div>
    );
  } 

  }

  render() {
    const trip = this.props.resultsDetails.tripType === 'flexTripResults'
      ? this.props.resultsDetails.flexTripResults! : this.props.resultsDetails.fareStructureResults!;

    let selectedTrip: Array<Segment> = getActiveSegments(trip);

    return (
      <div>
        <h5>Itinerary</h5>
        <div className="book-container">
          <p>Flights go here!</p>
          <getSegmentDetails
            segment = {this.props.selectedTrip[0]};
          />
        </div>
      </div>
    );
  }


}

export default Itinerary;
