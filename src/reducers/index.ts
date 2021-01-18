import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import searchDetailsReducer from './SearchDetailsReducer';
import authDetailsReducer from './AuthDetailsReducer';
import resultsReducer from './ResultsReducer';
import pricingReducer from './PricingReducer';
import bookReducer from './BookReducer';
import bookingsReducer from './BookingsReducer';
import auth from "../admin/store/auth/reducer";
import users from "../admin/store/users/reducer";
import teams from "../admin/store/teams/reducer";
import agencies from "../admin/store/agencies/reducer";

const rootReducer = combineReducers({
  searchDetails: searchDetailsReducer,
  authDetails: authDetailsReducer,
  resultsDetails: resultsReducer,
  pricingDetails: pricingReducer,
  bookingDetails: bookReducer,
  bookingsList: bookingsReducer,
  routing: routerReducer,
  auth,
  users,
  teams,
  agencies,
});

export default rootReducer;
