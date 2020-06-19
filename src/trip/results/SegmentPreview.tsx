import React from 'react';
import CardTravelIcon from '@material-ui/icons/CardTravel';
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

  setFlightLogoHTML = (flights: Array<FlightResultsDetails>) =>
    (
      <div className="col-sm-2 airline-logo-container">
        <div>
          <img
            className='img-airline-logo '
            src={"https://s3-us-west-2.amazonaws.com/tn-airline-logos/" + flights[0].carrier + "_24x24.png"}
            alt='flight-logo'
            onError={(e: any) => {
              e.target.onerror = null;
              e.target.src='https://s3-us-west-2.amazonaws.com/tn-airline-logos/airplane_24x24.png';
            }}
          ></img>
        </div>
        <div>
          {
            flights.map((flight: FlightResultsDetails, index: number) =>
              <div key={'carrier-label-' + index} className="text-bold">{flight.carrier} {flight.flight_number}</div>
            )
          }
          {
            flights.length > 1
              ? <div className="text-small">{"Multiple Airlines"}</div>
              : <div className="text-small">{iataAirports[flights[0].carrier]}</div>
          }
        </div>
      </div>
    );

  setStopsHTML = (segment: Segment, flights: Array<FlightResultsDetails>) => {
    return (
      <div className="col-sm-2">
        {
          flights.length > 1
            ? <div className="text-bold">{flights.length - 1} Stop{flights.length > 2 ? "s" : ""}, self transfer</div>
            : <p className="text-bold">Direct</p>
        }
        {
          flights.length > 1
            ? this.calculateHoursBetween(flights).map((stopOver: any, index: number) =>
              <div key={"stop-over-times-" + index} className='text-small'>
                {Object.keys(stopOver)[0] + ": " + Object.values(stopOver)[0]}
              </div>
            )
            : ''
        }
      </div>
    );
  }

  calculateHoursBetween = (flights: Array<FlightResultsDetails>) => {
    let stopOverTimeDetails: Array<any> = [];
    let _ = flights.map((flight: FlightResultsDetails, index: number) => {
      if(index === flights.length - 1) {
        return '';
      }
      else {
        const stopOverTime = getTimeDifference(
          new Date(flight.arrival_time), new Date(flights[index + 1].departure_time)
        );
        stopOverTimeDetails.push({[flight.destination]: stopOverTime});
      }
    });
    return stopOverTimeDetails;
  }

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
                  {moment(segmentFlightDetails[0].departure_time).format('MMM DD')}</p>
              </div>
              {this.setFlightLogoHTML(segmentFlightDetails)}
              {this.setFlightTimeHTML(segmentFlightDetails)}
              {this.setStopsHTML(segment, segmentFlightDetails)}
              {this.setSegmentTypesHTML(segment)}
              <div className="col-sm-1 baggage-icon-container">
                <CardTravelIcon
                  color="primary"
                  fontSize="large"
                  className='card-travel-icon'
                />
                <div className='baggage-amount-text'>
                  {segment.baggage.number_of_pieces}{segment.baggage.number_of_pieces === 1 ? 'pcs' : 'pc'}
                </div>
              </div>
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
      if(index !== flightResults.length - 1){
        total += ', ';
      }
      else {
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

  setFlightTimeHTML = (flights: Array<FlightResultsDetails>) => {
    const departureTime = moment(
      flights[0].departure_time.slice(0, flights[0].departure_time.length - 6)
    );
    const arrivalTime = moment(
      flights[flights.length - 1].arrival_time.slice(0, flights[0].arrival_time.length - 6)
    );
    const minutesDifference: number = flights.reduce((total: number, flightResult: FlightResultsDetails) => {
      return total += flightResult.flight_time;
    }, 0);
    const formatType = 'HH:mm';
    return (
      <div className="col-sm-2">
        <div className="text-bold flight-preview-time">{
          departureTime.format(formatType) + " - " + arrivalTime.format(formatType)
        }
        {
          departureTime.hour() + minutesDifference / 60 > 24
            ? <div className='plus-one-indicator'>+1</div>
            : ''
        }
        </div>
        <p className="text-small">
          {
            Math.floor(minutesDifference / 60) + 'h ' +
            Math.round(60 * (minutesDifference / 60 % 1)) + 'm'
          }
        </p>
      </div>
    );
  }

  setFlightPreviewIcons = (index: number) => {
    return(
      <div className='col-md-2 segment-preview-icon-container'>
        {
          index === 0 || index === this.props.segments.length - 1
            ? <FiberManualRecordIcon style={{ fontSize: 30 }}/>
            : <RadioButtonUncheckedIcon />
        }
        {
          index !== this.props.segments.length - 1
            ? <div className='segment-preview-dotted-line'></div>
            : ''
        }
      </div>
    );
  }
}

export default SegmentPreview;
