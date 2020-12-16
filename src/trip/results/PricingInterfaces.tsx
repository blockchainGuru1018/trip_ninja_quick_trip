
export interface PricingDetails {
  trip_id: string;
  trip_type: string;
  currency: string;
  itineraries?: Array<PricedItinerary>;
  loading?: boolean;
  pricing?: Pricing;
}

export interface PricedItinerary {
  credentials: Credentials;
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
  itineraries: Array<PricingRequestItinerary>
  pseudo_price_confirm?: boolean
}

export const defaultPricing: Pricing = {
  additional_markup: 0,
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
  itinerary_id: string;
  itinerary_reference: number;
  traveller_list: Array<string>;
  plating_carrier?: string;
  credentials: Credentials;
  itinerary_type: string;
  itinerary_markup: number;
  segments: Array<FlightSegment>;
}


export interface FlightSegment {
  segment_id: string;
  flights: Array<Flight>;
  itinerary_index?: number;
  vi_position?: number;
  virtual_interline?: boolean
  vi_solution_id?: string;
}

export interface Flight {
  key: string;
  origin: string;
  origin_name: string;
  destination_name: string;
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
  additional_markup: number;
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

export interface AdditionalBaggage {
  applicable_bags: string;
  restriction: string;
  base_price: number;
  total_price: number;
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
  additional_checked_bags: Array<AdditionalBaggage>;
  additional_carry_on_bags: Array<AdditionalBaggage>;
}
