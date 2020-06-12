import { SearchPayload } from '../trip/search/SearchInterfaces';
import { setSearchResults } from './ResultsActions';
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
  }
}

export function resetSearch() {
  return {
    type: 'RESET_SEARCH'
  }
}

export function setValue(valueType: string, value: any) {
  return {
    type: 'SET_VALUE',
    valueType,
    value
  }
}

export const addFlight = (flight: object) => async (dispatch: any) => {
  await dispatch({
    type: 'ADD_FLIGHT',
    flight
  })
  return Promise.resolve()
}

export function updateFlightValue(index: number, key: string, value: string) {
  return {
    type: 'UPDATE_FLIGHT_VALUE',
    index,
    key,
    value
  }
}

export function updatePassengers(passengerType: string, value: number) {
  return {
    type: 'UPDATE_PASSENGERS',
    passengerType,
    value
  }
}

export function removeFlight(flightIndex: number) {
  return {
    type: 'REMOVE_FLIGHT',
    flightIndex
  }
}

export function searchLoading(value: boolean) {
  return {
    type: 'SEARCH_LOADING',
    value
  }
}

export const searchFlights = (searchPayload: SearchPayload, rootFlexible: boolean) => (dispatch: any) => {
  dispatch(searchLoading(true));
  const url: string = rootFlexible
    ? '/multicitysearch/'
    : '/fare_structure/'
  return API.post(url, searchPayload).then((response: any) => {
    dispatch(searchLoading(false));
    dispatch(setSearchResults(response.data));
    console.log(response)
    return true
  })
}
