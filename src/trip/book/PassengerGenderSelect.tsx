import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

interface PassengerGenderSelectProps {

}

class PassengerGenderSelect extends React.Component<PassengerGenderSelectProps> {

  render() {
    return (
      <FormControl fullWidth>
        <Select
          id="gender"
          value=""
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