import React from 'react';
import './ItineraryResult.css';
import SegmentNav from './SegmentNav';
import PricingRequest from './PricingRequest';
import ResultsHeader from './ResultsHeader';
import SegmentPreviews from './SegmentPreviews';
import { currencySymbol } from '../../helpers/CurrencySymbolHelper';
import { createPassengerStringFromPayload } from '../../helpers/PassengersListHelper';
import {ResultsDetails, Segment, Filter} from './ResultsInterfaces';
import { priceFlights } from '../../actions/PricingActions';
import { Passenger } from '../search/SearchInterfaces';
import {updateActives, updateItineraryFilter, updateSortType, updateEntireTrip}
  from '../../actions/ResultsActions';
import { getTotal } from '../../helpers/MiscHelpers';
import FlightsFilter from './filters/FlightsFilter';
import SortOption from "./SortOption";
import {Alert} from "@material-ui/lab";
import { withTranslation, WithTranslation } from 'react-i18next';

interface ItineraryResultsProps extends WithTranslation {
  resultsDetails: ResultsDetails;
  currency: string;
  priceFlights: typeof priceFlights;
  passengers: Array<Passenger>;
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

    let selectedTrip: Array<Segment> = [...this.props.resultsDetails.activeSegments.values()];

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
            trip={trip}
          />
        </div>
      </div>;

    const enabledFilters = ['baggage','noOfStops','alliance','refundability'];

    return (
      <div id="itinerary-result">
        <ResultsHeader 
          segments={selectedTrip} 
          pathSequence={trip.path_sequence}
          flights={trip.flight_details}
          flexTripResults={this.props.resultsDetails.flexTripResults ? true : false}
        />
        <div className="results-section-header">          
          <h1 className="itinerary-title">{this.props.t("results.itineraryResult.title")}</h1>
          <h4>
            <strong>{this.props.t("commonWords.total")}: </strong>
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
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-8 no-pad-left">
              <div className="row">
                {enabledFilters.map((item, index) =>
                  <div key={index.toString()}>
                    <FlightsFilter
                      filterName={item}
                      itineraryFilters={this.props.itineraryFilters!.find((filter: Filter) => filter.type === item)}
                      sortBy={this.props.resultsDetails.itinerarySortBy}
                      segmentSortBy={this.props.resultsDetails.segmentSortBy}
                      updateItineraryFilter={this.props.updateItineraryFilter}
                      trip={trip}
                      updateActives={this.props.updateActives}
                      segmentIndex={-1}
                      activeSegments={selectedTrip}
                      updateEntireTrip={this.props.updateEntireTrip}
                    />
                  </div>
                )}
              </div>
              <div>
                {this.props.resultsDetails.filterWarning
                  && <Alert severity='error'>There was no combination of flights that fit these filters</Alert>
                }
              </div>
            </div>
            <div className="col-md-4">
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
}

export default withTranslation('common')(ItineraryResult);
