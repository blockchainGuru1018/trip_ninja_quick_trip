import React from 'react';
import CurrencyList from '../../assets/data/currencies.json';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class CurrencySelect extends React.Component {
  state = {
    currency: 'USD'
  }

  handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    this.setState({ currency: event.target.value })
  }

  render() {
    const currencies = CurrencyList.map((item, index) => (
      <MenuItem key={index} value={item.code}>{item.code}</MenuItem>
    ));
    
    return (
      <FormControl fullWidth>
        <Select
          id="currency"
          value={this.state.currency}
          variant="outlined"
          onChange={this.handleChange}
        >
          {currencies}
        </Select>
      </FormControl>
    )
  }
}

export default CurrencySelect;