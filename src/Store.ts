import { createStore, Store, applyMiddleware } from 'redux';
import rootReducer from './reducers/index';
import { SearchDetails, defaultFlight, defaultPassengerList }
  from './trip/search/Interfaces';
import { AuthDetails, defaultAuth } from './auth/AuthInterfaces';
import thunk from 'redux-thunk';

export interface State {
  searchDetails: SearchDetails,
  authDetails: AuthDetails
}

const defaultState: Object = {
  searchDetails: {
    flights: [
      defaultFlight
    ],
    currency: 'USD',
    passengers: defaultPassengerList,
    route_flexible: false
  },
  authDetails: {
    ...defaultAuth
  }
};

const store: Store = createStore(rootReducer, defaultState, applyMiddleware(thunk));

export default store;
