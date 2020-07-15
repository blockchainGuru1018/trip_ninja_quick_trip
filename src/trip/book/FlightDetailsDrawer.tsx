import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import FareRulesPreview from '../results/FareRulesPreview';
import FlightResultsPath from '../results/FlightResultsPath';
import { Segment, FlightResultsDetails, Results } from '../results/ResultsInterfaces';
import { getFlightDetailsBySegment } from '../../helpers/FlightDetailsHelper';
import Divider from '@material-ui/core/Divider';


const useStyles = makeStyles({
  list: {
    width: '700',
  },
  fullList: {
    width: 'auto',
  },
});

type Anchor = 'top' | 'left' | 'bottom' | 'right';

interface FlightDetailsDrawerProps {
  selectedTrip: Array<Segment>;
  trip: Results;
  currency: string;
}

export default function FlightDetailsDrawer(props: FlightDetailsDrawerProps) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
    flightResultsPathComponents: new Element(),
    fareRulesPreviewComponents: []
  });

  const setFlightComponent = (selectedTrip: Array<Segment>, trip: Results, currency: string) => {
    let flightResultsPathComponents: Array<JSX.Element> = [];
    let fareRulesPreviewComponents: Array<JSX.Element> = [];
    selectedTrip.forEach((segment: Segment, index: number) => {
      const flightDetails: Array<FlightResultsDetails> = getFlightDetailsBySegment(segment, trip.flight_details);
      flightResultsPathComponents.push(<FlightResultsPath
        flightDetails={flightDetails}
        key={index}
      />);
      fareRulesPreviewComponents.push(<FareRulesPreview
        segment={segment}
        flightDetails={flightDetails}
        currency={currency}
        itineraryDisplay={true}
        key={index}
      />);
    });
    setState({ ...state, flightResultsPathComponents:  flightResultsPathComponents, fareRulesPreviewComponents: fareRulesPreviewComponents});
  };

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

  const list = (anchor: Anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="flight-details-drawer">
        <h1>Booking Overview</h1>
        <Divider />
        <div className="row flight-details-container">
          <div className="col-lg-6">
            <h5>Flight Details</h5>
            <div className="flight-details">
              {setFlightComponent(props.selectedTrip, props.trip)}
            </div>
          </div>
          <div className="col-lg-6">
            <h5>Fare Details</h5>
            <div className="fare-details">
              {fareDetails(props.selectedTrip, props.trip, props.currency)}
            </div>
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
            onClick={toggleDrawer(anchor, true)}>
            See Flight Details
          </Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}