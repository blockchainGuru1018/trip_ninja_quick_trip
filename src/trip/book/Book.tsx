import React from 'react';
import './Book.css';
import Itinerary from './Itinerary';
import FareBreakdown from '../../common/FareBreakdown';
import PassengerDetails from './PassengerDetails';
import BookRequest from './BookRequest';
import Button from '@material-ui/core/Button';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { styled } from '@material-ui/core/styles';
import history from '../../History';
import { PricingDetails } from '../results/PricingInterfaces';
import { ResultsDetails } from '../results/ResultsInterfaces';
import { Passenger } from '../search/SearchInterfaces';
import { setPassengerInfo, updatePassengerInfo, bookFlights } from '../../actions/BookActions';
import { BookingDetails } from './BookInterfaces';
import { AuthDetails } from '../../auth/AuthInterfaces';


const BackButton = styled(Button)({
  color: 'var(--tertiary)',
});

interface BookProps {
  authDetails: AuthDetails;
  resultsDetails: ResultsDetails;
  currency: string;
  pricingDetails: PricingDetails;
  bookingDetails: BookingDetails;
  passengers: Array<Passenger>;
  updatePassengerInfo: typeof updatePassengerInfo;
  bookFlights: typeof bookFlights;
  setPassengerInfo: typeof setPassengerInfo;
  dateFormat: string;
}

class Book extends React.Component<BookProps> {
  componentDidMount() {
    this.props.setPassengerInfo(this.props.passengers);
  }

  render() {
    return (
      <div className="row" id="book-itinerary">
        <div className="col-xl-10 offset-xl-1">
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
                  resultsDetails={this.props.resultsDetails}
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
              <Itinerary
                resultsDetails={this.props.resultsDetails}
                currency={this.props.currency}
              />
            </div>
            <div className="col-sm-5">
              <FareBreakdown 
                pricing={this.props.pricingDetails!.pricing!}
                pricingDisplay={true}
                currency={this.props.pricingDetails.currency}
              />
              <PassengerDetails
                passengers={this.props.passengers}
                bookingDetails={this.props.bookingDetails}
                updatePassengerInfo={this.props.updatePassengerInfo}
                dateFormat={this.props.dateFormat}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Book;
