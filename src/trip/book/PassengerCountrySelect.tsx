import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CountryList from '../../assets/data/countries.json';
import { updatePassengerInfo } from '../../actions/BookActions';
import { withTranslation, WithTranslation } from 'react-i18next';

interface PassengerCountrySelectProps extends WithTranslation {
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
          onChange={(_, values: any) => this.setCountryCode(values)}
          renderInput={(params) =>
            <TextField {...params}
              variant="outlined"
              placeholder={this.props.t("book.passengerCountrySelect.nationality")}
            />
          }
        />
      </FormControl>
    );
  }

  setCountryCode = (values : any) => {
    let code = values ? values.code : '';
    this.props.updatePassengerInfo(this.props.index, 'passport_country', code);
  }

  getCountryByCode = (code: string) => {
    const countriesList: Array<any> = this.state.countries;
    const index: number = countriesList.findIndex(
      (country: any) => country.code === code
    );
    return countriesList[index];
  }
}

export default withTranslation('common')(PassengerCountrySelect);
