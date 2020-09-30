
import { Segment, FlightResult, FlightResultsDetails, Results } from '../trip/results/ResultsInterfaces';
import { PricingRequestItinerary, FlightSegment, Flight } from '../trip/results/PricingInterfaces';
import moment from 'moment';


export const createItinerariesPayload = (flightDetails: Array<FlightResultsDetails>, activeSegments: Array<Segment>, trip: Results) => {
  let itinerariesPayload : Array<PricingRequestItinerary> = [];
  let itinerariesCounter = 1;
  const fullTripWithVi: Array<Segment> = getFullTripWithVi(activeSegments, trip);
  fullTripWithVi.forEach((itineraryElement: Segment) => {
    const itineraryStructure = JSON.parse(itineraryElement.itinerary_structure);  
    if (itineraryElement.segment_position === itineraryStructure[0]) {
      itinerariesPayload.push({
        itinerary_reference: itinerariesCounter,
        traveller_list: itineraryElement.priced_passengers,
        plating_carrier: itineraryElement.plating_carrier,
        credentials: itineraryElement.credential_info,
        itinerary_type: itineraryElement.itinerary_type.toLowerCase(),
        segments: createSegmentsPayload(flightDetails, fullTripWithVi, itineraryElement, itineraryStructure),
      });
      itinerariesCounter += 1;
    }
  });

  return itinerariesPayload;
};

const createSegmentsPayload = (flightDetails: Array<FlightResultsDetails>, fullTripWithVi: Array<Segment>, itineraryElement: Segment,  itineraryStructure:Array<any>) => {
  let segmentsPayload: Array<FlightSegment> = itineraryStructure.map(segmentIndex => {
    let flightSegment: FlightSegment  = {
      segment_id: segmentIndex,
      flights: createFlightsPayload(flightDetails, fullTripWithVi, segmentIndex)
    };
    if (itineraryElement.virtual_interline) {
      flightSegment.option_part = itineraryElement.option_part;
      flightSegment.contains_virtual_interline = itineraryElement.virtual_interline;
      flightSegment.vi_position = itineraryElement.vi_position;
    }
    return flightSegment;
  });
  return segmentsPayload;
};

const createFlightsPayload = (flightDetails: Array<FlightResultsDetails>, fullTripWithVi: Array<Segment>, segmentIndex: any) => {
  let flightsPayload : Array<Flight> = [];

  fullTripWithVi[segmentIndex].flights.forEach((flightResult: FlightResult) => {
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

function getFullTripWithVi(actives: Array<Segment>, trip: Results) {
  let fullTrip: Array<Segment> = [];
  actives.forEach((segment: Segment, segmentIndex: number) => {
    fullTrip.push(segment);
    if (segment.virtual_interline) {
      const vi_solution_id: string = segment.vi_solution_id;
      const vi_solution_segment: Segment | undefined = trip.segments[segmentIndex].find((segment: Segment) =>
        segment.virtual_interline &&
        segment.vi_solution_id === vi_solution_id &&
        segment.option_part === 1
      );
      vi_solution_segment ? fullTrip.push(vi_solution_segment) : '';
    }
  });
  return fullTrip;
}
