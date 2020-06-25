import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Segment, FlightResultsDetails } from './ResultsInterfaces';
import '../../index.css';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import SegmentPreviewDetails from './SegmentPreviewDetails';
import IconButton from '@material-ui/core/IconButton';
import Fade from '@material-ui/core/Fade';
import FlightLogo from './FlightLogo';
import FlightTime from './FlightTime';
import SegmentBaggage from './SegmentBaggage';
import FlightStops from './FlightStops';
import FlightTypes from './FlightTypes';
import SegmentOriginDestination from './SegmentOriginDestination';
import SegmentPrice from './SegmentPrice';
import { updateActives } from '../../actions/ResultsActions';


interface SegmentPreviewProps {
  segments: Array<Segment>;
  flightDetails: Array<FlightResultsDetails>;
  currency: string;
  segmentSelect: boolean;
  updateActives?: typeof updateActives;
  segmentOptionsIndex?: number
}

class SegmentPreview extends React.Component<SegmentPreviewProps> {

  state = {
    expandedSegment: -1
  }

  render() {
    return (
      <div>
        {this.setSegmentsHTML()}
      </div>
    );
  }

  getFlightDetailsBySegment = (segment: Segment): Array<FlightResultsDetails> =>
    segment.flights.map((flight: any) => {
      const filteredFlightDetails = this.props.flightDetails.filter(
        (flightDetails: FlightResultsDetails) =>
          flight.flight_detail_ref === flightDetails.reference
      );
      return filteredFlightDetails[0];
    });

  setSegmentsHTML = () => {
    return this.props.segments.map((segment: Segment, index: number) => {
      const segmentFlightDetails: Array<FlightResultsDetails> = this.getFlightDetailsBySegment(segment);
      const open: boolean = this.state.expandedSegment === index;
      return(
        <div className="row segment-container" key={index.toString()}>
          {!this.props.segmentSelect && this.setFlightPreviewIcons(index)}
          <div className={'row ' + (this.props.segmentSelect ? 'col-md-12' : 'col-md-10')}>
            <div className="row segment col-md-12">
              {!this.props.segmentSelect
              && <SegmentOriginDestination segment={segment} departure={segmentFlightDetails[0].departure_time} />
              }
              <FlightLogo flights={segmentFlightDetails} />
              <FlightTime flights={segmentFlightDetails} />
              <FlightStops flights={segmentFlightDetails} />
              <FlightTypes segment={segment} />
              <SegmentBaggage baggage={segment.baggage.number_of_pieces} />
              {this.props.segmentSelect
              && <SegmentPrice segment={segment} currency={this.props.currency} />
              }
              <div className="col-sm-1 icon-expand-preview">
                <IconButton
                  className={'expand-icon' + (open ? ' rotated-180' : '')}
                  onClick={(() =>
                    this.state.expandedSegment === index
                      ? this.setState({expandedSegment: -1})
                      : this.setState({expandedSegment: index})
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
                <SegmentPreviewDetails
                  segmentOptionsIndex={this.props.segmentOptionsIndex}
                  segment={segment}
                  flightDetails={segmentFlightDetails}
                  currency={this.props.currency}
                  updateActives={this.props.updateActives}
                  closeAllDropDowns={this.closeAllDropDowns}
                />
              </div>
            </Fade>
          </div>
        </div>
      );
    });
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
