import React from 'react';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Menu, {MenuProps} from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
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


interface NumberOfStopsFilterProps {
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

const NumberOfStopsFilter = (props: NumberOfStopsFilterProps) => {

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

  const updateNumberOfStopsFilter = (value: number) => {
    handleClose();
    if (filters && filterLevel) {
      value > 0 ? increase_filter(filters.numberOfStops) : decrease_filter(filters.numberOfStops);
    }
    return props.itineraryFilters && props.activeSegments && props.sortBy ? resetActives(value) : '';
  };

  const increase_filter = (current_number: number) => {
    let filter_reached_limit = current_number && current_number >= 4;
    if (filter_reached_limit) {
      return;
    } else {
      const filterValue: number = current_number ? current_number + 1 : 1;
      filterLevel!('numberOfStops', filterValue, props.segmentIndex);
    }
  };

  const decrease_filter = (current_number: number) => {
    if (current_number && current_number > 0) {
      filterLevel!('numberOfStops', current_number - 1, props.segmentIndex);
    } else {
      return;
    }
  };

  const resetActives = (value: number) => {
    setFailedFilter(false);
    props.updateEntireTrip!(true, props.sortBy!);
  };

  return (
    <div>
      {filters
        ? <div className='numberOfStops-filter-btn-container'>
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
            Max Number of Stops: {`${filters.numberOfStops}`}
          </Button>
          <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <div className='checked-bag-filter-selection-container'>
              <div className='text-bold filter-title'>Max Number of Stops</div>
              <hr className='checked-bag-hr'/>
              <MenuItem>
                <ListItemText primary='Max number of stops' />
                <IconButton onClick={() =>
                  updateNumberOfStopsFilter(-1)
                }>
                  <RemoveIcon fontSize="small" />
                </IconButton>
                <span className="numberOfStops-count">{filters.numberOfStops}</span>
                <IconButton onClick={() =>
                  updateNumberOfStopsFilter(1)
                }>
                  <AddIcon fontSize="small" color='primary'/>
                </IconButton>
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

export default NumberOfStopsFilter;
