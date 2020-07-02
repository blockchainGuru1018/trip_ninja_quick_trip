import React from 'react';
import SegmentNav from './SegmentNav';
import ResultsHeader from './ResultsHeader';
import SegmentPreview from './SegmentPreview';
import FlightIcon from '@material-ui/icons/Flight';
import { ResultsDetails, Results, Segment } from './ResultsInterfaces';
import { RouteComponentProps } from "react-router-dom";
import './Results.css';
import { updateActives } from '../../actions/ResultsActions';

interface MatchParams {
  index: string;
}

interface MatchProps extends RouteComponentProps<MatchParams> {
}

interface SegmentSelectionProps {
  resultsDetails: ResultsDetails
  currency: string;
  updateActives: typeof updateActives
}

class SegmentSelection extends React.Component<SegmentSelectionProps & MatchProps> {

  render() {
    const trip = this.props.resultsDetails.tripType === 'flexTripResults'
      ? this.props.resultsDetails.flexTripResults! : this.props.resultsDetails.fareStructureResults!;
    const segmentIndex = this.props.match.params.index;
    const currentSegments: Array<Segment> = trip.segments[segmentIndex];
    const compatibleSegments: Array<Segment> = currentSegments.filter((segment: Segment) => segment.status === 'compatible');
    const incompatibleSegments: Array<Segment> = currentSegments.filter((segment: Segment) => segment.status === 'incompatible');
    const selectedTrip: Array<Segment> = this.getActiveSegments(trip);
    const selectedSegment: Array<Segment> = [selectedTrip[segmentIndex]];

    return (
      <div id="segment-selection">
        <div className="results-header">
          <ResultsHeader segments={selectedTrip} flights={trip.flight_details}/>
          <h1>
            {trip.path_sequence[segmentIndex].substring(0, 3)}
            <FlightIcon color="primary" className="rotate-90 segment-icon" fontSize="large"/>
            {trip.path_sequence[segmentIndex].substring(4)}
          </h1>
        </div>
        <div className="row">
          <div className="col-md-2 no-padding">
            <SegmentNav pathSequence={trip.path_sequence} currentIndex={parseInt(segmentIndex)} />
          </div>
          <div className="col-md-10 select-segment-list">
            <div className="row">
              <div className="col-lg-10 offset-lg-1">
                <h5>Selected Flight</h5>
                <SegmentPreview
                  segmentOptionsIndex={parseInt(segmentIndex)}
                  segments={selectedSegment}
                  flightDetails={trip.flight_details}
                  currency={this.props.currency}
                  segmentSelect={true}
                  updateActives={this.props.updateActives}
                />
                <hr className="segment-divider"/>
                {
                  compatibleSegments.length > 0
                    ? <div>
                      <h5>Other Departure Times</h5>
                      <SegmentPreview
                        segmentOptionsIndex={parseInt(segmentIndex)}
                        segments={compatibleSegments}
                        flightDetails={trip.flight_details}
                        currency={this.props.currency}
                        segmentSelect={true}
                        updateActives={this.props.updateActives}
                        activeSegment={selectedSegment[0]}
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
                      <SegmentPreview
                        segmentOptionsIndex={parseInt(segmentIndex)}
                        segments={incompatibleSegments}
                        flightDetails={trip.flight_details}
                        currency={this.props.currency}
                        segmentSelect={true}
                        updateActives={this.props.updateActives}
                        resultsDetails={this.props.resultsDetails}
                        activeSegment={selectedSegment[0]}
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
