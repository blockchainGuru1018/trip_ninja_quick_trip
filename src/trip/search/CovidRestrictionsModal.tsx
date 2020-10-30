import React, { useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

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
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

export default function SimpleModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk-sandbox.joinsherpa.io/widget.js?affiliateId=tripninja";
    script.async = true;
    document.body.appendChild(script);
  }, []);
  function onSherpaEvent(event: any) {
    console.log(event);
  }
  
  const widgetOptions = {
    "requirementsApiKey": "AIzaSyCspi4awT4hipRKu79jdZ0upRLJwBXeeG4",
    "affiliateId": "tripninja",
    "defaultNationalityCountry": "GBR",
    "finalAirportName": "",
    "language": "en",
    "currency": "USD",
    "itinerary":  [{
      "originCountry": "LON",
      "destinationCountry": "USA",
    }],
    "travellers": [{
      "displayName": "Mr Smith",
      "nationality": "GBR"
    }]
  };
  onSherpaEvent(widgetOptions);
  //CREATEWIDGET(widgetOptions);
  $sherpa.V1.createWidget(widgetOptions);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div id="sherpa-widget"></div>
    </div>
  );

  return (
    <div>
      <button type="button" onClick={handleOpen} >
        Travel Restrictions
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
