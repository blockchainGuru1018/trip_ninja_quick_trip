import React from 'react';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import Button from '@material-ui/core/Button';
import PassengerDetailsModal from './PassengerDetailsModal';
import { Passenger } from '../search/SearchInterfaces';
import { PassengerInfo, BookingDetails } from './BookInterfaces';
import { updatePassengerInfo } from '../../actions/BookActions';

interface PassengerDetailsProps {
  passengers: Array<Passenger>;
  bookingDetails: BookingDetails;
  updatePassengerInfo: typeof updatePassengerInfo;
  dateFormat: string;
}

class PassengerDetails extends React.Component<PassengerDetailsProps> {
  state = {
    modalOpen: false,
    currentPassengerIndex: 0
  }
 
  render() {
    let passengerInfo: Array<PassengerInfo> = this.props.bookingDetails.passengers;

    const passengers = passengerInfo.map((passenger: PassengerInfo, index: number) => (
      <div className="row passenger-row" key={index.toString()}>
        <div className="col-sm-8 passenger-label">
          <PersonOutlineIcon color="primary"/>
          <span className="text-bold icon-label">{passenger.updated ? passenger.first_name + ' ' + passenger.last_name : passenger.passenger_type_name} </span>
          {index === 0 && <span>(Passenger 1)</span>}
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
            Edit
            </Button>
            : <Button 
              variant="contained"
              color="secondary"
              size="small"
              className="float-right"
              onClick={(e) => this.handleModalOpen(index)}
              disableElevation
            >
            Add
            </Button>
          }
          
        </div>
      </div>));

    return (
      <div>
        <h5>Passenger Details</h5>
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
        />    
      </div>
    );
  }

  handleModalOpen = (index: number) => {
    this.setState({modalOpen: !this.state.modalOpen, currentPassengerIndex: index});
  }
}

export default PassengerDetails;
