import React from 'react';
import { render } from '@testing-library/react';
import SegmentSelection from './SegmentSelection';
import PreResultsFlightSections from './PreResultsFlightSections';
import { shallow } from 'enzyme';


test('segment selection link renders', () => {
  const { getByText } = render(
	  <SegmentSelection/>
  );

  expect(getByText(/segments/i)).toBeInTheDocument();
});

const yesterday = new Date().setDate(new Date().getDate() - 1);

const testResultsDetails = {
  flight_details: [
    {reference: 1, arrival_time: yesterday, departure_time: yesterday,
      origin: 'YHZ', destination: 'NYC'},
    {reference: 2, arrival_time: yesterday, departure_time: new Date(),
      origin: 'BER', destination: 'MIA'}
  ],
  segments: [
    [
      {
        flights: [{flight_detail_ref: 1, booking_code: 'X'}],
        origin_name: 'London, ',
        destination_name: 'Berlin, ',
        baggage: {
          number_of_pieces: 0
        }
      }
    ],
    [
      {
        flights: [
          {flight_detail_ref: 2, booking_code: 'Y'},
          {flight_detail_ref: 1, booking_code: 'Y'}
        ],
        origin_name: 'Berlin, ',
        destination_name: 'Paris, ',
        baggage: {
          number_of_pieces: 0
        }
      }
    ]
  ]
};

const expectedOutcome =  [
  {"destination": "Berlin", "nNights": 0, "origin": "London"},
  {"destination": "Paris", "nNights": 1, "origin": "Berlin"}
];

test('getNumberOfNights', () => {
  const component: any = shallow(
    <PreResultsFlightSections resultsDetails={testResultsDetails} />
  );
  const instance = component.instance();
  expect(instance.getNumberOfNights(1, [{departure_time: new Date()}], testResultsDetails)).toBe(1);
});

test('setLocations', () => {
  const component: any = shallow(
    <PreResultsFlightSections resultsDetails={testResultsDetails} />
  );
  const instance = component.instance();
  expect(instance.setLocations()).toStrictEqual(expectedOutcome);
});


