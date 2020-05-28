import { createStore, Store } from 'redux';
import rootReducer from './reducers/index';
import { SearchDetails } from './trip/search/Interfaces';

export interface State {
  searchDetails: SearchDetails
}

const defaultState: Object = {
  searchDetails: {
    flights: [
      {
        'origin': '',
        'destination': '',
      }
    ]
  }
};

const store: Store = createStore(rootReducer, defaultState);

export default store;
