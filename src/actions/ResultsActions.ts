import API from '../Api';
import { ResultsDetails } from '../trip/results/ResultsInterfaces';

export const setSearchResults = (results: ResultsDetails) => (dispatch: any) => {
  dispatch(setResults(results))
}

export function setResults(results: ResultsDetails) {
  return {
    type: 'SET_RESULTS',
    results
  }
}

export function setErrorDetails(value: boolean) {
  return {
    type: 'SET_ERROR_DETAILS',
    value
  }
}

export function setTripType(value: string) {
  return {
    type: 'SET_TRIP_TYPE',
    value
  }
}