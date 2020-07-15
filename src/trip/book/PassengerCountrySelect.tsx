import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CountryList from '../../assets/data/countries.json';
import { updatePassengerInfo } from '../../actions/BookActions';
import { compareDesc } from 'date-fns';

interface PassengerCountrySelectProps {
  index: number;
  updatePassengerInfo: typeof updatePassengerInfo;
  country?: string;
}

class PassengerCountrySelect extends React.Component<PassengerCountrySelectProps> {
  state = {
    countries: CountryList
  }
  render() {
    return (
      <FormControl fullWidth>
        <Autocomplete
          autoHighlight
          autoSelect
          id="passenger-country"
          options={this.state.countries}
          value={this.getCountryByCode(this.props.country!) || null}
          getOptionLabel={(option) => option.name}
          onChange={(_, values: any) =>
            this.props.updatePassengerInfo(
              this.props.index, 'passport_country', values.code
            )
          }
          renderInput={(params) =>
            <TextField {...params}
              variant="outlined"
              placeholder="Nationality"
            />
          }
        />
      </FormControl>
    );
  }

  getCountryByCode = (code: string) => {
    const countriesList: Array<any> = this.state.countries;
    const index: number = countriesList.findIndex(
      (country: any) => country.code === code
    );
    return countriesList[index];
  }
}

export default PassengerCountrySelect;