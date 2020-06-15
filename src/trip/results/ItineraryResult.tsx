import React from 'react';
import './ItineraryResult.css';
import SegmentNav from './SegmentNav';
import PricingRequest from './PricingRequest';
import ResultsHeader from './ResultsHeader';
import SegmentPreview from './SegmentPreview';
import { CurrencySymbol } from '../../helpers/CurrencySymbolHelper';
import { ResultsDetails } from './ResultsInterfaces';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';


interface ItineraryResultsProps {
  resultsDetails: ResultsDetails
}

class ItineraryResult extends React.Component<ItineraryResultsProps> {
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
            ],
            [
              {
                "source": "travelport",
                "origin": "LHR",
                "destination": "YUL",
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

    const totalPrice: number = trip.fare_structure.segments.reduce((total, segment) =>
    {return total + segment[0].price;},0
    );

    const segments = ["LGW-DXB•May 19 | DXB-LGW•May 24 | LGW-DXB•May 27 | DXB-LGW•May 29|LGW-DXB•May 35"]; //: string[] = trip.fare_structure.segments.map();

    let selectedTrip = [];
    for (let segment in trip.fare_structure.segments) {
      selectedTrip.push(trip.fare_structure.segments[segment][0]);
    }

    
    const selectedSegments = 
      <div className="row">
        <div className="col-xl">
          <SegmentPreview segments={selectedTrip} />
        </div>        
      </div>;

    return (
      <div id="itinerary-result">
        <div className="itinerary-header">
          <ResultsHeader tripInfo={selectedTrip}/>
          <h1 className="your-itinerary">Your Itinerary</h1>
          <h4>
            <strong>Total: </strong> 
            {CurrencySymbol("USD")}{totalPrice.toFixed()}
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
