import React from 'react';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import Button from '@material-ui/core/Button';
import PassengerDetailsModal from './PassengerDetailsModal';
import { Passenger } from '../search/SearchInterfaces';
import { PassengerInfo, BookingDetails } from './BookInterfaces';
import { updateFrequentFlyerCards, updatePassengerInfo } from '../../actions/BookActions';
import { withTranslation, WithTranslation } from 'react-i18next';
import { PricedItinerary } from '../results/PricingInterfaces';
import {Results, ResultsDetails} from "../results/ResultsInterfaces";

interface PassengerDetailsProps extends WithTranslation {
  passengers: Array<Passenger>;
  bookingDetails: BookingDetails;
  updatePassengerInfo: typeof updatePassengerInfo;
  dateFormat: string;
  pricedItineraries: Array<PricedItinerary>;
  resultsDetails: ResultsDetails;
  updateFrequentFlyerCards: typeof updateFrequentFlyerCards;
  trip: Results
}

class PassengerDetails extends React.Component<PassengerDetailsProps> {
  state = {
    modalOpen: false,
    currentPassengerIndex: 0
  }
 
  render() {
    let passengerInfo: Array<PassengerInfo> = this.props.bookingDetails.passengers;
    const passengers = passengerInfo.map((passenger: PassengerInfo, index: number) => (
      <div className={'row' + ((passengerInfo.length-1 !== index) ? ' passenger-row': '')} key={index.toString()}>
        <div className="col-sm-8 my-auto">
          <PersonOutlineIcon color="primary"/>
          <span className="text-bold icon-label">{passenger.updated ? passenger.first_name + ' ' + passenger.last_name : this.props.t("commonWords.passengerTypes." + passenger.passenger_type)} </span>
          {index === 0 && <span>({this.props.t("book.passengerDetails.passenger1")})</span>}
        </div>
        <div className="col-sm-4">
          {passenger.updated 
            ? <Button 
              variant="outlined"
              color="secondary"
              size="small"
              className="float-right"
              onClick={(e) => this.handleModalOpen(index)}
            >
              {this.props.t("book.passengerDetails.edit")}
            </Button>
            : <Button 
              variant="contained"
              color="secondary"
              size="small"
              className="float-right"
              onClick={(e) => this.handleModalOpen(index)}
              disableElevation
            >
              {this.props.t("book.passengerDetails.add")}
            </Button>
          }
          
        </div>
      </div>));

    const trip: Results = this.props.resultsDetails[this.props.resultsDetails.tripType];

    return (
      <div>
        <h5>{this.props.t("book.passengerDetails.title")}</h5>
        <div className="book-container">
          {passengers}
        </div>      
        <PassengerDetailsModal 
          modalState={this.state.modalOpen}
          handleModalOpen={this.handleModalOpen}
          passenger={passengerInfo[this.state.currentPassengerIndex]}
          currentPassengerIndex={this.state.currentPassengerIndex}
          updatePassengerInfo={this.props.updatePassengerInfo}
          dateFormat={this.props.dateFormat}
          pricedItineraries={this.props.pricedItineraries}
          bookingSegments={[...this.props.resultsDetails.activeSegments.values()]}
          pathSequence={trip.path_sequence}
          flights={trip.flight_details}
          updateFrequentFlyerCards={this.props.updateFrequentFlyerCards}
          trip={trip}
        />    
      </div>
    );
  }

  handleModalOpen = (index: number) => {
    this.setState({modalOpen: !this.state.modalOpen, currentPassengerIndex: index});
  }
}

export default withTranslation('common')(PassengerDetails);
