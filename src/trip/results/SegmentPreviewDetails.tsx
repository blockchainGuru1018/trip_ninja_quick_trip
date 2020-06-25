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
    const brands = this.props.segment.brands ? this.props.segment.brands : {};
    const segment_id = Object.keys(brands);
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
        { this.props.segment.brands 
        && <FareSelect brands={this.props.segment.brands![segment_id[0]]} currency={this.props.currency} /> 
        }
      </div>
    );
  }
}

export default SegmentPreviewDetails;