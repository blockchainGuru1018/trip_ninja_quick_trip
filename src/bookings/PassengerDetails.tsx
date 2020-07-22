import React from 'react';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';


interface PassengerDetailsProps {

}

class PassengerDetails extends React.Component<PassengerDetailsProps> {

  render() {
    return (
      <div>
        <h5>Passenger Details</h5>
        <div className="row">
          <div className="col-sm-2">
            <PersonOutlineIcon color="primary" fontSize="large" />
            <p className="text-bold">Passenger Name</p>
            <p>ADT</p>
          </div>
          <div className="col-sm-2 border-left">
            <p className="text-bold">Gender</p>
            <p className="text-bold">Nationality</p>
            <p className="text-bold">Passport #</p>
            <p className="text-bold">Passport Expiry</p>
          </div>
          <div className="col-sm-2">
            <p className="text-bold">Phone</p>
            <p className="text-bold">Email</p>
          </div>
        </div>
      </div>
    );
  }
}

export default PassengerDetails;