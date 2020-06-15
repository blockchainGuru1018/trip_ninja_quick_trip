import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { useEffect } from 'react';
import { Errors } from '../../trip/results/ResultsInterfaces';
import './Modals.css';
import { setErrorDetails } from '../../actions/ResultsActions';

const useStyles = makeStyles((theme: Theme) =>
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
      width: '1107px',
      height: '482px'
    }
  }),
);

interface ErrorModalProps {
  errors: Errors;
  setErrorDetails: typeof setErrorDetails;
}

export default function ErrorModal(props: ErrorModalProps) {
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
        onClose={() => props.setErrorDetails(false)}
      >
        <div className={classes.paper + ' centeredContainer'}>
          <h2 id="transition-modal-title">Unable to find flights for your search.</h2>
        </div>
      </Modal>
    </div>
  );
}