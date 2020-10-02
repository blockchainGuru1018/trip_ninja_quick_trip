import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { useEffect } from 'react';
import { Errors } from '../../trip/results/ResultsInterfaces';
import './Modals.css';
import SearchErrorModal from './SearchErrorModal';
import PricingErrorModal from './PricingErrorModal';
import BookingErrorModal from './BookingErrorModal';
import QueueingErrorModal from './QueueingErrorModal';
import CancellingErrorModal from './CancellingErrorModal';
import TicketingErrorModal from './TicketingErrorModal';
import { setErrorDetails } from '../../actions/ResultsActions';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(() =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh'
    },
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

interface DefaultErrorModalProps {
  errors: Errors;
  setErrorDetails: typeof setErrorDetails;
}

export default function DefaultErrorModal(props: DefaultErrorModalProps) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [ t ] = useTranslation('common');
  useEffect(() => setOpen(props.errors.errorFound), [props.errors.errorFound]);

  const errorModalMap = new Map ()
    .set('search', <SearchErrorModal setErrorDetails={props.setErrorDetails}/>)
    .set('pricing', <PricingErrorModal setErrorDetails={props.setErrorDetails}/>)
    .set('booking', <BookingErrorModal setErrorDetails={props.setErrorDetails}/>)
    .set('queueing', <QueueingErrorModal setErrorDetails={props.setErrorDetails}/>)
    .set('ticketing', <TicketingErrorModal setErrorDetails={props.setErrorDetails}/>)
    .set('cancelling', <CancellingErrorModal setErrorDetails={props.setErrorDetails}/>);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={() => props.setErrorDetails(false, props.errors.errorType)}
      >
        <div className={classes.paper + ' centered-container'}>
          {props.errors.errorType ? errorModalMap.get(props.errors.errorType) : <div></div>}
        </div>        
      </Modal>
    </div>
  );
}