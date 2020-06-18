import React from 'react';
import SegmentNav from './SegmentNav';
import ResultsHeader from './ResultsHeader';
import './SegmentSelection.css';
import FlightIcon from '@material-ui/icons/Flight';
import { ResultsDetails, Results, Segment } from './ResultsInterfaces';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";


interface SegmentSelectionProps {
  resultsDetails: ResultsDetails
  currency: string
}

class SegmentSelection extends React.Component<SegmentSelectionProps> {
  
  render() {
    const trip = this.props.resultsDetails.tripType === 'flexTripResults'
      ? this.props.resultsDetails.flexTripResults! : this.props.resultsDetails.fareStructureResults!;
    const segmentIndex = 0;
    const currentSegments = trip.segments[segmentIndex];
    //const index = this.props.match.params.index;
    return (
      <div id="segment-selection">
        <div className="results-header">
         
          <h1>
            LGW 
            <FlightIcon color="primary" className="rotate-90" fontSize="large"/>
            PAR
          </h1>
        </div>
        <div className="row">
          <div className="col-md-2 no-padding">
            <SegmentNav pathSequence={trip.path_sequence}/>
          </div>
          <div className="col-md-10 segment-list">

          </div>
        </div>
      </div>
    );
  }
}

export default SegmentSelection;
