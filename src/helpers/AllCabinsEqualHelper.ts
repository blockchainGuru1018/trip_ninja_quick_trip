import { Flight } from '../trip/search/SearchInterfaces';

export const allCabinsEqual = (flights: Array<Flight>): boolean => {
  const cabinClass: string = flights[0].cabinClass;
  const flightsWithSameCabinClass: Array<Flight> = flights.filter(
    flight => flight.cabinClass === cabinClass
  );
  return flightsWithSameCabinClass.length === flights.length;
};