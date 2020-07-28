import { Pricing, Credentials, BaggageDetails } from '../trip/results/PricingInterfaces';
import { FlightResultsDetails, AdditionalDetails, Brand } from '../trip/results/ResultsInterfaces';
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
  brand: Array<Brand>;
}

export const defaultBookingsList: BookingsList = {bookings: []};


export const sampleBookingDetails: BookingDetails = {
  "trip_id": "129a4045ef84edc4c0d5f0b1b28a906495d3f966",
  "pricing": {
    "confirmed_total_price": 455.68,
    "original_total_price": 455.61,
    "base_fare": 370.04,
    "taxes": 85.64,
    "fees": 0,
    "markup": 20,
    "currency": "USD"
  },
  "itinerary": [
    {
      "itinerary_reference": 1,
      "plating_carrier": "WS",
      "credentials": {
        "data_source": "amadeus",
        "pcc": "MEL49f839",
        "provider": "1A",
        "region": "americas"
      },
      "itinerary_type": "one_way",
      "segments": [
        {
          "segment_id": "14c9e2e5c95a5bf0f9f7712de24348e6aba88c32",
          "baggage": {
            "applicable_bags": "1stChecked",
            "applicable_carry_on_bags": "1",
            "baggage_cost": "30",
            "baggage_restrictions": "UPTO50LB/23KG AND UPTO62LI/158LCM",
            "carryon_cost": 0,
            "carryon_restrictions": "CARRYON HAND BAGGAGE ALLOWANCE",
            "free_allowance": "string",
            "quantity_description": "string"
          },
          "flight_details": [
            {
              "reference": "xyz",
              "origin": "CDG",
              "origin_name": "Paris",
              "destination_name": "Montreal",
              "destination": "YUL",
              "booking_code": "X",
              "cabin_class": "Economy",
              "carrier": "TS",
              "flight_time": 475,
              "flight_number": "475",
              "departure_time": "2019-04-07T13:15:00",
              "arrival_time": "2019-04-07T15:10:00",
              "brand_identifier": "ECONOFLEX"
            }
          ],
          "additional_details": {
            "e_ticketability": true,
            "latest_ticketing_time": "11JUN20",
            "refundable": "true",
            "cancel_penalty": {
              "amount": 0,
              "percentage": 100
            },
            "change_penalty": {
              "amount": 78,
              "percentage": 0
            },
            "fare_types_info": "WS3 - Published fare"
          },
          "brand": [
            {
              "brand_description": "Econo-Flex",
              "brand_services": {
                "checked_baggage": true,
                "meals_and_beverages": true,
                "rebooking": "$",
                "refund": "$",
                "seat_assignment": "$",
                "carry_on_hand_baggage": "true"
              },
              "carrier": "AA",
              "name": "Econo",
              "tag_info": "Econo flex provides all the comforts of economy with additional flexibility options relating to refunds and cancellation.",
              "tag_line": "Econo flex, flexibility when it matters.",
              "service": [
                {
                  "classification": "Baggage charges that apply at the airport.",
                  "description": "CHECKED BAGGAGE",
                  "group": "Baggage",
                  "marketing_carrier": "AA",
                  "status": "$",
                  
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  "passengers": [
    {
      "first_name": "Andres",
      "last_name": "Collart",
      "gender": "M",
      "date_of_birth": "1990-01-01",
      "passport_number": "KDS3468",
      "passport_expiration": "2021-11-21",
      "passport_country": "Canada",
      "passenger_type": "ADT",
      "email": "andres.collar@tripninja.io",
      "phone_number": "9022222222",
      "updated": false
    }
  ]
};