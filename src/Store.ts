import { createStore, Store } from 'redux';
import rootReducer from './reducers/index';
import { SearchDetails, defaultFlight, defaultPassengerList }
  from './trip/search/Interfaces';
import { AuthDetails } from './auth/AuthInterfaces';

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
    authToken: ''
  }
};

const store: Store = createStore(rootReducer, defaultState);

export default store;
