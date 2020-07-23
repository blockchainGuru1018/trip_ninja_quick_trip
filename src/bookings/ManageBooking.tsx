import React from 'react';
import Button from '@material-ui/core/Button';

interface ManageBookingProps {

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
            onClick={(e) => {}}>
            Cancel Booking
          </Button>
          <Button
            variant="contained" 
            color="secondary"
            className="update-booking-btn"
            disableElevation
            onClick={(e) => {}}>
            Send to Ticketing
          </Button>
        </div>     
      </div>
    );
  }

}

export default ManageBooking;
