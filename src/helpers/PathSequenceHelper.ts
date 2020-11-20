import { FlightResultsDetails, Segment } from "../trip/results/ResultsInterfaces";
import { BookingItinerary, BookingSegment} from "../bookings/BookingsInterfaces";

export const createItineraryPathSequenceStringBooking = (itinerary: BookingItinerary) => {
  let pathSequenceString = '';
  itinerary.segments.forEach((segment: BookingSegment) => {
    const flightDetails: Array<FlightResultsDetails> = segment.flight_details;
    pathSequenceString += `${flightDetails[0].origin}-${flightDetails[flightDetails.length - 1].destination}, `;
  });
  return pathSequenceString.slice(0, -2);
};

export const createItineraryPathSequenceString = (segment: Segment, pathSequence: Array<string>) => {
  let pathSequenceString = '';
  const itineraryStructure: Array<number> = JSON.parse(segment.itinerary_structure);
  itineraryStructure.forEach((itineraryPosition: number) => segment.virtual_interline
    ? pathSequenceString += `${segment.origin} - ${segment.destination}, `
    : pathSequenceString += `${pathSequence[itineraryPosition]}, `);
  return pathSequenceString.slice(0, -2);
};