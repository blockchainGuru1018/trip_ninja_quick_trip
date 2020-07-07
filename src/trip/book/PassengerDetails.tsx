import React from 'react';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import Button from '@material-ui/core/Button';

interface PassengerDetailsProps {

}

class PassengerDetails extends React.Component<PassengerDetailsProps> {

  render() {
    const passengersList = ['ADT', 'ADT'];
    const passengerAdded: boolean = false;

    const passengers = passengersList.map((passenger: string, index: number) => (
      <div className="row passenger-row" key={index.toString()}>
        <div className="col-sm-8 passenger-label">
          <PersonOutlineIcon color="primary"/>
          <span className="text-bold icon-label">{passengerAdded ? 'Roberto Dumonte' : 'Adult #1'} </span>
          {index === 0 && <span>(Passenger 1)</span>}
        </div>
        <div className="col-sm-4">
          {passengerAdded 
            ? <Button 
              variant="outlined"
              color="secondary"
              className="float-right"
            >
            Edit
            </Button>
            : <Button 
              variant="contained"
              color="secondary"
              className="float-right"
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
      </div>
    );
  }

}

export default PassengerDetails;
