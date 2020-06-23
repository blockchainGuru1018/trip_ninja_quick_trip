import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Segment, FlightResultsDetails, FlightResult } from './ResultsInterfaces';
import '../../index.css';
import iataAirports from '../../assets/data/iataAirports.json';
import { getTimeDifference } from '../../helpers/DateHelpers';
import moment from 'moment';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import SegmentPreviewDetails from './SegmentPreviewDetails';
import IconButton from '@material-ui/core/IconButton';
import Fade from '@material-ui/core/Fade';
import Moment from 'react-moment';
import FlightLogo from './FlightLogo';
import FlightTime from './FlightTime';
import FlightBaggage from './FlightBaggage';

interface SegmentPreviewProps {
  segments: Array<Segment>;
  flightDetails: Array<FlightResultsDetails>;
  currency: string;
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
        <div className='row segment-preview-container' key={index.toString()}>
          {this.setFlightPreviewIcons(index)}
          <div className="row col-md-10">
            <div className="row segment-preview col-md-12">
              <div className="col-sm-2 preview-flight-path-container">
                <p className="origin-destination flight-preview-grey-border">{segment.origin}
                  <span className="circle-divider">•</span>{segment.destination}
                </p>
                <p className="text-small flight-preview-grey-border">
                  <Moment format="MMM DD">{segmentFlightDetails[0].departure_time}</Moment>
                </p>
              </div>
              <FlightLogo flights={segmentFlightDetails} />
              <FlightTime flights={segmentFlightDetails} />
              <FlightStops flights={segmentFlightDetails} />
              <FlightTypes segment={segment} />
              {this.setSegmentTypesHTML(segment)}
              <FlightBaggage baggage={segment.baggage.number_of_pieces}/>
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
                  segment={segment}
                  flightDetails={segmentFlightDetails}
                  currency={this.props.currency}/>
              </div>
            </Fade>
          </div>
        </div>
      );
    });
  }

  getFlightTypes = (flightResults: Array<FlightResult>) =>
    flightResults.reduce((total: string, flightResult: FlightResult, index: number) => {
      total += flightResult.booking_code;
      if (index !== flightResults.length - 1) {
        total += ', ';
      } else {
        return total += ' Class';
      }
      return total;
    }, '')

  setSegmentTypesHTML = (segment: Segment) => {
    return (
      <div className="col-sm-2">
        <p className="text-bold">{segment.fare_type}</p>
        <p className="text-small">{this.getFlightTypes(segment.flights)}</p>
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
          index === 0
            ? <div className='segment-preview-dotted-line segment-preview-dotted-line-top'></div>
            : index === this.props.segments.length - 1
              ? <div className='segment-preview-dotted-line segment-preview-dotted-line-bottom'></div>
              : <div className='segment-preview-dotted-line segment-preview-dotted-line-middle'></div>
        }
      </div>
    );
  }
}

export default SegmentPreview;
