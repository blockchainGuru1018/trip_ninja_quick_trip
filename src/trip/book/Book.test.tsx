import React from 'react';
import { bookFlights } from '../../actions/BookActions';
import BookRequest from './BookRequest';
import { shallow } from 'enzyme';
import { BookingDetails } from './BookInterfaces';
import { AuthDetails } from '../../auth/AuthInterfaces';
import { PricingDetails } from '../results/PricingInterfaces';

test('bookingPlaceholder', () => {
  const book = "Book";
  
  expect(book).toBe("Book");
});



const testBookingDetails: BookingDetails = {
  add_to_ticketing_queue: false,
  agency: "",
  agent_email: "", 
  passengers:[{
    date_of_birth: "1991-01-01",
    email: "andres.collart@tripninja.io",
    first_name: "Andres",
    gender: "M",
    last_name: "Collart",
    passenger_type: "Adult",
    passport_country: "Honduras",
    passport_expiration: "2025-01-01",
    passport_number: "E523760",
    phone_number: "904-240-4249",
    updated: false}]
};

const testAuthDetails: AuthDetails = {
  agency: "trip_ninja",
  authenticated: true,
  dateType: "MM/dd/yyyy",
  invalidAuth: false,
  currency: "USD",
  pcc: "MIA1S38BL",
  provider: "1A",
  studentAndYouth: false,
  ticketing_queue: "01",
  userEmail: "testing_amadeus@tripninja.io",
  userFirstName: "",
  userLastName: "",
};


const testPricingDetails: PricingDetails = {
  currency: "USD",
  trip_id: "d4a3433d6ce87e40dd8b74b15ad0cea647116409",
  trip_type: "fare_structure",
  itinerary_reference: 1,
  itinerary_type: "one_way",
  plating_carrier: "",
  loading: false,
  itineraries: [
    {credentials:{
      data_source: "amadeus",
      },
    pricing:{
      base_fare: 31.448900000000002,
      confirmed_total_price: 66.18,
      fees: 0,
      markup: 0,
      original_total_price: 66.18,
      taxes: 35.18,
      },
    segments:[
        {segment_id: "0",
        flight_details: [
          {flight_number: "6225",
          in_flight_services: ["123"],
          meals: ["123"],
          automated_checkin: false,
          destination_terminal: null,
          origin_terminal: null,
          special_segment: null,}
        ]
        }
      ]    
    }]
};

test('getNumberOfNights', () => {
  const component: any = shallow(
    <BookRequest
      bookingDetails={testBookingDetails}
      authDetails={testAuthDetails}
      pricingDetails={testPricingDetails}
      bookFlights={bookFlights}
    />
  );

  const instance = component.instance();

  expect(instance.agent_email.toStrictEqual(testAuthDetails.userEmail));
  expect(instance.trip_id.toStrictEqual(testPricingDetails.trip_id));
  );
