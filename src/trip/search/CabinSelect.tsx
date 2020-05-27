import React from 'react';
import CabinList from '../../assets/data/cabins.json';

class CabinSelect extends React.Component {
  render() {
    const cabins = CabinList.map((item, index) => (
      <option key={index} value={item.code}>{item.name}</option>
    ));
    return (
      <select>
        {cabins}
      </select>
    )
  }
}

export default CabinSelect;