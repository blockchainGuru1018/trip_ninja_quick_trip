import { ResultsDetails } from '../trip/results/ResultsInterfaces';

function resultsReducer(state: ResultsDetails = {} as any, action: any) {
  switch(action.type) {
    case 'SET_RESULTS':
      return {
        fareStructureResults: action.results.fare_structure,
        flexTripResults: action.results.flex_trip,
        errors: {errorFound: false}
      };

    case 'SET_ERROR_DETAILS':
      return {...state, errors: {errorFound: action.value}}

    default:
      return state;
  }
}

export default resultsReducer;