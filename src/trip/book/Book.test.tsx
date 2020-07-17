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
  source: "amadeus",
  itineraries: [
    {credentials:{
      data_source: "amadeus",
      pcc: "123",
      provider: "1A",
    },
    itinerary_reference: 1,
    itinerary_type: "one_way",
    plating_carrier: "",
    traveller_list: ["ADT"],
    segments:[
      {segment_id: "0",
        flights:[{
          booking_code: "D",
          arrival_time: "2020-11-25T07:40:00",
          brand_identifier: "",
          cabin_class: "Economic Standard",
          carrier: "VY",
          departure_time: "2020-11-25T05:10:00",
          destination: "FCO",
          flight_number: "6225",
          flight_time: 150,
          key: "cf544d7343dff560531c0a0ce5204a3b339ae8bd",
          origin: "LGW",
        }]
      }
    ]    
    }]
};

test('checkBookingRequestComponent', () => {
  const bookRequestComponent: any = shallow(
    <BookRequest
      bookingDetails={testBookingDetails}
      authDetails={testAuthDetails}
      pricingDetails={testPricingDetails}
      bookFlights={bookFlights}
    />
  );

  const bookRequestComponentInstance = bookRequestComponent.instance();

  bookRequestComponentInstance.submitBookingRequest(false);

  expect(bookRequestComponentInstance.props.bookingDetails.agent_email).toStrictEqual(testAuthDetails.userEmail);
  expect(bookRequestComponentInstance.props.bookingDetails.trip_id).toStrictEqual(testPricingDetails.trip_id);

});

