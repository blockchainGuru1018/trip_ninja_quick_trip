export function fetchSearch(tripDetails: object) {
  return {
    type: 'FETCH_SEARCH',
    tripDetails
  };
}

export function newSearch(searchDetails: object) {
  return {
    type: 'NEW_SEARCH',
    searchDetails
  }
}

export function setValue(valueType: string, value: any) {
  return {
    type: 'SET_SEARCH_VALUE',
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