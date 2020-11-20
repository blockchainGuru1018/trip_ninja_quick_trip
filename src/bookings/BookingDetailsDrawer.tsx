import React from 'react';
import clsx from 'clsx';
import { makeStyles, styled } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import FareBreakdown from '../common/FareBreakdown';
import PassengerDetails from './PassengerDetails';
import ManageBooking from './ManageBooking';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Booking, PnrInfo } from './BookingsInterfaces';
import ItineraryDetails from '../common/ItineraryDetails';
import { getBookingDetails } from '../actions/BookingsActions';
import { firstLetterCapital } from '../helpers/MiscHelpers';
import { cancelBooking, queueBooking, ticketBooking } from '../actions/BookingsActions';
import { AuthDetails } from '../auth/AuthInterfaces';
import { useTranslation } from 'react-i18next';
import CancelRulesBreakdown from '../common/CancelRulesBreakdown';

const NavButton = styled(Button)({
  color: 'var(--tertiary)',
  marginRight: '25px'
});

const useStyles = makeStyles({
  list: {
    width: '90vw',
  },
  fullList: {
    width: 'auto',
  },
});

type Anchor = 'top' | 'left' | 'bottom' | 'right';

interface BookingsDetailsDrawerProps {
  booking: Booking;
  getBookingDetails: typeof getBookingDetails;
  cancelBooking: typeof cancelBooking;
  queueBooking: typeof queueBooking;
  ticketBooking: typeof ticketBooking;
  authDetails: AuthDetails;
  loading: boolean;
}

export default function BookingDetailsDrawer(props: BookingsDetailsDrawerProps) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [selected, setSelected] = React.useState(false);
  const [bookingDetails, setBookingDetails] = React.useState(false);
  const [detailsError, setBookingDetailsError] = React.useState(false);
  const [ t ] = useTranslation('common');

  const checkBookingDetails = () => {
    const agency = props.authDetails.isAgencyAdmin ? '?agency=' + props.authDetails.agency : '';
    const promise = new Promise((resolve) => {
      resolve(props.getBookingDetails(props.booking.trip_id, agency));
    });
    promise.then((result: any) => {
      if(result.success) {
        setBookingDetails(result);
      } else {
        setBookingDetailsError(true);
      }
    });
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
    if (open) {
      checkBookingDetails();
      setSelected(true);
    } else {
      setSelected(false);
    }
    
    setState({ ...state, [anchor]: open });
  };

  const bookingDetailsComponent = (anchor: Anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
    >
      {detailsError &&
        <div className="booking-details-loading">
          <h3>{t('bookings.bookingDetailsDrawer.loadingErrorTitle')}</h3>
          <p>{t('bookings.bookingDetailsDrawer.loadingErrorBody')}</p>
          <Button onClick={() => handleClose(anchor)} 
            variant="contained" 
            color="primary"
          >
            {t('bookings.bookingDetailsDrawer.loadingErrorButton')}
          </Button>
        </div>
      }
      {props.loading &&
        <div className="booking-details-loading">
          <h3>{t('bookings.bookingDetailsDrawer.loadingMessage')}</h3>
          <div>
            <CircularProgress />
          </div>
        </div>
      }
      {!props.loading && bookingDetails &&
        <div className="booking-details-container">
          <div className="row booking-details-section">
            <h1>{t('bookings.bookingDetailsDrawer.title')} {firstLetterCapital(t('commonWords.status.' + props.booking.status))}</h1>
            <div className="close-button-container">
              <IconButton onClick={() => handleClose(anchor)}>
                <CloseIcon fontSize="large" />
              </IconButton>
            </div>
          </div> 
          <Divider />
          <div className="booking-details-section">
            <ManageBooking
              status={props.booking.status} 
              trip_id={props.booking.trip_id}
              cancelBooking={props.cancelBooking}
              queueBooking={props.queueBooking}
              ticketBooking={props.ticketBooking}
              authDetails={props.authDetails}
              booking={props.booking}
            />
          </div> 
          <Divider />
          <div className="booking-details-section">
            <h5 className="section-header">{t('bookings.bookingDetailsDrawer.navigationTitle')}</h5>
            <div className="row">
              <div className="col-sm-12 no-pad-left">
                <NavButton href="#overview">
                  {t('bookings.bookingDetailsDrawer.overviewNav')}
                </NavButton>
                <NavButton href="#booking-cost">
                  {t('bookings.bookingDetailsDrawer.bookingCostNav')}
                </NavButton>
                <NavButton href="#flight-overview">
                  {t('bookings.bookingDetailsDrawer.flightOverviewNav')}
                </NavButton>
                <NavButton href="#passenger-info">
                  {t('bookings.bookingDetailsDrawer.passengerInformationNav')}
                </NavButton>
              </div>
            </div>
          </div>
          <Divider />
          <div className="booking-details-section" id="overview">
            <h5 className="section-header">{t('bookings.bookingDetailsDrawer.overviewTitle')}</h5>
            <div className="row">
              <div className="col-sm-3 no-pad-left">
                <p>
                  <span className="text-bold">{t('bookings.bookingDetailsDrawer.bookingAgent')}: </span> 
                  <span>{props.booking.agent_email}</span>
                </p>
              </div>
              <div className="col-sm-3">
                <p>
                  <span className="text-bold">{t('bookings.bookingDetailsDrawer.team')}: </span> 
                  <span>{props.booking.agency ? firstLetterCapital(props.booking.agency) : '-'}</span>
                </p>
              </div>
            </div>
          </div>
          <Divider />
          <div className="row booking-details-section" id="booking-cost">
            <div className="col-sm-6 no-pad-left">
              <FareBreakdown
                pricing={props.booking.details!.pricing}
                currency={props.booking.currency}
                markupVisible={props.authDetails.markupVisible}
                itineraries={props.booking.details?.itinerary}
              />
            </div>
            <div className="col-sm-6">
              <CancelRulesBreakdown
                price={props.booking.details!.pricing.confirmed_total_price}
                currency={props.booking.currency}
                itineraries={props.booking.details?.itinerary}
                tripMarkup={props.booking.details ? props.booking.details.pricing.markup : 0}
              />
            </div>
          </div>
          <Divider />
          <div className="booking-details-section" id="flight-overview">
            <ItineraryDetails 
              bookedTrip={props.booking.details!.itinerary}
              currency={props.booking.currency}/>
          </div>
          <Divider />
          <div className="booking-details-section" id="passenger-info">
            <PassengerDetails passengers={props.booking.details!.passengers} />
          </div>
          <Divider />
          <div className="row">
            <div className="col-lg-2 offset-lg-5">
              <NavButton 
                onClick={() => document.getElementsByClassName('MuiDrawer-paper')[0].scrollTop = 0}
                size="large"
              >
                {t('bookings.bookingDetailsDrawer.backToTop')}
              </NavButton>
            </div>
          </div>
        </div>
      }
    </div>
  );

  const getPnrList = (pnrList: Array<PnrInfo>) => {
    let pnrString = "";
    pnrList.forEach((pnr: PnrInfo, index: number) => pnrString += index !== (pnrList.length - 1)
      ? `${pnr.pnr_number}, `
      : pnr.pnr_number
    );
    return pnrString;
  };

  const handleClose = (anchor: Anchor) => {
    setState({...state, [anchor]: false});
    setSelected(false);
  };

  return (
    <div>
      {(['right'] as Anchor[]).map((anchor) => (
        <React.Fragment key={anchor}>
          <NavButton onClick={toggleDrawer(anchor, true)}>{getPnrList(props.booking.pnr_list)}</NavButton>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {selected && bookingDetailsComponent(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
