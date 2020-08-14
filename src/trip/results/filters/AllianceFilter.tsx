import React from 'react';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Menu, {MenuProps} from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import { RadioGroup } from '@material-ui/core';
import { Radio } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';
import MenuItem from "@material-ui/core/MenuItem";
import './Filters.css';
import '../ItineraryResult.css';
import {
  updateActives,
  updateEntireTrip,
  updateItineraryFilter,
  updateSegmentFilter
} from "../../../actions/ResultsActions";
import { Filters, Results, Segment } from "../ResultsInterfaces";
import { Alert } from "@material-ui/lab";


interface AllianceFilterProps {
  updateItineraryFilter?: typeof updateItineraryFilter;
  itineraryFilters?: Filters;
  trip: Results;
  updateActives: typeof updateActives;
  updateSegmentFilter?: typeof updateSegmentFilter;
  segmentFilters?: Filters;
  segmentIndex: number;
  activeSegments?: Array<Segment>;
  sortBy?: string;
  segmentSortBy?: Array<string>;
  updateEntireTrip?: typeof updateEntireTrip;
}

const AllianceFilter = (props: AllianceFilterProps) => {

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
  const [failedFilter, setFailedFilter] = React.useState<null | any>(false);
  const [value, setValue] = React.useState<null | any>(null);

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
  const filters: Filters | undefined = props.itineraryFilters ? props.itineraryFilters : props.segmentFilters;
  const filterLevel = props.itineraryFilters ? props.updateItineraryFilter : props.updateSegmentFilter;

  const updateAllianceFilter = (event: any) => {
    handleClose();
    setValue(event.target.value);
    filterLevel!('alliance', event.target.value, props.segmentIndex);
    return props.itineraryFilters && props.activeSegments && props.sortBy ? resetActives(event.target.value) : '';
  };

  const resetActives = (value: number) => {
    setFailedFilter(false);
    props.updateEntireTrip!(true, props.sortBy!);
  };

  return (
    <div className="filter-group">
      {filters
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
            Alliance: {`${filters.alliance}`}
          </Button>
          <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <div className='filter-selection-container'>
              <div className='text-bold filter-title'>Max Number of Stops</div>
              <hr className='filter-hr'/>
              <MenuItem>
                <RadioGroup aria-label="Alliance" value={value} name="Alliance Filter" onChange={updateAllianceFilter}>
                  <FormControlLabel control={<Radio />} value="" label="Any" />
                  <FormControlLabel control={<Radio />} value="*A" label="Star Alliance" />
                  <FormControlLabel control={<Radio />} value="*O" label="Oneworld" />
                  <FormControlLabel control={<Radio />} value="*S" label="Skyteam" />
                </RadioGroup>
              </MenuItem>
            </div>
          </StyledMenu>
          {failedFilter
            && <Alert severity='error'>No flights</Alert>
          }
        </div>
        : ''}
    </div>
  );
};

export default AllianceFilter;
