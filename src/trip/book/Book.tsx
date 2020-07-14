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
import { setPassengerInfo, updatePassengerInfo } from '../../actions/BookActions';
import { BookingDetails } from './BookInterfaces';


const BackButton = styled(Button)({
  color: 'var(--tertiary)',
});

interface BookProps {
  pricingDetails: PricingDetails;
  resultsDetails: ResultsDetails;
  bookingDetails: BookingDetails;
  passengers: Array<Passenger>;
  updatePassengerInfo: typeof updatePassengerInfo;
  setPassengerInfo: typeof setPassengerInfo;
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
                <BookRequest />
              </div>          
            </div>
          </div>
          <div className="row itinerary-details">
            <div className="col-sm-7">
              <Itinerary
                resultsDetails={this.props.resultsDetails}
              />
            </div>
            <div className="col-sm-5">
              <FareBreakdown pricingDetails={this.props.pricingDetails}/>
              <PassengerDetails 
                passengers={this.props.passengers}
                bookingDetails={this.props.bookingDetails}
                updatePassengerInfo={this.props.updatePassengerInfo}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Book;
