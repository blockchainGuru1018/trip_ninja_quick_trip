
export interface ResultsDetails {
  fareStructureResults?: Results;
  flexTripResults?: Results;
  errors: Errors;
  tripType: string;
  activeSegments: ActiveSegmentsMap
  segmentPositionMap: SegmentPositionMap;
  itinerarySortBy: string;
  segmentSortBy: Array<string>;
  segmentFilters?: Array<Filters>
  itineraryFilters?: Filters
}

export interface Filters {
  baggage: number
  numberOfStops: number
}

export const defaultFilters: Filters = {
<<<<<<< HEAD
  baggage: 0,
  numberOfStops: 3
}
=======
  baggage: 0
};
>>>>>>> develop

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
  activeSegments: new ActiveSegmentsMap(),
  errors: {
    errorFound: false,
    errorType: ''
  },
  tripType: 'fareStructureResults',
  segmentPositionMap: new SegmentPositionMap(),
  itinerarySortBy: 'best',
  segmentSortBy: []
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

export interface Segment {
  source: string;
  origin: string;
  origin_name: string;
  destination: string;
  destination_name: string;
  itinerary_type: string;
  itinerary_id: string;
  itinerary_structure: string;
  segment_position: number;
  option_id?: string;
  option_part?: string;
  virtual_interline: boolean;
  vi_type?: string;
  vi_position?: string;
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
  filtered?: boolean
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
  refundable: string;
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