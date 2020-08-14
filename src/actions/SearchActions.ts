import { SearchPayload } from '../trip/search/SearchInterfaces';
import { setResults, setErrorDetails, setActiveSegments }
  from './ResultsActions';
import API from '../Api';

export function fetchSearch(tripDetails: Object) {
  return {
    type: 'FETCH_SEARCH',
    tripDetails
  };
}

export function newSearch(searchDetails: Object) {
  return {
    type: 'NEW_SEARCH',
    searchDetails
  };
}

export function resetSearch() {
  return {
    type: 'RESET_SEARCH'
  };
}

export function setValue(valueType: string, value: any) {
  return {
    type: 'SET_VALUE',
    valueType,
    value
  };
}

export const addFlight = (flight: object) => async (dispatch: any) => {
  await dispatch({
    type: 'ADD_FLIGHT',
    flight
  });
  return Promise.resolve();
};

export function updateFlightValue(index: number, key: string, value: string) {
  return {
    type: 'UPDATE_FLIGHT_VALUE',
    index,
    key,
    value
  };
}

export function updatePassengers(passengerType: string, value: number) {
  return {
    type: 'UPDATE_PASSENGERS',
    passengerType,
    value
  };
}

export function removeFlight(flightIndex: number) {
  return {
    type: 'REMOVE_FLIGHT',
    flightIndex
  };
}

export function searchLoading(value: boolean) {
  return {
    type: 'SEARCH_LOADING',
    value
  };
}

export const searchFlights = (searchPayload: SearchPayload) => (dispatch: any) => {
  dispatch(searchLoading(true));
  const url: string = '/multicitysearch/';
  return API.post(url, searchPayload)
    .then((response: any) => {
      if (response.data.detail) {
        dispatch(searchLoading(false));
        dispatch(setErrorDetails(true, 'search'));
        return {'success': false};
      } else {
        dispatch(setResults(response.data));
        dispatch(setActiveSegments());
        dispatch(setErrorDetails(false, 'search'));
        dispatch(searchLoading(false));
        return {'success': true, 'flex_trip': response.data.flex_trip ? true : false};
      }
    })
    .catch((error: any) => {
      dispatch(searchLoading(false));
      dispatch(setErrorDetails(true, 'search'));
      return {'success': false};
    });
};
