import React from 'react';
import { Segment, FlightResultsDetails } from './ResultsInterfaces';
import Moment from 'react-moment';

interface SegmentOriginDestinationProps {
  segment: Segment
  departure: string
}

class SegmentOriginDestination extends React.Component<SegmentOriginDestinationProps> {
  render() {
    return (
      <div className="col-sm-2 preview-flight-path-container">
        <p className="origin-destination flight-preview-grey-border">{this.props.segment.origin}
          <span className="circle-divider">•</span>{this.props.segment.destination}
        </p>
        <p className="text-small flight-preview-grey-border">
          <Moment format="MMM DD">{this.props.departure}</Moment>
        </p>
      </div>
    );
  }

}

export default SegmentOriginDestination;