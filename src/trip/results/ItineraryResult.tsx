import React from 'react';
import './ItineraryResult.css';
import SegmentNav from './SegmentNav';
import PricingRequest from './PricingRequest';
import ResultsHeader from './ResultsHeader';
import SegmentPreviews from './SegmentPreviews';
import { currencySymbol } from '../../helpers/CurrencySymbolHelper';
import { createPassengerStringFromPayload } from '../../helpers/PassengersListHelper';
import { ResultsDetails, Results, Segment , SegmentPositionMap, Filters } from './ResultsInterfaces';
import { priceFlights } from '../../actions/PricingActions';
import { Passenger } from '../search/SearchInterfaces';
import { updateActives, setSegmentPositionMapValue, updateItineraryFilter } from '../../actions/ResultsActions';
import { AuthDetails } from '../../auth/AuthInterfaces';
import { getTotal } from '../../helpers/MiscHelpers';
import BaggageFilter from './filters/BaggageFilter';

interface ItineraryResultsProps {
  resultsDetails: ResultsDetails;
  currency: string;
  priceFlights: typeof priceFlights;
  passengers: Array<Passenger>;
  setSegmentPositionMapValue:  typeof setSegmentPositionMapValue;
  authDetails: AuthDetails;
  updateItineraryFilter: typeof updateItineraryFilter;
  itineraryFilters: Filters | undefined
  updateActives: typeof updateActives;
}

class ItineraryResult extends React.Component<ItineraryResultsProps> {

  componentDidMount() {
    this.createSortingDefaults();
  }

  render() {
    const trip = this.props.resultsDetails.tripType === 'flexTripResults'
      ? this.props.resultsDetails.flexTripResults! : this.props.resultsDetails.fareStructureResults!;

    let selectedTrip: Array<Segment> = this.getActiveSegments(trip);

    const totalPrice: number = getTotal(selectedTrip, 'price');

    const selectedSegments =
      <div className="row">
        <div className="col-xl">
          <SegmentPreviews
            totalPrice={totalPrice}
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
          <ResultsHeader 
            segments={selectedTrip} 
            pathSequence={trip.path_sequence}
            flights={trip.flight_details}
          />
          <h1 className="itinerary-title">Your Itinerary</h1>
          <h4>
            <strong>Total: </strong>
            {currencySymbol(this.props.currency)}{Math.round(totalPrice)}
            <span className="divider">|</span>
            {createPassengerStringFromPayload(this.props.passengers)}
          </h4>
          <div className="row">
            <div className='col-md-4'>
              <BaggageFilter
                updateItineraryFilter={this.props.updateItineraryFilter}
                itineraryFilters={this.props.itineraryFilters}
                trip={trip}
                updateActives={this.props.updateActives}
                segmentIndex={-1}
                activeSegments={this.getActiveSegments(trip)}
              />
            </div>
            <div className="col-md-4 offset-md-4">
              <PricingRequest
                resultsDetails={this.props.resultsDetails}
                currency={this.props.currency}
                totalPrice={totalPrice}
                selectedTrip= {selectedTrip}
                priceFlights = {this.props.priceFlights}
                authDetails={this.props.authDetails}
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
