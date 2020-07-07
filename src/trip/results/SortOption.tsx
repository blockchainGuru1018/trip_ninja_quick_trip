import React from 'react';
import history from '../../History';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { setSegmentPositionMapValue } from '../../actions/ResultsActions';
import CabinList from "../../assets/data/cabins.json";
import SortIcon from '@material-ui/icons/Sort';

interface SortOptionProps {
  segmentPosition: number
  sortOrder: string
  setSegmentPositionMapValue:  typeof setSegmentPositionMapValue
}

const sortOptionList = ["cheapest","best","fastest"]; //TODO: make this enum?
class SortOption extends React.Component<SortOptionProps> {
  render() {
    const sortOptions = sortOptionList.map((item, index) => (
      <MenuItem key={index} value={item}>{item}</MenuItem>
    ));

    return (
      <div>
        <FormControl>
          <InputLabel id="sort-label"><SortIcon color="primary"/>Sort By</InputLabel>
          <Select
            labelId="sort-label"
            id="sort"
            value={this.props.sortOrder}
            onChange={(e) => this.props.setSegmentPositionMapValue(this.props.segmentPosition, 'sortOrder', e.target.value)}
          >
            {sortOptions}
          </Select>
        </FormControl>
      </div>
    );
  }
}

export default SortOption;
