
export interface PricingDetails {
    trip_id: string;
    trip_type: string;
    currency: string;
    markup?: number;
    source: string;
    itineraries?: Array<Itineraries>;
    loading?: boolean;
    pricing?: Pricing;
    price?: number;
  }

export const defaultPricingDetails: PricingDetails = {
  loading: false,
  trip_id: '',
  trip_type: 'fare_structure',
  currency: '',
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

export interface PricingResults {
  trip_id: string;
  pricing: Pricing;
  itinerary: Array<PricingResponseItinerary>;
}

export interface Pricing {
  confirmed_total_price: number;
  original_total_price: number;
  base_fare: number;
  taxes: number;
  fees: number;
  markup: number;
  currency: string;
}

export interface PricingResponseItinerary {
  itinerary_reference: number;
  plating_carrier: string;
  credentials: Credentials;
  itinerary_type: string;
  segments: Array<SegmentPricingInfo>
}

export interface SegmentPricingInfo {
  segment_id: string;
  baggage: BaggageDetails;
  flight_details: Array<FlightDetails>;
}

export interface BaggageDetails {
  applicable_bags: string;
  applicable_carry_on_bags: string;
  baggage_cost: string;
  baggage_restrictions: string;
  carryon_cost: number;
  carryon_restrictions: string;
}

export interface FlightDetails {
  flight_number: string;
  in_flight_services: Array<string>;
  meals: Array<string>;
  origin_terminal: number;
  destination_terminal: number;
}
