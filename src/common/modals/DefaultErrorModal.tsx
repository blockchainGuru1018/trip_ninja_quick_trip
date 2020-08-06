import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { useEffect } from 'react';
import { Errors } from '../../trip/results/ResultsInterfaces';
import './Modals.css';
import SearchErrorModal from './SearchErrorModal';
import PricingErrorModal from './PricingErrorModal';
import QueueingErrorModal from './QueueingErrorModal';
import CancellingErrorModal from './CancellingErrorModal';
import { setErrorDetails } from '../../actions/ResultsActions';

const useStyles = makeStyles(() =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh'
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

  useEffect(() => setOpen(props.errors.errorFound), [props.errors.errorFound]);

  const errorModalMap = new Map ()
    .set('search', <SearchErrorModal setErrorDetails={props.setErrorDetails}/>)
    .set('pricing', <PricingErrorModal setErrorDetails={props.setErrorDetails}/>)
    .set('queueing', <QueueingErrorModal setErrorDetails={props.setErrorDetails}/>)
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
        {errorModalMap.get(props.errors.errorType)}
      </Modal>
    </div>
  );
}