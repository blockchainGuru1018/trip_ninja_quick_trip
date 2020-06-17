import { ResultsDetails, Segment } from '../trip/results/ResultsInterfaces';

function resultsReducer(state: ResultsDetails = {} as any, action: any) {
  switch(action.type) {
    case 'SET_RESULTS':
      return {
        fareStructureResults: action.results.fare_structure,
        flexTripResults: action.results.flex_trip,
        errors: {errorFound: false},
        tripType: 'fareStructureResults'
      };

    case 'SET_ERROR_DETAILS':
      return {...state, errors: {errorFound: action.value}};
    
    case 'SET_TRIP_TYPE':
      return {...state, tripType: action.value};

    case 'SET_ACTIVE_SEGMENT':
      return setSegmentStatus(state, action);

    default:
      return state;
  }
}

function setSegmentStatus(state: any, action: any) {
  const segments = state[state.tripType].segments[action.itineraryIndex];
  segments.map((segment: Segment) => {return segment.status = 'inactive'});
  segments[action.segmentIndex].status = 'active';
  return {...state};
}

export default resultsReducer;