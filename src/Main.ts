import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as searchActions from './actions/SearchActions';
import * as authActions from './actions/AuthActions';
import * as resultsActions from './actions/ResultsActions';
import * as priceActions from './actions/PricingActions';
import * as bookActions from './actions/BookActions';
import App from './App';
import { State } from './Store';

function mapStateToProps(state: State) {
  return {
    authDetails: state.authDetails,
    searchDetails: state.searchDetails,
    resultsDetails: state.resultsDetails,
    pricingDetails: state.pricingDetails,
    bookingDetails: state.bookingDetails,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators({...searchActions, ...authActions,
    ...resultsActions, ...priceActions, ...bookActions}, dispatch);
}

const Main = connect(mapStateToProps, mapDispatchToProps)(App);

export default Main;
