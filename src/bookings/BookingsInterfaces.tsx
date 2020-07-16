import { Pricing } from '../trip/results/PricingInterfaces';
import { Segment } from '../trip/results/ResultsInterfaces';

export interface Bookings {
  trip_id: string;
  ur_locator: string;
  pnr_list: Array<string>;
  primary_passenger: string;
  booking_date: string;
  departure_date: string;
  pricing: Pricing;
  currency: string;
  path_sequence: string;
  status: string;
  agent: string;
  team: string;
  itinerary: Array<Array<Segment>>
}

