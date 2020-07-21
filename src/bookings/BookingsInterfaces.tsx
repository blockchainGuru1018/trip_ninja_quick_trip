import { Pricing } from '../trip/results/PricingInterfaces';
import { Segment } from '../trip/results/ResultsInterfaces';
import { PassengerInfo } from '../trip/book/BookInterfaces';

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

export const sampleBooking: Booking = {
  trip_id: "129a4045ef84edc4c0d5f0b1b28a906495d3f966",
  ur_locator_code: "AXY67G",
  primary_passenger: {
    first_name: "Andres",
    last_name: "Collart"
  },
  booking_date: "2019-07-07",
  departure_date: "2019-11-21",
  total_price: 399.96,
  currency: "CAD",
  route: "YHZ-YHZ",
  status: "Booked/Ticketed/Cancelled",
  pnr_list: [
    {
      route: "YHZ-YOW,YOW-YYZ",
      pnr_number:"DKCD62A",
      departure_date: "2019-11-21"
    },
    {
      route: "YYZ-YHZ",
      pnr_number:"KDHG38L",
      departure_date: "2019-11-25"
    }
  ],
  trip_type: "one_way/round_trip/multi_city",
  pcc: "2G3C",
  agent_email: "agent@tripninja.io"
};
