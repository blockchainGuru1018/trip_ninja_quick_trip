import React from 'react';
import './ItineraryResult.css';
import ItineraryPath from './ItineraryPath';
import SegmentNav from './SegmentNav';

class ItineraryResult extends React.Component {

  render() {
    return (
      <div id="itinerary-result">
        <div className="row">
          <div className="col-md-10">
            <ItineraryPath />
          </div>
          <div className="col-md-2">
            <span>Change Search</span>
          </div>
        </div>
        <hr/>
        <h1>Your Itinerary</h1>
        <div className="row">
          <h4>Total Price: $10,000 | 1 ADT</h4>
        </div>
        <div className="row">
          <div className="col-sm-3">
            <SegmentNav />
          </div>
          <div className="col-sm-9">
            
          </div>
        </div>
      </div>
    );
  }
}

export default ItineraryResult;
