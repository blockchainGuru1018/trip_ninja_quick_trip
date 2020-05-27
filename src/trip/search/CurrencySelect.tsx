import React from 'react';
import CurrencyList from '../../assets/data/currencies.json';

class CurrencySelect extends React.Component {
  render() {
    const currencies = CurrencyList.map((item, index) => (
      <option key={index} value={item.code}>{item.code}</option>
    ));
    return (
      <select>
        {currencies}
      </select>
    )
  }
}

export default CurrencySelect;