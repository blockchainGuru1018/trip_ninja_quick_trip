import React from 'react';
import SegmentNav from './SegmentNav';
import ResultsHeader from './ResultsHeader';
import './SegmentSelection.css';
import FlightIcon from '@material-ui/icons/Flight';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";


interface SegmentSelectionProps {

}

class SegmentSelection extends React.Component<SegmentSelectionProps> {

  render() {
    let index = this.props;
    console.log(index);
    return (
      <div className="row" id="segment-selection">
        <div className="itinerary-header">
          <ResultsHeader segments={selectedTrip} flights={trip.flight_details}/>
          <h1>
            LGW
            <FlightIcon color="primary" className="rotate-90"/>
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
