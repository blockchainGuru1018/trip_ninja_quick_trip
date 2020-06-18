import React from 'react';
import { FlightResultsDetails } from './ResultsInterfaces';
import FlightTakeoff from '@material-ui/icons/FlightTakeoff';
import FlightLand from '@material-ui/icons/FlightLand';

interface FlightResultsPathProps {
  flightDetails: Array<FlightResultsDetails>
}


class FlightResultsPath extends React.Component<FlightResultsPathProps> {
  render() {
    return(
      <div className="flight-results-path-container">
        <div className="row">
          {this.getFlightDestinationsHTML()}
        </div>
        <div className="row">
        </div>
      </div>
    );
  }

  getFlightDestinationsHTML = () => {
    const flightDetailsLength: number = this.props.flightDetails.length;
    const finalFlightDetail: FlightResultsDetails = this.props.flightDetails[flightDetailsLength - 1];
    const flightDetails: Array<any> = this.props.flightDetails.map( (flightDetail: FlightResultsDetails, index: number) => {
      return(
        <div className={"col-md-" + 12 / (flightDetailsLength + 1)}>
          {
            index === 0
              ? <FlightTakeoff className="flight-icon" color="primary" />
              : ''
          }
          <div className='text-bold'>
            {flightDetail.origin_name.split(', ')[0] + ' (' + flightDetail.origin + ')'}
          </div>
        </div>
      );
    });

    flightDetails.push(
      <div className={"col-md-" + 12 / (flightDetailsLength + 1)}>
        <FlightLand className='flight-icon' color='primary' />
        <div className='text-bold'>
          {finalFlightDetail.destination_name.split(', ')[0] + ' (' + finalFlightDetail.destination + ')'}
        </div>
      </div>
    );

    return flightDetails;
  }
}

export default FlightResultsPath;