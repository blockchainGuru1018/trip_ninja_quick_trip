import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { setValue } from '../../actions/SearchActions';
import { Flight } from './SearchInterfaces';


interface TripOptionsProps {
  routeFlexible: boolean;
  setValue: typeof setValue;
  flights: Array<Flight>
}

class TripOptions extends React.Component<TripOptionsProps> {

  flexTripAllowed = (): boolean => {
    const flightLength: number = this.props.flights.length;
    return flightLength > 2 &&
    flightLength <= 5 &&
    this.allCabinsEqual();
  }

  allCabinsEqual = (): boolean => {
    const cabinClass: string = this.props.flights[0].cabinClass;
    const flightsWithSameCabinClass: Array<Flight> = this.props.flights.filter(
      flight => flight.cabinClass === cabinClass
    );
    return flightsWithSameCabinClass.length === this.props.flights.length;
  }


  render() {
    return (
      <div className="trip-options">
        {
          this.flexTripAllowed()
            ? <FormControlLabel
              value={this.props.routeFlexible}
              control={<Checkbox
                id="route-flexible"
                checked={this.props.routeFlexible}
                color="default"
                onChange={e => this.props.setValue('routeFlexible', e.target.checked)}
              />}
              label="Route Flexible"
              labelPlacement="end"
            />
            : ''
        }
      </div>
    );
  }
}

export default TripOptions;