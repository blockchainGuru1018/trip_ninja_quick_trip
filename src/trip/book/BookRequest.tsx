import React from 'react';
import Button from '@material-ui/core/Button';
import { bookFlights } from '../../actions/BookActions';
import { BookingDetails, Billing, PassengerInfo, SegmentAdditionalDetails } from './BookInterfaces';
import { AuthDetails } from '../../auth/AuthInterfaces';
import { PricingDetails } from '../results/PricingInterfaces';
import Alert from '@material-ui/lab/Alert';
import { AdditionalDetails, ResultsDetails, BrandInfo, FareInfo, Brand} from "../results/ResultsInterfaces";
import { Segment } from "../results/ResultsInterfaces";
import history from '../../History';
import Tooltip from '@material-ui/core/Tooltip';
import { withTranslation, WithTranslation } from 'react-i18next';

interface BookRequestProps extends WithTranslation {
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

  bookFlights = (queue: boolean, ticket: boolean) => {
    const passengersValidated: boolean = this.validatePassengerBookingDetails();
    return passengersValidated
      ? this.submitBookingRequest(queue, ticket)
      : this.setState({'passengerDetailsValid': false});
  }

  submitBookingRequest = (queue: boolean, ticket: boolean) => {
    this.setState({'passengerDetailsValid': true});

    this.props.bookingDetails.trip_id = this.props.pricingDetails.trip_id;
    this.props.bookingDetails.add_to_ticketing_queue = queue;
    this.props.bookingDetails.ticketing_queue = this.props.authDetails.ticketing_queue;
    this.props.bookingDetails.ticket = ticket;
    this.props.bookingDetails.agent_email = this.props.authDetails.userEmail;
    this.props.bookingDetails.agency = this.props.authDetails.agency;

    const billing: Billing = {
      email: this.props.bookingDetails.passengers[0].email ? this.props.bookingDetails.passengers[0].email : ""
    };

    this.props.bookingDetails.billing = billing;
    this.props.bookingDetails.segment_additional_details = this.setSegmentAdditionalDetails();

    let bookingResult: any = this.props.bookFlights(this.props.bookingDetails);
    bookingResult.then((result: any) => this.handleBookingResult(result));
  }

  handleBookingResult = (result: any) => {
    result.success
      ? history.push('/bookings/')
      : history.push('/book/');
  }

  setSegmentAdditionalDetails = () => {
    const segmentAdditionalDetails: Array<SegmentAdditionalDetails> = [];
    const activeSegments: Array<Segment> = [...this.props.resultsDetails.activeSegments.values()];
    activeSegments.forEach((activeSegment: Segment) => {
      const additionalDetails: AdditionalDetails = activeSegment.additional_details;
      const brands: Array<Brand> = this.getBrand(activeSegment);
      segmentAdditionalDetails.push({
        additional_details: additionalDetails,
        brands: brands
      });
    });
    return segmentAdditionalDetails;
  }

  getBrand = (activeSegment: Segment) => {
    const selectedBrandIndex: number = activeSegment.selected_brand_index ? activeSegment.selected_brand_index : 0;
    const brandInfo: BrandInfo | undefined = this.getBrandInfo(activeSegment, selectedBrandIndex);
    let brands: Array<Brand> = [];
    if (brandInfo && brandInfo.fare_info) {
      const fareInfoValues: Array<FareInfo> = Object.values(brandInfo.fare_info);
      brands = fareInfoValues.map((flight_info: FareInfo) => flight_info.brand);
    }
    return brands;
  }

  getBrandInfo = (activeSegment: Segment, selectedBrandIndex: number) => {
    if (activeSegment.source === 'travelport') {
      return activeSegment.brands ? activeSegment.brands[selectedBrandIndex] : undefined;
    } else {
      return activeSegment.brands ? activeSegment.brands[Object.keys(activeSegment.brands)[0]][selectedBrandIndex] : undefined;
    }
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
        <Tooltip title={this.props.authDetails.bookingDisabled ? this.props.t("book.bookRequest.bookingDisabled").toString() : ''} placement="top">
          <span>          
            <Button 
              variant="contained" 
              color="primary"
              className="book-button"
              disableElevation
              disabled={this.props.authDetails.bookingDisabled}
              onClick={(e) => this.bookFlights(false, false)}>
              {this.props.t("book.bookRequest.bookAndSave")}
            </Button>
          </span>
        </Tooltip>
        {!this.state.passengerDetailsValid &&
        <Alert severity="error" className='validation-error-alert'>
          {this.props.t("book.bookRequest.passengerDetailsError")}
        </Alert>
        }
        <Tooltip title={this.props.authDetails.bookingDisabled ? this.props.t("book.bookRequest.bookingDisabled").toString() : ''} placement="top">  
          <span>
            <Button
              variant="contained" 
              color="primary"
              className="book-button"
              disabled={this.props.authDetails.bookingDisabled}
              disableElevation
              onClick={(e) => this.bookFlights(true, false)}>
              {this.props.t("book.bookRequest.bookAndQueue")}
            </Button>
          </span>
        </Tooltip>
        <Tooltip title={this.props.authDetails.bookingDisabled ?  this.props.t("book.bookRequest.bookingDisabled").toString() : ''} placement="top">  
          <span>
            <Button
              variant="contained" 
              color="primary"
              className="book-button"
              disabled={this.props.authDetails.bookingDisabled || true}
              disableElevation
              onClick={(e) => this.bookFlights(false, true)}>
              {this.props.t("book.bookRequest.bookAndTicket")}
            </Button>
          </span>
        </Tooltip>
      </div>
    );
  }

}

export default withTranslation('common')(BookRequest);
