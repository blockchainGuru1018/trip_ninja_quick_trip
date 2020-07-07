import {ResultsDetails, Segment, SegmentPositionMap} from '../trip/results/ResultsInterfaces';

function resultsReducer(state: ResultsDetails = {} as any, action: any) {
  switch(action.type) {
    case 'SET_RESULTS':
      return {...state,
        fareStructureResults: action.results.fare_structure,
        flexTripResults: action.results.flex_trip,
        errors: {errorFound: false},
        tripType: 'fareStructureResults',
      };

    case 'SET_VALUE_FOR_SEGMENT_POSITION_MAP':
      state.segmentPositionMap.setValue(action.segmentPosition, action.valueType, action.value);
      console.log(`SET_VALUE_FOR_SEGMENT: segmentPosition ${action.segmentPosition}, sort order selected -> ${action.value}, segmentPositionMap -> `, state.segmentPositionMap);
      return {...state};

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