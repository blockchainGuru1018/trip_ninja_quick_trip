import React from 'react';
import { render } from '@testing-library/react';
import PreResultsFlightSections from './PreResultsFlightSections';
import SegmentPreview from './SegmentPreview';
import { shallow } from 'enzyme';
import FlightStops from './FlightStops';
import FlightTypes from './FlightTypes';

const yesterday = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().slice(0,23) + '+03:00';

const testResultsDetails = {
  flight_details: [
    {reference: 1, arrival_time: yesterday, departure_time: yesterday,
      origin: 'YHZ', destination: 'NYC'},
    {reference: 2, arrival_time: yesterday, departure_time: new Date().toISOString().slice(0,23) + '+03:00',
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
  expect(instance.getNumberOfNights(1, [{departure_time: new Date().toISOString()}], testResultsDetails)).toBe(1);
});

test('setLocations', () => {
  const component: any = shallow(
    <PreResultsFlightSections resultsDetails={testResultsDetails} />
  );
  const instance = component.instance();
  expect(instance.setLocations()).toStrictEqual(expectedOutcome);
});

const segmentPreviewComponent: any = shallow(
  <SegmentPreview
    segments={testResultsDetails.segments[0]}
    flightDetails={testResultsDetails.flight_details} />
);

const segmentPreviewComponentInstance = segmentPreviewComponent.instance();


test('getFlightDetailsBySegment', () => {
  expect(
    segmentPreviewComponentInstance.getFlightDetailsBySegment(testResultsDetails.segments[0][0])
  ).toStrictEqual([{reference: 1, arrival_time: yesterday, departure_time: yesterday,
    destination: "NYC", origin: "YHZ",}]);
});


test('calculateHoursBetween', () => {
  expect(
    shallow(<FlightStops flights={testResultsDetails.flight_details}/>).instance().calculateHoursBetween(testResultsDetails.flight_details)
  ).toStrictEqual([{"NYC": "24h 0m"}]);
});

test('getFlightTypes', () => {
  const flightTypesComponent = shallow(<FlightTypes segment={testResultsDetails.segments[0][0]}/>).instance();
  expect(
    flightTypesComponent.getFlightTypes(testResultsDetails.segments[0][0].flights)
  ).toBe("X Class");
  expect(
    flightTypesComponent.getFlightTypes(testResultsDetails.segments[1][0].flights)
  ).toBe("Y, Y Class");
});
