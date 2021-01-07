import React from 'react';
import CurrencyList from '../../assets/data/currencies.json';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { setValue } from '../../actions/SearchActions';

interface CurrencySelectProps {
  currency: string;
  defaultCurrency: string;
  setValue: typeof setValue;
}

class CurrencySelect extends React.Component<CurrencySelectProps> {

  render() {
    const currencies = CurrencyList.map((item, index) => (
      <MenuItem key={index} value={item.code}>{item.code}</MenuItem>
    ));

    return (
      <FormControl fullWidth>
        <Select
          id="currency"
          style={{padding: '6px 0'}}
          value={this.props.currency}
          variant="outlined"
          onChange={(e) => this.props.setValue('currency', e.target.value)}
        >
          {currencies}
        </Select>
      </FormControl>
    );
  }
}

export default CurrencySelect;