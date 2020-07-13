import React from 'react';
import Button from '@material-ui/core/Button';
import { bookFlights } from '../../actions/BookActions';
import { BookingDetails } from './BookInterfaces';
import { AuthDetails } from '../../auth/AuthInterfaces';
import { PricingDetails } from '../results/PricingInterfaces';

interface BookRequestProps {
  bookingDetails: BookingDetails
  authDetails: AuthDetails
  pricingDetails: PricingDetails
  bookFlights: typeof bookFlights
}

class BookRequest extends React.Component<BookRequestProps> {

  submitBookingRequest = (add_to_ticketing_queue: boolean) => {

    this.props.bookingDetails.trip_id = this.props.pricingDetails.trip_id;
    this.props.bookingDetails.add_to_ticketing_queue = add_to_ticketing_queue;
    this.props.bookingDetails.ticketing_queue = this.props.authDetails.ticketing_queue;
    this.props.bookingDetails.agent_email = this.props.authDetails.userEmail;
    this.props.bookingDetails.agency = this.props.authDetails.agency;

    let bookingResult: any = this.props.bookFlights(this.props.bookingDetails);

  }

  render() {

    return (
      <div className="float-right">
        <Button 
          variant="outlined" 
          color="primary"
          className="book-button"
          onClick={ (e) => this.submitBookingRequest(false)}>
          Book and Save
        </Button>
        <Button
          variant="contained" 
          color="primary"
          className="book-button"
          disableElevation
          onClick={ (e) => this.submitBookingRequest(true)}>
          Book and Ticket
        </Button>
      </div>
    );
  }

}

export default BookRequest;
