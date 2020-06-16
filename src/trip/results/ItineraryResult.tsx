import React from 'react';
import './ItineraryResult.css';
import SegmentNav from './SegmentNav';
import PricingRequest from './PricingRequest';
import ResultsHeader from './ResultsHeader';
import SegmentPreview from './SegmentPreview';
import { CurrencySymbol } from '../../helpers/CurrencySymbolHelper';
import { createPassengersString } from '../../helpers/PassengersListHelper';
import { ResultsDetails } from './ResultsInterfaces';


interface ItineraryResultsProps {
  resultsDetails: ResultsDetails
  currency: string
}

class ItineraryResult extends React.Component<ItineraryResultsProps> {
  render() {
    console.log(this.props.resultsDetails);
<<<<<<< HEAD
    const trip = this.props.resultsDetails;


    const totalPrice: number = trip.fareStructureResults!.segments.reduce((total, segment) =>
    {return total + segment[0].price;},0
    );

    const segments = ["LGW-DXB•May 19 | DXB-LGW•May 24 | LGW-DXB•May 27 | DXB-LGW•May 29|LGW-DXB•May 35"]; //: string[] = trip.fare_structure.segments.map();

=======
    const trip = this.props.resultsDetails.tripType === 'farestructure' 
      ? this.props.resultsDetails.fareStructureResults! : this.props.resultsDetails.flexTripResults!;
     
>>>>>>> feature/#6jht18-itinerary-results-page
    let selectedTrip = [];
    for (let segment in trip.segments) {
      selectedTrip.push(trip.segments[segment][0]); // trip.segments.filter((segment: Segment) => { return segment.selected === true })
    }

<<<<<<< HEAD

    const selectedSegments =
=======
    const totalPrice: number = selectedTrip.reduce((total, segment) => {return total + segment.price;},0);
    
    const selectedSegments = 
>>>>>>> feature/#6jht18-itinerary-results-page
      <div className="row">
        <div className="col-xl">
          <SegmentPreview
            segments={selectedTrip}
            flightDetails={trip.fareStructureResults!.flight_details}
          />
        </div>
      </div>;

    return (
      <div id="itinerary-result">
        <div className="itinerary-header">
          <ResultsHeader tripInfo={selectedTrip} flights={trip.flight_details}/>
          <h1 className="itinerary-title">Your Itinerary</h1>
          <h4>
<<<<<<< HEAD
            <strong>Total: </strong>
            {CurrencySymbol("USD")}{totalPrice.toFixed()}
=======
            <strong>Total: </strong> 
            {CurrencySymbol(this.props.currency)}{totalPrice.toFixed()}
>>>>>>> feature/#6jht18-itinerary-results-page
            <span className="divider">|</span>
            {createPassengersString(trip.segments[0])}
          </h4>
          <div className="row">
            <div className="col-md-4 offset-md-8">
              <PricingRequest />
            </div>
          </div>
<<<<<<< HEAD
        </div>

        <div className="row full-height">
          <div className="col-sm-3">
            <SegmentNav pathSequence={trip.fareStructureResults!.path_sequence}/>
=======
        </div>        
        <div className="row">
          <div className="col-md-3 no-padding">
            <SegmentNav pathSequence={trip.path_sequence}/>
>>>>>>> feature/#6jht18-itinerary-results-page
          </div>
          <div className="col-md-9 segment-list">
            {selectedSegments}
          </div>
        </div>
      </div>
    );
  }
}

export default ItineraryResult;
