import React from 'react';
import CabinList from '../../assets/data/cabins.json';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { updateFlightValue } from '../../actions/SearchActions';

interface CabinSelectProps {
  i: number;
  cabinClass: string;
  updateFlightValue: typeof updateFlightValue;
}
class CabinSelect extends React.Component<CabinSelectProps> {

  render() {
    const cabins = CabinList.map((item, index) => (
      <MenuItem key={index} value={item.code}>{item.name}</MenuItem>
    ));

    return (
      <FormControl fullWidth>
        <Select
          id="cabin"
          value={this.getCabinClassByName()}
          variant="outlined"
          onChange={(event: any) =>
            this.props.updateFlightValue(
              this.props.i, 'cabinClass', event.target.value
            )
          }
        >
          {cabins}
        </Select>
      </FormControl>
    );
  }
  getCabinClassByName = () => {
    const cabinListIndex: number = CabinList.findIndex(
      (cabinClass: any) => cabinClass.code === this.props.cabinClass
    );
    return cabinListIndex >= 0
      ? CabinList[cabinListIndex].code
      : CabinList[0].code;
  }
}

export default CabinSelect;