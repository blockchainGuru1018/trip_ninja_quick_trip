import React from 'react';
import { FlightResultsDetails } from '../trip/results/ResultsInterfaces';
import iataAirports from '../assets/data/iataAirports.json';
import { withTranslation, WithTranslation } from 'react-i18next';

interface FlightLogoProps extends WithTranslation {
  flights: Array<FlightResultsDetails>
  itineraryDisplay?: boolean
}

class FlightLogo extends React.Component<FlightLogoProps> {
  render() {
    return(
      <div className={(this.props.itineraryDisplay ? 'col-sm-1' : 'col-sm-2') + ' airline-logo-container my-auto'}>
        <div className="my-auto">
          <img
            className='img-airline-logo '
            src={"https://s3-us-west-2.amazonaws.com/tn-airline-logos/" + this.props.flights[0].carrier + "_48x48.png"}
            alt='flight-logo'
            onError={(e: any) => {
              e.target.onerror = null;
              e.target.src='https://s3-us-west-2.amazonaws.com/tn-airline-logos/airplane_48x48.png';
            }}
          ></img>
        </div>
        {!this.props.itineraryDisplay &&
          <div>
            {
              this.props.flights.map((flight: FlightResultsDetails, index: number) =>
                <div key={'carrier-label-' + index} className="text-bold">{flight.carrier} {flight.flight_number}</div>
              )
            }
            {
              this.multipleAirlines(this.props.flights)
                ? <div className="text-small">{this.props.t("common.flightLogo.multipleAirlines")}</div>
                : <div className="text-small">{iataAirports[this.props.flights[0].carrier]}</div>
            }
          </div>
        }
      </div>
    );
  }

  multipleAirlines = (flights: Array<FlightResultsDetails>) =>
    flights.filter((flight: FlightResultsDetails) =>
      flight.carrier === flights[0].carrier
    ).length !== flights.length;
}

export default withTranslation('common')(FlightLogo);
