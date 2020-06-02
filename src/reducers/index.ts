import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import searchDetailsReducer from './SearchDetailsReducer';
import authDetailsReducer from './AuthDetailsReducer';

const rootReducer = combineReducers({
  searchDetails: searchDetailsReducer,
  authDetails: authDetailsReducer,
  routing: routerReducer
});

export default rootReducer;
