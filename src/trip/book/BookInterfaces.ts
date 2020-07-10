
export interface BookingDetails {
  trip_id: string;
  add_to_ticketing_queue?: boolean;
  ticketing_queue?: string;
  agent_email?: string;
  agency?: string;
  passengers: Array<PassengerInfo>;
  billing: Billing;
}

export interface PassengerInfo {
  title?: string;
  first_name?: string;
  last_name?: string;
  date_of_birth?: string;
  gender?: string;
  phone_number?: string;
  passport_country?: string
  passport_number?: string;
  passport_expiration?: string;
  passenger_type: string;
  email?: string;
}

export const defaultPassengerInfo: PassengerInfo = {
  'passenger_type': 'Adult',
  'first_name': '',
  'last_name': '',
  'date_of_birth': new Date().toISOString(),
  'gender': ''
};

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

