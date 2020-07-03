import { updateActiveSegments, setAlternatesStatus } from '../helpers/CompatibilityHelpers';
import { Results, ResultsDetails, Segment, ActiveSegmentsMap } from '../trip/results/ResultsInterfaces';

function resultsReducer(state: ResultsDetails = {} as any, action: any) {
  switch(action.type) {
    case 'SET_RESULTS':
      return {
        fareStructureResults: action.results.fare_structure,
        flexTripResults: action.results.flex_trip,
        errors: {errorFound: false},
        tripType: 'fareStructureResults',
        activeSegments: new ActiveSegmentsMap()
      };

    case 'SET_ERROR_DETAILS':
      return {...state, errors: {errorFound: action.value}};

    case 'SET_TRIP_TYPE':
      return {...state, tripType: action.value};

    case 'SET_ACTIVE_SEGMENT':
      return setSegmentsAsActive(state);

    case 'UPDATE_ACTIVES':
      return updateActiveSegments(state, action);

    default:
      return state;
  }
}

function setSegmentsAsActive(state: ResultsDetails) {
  const trip: Results = state[state.tripType];
  trip.segments.forEach((segmentOptions: Array<Segment>, segmentOptionsIndex: number) => {
    let segment = segmentOptions[0];
    segment.status = 'active';
    state.activeSegments.set(segmentOptionsIndex, segment);
    setAlternatesStatus(state, segment, segmentOptions);
  });
  return state;
}

export default resultsReducer;
