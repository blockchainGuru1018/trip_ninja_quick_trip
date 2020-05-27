import { createStore, compose, Store } from 'redux';
import rootReducer from './reducers/index';

const defaultState: object = {
  searchDetails: {},
  resultsDetails: {},
  itineraryDetails: {}
};

const store: Store = createStore(rootReducer, defaultState);

export default store;
