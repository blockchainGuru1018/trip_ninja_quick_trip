import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { updatePassengerInfo } from '../../actions/BookActions';

interface PassengerGenderSelectProps {
  index: number;
  updatePassengerInfo: typeof updatePassengerInfo;
  gender?: string;
}

class PassengerGenderSelect extends React.Component<PassengerGenderSelectProps> {

  render() {
    return (
      <FormControl variant="outlined" fullWidth>
        <InputLabel id="gender-label">Gender</InputLabel>
        <Select
          id="gender"
          value={this.props.gender}
          label="Gender"
          labelId="gender-label"
          onChange={(event: any) =>
            this.props.updatePassengerInfo(
              this.props.index, 'gender', event.target.value
            )
          }
        >
          <MenuItem value="F">Female</MenuItem>
          <MenuItem value="M">Male</MenuItem>
        </Select>
      </FormControl>
    );
  }
 
}

export default PassengerGenderSelect;