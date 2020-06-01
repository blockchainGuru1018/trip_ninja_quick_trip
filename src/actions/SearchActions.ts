
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

export function updatePassengers(passengerType: string, value: number) {
  return {
    type: 'UPDATE_PASSENGERS',
    passengerType,
    value
  }
}