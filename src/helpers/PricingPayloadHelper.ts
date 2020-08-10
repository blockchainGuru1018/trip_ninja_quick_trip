
import { AuthDetails } from '../auth/AuthInterfaces';
import { ResultsDetails, Results, Segment, FlightResult} from '../trip/results/ResultsInterfaces';
import { PricingRequestItinerary, FlightSegment, Flight, Credentials, PricingRequestInterface } from '../trip/results/PricingInterfaces';
import moment from 'moment';


//export const createPricingPayload = (brandedFaresRequest: boolean) => {
//  pricingPayload: PricingRequestInterface = {
//    trip_id: trip.trip_id,
//    trip_type: this.props.resultsDetails.tripType === "fareStructureResults" ? "fare_structure" : "flex_trip" ,
//    currency: this.props.currency,
//    price: this.props.totalPrice,
//    markup: 0,
//    itineraries: createItinerariesPayload(trip),
//    pseudo_price_confirm: brandedFaresRequest
//  };
//};

export const createItinerariesPayload = (trip: Results, selectedTrip: Array<Segment>, authDetails: AuthDetails) => {
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
        segments: createSegmentsPayload(trip, selectedTrip, itineraryStructure),
      });
      itinerariesCounter += 1;
    }
  });

  return itinerariesPayload;
};

const createSegmentsPayload = (trip: Results, selectedTrip: Array<Segment>, itineraryStructure:Array<any>) => {
  let segmentsPayload: Array<FlightSegment> = itineraryStructure.map(segment_index =>
    ({
      segment_id: segment_index,
      flights: createFlightsPayload(trip, selectedTrip, segment_index)
    }));
  return segmentsPayload;
};

const createFlightsPayload = (trip: Results, selectedTrip: Array<Segment>, segment_index: any) => {
  let flightsPayload : Array<Flight> = [];
  selectedTrip[segment_index].flights.forEach((flightResult: FlightResult) => {
    const flightDetail = trip.flight_details.find(flight => flight.reference === flightResult.flight_detail_ref);
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
        brand_identifier: "",
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