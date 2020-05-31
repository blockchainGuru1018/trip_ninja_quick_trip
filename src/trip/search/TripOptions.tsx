import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { setValue } from '../../actions/SearchActions';

interface TripOptionsProps {
  route_flexible: boolean;
  setValue: typeof setValue;
}

class TripOptions extends React.Component<TripOptionsProps> {
  render() {
    return (
      <div className="trip-options">
        <FormControlLabel
          value={this.props.route_flexible}
          control={<Checkbox
                        id="route_flexible"
                        checked={this.props.route_flexible}
                        color="default"
                        onChange={e => this.props.setValue('route_flexible', e.target.checked)}/>}
          label="Route Flexible"
          labelPlacement="end"
        />
      </div>
    )
  }
}

export default TripOptions;