import React from 'react';
import SegmentNav from './SegmentNav';
import ResultsHeader from './ResultsHeader';
import SegmentPreviews from './SegmentPreviews';
import FlightIcon from '@material-ui/icons/Flight';
import {ResultsDetails, Results, Segment, Filter} from './ResultsInterfaces';
import { RouteComponentProps } from "react-router-dom";
import './Results.css';
import SortOption from "./SortOption";
import { updateSortType } from "../../actions/ResultsActions";
import { currencySymbol } from '../../helpers/CurrencySymbolHelper';
import { updateActives, updateFareFamily, updateSegmentFilter, getTravelportBrands, setResultsLoading } from '../../actions/ResultsActions';
import { getTotal } from '../../helpers/MiscHelpers';
import FlightsFilter from "./filters/FlightsFilter";
import { filterSegments } from "../../helpers/Filters";
import { withTranslation, WithTranslation } from 'react-i18next';
import RecalculatingFaresIndicator from "./RecalculatingFaresIndicator";

interface MatchParams{
  index: string;
}

interface MatchProps extends RouteComponentProps<MatchParams> {
}

interface SegmentSelectionProps extends WithTranslation {
  resultsDetails: ResultsDetails
  currency: string;
  updateActives: typeof updateActives;
  updateFareFamily: typeof updateFareFamily;
  updateSegmentFilter: typeof updateSegmentFilter;
  updateSortType: typeof updateSortType;
  getTravelportBrands: typeof getTravelportBrands;
  setResultsLoading: typeof setResultsLoading;
}

class SegmentSelection extends React.Component<SegmentSelectionProps & MatchProps> {

  componentDidMount() {
    this.props.setResultsLoading(false);
  }


  render() {
    const trip = this.props.resultsDetails.tripType === 'flexTripResults'
      ? this.props.resultsDetails.flexTripResults! : this.props.resultsDetails.fareStructureResults!;
    const segmentIndex = this.props.match.params.index;
    const currentSegments: Array<Segment> = filterSegments(trip.segments[segmentIndex], this.props.resultsDetails.segmentFilters![segmentIndex], true);
    const compatibleSegments: Array<Segment> = currentSegments.filter((segment: Segment) => segment.status === 'compatible');
    const filteredCompatibleSegments: Array<Segment> = compatibleSegments.filter((segment: Segment) => !segment.filtered);
    const incompatibleSegments: Array<Segment> = currentSegments.filter((segment: Segment) => segment.status === 'incompatible');
    const filteredIncompatibleSegments: Array<Segment> = incompatibleSegments.filter((segment: Segment) => !segment.filtered);
    const selectedTrip: Array<Segment> = this.getActiveSegments(trip);
    const selectedSegment: Array<Segment> = [selectedTrip[segmentIndex]];
    const markup = trip.markup > 0 ? trip.markup : getTotal(selectedTrip, 'itinerary_markup');
    const totalPrice: number = getTotal(selectedTrip, 'price') + markup;

    const enabledFilters = ['baggage','noOfStops','alliance', 'refundability'];

    return (
      <div id="segment-selection">
        <ResultsHeader 
          segments={selectedTrip} 
          pathSequence={trip.path_sequence}
          flights={trip.flight_details}
          flexTripResults={false}
        />
        <div className="results-section-header sticky-top">
          <h1>
            {trip.path_sequence[segmentIndex].substring(0, 3)}
            <FlightIcon color="primary" className="rotate-90 segment-icon" fontSize="large"/>
            {trip.path_sequence[segmentIndex].substring(4)}
          </h1>
          <h4 id="itinerary-total">
            <strong>{this.props.t("commonWords.total")}: </strong>
            {currencySymbol(this.props.currency)}{Math.round(totalPrice)}
          </h4>
          <SortOption
            segmentPosition={parseInt(segmentIndex)}
            sortBy={this.props.resultsDetails.segmentSortBy[parseInt(segmentIndex)]}
            updateSortType={this.props.updateSortType}
          />
          <div className="row">
            <div className="col-md-8 no-pad-left">
              <div className='row'>
                {enabledFilters.map((item, index) =>
                  <div key={index.toString()}>
                    <FlightsFilter
                      filterName={item}
                      segmentFilters={this.props.resultsDetails.segmentFilters![segmentIndex].find(
                        (filter: Filter) => filter.type === item)}
                      updateSegmentFilter={this.props.updateSegmentFilter}
                      trip={trip}
                      updateActives={this.props.updateActives}
                      segmentIndex={Number(segmentIndex)}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-4">
              <div className="row">
                <div className='offset-6 col-md-6'>
                  <RecalculatingFaresIndicator
                    loading={this.props.resultsDetails.loadingResults}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2 no-padding">
            <SegmentNav
              pathSequence={trip.path_sequence}
              currentIndex={parseInt(segmentIndex)}
              setResultsLoading={this.props.setResultsLoading}/>
          </div>
          <div className="col-md-10 select-segment-list">
            <div className="row">
              <div className="col-xl">
                <div className="row">
                  <div className="col-xl">
                    <h5>{this.props.t("results.segmentSelection.selectedFlight")}</h5>
                  </div>
                </div>
                <SegmentPreviews
                  orderByPnr={false}
                  totalPrice={totalPrice}
                  segmentOptionsIndex={parseInt(segmentIndex)}
                  segments={selectedSegment}
                  flightDetails={trip.flight_details}
                  currency={this.props.currency}
                  segmentSelect={true}
                  updateActives={this.props.updateActives}
                  activeSegment={selectedSegment[0]}
                  updateFareFamily={this.props.updateFareFamily}
                  getTravelportBrands={this.props.getTravelportBrands}
                  trip={trip}
                />
                <div className="row">
                  <div className="col-xl">
                    <hr className="segment-divider"/>
                  </div>
                </div>
                {
                  compatibleSegments.length > 0 &&
                  filteredCompatibleSegments.length > 0 &&
                  <div>
                    <SegmentPreviews
                      orderByPnr={false}
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
                      getTravelportBrands={this.props.getTravelportBrands}
                      trip={trip}
                    />
                    <div className="row">
                      <div className="col-xl">
                        <hr className="segment-divider"/>
                      </div>
                    </div>
                  </div>
                }
                {
                  incompatibleSegments.length > 0 &&
                  filteredIncompatibleSegments &&
                  <div>
                    <div className="row">
                      <div className="col-xl">
                        <h5>{this.props.t("results.segmentSelection.otherOptions")}</h5>
                        <p>{this.props.t("results.segmentSelection.otherOptionsWarning")}</p>
                      </div>
                    </div>
                    <SegmentPreviews
                      orderByPnr={false}
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

export default withTranslation('common')(SegmentSelection);
