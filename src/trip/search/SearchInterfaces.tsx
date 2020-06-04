import { setValue, addFlight, updateFlightValue, updatePassengers,
  updateFlightOriginDestination, removeFlight, searchFlights }
  from '../../actions/SearchActions';

export interface SearchDetails {
  flights: Array<Flight>;
  currency: string;
  passengers: Array<Passenger>;
  routeFlexible: boolean;
}

export interface Flight {
  origin: string;
  destination: string;
  departureDate: string;
  cabinClass: string;
  endType: string;
}

export const defaultFlight: Object = {
  'origin': '',
  'destination': '',
  'departureDate': new Date().toISOString(),
  'cabinClass': 'E',
  'endType': ''
};

export interface SearchProps {
  searchDetails: SearchDetails,
  defaultCurrency: string;
  setValue: typeof setValue;
  addFlight: typeof addFlight;
  updateFlightValue: typeof updateFlightValue;
  updatePassengers: typeof updatePassengers;
  updateFlightOriginDestination: typeof updateFlightOriginDestination;
  removeFlight: typeof removeFlight;
  authenticated: boolean;
  searchFlights: typeof searchFlights;
}

export interface Passenger {
  type: string;
  count: number;
  code: string;
}

export const defaultPassengerList: Array<Passenger> = [
  {'type': "Adult", 'count': 1, 'code': "ADT"},
  {'type': "Child", 'count': 0, 'code': "CHD"},
  {'type': "Infant", 'count': 0, 'code': "INF"},
  {'type': "Student", 'count': 0, 'code': "STU"},
  {'type': "Youth", 'count': 0, 'code': "YTH"}
];

export const defaultSearchDetails: Object = {
  flights: [
    {...defaultFlight}
  ],
  currency: 'USD',
  passengers: defaultPassengerList,
  routeFlexible: false
};

export interface SearchPayload {
  currency: string;
  flights: Array<object>;
  travellers: object;
  alliance: string;
}

// export interface FlightPayload {
//   cabin_class: string;
//   departure_date: string;
//   end_type:
// };