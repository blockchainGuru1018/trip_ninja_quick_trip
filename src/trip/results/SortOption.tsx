import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {
  updateEntireTrip,
  updateSortType
} from '../../actions/ResultsActions';
import SortIcon from '@material-ui/icons/Sort';
import { Results } from "./ResultsInterfaces";
import { withTranslation, WithTranslation } from 'react-i18next';

interface SortOptionProps extends WithTranslation {
  segmentPosition: number
  sortBy: string
  updateSortType: typeof updateSortType;
  trip?: Results;
  updateEntireTrip?: typeof updateEntireTrip;
}

const sortOptionList = ["cheapest", "best", "fastest"]; //TODO: make this enum?

class SortOption extends React.Component<SortOptionProps> {
  render() {
    const sortOptions = sortOptionList.map((item, index) => (
      <MenuItem className="capitalize" key={index} value={item}>{this.props.t("results.sortOption."+item)}</MenuItem>
    ));

    return (
      <div className='sort-select-container'>
        <div className='sort-icon-container'><SortIcon color="primary" />
          <div className='text-bold'>{this.props.t("results.sortOption.sortBy")}:</div>
        </div>
        <FormControl className="capitalize" color="primary">
          <Select
            labelId="sort-label"
            id="sort"
            color="primary"
            value={this.props.sortBy}
            onChange={(e: any) => this.updateSortTypeChangeActives(e)}
          >
            {sortOptions}
          </Select>
        </FormControl>
      </div>
    );
  }

  updateSortTypeChangeActives = (e: any) => {
    this.props.updateSortType(this.props.segmentPosition, e.target.value);
    return this.props.segmentPosition < 0 && this.props.trip
      ? this.setActives(e.target.value)
      : '';
  }

  setActives = (sortType: string) => {
    this.props.updateEntireTrip!(true, sortType);
  }

}

export default withTranslation('common')(SortOption);
