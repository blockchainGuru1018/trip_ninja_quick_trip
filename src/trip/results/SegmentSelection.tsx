import React from 'react';
import SegmentNav from './SegmentNav';
import ResultsHeader from './ResultsHeader';
import SegmentPreviews from './SegmentPreviews';
import FlightIcon from '@material-ui/icons/Flight';
import { ResultsDetails, Results, Segment } from './ResultsInterfaces';
import { RouteComponentProps } from "react-router-dom";
import './Results.css';
import SortOption from "./SortOption";
import { updateSortType } from "../../actions/ResultsActions";
import { currencySymbol } from '../../helpers/CurrencySymbolHelper';
import { updateActives, updateFareFamily, updateSegmentFilter, getTravelportBrands } from '../../actions/ResultsActions';
import { getTotal } from '../../helpers/MiscHelpers';
import BaggageFilter from "./filters/BaggageFilter";
import NumberOfStopsFilter from './filters/NumberOfStopsFilter';
import AllianceFilter from './filters/AllianceFilter';
import { filterSegments } from "../../helpers/Filters";
import { AuthDetails } from '../../auth/AuthInterfaces';

interface MatchParams {
  index: string;
}

interface MatchProps extends RouteComponentProps<MatchParams> {
}

interface SegmentSelectionProps {
  resultsDetails: ResultsDetails
  currency: string;
  updateActives: typeof updateActives;
  updateFareFamily: typeof updateFareFamily;
  updateSegmentFilter: typeof updateSegmentFilter;
  updateSortType: typeof updateSortType;
  getTravelportBrands: typeof getTravelportBrands;
  authDetails: AuthDetails;
}

class SegmentSelection extends React.Component<SegmentSelectionProps & MatchProps> {

  render() {
    const trip = this.props.resultsDetails.tripType === 'flexTripResults'
      ? this.props.resultsDetails.flexTripResults! : this.props.resultsDetails.fareStructureResults!;
    const segmentIndex = this.props.match.params.index;
    const currentSegments: Array<Segment> = filterSegments(trip.segments[segmentIndex], this.props.resultsDetails.segmentFilters![segmentIndex]);
    const compatibleSegments: Array<Segment> = currentSegments.filter((segment: Segment) => segment.status === 'compatible');
    const incompatibleSegments: Array<Segment> = currentSegments.filter((segment: Segment) => segment.status === 'incompatible');
    const selectedTrip: Array<Segment> = this.getActiveSegments(trip);
    const selectedSegment: Array<Segment> = [selectedTrip[segmentIndex]];
    const totalPrice: number = getTotal(selectedTrip, 'price');

    return (
      <div id="segment-selection">
        <div className="results-header">
          <ResultsHeader 
            segments={selectedTrip} 
            pathSequence={trip.path_sequence}
            flights={trip.flight_details}
          />
          <h1>
            {trip.path_sequence[segmentIndex].substring(0, 3)}
            <FlightIcon color="primary" className="rotate-90 segment-icon" fontSize="large"/>
            {trip.path_sequence[segmentIndex].substring(4)}
          </h1>
          <h4 id="itinerary-total">
            <strong>Total: </strong>
            {currencySymbol(this.props.currency)}{Math.round(totalPrice)}
          </h4>
          <SortOption
            segmentPosition={parseInt(segmentIndex)}
            sortBy={this.props.resultsDetails.segmentSortBy[parseInt(segmentIndex)]}
            updateSortType={this.props.updateSortType}
          />
          <div className='baggage-filter-container'>
            <BaggageFilter
              updateSegmentFilter={this.props.updateSegmentFilter}
              segmentFilters={this.props.resultsDetails.segmentFilters![segmentIndex]}
              trip={trip}
              updateActives={this.props.updateActives}
              segmentIndex={Number(segmentIndex)}
            />
            <NumberOfStopsFilter
              updateSegmentFilter={this.props.updateSegmentFilter}
              segmentFilters={this.props.resultsDetails.segmentFilters![segmentIndex]}
              trip={trip}
              updateActives={this.props.updateActives}
              segmentIndex={Number(segmentIndex)}
            />
            <AllianceFilter
              updateSegmentFilter={this.props.updateSegmentFilter}
              segmentFilters={this.props.resultsDetails.segmentFilters![segmentIndex]}
              trip={trip}
              updateActives={this.props.updateActives}
              segmentIndex={Number(segmentIndex)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-2 no-padding">
            <SegmentNav pathSequence={trip.path_sequence} currentIndex={parseInt(segmentIndex)} />
          </div>
          <div className="col-md-10 select-segment-list">
            <div className="row">
              <div className="col-lg-10 offset-lg-1">
                <h5>Selected Flight</h5>
                <SegmentPreviews
                  totalPrice={totalPrice}
                  segmentOptionsIndex={parseInt(segmentIndex)}
                  segments={selectedSegment}
                  flightDetails={trip.flight_details}
                  currency={this.props.currency}
                  segmentSelect={true}
                  updateActives={this.props.updateActives}
                  activeSegment={selectedSegment[0]}
                  updateFareFamily={this.props.updateFareFamily}
                  authDetails={this.props.authDetails}
                  getTravelportBrands={this.props.getTravelportBrands}
                  trip={trip}
                />
                <hr className="segment-divider"/>
                {
                  compatibleSegments.length > 0
                    ? <div>
                      <h5>Other Departure Times</h5>
                      <SegmentPreviews
                        totalPrice={totalPrice}
                        segmentOptionsIndex={parseInt(segmentIndex)}
                        segments={compatibleSegments}
                        flightDetails={trip.flight_details}
                        currency={this.props.currency}
                        segmentSelect={true}
                        updateActives={this.props.updateActives}
                        updateFareFamily={this.props.updateFareFamily}
                        activeSegment={selectedSegment[0]}
                        sortOrder={this.props.resultsDetails.segmentSortBy[segmentIndex]}
                        authDetails={this.props.authDetails}
                        getTravelportBrands={this.props.getTravelportBrands}
                        trip={trip}
                      />
                      <hr className="segment-divider"/>
                    </div>
                    : ''
                }
                {
                  incompatibleSegments.length > 0 &&
                    <div>
                      <h5>Other Options</h5>
                      <p>
                        Changing these flights may impact other linked segments. To see which segments will be affected, hover over the flight number.
                      </p>
                      <SegmentPreviews
                        totalPrice={totalPrice}
                        segmentOptionsIndex={parseInt(segmentIndex)}
                        segments={incompatibleSegments}
                        flightDetails={trip.flight_details}
                        currency={this.props.currency}
                        segmentSelect={true}
                        updateActives={this.props.updateActives}
                        updateFareFamily={this.props.updateFareFamily}
                        resultsDetails={this.props.resultsDetails}
                        pathSequence={trip.path_sequence}
                        activeSegment={selectedSegment[0]}
                        sortOrder={this.props.resultsDetails.segmentSortBy[segmentIndex]}
                        authDetails={this.props.authDetails}
                        getTravelportBrands={this.props.getTravelportBrands}
                        trip={trip}
                      />
                    </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  getActiveSegments = (trip: Results) => {
    return trip.segments.map((segments: Array<Segment>) =>
      segments.find((object: Segment) => object.status === 'active') || segments[0]
    );
  }

}

export default SegmentSelection;
