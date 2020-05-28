import React from 'react';
import CabinList from '../../assets/data/cabins.json';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class CabinSelect extends React.Component {
  render() {
    let selectedCabin: string = CabinList[0].code
    const cabins = CabinList.map((item, index) => (
      <MenuItem key={index} value={item.code}>{item.name}</MenuItem>
    ));
    return (
      <FormControl fullWidth>
        <Select
          id="cabin"
          value={selectedCabin}
          variant="outlined"
        >
          {cabins}
        </Select>
      </FormControl>
    )
  }
}

export default CabinSelect;