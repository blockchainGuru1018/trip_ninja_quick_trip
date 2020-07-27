import { Pricing } from '../trip/results/PricingInterfaces';
import { Segment } from '../trip/results/ResultsInterfaces';
import { PassengerInfo } from '../trip/book/BookInterfaces';

export interface BookingsList {
  bookings: Array<Booking>;
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
  trip_type: string;
  details?: BookingDetails;
}

export interface BookingDetails {
  trip_id: string;
  agent: string;
  team: string;
  itinerary?: Array<Array<Segment>>;
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

export const defaultBookingsList: BookingsList = {bookings: []};
