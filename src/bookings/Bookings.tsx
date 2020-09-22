import React from 'react';
import BookingsTable from './BookingsTable';
import SearchBookings from './SearchBookings';
import FilterBookings from './FilterBookings';
import MultiPnrViewToggle from './MultiPnrViewToggle';
import { AuthDetails } from '../auth/AuthInterfaces';
import { BookingsList } from './BookingsInterfaces';
import './Bookings.css';
import { getBookingsList, getBookingDetails, cancelBooking, queueBooking, ticketBooking } from '../actions/BookingsActions';
import { Redirect } from 'react-router-dom';
import { withTranslation, WithTranslation } from 'react-i18next';

interface BookingsProps extends WithTranslation {
  authDetails: AuthDetails;
  bookingsList: BookingsList;
  getBookingsList: typeof getBookingsList;
  getBookingDetails: typeof getBookingDetails;
  cancelBooking: typeof cancelBooking;
  queueBooking: typeof queueBooking;
  ticketBooking: typeof ticketBooking;
}

class Bookings extends React.Component<BookingsProps> {
  componentDidMount() {    
    this.props.getBookingsList(this.getUserType());
  }

  state = {
    pnrView: 'condensed'
  }

  handlePnrView = (viewValue: string) => {
    this.setState({pnrView: viewValue});
  };

  render() {
    return (
      <div id="bookings">
        {this.props.authDetails.authenticated 
          ? 
          <div>
            <div className="row bookings-header">
              <div className="col-xl-10 offset-xl-1">
                <h1>{this.props.t("bookings.bookings.title")}</h1>
              </div>
            </div>
            <div className="row bookings-container">
              <div className="col-xl-10 offset-xl-1">
                <div className="row bookings-filters">
                  <div className="col-md-6">
                    <SearchBookings />
                  </div>
                  <div className="col-md-6">
                    <MultiPnrViewToggle
                      pnrView={this.state.pnrView}
                      handlePnrView={this.handlePnrView}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl">
                    <FilterBookings />
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl">
                    <BookingsTable 
                      bookings={this.props.bookingsList.bookings}
                      getBookingDetails={this.props.getBookingDetails}
                      cancelBooking={this.props.cancelBooking}
                      queueBooking={this.props.queueBooking}
                      ticketBooking={this.props.ticketBooking}
                      authDetails={this.props.authDetails}
                      loading={this.props.bookingsList.loading}
                      multiplePnrDisplay={this.state.pnrView}
                    />
                  </div>
                </div>
              </div>          
            </div>
          </div>
          : <Redirect to='/login/' />}
      </div>
    );
  }

  getUserType = () => {
    if (this.props.authDetails.isSuperUser) {
      return '';
    } else {
      return this.props.authDetails.isAgencyAdmin ? 'agency='+this.props.authDetails.agency : 'user='+this.props.authDetails.userEmail;
    }    
  }
}

export default withTranslation('common')(Bookings);
