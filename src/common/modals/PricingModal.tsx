import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import './Modals.css';

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
      width: '800px',
      height: 'auto'
    },
    backDrop: {
      height: '100vh'
    }
  }),
);

interface PricingModalProps {
  loading: boolean
}

export default function PricingModal(props: PricingModalProps) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  useEffect(() => setOpen(props.loading), [props.loading]);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        closeAfterTransition
        BackdropComponent={() => <Backdrop open={open} className={classes.backDrop} />}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper + ' centered-container search-modal-container'}>
            <h2 id="transition-modal-title" className='search-modal-title'>Confirming your flights</h2>
            <div>
              <CircularProgress />
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}