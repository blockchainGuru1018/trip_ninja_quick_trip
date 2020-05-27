import React from 'react';
import CabinSelect from './CabinSelect';

class FlightInput extends React.Component {
  render() {
    return (
      <div className="row flight-input">
        <div className="col-sm-3">
          <input type="text" placeholder="From" />
        </div>
        <div className="col-sm-3">
          <input type="text" placeholder="To" />
        </div>
        <div className="col-sm-3">
          <input type="text" placeholder="Depart" />
        </div>
        <div className="col-sm-3">
          <CabinSelect />
        </div>
      </div>
    )
  }
}

export default FlightInput;