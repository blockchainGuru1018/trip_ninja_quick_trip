import { Pricing } from '../trip/results/PricingInterfaces';
import { Segment } from '../trip/results/ResultsInterfaces';
import { PassengerInfo } from '../trip/book/BookInterfaces';

export interface Booking {
  trip_id: string;
  ur_locator: string;
  pnr_list: Array<string>;
  primary_passenger: string;
  booking_date: string;
  departure_date: string;
  pricing: string; //Pricing;
  currency: string;
  path_sequence: string;
  status: string;
  agent?: string;
  team?: string;
  itinerary?: Array<Array<Segment>>
  passengers?: Array<PassengerInfo>
}


export const sampleBooking: Booking = {
  trip_id: 'a43293jkwda',
  ur_locator: 'PQ17UB',
  pnr_list: ['QWERTY', 'UIOPA7'],
  primary_passenger: 'Test McTest',
  booking_date: '2020-07-07',
  departure_date: '2020-10-14',
  pricing: '999',
  currency: 'USD',
  path_sequence: 'YYZ-YUL',
  status: 'Ticketed'
};
