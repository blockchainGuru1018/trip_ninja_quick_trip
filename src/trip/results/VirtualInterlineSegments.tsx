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
import SelfTransferLabel from '../../common/SelfTransferLabel';
import SegmentOriginDestination from '../../common/SegmentOriginDestination';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { updateActives, updateFareFamily, getTravelportBrands } from '../../actions/ResultsActions';
import expandedIcon from '../../assets/images/expanded_icon.svg';


interface VirtualInterlineSegmentsProps {
  index: number;
  segment: Segment;
  segments: Array<Segment>;
  viLinkedSegment?: Segment;
  segmentFlightDetails: Array<FlightResultsDetails>;
  viLinkedSegmentFlightDetails?: Array<FlightResultsDetails>;
  segmentSelect: boolean;
  activeSegment?: Segment;
  segmentOptionsIndex?: number;
  currency: string;
  updateActives?: typeof updateActives;
  updateFareFamily?: typeof updateFareFamily;
  getTravelportBrands?: typeof getTravelportBrands;
  pathSequence?: Array<string>;
  totalPrice: number;
  trip: Results;
}

class VirtualInterlineSegments extends React.Component<VirtualInterlineSegmentsProps> {

  state = {
    expandedSegment: -1
  }

  render() {
    const openViPosition0 = this.state.expandedSegment === 0;
    const openViPosition1 = this.state.expandedSegment === 1;
    let flightDetails = this.props.segmentFlightDetails.concat(this.props.viLinkedSegmentFlightDetails && this.props.segment.virtual_interline ? this.props.viLinkedSegmentFlightDetails : []);

    return(
      <div>        
        <div className="vi-segment-container">
          <div className="row">
            <div className="col-xl-1 my-auto">
              <img src={expandedIcon} alt="vi-segment-icon" className="vi-segment-icon" />
            </div>
            <div className="col-xl-11">
              <div className="row segment">
                {!this.props.segmentSelect
                && <SegmentOriginDestination segment={this.props.segment} departure={this.props.segmentFlightDetails[0].departure_time} />
                }
                <FlightLogo flights={this.props.segmentFlightDetails} />
                <FlightTime flights={this.props.segmentFlightDetails} />
                <FlightStops flights={this.props.segmentFlightDetails} viParent={false}/>
                <FlightTypes segment={this.props.segment} />
                <SegmentBaggage baggage={this.props.segment.baggage.number_of_pieces} />
                <div className="col-sm-1 offset-sm-2 icon-expand-preview my-auto">
                  <IconButton
                    className={'expand-icon' + (openViPosition0 ? ' rotated-180' : '')}
                    onClick={(() =>
                      this.state.expandedSegment === 0
                        ? this.setState({expandedSegment: -1})
                        : this.setState({expandedSegment: 0})
                    )}
                  >
                    <ExpandMoreIcon fontSize="large" style={{ color: 'var(--tertiary)' }}/>
                  </IconButton>
                </div>
              </div>
              <Fade
                in={openViPosition0}
                style={{display: openViPosition0 ? 'block' : 'none', width: '100%'}}>
                <div>
                  { openViPosition0
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
          <SelfTransferLabel 
            destinationName={this.props.segment.destination_name}
            flights={flightDetails}
          />
          { this.props.viLinkedSegment && this.props.viLinkedSegmentFlightDetails &&
            <div className="row">
              <div className="col-xl-1 my-auto">
                <img src={expandedIcon} alt="vi-segment-icon" className="vi-segment-icon" />
              </div>
              <div className="col-xl-11">
                <div className="row segment">
                  {!this.props.segmentSelect
                  && <SegmentOriginDestination segment={this.props.viLinkedSegment} departure={this.props.viLinkedSegmentFlightDetails[0].departure_time} />
                  }
                  <FlightLogo flights={this.props.viLinkedSegmentFlightDetails} />
                  <FlightTime flights={this.props.viLinkedSegmentFlightDetails} />
                  <FlightStops flights={this.props.viLinkedSegmentFlightDetails} viParent={false} />
                  <FlightTypes segment={this.props.viLinkedSegment} />
                  <SegmentBaggage baggage={this.props.viLinkedSegment.baggage.number_of_pieces} />
                  <div className="col-sm-1 offset-sm-2 icon-expand-preview my-auto">
                    <IconButton
                      className={'expand-icon' + (openViPosition1 ? ' rotated-180' : '')}
                      onClick={(() =>
                        this.state.expandedSegment === 1
                          ? this.setState({expandedSegment: -1})
                          : this.setState({expandedSegment: 1})
                      )}
                    >
                      <ExpandMoreIcon fontSize="large" style={{ color: 'var(--tertiary)' }}/>
                    </IconButton>
                  </div>
                </div>
                <Fade
                  in={openViPosition1}
                  style={{display: openViPosition1 ? 'block' : 'none', width: '100%'}}>
                  <div>
                    { openViPosition1
                    && <SegmentPreviewDetails
                      segmentOptionsIndex={this.props.segmentOptionsIndex}
                      segment={this.props.viLinkedSegment}
                      flightDetails={this.props.viLinkedSegmentFlightDetails}
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
          }
        </div>
      </div>
    );
  }

  closeAllDropDowns = () => this.setState({expandedSegment: -1})

}

export default VirtualInterlineSegments;
