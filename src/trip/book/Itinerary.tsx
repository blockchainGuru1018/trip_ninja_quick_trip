import React from 'react';
import { Segment, FlightResultsDetails, ResultsDetails , Results} from '../results/ResultsInterfaces';
import SegmentOriginDestination from '../../common/SegmentOriginDestination';
import FlightLogo from '../../common/FlightLogo';
import FlightTime from '../../common/FlightTime';
import SegmentBaggage from '../../common/SegmentBaggage';
import FlightStops from '../../common/FlightStops';
import SelfTransferLabel from '../../common/SelfTransferLabel';
import FlightDetailsDrawer from './FlightDetailsDrawer';
import { getFlightDetailsBySegment } from '../../helpers/FlightDetailsHelper';
import { withTranslation, WithTranslation } from 'react-i18next';
import i18n from '../../i18n';
import { dateLocaleMap } from '../../localeMap';
import { format } from 'date-fns';
import { getFullTripWithVi } from "../../helpers/VirtualInterliningHelpers";

interface ItineraryProps extends WithTranslation {
  resultsDetails: ResultsDetails;
  currency: string;
}

class Itinerary extends React.Component<ItineraryProps> {

  getSegmentDetails = (segment: Segment, segmentFlightDetails: Array<FlightResultsDetails>, index: number, nextSegmentFlightDetails?:  Array<FlightResultsDetails>) => {
    return(
      <div className="segment-container" key={index.toString()}>
        {segment.vi_position !== 1 &&
        <p className="segment-date">
          {format(new Date(segmentFlightDetails[0].departure_time), this.props.t("book.itinerary.dateFormat"), {locale:dateLocaleMap[i18n.language]})}
        </p>
        }
        <div className='row col-md-12'>
          <div className="row itinerary-segment col-md-12">
            <SegmentOriginDestination segment={segment} itineraryDisplay={true}/>
            <FlightLogo flights={segmentFlightDetails} itineraryDisplay={true}/>
            <FlightTime flights={segmentFlightDetails} itineraryDisplay={true}/>
            <FlightStops flights={segmentFlightDetails} viParent={false}/>
            <SegmentBaggage baggage={segment.baggage.number_of_pieces} itineraryDisplay={true}/>
          </div>
        </div>
        {segment.virtual_interline && segment.vi_position === 0 && nextSegmentFlightDetails &&
          <SelfTransferLabel 
            destinationName={segment.destination_name}
            firstFlight={segmentFlightDetails[0]}
            secondFlight={nextSegmentFlightDetails[0]}
          />
        }
      </div>
    );
  }
  
  getActiveSegments = (trip: Results) => {
    let activeSegments = [...this.props.resultsDetails.activeSegments.values()];
    const fullTripWithVi: Array<Segment> = getFullTripWithVi(activeSegments, trip);
    return fullTripWithVi;
  };


  displayItinerarySegments = (selectedTrip: Array<Segment>, trip: Results) => {
    return selectedTrip.map((segment: Segment, index: number) => {
      const segmentFlightDetails: Array<FlightResultsDetails> = getFlightDetailsBySegment(segment, trip.flight_details);
      return(this.getSegmentDetails(segment, segmentFlightDetails, index, this.getNextViSegmentFlights(segment, selectedTrip, trip)));
    });
  }

  getNextViSegmentFlights = (segment: Segment, selectedTrip: Array<Segment>, trip: Results) => {
    if (segment.virtual_interline && segment.vi_position === 0) {
      let linkedViSegment = selectedTrip.find((linkedSegment: Segment) => linkedSegment.vi_solution_id === segment.vi_solution_id && linkedSegment.vi_position === 1) || segment;
      return getFlightDetailsBySegment(linkedViSegment, trip.flight_details);
    }
  };

  render() {
    const trip = this.props.resultsDetails.tripType === 'flexTripResults'
      ? this.props.resultsDetails.flexTripResults! : this.props.resultsDetails.fareStructureResults!;
    let selectedTrip: Array<Segment> = this.getActiveSegments(trip);
    return (
      <div>
        <h5>{this.props.t("book.itinerary.title")}</h5>
        <div className="book-container">
          {this.displayItinerarySegments(selectedTrip, trip)}
          <div className="row flight-details-btn">
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

export default withTranslation('common')(Itinerary);
