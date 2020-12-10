import React from 'react';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Segment } from "../results/ResultsInterfaces";
import { PassengerInfo } from './BookInterfaces';
import { useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(() =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
    },
    paper: {
      background: '#FFFFFF 0% 0% no-repeat padding-box',
      boxShadow: '0px 3px 6px #00000029',
      border: '1px solid #ECEEEF',
      outlineColor: '#ffffff',
      borderRadius: '5px',
      top: '142px',
      left: '130px',
      width: '1000px',
      height: 'auto',
      padding: '25px'
    },
    backDrop: {
      height: '100vh'
    }
  }),
);

interface AdditionalBaggageModalProps {
  modalOpen: boolean,
  setModalOpen: any,
  activeSegments: Array<Segment>
  passengers: Array<PassengerInfo>
}

export default function AdditionalBaggageModal(props: AdditionalBaggageModalProps) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [ t ] = useTranslation('common');
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => setOpen(props.modalOpen), [props.modalOpen]);

  return(
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        closeAfterTransition
        hideBackdrop
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <IconButton aria-label="close-passenger-modal" className="float-right" onClick={() => (props.setModalOpen())}>
              <CloseIcon />
            </IconButton>
            <h3 id="transition-modal-title">Additional Baggage</h3>
            <div className="row">
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
              >
                {props.passengers.map((passenger: PassengerInfo) => {
                  return <Tab label={passenger.updated ? passenger.first_name + ' ' + passenger.last_name : t("commonWords.passengerTypes." + passenger.passenger_type)} />;
                })}
              </Tabs>
              <div className="add-baggage-container">
                {props.activeSegments.map((segment: Segment) => {
                  return <h5>{segment.origin}-{segment.destination}</h5>;
                })}
                
                <p>Checked Baggage</p>
                <div className="baggage-option">
                  <span>1pc</span>
                  <span>Included</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <Button
                color="secondary"
                variant="contained"
                size="large"
                disableElevation
                onClick={() => () => (props.setModalOpen())}
              >
                {t('book.passengerDetailsModal.save')}
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
