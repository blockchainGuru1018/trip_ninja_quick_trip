
export interface SearchDetails {
  flights: Array<Flight>
}

export interface Flight {
  origin: string;
  destination: string;
  departureDate: string;
  cabinClass: string;
}

export const defaultFlight: Object = {
  'origin': '',
  'destination': '',
  'departureDate': '',
  'cabinClass': ''
}