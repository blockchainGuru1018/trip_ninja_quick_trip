import { BookingItinerary } from '../bookings/BookingsInterfaces';

export const calculateDistributedMarkup = (tripMarkup: number, segmentPrice: number, tripPrice: number) => {
  if (tripMarkup > 0) {
    return tripMarkup * segmentPrice/tripPrice;
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
