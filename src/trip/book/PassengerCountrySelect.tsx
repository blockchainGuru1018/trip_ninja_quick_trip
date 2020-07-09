import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

interface PassengerCountrySelectProps {

}

class PassengerCountrySelect extends React.Component<PassengerCountrySelectProps> {

  render() {
    return (
      <FormControl fullWidth>
        <Select
          id="nationality"
          value=""
          variant="outlined"
        >
          <MenuItem value="CA">Country</MenuItem>
          <MenuItem value="M">Canada</MenuItem>
        </Select>
      </FormControl>
    );
  }
 
}

export default PassengerCountrySelect;