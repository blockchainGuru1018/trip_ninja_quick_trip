import React from 'react';
import FlightIcon from '@material-ui/icons/Flight';

class TripPath extends React.Component {
  render() {
    return (
      <div className="trip-path float-right">
        <p>
          <span>YHZ </span>
          <FlightIcon className="rotate-90"/>
          <span> YOW</span>
        </p>
      </div>
    )
  }
}

export default TripPath;