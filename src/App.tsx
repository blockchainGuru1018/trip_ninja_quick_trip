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
import {
  setValue, addFlight, updateFlightValue, updatePassengers, removeFlight,
  searchFlights, getPriceGraph
} from './actions/SearchActions';
import { priceFlights, updateAdditionalMarkup } from './actions/PricingActions';
import {
  setErrorDetails, setTripType, updateActives, updateFareFamily, updateItineraryFilter, updateSegmentFilter,
  updateSortType, updateEntireTrip, getTravelportBrands, setActiveSegments, updateStateValue, setResultsLoading
} from './actions/ResultsActions';
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
import TravelRestrictions from './common/TravelRestrictions';
import Theme from './Theme';
import history from './History';
import { setPassengerInfo, updatePassengerInfo, bookFlights, updateFrequentFlyerCards } from './actions/BookActions';
import { BookingDetails } from './trip/book/BookInterfaces';
import { BookingsList } from './bookings/BookingsInterfaces';
import { getBookingsList, getBookingDetails, cancelBooking, queueBooking, ticketBooking } from './actions/BookingsActions';
import Admin from './admin/index';
import TagManager from 'react-gtm-module';
import i18n from './i18n';
import PDFItineraryDownload from "./bookings/PDFItineraryDownload";

const tagManagerArgs = {
  gtmId: "GTM-KRXRHFP",
};

TagManager.initialize(tagManagerArgs);

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
  updatePassengerInfo: typeof updatePassengerInfo;
  updateAdditionalMarkup: typeof updateAdditionalMarkup;
  setPassengerInfo: typeof setPassengerInfo;
  bookFlights: typeof bookFlights;
  getBookingsList: typeof getBookingsList;
  getBookingDetails: typeof getBookingDetails;
  updateItineraryFilter: typeof updateItineraryFilter;
  updateSegmentFilter: typeof updateSegmentFilter;
  updateSortType: typeof updateSortType;
  updateEntireTrip: typeof updateEntireTrip;
  cancelBooking: typeof cancelBooking;
  queueBooking: typeof queueBooking;
  ticketBooking: typeof ticketBooking;
  getTravelportBrands: typeof getTravelportBrands;
  setActiveSegments: typeof setActiveSegments;
  getPriceGraph: typeof getPriceGraph;
  updateStateValue: typeof updateStateValue;
  setResultsLoading: typeof setResultsLoading;
  updateFrequentFlyerCards: typeof updateFrequentFlyerCards;
}

const theme = Theme;

class App extends React.Component<IAppProps> {

  constructor(props:IAppProps) {
    super(props);
    if (!this.props.resultsDetails.fareStructureResults) {
      // history.push('/');
    }
  }

  
  componentDidMount() {
    const token: string =  localStorage.getItem('token') || '';
    if (token !== '') {
      this.props.fetchUserParameters();
    }
    const language: string = localStorage.getItem('language') || '';
    if (language !== '') {
      i18n.changeLanguage(language);
    }
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className='App'>
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
                <Route path="/admin" component={Admin} />
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
                    virtualInterliningAccess={this.props.authDetails.virtualInterliningAccess}
                    getPriceGraph={this.props.getPriceGraph}
                  />
                } />
                <Route exact path="/results/pre-results/" render={() =>
                  <PreResults
                    resultsDetails={this.props.resultsDetails}
                    currency={this.props.searchDetails.currency}
                    setTripType={this.props.setTripType}
                    setActiveSegments={this.props.setActiveSegments}
                    updateStateValue={this.props.updateStateValue}
                  />
                } />
                <Route exact path="/results/itinerary/" render={() =>
                  <ItineraryResult
                    resultsDetails={this.props.resultsDetails}
                    currency={this.props.searchDetails.currency}
                    priceFlights={this.props.priceFlights}
                    passengers={this.props.searchDetails.passengers}
                    updateItineraryFilter={this.props.updateItineraryFilter}
                    itineraryFilters={this.props.resultsDetails.itineraryFilters}
                    updateActives={this.props.updateActives}
                    updateSortType={this.props.updateSortType}
                    updateEntireTrip={this.props.updateEntireTrip}
                    markupVisible={this.props.authDetails.markupVisible}
                    viewPnrPricing={this.props.authDetails.viewPnrPricing}
                    setResultsLoading={this.props.setResultsLoading}
                  />
                } />
                <Route exact path="/results/segment/:index" render={(routeProps) =>
                  <SegmentSelection
                    {...routeProps}
                    resultsDetails={this.props.resultsDetails}
                    currency={this.props.searchDetails.currency}
                    updateActives={this.props.updateActives}
                    updateFareFamily={this.props.updateFareFamily}
                    updateSegmentFilter={this.props.updateSegmentFilter}
                    updateSortType={this.props.updateSortType}
                    getTravelportBrands={this.props.getTravelportBrands}
                    setResultsLoading={this.props.setResultsLoading}
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
                    updateFrequentFlyerCards={this.props.updateFrequentFlyerCards}
                    updateAdditionalMarkup = {this.props.updateAdditionalMarkup}
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
                    ticketBooking={this.props.ticketBooking}
                  />
                } />
                <Route exact path="/travel-restrictions/" render={() =>
                  <TravelRestrictions />
                } />
                <Route exact path="/download-itinerary-pdf/" render={() =>
                  <PDFItineraryDownload
                    authDetails={this.props.authDetails}
                    booking={this.props.bookingsList.bookings[this.props.bookingsList.bookingDetailIndex]}
                    resultsDetails={this.props.resultsDetails}
                    pricingDetails={this.props.pricingDetails}
                    bookingDetails={this.props.bookingDetails}
                    setErrorDetails={this.props.setErrorDetails}
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
