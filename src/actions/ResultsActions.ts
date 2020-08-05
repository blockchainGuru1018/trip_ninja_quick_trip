
import { ResultsDetails, Segment, BrandInfo } from '../trip/results/ResultsInterfaces';

export function setResults(results: ResultsDetails) {
  return {
    type: 'SET_RESULTS',
    results
  };
}

export function setErrorDetails(value: boolean, errorType: string) {
  return {
    type: 'SET_ERROR_DETAILS',
    value,
    errorType
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

export function updateActives(segmentOptionIndex: number, segmentItineraryRef: string,
  updateActivesInitial: boolean = false, sortBy: string = 'best') {
  return {
    type: 'UPDATE_ACTIVES',
    segmentOptionIndex,
    segmentItineraryRef,
    updateActivesInitial,
    sortBy
  };
}

export function updateEntireTrip(setActivesInitial: boolean = true, sortBy: string) {
  return {
    type: 'UPDATE_ENTIRE_TRIP',
    setActivesInitial,
    sortBy
  };
}

export function updateFareFamily(segment: Segment, brand: BrandInfo, index: number) {
  return {
    type: 'UPDATE_FARE_FAMILY',
    segment,
    brand,
    index
  };
}

export function setSegmentPositionMapValue(segmentPosition: number, valueType: string, value: any) {
  return {
    type: 'SET_VALUE_FOR_SEGMENT_POSITION_MAP',
    segmentPosition,
    valueType,
    value
  };
}

export function updateItineraryFilter(filterKey: string, filterValue: any, segmentIndex: number) {
  return {
    type: 'UPDATE_ITINERARY_FILTER',
    segmentIndex,
    filterKey,
    filterValue
  };
}

export function updateSegmentFilter(filterKey: string, filterValue: any, segmentIndex: number) {
  return {
    type: 'UPDATE_SEGMENT_FILTER',
    segmentIndex,
    filterKey,
    filterValue
  };
}

export function updateSortType(segmentIndex: number, sortBy: string) {
  return {
    type: 'UPDATE_SORT_TYPE',
    segmentIndex,
    sortBy
  };
}
