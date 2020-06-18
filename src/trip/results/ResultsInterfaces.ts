
export interface ResultsDetails {
  fareStructureResults?: Results;
  flexTripResults?: Results;
  errors: Errors;
  tripType: string;
}

export interface Errors {
  errorFound: boolean;
  errorDescription?: string;
}

export const defaultResultsDetails: ResultsDetails = {
  errors: {
    errorFound: false
  },
  tripType: 'fareStructureResults'
};


export interface Results {
  trip_id: string;
  markup: number;
  segments: Array<Array<Segment>>
  flight_details: Array<FlightResultsDetails>
  path_sequence: Array<string>
}

export interface Segment {
  source: string;
  origin: string;
  origin_name: string;
  destination: string;
  destination_name: string;
  itinerary_type: string;
  itinerary_id: string;
  segment_position: number;
  option_id?: string;
  option_part?: string;
  virtual_interline: boolean;
  vi_type?: string;
  vi_position?: string;
  weight: number;
  price: number;
  base_price: number;
  taxes: number;
  fees: number;
  transportation_time: number;
  fare_type: string;
  baggage: Baggage;
  additional_details: AdditionalDetails;
  cabin_class: string;
  alliance: string;
  private_fare: string;
  priced_passengers: Array<string>;
  segment_time_with_connections: number;
  flights: Array<FlightResult>
  brands?: Array<Brands>
  status?: string
}

export interface Baggage {
  number_of_pieces: number;
}

export interface AdditionalDetails {
  e_ticketability: boolean;
  latest_ticketing_time: string;
  refundable: string;
  cancel_penalty: Penalty;
  change_penalty: Penalty;
  fare_types_info: string;
}

export interface Penalty {
  amount?: number;
  percentage?: number;
}

export interface FlightResult {
  flight_detail_ref: number;
  booking_code: string;
  fare_type: string;
  fare_basis_code: string;
  cabin_class: string;
  brand?: Brand
}

export interface Brands {
  [reference: string]: Array<Segment>
}

export interface Brand {
  brand_description: string;
  brand_services: Array<BrandServices>;
  carrier: string;
  name: string;
  tag_info: string;
  service: Array<BrandService>;
}

export interface BrandServices {
  checked_baggage: boolean;
  meals_and_beverages: boolean;
  rebooking: boolean;
  refund: boolean;
  seat_assignment: string;
}

export interface BrandService {
  classification: string;
  description: string;
  group: string;
  marketing_carrier: string;
  status: string;
}

export interface FlightResultsDetails {
  reference: number;
  origin: string;
  origin_name: string;
  destination: string;
  destination_name: string;
  departure_time: string;
  arrival_time: string;
  flight_number: number;
  carrier: string;
  flight_time: number;
}

export interface Location {
  origin: string;
  destination: string;
  nNights: number;
}
