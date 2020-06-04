import { SearchPayload } from '../trip/search/SearchInterfaces';
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

export function addFlight(flight: Object) {
  return {
    type: 'ADD_FLIGHT',
    flight
  }
}

export function updateFlightValue(index: number, key: string, value: string) {
  return {
    type: 'UPDATE_FLIGHT_VALUE',
    index,
    key,
    value
  }
}

export function updateFlightOriginDestination(index: number, key: string,
  value: string) {
    return {
      type: 'UPDATE_FLIGHT_ORIGIN_DESTINATION',
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

export const searchFlights = (searchPayload: SearchPayload, rootFlexible: boolean) => (dispatch: any) => {
  const url: string = rootFlexible
    ? '/multicitysearch/'
    : '/fare_structure/'
  API.post(url, searchPayload).then((response: any) => console.log(response))
}