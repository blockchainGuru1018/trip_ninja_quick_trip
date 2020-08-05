import { setValue, addFlight, updateFlightValue, updatePassengers,
  removeFlight, searchFlights }
  from '../../actions/SearchActions';

export interface SearchDetails {
  flights: Array<Flight>;
  currency: string;
  passengers: Array<Passenger>;
  routeFlexible: boolean;
  loading: boolean;
}

export interface Flight {
  origin: string;
  destination: string;
  departureDate: string;
  cabinClass: string;
  startType: string;
  endType: string;
}

export const defaultFlight: Flight = {
  'origin': '',
  'destination': '',
  'departureDate': new Date().toISOString(),
  'cabinClass': 'E',
  'startType': '',
  'endType': ''
};

export interface SearchProps {
  searchDetails: SearchDetails,
  defaultCurrency: string;
  setValue: typeof setValue;
  addFlight: typeof addFlight;
  updateFlightValue: typeof updateFlightValue;
  updatePassengers: typeof updatePassengers;
  removeFlight: typeof removeFlight;
  authenticated: boolean;
  searchFlights: typeof searchFlights;
  dateFormat: string;
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

export const defaultSearchDetails: SearchDetails = {
  flights: [
    {
      'origin': 'NYC | New York City, NY, USA - All Airports',
      'destination': 'YHZ | Halifax, NS, Canada',
      'departureDate': '2020-08-21T07:00:00.000Z',
      'cabinClass': 'E',
      'startType': '',
      'endType': ''
    },
    {
      'origin': 'YHZ | Halifax, NS, Canada',
      'destination': 'TYO | Tokyo, Japan - All Airports',
      'departureDate': '2020-08-25T07:00:00.000Z',
      'cabinClass': 'E',
      'startType': '',
      'endType': ''
    },
    {
      'origin': 'TYO | Tokyo, Japan - All Airports',
      'destination': 'SIN | Singapore, Singapore',
      'departureDate': '2020-08-29T07:00:00.000Z',
      'cabinClass': 'E',
      'startType': '',
      'endType': ''
    },
    {
      'origin': 'SIN | Singapore, Singapore',
      'destination': 'HER | Irakleion, Greece',
      'departureDate': '2020-09-21T07:00:00.000Z',
      'cabinClass': 'E',
      'startType': '',
      'endType': ''
    },
  ],
  currency: 'USD',
  passengers: defaultPassengerList,
  routeFlexible: false,
  loading: false,
};

export interface SearchPayload {
  currency: string;
  flights: Array<object>;
  travellers: object;
  route_flexible: boolean;
}

export interface FlightPayload {
  id: number;
  cabin_class: string;
  departure_date: string;
  end_type: string;
  start_type: string;
  from_city: string;
  to_city: string;
}