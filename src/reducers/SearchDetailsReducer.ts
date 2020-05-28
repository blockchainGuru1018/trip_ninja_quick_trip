import { SearchDetails } from '../trip/search/Interfaces';

function searchDetailsReducer(state: SearchDetails = {} as any, action: any) {
  switch(action.type) {
    case 'FETCH_SEARCH':
      return {
        ...state,
        items: action.payload
      }
    case 'NEW_SEARCH':
      return state
    case 'SET_SEARCH_VALUE':
      let newState: Object = {...state};
      newState[action.valueType] = action.value;
      return newState
    case 'ADD_FLIGHT':
      let flights = state.flights
      flights.push(action.flight)
      return {...state, flights: flights}
    default:
      return state;
  }
}

export default searchDetailsReducer;
