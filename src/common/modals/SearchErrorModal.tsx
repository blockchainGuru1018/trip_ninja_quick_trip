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
      height: '336px'
    }
  }),
);

interface SearchErrorModalProps {
  setErrorDetails: typeof setErrorDetails;
}

export default function SearchErrorModal(props: SearchErrorModalProps) {
  const classes = useStyles();

  return (
    <div className={classes.paper + ' centered-container'}>
      <h2 id="transition-modal-title" className='search-modal-title'>No Flights Found</h2>
      <div className='search-modal-text-container'>
        <p>
          There were no flights found for your search. Please try a different search.
        </p>
        <p>
          For more information on what might have gone wrong, head to our
          <a href="https://help.tripninja.io/" style={{color: '#00B4C3'}}> Knowledege Base</a>
          . You can always reach out to our support team at support@tripninja.io
          for assistance.
        </p>
        <Button
          onClick={() => (props.setErrorDetails(false, 'search'))}
          color='secondary'
          variant="contained"
          style={{display: 'grid', margin: 'auto'}}>
          Return to Search
        </Button>
      </div>
    </div>
  );
}