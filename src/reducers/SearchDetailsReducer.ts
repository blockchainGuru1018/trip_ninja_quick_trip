import { SearchDetails, Passenger } from '../trip/search/Interfaces';

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

    case 'UPDATE_FLIGHT_VALUE':
      const newFlight = state.flights[action.index]
      newFlight[action.key] = action.value
      const updatedFlights = [
        ...state.flights.slice(0, action.index),
        {...newFlight},
        ...state.flights.slice(action.index + 1)
      ]
      return {...state, flights: updatedFlights}

    case 'UPDATE_PASSENGERS':
      const passengerUpdateIndex: number = state.passengers.findIndex(passenger =>
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

    default:
      return state;
  }
}

export default searchDetailsReducer;
