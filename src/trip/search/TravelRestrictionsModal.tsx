import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';

declare global {
  interface Window {
      $sherpa:any;
  }
}

const TravelRestrictionsButton = styled(Button)({
  color: 'var(--tertiary)',
  textDecoration: 'underline',
  '&:hover': {
    backgroundColor: '#ffffff',
    opacity: '0.7'
  }
});

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 1100,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

export default function TravelRestrictionsModal() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const widgetOptions = {
    "requirementsApiKey": "AIzaSyCspi4awT4hipRKu79jdZ0upRLJwBXeeG4",
    "affiliateId": "tripninja",
    "defaultNationalityCountry": "GBR",
    "finalAirportName": "",
    "language": "en",
    "currency": "USD",
    "itinerary":  [{
      "originCountry": "CAN",
      "destinationCountry": "USA",
    }],
    "travellers": [{
      "displayName": "Mr Smith",
      "nationality": "GBR"
    }]
  };

  const handleOpen = () => {
    setOpen(true);
    const sherpa = window.$sherpa;
    sherpa.V1.createWidget(widgetOptions);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="travel-restrictions-container">
      <TravelRestrictionsButton type="button" onClick={handleOpen} size="small">
        Travel Restrictions
      </TravelRestrictionsButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        keepMounted
      >
        <div style={modalStyle} className={classes.paper}>
          <div id="sherpa-widget" className="sherpa-widget"></div>
          <Button
            disableElevation
            onClick={() => handleClose()}
            color='secondary'
            variant="contained"
            style={{display: 'grid', margin: 'auto'}}>
            Close
          </Button>
        </div>    
      </Modal>
    </div>
  );
}
