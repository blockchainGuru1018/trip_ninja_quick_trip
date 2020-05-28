import React from 'react';
import FlightIcon from '@material-ui/icons/Flight';

class TripPath extends React.Component {
  render() {
    return (
      <div className="float-right">
        <span>YHZ</span>
        <FlightIcon className="rotate-90"/>
        <span>YOW</span>
      </div>
    )
  }
}

export default TripPath;