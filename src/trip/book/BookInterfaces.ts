
export interface BookingDetails {
  trip_id: string;
  add_to_ticketing_queue?: boolean;
  ticketing_queue?: string;
  agent_email?: string;
  agency?: string;
  passengers: Array<Passenger>;
  billing: Billing;
}

export interface Passenger {
  title?: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  phone_number: string;
  passport_country?: string
  passport_number?: string;
  passport_expiration?: string;
  passenger_type: string;
}

export interface Billing {
  email: string;
  payment_include: boolean;
  payment_info?: PaymentInfo;
}

export interface PaymentInfo {
  card_type: string;
  cardholder_name: string;
  card_number: string;
  card_cvv: string;
  card_expiration_date: string;
}

export interface PricingResults {
  trip_id: string;
  pricing: Pricing;
  itinerary: Array<Itinerary>;
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

export interface Itinerary {

}

