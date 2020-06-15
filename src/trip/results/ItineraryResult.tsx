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
    const trip = this.props.resultsDetails;
     
    const totalPrice: number = trip.fareStructureResults!.segments.reduce((total, segment) =>
    {return total + segment[0].price;},0
    );

    let selectedTrip = [];
    for (let segment in trip.fareStructureResults!.segments) {
      selectedTrip.push(trip.fareStructureResults!.segments[segment][0]);
    }

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
          <ResultsHeader tripInfo={selectedTrip} flights={trip.fareStructureResults?.flight_details}/>
          <h1 className="your-itinerary">Your Itinerary</h1>
          <h4>
            <strong>Total: </strong> 
            {CurrencySymbol("USD")}{totalPrice.toFixed()}
            <span className="divider">|</span>
            {passengersString}
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
          <div className="col-sm-3 no-padding">
            <SegmentNav pathSequence={trip.fareStructureResults!.path_sequence}/>
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
