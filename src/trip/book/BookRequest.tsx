import React from 'react';
import Button from '@material-ui/core/Button';
import { bookFlights } from '../../actions/BookActions';
import { BookingDetails, Billing, PassengerInfo, SegmentAdditionalDetails } from './BookInterfaces';
import { AuthDetails } from '../../auth/AuthInterfaces';
import { PricingDetails } from '../results/PricingInterfaces';
import Alert from '@material-ui/lab/Alert';
import { AdditionalDetails, ResultsDetails, BrandInfo, FareInfo, Brand} from "../results/ResultsInterfaces";
import { Segment } from "../results/ResultsInterfaces";

interface BookRequestProps {
  resultsDetails: ResultsDetails
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
    this.props.bookingDetails.segmentAdditionalDetails = this.setSegmentAdditionalDetails()

    let bookingResult: any = this.props.bookFlights(this.props.bookingDetails);
  }

  setSegmentAdditionalDetails = () => {
    const segmentAdditionalDetails: Array<SegmentAdditionalDetails> = [];
    const activeSegments: Array<Segment> = [...this.props.resultsDetails.activeSegments.values()];
    activeSegments.forEach((activeSegment: Segment) => {
      const additionalDetails: AdditionalDetails = activeSegment.additional_details
      const brands: Array<Brand> = this.getBrand(activeSegment)
      segmentAdditionalDetails.push({
        additional_details: additionalDetails,
        brands: brands
      });
    })
    return segmentAdditionalDetails;
  }

  getBrand = (activeSegment: Segment) => {
    const selectedBrandIndex: number = activeSegment.selected_brand_index ? activeSegment.selected_brand_index : 0;
    const brandInfo: BrandInfo | undefined = activeSegment.brands ? activeSegment.brands[activeSegment.segment_id][selectedBrandIndex] : undefined;
    let brands: Array<Brand> = [];
    if (brandInfo && brandInfo.fare_info) {
      const fareInfoValues: Array<FareInfo> = Object.values(brandInfo.fare_info);
      brands = fareInfoValues.map((flight_info: FareInfo) => flight_info.brand);
    }
    return brands;
  }

  validatePassengerBookingDetails = () => {
    const validatedPassengers= this.props.bookingDetails.passengers.filter((passenger: PassengerInfo, index: number) => 
      index === 0 ? passenger.phone_number : true &&
      passenger.first_name.length > 2 &&
      passenger.last_name.length > 2 &&
      passenger.date_of_birth > '1900-01-01' &&
      ['M', 'F'].includes(passenger.gender)  &&
      passenger.passport_country &&
      passenger.passport_number &&
      passenger.passport_expiration &&
      passenger.passport_expiration > new Date().toISOString().slice(0,10) &&
      passenger.passenger_type.length === 3 &&
      passenger.updated
    );

    return (validatedPassengers.length === this.props.bookingDetails.passengers.length);
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
