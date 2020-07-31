import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {setSegmentPositionMapValue, updateActives, updateSortType} from '../../actions/ResultsActions';
import SortIcon from '@material-ui/icons/Sort';
import { Segment, Results } from "./ResultsInterfaces";
import { sortBySortOrder } from "../../helpers/SortHelper";

interface SortOptionProps {
  segmentPosition: number
  sortBy: string
  updateSortType: typeof updateSortType;
  trip?: Results;
  updateActives?: typeof updateActives;
}

const sortOptionList = ["cheapest", "best", "fastest"]; //TODO: make this enum?

class SortOption extends React.Component<SortOptionProps> {
  render() {
    const sortOptions = sortOptionList.map((item, index) => (
      <MenuItem className="capitalize" key={index} value={item}>{item}</MenuItem>
    ));

    return (
      <div className='sort-select-container'>
        <div className='sort-icon-container'><SortIcon color="primary" />
          <div className='text-bold'>Sort By:</div>
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
    this.props.updateSortType(this.props.segmentPosition, e.target.value)
    return this.props.segmentPosition < 0 && this.props.trip && this.props.updateActives
      ? this.setActives(e.target.value)
      : ''
  }

  setActives = (sortType: string) => {
    this.props.trip!.segments.forEach((segments: Array<Segment>, index: number) => {
      const sortedSegments = sortBySortOrder(segments, sortType)
      const firstFiltered: Segment | undefined = sortedSegments.find((segment: Segment) => !segment.filtered)
      return firstFiltered
        ? this.props.updateActives!(index, firstFiltered.itinerary_id)
        : ''
    })
  }

}

export default SortOption;
