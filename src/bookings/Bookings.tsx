import React from 'react';
import BookingsTable from './BookingsTable';
import SearchBookings from './SearchBookings';
import FilterBookings from './FilterBookings';
import MultiplePnrView from './MultiplePnrView';
import { AuthDetails } from '../auth/AuthInterfaces';
import { sampleBooking, BookingsList } from './BookingsInterfaces';
import './Bookings.css';
import { getBookingsList, getBookingDetails } from '../actions/BookingsActions';

interface BookingsProps {
  authDetails: AuthDetails
  bookingsList: BookingsList
  getBookingsList: typeof getBookingsList
  getBookingDetails: typeof getBookingDetails
}

class Bookings extends React.Component<BookingsProps> {
  componentDidMount() {
    this.props.getBookingsList(this.props.authDetails.userEmail);
  }

  render() {
    return (
      <div id="bookings">
        <div className="row bookings-header">
          <div className="col-xl-10 offset-xl-1">
            <h1>Bookings</h1>
          </div>
        </div>
        <div className="row bookings-container">
          <div className="col-xl-10 offset-xl-1">
            <div className="row">
              <div className="col-md-6">
                <SearchBookings />
              </div>
              <div className="col-md-6">
                <div className="float-right">
                  <MultiplePnrView />
                </div>
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
                  bookings={sampleBooking}/>
              </div>
            </div>
          </div>          
        </div>
      </div>
    );
  }
}

export default Bookings;