import { Flight } from '../trip/search/SearchInterfaces';
import { allCabinsEqual } from './AllCabinsEqualHelper';

export const flexTripAllowed = (flights: Array<Flight>): boolean => {
  const flightLength: number = flights.length;
  //return flightLength > 2 &&
  //flightLength <= 5 &&
  //allCabinsEqual(flights);
  return false;
};
