import { Pricing, Credentials, BaggageDetails } from '../trip/results/PricingInterfaces';
import { FlightResultsDetails, AdditionalDetails, Brand } from '../trip/results/ResultsInterfaces';
import { PassengerInfo } from '../trip/book/BookInterfaces';

export interface BookingsList {
  bookings: Array<Booking>;
  loading: boolean;
}

export interface Booking {
  trip_id: string;
  ur_locator_code: string;
  pnr_list: Array<PnrInfo>;
  primary_passenger: PrimaryPassenger
  booking_date: string;
  departure_date: string;
  total_price: number;
  currency: string;
  route: string;
  status: string;
  pcc: string;
  agent_email: string;
  agency?: string;
  trip_type: string;
  details?: BookingDetails;
}

export interface BookingDetails {
  trip_id: string;
  itinerary?: Array<BookingItinerary>;
  passengers?: Array<PassengerInfo>;
  pricing: Pricing;
}

export interface PnrInfo {
  route: string;
  pnr_number: string;
  departure_date: string;
}

export interface PrimaryPassenger {
  first_name: string;
  last_name: string;
}

export interface BookingItinerary {
  itinerary_reference: number;
  plating_carrier: string;
  credentials: Credentials;
  itinerary_type: string;
  segments: Array<BookingSegment>; 
}

export interface BookingSegment {
  segment_id: string;
  baggage: BaggageDetails;
  flight_details: Array<FlightResultsDetails>;
  additional_details: AdditionalDetails;
  brands: Array<Brand>;
  source?: string;
  fare_type?: string;
}

export const defaultBookingsList: BookingsList = {
  bookings: [],
  loading: false
};
