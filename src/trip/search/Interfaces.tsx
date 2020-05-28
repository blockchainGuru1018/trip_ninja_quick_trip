
export interface SearchDetails {
  flights: Array<any>
}

export interface Flight {
  origin: string;
  destination: string;
  departureDate: string;
  cabinClass: string;
}