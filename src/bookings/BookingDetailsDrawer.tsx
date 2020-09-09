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
import { cancelBooking, queueBooking } from '../actions/BookingsActions';
import { AuthDetails } from '../auth/AuthInterfaces';

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

  const checkBookingDetails = () => {
    const promise = new Promise((resolve) => {
      resolve(props.getBookingDetails(props.booking.trip_id));
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
      console.log(bookingDetails);
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
          <h3>Unable to load booking details.</h3>
          <p>Please contact support if the problem persists.</p>
          <Button onClick={() => handleClose(anchor)} 
            variant="contained" 
            color="primary"
          >
            OK
          </Button>
        </div>
      }
      {props.loading &&
        <div className="booking-details-loading">
          <h2>Loading Booking Details..</h2>
          <div>
            <CircularProgress />
          </div>
        </div>
      }
      {!props.loading && bookingDetails &&
        <div className="booking-details-container">
          <div className="row booking-details-section">
            <h1>Booking Overview - Status: {firstLetterCapital(props.booking.status)}</h1>
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
              authDetails={props.authDetails}
              booking={props.booking}
            />
          </div> 
          <Divider />
          <div className="booking-details-section">
            <h5 className="section-header">Jump To</h5>
            <div className="row">
              <div className="col-sm-12 no-pad-left">
                <NavButton href="#overview">
                  Overview
                </NavButton>
                <NavButton href="#booking-cost">
                  Booking Cost
                </NavButton>
                <NavButton href="#flight-overview">
                  Flight Overview
                </NavButton>
                <NavButton href="#passenger-info">
                  Passenger Information
                </NavButton>
              </div>
            </div>
          </div>
          <Divider />
          <div className="booking-details-section" id="overview">
            <h5 className="section-header">Overview</h5>
            <div className="row">
              <div className="col-sm-3 no-pad-left">
                <p>
                  <span className="text-bold">Booking Agent: </span> 
                  <span>{props.booking.agent_email}</span>
                </p>
              </div>
              <div className="col-sm-3">
                <p>
                  <span className="text-bold">Team: </span> 
                  <span>{props.booking.agency ? firstLetterCapital(props.booking.agency) : '-'}</span>
                </p>
              </div>
            </div>
          </div>
          <Divider />
          <div className="row booking-details-section" id="booking-cost">
            <div className="col-sm-4 no-pad-left">
              <FareBreakdown 
                pricing={props.booking.details!.pricing}
                currency={props.booking.currency}
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
                Back to top
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
