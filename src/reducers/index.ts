import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import searchDetailsReducer from './SearchDetailsReducer';
import authDetailsReducer from './AuthDetailsReducer';
import resultsReducer from './ResultsReducer';

const rootReducer = combineReducers({
  searchDetails: searchDetailsReducer,
  authDetails: authDetailsReducer,
  resultsDetails: resultsReducer,
  routing: routerReducer
});

export default rootReducer;
