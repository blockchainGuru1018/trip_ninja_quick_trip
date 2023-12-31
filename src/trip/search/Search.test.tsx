import React from 'react';
import { shallow } from 'enzyme';
import  { SearchRequest } from './SearchRequest';
import TripPath from './TripPath';
import { CabinSelect } from './CabinSelect';
import { SearchDetails, Flight, defaultSearchDetails } from './SearchInterfaces';
import { searchFlights, updateFlightValue } from '../../actions/SearchActions';
import { flexTripAllowed } from '../../helpers/FlexTripAllowedHelper';
import { datesAreOnSameDayOrLater } from '../../helpers/DateHelpers';


const testSearchDetails = {
  "flights": [
    {
      "origin": "NYC | New York City, NY, USA - All Airports",
      "destination": "YHZ | Halifax, NS, Canada",
      "departureDate": "2027-10-12T14:29:00.000Z",
      "cabinClass": "E",
      "endType": "A",
      "startType": "C"
    }
  ],
  "currency": "NZD",
  "passengers": [
    {
      "type": "Adult",
      "count": 1,
      "code": "ADT"
    },
    {
      "type": "Child",
      "count": 0,
      "code": "CHD"
    },
    {
      "type": "Infant",
      "count": 0,
      "code": "INF"
    },
    {
      "type": "Student",
      "count": 0,
      "code": "STU"
    },
    {
      "type": "Youth",
      "count": 0,
      "code": "YTH"
    }
  ],
  "routeFlexible": true,
  "loading": false,
  "virtualInterlining": false
};

const testFlights: Array<Flight> = [
  { "origin": "NYC | New York City, NY, USA - All Airports", "destination": "YHZ | Halifax, NS, Canada", "departureDate": "2020-10-09T11:39:03.909Z", "cabinClass": "E", "endType": "A", "startType": "C" }, 
  { "origin": "YHZ | Halifax, NS, Canada", "destination": "YTO | Toronto, ON, Canada - All Airports", "departureDate": "2020-10-15T11:39:03.909Z", "cabinClass": "E", "endType": "C", "startType": "A" }, 
  { "origin": "YTO | Toronto, ON, Canada - All Airports", "destination": "PAR | Paris, France - All Airports", "departureDate": "2020-10-21T11:39:03.909Z", "cabinClass": "E", "endType": "C", "startType": "C" }];

test('datesAreOnSameDayOrLater', () => {
  const today: Date = new Date();
  let tomorrow: Date = new Date();
  tomorrow = new Date(tomorrow.setDate(tomorrow.getDate() + 1));
  expect(datesAreOnSameDayOrLater(today, today)).toBeTruthy();
  expect(datesAreOnSameDayOrLater(tomorrow, today)).toBeTruthy();
  expect(datesAreOnSameDayOrLater(today, tomorrow)).toBeFalsy();
});

const validateSearchTest = (searchDetails: SearchDetails) => {
  const component: any = shallow(
    //@ts-ignore
    <SearchRequest searchDetails={{ ...searchDetails }} searchFlights={searchFlights} virtualInterliningAccess={false} t={(key: any) => key} />
  );
  const instance = component.instance();
  return instance.validateSearchDetails();
};

test('validateSearchDetailsSuccess', () => {
  expect(validateSearchTest({ ...testSearchDetails })).toBeTruthy();
});

test('validateSearchDetailsFailure', () => {
  expect(validateSearchTest(defaultSearchDetails)).toBeFalsy();
  const alteredSearchDetails: SearchDetails = {
    ...testSearchDetails, flights: [{ ...testSearchDetails.flights[0] }]
  };
  alteredSearchDetails.flights[0].departureDate = "2019-11-12T14:29:00.000Z";
  expect(validateSearchTest(alteredSearchDetails)).toBeFalsy();
  const alteredSearchDetails2: SearchDetails = {
    ...testSearchDetails, flights: [{ ...testSearchDetails.flights[0] }]
  };
  alteredSearchDetails2.flights[0].destination = "NYC | New York City, NY, USA - All Airports";
  expect(validateSearchTest(alteredSearchDetails2)).toBeFalsy();
});

test('flexTripAllowedSuccess', () => {
  expect(flexTripAllowed(testFlights)).toBeTruthy();
});

test('flexTripAllowedFail', () => {
  expect(flexTripAllowed([testFlights[0], testFlights[1]])).toBeFalsy();
});

test('allCabinsEqualFail', () => {
  let newTestFlights: Array<Flight> = [...testFlights];
  newTestFlights[0].cabinClass = 'BC';
  expect(flexTripAllowed([...newTestFlights])).toBeFalsy();
});

test('checkForOriginDestinationPair', () => {
  const tripPathComponent: any = shallow(
    <TripPath flights={testFlights} />
  );
  const instance = tripPathComponent.instance();
  expect(instance.checkForOriginDestinationPair(testFlights[0])).toBe("YHZ | Halifax, NS, Canada");
});

test('getCabinClassByName', () => {
  const cabinSelectComponent: any = shallow(
    //@ts-ignore
    <CabinSelect i={0} cabinClass={"E"} updateFlightValue={updateFlightValue} t={(key: any) => key} />
  );
  const instance = cabinSelectComponent.instance();
  expect(instance.getCabinClassByName()).toBe("E");
});
