import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import searchDetailsReducer from './SearchDetailsReducer';

const rootReducer = combineReducers({
  searchDetails: searchDetailsReducer,
  routing: routerReducer
});

export default rootReducer;
