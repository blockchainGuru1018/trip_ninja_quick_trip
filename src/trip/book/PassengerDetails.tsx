import React from 'react';
import Paper from '@material-ui/core/Paper';

interface PassengerDetailsProps {

}

class PassengerDetails extends React.Component<PassengerDetailsProps> {

  render() {

    return (
      <div>
        <h5>Passenger Details</h5>
        <Paper>
          <div className="paper-container">
            <p>Passenger details go here!</p>
          </div>          
        </Paper>
      </div>
    );
  }

}

export default PassengerDetails;
