import { Pricing } from '../trip/results/PricingInterfaces';
import { Segment } from '../trip/results/ResultsInterfaces';
import { PassengerInfo } from '../trip/book/BookInterfaces';

export interface Booking {
  trip_id: string;
  ur_locator: string;
  pnr_list: Array<string>;
  primary_first_name: string;
  primary_last_name: string;
  booking_date: string;
  departure_date: string;
  price: string;
  currency: string;
  path_sequence: string;
  status: string;
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
export const sampleBooking: Booking = {
  trip_id: 'a43293jkwda',
  ur_locator: 'PQ17UB',
  pnr_list: ['QWERTY', 'UIOPA7'],
  primary_first_name: 'Test',
  primary_last_name: 'McTest',
  booking_date: '2020-07-07',
  departure_date: '2020-10-14',
  price: '999',
  currency: 'USD',
  path_sequence: 'YYZ-YUL',
  status: 'Ticketed'
};
