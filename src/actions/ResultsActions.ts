
import { ResultsDetails, Segment, BrandInfo } from '../trip/results/ResultsInterfaces';
import { PricingRequestInterface, PricingDetails } from '../trip/results/PricingInterfaces';
import API from '../Api';

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
  updateActivesInitial: boolean = false, sortBy: string = 'best', virtualInterline: boolean = false) {
  return {
    type: 'UPDATE_ACTIVES',
    segmentOptionIndex,
    segmentItineraryRef,
    updateActivesInitial,
    sortBy,
    virtualInterline
  };
}

export const updateEntireTrip = (setActivesInitial: boolean = true, sortBy: string) => (dispatch: any) => {
  dispatch(setResultsLoading(true));
  setTimeout(() => {
    dispatch(updateEntireTripAction(setActivesInitial, sortBy));
    dispatch(setResultsLoading(false));
  }, 2000);

};

export function updateEntireTripAction(setActivesInitial: boolean = true, sortBy: string) {
  return {
    type: 'UPDATE_ENTIRE_TRIP',
    setActivesInitial,
    sortBy
  };
}

export function updateFareFamily(segment: Segment, brands: Array<BrandInfo>, index: number) {
  return {
    type: 'UPDATE_FARE_FAMILY',
    segment,
    brands,
    index
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

export function setBrandedFaresInfo(segment: Segment, data: PricingDetails) {
  return {
    type: 'SET_BRANDED_FARES_INFO',
    segment,
    data
  };
}

export function updateStateValue(key: string, value: any) {
  return {
    type: 'UPDATE_STATE_VALUE',
    key,
    value
  };
}

export function setResultsLoading(value: boolean) {
  return {
    type: "SET_RESULTS_LOADING",
    value
  };
}

export const getTravelportBrands = (pricingPayload: PricingRequestInterface, segment: Segment) => (dispatch: any) => {
  const url: string = '/price/';
  return API.post(url, pricingPayload)
    .then((response: any) => {
      if (response.data.status) {
        throw Error;
      } else {
        dispatch(setErrorDetails(false, 'pricing'));
        dispatch(setBrandedFaresInfo(segment, response.data));
        return {'success': true};
      }
    })
    .catch((Error: any) => {
      return {'success': false};
    });
};

export function setFilterWarning(warning: boolean) {
  return {
    type: 'SET_FILTER_WARNING',
    warning
  };
}

