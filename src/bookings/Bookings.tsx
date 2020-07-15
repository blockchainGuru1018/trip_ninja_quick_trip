import React from 'react';
import './Bookings.css';
import BookingsList from './BookingsList';

interface BookingsProps {

}

class Bookings extends React.Component<BookingsProps> {
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
                <p>Search input goes here</p>
              </div>
              <div className="col-md-6">
                <div className="float-right">
                  <p>Multiple PNRs</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl">
                <p>Filter goes here</p>
              </div>
            </div>
            <div className="row">
              <div className="col-xl">
                <BookingsList />
              </div>
            </div>
          </div>          
        </div>
      </div>
    );
  }
}

export default Bookings;