
export interface SearchDetails {
  flights: Array<Flight>
}

export interface Flight {
  origin: string;
  destination: string;
  departureDate: string;
  cabinClass: string;
}

export const defaultFlight: Flight = {
  'origin': '',
  'destination': '',
  'departureDate': '',
  'cabinClass': ''
}