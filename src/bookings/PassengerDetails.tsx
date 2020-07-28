import React from 'react';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import Moment from 'react-moment';
import { PassengerInfo } from '../trip/book/BookInterfaces';

interface PassengerDetailsProps {
  passengers?: Array<PassengerInfo>
}

class PassengerDetails extends React.Component<PassengerDetailsProps> {

  render() {
    return (
      <div>
        <h5 className="section-header">Passenger Details</h5>
        {this.passengersInfo()}
      </div>
    );
  }

  passengersInfo = () => {
    const passengers = this.props.passengers ? this.props.passengers : [];
    return passengers.map((passenger, index) => (
      <div className="row" key={index.toString()}>
        <div className="col-sm-2 no-pad-left my-auto">
          <div className="float-left passenger-icon">
            <PersonOutlineIcon color="primary" fontSize="large" />
          </div>
          <div>
            <p className="text-bold">{passenger.first_name} {passenger.last_name}</p>
            <p className="text-small">{passenger.passenger_type}</p>
          </div>
        </div>
        <div className="col-sm-2 border-left">
          <p className="passenger-field">Gender</p>
          <p className="passenger-field">Nationality</p>
          <p className="passenger-field">Passport #</p>
          <p className="passenger-field">Passport Expiry</p>
        </div>
        <div className="col-sm-1 no-pad-left">
          <p>{passenger.gender === 'F' ? 'Female' : 'Male'}</p>
          <p>{passenger.passport_country}</p>
          <p>{passenger.passport_number}</p>
          <p><Moment format="DD/MM/YYYY">{passenger.passport_expiration}</Moment></p>
        </div>
        <div className="col-sm-1">
          <p className="passenger-field">Phone</p>
          <p className="passenger-field">Email</p>
        </div>
        <div className="col-sm-2 no-pad-left">
          <p>{passenger.phone_number}</p>
          <p>{passenger.email}</p>
        </div>
      </div>
    ));
  }
}

export default PassengerDetails;