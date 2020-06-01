import { createStore, Store } from 'redux';
import rootReducer from './reducers/index';
import { SearchDetails, defaultFlight, defaultPassengerList } from './trip/search/Interfaces';

export interface State {
  searchDetails: SearchDetails
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
};

const store: Store = createStore(rootReducer, defaultState);

export default store;
