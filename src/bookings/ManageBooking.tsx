import React from 'react';
import Button from '@material-ui/core/Button';

interface ManageBookingProps {
  status: string;
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
            disabled={this.props.status === 'Cancelled'}
            onClick={(e) => {}}>
            Cancel Booking
          </Button>
          <Button
            variant="contained" 
            color="secondary"
            className="update-booking-btn"
            disableElevation
            disabled={this.props.status !== 'Booked'}
            onClick={(e) => {}}>
            Send to Ticketing
          </Button>
        </div>     
      </div>
    );
  }

}

export default ManageBooking;
