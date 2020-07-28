import React from 'react';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
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
          <p>
            <span className="text-bold">Gender </span>
            {passenger.gender === 'F' ? 'Female' : 'Male'}
          </p>
          <p>
            <span className="text-bold">Nationality </span>
            {passenger.passport_country}
          </p>
          <p>
            <span className="text-bold">Passport # </span>
            {passenger.passport_number}
          </p>
          <p>
            <span className="text-bold">Passport Expiry </span>
            {passenger.passport_expiration}
          </p>
        </div>
        <div className="col-sm-3">
          <p>
            <span className="text-bold">Phone </span>
            {passenger.phone_number}
          </p>
          <p>
            <span className="text-bold">Email </span>
            {passenger.email}
          </p>
        </div>
      </div>
    ));
  }
}

export default PassengerDetails;