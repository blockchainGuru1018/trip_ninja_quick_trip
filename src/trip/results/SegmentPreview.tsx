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
import SegmentPrice from './SegmentPrice';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { updateActives, updateFareFamily, setBrandedFaresInfo } from '../../actions/ResultsActions';
import IncompatibleInfoTooltip from './tooltips/IncompatibleInfoTooltip';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { priceFlights } from '../../actions/PricingActions';
import { AuthDetails } from '../../auth/AuthInterfaces';

interface SegmentPreviewProps {
  index: number;
  segment: Segment;
  segments: Array<Segment>;
  segmentFlightDetails: Array<FlightResultsDetails>;
  segmentSelect: boolean;
  activeSegment?: Segment;
  segmentOptionsIndex?: number;
  currency: string;
  updateActives?: typeof updateActives;
  updateFareFamily?: typeof updateFareFamily;
  priceFlights: typeof priceFlights;
  setBrandedFaresInfo?: typeof setBrandedFaresInfo;
  pathSequence?: Array<string>;
  totalPrice: number;
  authDetails: AuthDetails;
  trip: Results;
}

class SegmentPreview extends React.Component<SegmentPreviewProps> {

  state = {
    expandedSegment: -1
  }

  render() {
    const open = this.state.expandedSegment === this.props.index;
    return(
      <div
        className="row segment-container" key={this.props.index.toString()}>
        {!this.props.segmentSelect && this.setFlightPreviewIcons(this.props.index)}
        <div className={'row ' + (this.props.segmentSelect ? 'col-md-12' : 'col-md-10')}>
          <div className="row segment col-md-12">
            {this.props.segment.status === 'incompatible' && this.props.activeSegment
            && <IncompatibleInfoTooltip key={this.props.index} activeSegment={this.props.activeSegment} segment={this.props.segment} pathSequence={this.props.pathSequence!}/>
            }
            {!this.props.segmentSelect
            && <SegmentOriginDestination segment={this.props.segment} departure={this.props.segmentFlightDetails[0].departure_time} />
            }
            <FlightLogo flights={this.props.segmentFlightDetails} />
            <FlightTime flights={this.props.segmentFlightDetails} />
            <FlightStops flights={this.props.segmentFlightDetails} />
            <FlightTypes segment={this.props.segment} />
            <SegmentBaggage baggage={this.props.segment.baggage.number_of_pieces} />
            {this.props.activeSegment
              ? <SegmentPrice
                totalPrice={this.props.totalPrice}
                segment={this.props.segment}
                currency={this.props.currency}
                activeSegment={this.props.activeSegment}
              />
              : this.props.segmentSelect && <div className="col-sm-2"></div>
            }
            <div className="col-sm-1 icon-expand-preview my-auto">
              <IconButton
                className={'expand-icon' + (open ? ' rotated-180' : '')}
                onClick={(() =>
                  this.state.expandedSegment === this.props.index
                    ? this.setState({expandedSegment: -1})
                    : this.setState({expandedSegment: this.props.index})
                )}
              >
                <ExpandMoreIcon fontSize="large" color="secondary"/>
              </IconButton>
            </div>
          </div>
          <Fade
            in={open}
            style={{display: open ? 'block' : 'none', width: '100%'}}>
            <div>
              { open
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
                priceFlights={this.props.priceFlights}
                activeSegment={this.props.activeSegment}
                authDetails={this.props.authDetails}
                setBrandedFaresInfo={this.props.setBrandedFaresInfo}
                trip={this.props.trip}
              />
              }
            </div>
          </Fade>
        </div>
      </div>
    );
  }

  setFlightPreviewIcons = (index: number) => {
    return(
      <div className='col-md-2 segment-preview-icon-container'>
        {
          index === 0 || index === this.props.segments.length - 1
            ? <FiberManualRecordIcon style={{ fontSize: 30, marginTop: '28px', zIndex: 2 }}/>
            : <RadioButtonUncheckedIcon
              style={
                {marginTop: '28px', zIndex: 2, backgroundColor: 'white'}
              }
            />
        }
        {
          this.props.segments.length === 1
            ? ''
            : index === 0
              ? <div className='segment-preview-dotted-line segment-preview-dotted-line-top'></div>
              : index === this.props.segments.length - 1
                ? <div className='segment-preview-dotted-line segment-preview-dotted-line-bottom'></div>
                : <div className='segment-preview-dotted-line segment-preview-dotted-line-middle'></div>
        }
      </div>
    );
  }

  closeAllDropDowns = () => this.setState({expandedSegment: -1})

}

export default SegmentPreview;