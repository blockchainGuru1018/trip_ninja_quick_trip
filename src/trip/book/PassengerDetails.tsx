import React from 'react';

interface PassengerDetailsProps {

}

class PassengerDetails extends React.Component<PassengerDetailsProps> {

  render() {

    return (
      <div>
        <h5>Passenger Details</h5>
        <div className="book-container">
          <p>Passenger details go here!</p>
        </div>          
      </div>
    );
  }

}

export default PassengerDetails;
