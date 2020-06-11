import React from 'react';
import './ItineraryResult.css';
import SegmentNav from './SegmentNav';
import PricingRequest from './PricingRequest';
import ResultsHeader from './ResultsHeader';
import { CurrencySymbol } from '../../helpers/CurrencySymbolHelper';


class ItineraryResult extends React.Component {

  render() {
    return (
      <div id="itinerary-result">
        <div className="itinerary-header">
          <ResultsHeader/>
          <h1>Your Itinerary</h1>
          <h4><strong>Total:</strong> {CurrencySymbol("EUR")}10,000 | 1 ADT</h4>
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
