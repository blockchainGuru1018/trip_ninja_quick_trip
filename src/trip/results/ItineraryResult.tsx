import React from 'react';
import './ItineraryResult.css';
import SegmentNav from './SegmentNav';
import PricingRequest from './PricingRequest';
import ResultsHeader from './ResultsHeader';
import SegmentPreview from './SegmentPreview';
import { CurrencySymbol } from '../../helpers/CurrencySymbolHelper';


class ItineraryResult extends React.Component {
  render() {
    const trip = {
      "price": "999.99",
      "currency": "CAD",
      "passengers": "1 ADT"
    };
    const selectedSegments = 
      <div className="row">
        <div className="col-xl">
          <SegmentPreview />
        </div>        
      </div>;

    return (
      <div id="itinerary-result">
        <div className="itinerary-header">
          <ResultsHeader/>
          <h1>Your Itinerary</h1>
          <h4>
            <strong>Total: </strong> 
            {CurrencySymbol(trip.currency)}{trip.price}
            <span className="divider">|</span>
            {trip.passengers}
          </h4>
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
            {selectedSegments}
          </div>
        </div>
      </div>
    );
  }
}

export default ItineraryResult;
