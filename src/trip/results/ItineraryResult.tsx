import React from 'react';
import './ItineraryResult.css';
import SegmentNav from './SegmentNav';
import PricingRequest from './PricingRequest';
import ResultsHeader from './ResultsHeader';
import SegmentPreview from './SegmentPreview';
import { CurrencySymbol } from '../../helpers/CurrencySymbolHelper';


class ItineraryResult extends React.Component {
  render() {
    const trip = 
      {
        "fare_structure": {
          "markup": 25,
          "path_sequence": [
            "LON-CDG",
            "CDG-YUL",
            "YUL-LON",
            "LON-YHZ"
          ],
          "trip_id": "string",
          "segments": [
            [
              {
                "source": "travelport",
                "origin": "NYC",
                "destination": "LHR",
                "itinerary_type": "ONE_WAY",
                "itinerary_id": "ad76ah7dhasd76asb76",
                "itinerary_structure": [],
                "segment_position": 0,
                "option_id": "vi65s76sdf9",
                "option_part": "1/2",
                "virtual_interline": true,
                "vi_type": "OPEN_JAW",
                "vi_position": 1,
                "weight": 239,
                "price": 197.1,
                "base_price": 0,
                "taxes": 119.1,
                "fees": 0,
                "transportation_time": 425,
                "fare_type": "Published",
                "baggage": {},
                "additional_details": {},
                "cabin_class": "Economic Standard",
                "alliance": "*A",
                "private_fare": false,
                "priced_passengers": [],
                "segment_time_w_connections": 75,
                "flights": [],
                "brands": [ ]
              }
            ]
          ],
          "flight_details": []
        }
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
          <h1 className="your-itinerary">Your Itinerary</h1>
          <h4>
            <strong>Total: </strong> 
            {CurrencySymbol("USD")}21.00
            <span className="divider">|</span>
            1 ADT
          </h4>
          <div className="row">
            <div className="col-md-8">

            </div>
            <div className="col-md-4">
              <PricingRequest />
            </div>
          </div>
        </div>
        
        <div className="row full-height">
          <div className="col-sm-3">
            <SegmentNav pathSequence={trip.fare_structure.path_sequence}/>
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
