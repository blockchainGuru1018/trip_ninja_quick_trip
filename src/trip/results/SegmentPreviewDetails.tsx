import React from 'react';
import { Segment, FlightResultsDetails } from './ResultsInterfaces';
import FareRulesPreview from './FareRulesPreview';
import FlightResultsPath from './FlightResultsPath';
import Button from '@material-ui/core/Button';
import { updateActives } from '../../actions/ResultsActions';

interface SegmentPreviewDetailsProps {
  segment: Segment;
  flightDetails: Array<FlightResultsDetails>;
  currency: string;
  updateActives?: typeof updateActives;
  segmentOptionsIndex?: number;
  closeAllDropDowns?: () => void;
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
        {this.props.updateActives && this.props.segment.status !== 'active'
          ? <div className='btn-segment-selection-container'>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() =>
                this.updateActives()
              } >
              Select segment
            </Button>
          </div>
          : ''
        }
      </div>
    );
  }

  updateActives = () => {
    this.props.updateActives!(this.props.segmentOptionsIndex!, this.props.segment.itinerary_id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.props.closeAllDropDowns!();
  }
}

export default SegmentPreviewDetails;