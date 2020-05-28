import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class TripOptions extends React.Component {
  render() {
    return (
      <div>
        <FormControlLabel
          value="end"
          control={<Checkbox color="default" />}
          label="Route Flexible"
          labelPlacement="end"
        />
      </div>
    )
  }
}

export default TripOptions;