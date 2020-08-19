import React from 'react';
import './ItineraryResult.css';
import SegmentNav from './SegmentNav';
import PricingRequest from './PricingRequest';
import ResultsHeader from './ResultsHeader';
import SegmentPreviews from './SegmentPreviews';
import { currencySymbol } from '../../helpers/CurrencySymbolHelper';
import { createPassengerStringFromPayload } from '../../helpers/PassengersListHelper';
import {ResultsDetails, Results, Segment, Filter} from './ResultsInterfaces';
import { priceFlights } from '../../actions/PricingActions';
import { Passenger } from '../search/SearchInterfaces';
import {updateActives, updateItineraryFilter, updateSortType, updateEntireTrip}
  from '../../actions/ResultsActions';
import { AuthDetails } from '../../auth/AuthInterfaces';
import { getTotal } from '../../helpers/MiscHelpers';
import BaggageFilter from './filters/BaggageFilter';
import NumberOfStopsFilter from './filters/NumberOfStopsFilter';
import AllianceFilter from './filters/AllianceFilter';
import SortOption from "./SortOption";

interface ItineraryResultsProps {
  resultsDetails: ResultsDetails;
  currency: string;
  priceFlights: typeof priceFlights;
  passengers: Array<Passenger>;
  authDetails: AuthDetails;
  updateItineraryFilter: typeof updateItineraryFilter;
  itineraryFilters: Array<Filter> | undefined
  updateActives: typeof updateActives;
  updateSortType: typeof updateSortType;
  updateEntireTrip: typeof updateEntireTrip;
}

class ItineraryResult extends React.Component<ItineraryResultsProps> {

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
            authDetails={this.props.authDetails}
            trip={trip}
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
            <div className='col-md-12 itinerary-sort-container'>
              <SortOption
                trip={trip}
                segmentPosition={-1}
                sortBy={this.props.resultsDetails.itinerarySortBy}
                updateSortType={this.props.updateSortType}
                updateEntireTrip={this.props.updateEntireTrip}
                updateActives={this.props.updateActives}
              />
            </div>
          </div>
          <div className="row">
            <div className='col-md-8'>
              <div className='row'>
                <div className='col-md-3'>
                  <BaggageFilter
                    sortBy={this.props.resultsDetails.itinerarySortBy}
                    segmentSortBy={this.props.resultsDetails.segmentSortBy}
                    updateItineraryFilter={this.props.updateItineraryFilter}
                    itineraryFilters={this.props.itineraryFilters!.find((filter: Filter) => filter.type === 'baggage')}
                    trip={trip}
                    updateActives={this.props.updateActives}
                    segmentIndex={-1}
                    activeSegments={this.getActiveSegments(trip)}
                    updateEntireTrip={this.props.updateEntireTrip}
                  />
                </div>
                <div className='col-md-3'>
                  <NumberOfStopsFilter
                    sortBy={this.props.resultsDetails.itinerarySortBy}
                    segmentSortBy={this.props.resultsDetails.segmentSortBy}
                    updateItineraryFilter={this.props.updateItineraryFilter}
                    itineraryFilters={this.props.itineraryFilters!.find((filter: Filter) => filter.type === 'noOfStops')}
                    trip={trip}
                    updateActives={this.props.updateActives}
                    segmentIndex={-1}
                    activeSegments={this.getActiveSegments(trip)}
                    updateEntireTrip={this.props.updateEntireTrip}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-4">
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
}

export default ItineraryResult;
