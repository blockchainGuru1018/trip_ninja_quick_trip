import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as searchActions from './actions/SearchActions';
import App from './App';

function mapStateToProps(state: any) {
  return {
    searchDetails: state.searchDetails,
    resultsDetails: state.resultsDetails,
    itineraryDetails: state.itineraryDetails
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(searchActions, dispatch);
}

const Main = connect(mapStateToProps, mapDispatchToProps)(App);

export default Main
