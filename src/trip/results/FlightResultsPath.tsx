import React from 'react';
import { FlightResultsDetails } from './ResultsInterfaces';
import FlightTakeoff from '@material-ui/icons/FlightTakeoff';
import FlightLand from '@material-ui/icons/FlightLand';
import Moment from 'react-moment';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { numberOfNightsDifference } from '../../helpers/DateHelpers';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import iataAirports from '../../assets/data/iataAirports.json';
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
    const flightDetailsLength = this.props.flightDetails.length;
    return (
      <div className='stepper-container'>
        <Stepper alternativeLabel>
          {
            Array(flightDetailsLength + 1).fill(0).map((_: number, index: number )=>
              <Step key={index.toString()}>
                <StepLabel StepIconComponent={FiberManualRecordIcon}>
                  {index !== 0 && index !== flightDetailsLength ? "1hr 45min" : '' }
                </StepLabel>
              </Step>
            )
          }
        </Stepper>
        {this.getStepperFlightDetailsHTML()}
      </div>
    );
  }

  getStepperFlightDetailsHTML = () =>
    <div className='flight-path-timing-container row'>
      {
        this.props.flightDetails.map((flightDetail: FlightResultsDetails) => {
          const flightTimeHours: number = Math.floor(flightDetail.flight_time / 60);
          const flightTimeMinutes: number = flightDetail.flight_time % 60;
          return(<div
            className={
              "col-md-" + (12 / this.props.flightDetails.length) +
              " flight-path-timing-details text-small"
            }
          >
            <div>
              {flightTimeHours + (flightTimeHours > 1 ? 'hrs ' : 'hr ')}
              {flightTimeMinutes + (flightTimeMinutes > 1 ? 'mins' : 'min')}
            </div>
            <div>
              {iataAirports[flightDetail.carrier]}
            </div>
          </div>);
        })
      }
    </div>

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