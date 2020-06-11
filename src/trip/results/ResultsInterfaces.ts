
export interface ResultsDetails {
  fareStructureResults?: Results;
  flexTripResults?: Results;
}

export const defaultResultsDetails: ResultsDetails = {}

export interface Results {
  tripId: string;
  markup: number;
  segments: Array<Array<Segment>>
  flightDetails: Array<FlightResultsDetails>
}

export interface Segment {
  source: string;
  origin: string;
  destination: string;
  itineraryType: string;
  itineraryId: string;
  segmentPosition: number;
  optionId?: string;
  optionPart?: string;
  virtualInterline: boolean;
  viType?: string;
  viPosition?: string;
  weight: number;
  price: number;
  basePrice: number;
  taxes: number;
  fess: number;
  transportationTime: number;
  fareType: string;
  baggage: Baggage;
  additionalDetails: AdditionalDetails;
  cabinClass: string;
  alliance: string;
  privateFare: string;
  pricedPassengers: string;
  segmentTimeWithConnections: number;
  flights: Array<FlightResult>
  brands?: Array<Brands>
}

export interface Baggage {
  numberOfPieces: number;
}

export interface AdditionalDetails {
  eTicketability: boolean;
  latestTicketingTime: string;
  refundable: string;
  cancelPenalty: Penalty;
  changePenalty: Penalty;
  fareTypesInfo: string;
}

export interface Penalty {
  amount?: number;
  percentage?: number;
}

export interface FlightResult {
  flightDetailRef: number;
  bookingCode: string;
  fareType: string;
  fareBasisCode: string;
  cabinClass: string;
  brand?: Brand
}

export interface Brands {
  [reference: string]: Array<Segment>
}

export interface Brand {
  brandDescription: string;
  brandServices: Array<BrandServices>;
  carrier: string;
  name: string;
  tagInfo: string;
  service: Array<BrandService>;
}

export interface BrandServices {
  checkedBaggage: boolean;
  mealsAndBeverages: boolean;
  rebooking: boolean;
  refund: boolean;
  seatAssignment: string;
}

export interface BrandService {
  classification: string;
  description: string;
  group: string;
  marketingCarrier: string;
  status: string;
}

export interface FlightResultsDetails {
  reference: string;
  origin: string;
  destination: string;
  departureTime: Date;
  arrivalTime: Date;
  flightNumber: number;
  carrier: string;
  flightTime: number;
}