import { datesAreOnSameDayOrLater } from '../../helpers/DateHelpers';
import React from 'react';
import { shallow } from 'enzyme';
import Search from './Search';
import SearchRequest from './SearchRequest';
import { defaultSearchDetails } from './SearchInterfaces';
import { SearchDetails } from './SearchInterfaces';

const testSearchDetails = {
  "flights": [
    {
      "origin": "NYC | New York City, NY, USA - All Airports",
      "destination":"YHZ | Halifax, NS, Canada",
      "departureDate":"2020-08-12T14:29:00.000Z",
      "cabinClass":"E",
      "endType":"A"
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

test('datesAreOnSameDayOrLater', () => {
  const today: Date = new Date();
  let tomorrow: Date = new Date();
  tomorrow = new Date(tomorrow.setDate(tomorrow.getDate() + 1));
  expect(datesAreOnSameDayOrLater(today, today)).toBeTruthy();
  expect(datesAreOnSameDayOrLater(tomorrow, today)).toBeTruthy();
  expect(datesAreOnSameDayOrLater(today, tomorrow)).toBeFalsy();
});

const validateSearchTest = (searchDetails: SearchDetails) => {
  const component: any = shallow(<SearchRequest searchDetails={{...searchDetails}}/>);
  const instance = component.instance();
  return instance.validateSearchDetails();
};

test('validateSearchDetails Success', ()  => {
  expect(validateSearchTest({...testSearchDetails})).toBeTruthy();
});

test('validateSearchDetails Failure', () => {
  expect(validateSearchTest(defaultSearchDetails)).toBeFalsy();
  const alteredSearchDetails: SearchDetails = {
    ...testSearchDetails, flights: [{...testSearchDetails.flights[0]}]
  };
  alteredSearchDetails.flights[0].departureDate = "2019-08-12T14:29:00.000Z";
  expect(validateSearchTest(alteredSearchDetails)).toBeFalsy();
  const alteredSearchDetails2: SearchDetails = {
    ...testSearchDetails, flights: [{...testSearchDetails.flights[0]}]
  };
  alteredSearchDetails2.flights[0].destination = "NYC | New York City, NY, USA - All Airports";
  expect(validateSearchTest(alteredSearchDetails2)).toBeFalsy();
});

