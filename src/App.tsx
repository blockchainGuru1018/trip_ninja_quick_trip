import React from 'react';
import { Route, Router, Redirect, Switch } from 'react-router-dom';
import IdleTimerContainer from './common/IdleTimerContainer';
import Custom404 from './common/Custom404';
import NavBar from './common/NavBar';
import Home from './common/Home';
import Search from './trip/search/Search';
import Login from './auth/Login';
import PreResults from './trip/results/PreResults';
import ItineraryResult from './trip/results/ItineraryResult';
import SegmentSelection from './trip/results/SegmentSelection';
import Book from './trip/book/Book';
import Bookings from './bookings/Bookings';
import './index.css';
import { setValue, addFlight, updateFlightValue, updatePassengers,removeFlight,
  searchFlights } from './actions/SearchActions';
import { priceFlights } from './actions/PricingActions';
import { setErrorDetails, setTripType, updateActives, updateFareFamily } from './actions/ResultsActions';
import { SearchDetails } from './trip/search/SearchInterfaces';
import { AuthDetails } from './auth/AuthInterfaces';
import { ResultsDetails } from './trip/results/ResultsInterfaces';
import { PricingDetails } from './trip/results/PricingInterfaces';
import { login, fetchUserParameters, logout } from './actions/AuthActions';
import { ThemeProvider } from '@material-ui/core/styles';
import PricingModal from './common/modals/PricingModal';
import SearchModal from './common/modals/SearchModal';
import BookModal from './common/modals/BookModal';
import DefaultErrorModal from './common/modals/DefaultErrorModal';
import Theme from './Theme';
import history from './History';
import { setSegmentPositionMapValue } from './actions/ResultsActions';
import { setPassengerInfo, updatePassengerInfo, bookFlights } from './actions/BookActions';
import { BookingDetails } from './trip/book/BookInterfaces';
import { BookingsList } from './bookings/BookingsInterfaces';
import { getBookingsList, getBookingDetails, cancelBooking, queueBooking } from './actions/BookingsActions';

interface IAppProps {
  searchDetails: SearchDetails;
  authDetails: AuthDetails;
  resultsDetails: ResultsDetails;
  pricingDetails: PricingDetails;
  bookingDetails: BookingDetails;
  bookingsList: BookingsList;
  login: typeof login;
  logout: typeof logout;
  setValue: typeof setValue;
  addFlight: typeof addFlight;
  updateFlightValue: typeof updateFlightValue;
  updatePassengers: typeof updatePassengers;
  removeFlight: typeof removeFlight;
  fetchUserParameters: typeof fetchUserParameters;
  searchFlights: typeof searchFlights;
  priceFlights: typeof priceFlights;
  setErrorDetails: typeof setErrorDetails;
  setTripType: typeof setTripType;
  updateActives: typeof updateActives;
  updateFareFamily: typeof updateFareFamily;
  setSegmentPositionMapValue: typeof setSegmentPositionMapValue;
  updatePassengerInfo: typeof updatePassengerInfo;
  setPassengerInfo: typeof setPassengerInfo;
  bookFlights: typeof bookFlights;
  getBookingsList: typeof getBookingsList;
  getBookingDetails: typeof getBookingDetails;
  cancelBooking: typeof cancelBooking;
  queueBooking: typeof queueBooking;
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
          <DefaultErrorModal
            errors={this.props.resultsDetails.errors}
            setErrorDetails={this.props.setErrorDetails}
          />
          <PricingModal
            loading={this.props.pricingDetails.loading!}
          />
          <SearchModal
            loading={this.props.searchDetails.loading}
            flights={this.props.searchDetails.flights}
          />
          <BookModal
            loading={this.props.bookingDetails.loading!}
          />
          <IdleTimerContainer
            logout={this.props.logout}
          />
          {
            this.props.authDetails.authenticated &&
            history.location.pathname !== '/404/' &&
            <NavBar
              logout={this.props.logout}
              authDetails={this.props.authDetails}/>
          }
          <div className="container-fluid">
            <Router history={history}>
              <Switch>
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
                    removeFlight={this.props.removeFlight}
                    authenticated={this.props.authDetails.authenticated}
                    searchFlights={this.props.searchFlights}
                  />
                } />
                <Route exact path="/results/pre-results/" render={() =>
                  <PreResults
                    resultsDetails={this.props.resultsDetails}
                    currency={this.props.searchDetails.currency}
                    setTripType={this.props.setTripType}
                  />
                } />
                <Route exact path="/results/itinerary/" render={() =>
                  <ItineraryResult
                    resultsDetails={this.props.resultsDetails}
                    currency={this.props.searchDetails.currency}
                    priceFlights={this.props.priceFlights}
                    passengers={this.props.searchDetails.passengers}
                    authDetails={this.props.authDetails}
                    setSegmentPositionMapValue={this.props.setSegmentPositionMapValue}
                  />
                } />
                <Route exact path="/results/segment/:index" render={(routeProps) =>
                  <SegmentSelection
                    {...routeProps}
                    resultsDetails={this.props.resultsDetails}
                    currency={this.props.searchDetails.currency}
                    setSegmentValue={this.props.setSegmentPositionMapValue}
                    updateActives={this.props.updateActives}
                    updateFareFamily={this.props.updateFareFamily}
                    priceFlights={this.props.priceFlights}
                  />
                } />
                <Route exact path="/book/" render={() =>
                  <Book
                    authDetails={this.props.authDetails}
                    resultsDetails={this.props.resultsDetails}
                    currency={this.props.searchDetails.currency}
                    pricingDetails={this.props.pricingDetails}
                    bookingDetails={this.props.bookingDetails}
                    passengers={this.props.searchDetails.passengers}
                    updatePassengerInfo={this.props.updatePassengerInfo}
                    setPassengerInfo={this.props.setPassengerInfo}
                    dateFormat={this.props.authDetails.dateType}
                    bookFlights={this.props.bookFlights}
                  />
                } />
                <Route exact path="/bookings/" render={() =>
                  <Bookings 
                    authDetails={this.props.authDetails}
                    bookingsList={this.props.bookingsList}
                    getBookingsList={this.props.getBookingsList}
                    getBookingDetails={this.props.getBookingDetails}  
                    cancelBooking={this.props.cancelBooking}
                    queueBooking={this.props.queueBooking}
                  />
                } />
                <Route exact path="/404/" render={() => <Custom404 />} />
                <Redirect to="/404/" />
              </Switch>
            </Router>
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
