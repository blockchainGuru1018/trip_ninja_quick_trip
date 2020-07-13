import React from 'react';
import { Segment, FlightResultsDetails, ResultsDetails, Results} from '../results/ResultsInterfaces';
import SegmentOriginDestination from '../results/SegmentOriginDestination';
import FlightLogo from '../results/FlightLogo';
import FlightTime from '../results/FlightTime';
import SegmentBaggage from '../results/SegmentBaggage';
import FlightStops from '../results/FlightStops';
import Moment from 'react-moment';
import { getFlightDetailsBySegment } from '../../helpers/FlightDetailsHelper';

interface ItineraryProps {
  resultsDetails: ResultsDetails;
}

class Itinerary extends React.Component<ItineraryProps> {

  getSegmentDetails = (segment: Segment, segmentFlightDetails:Array<FlightResultsDetails> ) => {
    return(
      <div
        className="row segment-container" >
        <p className="segment-date">
          <Moment format="MMMM Do YYYY">{segmentFlightDetails[0].departure_time}</Moment>
        </p>
        <div className={'row col-md-12'}>
          <div className="row itinerary-segment col-md-12">
            <SegmentOriginDestination segment={segment}/>
            <FlightLogo flights={segmentFlightDetails} smallerSize={true}/>
            <FlightTime flights={segmentFlightDetails} />
            <FlightStops flights={segmentFlightDetails} offsetSpacing={true}/>
            <SegmentBaggage baggage={segment.baggage.number_of_pieces} offsetSpacing={true}/>
          </div>
        </div>
      </div>
    );
  }
  
  getActiveSegments = (trip: Results) =>
    trip.segments.map((segments: Array<Segment>) =>
      segments.find((object: Segment) => object.status === 'active') || segments[0]
    );


  displayItinerarySegments = (selectedTrip: Array<Segment>, trip: Results) => {
    return selectedTrip.map((segment: Segment) => {
      const segmentFlightDetails: Array<FlightResultsDetails> = getFlightDetailsBySegment(segment, trip.flight_details);
      return(this.getSegmentDetails(segment, segmentFlightDetails));
    });
  }


  render() {
    const trip = this.props.resultsDetails.tripType === 'flexTripResults'
      ? this.props.resultsDetails.flexTripResults! : this.props.resultsDetails.fareStructureResults!;
    let selectedTrip: Array<Segment> = this.getActiveSegments(trip);
    return (
      <div>
        <h5>Itinerary</h5>
        <div className="book-container">
          {this.displayItinerarySegments(selectedTrip, trip)}
        </div>
      </div>
    );
  }
}

export default Itinerary;
