import React  from 'react';
import { useTranslation } from "react-i18next";
import { FlightResultsDetails, Segment } from "../results/ResultsInterfaces";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import FlightLogo from "../../common/FlightLogo";
import airlineDf from '../../assets/data/airlineDf.json';
import Autocomplete from "@material-ui/lab/Autocomplete";
import { updateFrequentFlyerCards } from "../../actions/BookActions";
import {FrequentFlyerCard, PassengerInfo} from "./BookInterfaces";
import {createItineraryPathSequenceString} from "../../helpers/PathSequenceHelper";
import { isSecondPartOfOpenJaw } from '../../helpers/SegmentHelpers';


interface FrequentFlyerDetailsProps {
  bookingSegments: Array<Segment>;
  pathSequence: Array<string>;
  flights: Array<FlightResultsDetails>;
  currentPassengerIndex: number;
  updateFrequentFlyerCards: typeof updateFrequentFlyerCards;
  passenger: PassengerInfo;
}

export default function FrequentFlyerDetails(props: FrequentFlyerDetailsProps) {
  const [ t ] = useTranslation('common');

  const setAndUpdateFFCardProgram = (values: any, cardIndex: number) => {
    const frequentFlyerCard: FrequentFlyerCard = props.passenger.frequent_flyer_cards[cardIndex];
    const newFrequentFlyerCard: FrequentFlyerCard = {
      itinerary_reference: (cardIndex + 1).toString(),
      card_supplier: values ? values.carrier_code : '',
      card_number: frequentFlyerCard ? frequentFlyerCard.card_number : '',
      program_name: values ? values.program_name : ''
    };
    props.updateFrequentFlyerCards(props.currentPassengerIndex, cardIndex, newFrequentFlyerCard);
  };

  const setAndUpdateFFCardNumber = (cardNumber: string, cardIndex: number) => {
    const frequentFlyerCard: FrequentFlyerCard = props.passenger.frequent_flyer_cards[cardIndex];
    const newFrequentFlyerCard: FrequentFlyerCard = {
      itinerary_reference: (cardIndex + 1).toString(),
      card_supplier: frequentFlyerCard ? frequentFlyerCard.card_supplier : '',
      card_number: cardNumber,
      program_name: frequentFlyerCard ? frequentFlyerCard.program_name : ''
    };
    props.updateFrequentFlyerCards(props.currentPassengerIndex, cardIndex, newFrequentFlyerCard);
  };

  const createCarrierInput = (cardIndex: number, segment: Segment) => (
    <FormControl fullWidth>
      <Autocomplete
        autoHighlight
        autoSelect
        id={`carrier-input-${cardIndex}`}
        options={airlineDf}
        getOptionLabel={(option: any) => option.program_name ? option.program_name : ''}
        getOptionSelected={(option, value) => true}
        value={getValueFromFrequentFlyerCard(cardIndex)}
        onChange={(_, values: any) => setAndUpdateFFCardProgram(values, cardIndex)}
        renderInput={(params) =>
          <TextField {...params}
            variant="outlined"
            placeholder={t('book.passengerDetailsModal.loyaltyProgram')}
          />
        }
      />
    </FormControl>
  );

  const getValueFromFrequentFlyerCard = (cardIndex: number) => {
    const frequentFlyerCard: FrequentFlyerCard = props.passenger.frequent_flyer_cards[cardIndex];
    return frequentFlyerCard
      ? airlineDf.find((airlinePlan: any) => airlinePlan.program_name === frequentFlyerCard.program_name)
      : '';
  };

  const getCardNumber = (cardIndex: number) => {
    const frequentFlyerCards: Array<FrequentFlyerCard> = props.passenger.frequent_flyer_cards;
    return frequentFlyerCards[cardIndex]
      ? frequentFlyerCards[cardIndex].card_number
      : '';
  };

  const createFrequentFlyerSegment = (bookingSegment: Segment, index: number) => (
    <div className="row passenger-form-row" key={index}>
      <div className="col-sm-3 ff-flight-logo-path-container">
        <div className='text-bold ff-flight-path-text'>{
          createItineraryPathSequenceString(bookingSegment, props.pathSequence)
        }</div>
        <FlightLogo
          flights={props.flights.filter((potentialFlight: FlightResultsDetails) =>
            potentialFlight.reference === bookingSegment.flights[0].flight_detail_ref
          )}
          itineraryDisplay={true}
        />
      </div>
      <div className="col-sm-6">
        {createCarrierInput(index, bookingSegment)}
      </div>
      <div className="col-sm-3">
        <TextField
          id={`frequent-flyer-number-${index}`}
          label={t("book.passengerDetailsModal.loyaltyCardNumber")}
          variant="outlined"
          value={getCardNumber(index)}
          onChange={(event: any) => setAndUpdateFFCardNumber(event.target.value, index)}
          fullWidth
          required
        />
      </div>
    </div>
  );

  const createFrequentFlyerSegments = () => {
    const frequentFlyerSegments: Array<JSX.Element> = [];
    props.bookingSegments.forEach((bookingSegment: Segment, index: number) => {
      if (!isSecondPartOfOpenJaw(bookingSegment)) {
        frequentFlyerSegments.push(createFrequentFlyerSegment(bookingSegment, index));
      }
    });
    return frequentFlyerSegments;
  };

  return (
    <div className='frequent-flyer-container'>
      <h5>{t('book.passengerDetailsModal.loyaltyPrograms')}</h5>
      {
        createFrequentFlyerSegments()
      }
    </div>
  );
};

