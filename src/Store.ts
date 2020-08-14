import { createStore, Store, applyMiddleware } from 'redux';
import rootReducer from './reducers/index';
import { SearchDetails, defaultSearchDetails } from './trip/search/SearchInterfaces';
import { AuthDetails, defaultAuth } from './auth/AuthInterfaces';
import { ResultsDetails, defaultResultsDetails } from './trip/results/ResultsInterfaces';
import { PricingDetails, defaultPricingDetails } from './trip/results/PricingInterfaces';
import { BookingDetails, defaultBookingDetails } from './trip/book/BookInterfaces';
import { BookingsList, defaultBookingsList } from './bookings/BookingsInterfaces';
import thunk from 'redux-thunk';
import { jwtMiddleware } from './Middleware';

export interface State {
  searchDetails: SearchDetails,
  authDetails: AuthDetails,
  resultsDetails: ResultsDetails,
  pricingDetails: PricingDetails,
  bookingDetails: BookingDetails,
  bookingsList: BookingsList
}

const defaultState: any = {
  searchDetails: defaultSearchDetails,
  authDetails: defaultAuth,
  resultsDetails: defaultResultsDetails,
  pricingDetails: defaultPricingDetails,
  bookingDetails: defaultBookingDetails,
  bookingsList: defaultBookingsList
};

const store: Store = createStore(
  rootReducer, defaultState, applyMiddleware(jwtMiddleware, thunk)
);

export default store;
