import React from 'react';
import { Segment, FlightResultsDetails } from './ResultsInterfaces';
import FareRulesPreview from './FareRulesPreview';
import FlightResultsPath from './FlightResultsPath';

interface SegmentPreviewDetailsProps {
  segment: Segment;
  flightDetails: Array<FlightResultsDetails>;
}

class SegmentPreviewDetails extends React.Component<SegmentPreviewDetailsProps> {
  render() {
    return(
      <div className="col-md-12 segment-preview-details-container">
        <FlightResultsPath flightDetails={this.props.flightDetails}/>
        <hr/>
        <FareRulesPreview />
      </div>
    );
  }
}

export default SegmentPreviewDetails;