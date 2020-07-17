import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { useEffect } from 'react';
import { Errors } from '../../trip/results/ResultsInterfaces';
import './Modals.css';
import SearchErrorModal from './SearchErrorModal';
import PricingErrorModal from './PricingErrorModal';
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

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={() => props.setErrorDetails(false, props.errors.errorType)}
      >
        {
          props.errors.errorType === 'search'
            ? <SearchErrorModal setErrorDetails={props.setErrorDetails}/>
            : <PricingErrorModal setErrorDetails={props.setErrorDetails}/>
        }
      </Modal>
    </div>
  );
}