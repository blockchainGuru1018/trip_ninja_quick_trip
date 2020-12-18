import { AdditionalDetails, Brand } from "../results/ResultsInterfaces";

export interface BookingDetails {
  trip_id?: string;
  add_to_ticketing_queue?: boolean;
  additional_markup: number;
  ticketing_queue?: string;
  ticket?: boolean;
  agent_email?: string;
  agency?: string;
  passengers: Array<PassengerInfo>;
  billing?: Billing;
  segment_additional_details?: Array<SegmentAdditionalDetails>
  loading: boolean;
}

export interface SegmentAdditionalDetails {
  additional_details: AdditionalDetails
  brands: Array<Brand> | []
}

export interface PassengerInfo {
  title?: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  phone_number?: string;
  passport_country?: string
  passport_number?: string;
  passport_expiration?: string;
  passenger_type: string;
  passenger_type_name?: string;
  email?: string;
  meals: Array<MealPreferences>;
  updated: boolean;
  frequent_flyer_cards: Array<FrequentFlyerCard>
  additional_checked_bags: Array<AdditionalBaggage>
  additional_carry_on_bags: Array<AdditionalBaggage>
}

export interface FrequentFlyerCard {
  itinerary_reference?: string;
  segment_id?: string;
  card_supplier: string;
  program_name: string;
  card_number: string;
}

export interface MealPreferences {
  itinerary_reference: number;
  meal_choice: string;
  flight_numbers?: string;
}

export interface ApplicableBags {
  baggage_type: string;
  base_price: number;
  total_price: number;
  restriction: string;
}

export interface AdditionalBaggage {
  itinerary_reference: string;
  applicable_bags: Array<ApplicableBags>
}

export interface Billing {
  email: string;
  payment_included?: boolean;
  payment_info?: PaymentInfo;
}

export interface PaymentInfo {
  card_type: string;
  cardholder_name: string;
  card_number: string;
  card_cvv: string;
  card_expiration_date: string;
}

export const defaultPassengerInfo: PassengerInfo = {
  'passenger_type': 'ADT',
  'passenger_type_name': 'Adult',
  'first_name': '',
  'last_name': '',
  'date_of_birth': new Date().toISOString().slice(0,10),
  'gender': '',
  'updated': false,
  'frequent_flyer_cards': [],
  'additional_carry_on_bags': [],
  'additional_checked_bags': [],
  'meals': []
};

export const defaultBilling: Billing = {
  'email': '',
  'payment_included': false
};

export const defaultBookingDetails: BookingDetails = {
  'trip_id': '',
  'passengers': [defaultPassengerInfo],
  'billing': defaultBilling,
  'loading': false,
  'additional_markup': 0,
};