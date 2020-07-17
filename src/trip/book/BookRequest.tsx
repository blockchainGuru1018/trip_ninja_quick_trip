import React from 'react';
import Button from '@material-ui/core/Button';
import { bookFlights } from '../../actions/BookActions';
import { BookingDetails, Billing, PassengerInfo } from './BookInterfaces';
import { AuthDetails } from '../../auth/AuthInterfaces';
import { PricingDetails } from '../results/PricingInterfaces';
import Alert from '@material-ui/lab/Alert';

interface BookRequestProps {
  bookingDetails: BookingDetails
  authDetails: AuthDetails
  pricingDetails: PricingDetails
  bookFlights: typeof bookFlights
}

class BookRequest extends React.Component<BookRequestProps> {
  state = {
    passengerDetailsValid: true
  }

  bookFlights = (add_to_ticketing_queue: boolean) => {
    const passengersValidated: boolean = this.validatePassengerBookingDetails();
    return passengersValidated
      ? this.submitBookingRequest(add_to_ticketing_queue)
      : this.setState({'passengerDetailsValid': false});
  }

  submitBookingRequest = (add_to_ticketing_queue: boolean) => {
    this.setState({'passengerDetailsValid': true});

    this.props.bookingDetails.trip_id = this.props.pricingDetails.trip_id;
    this.props.bookingDetails.add_to_ticketing_queue = add_to_ticketing_queue;
    this.props.bookingDetails.ticketing_queue = this.props.authDetails.ticketing_queue;
    this.props.bookingDetails.agent_email = this.props.authDetails.userEmail;
    this.props.bookingDetails.agency = this.props.authDetails.agency;

    const billing: Billing = {
      email: this.props.bookingDetails.passengers[0].email ? this.props.bookingDetails.passengers[0].email : ""
    };

    this.props.bookingDetails.billing = billing;

    let bookingResult: any = this.props.bookFlights(this.props.bookingDetails);
  }


  validatePassengerBookingDetails = () => {
    const validatedPassengers= this.props.bookingDetails.passengers.filter((passenger: PassengerInfo) => 
      passenger.first_name.length >2 &&
      passenger.last_name.length >2 &&
      passenger.date_of_birth > '1900-01-01' &&
      ['M', 'F'].includes(passenger.gender)  &&
      passenger.phone_number &&
      passenger.passport_country &&
      passenger.passport_number &&
      passenger.passport_expiration ? passenger.passport_expiration > new Date().toISOString().slice(0,10) &&
      passenger.passenger_type.length > 2 &&
      passenger.updated
    );

    return validatedPassengers.length === this.props.bookingDetails.passengers.length;
  };


  render() {

    return (
      <div className="float-right">
        <Button 
          variant="outlined" 
          color="primary"
          className="book-button"
          onClick={ (e) => this.bookFlights(false)}>
          Book and Save
        </Button>
        {!this.state.passengerDetailsValid &&
        <Alert severity="error" className='validationErrorAlert'>
          Passenger details are not filled out properly - please review.
        </Alert>
        }
        <Button
          variant="contained" 
          color="primary"
          className="book-button"
          disableElevation
          onClick={ (e) => this.bookFlights(true)}>
          Book and Ticket
        </Button>
        {!this.state.passengerDetailsValid &&
        <Alert severity="error" className='validationErrorAlert'>
          Passenger details are not filled out properly - please review.
        </Alert>
        }
      </div>
    );
  }

}

export default BookRequest;
