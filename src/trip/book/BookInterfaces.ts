
export interface BookingDetails {
  trip_id?: string;
  add_to_ticketing_queue?: boolean;
  ticketing_queue?: string;
  agent_email?: string;
  agency?: string;
  passengers: Array<PassengerInfo>;
  billing?: Billing;
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
  updated: boolean;
}

export interface Billing {
  email: string;
  payment_included: boolean;
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
  'passenger_type': 'Adult',
  'first_name': 'Andres',
  'last_name': 'Collart',
  'date_of_birth': '1990-10-02',
  'gender': 'M',
  'updated': false,
  'phone_number': '902-240-4649',
  'passport_country': 'Honduras',
  'passport_number': 'E512760',
  'passport_expiration': '2025-01-01',
  'email': 'andres.collart@tripninja.io'
};

export const defaultBilling: Billing = {
  'email': '',
  'payment_included': false
};

export const defaultBookingDetails: BookingDetails = {
  'trip_id': '',
  'passengers': [defaultPassengerInfo],
  'billing': defaultBilling
};