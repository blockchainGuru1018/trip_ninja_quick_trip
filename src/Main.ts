import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as searchActions from './actions/SearchActions';
import * as authActions from './actions/AuthActions';
import App from './App';
import { State } from './Store';

function mapStateToProps(state: State) {
  return {
    authDetails: state.authDetails,
    searchDetails: state.searchDetails
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators({...searchActions, ...authActions}, dispatch);
}

const Main = connect(mapStateToProps, mapDispatchToProps)(App);

export default Main
