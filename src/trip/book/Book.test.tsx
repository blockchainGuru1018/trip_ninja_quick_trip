import React from 'react';
import { bookFlights } from '../../actions/BookActions';
import BookRequest from './BookRequest';
import { shallow } from 'enzyme';
import { BookingDetails } from './BookInterfaces';
import { AuthDetails } from '../../auth/AuthInterfaces';
import { PricingDetails } from '../results/PricingInterfaces';
import { ResultsDetails, ActiveSegmentsMap, SegmentPositionMap } from "../results/ResultsInterfaces";
import { testResults } from '../results/Results.test';

const testBookingDetails: BookingDetails = {
  trip_id: "d4a3433d6ce87e40dd8b74b15ad0cea647116409",
  add_to_ticketing_queue: false,
  agency: "",
  agent_email: "testing_amadeus@tripninja.io", 
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
    updated: false
  }],
  loading: false
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
  isAgencyAdmin: false,
  isSuperUser: false
};


const testPricingDetails: PricingDetails = {
  currency: "USD",
  trip_id: "d4a3433d6ce87e40dd8b74b15ad0cea647116409",
  trip_type: "fare_structure",
  itineraries: [
    {credentials:{
      data_source: "amadeus",
      pcc: "123",
      provider: "1A",
    },
    itinerary_reference: 1,
    itinerary_type: "one_way",
    plating_carrier: "",
    segments:[{
      segment_id: "0",
      baggage: {
        applicable_bags: '',
        applicable_carry_on_bags: '',
        baggage_cost: '',
        baggage_restrictions: '',
        carryon_cost: 0,
        carryon_restrictions: '',
        free_allowance: '',
        quantity_description: ''
      },
      flight_details:[{
        automated_checkin: true,
        destination_terminal: 3,
        flight_number: "117",
        in_flight_services: [],
        meals: [],
        on_time_performance: "100",
        origin_terminal: 1,
        special_segment: ''
      }]   
    }]    
    }]
};

const testResultsDetails: ResultsDetails = {
  fareStructureResults: testResults,
  errors: {
    errorFound: false,
    errorType: ''
  },
  tripType: 'fare_structure',
  activeSegments: new ActiveSegmentsMap(),
  segmentPositionMap:  new SegmentPositionMap(),
  itinerarySortBy: 'best',
  segmentSortBy: ['best']
};


test('checkBookingRequestComponent', () => {
  const bookRequestComponent: any = shallow(
    <BookRequest
      bookingDetails={testBookingDetails}
      authDetails={testAuthDetails}
      pricingDetails={testPricingDetails}
      resultsDetails={testResultsDetails}
      bookFlights={bookFlights}
    />
  );

  const bookRequestComponentInstance = bookRequestComponent.instance();

  bookRequestComponentInstance.validatePassengerBookingDetails();

  expect(bookRequestComponentInstance.props.bookingDetails.agent_email).toStrictEqual(testAuthDetails.userEmail);
  expect(bookRequestComponentInstance.props.bookingDetails.trip_id).toStrictEqual(testPricingDetails.trip_id);

});

