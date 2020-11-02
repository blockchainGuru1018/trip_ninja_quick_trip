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
  updateSegmentFilter
} from "../../../actions/ResultsActions";
import { Filter, Results, Segment } from "../ResultsInterfaces";
import { Alert } from "@material-ui/lab";
import { RadioGroup } from '@material-ui/core';
import { Radio } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { firstLetterCapital } from '../../../helpers/MiscHelpers';

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
}
              
const FlightsFilter = (props: FlightsFilterProps) => {
  const [ t ] = useTranslation('common');

  const useStyles = makeStyles({
    root: {
      maxWidth: '300px',
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
    handleClose();
    filterLevel!(props.filterName, event.target.value, props.segmentIndex);
    return props.itineraryFilters && props.activeSegments && props.sortBy ? resetActives(event.target.value) : '';
  };

  const resetActives = (value: number) => {
    props.updateEntireTrip!(true, props.sortBy!);
  };

  const filtersDict = {
    'baggage': { 
      'name': t('results.filters.flightsFilter.baggage'),
      'nameSuffix': '',
      'description': t('results.filters.flightsFilter.baggageDescription'),
      'picker':
        <MenuItem>
          <RadioGroup aria-label={t('results.filters.flightsFilter.baggageDescription')} value={filter!.value} name="Baggage Filter" onChange={updateFilter}>
            <FormControlLabel control={<Radio />} value="0" label={t('results.filters.flightsFilter.baggage0Label')} />
            <FormControlLabel control={<Radio />} value="1" label={t('results.filters.flightsFilter.baggage1Label')} />
            <FormControlLabel control={<Radio />} value="2" label={t('results.filters.flightsFilter.baggage2Label')} />
            <FormControlLabel control={<Radio />} value="3" label={t('results.filters.flightsFilter.baggage3Label')} />
          </RadioGroup>
        </MenuItem>},
    'alliance': { 
      'name': t('results.filters.flightsFilter.alliance'),
      'nameSuffix': '',
      'description': t('results.filters.flightsFilter.allianceDescription'),
      'picker':
        <MenuItem>
          <RadioGroup aria-label={t('results.filters.flightsFilter.allianceDescription')} value={filter!.value} name="Alliance Filter" onChange={updateFilter}>
            <FormControlLabel control={<Radio />} value="Any" label={t('results.filters.flightsFilter.allianceAnyLabel')} />
            <FormControlLabel control={<Radio />} value="*A" label={t('results.filters.flightsFilter.alliance*ALabel')} />
            <FormControlLabel control={<Radio />} value="*O" label={t('results.filters.flightsFilter.alliance*OLabel')} />
            <FormControlLabel control={<Radio />} value="*S" label={t('results.filters.flightsFilter.alliance*SLabel')} />
          </RadioGroup>
        </MenuItem>},
    'noOfStops': { 
      'name': t('results.filters.flightsFilter.noOfStops'),
      'nameSuffix': '',
      'description': t('results.filters.flightsFilter.noOfStopsDescription'),
      'picker':
        <MenuItem>
          <RadioGroup aria-label={t('results.filters.flightsFilter.noOfStopsDescription')} value={filter!.value} name="Number Of Stops Filter" onChange={updateFilter}>
            <FormControlLabel control={<Radio />} value="Any" label={t('results.filters.flightsFilter.noOfStopsAnyLabel')} />
            <FormControlLabel control={<Radio />} value="0" label={t('results.filters.flightsFilter.noOfStops0Label')} />
            <FormControlLabel control={<Radio />} value="1" label={t('results.filters.flightsFilter.noOfStops1Label')} />
            <FormControlLabel control={<Radio />} value="2" label={t('results.filters.flightsFilter.noOfStops2Label')} />
          </RadioGroup>
        </MenuItem>},
    'refundability': { 
      'name': t('results.filters.flightsFilter.refundability'),
      'nameSuffix': '',
      'description': t('results.filters.flightsFilter.refundabilityDescription'),
      'picker':
        <MenuItem>
          <RadioGroup aria-label={t('results.filters.flightsFilter.refundabilityDescription')} value={filter!.value} name="Refundability Filter" onChange={updateFilter}>
            <FormControlLabel control={<Radio />} value="Any" label={t('results.filters.flightsFilter.refundabilityAnyLabel')} />
            <FormControlLabel control={<Radio />} value="Non-Refundable" label={t('results.filters.flightsFilter.refundabilityNon-RefundableLabel')} />
            <FormControlLabel control={<Radio />} value="Refundable" label={t('results.filters.flightsFilter.refundabilityRefundableLabel')} />            
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
            {firstLetterCapital(filtersDict[props.filterName]['name'])}: {t('results.filters.flightsFilter.' + props.filterName + filter.value + "Label")} {filtersDict[props.filterName]['nameSuffix']}
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
            && <Alert severity='error'>{t('results.filters.flightsFilter.filterFailMessage')}</Alert>
          }
        </div>
        : ''}
    </div>
  );
};

export default FlightsFilter;
