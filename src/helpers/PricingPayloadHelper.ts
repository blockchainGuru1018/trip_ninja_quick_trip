
import { Segment, FlightResult, FlightResultsDetails, Results } from '../trip/results/ResultsInterfaces';
import { PricingRequestItinerary, FlightSegment, Flight } from '../trip/results/PricingInterfaces';
import { getLinkedViSegmentsForPricing } from "./VirtualInterliningHelpers";
import moment from 'moment';


export const createItinerariesPayload = (flightDetails: Array<FlightResultsDetails>, activeSegments: Array<Segment>, trip: Results) => {
  let itinerariesPayload : Array<PricingRequestItinerary> = [];
  let itinerariesCounter = 1;
  const linkedViSegments: Array<Segment> = getLinkedViSegmentsForPricing(activeSegments, trip);
  
  const allSegments: Array<Segment> = activeSegments.concat(linkedViSegments);
  allSegments.forEach((itineraryElement: Segment) => {
    const itineraryStructure = JSON.parse(itineraryElement.itinerary_structure);  
    if (itineraryElement.segment_position === itineraryStructure[0]) {
      itinerariesPayload.push({
        itinerary_id: itineraryElement.itinerary_id,
        itinerary_reference: itinerariesCounter,
        traveller_list: itineraryElement.priced_passengers,
        plating_carrier: itineraryElement.plating_carrier,
        credentials: itineraryElement.credential_info,
        itinerary_type: itineraryElement.itinerary_type.toLowerCase(),
        segments: createSegmentsPayload(flightDetails, activeSegments, linkedViSegments, itineraryElement, itineraryStructure, allSegments),
      });
      itinerariesCounter += 1;
    }
  });
  return itinerariesPayload;
};

const createSegmentsPayload = (flightDetails: Array<FlightResultsDetails>, activeSegments: Array<Segment>, linkedViSegments: Array<Segment>, itineraryElement: Segment,  itineraryStructure: Array<any>, allSegments: Array<Segment>) => {
  let itineraryId = itineraryElement.itinerary_id;
  let matchedSegments: Array<Segment> = [];
  matchedSegments = allSegments.filter((segment: Segment) => segment.itinerary_id === itineraryId);

  let segmentsPayload: Array<FlightSegment> = itineraryStructure.map(segmentIndex => {
    let currentSegment = matchedSegments.find((segment: Segment) => segment.segment_position === segmentIndex) || matchedSegments[segmentIndex];

    let flightSegment: FlightSegment  = {
      segment_id: segmentIndex,
      flights: createFlightsPayload(flightDetails, currentSegment),
    };
    if (itineraryElement.virtual_interline) {
      flightSegment.itinerary_index = itineraryElement.itinerary_index;
      flightSegment.virtual_interline = itineraryElement.virtual_interline;
      flightSegment.vi_position = itineraryElement.vi_position;
      flightSegment.vi_solution_id = itineraryElement.vi_solution_id;
    }
    return flightSegment;
  });
  return segmentsPayload;
};

const createFlightsPayload = (flightDetails: Array<FlightResultsDetails>, segment: Segment) => {
  let flightsPayload : Array<Flight> = [];

  segment.flights.forEach((flightResult: FlightResult) => {
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
