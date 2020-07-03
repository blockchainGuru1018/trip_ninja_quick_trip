import React from 'react';
import { Segment, FlightResultsDetails } from './ResultsInterfaces';
import FareRulesPreview from './FareRulesPreview';
import FlightResultsPath from './FlightResultsPath';
import FareSelect from './FareSelect';
import Button from '@material-ui/core/Button';
import { updateActives, updateFareFamily } from '../../actions/ResultsActions';


interface SegmentPreviewDetailsProps {
  segment: Segment;
  flightDetails: Array<FlightResultsDetails>;
  currency: string;
  segmentSelect: boolean;
  updateActives?: typeof updateActives;
  updateFareFamily?: typeof updateFareFamily;
  segmentOptionsIndex?: number;
  closeAllDropDowns?: () => void;
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
        {!this.props.segmentSelect
        && <FareRulesPreview
          segment={this.props.segment}
          flightDetails={this.props.flightDetails}
          currency={this.props.currency}
        />
        }
        {this.props.segment.brands && this.props.segmentSelect 
        && <FareSelect 
          brands={this.props.segment.brands![segment_id[0]]} 
          currency={this.props.currency} 
          segment={this.props.segment}
          updateFareFamily={this.props.updateFareFamily}
          updateActives={this.updateActives}
        /> 
        }
        {!this.props.segment.brands && this.props.updateActives && this.props.segment.status !== 'active'
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