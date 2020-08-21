import React from 'react';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Menu, {MenuProps} from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import './Filters.css';
import '../ItineraryResult.css';
import {
  updateActives,
  updateEntireTrip,
  updateItineraryFilter,
  updateSegmentFilter,
  resultsLoading
} from "../../../actions/ResultsActions";
import { Filter, Results, Segment } from "../ResultsInterfaces";
import { Alert } from "@material-ui/lab";
import { RadioGroup } from '@material-ui/core';
import { Radio } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';

interface FlightsFilterProps {
  filterName: string;
  updateItineraryFilter?: typeof updateItineraryFilter;
  itineraryFilters?: Filter;
  trip: Results;
  updateActives: typeof updateActives;
  updateSegmentFilter?: typeof updateSegmentFilter;
  segmentFilters?: Filter;
  segmentIndex: number;
  activeSegments?: Array<Segment>;
  sortBy?: string;
  segmentSortBy?: Array<string>;
  updateEntireTrip?: typeof updateEntireTrip;
  resultsLoading: typeof resultsLoading;
}
              
const FlightsFilter = (props: FlightsFilterProps) => {

  const useStyles = makeStyles({
    root: {
      maxWidth: '200px',
      height: '31px',
      width: 'auto',
      border: '1px solid var(--primary)',
      textTransform: 'none',
      justifyContent: 'left',
      fontFamily: 'NeuzeitGro-Reg',
      '&:focus': {
        border: '1px solid var(--primary)',
      }
    },
  });

  const [anchorEl, setAnchorEl] = React.useState<null | any>(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })((menuProps: MenuProps) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...menuProps}
    />
  ));


  const classes = useStyles();
  const filter: Filter | undefined = props.itineraryFilters ? props.itineraryFilters : props.segmentFilters;
  const filterLevel = props.itineraryFilters ? props.updateItineraryFilter : props.updateSegmentFilter;

  const updateFilter = (event: any) => {
    props.resultsLoading(true);
    handleClose();
    filterLevel!(props.filterName, event.target.value, props.segmentIndex);
    return props.itineraryFilters && props.activeSegments && props.sortBy ? resetActives(event.target.value) : '';
  };

  const resetActives = (value: number) => {
    props.updateEntireTrip!(true, props.sortBy!);
  };

  const filtersDict = {
    'baggage': { 
      'name': 'Baggage',
      'nameSuffix': '+',
      'description': 'Minimum # of checked bags',
      'picker':
        <MenuItem>
          <RadioGroup aria-label="Min Baggage" value={filter!.value} name="Baggage Filter" onChange={updateFilter}>
            <FormControlLabel control={<Radio />} value="0" label="Any" />
            <FormControlLabel control={<Radio />} value="1" label="1 bag" />
            <FormControlLabel control={<Radio />} value="2" label="2 bags" />
            <FormControlLabel control={<Radio />} value="3" label="3 bags" />
          </RadioGroup>
        </MenuItem>},
    'alliance': { 
      'name': 'Alliance',
      'nameSuffix': '',
      'description': 'Alliance',
      'picker':
        <MenuItem>
          <RadioGroup aria-label="Alliance" value={filter!.value} name="Alliance Filter" onChange={updateFilter}>
            <FormControlLabel control={<Radio />} value="Any" label="Any" />
            <FormControlLabel control={<Radio />} value="*A" label="Star Alliance" />
            <FormControlLabel control={<Radio />} value="*O" label="Oneworld" />
            <FormControlLabel control={<Radio />} value="*S" label="Skyteam" />
          </RadioGroup>
        </MenuItem>},
    'noOfStops': { 
      'name': 'Stops',
      'nameSuffix': '',
      'description': 'Max Number of Stops',
      'picker':
        <MenuItem>
          <RadioGroup aria-label="Max Number of Stops" value={filter!.value} name="Number Of Stops Filter" onChange={updateFilter}>
            <FormControlLabel control={<Radio />} value="Any" label="Any" />
            <FormControlLabel control={<Radio />} value="0" label="Direct Only" />
            <FormControlLabel control={<Radio />} value="1" label="1 stop" />
            <FormControlLabel control={<Radio />} value="2" label="2 stops" />
          </RadioGroup>
        </MenuItem>}
  };

  return (
    <div className="filter-group">
      {filter
        ? <div className='filter-btn-container'>
          <Button
            fullWidth
            classes={{
              root: classes.root
            }}
            aria-controls="customized-menu"
            aria-haspopup="true"
            variant="outlined"
            color="default"
            size="large"
            onClick={handleClick}
          >
            {filtersDict[props.filterName]['name']}: {`${filter.value} `} {filtersDict[props.filterName]['nameSuffix']}
          </Button>
          <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <div className='filter-selection-container'>
              <div className='text-bold filter-title'>{filtersDict[props.filterName]['description']}</div>
              <hr className='filter-hr'/>
              {filtersDict[props.filterName]['picker']}
            </div>
          </StyledMenu>
          {filter.failed
            && <Alert severity='error'>No flights for this filter</Alert>
          }
        </div>
        : ''}
    </div>
  );
};

export default FlightsFilter;
