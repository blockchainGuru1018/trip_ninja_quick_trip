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
import { Results, ResultsDetails, Segment } from '../results/ResultsInterfaces';
import { Passenger } from '../search/SearchInterfaces';
import { setPassengerInfo, updatePassengerInfo, bookFlights } from '../../actions/BookActions';
import { updateAdditionalMarkup } from '../../actions/PricingActions';
import { BookingDetails } from './BookInterfaces';
import { AuthDetails } from '../../auth/AuthInterfaces';
import { withTranslation, WithTranslation } from 'react-i18next';

const BackButton = styled(Button)({
  color: 'var(--tertiary)',
});

interface BookProps extends WithTranslation {
  authDetails: AuthDetails;
  resultsDetails: ResultsDetails;
  currency: string;
  pricingDetails: PricingDetails;
  bookingDetails: BookingDetails;
  passengers: Array<Passenger>;
  updatePassengerInfo: typeof updatePassengerInfo;
  updateAdditionalMarkup: typeof updateAdditionalMarkup;
  bookFlights: typeof bookFlights;
  setPassengerInfo: typeof setPassengerInfo;
  dateFormat: string;
}

class Book extends React.Component<BookProps> {
  componentDidMount() {
    this.props.setPassengerInfo(this.props.passengers);
  }

  render() {
    const trip: Results = this.props.resultsDetails![this.props.resultsDetails!.tripType];
    const actives: Array<Segment> = [...this.props.resultsDetails?.activeSegments.values()];

    return (
      <div className="row" id="book-itinerary">
        <div className="col-xl-10 offset-xl-1">
          <div className="book-header">
            <BackButton 
              onClick={() => history.push('/results/itinerary/')} 
            >
              <KeyboardBackspaceIcon />
              <div className='btn-back'>{this.props.t("book.book.return")}</div>
            </BackButton>
            <div className="row itinerary-summary">
              <div className="col-md-6">
                <h1>{this.props.t("book.book.title")}</h1>
              </div>
              <div className="col-md-6">
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
            <div className="col-md-7">
              <Itinerary
                resultsDetails={this.props.resultsDetails}
                currency={this.props.currency}
                pricing={this.props.pricingDetails!.pricing!}
                pathSequence={this.props.resultsDetails[this.props.resultsDetails.tripType].path_sequence}
                markupVisible={this.props.authDetails.markupVisible}
              />
            </div>
            <div className="col-md-5">
              <FareBreakdown
                trip={trip}
                actives={actives}
                pricing={this.props.pricingDetails!.pricing!}
                pricingDisplay={true}
                currency={this.props.pricingDetails.currency}
                markupVisible={this.props.authDetails.markupVisible}
                pathSequence={this.props.resultsDetails[this.props.resultsDetails.tripType].path_sequence}
                updateAdditionalMarkup={this.props.updateAdditionalMarkup}
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

export default withTranslation('common')(Book);
