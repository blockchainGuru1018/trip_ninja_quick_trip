import React from 'react';
import { Segment, FlightResultsDetails, ResultsDetails , Results} from '../results/ResultsInterfaces';
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

  //key={this.props.index.toString()}

  getSegmentDetails = (segment: Segment, segmentFlightDetails:Array<FlightResultsDetails> ) => {
    return(
      <div
        className="row segment-container" >
        <div className={'row col-md-12'}>
          <div className="row segment col-md-12">
            <SegmentOriginDestination segment={segment} departure={segmentFlightDetails[0].departure_time}/>
            <FlightLogo flights={segmentFlightDetails} />
            <FlightTime flights={segmentFlightDetails} />
            <FlightStops flights={segmentFlightDetails} />
            <SegmentBaggage baggage={segment.baggage.number_of_pieces}/>
          </div>
        </div>
      </div>
    );
  }
  
  getActiveSegments = (trip: Results) =>
    trip.segments.map((segments: Array<Segment>) =>
      segments.find((object: Segment) => object.status === 'active') || segments[0]
    );

  //TODO: Move to a helper as it's used in SegmentPreviews.tsx too
  getFlightDetailsBySegment = (segment: Segment, flightDetails: Array<FlightResultsDetails>): Array<FlightResultsDetails> =>
    segment.flights.map((flight: any) => {
      const filteredFlightDetails = flightDetails.filter(
        (flightDetails: FlightResultsDetails) =>
          flight.flight_detail_ref === flightDetails.reference
      );
      return filteredFlightDetails[0];
    });

  displayItinerarySegments = (selectedTrip: Array<Segment>, trip: Results) => {
    return selectedTrip.map((segment: Segment, index: number) => {
      const segmentFlightDetails: Array<FlightResultsDetails> = this.getFlightDetailsBySegment(segment, trip.flight_details);
      return(this.getSegmentDetails(segment, segmentFlightDetails))
    })
  }
  

  render() {
    const trip = this.props.resultsDetails.tripType === 'flexTripResults'
      ? this.props.resultsDetails.flexTripResults! : this.props.resultsDetails.fareStructureResults!;

    let selectedTrip: Array<Segment> = this.getActiveSegments(trip);

    

    return (
      <div>
        <h5>Itinerary</h5>
        <div className="book-container">
          <p>Flights go here!</p>
            {this.displayItinerarySegments(selectedTrip, trip)}
        </div>
      </div>
    );
  }

  

}

export default Itinerary;
