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
import { ApplicableBaggage } from '../book/BookInterfaces';
import { PassengerInfo } from './BookInterfaces';
import { currencySymbol } from '../../helpers/CurrencySymbolHelper';
import { useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { updatePassengerInfo } from '../../actions/BookActions';
import { updateAncillariesAmount } from '../../actions/PricingActions';

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
  currency: string,
  updatePassengerInfo: typeof updatePassengerInfo,
  updateAncillariesAmount: typeof updateAncillariesAmount
}

export default function AdditionalBaggageModal(props: AdditionalBaggageModalProps) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [ t ] = useTranslation('common');
  const [passengerIndex, setPassengerIndex] = React.useState(0);

  const handlePassengerChange = (event: React.ChangeEvent<{}>, currentIndex: number) => {
    setPassengerIndex(currentIndex);
  };

  useEffect(() => setOpen(props.modalOpen), [props.modalOpen]);

  const additionalBaggagePrice = (baggageOptionsList: Array<AdditionalBaggage>) => {
    return baggageOptionsList.reduce((total: number, baggage: AdditionalBaggage) => {
      return total + baggage.total_price;
    }, 0);
  };

  const displayBaggageOption = (baggageAmount: string, selected: boolean, type: string, currentBaggageIndex: number, baggageOptions: Array<AdditionalBaggage>, itinerary: number) => {
    let baggageOptionsList: Array<AdditionalBaggage> = baggageOptions.slice(0, currentBaggageIndex+1);
    let totalBaggagePrice: number = additionalBaggagePrice(baggageOptionsList);
    return(
      <div className={'col-xs-3 baggage-option ' + (selected ? 'active-baggage' : '')} onClick={() => handleBaggageChange(type, baggageOptionsList, itinerary, totalBaggagePrice)}>
        <span>{baggageAmount.slice(0,1)} {type === 'additional_checked_bags' ? 'Checked' : 'Cabin'} bags </span>
        <span className="text-bold">+{currencySymbol(props.currency)}{totalBaggagePrice}</span>
      </div>
    );
  };

  const createAdditionalBaggageObject = (itinerary: number, baggage: Array<AdditionalBaggage>) => {
    return [{
      "itinerary_reference": itinerary.toString(),
      "applicable_bags": baggage
    }];
  };

  const handleBaggageChange = (type: string, baggage: Array<AdditionalBaggage>, itinerary: number, price: number) => {
    props.updatePassengerInfo(passengerIndex, type, createAdditionalBaggageObject(itinerary, baggage));
    let totalPrice: number = 0;
    props.passengers.forEach((passenger: PassengerInfo) => {
      passenger[type].forEach((bag: ApplicableBaggage) => {
        totalPrice += additionalBaggagePrice(bag.applicable_bags);
      });
    });
    props.updateAncillariesAmount(totalPrice);
  };

  const getBaggageByItineraryReference = (itinerary: PricedItinerary, type: string) => {
    let bagsList = type === 'checked' ? props.passengers[passengerIndex].additional_checked_bags : props.passengers[passengerIndex].additional_carry_on_bags;
    let bagsForItinerary = bagsList.find((bags: any) => bags.itinerary_reference === itinerary.itinerary_reference.toString());
    return bagsForItinerary ? bagsForItinerary.applicable_bags.length : 0;
  };

  const segmentBaggageOptions = (itinerary: PricedItinerary) => {

    return itinerary.segments.map((segment: SegmentPricingInfo, itineraryIndex: number) => {
      let checkedBagSelections = props.passengers[passengerIndex].additional_checked_bags.length > 0
        ? getBaggageByItineraryReference(itinerary, 'checked')
        : 0;
      let carryOnBagSelections = props.passengers[passengerIndex].additional_carry_on_bags.length > 0
        ? getBaggageByItineraryReference(itinerary, 'carry_on')
        : 0;
      return(<div key={itineraryIndex.toString()}>
        <h5>{segment.flight_details[0].origin}-{segment.flight_details[segment.flight_details.length-1].destination}</h5>
        <p className="text-bold">Checked Baggage</p>
        <div className="row">
          {displayBaggageOption(segment.baggage.applicable_bags, checkedBagSelections === 0, 'additional_checked_bags', 0, [], itinerary.itinerary_reference)}
          {segment.baggage.additional_checked_bags.map((baggage: AdditionalBaggage, index: number) => {
            console.log(baggage);
            return displayBaggageOption(baggage.applicable_bags, checkedBagSelections === index+1, 'additional_checked_bags', index, segment.baggage.additional_checked_bags, itinerary.itinerary_reference);
          })}
        </div>
        <p className="text-bold">Cabin Baggage</p>
        <div className="row">
          {displayBaggageOption(segment.baggage.applicable_carry_on_bags, carryOnBagSelections === 0, 'additional_carry_on_bags', 0, [], itinerary.itinerary_reference)}
          {segment.baggage.additional_carry_on_bags.map((baggage: AdditionalBaggage, index: number) => {
            return displayBaggageOption(baggage.applicable_bags, carryOnBagSelections === index+1, 'additional_carry_on_bags', index, segment.baggage.additional_carry_on_bags, itinerary.itinerary_reference);
          })}
        </div>
      </div>);
    });
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
                value={passengerIndex}
                onChange={handlePassengerChange}
              >
                {props.passengers.map((passenger: PassengerInfo, index: number) => {
                  return <Tab key={index.toString()} label={passenger.updated ? passenger.first_name + ' ' + passenger.last_name : t("commonWords.passengerTypes." + passenger.passenger_type)} />;
                })}
              </Tabs>
              <div className="add-baggage-container">
                {props.pricedItineraries.map((itinerary: PricedItinerary) => { 
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
