import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

interface PassengerGenderSelectProps {
  gender?: string;
}

class PassengerGenderSelect extends React.Component<PassengerGenderSelectProps> {

  render() {
    return (
      <FormControl fullWidth>
        <InputLabel id="gender-label">Gender</InputLabel>
        <Select
          id="gender"
          value={this.props.gender}
          variant="outlined"
        >
          <MenuItem value="F">Female</MenuItem>
          <MenuItem value="M">Male</MenuItem>
        </Select>
      </FormControl>
    );
  }
 
}

export default PassengerGenderSelect;