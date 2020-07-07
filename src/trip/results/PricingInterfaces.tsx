

export interface PricingDetails {
  trip_id: string;
  trip_type: string;
  currency: string;
  price: number;
  markup?: number;
  source: string;
  itineraries?: Array<object>;
  loading: boolean;
}

export const defaultPricingDetails: PricingDetails = {
  loading: false,
  trip_id: '',
  trip_type: 'fare_structure',
  currency: '',
  price: 0,
  source: ''
};

export interface Itineraries {
  itinerary_reference: number;
  traveller_list: Array<string>;
  plating_carrier?: string;
  credentials: Credentials;
  itinerary_type: string;
  segments: Array<FlightSegment>;
}


export interface FlightSegment {
  segment_id: string;
  flights: Array<Flight>
}

export interface Flight {
  key: string;
  origin: string;
  destination: string;
  booking_code: string;
  cabin_class?: string;
  carrier: string;
  flight_time?: number;
  flight_number: string;
  departure_time: string;
  arrival_time?: string;
  brand_identifier?: string;
}

export interface Credentials {
  data_source: string;
  pcc?: string;
  provider?: string;
  region?: string;
}
