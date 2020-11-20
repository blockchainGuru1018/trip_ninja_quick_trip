import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import { Results, ResultsDetails, Segment } from '../results/ResultsInterfaces';
import Divider from '@material-ui/core/Divider';
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import ItineraryDetails from '../../common/ItineraryDetails';
import { useTranslation } from 'react-i18next';
import { Pricing } from "../results/PricingInterfaces";
import FareBreakdown from "../../common/FareBreakdown";
import CancelRulesBreakdown from '../../common/CancelRulesBreakdown';

const useStyles = makeStyles({
  root: {
    minHeight: '250px'
  },
  flightDrawerComponent: {
    width: '90vw',
  },
  fullFlightDrawerComponent: {
    width: 'auto',
  },
});

type Anchor = 'top' | 'left' | 'bottom' | 'right';

interface FlightDetailsDrawerProps {
  selectedTrip: Array<Segment>;
  trip: Results;
  currency: string;
  resultsDetails: ResultsDetails;
  pathSequence: Array<string>;
  pricing: Pricing;
  markupVisible: boolean;
}

export default function FlightDetailsDrawer(props: FlightDetailsDrawerProps) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [ t ] = useTranslation('common');

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const flightDrawerComponent = (anchor: Anchor) => (
    <div
      className={
        clsx(classes.flightDrawerComponent, {
          [classes.fullFlightDrawerComponent]: anchor === 'top' || anchor === 'bottom',
        })  + ' flight-details-drawer-container'
      }
      role="presentation"
    >
      <div className="flight-details-drawer">
        <div className="d-flex">
          <h1>{t('book.flightDetailsDrawer.title')}</h1>
          <div className="close-button-container">
            <IconButton onClick={() => setState({...state, [anchor]: false})}>
              <CloseIcon fontSize="large" />
            </IconButton>
          </div>
        </div>
        <Divider />
        <div className="row">
          <div className="col-sm-6 no-pad-left">
            <FareBreakdown
              pricing={props.pricing}
              currency={props.currency}
              actives={[...props.resultsDetails.activeSegments.values()]}
              trip={props.trip}
              pathSequence={props.pathSequence}
              markupVisible={props.markupVisible}
              flightDetailsDisplay={true}
            />
          </div>
          <div className="col-sm-6 flight-details-drawer">
            <CancelRulesBreakdown
              currency={props.currency}
              price={props.pricing.confirmed_total_price}
              segments={props.selectedTrip}
              pathSequence={props.pathSequence}
              tripMarkup={props.pricing.markup}
            />
          </div>
        </div>
        <Divider />
        <ItineraryDetails 
          selectedTrip={props.selectedTrip}
          trip={props.trip}
          currency={props.currency}
          pricingDisplay={true}
        />
        <div className='row'>
          <div className='col-lg-2 offset-lg-5' onClick={() =>
            document.getElementsByClassName('MuiDrawer-paper')[0].scrollTop = 0
          }>
            <div className='btn-drawer-back-to-top'>{t('book.flightDetailsDrawer.toTop')}</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {(['right'] as Anchor[]).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button 
            color="secondary"
            variant="contained"
            disableElevation
            onClick={toggleDrawer(anchor, true)}>
            {t('book.flightDetailsDrawer.openButton')}
          </Button>
          <Drawer className='flight-details-drawer-comp' anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {flightDrawerComponent(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}