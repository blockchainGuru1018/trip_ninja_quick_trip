import { createStore, Store } from 'redux';
import rootReducer from './reducers/index';

const defaultState: object = {
  searchDetails: {
    randomThing: '12',
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
