import {FETCH_SEARCH, NEW_SEARCH } from '../actions/Types';

function searchDetails(state: object = {}, action: any) {
  switch(action.type) {
    case FETCH_SEARCH:
    return {
      ...state,
      items: action.payload
    }
    case NEW_SEARCH:
      return state
    default:
      return state;
  }
}

export default searchDetails;
