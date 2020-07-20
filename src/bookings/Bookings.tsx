import React from 'react';
import BookingsList from './BookingsList';
import SearchBookings from './SearchBookings';
import FilterBookings from './FilterBookings';
import MultiplePnrView from './MultiplePnrView';
import { Booking, sampleBooking } from './BookingsInterfaces';
import './Bookings.css';

interface BookingsProps {

}

class Bookings extends React.Component<BookingsProps> {
  componentDidMount() {
    // Get bookings list
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
                <BookingsList 
                  bookings={[sampleBooking]}/>
              </div>
            </div>
          </div>          
        </div>
      </div>
    );
  }
}

export default Bookings;