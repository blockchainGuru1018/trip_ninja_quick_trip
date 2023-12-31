import {Credentials} from "./PricingInterfaces";

export interface ResultsDetails {
  filterWarning: boolean;
  fareStructureResults?: Results;
  flexTripResults?: Results;
  errors: Errors;
  tripType: string;
  activeSegments: ActiveSegmentsMap;
  segmentPositionMap: SegmentPositionMap;
  itinerarySortBy: string;
  segmentSortBy: Array<string>;
  segmentFilters?: Array<Array<Filter>>;
  itineraryFilters?: Array<Filter>;
  fareStructureResultsPrice: number;
  flexTripResultsPrice: number;
  loadingResults: boolean;
}

export interface Filter {
  type: string
  value: any,
  position: number,
  failed: boolean
}

export const defaultFilters: Array<Filter> = [
  {type: 'baggage', value: '0', position: 0, failed: false},
  {type: 'noOfStops', value: 'Any', position: 1, failed: false},
  {type: 'alliance', value: 'Any', position: 2, failed: false},
  {type: 'refundability', value: 'Any', position: 0, failed: false}
];

export class ActiveSegmentsMap extends Map<number, Segment>{

  get(key: number): Segment {
    const value: Segment | undefined = super.get(key);
    if (value) {
      return value;
    } else {
      throw new Error(`Active segment is not set for position ${key}`);
    }
  }

  getIfExist(key: number): Segment | undefined {
    return super.get(key);
  }
}
export class SegmentPositionMap extends Map<number, SegmentValueMap> {

  getValue(segmentPosition: number, valueType: string): any {
    const segmentValueMap: SegmentValueMap = this.getSegmentValueMap(segmentPosition);
    const value = segmentValueMap.get(valueType);
    if (value) {
      return value;
    } else {
      throw new Error(`${valueType} is not set for segment position ${segmentPosition}`);
    }
  }

  getSegmentValueMap(segmentPosition: number): SegmentValueMap {
    let segmentValueMap: SegmentValueMap | undefined = super.get(segmentPosition);
    if (!segmentValueMap) {
      segmentValueMap = new SegmentValueMap();
      super.set(segmentPosition, segmentValueMap);
    }
    return segmentValueMap;
  }

  setValue(segmentPosition: number, valueType: string, value: any){
    const segmentValueMap: SegmentValueMap = this.getSegmentValueMap(segmentPosition);
    segmentValueMap.set(valueType, value);
  }
}

export class SegmentValueMap extends Map<string, any> {
}

export const defaultResultsDetails: ResultsDetails = {
  filterWarning: false,
  activeSegments: new ActiveSegmentsMap(),
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
  loadingResults: false
};

export interface Errors {
  errorFound: boolean;
  errorType: string;
  errorDescription?: string;
}

export interface Results {
  trip_id: string;
  markup: number;
  segments: Array<Array<Segment>>
  flight_details: Array<FlightResultsDetails>
  path_sequence: Array<string>
}

export const defaultResults: Results = {
  trip_id: '',
  markup: 0,
  segments: [[]],
  flight_details: [],
  path_sequence: ['']
};

export interface Segment {
  source: string;
  origin: string;
  origin_name: string;
  destination: string;
  destination_name: string;
  itinerary_type: string;
  itinerary_id: string;
  itinerary_markup: number;
  itinerary_structure: string;
  segment_position: number;
  vi_solution_id?: string;
  itinerary_index?: number;
  virtual_interline: boolean;
  vi_type?: string;
  vi_position?: number;
  weight: number;
  price: number;
  base_price: number;
  taxes: number;
  fees: number;
  transportation_time: number;
  fare_type: string;
  baggage: Baggage;
  additional_details: AdditionalDetails;
  cabin_class: string;
  alliance: string;
  private_fare: string;
  priced_passengers: Array<string>;
  plating_carrier: string;
  segment_id: string;
  segment_time_w_connections: number;
  flights: Array<FlightResult>;
  brands?: Array<BrandInfo>;
  selected_brand_index?: number;
  status?: string;
  fare_info?: FareInfo;
  relativePrice?: number;
  relativeWeight?: number;
  relativeTime?: number;
  filtered?: boolean;
  credential_info: Credentials;
  vi_segment_base_price?: number;
  vi_segment_taxes?: number;
  vi_segment_fees?: number;
}

export interface FareInfo {
  booking_code: string;
  cabin_class: string;
  fare_basis: string;
  name: string;
  brand: Brand;
}

export interface Baggage {
  number_of_pieces: any;
}

export interface AdditionalDetails {
  e_ticketability: boolean;
  latest_ticketing_time: string;
  refundable: boolean;
  cancel_penalty: Penalty;
  change_penalty: Penalty;
  fare_types_info: string;
}

export interface Penalty {
  amount?: number;
  percentage?: number;
}

export interface FlightResult {
  flight_detail_ref: string;
  booking_code: string;
  fare_type: string;
  fare_basis_code: string;
  cabin_class: string;
  brand?: Brand;
  brand_identifier: string;
}

export interface Brands {
  [reference: string]: Array<BrandInfo>
}

export interface Brand {
  brand_description: string;
  brand_services: BrandServices;
  carrier: string;
  name: string;
  tier: string;
  tag_info: string;
  tag_line: string;
  services: Array<BrandService>;
}

export interface BrandInfo {
  base_price: number;
  taxes: number;
  price: number;
  baggage_info: BaggageInfo
  fare_info: Array<FareInfo>
  cancel_penalty: Penalty
  change_penalty: Penalty
}

export interface BrandServices {
  checked_baggage: boolean;
  meals_and_beverages: boolean;
  rebooking: string;
  refund: string;
  seat_assignment: string;
  carry_on_hand_baggage: string;
}

export interface BrandService {
  classification: string;
  description: string;
  group: string;
  marketing_carrier: string;
  status: string;
}

export interface FlightResultsDetails {
  reference: string;
  origin: string;
  origin_name: string;
  destination: string;
  destination_name: string;
  departure_time: string;
  arrival_time: string;
  flight_number: string;
  carrier: string;
  operating_carrier: string;
  flight_time: number;
  booking_code?: string;
  cabin_class?: string;
  brand_identifier?: string;
}

export interface Location {
  origin: string;
  destination: string;
  nNights: number;
}

export interface BaggageInfo {
  pieces: number;
  units: string;
}