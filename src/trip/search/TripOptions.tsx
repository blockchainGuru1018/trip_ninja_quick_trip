import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { setValue } from '../../actions/SearchActions';
import { Flight } from './SearchInterfaces';
import { flexTripAllowed } from '../../helpers/FlexTripAllowedHelper';

interface TripOptionsProps {
  routeFlexible: boolean;
  virtualInterlining: boolean;
  setValue: typeof setValue;
  flights: Array<Flight>;
  virtualInterliningAccess: boolean;
}

class TripOptions extends React.Component<TripOptionsProps> {

  render() {
    return (
      <div className="trip-options">
        {
          flexTripAllowed(this.props.flights)
            && <FormControlLabel
              value={this.props.routeFlexible}
              control={<Checkbox
                id="route-flexible"
                checked={this.props.routeFlexible}
                color="secondary"
                onChange={e => this.props.setValue('routeFlexible', e.target.checked)}
              />}
              label="Route Flexible"
              labelPlacement="end"
            />
        }
        {
          this.props.virtualInterliningAccess &&
            <FormControlLabel control={
              <Checkbox id="virtual-interlining" checked={this.props.virtualInterlining} color="secondary"
                onChange={e => this.props.setValue('virtualInterlining', e.target.checked)}
              />
            } label="Virtual Interlining" labelPlacement="end"/>
        }

      </div>
    );
  }
}

export default TripOptions;