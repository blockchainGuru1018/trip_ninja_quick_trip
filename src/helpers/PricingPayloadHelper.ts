
import { AuthDetails } from '../auth/AuthInterfaces';
import { Segment, FlightResult, FlightResultsDetails} from '../trip/results/ResultsInterfaces';
import { PricingRequestItinerary, FlightSegment, Flight, Credentials } from '../trip/results/PricingInterfaces';
import moment from 'moment';


export const createItinerariesPayload = (flightDetails: Array<FlightResultsDetails>, selectedTrip: Array<Segment>, authDetails: AuthDetails) => {
  let itinerariesPayload : Array<PricingRequestItinerary> = [];
  let itinerariesCounter = 1;
  selectedTrip.forEach((itineraryElement: Segment) => {
    const itineraryStructure = JSON.parse(itineraryElement.itinerary_structure);  
    if (itineraryElement.segment_position === itineraryStructure[0]) {
      itinerariesPayload.push({
        itinerary_reference: itinerariesCounter,
        traveller_list: itineraryElement.priced_passengers,
        plating_carrier: itineraryElement.plating_carrier,
        credentials: createCredentialsPayload(itineraryElement.source, authDetails),
        itinerary_type: itineraryElement.itinerary_type.toLowerCase(),
        segments: createSegmentsPayload(flightDetails, selectedTrip, itineraryStructure),
      });
      itinerariesCounter += 1;
    }
  });

  return itinerariesPayload;
};

const createSegmentsPayload = (flightDetails: Array<FlightResultsDetails>, selectedTrip: Array<Segment>, itineraryStructure:Array<any>) => {
  let segmentsPayload: Array<FlightSegment> = itineraryStructure.map(segmentIndex =>
    ({
      segment_id: segmentIndex,
      flights: createFlightsPayload(flightDetails, selectedTrip, segmentIndex)
    }));
  return segmentsPayload;
};

const createFlightsPayload = (flightDetails: Array<FlightResultsDetails>, selectedTrip: Array<Segment>, segmentIndex: any) => {
  let flightsPayload : Array<Flight> = [];

  selectedTrip[segmentIndex].flights.forEach((flightResult: FlightResult) => {
    const flightDetail = flightDetails.find(flight => flight.reference === flightResult.flight_detail_ref);
    if (flightDetail) {
      flightsPayload.push({
        key: flightResult.flight_detail_ref,
        origin: flightDetail.origin,
        origin_name: flightDetail.origin_name,
        destination: flightDetail.destination,
        destination_name: flightDetail.destination_name,
        booking_code: flightResult.booking_code,
        cabin_class: flightResult.cabin_class,
        carrier: flightDetail.carrier,
        flight_time: flightDetail.flight_time,
        flight_number: flightDetail.flight_number,
        departure_time: moment(flightDetail.departure_time).format('YYYY-MM-DDTHH:mm:ssZ'),
        arrival_time: moment(flightDetail.arrival_time).format('YYYY-MM-DDTHH:mm:ssZ'),
        brand_identifier: flightResult.brand_identifier,
      });
    }
  });
  return flightsPayload;
};

const createCredentialsPayload = (source: string, authDetails: AuthDetails) => {
  const credentialsPayload: Credentials = {
    data_source: source,
    provider: authDetails.provider,
    pcc: authDetails.pcc
  };
  return credentialsPayload;
};