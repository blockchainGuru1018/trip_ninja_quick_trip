import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import IdleTimerContainer from './common/IdleTimerContainer';
import NavBar from './common/NavBar';
import Home from './common/Home';
import Search from './trip/search/Search';
import Login from './auth/Login';
import FlexTripResult from './trip/results/FlexTripResult';
import ItineraryResult from './trip/results/ItineraryResult';
import SegmentSelection from './trip/results/SegmentSelection';
import './App.css';
import { setValue, addFlight, updateFlightValue, updatePassengers,removeFlight,
  updateFlightOriginDestination, searchFlights } from './actions/SearchActions';
import { SearchDetails } from './trip/search/SearchInterfaces';
import { AuthDetails } from './auth/AuthInterfaces';
import { login, fetchUserParameters, logout } from './actions/AuthActions';
import { ThemeProvider } from '@material-ui/core/styles';
import SearchModal from './common/modals/SearchModal';
import Theme from './Theme';

interface IAppProps {
  searchDetails: SearchDetails;
  authDetails: AuthDetails;
  login: typeof login;
  logout: typeof logout;
  setValue: typeof setValue;
  addFlight: typeof addFlight;
  updateFlightValue: typeof updateFlightValue;
  updatePassengers: typeof updatePassengers;
  updateFlightOriginDestination: typeof updateFlightOriginDestination;
  removeFlight: typeof removeFlight;
  fetchUserParameters: typeof fetchUserParameters;
  searchFlights: typeof searchFlights;
}

const theme = Theme;

class App extends React.Component<IAppProps> {

  componentDidMount() {
    const token: string =  localStorage.getItem('token') || '';
    if(token !== '') {
      this.props.fetchUserParameters();
    }
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <SearchModal
            loading={this.props.searchDetails.loading}
            flights={this.props.searchDetails.flights}
          />
          <IdleTimerContainer
            logout={this.props.logout}
          />
          {
            this.props.authDetails.authenticated &&
            <NavBar
              logout={this.props.logout}
              authDetails={this.props.authDetails}/>
          }
          <div className="container-fluid">
            <Router>
              <div>
                <Route exact path="/" component={() =>
                  <Home
                    auth={this.props.authDetails}
                  />
                } />
                <Route exact path="/login/" component={() =>
                  <Login
                    authDetails={this.props.authDetails}
                    login={this.props.login}
                  />
                } />
                <Route exact path="/search/" render={() =>
                  <Search
                    defaultCurrency={this.props.authDetails.currency}
                    dateFormat={this.props.authDetails.dateType}
                    searchDetails={this.props.searchDetails}
                    setValue={this.props.setValue}
                    addFlight={this.props.addFlight}
                    updateFlightValue={this.props.updateFlightValue}
                    updatePassengers={this.props.updatePassengers}
                    updateFlightOriginDestination={this.props.updateFlightOriginDestination}
                    removeFlight={this.props.removeFlight}
                    authenticated={this.props.authDetails.authenticated}
                    searchFlights={this.props.searchFlights}
                  />
                } />
                <Route exact path="/results/flex-trip/" component={() =>
                  <FlexTripResult />
                } />
                <Route exact path="/results/itinerary/" component={() =>
                  <ItineraryResult />
                } />
                <Route exact path="/results/segment/:index" component={() =>
                  <SegmentSelection />
                } />
              </div>
            </Router>
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
