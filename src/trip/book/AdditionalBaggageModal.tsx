import React from 'react';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Segment } from "../results/ResultsInterfaces";
import { PricedItinerary, SegmentPricingInfo, AdditionalBaggage } from '../results/PricingInterfaces';
import { PassengerInfo } from './BookInterfaces';
import { currencySymbol } from '../../helpers/CurrencySymbolHelper';
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
  activeSegments: Array<Segment>,
  passengers: Array<PassengerInfo>,
  pricedItineraries: Array<PricedItinerary>,
  currency: string
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

  const displayBaggageOption = (baggageAmount: string, price: number) => {
    return(
      <div className="col-xs-3 baggage-option">
        <span>{baggageAmount} bags </span>
        <span>{currencySymbol(props.currency)}{price}</span>
      </div>
    );
  };

  const segmentBaggageOptions = (itinerary: PricedItinerary) => {
    console.log(itinerary);
    return itinerary.segments.map((segment: SegmentPricingInfo) => {
      return(<div>
        <h5>{segment.flight_details[0].origin}-{segment.flight_details[segment.flight_details.length-1].destination}</h5>
        <p className="text-bold">Checked Baggage</p>
        <div className="row">
          {displayBaggageOption(segment.baggage.applicable_bags, 0)}
          {segment.baggage.additional_checked_bags.map((baggage: AdditionalBaggage) => {
            return displayBaggageOption(baggage.applicable_bags, baggage.total_price);
          })}
        </div>
        <p className="text-bold">Cabin Baggage</p>
        <div className="row">
          {displayBaggageOption(segment.baggage.applicable_carry_on_bags, 0)}
          {segment.baggage.additional_carry_on_bags.map((baggage: AdditionalBaggage) => {
            return displayBaggageOption(baggage.applicable_bags, baggage.total_price);
          })}
        </div>
      </div>);
    }
    );
  };

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
                {props.pricedItineraries.map((itinerary: PricedItinerary, index: number) => { 
                  return segmentBaggageOptions(itinerary);
                })}
              </div>
            </div>
            <div className="text-center">
              <Button
                color="secondary"
                variant="contained"
                size="large"
                disableElevation
                onClick={() => (props.setModalOpen())}
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
