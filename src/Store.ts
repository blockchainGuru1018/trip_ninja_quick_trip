import { createStore, Store } from 'redux';
import rootReducer from './reducers/index';
import { SearchDetails, defaultFlight } from './trip/search/Interfaces';

export interface State {
  searchDetails: SearchDetails
}

const defaultState: Object = {
  searchDetails: {
    flights: [
      defaultFlight
    ],
    currency: 'USD'
  },
  userCreds: {},

};

const store: Store = createStore(rootReducer, defaultState);

export default store;
