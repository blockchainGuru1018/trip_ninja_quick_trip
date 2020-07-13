import React from 'react';
import './Book.css';
import Itinerary from './Itinerary';
import FareBreakdown from './FareBreakdown';
import PassengerDetails from './PassengerDetails';
import BookRequest from './BookRequest';
import Button from '@material-ui/core/Button';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { styled } from '@material-ui/core/styles';
import history from '../../History';
import { PricingDetails } from '../results/PricingInterfaces';
import { ResultsDetails } from '../results/ResultsInterfaces';
import { Passenger } from '../search/SearchInterfaces';
import { updatePassengerInfo, bookFlights } from '../../actions/BookActions';
import { BookingDetails, Billing } from './BookInterfaces';
import { AuthDetails } from '../../auth/AuthInterfaces';

const BackButton = styled(Button)({
  color: 'var(--tertiary)',
});

interface BookProps {
  authDetails: AuthDetails;
  resultsDetails: ResultsDetails;
  pricingDetails: PricingDetails;
  bookingDetails: BookingDetails;
  passengers: Array<Passenger>;
  updatePassengerInfo: typeof updatePassengerInfo;
  bookFlights: typeof bookFlights;
}

class Book extends React.Component<BookProps> {
  render() {
    console.log(this.props.passengers);
    return (
      <div className="row" id="book-itinerary">
        <div className="col-lg-10 offset-lg-1">
          <div className="book-header">
            <BackButton 
              onClick={() => history.push('/results/itinerary/')} 
            >
              <KeyboardBackspaceIcon /> 
              Back to Results
            </BackButton>
            <div className="row itinerary-summary">
              <div className="col-sm-6">
                <h1>Itinerary Summary</h1>
              </div>
              <div className="col-sm-6">
                <BookRequest
                  bookingDetails={this.props.bookingDetails}
                  authDetails={this.props.authDetails}
                  pricingDetails={this.props.pricingDetails}
                  bookFlights={this.props.bookFlights}
                />
              </div>          
            </div>
          </div>
          <div className="row itinerary-details">
            <div className="col-sm-7">
              <Itinerary />
            </div>
            <div className="col-sm-5">
              <FareBreakdown pricingDetails={this.props.pricingDetails}/>
              <PassengerDetails 
                passengers={this.props.passengers}
                bookingDetails={this.props.bookingDetails}
                updatePassengerInfo={updatePassengerInfo}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Book;
