import React from 'react';
import './ItineraryResult.css';
import SegmentNav from './SegmentNav';
import PricingRequest from './PricingRequest';
import ResultsHeader from './ResultsHeader';
import SegmentPreviews from './SegmentPreviews';
import { currencySymbol } from '../../helpers/CurrencySymbolHelper';
import { createPassengerStringFromPayload } from '../../helpers/PassengersListHelper';
import { ResultsDetails, Results, Segment , SegmentPositionMap} from './ResultsInterfaces';
import { Passenger } from '../search/SearchInterfaces';
import {setSegmentPositionMapValue} from '../../actions/ResultsActions';

interface ItineraryResultsProps {
  resultsDetails: ResultsDetails
  currency: string
  passengers: Array<Passenger>
  setSegmentPositionMapValue:  typeof setSegmentPositionMapValue
}

class ItineraryResult extends React.Component<ItineraryResultsProps> {

  componentDidMount() {

    this.createSortingDefaults();
  }

  render() {
    const trip = this.props.resultsDetails.tripType === 'flexTripResults'
      ? this.props.resultsDetails.flexTripResults! : this.props.resultsDetails.fareStructureResults!;

    let selectedTrip: Array<Segment> = this.getActiveSegments(trip);
    const totalPrice: number = selectedTrip.reduce((total, segment) => {return total + segment.price;},0);

    const selectedSegments =
      <div className="row">
        <div className="col-xl">
          <SegmentPreviews
            segments={selectedTrip}
            flightDetails={trip.flight_details}
            currency={this.props.currency}
            segmentSelect={false}
          />
        </div>
      </div>;

    return (
      <div id="itinerary-result">
        <div className="results-header">
          <ResultsHeader segments={selectedTrip} flights={trip.flight_details}/>
          <h1 className="itinerary-title">Your Itinerary</h1>
          <h4>
            <strong>Total: </strong>
            {currencySymbol(this.props.currency)}{totalPrice.toFixed()}
            <span className="divider">|</span>
            {createPassengerStringFromPayload(this.props.passengers)}
          </h4>
          <div className="row">
            <div className="col-md-4 offset-md-8">
              <PricingRequest />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2 no-padding">
            <SegmentNav pathSequence={trip.path_sequence}/>
          </div>
          <div className="col-md-10 segment-list">
            {selectedSegments}
          </div>
        </div>
      </div>
    );
  }

  getActiveSegments = (trip: Results) =>
    trip.segments.map((segments: Array<Segment>) =>
      segments.find((object: Segment) => object.status === 'active') || segments[0]
    );

  createSortingDefaults = () => {
    this.props.resultsDetails.segmentPositionMap = new SegmentPositionMap();
    const segments = this.props.resultsDetails.fareStructureResults?.segments;
    const segmentPositionCount: number = segments ? segments.length : 0;
    for (let step = 0; step < segmentPositionCount; step++) {
      this.props.setSegmentPositionMapValue(step, 'sortOrder', this.props.resultsDetails.defaultSortBy);
    }
  }
}

export default ItineraryResult;
