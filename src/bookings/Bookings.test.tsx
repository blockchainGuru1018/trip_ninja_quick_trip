import React from 'react';
import { shallow } from 'enzyme';
import { Bookings } from './Bookings';
import { AuthDetails, defaultAuth } from '../auth/AuthInterfaces';
import { BookingsList } from './BookingsInterfaces';
import { getBookingsList, getBookingDetails, cancelBooking, queueBooking } from '../actions/BookingsActions';
import { PDFItineraryDownload } from "./PDFItineraryDownload";
import { testingAuthDetails, testingResultsDetails, testingPricingDetails} from "../helpers/TestingObjectHelpers";
import { setErrorDetails } from "../actions/ResultsActions";

let testBookingsList: BookingsList = {
  bookings: [],
  loading: false
};

let testAuthDetails: AuthDetails = defaultAuth;


it('getUserTypeAdmin', () => {
  testAuthDetails.isAgencyAdmin = true;
  testAuthDetails.agency = "tripninja";
  const bookingsComponent: any = shallow(
    <Bookings
      authDetails={testAuthDetails}
      bookingsList={testBookingsList}
      getBookingsList={getBookingsList}
      getBookingDetails={getBookingDetails}
      cancelBooking={cancelBooking}
      queueBooking={queueBooking}
      t={(key: any) => key}
    />
  );
  const instance = bookingsComponent.instance();
  expect(instance.getUserType()).toBe("agency=tripninja");
});

it('getUserTypeAgent', () => {  
  testAuthDetails.userEmail = "testing1@tripninja.io";
  testAuthDetails.isAgencyAdmin = false;
  const bookingsComponent: any = shallow(
    <Bookings
      authDetails={testAuthDetails}
      bookingsList={testBookingsList}
      getBookingsList={getBookingsList}
      getBookingDetails={getBookingDetails}
      cancelBooking={cancelBooking}
      queueBooking={queueBooking}
      t={(key: any) => key}
    />
  );
  const instance = bookingsComponent.instance();
  expect(instance.getUserType()).toBe("user=testing1@tripninja.io");
});

test('pdfItineraryDownload', () => {
  const pdfItineraryComponent: any = shallow(
    <PDFItineraryDownload
      authDetails={testingAuthDetails}
      resultsDetails={testingResultsDetails}
      pricingDetails={testingPricingDetails}
      setErrorDetails={setErrorDetails}
      t={(key: any) => key}
    />
  );

  const pdfInstance = pdfItineraryComponent.instance();
  expect(pdfInstance.getSegmentsList().length).toStrictEqual(1);
});