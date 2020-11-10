import { updateActiveSegmentsFromAction, getOtherPositionsInItineraryStructure } from '../helpers/CompatibilityHelpers';
import { ResultsDetails, Segment, ActiveSegmentsMap, BrandInfo, Results, defaultFilters, Filter
} from '../trip/results/ResultsInterfaces';
import { identifyAndSetInitialActives, setRelativesAndUpdateActives, setIndex0AsActives
} from '../helpers/RelativesHelper';
import { filterItinerary } from "../helpers/Filters";
import _ from 'lodash';
import { setFilterWarning } from '../actions/ResultsActions';

function resultsReducer(state: ResultsDetails = {} as any, action: any) {
  switch(action.type) {
    case 'SET_RESULTS':
      return {...state,
        fareStructureResults: action.results.fare_structure,
        flexTripResults: action.results.flex_trip,
        errors: {errorFound: false},
        tripType: 'fareStructureResults',
        activeSegments: new ActiveSegmentsMap(),
        segmentFilters: setDefaultSegmentFilters(action.results.fare_structure),
        itineraryFilters: _.cloneDeep(defaultFilters),
        segmentSortBy: action.results.fare_structure.segments.map((segmentOption: Array<Array<Segment>>) => 'best'),
        flexTripResultsPrice: 0,
        fareStructureResultsPrice: 0
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
      return identifyAndSetInitialActives(state, 'best');

    case 'UPDATE_ACTIVES':
      return updateActiveSegmentsFromAction(state, action);

    case 'UPDATE_ENTIRE_TRIP':
      return updateEntireTripReducer(state, action);

    case 'UPDATE_FARE_FAMILY':
      return updateSegmentFareFamily(state, action);

    case 'SET_BRANDED_FARES_INFO':
      return setSegmentBrandInfo(state, action);

    case 'UPDATE_ITINERARY_FILTER':
      return updateFilterReturnValue(state, action);

    case 'UPDATE_SEGMENT_FILTER':
      const relatedFilter: Filter | undefined = state.segmentFilters![action.segmentIndex].find((segmentFilter: Filter) =>
        segmentFilter.type === action.filterKey
      );
      relatedFilter!.value = action.filterValue;
      return {...state};

    case 'UPDATE_SORT_TYPE':
      if (action.segmentIndex < 0) {
        state.itinerarySortBy = action.sortBy;
        state.segmentSortBy = state.segmentSortBy.map((sortBy: string) => action.sortBy);
        return state;
      } else {
        state.segmentSortBy[action.segmentIndex] = action.sortBy;
        return {...state};
      }

    case 'SET_FILTER_WARNING':
      return {...state, filterWarning: action.warning};

    case 'UPDATE_STATE_VALUE':
      state[action.key] = action.value;
      return {...state};

    default:
      return state;
  }
}

function updateEntireTripReducer(state: ResultsDetails, sortBy: string) {
  if (!viable(state)) {
    setIndex0AsActives(state);
  }
  setRelativesAndUpdateActives(state, true, sortBy);
  setRelativesAndUpdateActives(state);
  checkFiltersSuccess(state);
  return {...state};
}

function updateSegmentFareFamily(state: ResultsDetails, action: any) {
  const selectedSegment: Segment = action.segment;
  setSegmentFareFamily(selectedSegment, action.brands, action.index);
  if (selectedSegment.virtual_interline) {
    let viOtherPosition = selectedSegment.vi_position === 0 ? 1 : 0;
    let segmentsList = state[state.tripType].segments[selectedSegment.segment_position];
    const linkedViSegment: Segment | undefined = segmentsList.find((segment: Segment) =>
      segment.vi_solution_id === selectedSegment.vi_solution_id &&
      segment.vi_position === viOtherPosition
    );
    if (linkedViSegment) {
      linkedViSegment.base_price = selectedSegment.base_price;
      linkedViSegment.taxes = selectedSegment.taxes;
      linkedViSegment.price = selectedSegment.price;
    }    
  }
  if (selectedSegment.itinerary_type === 'OPEN_JAW') {
    const relatedSegmentPositions: Array<number> = getOtherPositionsInItineraryStructure(selectedSegment);
    relatedSegmentPositions.forEach((linkedSegmentPosition: number) => {
      let linkedSegmentOptions: Array<Segment> = state[state.tripType].segments[linkedSegmentPosition];
      let linkedSegment: Segment | undefined = linkedSegmentOptions.find((segment: Segment) =>
        segment.itinerary_id === selectedSegment.itinerary_id
      );
      linkedSegment && setSegmentFareFamily(linkedSegment, action.brands, action.index);
    });
  }
  return {...state};
}

function setSegmentFareFamily(segment: Segment, brands: Array<BrandInfo>, brandIndex: number) {
  const brand: BrandInfo = brands[brandIndex];
  let oldBrandIndex = segment.selected_brand_index ? segment.selected_brand_index : 0;
  segment.selected_brand_index = brandIndex;
  if (segment.virtual_interline) {
    segment.base_price += brand.base_price - brands[oldBrandIndex].base_price;
    segment.taxes += brand.taxes - brands[oldBrandIndex].taxes;
    segment.price += brand.price - brands[oldBrandIndex].price;
  } else {
    segment.base_price = brand.base_price;
    segment.taxes = brand.taxes;
    segment.price = brand.price;
  }  
  segment.baggage.number_of_pieces = brand.baggage_info.pieces;
  segment.flights.forEach((flight: any, index) => {
    let fareInfo = segment.source === 'travelport' ? brand.fare_info[0] : brand.fare_info[index];
    flight.booking_code =  fareInfo.booking_code;
    flight.brand_identifier = fareInfo.brand.tier ? fareInfo.brand.tier: fareInfo.brand.name;
    flight.cabin_class =  fareInfo.cabin_class;
    flight.fare_basis_code =  fareInfo.fare_basis;
  });
}

function setSegmentBrandInfo(state: ResultsDetails, action: any) {
  const selectedSegment: Segment = action.segment;
  const brands: Array<BrandInfo> = action.data.itineraries[0].segments[0].brands;
  selectedSegment.brands = brands;
  if (selectedSegment.itinerary_type === 'OPEN_JAW') {
    const relatedSegmentPositions: Array<number> = getOtherPositionsInItineraryStructure(selectedSegment);
    relatedSegmentPositions.forEach((linkedSegmentPosition: number) => {
      let linkedSegmentOptions: Array<Segment> = state[state.tripType].segments[linkedSegmentPosition];
      let linkedSegment: Segment | undefined = linkedSegmentOptions.find((segment: Segment) =>
        segment.itinerary_id === selectedSegment.itinerary_id
      );
      linkedSegment && (linkedSegment.brands = brands);
    });
  }
  return {...state};
}

function setDefaultSegmentFilters(fareStructureResults: Results) {
  let segmentFilters: Array<Array<Filter>> = [];
  fareStructureResults.segments.forEach((segment: Array<Segment>) => segmentFilters.push(_.cloneDeep(defaultFilters)));
  return segmentFilters;
}

function updateFilterReturnValue(state: ResultsDetails, action: any) {
  let filter = state.itineraryFilters!.find((itineraryFilter: Filter) => itineraryFilter.type === action.filterKey);
  filter!.value = action.filterValue;
  state.segmentFilters!.forEach((segmentFilters: Array<Filter>) => {
    segmentFilters.forEach((segmentFilter: Filter) => {
      if (segmentFilter.type === action.filterKey) {
        segmentFilter.value = action.filterValue;
      }
    });
  });
  const tripType = state.tripType;
  filterItinerary(state[tripType].segments, state.itineraryFilters!);
  return state;
}

export function viable(state: ResultsDetails) {
  const activeSegments: Array<Segment> = [...state.activeSegments.values()];
  return activeSegments.every((segment: Segment) => !segment.filtered);
}

function checkFiltersSuccess(state: ResultsDetails) {
  const numberOfFailedFilters: number = state.itineraryFilters!.reduce((total, filter: Filter) =>
    filter.failed ? total += 1 : total, 0);
  setFilterWarning(!viable(state) && numberOfFailedFilters === 0);
}

export default resultsReducer;
