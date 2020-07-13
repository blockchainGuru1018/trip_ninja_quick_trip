import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CountryList from '../../assets/data/countries.json';
import { updatePassengerInfo } from '../../actions/BookActions';

interface PassengerCountrySelectProps {
  index: number;
  updatePassengerInfo: typeof updatePassengerInfo;
  country?: string;
}

class PassengerCountrySelect extends React.Component<PassengerCountrySelectProps> {

  render() {
    return (
      <FormControl fullWidth>
        <Autocomplete
          autoHighlight
          autoSelect
          id="passenger-country"
          options={CountryList}
          getOptionLabel={(option) => option.name}
          renderInput={(params) =>
            <TextField {...params}
              variant="outlined"
              placeholder="Nationality"
              onChange={(e) => {}}
            />
          }
        />
      </FormControl>
    );
  }
 
}

export default PassengerCountrySelect;