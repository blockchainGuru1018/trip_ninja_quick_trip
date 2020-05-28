function searchDetails(state: object = {}, action: any) {
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
    default:
      return state;
  }
}

export default searchDetails;
