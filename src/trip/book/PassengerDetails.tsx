import React from 'react';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import Button from '@material-ui/core/Button';
import PassengerDetailsModal from './PassengerDetailsModal';
import { Passenger } from '../search/SearchInterfaces';
import { PassengerInfo } from './BookInterfaces';

interface PassengerDetailsProps {
  passengers: Array<Passenger>;
}

class PassengerDetails extends React.Component<PassengerDetailsProps> {
  state = {
    modalOpen: false,
  }

  render() {
    let passengerInfo: Array<PassengerInfo> = [];
    let passenger1: PassengerInfo = {'passenger_type': 'Adult'};
    let passenger2: PassengerInfo = {'passenger_type': 'Adult', 'first_name': "Donald", 'last_name': "Donald"};
    passengerInfo[0] = passenger1;
    passengerInfo[1] = passenger2;

    //this.props.passengers.forEach((passenger: Passenger, index: number) => passengerInfo.push(p));
    //console.log(passengerInfo);
    
    const passengersList = ['ADT', 'ADT'];
    const passengerAdded: boolean = false;

    const passengers = passengerInfo.map((passenger: PassengerInfo, index: number) => (
      <div className="row passenger-row" key={index.toString()}>
        <div className="col-sm-8 passenger-label">
          <PersonOutlineIcon color="primary"/>
          <span className="text-bold icon-label">{passenger.first_name ? passenger.first_name + ' ' + passenger.last_name : passenger.passenger_type} </span>
          {index === 0 && <span>(Passenger 1)</span>}
        </div>
        <div className="col-sm-4">
          {passenger.first_name 
            ? <Button 
              variant="outlined"
              color="secondary"
              className="float-right"
              onClick={this.handleModalOpen}
            >
            Edit
            </Button>
            : <Button 
              variant="contained"
              color="secondary"
              className="float-right"
              onClick={this.handleModalOpen}
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
        <PassengerDetailsModal modalState={this.state.modalOpen} passenger={passengerInfo[0]}/>    
      </div>
    );
  }

  handleModalOpen = () => {
    this.setState({modalOpen: true});
  }
}

export default PassengerDetails;
