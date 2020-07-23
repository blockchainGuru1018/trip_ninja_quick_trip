import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FareRulesPreview from '../trip/results/FareRulesPreview';
import FlightResultsPath from '../trip/results/FlightResultsPath';
import { FlightResultsDetails, Results, Segment } from '../trip/results/ResultsInterfaces';
import { getFlightDetailsBySegment } from '../helpers/FlightDetailsHelper';
import Moment from "react-moment";
import { firstLetterCapital } from "../helpers/MiscHelpers";
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
    minHeight: '250px'
  },
});

interface ItineraryDetailsProps {
  selectedTrip: Array<Segment>;
  trip: Results;
  currency: string;
}

export default function ItineraryDetails(props: ItineraryDetailsProps) {
  const classes = useStyles();
  const [state, setState] = React.useState({
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
        bookingDrawer={true}
      />);
    });
    setState({
      ...state,
      flightResultsPathComponents: flightResultsPathComponents,
      fareRulesPreviewComponents: fareRulesPreviewComponents}
    );
  };



  const getSegmentDateString = (index: number) => {
    const segment: Segment = props.selectedTrip[index];
    const flightDetails: FlightResultsDetails | undefined = getFlightResultByRef(segment.flights[0].flight_detail_ref);
    return (
      <Moment format="dddd, MMM DD">{flightDetails ? flightDetails.departure_time: ''}</Moment>
    );
  };

  const getFareRulesBookingDetailsHTML = (index: number) => {
    const segment: Segment = props.selectedTrip[index];
    return (
      <div className="row">
        <div className='text-bold booking-details-text-container'>Booking Details:
          <span className='text-small'>&nbsp;{segment.flights[0].fare_type}•{firstLetterCapital(segment.source)}</span>
        </div>
      </div>
    );
  };

  const getFlightResultByRef = (ref: string) => props.trip.flight_details.find((flight: FlightResultsDetails) =>
    flight.reference === ref
  );

  useEffect(()=>{
    setFlightComponents(props.selectedTrip, props.trip, props.currency);
  }, []);

  return (
    <div className="flight-details-drawer">
      <div className="row flight-details-container">
        <div className="col-lg-6 booking-details-info-container">
          <h5>Flight Details</h5>
          <div className="flight-details">
            <Timeline>
              {state.flightResultsPathComponents.map((flightResultsPath: FlightResultsPath, index: number) =>
                <TimelineItem classes={{root: classes.root}}>
                  <TimelineSeparator>
                    <TimelineDot color="primary"/>
                    {index !== state.flightResultsPathComponents.length - 1 && <TimelineConnector/>}
                  </TimelineSeparator>
                  <TimelineContent>
                    <div>
                      <div className='text-bold booking-drawer-flight-departure-date'>{getSegmentDateString(index)}</div>
                      {flightResultsPath}
                    </div>
                  </TimelineContent>
                </TimelineItem>
              )}
            </Timeline>
          </div>
        </div>
        <div className="col-lg-6 booking-details-info-container">
          <h5>Fare Details</h5>
          <div className="fare-details">
            {
              state.fareRulesPreviewComponents.map((fareRulesPreview: FareRulesPreview, index: number) =>
                <div className='fare-rules-preview-container'>
                  {fareRulesPreview}
                  {getFareRulesBookingDetailsHTML(index)}
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}