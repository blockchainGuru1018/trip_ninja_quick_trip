import { updateActiveSegmentsFromAction, getOtherPositionsInItineraryStructure } from '../helpers/CompatibilityHelpers';
import { ResultsDetails, Segment, ActiveSegmentsMap, BrandInfo} from '../trip/results/ResultsInterfaces';
import {identifyAndSetInitialActives} from '../helpers/RelativesHelper';

function resultsReducer(state: ResultsDetails = {} as any, action: any) {
  switch(action.type) {
    case 'SET_RESULTS':
      return {...state,
        fareStructureResults: action.results.fare_structure,
        flexTripResults: action.results.flex_trip,
        errors: {errorFound: false},
        tripType: 'fareStructureResults',
        activeSegments: new ActiveSegmentsMap()
      };

    case 'SET_VALUE_FOR_SEGMENT_POSITION_MAP':
      state.segmentPositionMap.setValue(action.segmentPosition, action.valueType, action.value);
      return {...state};

    case 'SET_ERROR_DETAILS':
      return {...state, errors: {
        errorFound: action.value,
        errorType: action.errorType
      }};

    case 'SET_TRIP_TYPE':
      return {...state, tripType: action.value};

    case 'SET_ACTIVE_SEGMENT':
      return identifyAndSetInitialActives(state);

    case 'UPDATE_ACTIVES':
      return updateActiveSegmentsFromAction(state, action);

    case 'UPDATE_FARE_FAMILY':
      return updateSegmentFareFamily(state, action);

    default:
      return state;
  }
}

function updateSegmentFareFamily(state: ResultsDetails, action: any) {
  const selectedSegment: Segment = action.segment;
  const brand: BrandInfo = action.brand;
  setSegmentFareFamily(selectedSegment, brand, action.index);
  if (selectedSegment.itinerary_type === 'OPEN_JAW') {
    const relatedSegmentPositions: Array<number> = getOtherPositionsInItineraryStructure(selectedSegment);
    relatedSegmentPositions.forEach((linkedSegmentPosition: number) => {
      let linkedSegmentOptions: Array<Segment> = state[state.tripType].segments[linkedSegmentPosition];
      let linkedSegment: Segment | undefined = linkedSegmentOptions.find((segment: Segment) =>
        segment.itinerary_id === selectedSegment.itinerary_id
      );
      linkedSegment && setSegmentFareFamily(linkedSegment, brand, action.index);
    });
  }
  return {...state};
}

function setSegmentFareFamily(segment: Segment, brand: BrandInfo, brandIndex: number) {
  segment.selected_brand_index = brandIndex;
  segment.base_price = brand.base_price;
  segment.taxes = brand.taxes;
  segment.price = brand.price;
  segment.baggage.number_of_pieces = brand.baggage_info.pieces;
  segment.flights.forEach((flight: any, index) => {
    flight.booking_code = brand.fare_info[index].booking_code;
    flight.brand_identifier = brand.fare_info[index].brand.name;
    flight.cabin_class = brand.fare_info[index].cabin_class;
    flight.fare_basis_code = brand.fare_info[index].fare_basis;
  });
}

export default resultsReducer;
