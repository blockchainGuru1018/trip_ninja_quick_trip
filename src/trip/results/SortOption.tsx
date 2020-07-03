import React from 'react';
import history from '../../History';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { setSegmentValue } from '../../actions/ResultsActions';
import CabinList from "../../assets/data/cabins.json";

interface SortOptionProps {
  segmentPosition: number
  sortBy: string
  default: string
  setValue:  typeof setSegmentValue
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
const sortOptionList = ["cheapest","best","fastest"];
class SortOption extends React.Component<SortOptionProps> {
  render() {
    const sortOptions = sortOptionList.map((item, index) => (
      <MenuItem key={index} value={item}>{item}</MenuItem>
    ));

    const classes = useStyles();
    const [age, setAge] = React.useState('');

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      setAge(event.target.value as string);
    };

    return (
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel id="sort-label">Sort By</InputLabel>
          <Select
            labelId="sort-label"
            id="sort"
            value={this.props.sortBy}
            onChange={(e) => this.props.setValue(this.props.segmentPosition, 'sortBy', e.target.value)}
          >
            {sortOptions}
          </Select>
        </FormControl>
      </div>
    );
  }
}

export default SortOption;
