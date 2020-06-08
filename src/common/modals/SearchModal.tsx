import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import FlightPath from '../../trip/search/TripPath';
import { Flight } from '../../trip/search/SearchInterfaces';
import './Modals.css';

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
    },
    backDrop: {
      height: '100vh'
    }
  }),
);

interface SearchModalProps {
  loading: boolean
  flights: Array<Flight>
}

export default function SearchModal(props: SearchModalProps) {
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
          <div className={classes.paper + ' centeredContainer'}>
            <h2 id="transition-modal-title">Finding the best route and flight options</h2>
            <div>
              <CircularProgress />
            </div>
            <FlightPath flights={props.flights}/>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}