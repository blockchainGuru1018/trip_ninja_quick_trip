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

interface CancellingErrorModalProps {
  setErrorDetails: typeof setErrorDetails;
}

export default function CancellingErrorModal(props: CancellingErrorModalProps) {
  const classes = useStyles();

  return (
    <div className={classes.paper + ' centered-container'}>
      <h2 id="transition-modal-title" className='search-modal-title'>Cancellation failed</h2>
      <div className='search-modal-text-container'>
        <p>
          There was an error cancelling this itinerary, please try again later or cancel directly with data source.
        </p>
        <Button
          onClick={() => (props.setErrorDetails(false, 'cancelling'))}
          color='secondary'
          variant="contained"
          style={{display: 'grid', margin: 'auto'}}>
          Return to Booking Overview
        </Button>
      </div>
    </div>
  );
}