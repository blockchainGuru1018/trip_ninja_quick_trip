
export interface PricingDetails {
  trip_id: string;
  trip_type: string;
  currency: string;
  itineraries?: Array<PricedItinerary>;
  loading?: boolean;
  pricing?: Pricing;
}

export interface PricedItinerary {
  credentials: Credential;
  segments: Array<SegmentPricingInfo>;
  plating_carrier: string;
  itinerary_reference: number;
  itinerary_type: string;
}

export interface PricingRequestInterface {
  trip_id: string;
  trip_type: string;
  currency: string;
  price: number;
  markup: number;
  source: string;
  itineraries: Array<PricingRequestItinerary>
}

export const defaultPricing: Pricing = {
  confirmed_total_price: 100,
  original_total_price: 100,
  base_fare: 75,
  taxes: 25,
  fees: 0,
  markup: 0,
  currency: 'USD'
};

export const defaultPricingDetails: PricingDetails = {
  loading: false,
  trip_id: '',
  trip_type: 'fare_structure',
  currency: 'USD',
  pricing: defaultPricing
};


export interface PricingRequestItinerary {
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

export interface Pricing {
  confirmed_total_price: number;
  original_total_price: number;
  base_fare: number;
  taxes: number;
  fees: number;
  markup: number;
  currency: string;
}

export interface SegmentPricingInfo {
  segment_id: string;
  baggage: BaggageDetails;
  flight_details: Array<PricedFlightDetails>;
}

export interface PricedFlightDetails {
  automated_checkin: boolean;
  destination_terminal: number;
  flight_number: string;
  in_flight_services: Array<string>;
  meals: Array<string>;
  on_time_performance: string;
  origin_terminal: number;
  special_segment: string;
}

export interface BaggageDetails {
  applicable_bags: string;
  applicable_carry_on_bags: string;
  baggage_cost: string;
  baggage_restrictions: string;
  carryon_cost: number;
  carryon_restrictions: string;
  free_allowance: string;
  quantity_description: string;
}
