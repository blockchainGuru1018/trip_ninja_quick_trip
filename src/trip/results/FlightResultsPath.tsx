import React from 'react';
import { FlightResultsDetails } from './ResultsInterfaces';
import FlightTakeoff from '@material-ui/icons/FlightTakeoff';
import FlightLand from '@material-ui/icons/FlightLand';
import Moment from 'react-moment';
import { numberOfNightsDifference } from '../../helpers/DateHelpers';
import './FlightResultsPath.css';

interface FlightResultsPathProps {
  flightDetails: Array<FlightResultsDetails>
}


class FlightResultsPath extends React.Component<FlightResultsPathProps> {
  render() {
    return(
      <div className="flight-results-path-container">
        <div className="row flight-path-container">
          <div className='row col-md-10 flight-path-internal-container'>
            {this.getFlightDestinationsHTML()}
          </div>
          <div className='row col-md-10 flight-path-internal-container'>
            {this.getFlightPathStepper()}
          </div>
        </div>
      </div>
    );
  }

  getFlightPathStepper = () => {
    return (<div></div>);
  }

  getDepartingTimesHTML = (flightDetail: FlightResultsDetails, index: number) => {
    const flightDetailsLength: number = this.props.flightDetails.length;
    const arrivalTimeNextDay = index === 0
      ? false
      : numberOfNightsDifference(
        this.props.flightDetails[index - 1].departure_time, flightDetail.arrival_time
      ) > 0;
    if(index === flightDetailsLength) {
      return (
        <div className='text-small'>
          <Moment format="HH:mm">{flightDetail.arrival_time.slice(0, 19)}</Moment>
          {
            arrivalTimeNextDay
              ? ' (+1)'
              : ''
          }
        </div>
      );
    } else if (index !== 0) {
      return (
        <div className="text-small">
          <Moment format="HH:mm">{this.props.flightDetails[index - 1].arrival_time.slice(0, 19)}</Moment>
          {
            arrivalTimeNextDay
              ? ' (+1) - '
              : ' - '
          }
          <Moment format="HH:mm">{flightDetail.departure_time.slice(0, 19)}</Moment>
        </div>
      );
    } else {
      return (
        <div className="text-small">
          <Moment format="HH:mm">{flightDetail.departure_time.slice(0, 19)}</Moment>
        </div>
      );
    }
  }

  getFlightDestinationsHTML = () => {
    const flightDetailsLength: number = this.props.flightDetails.length;
    const finalFlightDetail: FlightResultsDetails = this.props.flightDetails[flightDetailsLength - 1];
    const flightDetails: Array<any> = this.props.flightDetails.map( (flightDetail: FlightResultsDetails, index: number) => {
      return(
        <div className={
          "col-md-" + 12 / (flightDetailsLength + 1) +
          ' flight-detail-container' + (index !== 0 ? ' middle-flight-detail-container' : '')}
        >
          <div>
            <FlightTakeoff className="flight-icon" color="primary" />
            <div className='text-bold origin-destination-text-container'>
              {flightDetail.origin_name.split(', ')[0] + ' (' + flightDetail.origin + ')'}
            </div>
            {
              index !== 0
                ? <FlightLand className='flight-icon' color='primary' />
                : ''
            }
          </div>
          <div>
            {this.getDepartingTimesHTML(flightDetail, index)}
          </div>
        </div>
      );
    });

    flightDetails.push(
      <div className={"col-md-" + 12 / (flightDetailsLength + 1) + ' flight-detail-container'}>
        <div>
          <FlightLand className='flight-icon' color='primary' />
          <div className='text-bold origin-destination-text-container'>
            {finalFlightDetail.destination_name.split(', ')[0] + ' (' + finalFlightDetail.destination + ')'}
          </div>
        </div>
        <div>
          {this.getDepartingTimesHTML(finalFlightDetail, flightDetailsLength)}
        </div>
      </div>
    );

    return flightDetails;
  }
}

export default FlightResultsPath;