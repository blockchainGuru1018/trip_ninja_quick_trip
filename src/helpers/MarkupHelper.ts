import { Segment } from '../trip/results/ResultsInterfaces';
import { numberOfItineraries } from './MiscHelpers';
import { BookingItinerary } from '../bookings/BookingsInterfaces';

export const calculateDistributedMarkup = (tripMarkup: number, segments: Array<Segment>) => {
  const itineraryCount: number = numberOfItineraries(segments);
  if (tripMarkup > 0) {
    return tripMarkup/itineraryCount;
  }
  return 0;
};

export const getItinerariesMarkupTotal = (itineraries: Array<BookingItinerary>) => {
  let itineraryMarkupSum: number = 0;
  itineraries.forEach((itinerary: BookingItinerary) => {
    itineraryMarkupSum += itinerary.itinerary_markup;
  });
  return itineraryMarkupSum;
};
