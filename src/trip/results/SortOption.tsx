import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { setSegmentPositionMapValue } from '../../actions/ResultsActions';
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
      <div className='sort-select-container'>
        <div className='sort-icon-container'><SortIcon color="primary" />
          <div className='text-bold'>Sort By:</div>
        </div>
        <FormControl color="primary">
          <Select
            labelId="sort-label"
            id="sort"
            color="primary"
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
