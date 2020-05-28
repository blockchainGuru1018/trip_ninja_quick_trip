import React from 'react';
import CurrencyList from '../../assets/data/currencies.json';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class CurrencySelect extends React.Component {
  render() {
    let selectedCurrency: string = CurrencyList[0].code;
    const currencies = CurrencyList.map((item, index) => (
      <MenuItem key={index} value={item.code}>{item.code}</MenuItem>
    ));
    return (
      <FormControl>
        <Select
          id="currency"
          value={selectedCurrency}
        >
          {currencies}
        </Select>
      </FormControl>
    )
  }
}

export default CurrencySelect;