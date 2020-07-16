import React, {useEffect} from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import FareRulesPreview from '../results/FareRulesPreview';
import FlightResultsPath from '../results/FlightResultsPath';
import {FlightResultsDetails, Results, Segment} from '../results/ResultsInterfaces';
import {getFlightDetailsBySegment} from '../../helpers/FlightDetailsHelper';
import Divider from '@material-ui/core/Divider';
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Moment from "react-moment";
import {firstLetterCapital} from "../../helpers/MiscHelpers";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator
} from "@material-ui/lab";


const useStyles = makeStyles({
  root: {
    alignItems: 'flex-start'
  },
  list: {
    width: '90vw',
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
    flightResultsPathComponents:  [] as  any,
    fareRulesPreviewComponents: [] as any
  });

  const setFlightComponents = (selectedTrip: Array<Segment>, trip: Results, currency: string) => {
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
    setState({
      ...state,
      flightResultsPathComponents: flightResultsPathComponents,
      fareRulesPreviewComponents: fareRulesPreviewComponents}
    );
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
      className={
        clsx(classes.list, {
          [classes.fullList]: anchor === 'top' || anchor === 'bottom',
        })
      }
      role="presentation"
    >
      <div className="flight-details-drawer">
        <div className="d-flex">
          <h1>Booking Overview</h1>
          <div className="ml-auto">
            <IconButton onClick={() => setState({...state, [anchor]: false})}>
              <CloseIcon fontSize="large" />
            </IconButton>
          </div>
        </div>
        <Divider />
        <div className="row flight-details-container">
          <div className="col-lg-6">
            <h5>Flight Details</h5>
            <div className="flight-details">
              <Timeline>
                {state.flightResultsPathComponents.map((flightResultsPath: FlightResultsPath, index: number) =>
                  <TimelineItem classes={{missingOppositeContent: classes.root}}>
                    <TimelineSeparator>
                      <TimelineDot />
                      {index !== state.flightResultsPathComponents.length - 1 && <TimelineConnector/>}
                    </TimelineSeparator>
                    <TimelineContent>
                      <div>
                        <div className='text-bold'>{getSegmentDateString(index)}</div>
                        {flightResultsPath}
                      </div>
                    </TimelineContent>
                  </TimelineItem>
                )}
              </Timeline>
            </div>
          </div>
          <div className="col-lg-6">
            <h5>Fare Details</h5>
            <div className="fare-details">
              {
                state.fareRulesPreviewComponents.map((fareRulesPreview: FareRulesPreview, index: number) =>
                  <div>
                    {fareRulesPreview}
                    {getFareRulesBookingDetailsHTML(index)}
                  </div>
                )
              }
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-12'>
            <div onClick={
              () => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to top</div>
          </div>
        </div>
      </div>
    </div>
  );

  const getSegmentDateString = (index: number) => {
    const segment: Segment = props.selectedTrip[index];
    const flightDetails: FlightResultsDetails | undefined = getFlightResultByRef(segment.flights[0].flight_detail_ref)
    return (
        <Moment format="MMM, DD YYYY">{flightDetails ? flightDetails.departure_time: ''}</Moment>
    )
  }

  const getFareRulesBookingDetailsHTML = (index: number) => {
    const segment: Segment = props.selectedTrip[index];
    return (
      <div className="row">
        <div className='text-bold'>Booking Details: </div>
        <div className='text-small'>{segment.flights[0].fare_type}, {firstLetterCapital(segment.source)}</div>
      </div>
    )
  }

  const getFlightResultByRef = (ref: string) => props.trip.flight_details.find((flight: FlightResultsDetails) =>
      flight.reference === ref
  );

  useEffect(()=>{
    setFlightComponents(props.selectedTrip, props.trip, props.currency);
  }, []);

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