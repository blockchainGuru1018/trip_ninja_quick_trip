import { updateActiveSegmentsFromAction, getOtherPositionsInItineraryStructure } from '../helpers/CompatibilityHelpers';
import { ResultsDetails, Segment, ActiveSegmentsMap, BrandInfo, Results, Filters, defaultFilters } from '../trip/results/ResultsInterfaces';
import { identifyAndSetInitialActives, setRelativesAndUpdateActives, setFilteredRelatives} from '../helpers/RelativesHelper';
import { filterItinerary } from "../helpers/Filters";

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
        itineraryFilters: {...defaultFilters},
        segmentSortBy: action.results.fare_structure.segments.map((segmentOption: Array<Array<Segment>>) => 'best')
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

    case 'UPDATE_ENTIRE_TRIP':
      const viable: boolean = [...state.activeSegments.values()].every((segment: Segment) => !segment.filtered)
      if (!viable) {
        setFilteredRelatives(state)
      }
      setRelativesAndUpdateActives(state, action.setActivesInitial, action.sortBy);
      return {...state}

    case 'UPDATE_FARE_FAMILY':
      return updateSegmentFareFamily(state, action);

    case 'UPDATE_ITINERARY_FILTER':
      return updateFilterReturnValue(state, action);

    case 'UPDATE_SEGMENT_FILTER':
      state.segmentFilters![action.segmentIndex][action.filterKey] = action.filterValue;
      return {...state};

    case 'UPDATE_SORT_TYPE':
      if (action.segmentIndex < 0) {
        let updatedSegmentSortBy: Array<string> = state.segmentSortBy.map((sortBy: string) => action.sortBy)
        return {...state, itinerarySortBy: action.sortBy, segmentSortBy: updatedSegmentSortBy}
      } else {
        state.segmentSortBy[action.segmentIndex] = action.sortBy
        return {...state}
      }
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

function setDefaultSegmentFilters(fareStructureResults: Results) {
  let segmentFilters: Array<Filters> = [];
  fareStructureResults.segments.forEach((segment: Array<Segment>) => segmentFilters.push({...defaultFilters}));
  return segmentFilters;
}

function updateFilterReturnValue(state: ResultsDetails, action: any) {
  state.itineraryFilters![action.filterKey] = action.filterValue
  const updatedSegmentFilters = state.segmentFilters!.map((filters: Filters) => ({...filters, [action.filterKey]: action.filterValue}))
  filterItinerary(state[state.tripType].segments, state.itineraryFilters!)
  return {...state, segmentFilters: updatedSegmentFilters}
}

export default resultsReducer;
