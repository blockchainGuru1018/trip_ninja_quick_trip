import React from 'react';
import { Segment } from '../trip/results/ResultsInterfaces';
import Moment from 'react-moment';

interface SegmentOriginDestinationProps {
  segment: Segment
  departure?: string
  itineraryDisplay?: boolean
}

class SegmentOriginDestination extends React.Component<SegmentOriginDestinationProps> {
  render() {
    return (
      <div className={(this.props.itineraryDisplay ? ' col-sm-3 no-pad-left' : 'col-sm-2') + ' my-auto'}>
        <p className={'origin-destination flight-preview-grey-border' + (this.props.itineraryDisplay ? ' text-center' : '')} >{this.props.segment.origin}
          <span className="circle-divider">•</span>{this.props.segment.destination} 
        </p>
        {this.props.departure &&
          <p className="text-small flight-preview-grey-border">
            <Moment format="MMM DD">{this.props.departure}</Moment>
          </p>
        }
      </div>
    );
  }

}

export default SegmentOriginDestination;
