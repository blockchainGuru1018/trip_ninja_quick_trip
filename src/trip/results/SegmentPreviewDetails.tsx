import React from 'react';
import { Segment, FlightResultsDetails } from './ResultsInterfaces';
import FareRulesPreview from './FareRulesPreview';
import FlightResultsPath from './FlightResultsPath';
import FareSelect from './FareSelect';

interface SegmentPreviewDetailsProps {
  segment: Segment;
  flightDetails: Array<FlightResultsDetails>;
  currency: string;
}

class SegmentPreviewDetails extends React.Component<SegmentPreviewDetailsProps> {
  render() {
    return(
      <div className="col-md-12 segment-preview-details-container">
        <FlightResultsPath
          flightDetails={this.props.flightDetails}
        />
        <hr/>
        <FareRulesPreview
          segment={this.props.segment}
          flightDetails={this.props.flightDetails}
          currency={this.props.currency}
        />
        <FareSelect />
      </div>
    );
  }
}

export default SegmentPreviewDetails;