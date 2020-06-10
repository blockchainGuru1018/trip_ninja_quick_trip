import React from 'react';
import './ItineraryResult.css';
import ItineraryPath from './ItineraryPath';
import SegmentNav from './SegmentNav';
import PricingRequest from './PricingRequest';
import Button from '@material-ui/core/Button';

class ItineraryResult extends React.Component {

  render() {
    return (
      <div id="itinerary-result">
        <div className="itinerary-header">
          <div className="row">
            <div className="col-xl-10 col-lg-9">
              <ItineraryPath />
            </div>
            <div className="col-xl-2 col-lg-3">
              <div className="float-right">
                <Button
                  color="secondary"
                  variant="contained"
                  href="/search">
                  Change Search
                </Button>
              </div>
            </div>
          </div>
          <hr/>
          <h1>Your Itinerary</h1>
          <h4><strong>Total:</strong> $10,000 | 1 ADT</h4>
          <div className="row">
            <div className="col-md-8">

            </div>
            <div className="col-md-4">
              <PricingRequest />
            </div>
          </div>
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
