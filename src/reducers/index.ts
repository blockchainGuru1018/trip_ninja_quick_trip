import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import searchDetailsReducer from './SearchDetailsReducer';
import authDetailsReducer from './AuthDetailsReducer';
import resultsReducer from './ResultsReducer';
import pricingReducer from './PricingReducer';
import bookReducer from './BookReducer';

const rootReducer = combineReducers({
  searchDetails: searchDetailsReducer,
  authDetails: authDetailsReducer,
  resultsDetails: resultsReducer,
  pricingDetails: pricingReducer,
  bookingDetails: bookReducer,
  routing: routerReducer
});

export default rootReducer;
