import React from 'react';
import { Segment, FlightResultsDetails, Results } from './ResultsInterfaces';
import SegmentPreviewDetails from './SegmentPreviewDetails';
import IconButton from '@material-ui/core/IconButton';
import Fade from '@material-ui/core/Fade';
import FlightLogo from '../../common/FlightLogo';
import FlightTime from '../../common/FlightTime';
import SegmentBaggage from '../../common/SegmentBaggage';
import FlightStops from '../../common/FlightStops';
import FlightTypes from '../../common/FlightTypes';
import SegmentOriginDestination from '../../common/SegmentOriginDestination';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { updateActives, updateFareFamily, getTravelportBrands } from '../../actions/ResultsActions';
import viExpandedIcon from '../../assets/images/vi_expanded_icon.svg';
import {firstLetterCapital} from "../../helpers/MiscHelpers";


interface VirtualInterlineSegmentProps {
  index: number;
  segment: Segment;
  segmentFlightDetails: Array<FlightResultsDetails>;
  segmentSelect: boolean;
  activeSegment?: Segment;
  segmentOptionsIndex?: number;
  currency: string;
  updateActives?: typeof updateActives;
  updateFareFamily?: typeof updateFareFamily;
  getTravelportBrands?: typeof getTravelportBrands;
  totalPrice: number;
  trip: Results;
}

class VirtualInterlineSegment extends React.Component<VirtualInterlineSegmentProps> {

  state = {
    expandedSegment: -1
  }

  render() {
    const openVI = this.state.expandedSegment === this.props.index;

    return(
      <div>        
        <div className="row">
          <div className="col-xl-auto no-pad-left my-auto">
            <img src={viExpandedIcon} alt="vi-segment-icon" className="vi-segment-icon" />
          </div>
          <div className="col no-pad-right">
            <div className="row segment">
              {!this.props.segmentSelect
              && <SegmentOriginDestination segment={this.props.segment} departure={this.props.segmentFlightDetails[0].departure_time} />
              }
              <FlightLogo flights={this.props.segmentFlightDetails} />
              <FlightTime flights={this.props.segmentFlightDetails} />
              <FlightStops flights={this.props.segmentFlightDetails} viParent={false}/>
              <FlightTypes segment={this.props.segment} />
              <SegmentBaggage baggage={this.props.segment.baggage.number_of_pieces} />
              <div className='col-sm-2 my-auto'>
                <p className='text-small text-center'>{firstLetterCapital(this.props.segment.source)} - {this.props.segment.credential_info.pcc}</p>
              </div>
              <div className='col-sm-1 icon-expand-preview my-auto'>
                <IconButton
                  className={'expand-icon' + (openVI ? ' rotated-180' : '')}
                  onClick={(() => {
                    this.state.expandedSegment === this.props.index
                      ? this.setState({expandedSegment: -1})
                      : this.setState({expandedSegment: this.props.index});
                  }
                  )}
                >
                  <ExpandMoreIcon fontSize="large" style={{ color: 'var(--tertiary)' }}/>
                </IconButton>
              </div>
            </div>
            <Fade
              in={openVI}
              style={{display: openVI ? 'block' : 'none', width: '100%'}}>
              <div>
                { openVI
                && <SegmentPreviewDetails
                  segmentOptionsIndex={this.props.segmentOptionsIndex}
                  segment={this.props.segment}
                  flightDetails={this.props.segmentFlightDetails}
                  currency={this.props.currency}
                  segmentSelect={this.props.segmentSelect}
                  updateActives={this.props.updateActives}
                  closeAllDropDowns={this.closeAllDropDowns}
                  updateFareFamily={this.props.updateFareFamily}
                  totalPrice={this.props.totalPrice}
                  activeSegment={this.props.activeSegment}
                  getTravelportBrands={this.props.getTravelportBrands}
                  trip={this.props.trip}
                  viParent={false}
                />
                }
              </div>
            </Fade>
          </div>
        </div>
      </div>
    );
  }

  closeAllDropDowns = () => this.setState({expandedSegment: -1})

}

export default VirtualInterlineSegment;
