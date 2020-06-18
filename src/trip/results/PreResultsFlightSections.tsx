import React from 'react';
import FlightTakeoff from '@material-ui/icons/FlightTakeoff';
import FlightLand from '@material-ui/icons/FlightLand';
import './Results.css';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { Results, Segment, FlightResult, FlightResultsDetails, Location } from './ResultsInterfaces';
import { numberOfNightsDifference } from '../../helpers/DateHelpers';

interface PreResultsFlightSectionsProps {
  resultsDetails: Results | undefined
}

class PreResultsFlightSections extends React.Component<PreResultsFlightSectionsProps> {

  state = {
    locations: []
  }

  componentDidMount() {
    this.setState({
      locations: this.setLocations()
    });
  }

  render() {
    return (<div>
      {
        this.state.locations.map((location: any, index: number) => {
          if(index === this.state.locations.length - 1) {
            return [
              this.getFlightSelectionHTML(index, location),
              this.getFlightSelectionHTML(index + 1, location)
            ];
          } else {
            return this.getFlightSelectionHTML(index, location);
          }
        })
      }
    </div>
    );
  }

  setLocations = () => {
    if(this.props.resultsDetails) {
      const results: Results = this.props.resultsDetails;
      const locations: Array<Location> = results.segments.map((segment: Array<Segment>, index: number) => {
        const origin = segment[0].origin_name.split(',')[0];
        const destination = segment[0].destination_name.split(',')[0];
        const first_segment_flights: Array<FlightResult> = segment[0].flights;
        const departingFlight: Array<FlightResultsDetails> = results.flight_details.filter(
          (flightResult: FlightResultsDetails) =>
            flightResult.reference === first_segment_flights[0].flight_detail_ref
        );
        const nNights: number = index !== 0 && index !== results.segments.length
          ? this.getNumberOfNights(index, departingFlight, results)
          : 0;
        return {
          origin,
          destination,
          nNights
        };
      });
      return locations;
    }
    else {
      return [];
    }
  }

  getNumberOfNights = (index: number, departingFlight: Array<FlightResultsDetails>, results: Results) => {
    const lastFlight: FlightResultsDetails | Array<any> = results.flight_details.filter(
      (flightResult: FlightResultsDetails) => {
        const segment = results.segments[index - 1][0];
        return flightResult.reference === segment.flights[segment.flights.length - 1].flight_detail_ref;
      });
    return numberOfNightsDifference(
      lastFlight[0].arrival_time, departingFlight[0].departure_time
    );
  }

  getFlightSelectionHTML = (index: number, location: Location) => {
    const flightTakeOff: boolean = index === 0;
    const flightLanding: boolean = index === this.state.locations.length;
    const landingSection = flightLanding
      ? 'landing-section'
      : '';
    return (
      <div
        className={"standard-text bold-text flight-section " + landingSection}
        key={"flight-section" + index}
      >
        {
          flightTakeOff
            ? <FlightTakeoff className="flight-icon" color="primary" />
            : flightLanding
              ? <FlightLand className="flight-icon" color="primary" />
              : <RadioButtonUncheckedIcon className="flight-icon" />
        }
        {index === 0
          ? <div>
            <p className='standard-text bold-text'>{location.origin}</p>
          </div>
          : index === this.state.locations.length
            ? <div>
              <p className='standard-text bold-text'>{location.destination}</p>
            </div>
            : <div>
              <p className='standard-text'>{location.origin}</p>
              <p className='standard-text small-standard-text'>{location.nNights + ' nights'}</p>
            </div>
        }
        {
          flightLanding
            ? ''
            : <div className="dotted-connector"></div>
        }
      </div>
    );
  }

}

export default PreResultsFlightSections;
