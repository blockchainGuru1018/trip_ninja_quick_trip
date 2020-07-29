import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FareRulesPreview from '../trip/results/FareRulesPreview';
import FlightResultsPath from '../trip/results/FlightResultsPath';
import { FlightResultsDetails } from '../trip/results/ResultsInterfaces';
import { BookingSegment, BookingItinerary } from './BookingsInterfaces';
import Moment from "react-moment";
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

interface BookingItineraryDetailsProps {
  selectedTrip: Array<BookingItinerary>;
  currency: string;
}

export default function BookingItineraryDetails(props: BookingItineraryDetailsProps) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    flightResultsPathComponents:  [] as  any,
    fareRulesPreviewComponents: [] as any
  });

  const setFlightComponents = (selectedTrip: Array<BookingItinerary>, currency: string) => {
    let flightResultsPathComponents: Array<JSX.Element> = [];
    let fareRulesPreviewComponents: Array<JSX.Element> = [];
    selectedTrip.forEach((itinerary: BookingItinerary, index: number) => {
      itinerary.segments.forEach((segment: BookingSegment, index: number) => {
        flightResultsPathComponents.push(<FlightResultsPath
          flightDetails={segment.flight_details}
          key={index}
        />);
        fareRulesPreviewComponents.push();
      });
    });
    setState({
      ...state,
      flightResultsPathComponents: flightResultsPathComponents,
      fareRulesPreviewComponents: fareRulesPreviewComponents}
    );
  };

  const getSegmentDateString = (index: number) => {
    const flightDetails: FlightResultsDetails | undefined = props.selectedTrip[index].segments[0].flight_details[0];
    return (
      <Moment format="dddd, MMM DD">{flightDetails ? flightDetails.departure_time: ''}</Moment>
    );
  };

  useEffect(()=>{
    setFlightComponents(props.selectedTrip, props.currency);
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-lg-6 booking-details-info-container">
          <h5>Flight Details</h5>
          <div className="flight-details">
            <Timeline>
              {state.flightResultsPathComponents.map((flightResultsPath: FlightResultsPath, index: number) =>
                <TimelineItem classes={{root: classes.root}} key={index.toString()}>
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
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}