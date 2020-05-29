import { setValue, addFlight, updateFlightValue } from '../../actions/SearchActions';

export interface SearchDetails {
  flights: Array<Flight>;
  currency: string;
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

export interface SearchProps {
  searchDetails: SearchDetails,
  setValue: typeof setValue;
  addFlight: typeof addFlight;
  updateFlightValue: typeof updateFlightValue
}