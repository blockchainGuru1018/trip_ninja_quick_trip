import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import './Modals.css';
import Button from '@material-ui/core/Button';
import { setErrorDetails } from '../../actions/ResultsActions';

const useStyles = makeStyles(() =>
  createStyles({
    paper: {
      background: '#FFFFFF 0% 0% no-repeat padding-box',
      boxShadow: '0px 3px 6px #00000029',
      border: '1px solid #ECEEEF',
      borderRadius: '5px',
      top: '142px',
      left: '130px',
      width: '640px',
      height: '250px'
    }
  }),
);

interface TicketingErrorModalProps {
  setErrorDetails: typeof setErrorDetails;
}

export default function TicketingErrorModal(props: TicketingErrorModalProps) {
  const classes = useStyles();

  return (
    <div className={classes.paper + ' centered-container'}>
      <h2 id="transition-modal-title" className='search-modal-title'>Queuing failed</h2>
      <div className='search-modal-text-container'>
        <p>
          There was an error ticketing this itinerary, please try again later.
        </p>
        <Button
          onClick={() => (props.setErrorDetails(false, 'ticketing'))}
          color='secondary'
          variant="contained"
          style={{display: 'grid', margin: 'auto'}}>
          Return to Booking Overview
        </Button>
      </div>
    </div>
  );
}