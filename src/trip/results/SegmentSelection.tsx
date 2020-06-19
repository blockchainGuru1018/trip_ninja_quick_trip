import React from 'react';
import SegmentNav from './SegmentNav';
import ResultsHeader from './ResultsHeader';
import './SegmentSelection.css';
import FlightIcon from '@material-ui/icons/Flight';
import { ResultsDetails, Results, Segment } from './ResultsInterfaces';
import { RouteComponentProps } from "react-router-dom";

interface MatchParams {
  index: string;
}

interface MatchProps extends RouteComponentProps<MatchParams> {
}

interface SegmentSelectionProps {
  resultsDetails: ResultsDetails
  currency: string
}

class SegmentSelection extends React.Component<SegmentSelectionProps & MatchProps> {
  
  render() {
    const trip = this.props.resultsDetails.tripType === 'flexTripResults'
      ? this.props.resultsDetails.flexTripResults! : this.props.resultsDetails.fareStructureResults!;
    const segmentIndex = this.props.match.params.index;
    const currentSegments = trip.segments[segmentIndex];
    const firstSegment = currentSegments[0];
    return (
      <div id="segment-selection">
        <div className="results-header">

          <h1>
            {firstSegment.origin} 
            <FlightIcon color="primary" className="rotate-90" fontSize="large"/>
            {firstSegment.destination}
          </h1>
        </div>
        <div className="row">
          <div className="col-md-2 no-padding">
            <SegmentNav pathSequence={trip.path_sequence} currentIndex={parseInt(segmentIndex)}/>
          </div>
          <div className="col-md-10 segment-list">

          </div>
        </div>
      </div>
    );
  }
}

export default SegmentSelection;
