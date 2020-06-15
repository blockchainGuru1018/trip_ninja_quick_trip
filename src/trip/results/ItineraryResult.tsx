import React from 'react';
import './ItineraryResult.css';
import SegmentNav from './SegmentNav';
import PricingRequest from './PricingRequest';
import ResultsHeader from './ResultsHeader';
import SegmentPreview from './SegmentPreview';
import { CurrencySymbol } from '../../helpers/CurrencySymbolHelper';
import { createPassengersString } from '../../helpers/PassengersListHelper';
import { ResultsDetails } from './ResultsInterfaces';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';


interface ItineraryResultsProps {
  resultsDetails: ResultsDetails
}

class ItineraryResult extends React.Component<ItineraryResultsProps> {
  render() {
    console.log(this.props.resultsDetails);
    const trip = this.props.resultsDetails.fareStructureResults!; // ADD CHECK FOR IF FS or FT WAS SELECTED
     
    let selectedTrip = [];
    for (let segment in trip.segments) {
      selectedTrip.push(trip.segments[segment][0]);
    }

    const totalPrice: number = selectedTrip.reduce((total, segment) =>
    {return total + segment.price;},0
    );


    const passengersString = createPassengersString(this.props.resultsDetails.fareStructureResults?.segments[0]);
    
    const selectedSegments = 
      <div className="row">
        <div className="col-xl">
          <SegmentPreview segments={selectedTrip} />
        </div>        
      </div>;

    return (
      <div id="itinerary-result">
        <div className="itinerary-header">
          <ResultsHeader tripInfo={selectedTrip} flights={trip.flight_details}/>
          <h1 className="itinerary-title">Your Itinerary</h1>
          <h4>
            <strong>Total: </strong> 
            {CurrencySymbol("USD")}{totalPrice.toFixed()}
            <span className="divider">|</span>
            {passengersString}
          </h4>
          <div className="row">
            <div className="col-md-4 offset-md-8">
              <PricingRequest />
            </div>
          </div>
        </div>
        
        <div className="row">
          <div className="col-md-3 no-padding">
            <SegmentNav pathSequence={trip.path_sequence}/>
          </div>
          <div className="col-md-9">
            {selectedSegments}
          </div>
        </div>
      </div>
    );
  }
}

export default ItineraryResult;
