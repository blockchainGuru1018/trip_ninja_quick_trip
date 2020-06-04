import { SearchDetails, Passenger, Flight, defaultSearchDetails }
  from '../trip/search/SearchInterfaces';

function searchDetailsReducer(state: SearchDetails = {} as any, action: any) {
  switch(action.type) {

    case 'FETCH_SEARCH':
      return {
        ...state,
        items: action.payload
      }

    case 'NEW_SEARCH':
      return state

    case 'SET_VALUE':
      let newState: Object = {...state};
      newState[action.valueType] = action.value;
      return newState

    case 'ADD_FLIGHT':
      let flights = [...state.flights, action.flight];
      return {...state, flights: flights}

    case 'RESET_SEARCH':
      return defaultSearchDetails

    case 'UPDATE_FLIGHT_VALUE':
      return updateFlightsWithValue(state, action)

    case 'UPDATE_FLIGHT_ORIGIN_DESTINATION':
      const stateUpdate1 = updateFlightsWithValue(state, action);
      action.key = 'endType';
      action.value = action.value.includes('All Airports') ? 'C' : 'A';
      return updateFlightsWithValue(stateUpdate1, action);

    case 'UPDATE_PASSENGERS':
      const passengerUpdateIndex: number = state.passengers.findIndex((passenger: Passenger) =>
        passenger.type === action.passengerType
      );
      let newPassenger: Passenger = state.passengers[passengerUpdateIndex]
      newPassenger.count += action.value;
      if(newPassenger.count < 0) {
        newPassenger.count = 0
      };
      const updatedPassengers: Array<Passenger> = [
        ...state.passengers.slice(0, passengerUpdateIndex),
        {...newPassenger},
        ...state.passengers.slice(passengerUpdateIndex + 1),
      ]
      return {...state, passengers: updatedPassengers}

    case 'REMOVE_FLIGHT':
      const flightsAfterDeletion: Array<Flight> =  [
        ...state.flights.slice(0, action.flightIndex),
        ...state.flights.slice(action.flightIndex + 1)
      ]
      return {...state, flights: flightsAfterDeletion}
    default:
      return state;
  }
}

function updateFlightsWithValue(state: any, action: any) {
  const newFlight = state.flights[action.index]
  newFlight[action.key] = action.value
  const updatedFlights = [
    ...state.flights.slice(0, action.index),
    {...newFlight},
    ...state.flights.slice(action.index + 1)
  ]
  return {...state, flights: updatedFlights}
}

export default searchDetailsReducer;
