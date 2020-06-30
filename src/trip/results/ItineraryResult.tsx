import React from 'react';
import './ItineraryResult.css';
import SegmentNav from './SegmentNav';
import PricingRequest from './PricingRequest';
import ResultsHeader from './ResultsHeader';
import SegmentPreview from './SegmentPreview';
import { currencySymbol } from '../../helpers/CurrencySymbolHelper';
import { createPassengersString } from '../../helpers/PassengersListHelper';
import { ResultsDetails, Results, Segment } from './ResultsInterfaces';
import { setActiveSegment } from '../../actions/ResultsActions';
import { priceFlights } from '../../actions/PricingActions'

interface ItineraryResultsProps {
  resultsDetails: ResultsDetails
  currency: string
  setActiveSegment: typeof setActiveSegment
  priceFlights: typeof priceFlights
}

class ItineraryResult extends React.Component<ItineraryResultsProps> {

  componentDidMount() {
    this.setActiveSegments();
  }

  render() {
    const trip = this.props.resultsDetails.tripType === 'flexTripResults'
      ? this.props.resultsDetails.flexTripResults! : this.props.resultsDetails.fareStructureResults!;

    let selectedTrip: Array<Segment> = this.getActiveSegments(trip);
    console.log(selectedTrip);
    console.log("trip", trip);
    const totalPrice: number = selectedTrip.reduce((total, segment) => {return total + segment.price;},0);

    const selectedSegments =
      <div className="row">
        <div className="col-xl">
          <SegmentPreview
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
            {createPassengersString(trip.segments[0])}
          </h4>
          <div className="row">
            <div className="col-md-4 offset-md-8">
              <PricingRequest
                resultsDetails={this.props.resultsDetails}
                currency={this.props.currency}
                totalPrice={totalPrice}
                selectedTrip= {selectedTrip}
                priceFlights = {this.props.priceFlights}
              />
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

  setActiveSegments = () => {
    this.props.resultsDetails[this.props.resultsDetails.tripType].segments.forEach((segment: Segment, index: number) => {this.props.setActiveSegment(index, 0)});
  }

  getActiveSegments = (trip: Results) => {
    return trip.segments.map((segments: Array<Segment>) => {return segments.find((object: Segment) => { return object.status === 'active'; }) || segments[0]});
  }
}

export default ItineraryResult;
