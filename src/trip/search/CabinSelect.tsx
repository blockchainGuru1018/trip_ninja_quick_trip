import React from 'react';
import CabinList from '../../assets/data/cabins.json';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class CabinSelect extends React.Component {
  state = {
    cabin: "E"
  }

  handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    this.setState({ cabin: event.target.value })
  }

  render() {
    const cabins = CabinList.map((item, index) => (
      <MenuItem key={index} value={item.code}>{item.name}</MenuItem>
    ));
    return (
      <FormControl fullWidth>
        <Select
          id="cabin"
          value={this.state.cabin}
          variant="outlined"
          onChange={this.handleChange}
        >
          {cabins}
        </Select>
      </FormControl>
    )
  }
}

export default CabinSelect;