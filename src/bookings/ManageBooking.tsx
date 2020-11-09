import React from 'react';
import Button from '@material-ui/core/Button';
import { cancelBooking, queueBooking, ticketBooking } from '../actions/BookingsActions';
import { AuthDetails } from '../auth/AuthInterfaces';
import { Booking } from './BookingsInterfaces';
import { withTranslation, WithTranslation } from 'react-i18next';
import SaveAlt from "@material-ui/icons/SaveAlt";
import history from "../History";


interface ManageBookingProps extends WithTranslation {
  status: string;
  trip_id: string;
  cancelBooking: typeof cancelBooking;
  queueBooking: typeof queueBooking;
  ticketBooking: typeof ticketBooking;
  authDetails: AuthDetails;
  booking: Booking;
}

class ManageBooking extends React.Component<ManageBookingProps> {
  render() {
    return (
      <div>
        <h5 className="section-header">{this.props.t("bookings.manageBooking.title")}</h5>
        <div className="row">
          <Button 
            variant="outlined" 
            color="secondary"
            className="update-booking-btn"
            disabled={this.props.status === 'cancelled'}
            onClick={(e) => {this.props.cancelBooking(this.props.booking);}}>
            {this.props.t("bookings.manageBooking.cancelBookingButton")}
          </Button>
          <Button
            variant="contained" 
            color="secondary"
            className="update-booking-btn"
            disableElevation
            disabled={this.props.status === 'cancelled' || this.props.status === 'ticketed' || this.props.status ==='queued'}
            onClick={(e) => {this.props.queueBooking(this.props.authDetails, this.props.booking);}}>
            {this.props.t("bookings.manageBooking.sendToQueueButton")}
          </Button>
          <Button
            variant="contained" 
            color="secondary"
            className="update-booking-btn"
            disableElevation
            disabled={this.props.status === 'cancelled' || this.props.status === 'ticketed' || true}
            onClick={(e) => {this.props.ticketBooking(this.props.booking);}}>
            {this.props.t("bookings.manageBooking.issueTicketButton")}
          </Button>
          <Button
            className='btn-booking-print'
            onClick={() => history.push('/download-itinerary-pdf/')}
            endIcon={<SaveAlt />}
          >
            {this.props.t("bookings.manageBooking.downloadButton")}
          </Button>
        </div>     
      </div>
    );
  }

}

export default withTranslation('common')(ManageBooking);
