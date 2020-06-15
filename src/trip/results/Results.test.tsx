import React from 'react';
import { render } from '@testing-library/react';
import FlexTripResult from './FlexTripResult';
import ItineraryResult from './ItineraryResult';
import SegmentSelection from './SegmentSelection';
import PreResults from './PreResults';
import PreResultsFlightSections from './PreResultsFlightSections';
import { shallow } from 'enzyme';

test('itinerary results link renders', () => {
  const { getByText } = render(
	  <ItineraryResult/>
  );

  expect(getByText(/itinerary/i)).toBeInTheDocument();
});

test('flextrip results link renders', () => {
  const { getByText } = render(
	  <FlexTripResult/>
  );

  expect(getByText(/flextrip/i)).toBeInTheDocument();
});

test('segment selection link renders', () => {
  const { getByText } = render(
	  <SegmentSelection/>
  );

  expect(getByText(/segments/i)).toBeInTheDocument();
});

const yesterday = new Date().setDate(new Date().getDate() - 1);

const testResultsDetails = {
  flight_details: [
    {reference: 1, arrival_time: new Date, departure_time: yesterday},
    {reference: 2, arrival_time: new Date, departure_time: yesterday}
  ],
  segments: [
    [
      {
        flights: [{flight_detail_ref: 1}],
        origin_name: 'London, ',
        destination_name: 'Berlin, '
      }
    ],
    [
      {
        flights: [{flight_detail_ref: 2}],
        origin_name: 'Berlin, ',
        destination_name: 'Paris, '
      }
    ]
  ]
};

const expectedOutcome =  [
  {"destination": "Berlin", "nDays": 0, "origin": "London"},
  {"destination": "Paris", "nDays": 1, "origin": "Berlin"}
];

test('createPassengerString', () => {
  const component: any = shallow(<PreResults />);
  const instance = component.instance();
  expect(instance.createPassengersString(
    [{priced_passengers: ["ADT"]}]
  )).toBe(' 1 ADT');
  expect(instance.createPassengersString(
    [{priced_passengers: ["ADT", "ADT", "CHD"]}]
  )).toBe(' 2 ADT 1 CHD');
});

test('getNumberOfDays', () => {
  const component: any = shallow(
    <PreResultsFlightSections resultsDetails={testResultsDetails} />
  );
  const instance = component.instance();
  expect(instance.getNumberOfDays(1, [{arrival_time: new Date()}], testResultsDetails)).toBe(1);
});

test('setLocations', () => {
  const component: any = shallow(
    <PreResultsFlightSections resultsDetails={testResultsDetails} />
  );
  const instance = component.instance();
  expect(instance.setLocations()).toStrictEqual(expectedOutcome);
});


