import React from 'react';
import Button from '@material-ui/core/Button';
import { cancelBooking, queueBooking } from '../actions/BookingsActions';
import { AuthDetails } from '../auth/AuthInterfaces';
import { Booking } from './BookingsInterfaces';



interface ManageBookingProps {
  status: string;
  trip_id: string;
  cancelBooking: typeof cancelBooking;
  queueBooking: typeof queueBooking;
  authDetails: AuthDetails;
  booking: Booking;
}

class ManageBooking extends React.Component<ManageBookingProps> {
  render() {
    return (
      <div>
        <h5 className="section-header">Manage</h5>
        <div className="row">
          <Button 
            variant="outlined" 
            color="secondary"
            className="update-booking-btn"
            disabled={this.props.status === 'cancelled'}
            onClick={(e) => {this.props.cancelBooking(this.props.booking)}}>
            Cancel Booking
          </Button>
          <Button
            variant="contained" 
            color="secondary"
            className="update-booking-btn"
            disableElevation
            disabled={this.props.status !== 'booked'}
            onClick={(e) => {this.props.queueBooking(this.props.authDetails, this.props.booking)}}>
            Send to Queue
          </Button>
        </div>     
      </div>
    );
  }

}

export default ManageBooking;
