import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FareRulesPreview from './FareRulesPreview';
import FlightResultsPath from './FlightResultsPath';
import SelfTransferLabel from './SelfTransferLabel';
import { FlightResultsDetails, Results, Segment } from '../trip/results/ResultsInterfaces';
import { getFlightDetailsBySegment } from '../helpers/FlightDetailsHelper';
import { firstLetterCapital } from "../helpers/MiscHelpers";
import { BookingSegment, BookingItinerary } from '../bookings/BookingsInterfaces';
import {Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator
} from "@material-ui/lab";
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import localeMap from '../localeMap';
import { format } from 'date-fns';

const useStyles = makeStyles({
  root: {
    minHeight: '250px'
  },
});

interface ItineraryDetailsProps {
  selectedTrip?: Array<Segment>;
  bookedTrip?: Array<BookingItinerary>;
  trip?: Results;
  currency: string;
  pricingDisplay?: boolean;
}

export default function ItineraryDetails(props: ItineraryDetailsProps) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    flightResultsPathComponents:  [] as  any,
    fareRulesPreviewComponents: [] as any,
  });
  const [bookedTripSegments, setBookedTripSegments] = React.useState([] as Array<BookingSegment>);
  const [ t ] = useTranslation('common');

  const setPricingFlightComponents = (selectedTrip: Array<Segment>, trip: Results, currency: string) => {
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
        index={index}
        bookingDrawer={true}
      />);
    });
    return {flightResultsPathComponents: flightResultsPathComponents,
      fareRulesPreviewComponents: fareRulesPreviewComponents};
  };

  const setBookingFlightComponents = (selectedTrip: Array<BookingItinerary>, currency: string) => {
    let flightResultsPathComponents: Array<JSX.Element> = [];
    let fareRulesPreviewComponents: Array<JSX.Element> = [];
    let bookedSegments: Array<BookingSegment> = [];
    if (selectedTrip) {
      selectedTrip.forEach((itinerary: BookingItinerary, itineraryIndex: number) => {
        itinerary.segments.forEach((segment: BookingSegment, index: number) => {
          bookedSegments[segment.segment_id] = segment;
          flightResultsPathComponents[segment.segment_id] = <FlightResultsPath
            flightDetails={segment.flight_details}
            key={index}
          />;
          fareRulesPreviewComponents[segment.segment_id] = <FareRulesPreview
            bookingSegment={segment}
            flightDetails={segment.flight_details}
            currency={currency}
            itineraryDisplay={true}
            index={index}
            bookingDrawer={true}
          />;
        });
      });
    }
    setBookedTripSegments(bookedSegments);
    return {flightResultsPathComponents: flightResultsPathComponents,
      fareRulesPreviewComponents: fareRulesPreviewComponents};
  };

  const getSegmentDateString = (index: number) => {
    const flightDetails: FlightResultsDetails | undefined = props.selectedTrip 
      ? getFlightResultByRef(props.selectedTrip[index].flights[0].flight_detail_ref)
      : bookedTripSegments[index].flight_details[0];
    return (
      <p>{flightDetails ? format(new Date(flightDetails.departure_time), t('common.itineraryDetails.dateFormat'), {locale:localeMap[i18n.language]}) : ''}</p>
    );
  };

  const getFareRulesBookingDetailsHTML = (index: number) => {
    const segment: Segment = props.selectedTrip![index];
    return (
      <div className="row">
        <div className='text-bold booking-details-text-container'>{t('common.itineraryDetails.bookingDetailsHeader')}:
          <span className='text-small'>
            &nbsp;{segment.flights[0].fare_type} • {firstLetterCapital(segment.source)} • {segment.credential_info.pcc}
          </span>
        </div>
      </div>
    );
  };

  const getFlightResultByRef = (ref: string) => props.trip!.flight_details.find((flight: FlightResultsDetails) =>
    flight.reference === ref
  );

  const getViSelfTransferLabel = (selectedTrip: Array<Segment>, index: number) => {
    let firstViFlight = getFlightResultByRef(selectedTrip[index].flights[0].flight_detail_ref);
    let secondViFlight = getFlightResultByRef(selectedTrip[index+1].flights[0].flight_detail_ref);
    return(firstViFlight && secondViFlight && 
    <SelfTransferLabel 
      destinationName={selectedTrip[index].destination_name}
      firstFlight={firstViFlight}
      secondFlight={secondViFlight}
    />);
  };

  useEffect(() => setState(props.selectedTrip 
    ? setPricingFlightComponents(props.selectedTrip, props.trip!, props.currency)
    : setBookingFlightComponents(props.bookedTrip!, props.currency)), 
  [props.selectedTrip, props.trip, props.currency, props.bookedTrip]);


  return (
    <div className={props.pricingDisplay ? 'flight-details-drawer' : ''}>
      <div className={'row ' + (props.pricingDisplay ? 'flight-details-container' : '')}>
        <div className="col-lg-6 booking-details-info-container">
          <h5>{t('common.itineraryDetails.flightDetailsHeader')}</h5>
          <div className="flight-details">
            {state.flightResultsPathComponents.length === 0 &&
            <div className="row">
              <p>{t('common.itineraryDetails.informationNotAvailable')}</p>
            </div>
            }
            <Timeline>
              {state.flightResultsPathComponents.map((flightResultsPath: FlightResultsPath, index: number) =>
                <TimelineItem classes={{root: classes.root}} key={index.toString()}>
                  <TimelineSeparator>
                    <TimelineDot color="primary"/>
                    {index !== state.flightResultsPathComponents.length - 1 && <TimelineConnector/>}
                  </TimelineSeparator>
                  <TimelineContent>
                    <div>
                      {props.selectedTrip && props.selectedTrip[index].vi_position !== 1 &&
                      <div className='text-bold booking-drawer-flight-departure-date'>{getSegmentDateString(index)}</div>
                      }
                      {flightResultsPath}
                      {props.selectedTrip && props.selectedTrip[index].virtual_interline && props.selectedTrip[index].vi_position === 0 &&
                        getViSelfTransferLabel(props.selectedTrip, index)
                      }
                    </div>
                  </TimelineContent>
                </TimelineItem>
              )}
            </Timeline>
          </div>
        </div>
        <div className="col-lg-6 booking-details-info-container">
          <h5>{t('common.itineraryDetails.fareDetailsHeader')}</h5>
          <div className="fare-details">
            {
              state.fareRulesPreviewComponents.map((fareRulesPreview: typeof FareRulesPreview, index: number) =>
                <div className='fare-rules-preview-container' key={index.toString()}>
                  {fareRulesPreview}
                  {props.pricingDisplay && getFareRulesBookingDetailsHTML(index)}
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}
