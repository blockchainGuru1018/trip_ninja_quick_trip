import React from 'react';
import { Route, Redirect, BrowserRouter as Router } from 'react-router-dom';
import NavBar from './common/NavBar';
import Home from './common/Home';
import Search from './trip/search/Search';
import Login from './auth/Login';
import './App.css';
import { setValue, addFlight, updateFlightValue, updatePassengers,removeFlight,
  updateFlightOriginDestination } from './actions/SearchActions';
import { SearchDetails } from './trip/search/Interfaces';
import { AuthDetails } from './auth/AuthInterfaces';
import { login, fetchUserParameters, logout } from './actions/AuthActions';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

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
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0DBE7CEB',
      contrastText: '#ffffff'
    }
  },
});

class App extends React.Component<IAppProps> {

  componentDidMount() {
    const token: string =  localStorage.getItem('token') || '';
    if(token !== '') {
      this.props.fetchUserParameters()
    }
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          {
            this.props.authDetails.authenticated &&
            <NavBar logout={this.props.logout}/>
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
                <Route exact path="/search/" component={() =>
                  <Search
                    defaultCurrency={this.props.authDetails.currency}
                    searchDetails={this.props.searchDetails}
                    setValue={this.props.setValue}
                    addFlight={this.props.addFlight}
                    updateFlightValue={this.props.updateFlightValue}
                    updatePassengers={this.props.updatePassengers}
                    updateFlightOriginDestination={this.props.updateFlightOriginDestination}
                    removeFlight={this.props.removeFlight}
                  />
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
