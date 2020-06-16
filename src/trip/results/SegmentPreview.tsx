import React from 'react';
import CardTravelIcon from '@material-ui/icons/CardTravel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Segment, FlightResultsDetails, FlightResult } from './ResultsInterfaces';
import '../../index.css';
import iataAirports from '../../assets/data/iataAirports.json';
import { timeDifference } from '../../helpers/DateHelpers';
import moment from 'moment';

interface SegmentPreviewProps {
  segments: Array<Segment>
  flightDetails: Array<FlightResultsDetails>
}

class SegmentPreview extends React.Component<SegmentPreviewProps> {

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

  setFlightLogoHTML = (segment: Segment) => {
    const flights: Array<FlightResultsDetails> = this.getFlightDetailsBySegment(segment);

    return (
      <div className="col-sm-2 airline-logo-container">
        <div>
          {
            flights.map((flight: FlightResultsDetails, index: number) =>
              <img
                className={'img-airline-logo ' + "logo-" + index}
                src={"https://s3-us-west-2.amazonaws.com/tn-airline-logos/" + flight.carrier + "_48x48.png"}
                onError={(e: any) => {
                  e.target.onerror = null;
                  e.target.src='https://s3-us-west-2.amazonaws.com/tn-airline-logos/airplane_48x48.png';
                }}
              ></img>)
          }
        </div>
        <div>
          {
            flights.map((flight: FlightResultsDetails) =>
              <div className="text-bold">{flight.carrier} {flight.flight_number}</div>
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
  }

  setStopsHTML = (segment: Segment) => {
    const flights: Array<FlightResultsDetails> = this.getFlightDetailsBySegment(segment);
    return (
      <div className="col-sm-2">
        {
          flights.length > 1
            ? <div className="text-bold">{flights.length - 1} Stop{flights.length > 2 ? "s" : ""}, self transfer</div>
            : <p className="text-bold">Direct</p>
        }
        {
          flights.length > 1
            ? this.calculateHoursBetween(flights).map((stopOver: any) =>
              <div className='text-small'>
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
    flights.map((flight: FlightResultsDetails, index: number) => {
      if(index === flights.length - 1) {
        return '';
      }
      else {
        const stopOverTime = timeDifference(
          new Date(flight.arrival_time), new Date(flights[index + 1].departure_time)
        );
        stopOverTimeDetails.push({[flight.destination]: stopOverTime});
      }
    });
    return stopOverTimeDetails;
  }

  setSegmentsHTML = () => {
    return this.props.segments.map((segment: Segment, index: number) => (
      <div className="row segment-preview" key={index.toString()}>
        <div className="col-sm-2 preview-flight-path-container">
          <p className="origin-destination flight-preview-grey-border">{segment.origin}<span className="circle-divider">•</span>{segment.destination}</p>
          <p className="text-small flight-preview-grey-border">May 16</p>
        </div>
        {this.setFlightLogoHTML(segment)}
        {this.setFlightTimeHTML(segment)}
        {this.setStopsHTML(segment)}
        {this.setSegmentTypesHTML(segment)}
        <div className="col-sm-1 baggage-icon-container">
          <CardTravelIcon
            color="primary"
            fontSize="large"
            className='card-travel-icon'
          />
          <div>
            {segment.baggage.number_of_pieces}{segment.baggage.number_of_pieces === 1 ? 'pcs' : 'pc'}
          </div>
        </div>
        <div className="col-sm-1 icon-expand-preview">
          <ExpandMoreIcon color="secondary" fontSize="large"/>
        </div>
      </div>
    ));
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

  setFlightTimeHTML = (segment: Segment) => {
    const flights: Array<FlightResultsDetails> = this.getFlightDetailsBySegment(segment);
    const departureTime = moment(flights[0].departure_time);
    const arrivalTime = moment(flights[flights.length - 1].arrival_time);
    const timeDifference = flights.reduce((total: number, flightResult: FlightResultsDetails) => {
      return total += flightResult.flight_time;
    }, 0);
    const formatType = 'HH:mm';
    return (
      <div className="col-sm-2">
        <div className="text-bold">{
          departureTime.format(formatType) + " - " + arrivalTime.format(formatType)
        }</div>
        <p className="text-small">
          {Math.floor(timeDifference / 60) + 'h ' + Math.round(60 * (timeDifference / 60 % 1)) + 'm'}
        </p>
      </div>
    );
  }
}

export default SegmentPreview;
