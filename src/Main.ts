import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as searchActions from './actions/SearchActions';
import App from './App';
import { State } from './Store';

function mapStateToProps(state: State) {
  return {
    searchDetails: state.searchDetails,
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(searchActions, dispatch);
}

const Main = connect(mapStateToProps, mapDispatchToProps)(App);

export default Main
