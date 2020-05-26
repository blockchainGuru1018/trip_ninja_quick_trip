import React from 'react';

class FlightInput extends React.Component {
  render() {
    return (
      <div className="row">
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
          <select>
            <option value="E">Economy</option>
          </select>
        </div>
      </div>
    )
  }
}

export default FlightInput;