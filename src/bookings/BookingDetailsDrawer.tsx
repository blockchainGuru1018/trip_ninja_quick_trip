import React from 'react';
import clsx from 'clsx';
import { makeStyles, styled } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import FareBreakdown from '../trip/book/FareBreakdown';
import PassengerDetails from './PassengerDetails';
import ManageBooking from './ManageBooking';
import { PricingDetails, defaultPricingDetails} from '../trip/results/PricingInterfaces';


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

}

export default function BookingDetailsDrawer(props: BookingsDetailsDrawerProps) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

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
      <div className="booking-details-container">
        <div className="booking-details-section">
          <h1>Booking Overview - Status: [import it here]</h1>
        </div> 
        <Divider />
        <div className="booking-details-section">
          <ManageBooking />   
        </div>
        <Divider />
        <div className="booking-details-section">
          <h5 className="section-header">Jump To</h5>
          <div className="row">
            <div className="col-sm-12 no-pad-left">
              <NavButton onClick={() => document.getElementsByClassName('MuiDrawer-paper')[0].scrollTop = 0}>
                Overview
              </NavButton>
              <NavButton onClick={() => document.getElementsByClassName('MuiDrawer-paper')[0].scrollTop = 0}>
                Booking Cost
              </NavButton>
              <NavButton onClick={() => document.getElementsByClassName('MuiDrawer-paper')[0].scrollTop = 0}>
                Flight Overview
              </NavButton>
              <NavButton onClick={() => document.getElementsByClassName('MuiDrawer-paper')[0].scrollTop = 0}>
                Passenger Information
              </NavButton>
            </div>
          </div>
        </div>
        <Divider />
        <div className="booking-details-section">
          <h5 className="section-header">Overview</h5>
          <div className="row">
            <div className="col-sm-3 no-pad-left">
              <p>
                <span className="text-bold">Booking Agent: </span> 
                <span>agent name (agent email)</span>
              </p>
            </div>
            <div className="col-sm-3">
              <p>
                <span className="text-bold">Team: </span> 
                <span>team name</span>
              </p>
            </div>
          </div>
        </div>
        <Divider />
        <div className="row booking-details-section">
          <div className="col-sm-4 no-pad-left">
            <FareBreakdown pricingDetails={defaultPricingDetails} />
          </div>
        </div>
        <Divider />
        <div className="booking-details-section">
          <PassengerDetails />
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
    </div>
  );

  return (
    <div>
      {(['right'] as Anchor[]).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>Open Details</Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
