import React from 'react';
import {makeStyles, withStyles} from "@material-ui/core/styles";
import Menu, {MenuProps} from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import MenuItem from "@material-ui/core/MenuItem";
import './Filters.css';
import {updateActives, updateItineraryFilter, updateSegmentFilter} from "../../../actions/ResultsActions";
import { Filters, Results, Segment } from "../ResultsInterfaces";
import { sortBySortOrder } from "../../../helpers/SortHelper";
import {Alert} from "@material-ui/lab";


interface BaggageFilterProps {
  updateItineraryFilter?: typeof updateItineraryFilter;
  itineraryFilters?: Filters;
  trip: Results;
  updateActives: typeof updateActives;
  updateSegmentFilter?: typeof updateSegmentFilter;
  segmentFilters?: Filters;
  segmentIndex: number;
  activeSegments?: Array<Segment>;
  segmentSortBy?: Array<string>;
}

const BaggageFilter = (props: BaggageFilterProps) => {

  const useStyles = makeStyles({
    root: {
      maxWidth: '200px',
      height: '31px',
      width: 'auto',
      border: '1px solid #0DBE7CEB',
      textTransform: 'none',
      justifyContent: 'left',
      fontFamily: 'NeuzeitGro-Reg',
      '&:focus': {
        border: '1px solid #0DBE7CEB',
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

  const updateBaggageFilter = (value: number) => {
    handleClose();
    const filterLevel = props.itineraryFilters ? props.updateItineraryFilter : props.updateSegmentFilter
    if (filters && filterLevel) {
      if (value > 0) {
        if (filters.baggage) {
          if (filters.baggage < 3) {
            filterLevel('baggage', filters.baggage + 1, props.segmentIndex);
          } else {
            return
          }
        } else {
          filterLevel('baggage', 1, props.segmentIndex);
        }
      } else {
        if (filters.baggage) {
          if (filters.baggage === 0) {
            return
          } else {
            filterLevel('baggage', filters.baggage - 1, props.segmentIndex);
          }
        } else {
          return
        }
      }
    }
    return props.itineraryFilters && props.activeSegments ? resetActives(value) : '';
  }

  const resetActives = (value: number) => {
    setFailedFilter(false)
    props.trip.segments.forEach((segments: Array<Segment>, index: number) => {
      const filterFailed = checkFilterFailed(filters!.baggage, segments)
      if (props.activeSegments![index].filtered || value < 0 || filterFailed) {
        const sortedSegments = sortBySortOrder(segments, props.segmentSortBy ? props.segmentSortBy[index] : 'best')
        const firstFiltered: Segment | undefined = sortedSegments.find((segment: Segment) => !segment.filtered)
        return firstFiltered
          ? props.updateActives(index, firstFiltered.itinerary_id)
          : ''
      }
    })
  }


  const checkFilterFailed = (baggage: number, segmentOptions: Array<Segment>) => {
    const failure: boolean = baggage !== 0
    && segmentOptions.find((segment: Segment) => segment.filtered) === undefined
    if (failure) {
      setFailedFilter(true)
    }
    return failure;
  }


  return (
    <div>
      {filters
        ? <div className='baggage-filter-btn-container'>
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
            Baggage: {`${filters.baggage} +`}
          </Button>
          <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <div className='checked-bag-filter-selection-container'>
              <div className='text-bold filter-title'>Checked Bags</div>
              <hr className='checked-bag-hr'/>
              <MenuItem>
                <ListItemText primary='Minimum number of bags' />
                <IconButton onClick={() =>
                  updateBaggageFilter(-1)
                }>
                  <RemoveIcon fontSize="small" />
                </IconButton>
                <span className="baggage-count">{filters.baggage}</span>
                <IconButton onClick={() =>
                  updateBaggageFilter(1)
                }>
                  <AddIcon fontSize="small" color='primary'/>
                </IconButton>
              </MenuItem>
            </div>
          </StyledMenu>
          {failedFilter
            ? <Alert severity='error'>No flights</Alert>
            : ''
          }
        </div>
        : ''}
    </div>
  );
}

export default BaggageFilter;