import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CountryList from '../../assets/data/countries.json';

interface PassengerCountrySelectProps {

}

class PassengerCountrySelect extends React.Component<PassengerCountrySelectProps> {

  render() {
    const countries = CountryList.map((country, index) => (
      <MenuItem key={index} value={country.code}>{country.name}</MenuItem>
    ));

    return (
      <FormControl fullWidth>
        <Select
          id="nationality"
          value=""
          variant="outlined"
        >
          {countries}
        </Select>
      </FormControl>
    );
  }
 
}

export default PassengerCountrySelect;