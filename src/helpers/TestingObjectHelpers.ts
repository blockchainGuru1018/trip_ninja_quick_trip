import { AuthDetails } from "../auth/AuthInterfaces";
import {
  ActiveSegmentsMap, AdditionalDetails,
  Baggage, FlightResult, FlightResultsDetails, Penalty,
  Results,
  ResultsDetails, Segment,
  SegmentPositionMap
} from "../trip/results/ResultsInterfaces";

import {
  BaggageDetails,
  Credentials, PricedFlightDetails,
  PricedItinerary,
  Pricing,
  PricingDetails,
  SegmentPricingInfo
} from "../trip/results/PricingInterfaces";
import { BookingDetails, PassengerInfo } from "../trip/book/BookInterfaces";
import { BookingItinerary, BookingSegment } from "../bookings/BookingsInterfaces";


export const testingAuthDetails: AuthDetails = {
  userEmail: 'test@test.com',
  userFirstName: 'test',
  userLastName: 'mcTestFace',
  authenticated: true,
  currency: 'USD',
  dateType: 'US',
  studentAndYouth: false,
  invalidAuth: false,
  pcc: '2G3C',
  provider: 'travelport',
  agency: 'tripninja',
  ticketing_queue: '01',
  isAgencyAdmin: true,
  isSuperUser: true,
  bookingDisabled: false,
  virtualInterliningAccess: true,
  markupVisible: true,
  viewPnrPricing: true
};

export const testingBaggage: Baggage = {
  number_of_pieces: 1
};

export const testingPenalty: Penalty = {
  amount: 0,
  percentage: 0
};

export const testingAdditionalDetails: AdditionalDetails = {
  e_ticketability: true,
  latest_ticketing_time: '2020-12-12',
  refundable: true,
  cancel_penalty: testingPenalty,
  change_penalty: testingPenalty,
  fare_types_info: '',
};

export const testingFlightResult: FlightResult = {
  flight_detail_ref: '1234',
  booking_code: '',
  fare_type: '',
  fare_basis_code: '',
  cabin_class: '',
  brand_identifier: ''
};

export const testingCredentials: Credentials = {
  data_source: 'travelport',
  pcc: '2G3C',
  provider: '1V',
  region: 'americas'
};

export const testingSegment: Segment = {
  source: 'amadeus',
  origin: 'NYC',
  origin_name: 'NYC',
  destination: 'YHZ',
  destination_name: 'YHZ',
  itinerary_type: 'one-way',
  itinerary_id: '12345',
  itinerary_markup: 0,
  itinerary_structure: '[0]',
  segment_position: 0,
  virtual_interline: false,
  weight: 14,
  price: 89,
  base_price: 70,
  taxes: 19,
  fees: 0,
  transportation_time: 134,
  fare_type: '',
  baggage: testingBaggage,
  additional_details: testingAdditionalDetails,
  cabin_class: '',
  alliance: '',
  private_fare: '',
  priced_passengers: ['ADT'],
  plating_carrier: 'AA',
  segment_id: '1234',
  segment_time_w_connections: 134,
  flights: [testingFlightResult],
  credential_info: testingCredentials,
};

export const testingFlightResultsDetails: FlightResultsDetails = {
  reference: '1234',
  origin: 'NYC',
  origin_name: 'NYC',
  destination: 'YHZ',
  destination_name: 'YHZ',
  departure_time: '2021-04-15',
  arrival_time: '2021-04-15T12:55:00.000-04:00',
  flight_number: '2345',
  carrier: 'AA',
  flight_time: 134,
  operating_carrier: 'AA'
};

export const testingResults: Results = {
  trip_id: '123',
  markup: 0,
  segments: [[testingSegment]],
  flight_details: [testingFlightResultsDetails],
  path_sequence: ['NYC', 'YHZ'],
};

export const testingResultsDetails: ResultsDetails = {
  filterWarning: false,
  activeSegments: new ActiveSegmentsMap().set(0, testingSegment),
  errors: {
    errorFound: false,
    errorType: ''
  },
  tripType: 'fareStructureResults',
  segmentPositionMap: new SegmentPositionMap(),
  itinerarySortBy: 'best',
  segmentSortBy: [],
  fareStructureResultsPrice: 0,
  flexTripResultsPrice: 0,
  fareStructureResults: testingResults,
  loadingResults: false
};

export const testingPricing: Pricing = {
  additional_markup: 0,
  confirmed_total_price: 110,
  original_total_price: 110,
  base_fare: 90,
  taxes: 10,
  fees: 0,
  markup: 10,
  currency: 'USD'
};

export const testingBaggageDetails: BaggageDetails = {
  applicable_bags: '1',
  applicable_carry_on_bags: '1',
  baggage_cost: '20',
  baggage_restrictions: '',
  carryon_cost: 0,
  carryon_restrictions: '',
  free_allowance: '',
  quantity_description: ''
};

export const testingPricedFlightDetails: PricedFlightDetails = {
  automated_checkin: true,
  destination_terminal: 4,
  flight_number: '2345',
  in_flight_services: [''],
  meals: [''],
  on_time_performance: '',
  origin_terminal: 1,
  special_segment: '',
};

export const testingSegmentPricingInfo: SegmentPricingInfo = {
  segment_id: '123',
  baggage: testingBaggageDetails,
  flight_details: [testingPricedFlightDetails]
};

export const testingPricedItinerary: PricedItinerary = {
  credentials: testingCredentials,
  segments: [testingSegmentPricingInfo],
  plating_carrier: 'AA',
  itinerary_reference: 1,
  itinerary_type: 'one-way'
};

export const testingPricingDetails: PricingDetails = {
  trip_id: '1234',
  trip_type: 'one-way',
  currency: 'USD',
  itineraries: [testingPricedItinerary],
  loading: false,
  pricing: testingPricing
};

export const testingBookingItinerary: BookingItinerary = {
  itinerary_reference: "1",
  plating_carrier: 'AA',
  credentials: testingCredentials,
  itinerary_type: 'one-way',
  itinerary_markup: 0,
  segments: [],
  price_breakdown: testingPricing,
  passengers: [],
};

export const testingBookingSegment: BookingSegment = {
  segment_id: 0,
  baggage: testingBaggageDetails,
  flight_details: [],
  additional_details: testingAdditionalDetails,
  brands: [],
  source: 'travelport',
  vi_position: 0,
  vi_solution_id: '1',
  virtual_interline: false,
  itinerary_index: "1",
  plating_carrier: 'AA',
};

export const testingPassengerInfo: PassengerInfo = {
  first_name: 'John',
  last_name: 'Smith',
  date_of_birth: '1990-01-01',
  gender: 'M',
  passenger_type: 'ADT',
  updated: true,
  frequent_flyer_cards: [],
  meals: []
};

export const testingBookingDetails: BookingDetails = {
  additional_markup: 0,
  passengers: [testingPassengerInfo],
  loading: false
};


