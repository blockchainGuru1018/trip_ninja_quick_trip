
import { ResultsDetails, Segment, BrandInfo } from '../trip/results/ResultsInterfaces';
import { Dispatch } from 'redux';

export const setSearchResults = (results: ResultsDetails) => (dispatch: Dispatch<any>) => {
  dispatch(setResults(results));
};


export function setResults(results: ResultsDetails) {
  return {
    type: 'SET_RESULTS',
    results
  };
}

export function setErrorDetails(value: boolean) {
  return {
    type: 'SET_ERROR_DETAILS',
    value
  };
}

export function setTripType(value: string) {
  return {
    type: 'SET_TRIP_TYPE',
    value
  };
}

export function setActiveSegments(){
  return {
    type: 'SET_ACTIVE_SEGMENT'
  };
}

export function updateActives(segmentOptionIndex: number, segmentItineraryRef: string) {
  return {
    type: 'UPDATE_ACTIVES',
    segmentOptionIndex,
    segmentItineraryRef
  };
}

export function updateFareFamily(segment: Segment, brand: BrandInfo) {
  return {
    type: 'UPDATE_FARE_FAMILY',
    segment,
    brand
  };
}