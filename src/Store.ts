import { createStore, Store, applyMiddleware } from 'redux';
import rootReducer from './reducers/index';
import { SearchDetails, defaultSearchDetails }
  from './trip/search/SearchInterfaces';
import { AuthDetails, defaultAuth } from './auth/AuthInterfaces';
import thunk from 'redux-thunk';
import { jwtMiddleware } from './Middleware';

export interface State {
  searchDetails: SearchDetails,
  authDetails: AuthDetails,
}

const defaultState: Object = {
  searchDetails: defaultSearchDetails,
  authDetails: defaultAuth,
};

const store: Store = createStore(
  rootReducer, defaultState, applyMiddleware(jwtMiddleware, thunk)
);

export default store;
