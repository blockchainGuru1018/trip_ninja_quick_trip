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

const BackButton = styled(Button)({
  color: 'var(--tertiary)',
});

interface BookProps {
  pricingDetails: PricingDetails;
  resultsDetails: ResultsDetails;
}

class Book extends React.Component<BookProps> {
  render() {

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
                <BookRequest />
              </div>          
            </div>
          </div>
          <div className="row itinerary-details">
            <div className="col-sm-7">
              <Itinerary
                pricingDetails={this.props.pricingDetails}
                resultsDetails={this.props.resultsDetails}
              />
            </div>
            <div className="col-sm-5">
              <FareBreakdown />
              <PassengerDetails />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Book;
