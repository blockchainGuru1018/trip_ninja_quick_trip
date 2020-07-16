import React from 'react';
import { Segment, FlightResultsDetails, ResultsDetails , Results} from '../results/ResultsInterfaces';
import SegmentOriginDestination from '../../common/SegmentOriginDestination';
import FlightLogo from '../../common/FlightLogo';
import FlightTime from '../../common/FlightTime';
import SegmentBaggage from '../../common/SegmentBaggage';
import FlightStops from '../../common/FlightStops';
import FlightDetailsDrawer from './FlightDetailsDrawer';
import Moment from 'react-moment';
import { getFlightDetailsBySegment } from '../../helpers/FlightDetailsHelper';

interface ItineraryProps {
  resultsDetails: ResultsDetails;
  currency: string;
}

class Itinerary extends React.Component<ItineraryProps> {

  getSegmentDetails = (segment: Segment, segmentFlightDetails:Array<FlightResultsDetails> ) => {
    return(
      <div
        className="row segment-container" >
        <p className="segment-date">
          <Moment format="MMMM Do YYYY">{segmentFlightDetails[0].departure_time}</Moment>
        </p>
        <div className='row col-md-12'>
          <div className="row itinerary-segment col-md-12">
            <SegmentOriginDestination segment={segment} itineraryDisplay={true}/>
            <FlightLogo flights={segmentFlightDetails} itineraryDisplay={true}/>
            <FlightTime flights={segmentFlightDetails} itineraryDisplay={true}/>
            <FlightStops flights={segmentFlightDetails} />
            <SegmentBaggage baggage={segment.baggage.number_of_pieces}itineraryDisplay={true}/>
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
          <div className="row">
            <FlightDetailsDrawer 
              trip={trip}
              selectedTrip={selectedTrip}
              currency={this.props.currency}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Itinerary;
