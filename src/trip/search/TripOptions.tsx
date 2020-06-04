import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { setValue } from '../../actions/SearchActions';

interface TripOptionsProps {
  routeFlexible: boolean;
  setValue: typeof setValue;
}

class TripOptions extends React.Component<TripOptionsProps> {
  render() {
    return (
      <div className="trip-options">
        <FormControlLabel
          value={this.props.routeFlexible}
          control={<Checkbox
            id="route-flexible"
            checked={this.props.routeFlexible}
            color="default"
            onChange={e => this.props.setValue('route_flexible', e.target.checked)}
          />}
          label="Route Flexible"
          labelPlacement="end"
        />
      </div>
    );
  }
}

export default TripOptions;