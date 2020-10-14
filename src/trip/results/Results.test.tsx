import React from 'react';
import PreResultsFlightSections from './PreResultsFlightSections';
import { PreResults } from './PreResults';
import SegmentPreviews from './SegmentPreviews';
import { shallow } from 'enzyme';
import { FlightTypes } from '../../common/FlightTypes';
import { createPassengerStringFromPayload } from '../../helpers/PassengersListHelper';
import { Passenger } from '../search/SearchInterfaces';
import { Results, ResultsDetails, defaultResultsDetails } from './ResultsInterfaces';
import { setActiveSegments, setTripType } from '../../actions/ResultsActions';

const yesterday = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().slice(0,23) + '+03:00';

export const testResults: Results = {
  trip_id: 'testtripid',
  markup: 0,
  path_sequence: ['LON-BER', 'BER-PAR'],
  flight_details: [
    {
      reference: '1', 
      arrival_time: yesterday,
      departure_time: yesterday,
      origin: 'YHZ', 
      destination: 'NYC',
      origin_name: 'Halifax, NS',
      destination_name: 'New York City, NY',
      carrier: 'AC',
      flight_number: '111',
      flight_time: 127
    },
    {
      reference: '2', 
      arrival_time: yesterday,
      departure_time: new Date().toISOString().slice(0,23) + '+03:00',
      origin: 'NYC', 
      destination: 'MIA',
      origin_name: 'New York City, NY',
      destination_name: 'Miami, FL',
      carrier: 'AC',
      flight_number: '122',
      flight_time: 222
    }
  ],
  segments: [
    [
      {
        flights: [{
          flight_detail_ref: '1', 
          booking_code: 'X',
          fare_type: 'published',
          fare_basis_code: '1XY3Z2',
          cabin_class: 'E',
          brand_identifier: '001'
        }],
        origin_name: 'London',
        destination_name: 'Berlin',
        baggage: {
          number_of_pieces: 0
        },
        itinerary_type: 'ONE_WAY',
        itinerary_id: '1',
        itinerary_structure: '[0]',
        segment_position: 0,
        virtual_interline: false,
        weight: 100,
        price: 100,
        base_price: 80,
        taxes: 20,
        fees: 0,
        transportation_time: 500,
        fare_type: 'published',
        additional_details: {
          e_ticketability: true,
          latest_ticketing_time: '',
          refundable: '',
          cancel_penalty: {
            amount: 50,
            percentage: 50,
          },                
          fare_types_info: '',
        },
        cabin_class: 'E',
        alliance: 'A',
        private_fare: '',
        priced_passengers: ['ADT'],
        plating_carrier: 'AC'
      }
    ],
    [
      {
        flights: [{
          flight_detail_ref: '2', 
          booking_code: 'Y',
          fare_type: 'private',
          fare_basis_code: 'FRS86Y',
          cabin_class: 'E',
          brand_identifier: '002'
        },
        { flight_detail_ref: '1', 
          booking_code: 'Y',
          fare_type: 'published',
          fare_basis_code: '1XY3Z2',
          cabin_class: 'E',
          brand_identifier: '001'
        }],
        origin_name: 'Berlin, ',
        destination_name: 'Paris, ',
        baggage: {
          number_of_pieces: 0
        },
        itinerary_type: 'ONE_WAY',
        itinerary_id: '2',
        itinerary_structure: '[1]',
        segment_position: 1,
        virtual_interline: false,
        weight: 120,
        price: 130,
        base_price: 100,
        taxes: 30,
        fees: 0,
        transportation_time: 375,
        fare_type: 'published',
        additional_details: {
          e_ticketability: true,
          latest_ticketing_time: '',
          refundable: '',
          cancel_penalty: {
            amount: 70,
            percentage: 75,
          },
          fare_types_info: ''
        },
        cabin_class: 'E',
        alliance: 'E',
        private_fare: '',
        priced_passengers: ['ADT'],
        plating_carrier: 'UA'
      }
    ]
  ]
};

let testResultsDetails: ResultsDetails = defaultResultsDetails;
testResultsDetails.fareStructureResults = testResults;
testResultsDetails.flexTripResults = testResults;

const expectedOutcome =  [
  {"destination": "Berlin", "nNights": 0, "origin": "London"},
  {"destination": "Paris", "nNights": 1, "origin": "Berlin"}
];

test('getNumberOfNights', () => {
  const component: any = shallow(
    <PreResultsFlightSections resultsDetails={testResults} />
  );
  const instance = component.instance();
  expect(instance.getNumberOfNights(1, [{departure_time: new Date().toISOString()}], testResults)).toBe(1);
});

test('setLocations', () => {
  const component: any = shallow(
    <PreResultsFlightSections resultsDetails={testResults} />
  );
  const instance = component.instance();
  expect(instance.setLocations()).toStrictEqual(expectedOutcome);
});

const segmentPreviewComponent: any = shallow(
  <SegmentPreviews
    segments={testResults.segments[0]}
    flightDetails={testResults.flight_details}
    currency={'USD'}
    segmentSelect={false}
    totalPrice={500}
    trip={testResults}
  />
);

const segmentPreviewComponentInstance = segmentPreviewComponent.instance();


test('getFlightDetailsBySegment', () => {
  const flightDetailsObject = [{ 
    reference: '1', 
    arrival_time: yesterday, 
    departure_time: yesterday,
    destination: "NYC", 
    origin: "YHZ", 
    origin_name: 'Halifax, NS',
    destination_name: 'New York City, NY',
    carrier: 'AC',
    flight_number: '111',
    flight_time: 127
  }];
  expect(
    segmentPreviewComponentInstance.getFlightDetailsBySegment(testResults.segments[0][0])
  ).toStrictEqual(flightDetailsObject);
});


test('getFlightTypes', () => {
  const flightTypesComponent: any = shallow(
    //@ts-ignore
    <FlightTypes
      segment={testResults.segments[0][0]}
      t={(key: any) => key}
    />
  ).instance();
  expect(
    flightTypesComponent.getFlightTypes(testResults.segments[0][0].flights)
  ).toBe("X common.flightTypes.class");
  expect(
    flightTypesComponent.getFlightTypes(testResults.segments[1][0].flights)
  ).toBe("Y, Y common.flightTypes.class");
});

test('createPassengerStringFromPayload', () => {
  const passengerExample: Array<Passenger> = [
    {
      type: 'adult',
      count: 1,
      code: 'ADT',
    },
    {
      type: 'child',
      count: 1,
      code: 'CHD',
    },
    {
      type: 'infant',
      count: 1,
      code: 'INF',
    }
  ];
  expect(
    createPassengerStringFromPayload(passengerExample)
  ).toBe('1 ADT, 1 CHD, 1 INF');
});


test('checkFlexTripRouteIsSame', () => {
  const preResultsComponent: any = shallow(
    //@ts-ignore
    <PreResults 
      resultsDetails={testResultsDetails} 
      currency="USD"
      setTripType={setTripType}
      setActiveSegments={setActiveSegments}
      t={(key: any) => key}
    />
  );
  const instance = preResultsComponent.instance();
  expect(instance.compareFlexTripRoute()).toBe(true);
});
