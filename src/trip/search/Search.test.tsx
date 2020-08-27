import { datesAreOnSameDayOrLater } from '../../helpers/DateHelpers';
import React from 'react';
import { shallow } from 'enzyme';
import SearchRequest from './SearchRequest';
import { defaultSearchDetails } from './SearchInterfaces';
import { SearchDetails, Flight } from './SearchInterfaces';
import TripOptions from './TripOptions';
import { setValue, searchFlights } from '../../actions/SearchActions';

const testSearchDetails = {
  "flights": [
    {
      "origin": "NYC | New York City, NY, USA - All Airports",
      "destination": "YHZ | Halifax, NS, Canada",
      "departureDate": "2020-10-12T14:29:00.000Z",
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
  "loading": false
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
  const component: any = shallow(<SearchRequest searchDetails={{ ...searchDetails }} searchFlights={searchFlights} />);
  const instance = component.instance();
  return instance.validateSearchDetails();
};

test('validateSearchDetails Success', () => {
  expect(validateSearchTest({ ...testSearchDetails })).toBeTruthy();
});

test('validateSearchDetails Failure', () => {
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

test('flexTripAllowed Success', () => {
  const component: any = shallow(<TripOptions flights={testFlights} routeFlexible={testSearchDetails.routeFlexible} setValue={setValue} />);
  const instance = component.instance();
  expect(instance.flexTripAllowed()).toBeTruthy();
});

test('flexTripAllowed Fail', () => {
  const component: any = shallow(<TripOptions flights={[testFlights[0], testFlights[1]]} routeFlexible={testSearchDetails.routeFlexible} setValue={setValue} />);
  expect(component.instance().flexTripAllowed()).toBeFalsy();
});

test('allCabinsEqual Fail', () => {
  let newTestFlights: Array<Flight> = [...testFlights];
  newTestFlights[0].cabinClass = 'BC';
  const component: any = shallow(<TripOptions flights={[...newTestFlights]} routeFlexible={testSearchDetails.routeFlexible} setValue={setValue} />);
  expect(component.instance().flexTripAllowed()).toBeFalsy();
});

