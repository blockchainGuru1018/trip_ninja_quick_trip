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


interface BaggageFilterProps {
  updateItineraryFilter?: typeof updateItineraryFilter;
  itineraryFilters?: Filters | undefined;
  trip: Results;
  updateActives: typeof updateActives;
  updateSegmentFilter?: typeof updateSegmentFilter;
  segmentFilters?: Filters | undefined;
  segmentIndex: number;
  activeSegments?: Array<Segment>;
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
  })((props: MenuProps) => (
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
      {...props}
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
          if (filters.baggage === 1) {
            filterLevel('baggage', undefined, props.segmentIndex);
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

  const resetActives = (value: number) =>
    props.trip.segments.forEach((segments: Array<Segment>, index: number) => {
      if (props.activeSegments![index].filtered || value < 0) {
        const sortedSegments = sortBySortOrder(segments, 'best')
        const firstFiltered: Segment | undefined = sortedSegments.find((segment: Segment) => !segment.filtered)
        return firstFiltered
          ? props.updateActives(index, firstFiltered.itinerary_id)
          : ''
      }
    })


  return (
    <div>
      {filters
        ? <div>
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
            Baggage: {filters.baggage ? `${filters.baggage} +` : 'Any'}
          </Button>
          <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <div className='checked-bag-filter-selection-container'>
              <div className='text-bold filter-title'>Minimum number of bags</div>
              <hr className='checked-bag-hr'/>
              <MenuItem>
                <ListItemText primary='Checked bag' />
                <IconButton onClick={() =>
                  updateBaggageFilter(-1)
                }>
                  <RemoveIcon fontSize="small" />
                </IconButton>
                <span className="baggage-count">{filters.baggage ? filters.baggage : 'All'}</span>
                <IconButton onClick={() =>
                  updateBaggageFilter(1)
                }>
                  <AddIcon fontSize="small" color='primary'/>
                </IconButton>
              </MenuItem>
            </div>
          </StyledMenu>
        </div>
        : ''}
    </div>
  );
}

export default BaggageFilter;